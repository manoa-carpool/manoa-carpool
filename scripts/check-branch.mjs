// Branch guard for ci-manoa-carpool: fails the check if a pasted template or template leftovers
// would reach main (see issue #108). Run locally with: node scripts/check-branch.mjs
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const MAX_NEW_FILES = 40;
const OVERRIDE = '[large-change-ok]';
const OUR_INIT = '20261113013042_init';
const problems = [];

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const tracked = git('ls-files').split('\n').filter(Boolean);

// 1. template leftovers that should never be in this repo
tracked.filter((f) => /stuff/i.test(f)).forEach((f) => problems.push(`template Stuff file: ${f}`));
if (/model\s+Stuff\b/.test(readFileSync('prisma/schema.prisma', 'utf8'))) {
  problems.push('prisma/schema.prisma has the template\'s Stuff model');
}
if (existsSync('prisma/migrations')) {
  readdirSync('prisma/migrations')
    .filter((d) => d.endsWith('_init') && d !== OUR_INIT)
    .forEach((d) => problems.push(`extra init migration (ours is ${OUR_INIT}): prisma/migrations/${d}`));
}
['doc', 'index.md', '_config.yml', '.github/ISSUE_TEMPLATE/issue.md', '.github/ISSUE_TEMPLATE/review.md']
  .filter((p) => tracked.some((f) => f === p || f.startsWith(`${p}/`)))
  .forEach((p) => problems.push(`template leftover: ${p}`));

// 2. on issue branches, a huge number of new files usually means a pasted template or project
const branch = process.env.GITHUB_REF_NAME || git('rev-parse', '--abbrev-ref', 'HEAD');
if (branch !== 'main') {
  try {
    git('fetch', '--quiet', 'origin', 'main');
    const base = git('merge-base', 'HEAD', 'origin/main');
    const added = git('diff', '--name-only', '--diff-filter=A', base, 'HEAD').split('\n').filter(Boolean);
    const messages = git('log', '--format=%B', `${base}..HEAD`);
    if (added.length >= MAX_NEW_FILES && !messages.includes(OVERRIDE)) {
      problems.push(`this branch adds ${added.length} new files compared to main (limit ${MAX_NEW_FILES}). `
        + 'That usually means a template or another project was pasted in. If it is really intended, '
        + `add "${OVERRIDE}" to a commit message and explain why.`);
    }
  } catch (e) {
    console.log(`Skipped the new-file count (couldn't compare with origin/main): ${e.message.split('\n')[0]}`);
  }
}

if (problems.length) {
  console.error('Branch check failed. Start your branch from an up-to-date main and only change the files your issue is about.\n');
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
console.log('Branch check passed: no template leftovers or pasted templates.');
