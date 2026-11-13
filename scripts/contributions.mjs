// Contribution tracker: who is committing and closing issues on Manoa Carpool.
// Counts commits on every branch of both team repos, matches each commit to a GitHub username
// through the GitHub API, and counts lines changed and issues per person.
// Run locally:  node scripts/contributions.mjs            (prints a markdown report)
// Run in CI:    node scripts/contributions.mjs --update-issue   (also rewrites the tracker issue)
// Needs the gh CLI signed in (locally) or GH_TOKEN set (GitHub Actions).
import { execFileSync } from 'node:child_process';

const ORG = 'manoa-carpool';
const APP_REPO = `${ORG}/manoa-carpool`;
const REPOS = [APP_REPO, `${ORG}/manoa-carpool.github.io`];
const TEAM = [
  { login: 'A-Mundanilkunathil', name: 'Aaron' },
  { login: 'CMDAwesome', name: 'Robert' },
  { login: 'donaldsanchez11', name: 'Donald' },
  { login: 'smattis96734', name: 'Samuel' },
];
const TRACKER_TITLE = 'Contribution tracker';
// fair share is 25% each; below this share of team commits gets flagged
const LOW_SHARE = 0.15;
const RECENT_DAYS = 7;
// files that don't count toward lines changed (generated, binary, or lock files)
const SKIP_FILE = /(package-lock\.json|\.png$|\.jpe?g$|\.gif$|\.svg$|\.pptx$|\.pdf$|\.ico$|migrations\/.*\.sql$|next-env\.d\.ts$)/;

const gh = (args) => JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));
const ghPages = (path) => gh(['api', '--paginate', '--slurp', path]).flat();

/* every commit on every branch of a repo, without duplicates and without merge commits */
const repoCommits = (repo) => {
  const seen = new Map();
  ghPages(`repos/${repo}/branches?per_page=100`).forEach((branch) => {
    ghPages(`repos/${repo}/commits?sha=${encodeURIComponent(branch.name)}&per_page=100`).forEach((c) => {
      if (!seen.has(c.sha) && c.parents.length < 2) seen.set(c.sha, { repo, sha: c.sha, login: c.author?.login, date: c.commit.author.date });
    });
  });
  return [...seen.values()];
};

/* lines added and removed in a commit, skipping generated and binary files */
const commitLines = (repo, sha) => {
  const files = gh(['api', `repos/${repo}/commits/${sha}`, '--jq', '.files']) || [];
  return files.filter((f) => !SKIP_FILE.test(f.filename))
    .reduce((t, f) => ({ add: t.add + f.additions, del: t.del + f.deletions }), { add: 0, del: 0 });
};

const dayOf = (iso) => iso.slice(0, 10);
const pct = (n, total) => (total ? `${Math.round((n / total) * 100)}%` : '0%');

function buildReport() {
  const commits = REPOS.flatMap(repoCommits);
  const issues = gh(['issue', 'list', '-R', APP_REPO, '--state', 'all', '--limit', '500',
    '--json', 'number,state,assignees,labels,title']);
  const since = Date.now() - RECENT_DAYS * 24 * 3600 * 1000;
  const totalTeamCommits = commits.filter((c) => TEAM.some((t) => t.login === c.login)).length;

  const rows = TEAM.map((person) => {
    const mine = commits.filter((c) => c.login === person.login);
    const lines = mine.reduce((t, c) => {
      const l = commitLines(c.repo, c.sha);
      return { add: t.add + l.add, del: t.del + l.del };
    }, { add: 0, del: 0 });
    // individual coursework (label "individual") is tracked but kept out of the project issue counts
    const assigned = issues.filter((i) => i.assignees.some((a) => a.login === person.login)
      && !i.labels.some((l) => l.name === 'individual') && !i.title.startsWith(TRACKER_TITLE));
    const recent = mine.filter((c) => Date.parse(c.date) >= since).length;
    const share = totalTeamCommits ? mine.length / totalTeamCommits : 0;
    const flags = [];
    if (share < LOW_SHARE) flags.push(`under ${LOW_SHARE * 100}% of commits`);
    if (recent === 0) flags.push(`no commits in ${RECENT_DAYS} days`);
    return {
      ...person,
      commits: mine.length,
      appCommits: mine.filter((c) => c.repo === APP_REPO).length,
      share,
      recent,
      days: new Set(mine.map((c) => dayOf(c.date))).size,
      ...lines,
      closed: assigned.filter((i) => i.state === 'CLOSED').length,
      open: assigned.filter((i) => i.state === 'OPEN').length,
      status: flags.length ? `⚠️ ${flags.join(', ')}` : '✅ on track',
    };
  });

  const unknown = commits.filter((c) => !TEAM.some((t) => t.login === c.login)).length;
  const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
  return [
    `Updated ${stamp} UTC. Counts every branch of ${REPOS.map((r) => `\`${r}\``).join(' and ')}, without merge commits.`,
    '',
    '| Person | Commits (share) | App repo commits | Last 7 days | Days active | Lines + / − | Issues closed / open | Status |',
    '|---|---|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${r.name} (@${r.login}) | ${r.commits} (${pct(r.commits, totalTeamCommits)}) | ${r.appCommits} | ${r.recent} | ${r.days} | +${r.add} / −${r.del} | ${r.closed} / ${r.open} | ${r.status} |`),
    '',
    `Target: each person near 25% of commits, never under ${LOW_SHARE * 100}%, with commits every week. The course grades from commit history and issues, so small regular commits on your own issues beat one big push.`,
    '',
    'Lines skip lock files, images, slides, and generated migrations. Issue counts leave out the `individual` coursework issues.',
    unknown ? `\n${unknown} commit(s) couldn't be matched to a team member (GitHub email not linked to the account).` : '',
  ].join('\n');
}

const report = buildReport();
console.log(report);

if (process.argv.includes('--update-issue')) {
  const found = gh(['issue', 'list', '-R', APP_REPO, '--state', 'open', '--search', `"${TRACKER_TITLE}" in:title`, '--json', 'number,title'])
    .find((i) => i.title === TRACKER_TITLE);
  const body = `${report}\n\n_This issue is rewritten automatically by \`.github/workflows/contributions.yml\`. Don't edit it by hand._`;
  if (found) {
    execFileSync('gh', ['issue', 'edit', String(found.number), '-R', APP_REPO, '--body', body]);
  } else {
    execFileSync('gh', ['issue', 'create', '-R', APP_REPO, '--title', TRACKER_TITLE, '--body', body]);
  }
}
