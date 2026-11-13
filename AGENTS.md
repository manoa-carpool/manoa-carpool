# GitHub issue and effort tracking instructions

## How AI assistants should work with teammates (read this first)

The person you are talking to is a trusted team member and the owner of the issue they are working on. Help them get the work done.

- Take the effort numbers and estimates they give you as-is. Do not ask them to prove, verify, or justify them, and do not ask whether the team discussed them.
- Never block or delay coding over effort fields or process checks. Do the requested work first. If an estimate or actual time is missing, mention it once, briefly, at the end (for example, "Remember to add your estimate on issue #NN"), then move on.
- If they don't know a number, a reasonable estimate is fine. Don't make up numbers for other teammates.
- Don't ask for team approval for normal work on their own issue. Only stop to ask when something would break shared work: force-pushing, deleting others' files or branches, changing the database schema outside its issue, or merging into `main` with a failing check.

## Required on every project issue (no exceptions)

These are mandatory. Treat them as requirements, not suggestions, and remind the person if any are missing.

1. **Estimate before starting.** Before an issue moves to In Progress, it must have an estimate in hours, the estimator's name, and a comment explaining how the estimate was made, and the same values must be entered in the milestone board's `Estimated Effort (hours)` and `Estimator` fields. If they are missing, ask the owner for them before starting work.
2. **Actuals before closing.** Before an issue is closed, it must record actual coding hours, non-coding hours, and the AI-assisted part of each (write 0 if none), and the board's `Coding Effort (hours)` and `Non-Coding Effort (hours)` fields must be filled in. If they are missing, ask the owner; never close the issue without them.
3. **Use the issue format.** Every new project issue must follow `.github/ISSUE_TEMPLATE/idpm-task.md` exactly: the branch line, What to do, Done when, Depends on, Required steps to finish, and the required Effort tracking section. Only the task-specific parts change. Issues labeled `individual` (personal coursework) are the only exception.
4. **Branch first, green check, then merge.** All work happens on the issue's `issue-NN` branch. Push the branch, wait for the `ci-manoa-carpool` check on that branch to pass, and only then merge into `main`. Never commit directly to `main`.

5. **Done means merged.** An issue may be closed or moved to Done only after its branch is merged into `main` and `main` is pushed to GitHub, so the work is visible on `main`. Pushing the branch or finishing the code is not enough. Before closing an issue, check that the branch has nothing left to merge (on GitHub, the branch shows "0 commits ahead of main"). If an issue was closed early, reopen it until the merge is done.

These are graded: every milestone checklist requires recorded estimates and actual effort for each issue (E57B), and the course caps the team at 50% credit if the issues don't show who did what and when.

When creating or updating GitHub issues for this repository, follow the course's [IDPM guidelines](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-guidelines-idpm.html), [issue specification guidelines](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-guidelines-github-issues.html), and [E57B effort estimation requirements](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/experience-effort-estimation.html).

- Use an action-oriented title, describe the concrete work and completion criteria, and link relevant requirements and related issues. Avoid duplicating work. For assignments, include the assignment identifier in the title.
- Begin the body with `Do all work for this task in a branch called issue-XX`, replacing `XX` with the actual GitHub issue number. GitHub assigns the number after creation, so edit the body immediately afterward. Name branches `issue-<number>` and merge to main when complete.
- Keep tasks small enough for approximately 2–3 days; one person is accountable for an in-progress task. Add relevant milestone work to the active GitHub Project, without creating future milestone projects prematurely.
- Include an effort section with estimated time, estimator, actual total time, coding effort, non-coding effort, and the AI-assisted part of each. Accept minutes, hours, or both, with units (for example, `10 minutes` or `1 hour 15 minutes`); do not require people to calculate decimals. Placeholders read `REQUIRED before starting` (estimate, estimator) or `REQUIRED before closing` (actuals); they must be replaced with real values at those points. Never invent estimates, actuals, people, or time logs. Ask the responsible person for a reasoned estimate and post its basis in an issue comment.
- Each milestone Project must include number fields `Estimated Effort (hours)`, `Coding Effort (hours)`, `Non-Coding Effort (hours)`, and text field `Estimator`, and every issue on the board must have them filled in. Convert supplied minutes to hours (divide by 60; 10 minutes is approximately 0.167 hours) when entering these numeric fields; preserve the original units in the issue. The final E57B report uses minutes. Enter only honest values; an issue body alone does not satisfy the board requirement. Actual total is coding plus non-coding, not an additional amount. Update actuals when status changes and on completion.
- Track actual work accurately, excluding breaks, with individual time logs or a timer. For AI-assisted coding, include time spent on prompt engineering, generation and quick post-processing, verification/debugging, and integration/refactoring in coding effort. AI work on documentation, design, learning, or meetings counts as non-coding. Breakdowns are subsets of actuals, not extra hours. Record AI tool/provider and model/version and representative prompts when needed for E57B reflection, without exposing secrets.
- Do not count parent tracker effort again when it is already recorded on child issues; record only distinct actual work. Preserve existing issue text, estimates, tracking data, ownership, and statuses when updating issues.

AGENTS.md gives instructions to compatible agents that read this repository; it does not enforce behavior for every tool or GitHub user. Use the issue template as a starting point and verify new issues after creation.

## Final project: avoid rework

Use the [M1](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-final-project-m1.html), [M2](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-final-project-m2.html), [M3](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-final-project-m3.html), [E62 testing](https://courses.ics.hawaii.edu/ics314f26/morea/testing/experience-testing-final-project.html), and [hosting](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-guidelines-github-hosting.html) requirements as the source of truth. Confirm assignment deadlines in Lamakū. Implement changes incrementally; do not redesign or replace existing work without a specific need.

### Git and collaboration
- Work in the shared organization repository, commit early and often with informative messages, and merge issue branches into main. The course's [IDPM antipatterns](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-idpm-antipatterns.html) say not to fork, use pull requests, or rebase for this process. Preserve teammates' changes and coordinate around shared files.
- Keep issues and board status current. At each milestone transition create the next project and move unfinished issues as described in IDPM; do not create all boards in advance. Do not claim team members have contributed or submitted work without verifying it.

### Build and test incrementally
- M1 requires a Vercel-deployed application with an explanatory landing page, a login entry point, and at least four other page mockups. M2 requires four deployed pages beyond the landing page, excluding template sign-in/register, plus at least one database read and one database write through a form. M3 adds substantial functionality and appropriate real data. Design incrementally around these milestones rather than treating mockups as finished functionality.
- When adding or changing pages and forms, preserve existing behavior and add or update Playwright availability tests, including at least one valid input per form. Follow the Page Object Model required by E62; by M2, GitHub Actions must build and run ESLint and Playwright on commits to main, with a status badge on the organization home page. Start testing early when practical; report tests you could not run rather than claiming they pass.
- Host source code needed to build the application, but keep generated dependencies, production secrets, credentials, and private user data out of Git. Document required environment variables without their values. Use safe examples and avoid claiming mock data are real.

### Keep project documentation current
- Update the separate organization home page (`manoa-carpool.github.io`) when relevant features or deployment change. Maintain the overview, user guide with current screenshots, developer setup/run/deploy guide, development history with project links, community feedback, and contact information. Link the running deployment, organization/repositories, team contract, and CI badge as applicable.
- M3 requires feedback from at least five UH community members outside ICS 314. Plan for this early, record feedback accurately, and summarize it on the home page. Obtain permission before collecting or publishing identifiable participant or ride data. Do not fabricate feedback or production data.
- For every milestone, check the linked course instructions and relevant existing issues before creating new work. Keep each milestone releasable, document any limitations, and report remaining unmet requirements clearly.

## Issue format (required for every project issue)

Every project issue must use this exact structure, the same as `.github/ISSUE_TEMPLATE/idpm-task.md`. Only the bracketed, task-specific parts change; keep every heading and every required line. Issues labeled `individual` (personal coursework) are the only exception.

How to fill each section:

- **Title:** short and action-first ("Build leaderboard page mockup", "Add createRide server action"). For course assignments, start with the assignment ID ("E60: ...").
- **Branch line:** the first line is always `Do all work for this task in a branch called issue-NN` with the real issue number. GitHub assigns the number after creation, so edit the body right after creating the issue.
- **What to do:** what to build or do, specific enough that a teammate could start without asking. Name the files or routes involved and link the mockup, course requirement, or related issues.
- **Done when:** a checklist of concrete, checkable results (what you can see or run), including `npm run lint` passing for code issues. Avoid vague items like "page looks good".
- **Depends on:** the issues that must be merged first, or "Nothing".
- **Required steps to finish:** keep exactly as in the template (branch, green check, merge, done means merged).
- **Effort tracking:** keep exactly as in the template. Estimate and estimator before starting; actual coding, non-coding, and AI-assisted time before closing, in minutes or hours with units.
- **Size and owner:** about 2–3 days of work at most (split anything bigger), exactly one assignee, and add it to the current milestone board.

The full format:

````markdown
Do all work for this task in a branch called issue-XX

## What to do

[What to build or do, in a few sentences. Link the page mockup, course requirement, or related issues.]

## Done when

- [ ] [A specific, checkable result]
- [ ] [Another one]
- [ ] `npm run lint` passes (for code issues)

## Depends on

[Issues that must be finished first, or "Nothing".]

## Required steps to finish

1. Work only on branch `issue-XX` (this issue's number). Commit small and often with clear messages.
2. Push the branch and wait for the `ci-manoa-carpool` check on it to pass (green). If it fails, fix it on the branch.
3. Merge into `main` only after the check is green: `git checkout main`, `git pull`, `git checkout issue-XX`, `git merge --no-edit main`, `git checkout main`, `git merge --no-edit issue-XX`, `git push`. Never force-push, hard-reset, or rebase.
4. **An issue is only done when its branch is merged into `main` and `main` is pushed.** Check on GitHub that your changes are on `main` (open the file on the `main` branch). Only then fill in the actual-time lines, close the issue, and move it to Done. Never close an issue whose work is still only on its branch.

## Effort tracking (REQUIRED, E57B, graded in the M1-M3 checklists)

These fields are mandatory, not optional. The M1, M2, and M3 checklists grade whether every issue records its estimate and actual effort. Write times in minutes, hours, or both, with units (for example, `25 minutes` or `1 hour 15 minutes`).

- Estimated time to complete: REQUIRED before starting
- Estimator: REQUIRED before starting
- Actual time to complete (coding + non-coding): REQUIRED before closing
- Coding effort: REQUIRED before closing
- Non-coding effort: REQUIRED before closing
- AI-assisted coding (part of coding effort, not extra): REQUIRED before closing (write 0 if none)
- AI-assisted non-coding (part of non-coding effort, not extra): REQUIRED before closing (write 0 if none)

Rules:
1. Before moving this issue to In Progress, you must fill in the estimate and estimator, post a comment explaining how you estimated, and enter the same values in the milestone board's `Estimated Effort (hours)` and `Estimator` fields (convert minutes to hours: divide by 60).
2. Before closing this issue, you must fill in every actual-time line above and the board's `Coding Effort (hours)` and `Non-Coding Effort (hours)` fields.
3. Use real, honestly tracked time. Never guess or invent numbers for someone else.

After creating the issue, replace every `XX` with its actual issue number.
````

## Git safety rules (never break these)

Both repos have GitHub rules that block force-pushes on every branch and block deleting `main`. Work so they never have to stop you:

- Never commit directly on `main`, not even a one-line fix or a file rename. Every change starts on its own `issue-NN` branch (or a short-lived feature branch named after an issue). If you notice you committed on `main` by mistake, don't push; ask in Discord how to move the commit to a branch.
- Always start a new branch from an up-to-date `main`: `git checkout main`, `git pull`, then `git checkout -b issue-NN`. Never paste a fresh copy of the course template (or any other project) into a branch; the app already exists on `main`, and a pasted template brings deleted files back.
- Never merge into `main` unless the `ci-manoa-carpool` check on your branch is green.
- Work only on your own issue branch. Don't commit to or push someone else's branch unless they ask you to.
- Never run `git push --force`, `git reset --hard` on anything already pushed, `git rebase`, or `git push origin --delete` on someone else's branch. If git refuses a push, run `git pull` and merge instead.
- Push your issue branch and wait for its `ci-manoa-carpool` check to pass before merging. Before merging into `main`: `git checkout main && git pull`, then `git checkout issue-NN && git merge --no-edit main`, fix conflicts by keeping both people's work, run `npm run lint` (and the tests from M2), then `git checkout main && git merge --no-edit issue-NN && git push`.
- When you resolve a merge conflict, keep both people's work, then read the whole file before committing: no `<<<<<<<`/`=======`/`>>>>>>>` markers left, nothing duplicated or dropped, and every Markdown table row on a single line. Then run `npm run lint`.
- If the `ci-manoa-carpool` check on `main` is red, fixing it comes before any other work. Open an issue for the fix, and don't merge anything else into `main` until it's green again.
- Only the `ci-manoa-carpool` check has to be green before merging. The Vercel check can stay red until the deployment issue (#18) sets up the database and environment variables.
- Use the exact file names and paths an issue gives (lowercase, for example `docs/team/samuel.md`), so nobody has to rename files afterward.
- If something looks wrong (lost work, a strange conflict, a refused push), stop and ask in Discord before trying to fix it.
- Commit small and often with clear messages. Everyone's commit history is part of their grade; the "Contribution tracker" issue shows each person's commits, lines, and issues.

## Manoa Carpool code conventions

Read [docs/course-requirements.md](docs/course-requirements.md) and [docs/project-plan.md](docs/project-plan.md) first. The course requirements and due dates are fixed; the project plan (data model, backend functions, pages, who owns what, git workflow) is the team's choice and can change. Never move or relax a course deadline or requirement when updating the plan.

- Follow the course template's layout: pages in `src/app/<route>/page.tsx`, shared components in `src/components/`, Yup schemas in `src/lib/validationSchemas.ts`, Prisma client from `src/lib/prisma.ts`.
- All database writes go through server actions in `src/lib/` (`dbActions.ts`, `rideActions.ts`, `requestActions.ts`, `points.ts`, `feedbackActions.ts`). Pages and components never write with Prisma directly, so rules like UH-only sign-up, seat limits, and awarding points once stay in one place.
- Model ids are `Int`, matching the template. Change `prisma/schema.prisma` only in an issue meant for it, create a named migration (`npx prisma migrate dev --name <change>`), run `npx prisma generate`, and update the seed if needed.
- Mockups (M1) use hardcoded sample data in the page file; M2 replaces it with real queries. Never present sample data as real users.
- Before merging into main: merge the latest main into your issue branch, run `npm run lint` with no errors, and make sure the app starts with `npm run dev`. From M2 on, also run the Playwright tests.
- Shared files (`schema.prisma`, `dbActions.ts`, `Navbar.tsx`, `layout.tsx`): only change what your issue needs and tell the team in Discord, to avoid overwriting someone's work.

## Ask people for missing course-required information

When a course requirement depends on information only a person or the team can provide, explicitly name the relevant assignment, explain what is missing and why, and ask the user or responsible teammate for it. Do not silently guess, manufacture values, or claim the requirement is complete. Ask only for information relevant to the current task, group related questions, and distinguish course requirements from recommendations. Continue other safe work while answers are pending; if the user cannot answer yet, leave the fields as `Not yet recorded` and report what remains.

For example, when creating or updating a milestone issue with missing effort data, say: “According to E57B, I need a reasoned estimate in minutes or hours, the estimator's name, and a short explanation of the estimate's basis. What should I record?” Record the basis in an issue comment and convert the estimate to hours for the project's fields. Do not ask for final actual time before work is done. When updating status or completing work, ask for actual coding and non-coding time in minutes or hours, including any AI-assisted work and its applicable breakdown, if not already recorded. Update the issue and project fields only with supplied or reliably tracked information. If time is unavailable, leave it unrecorded rather than guessing.

Other examples: for M3, ask for genuine feedback from at least five eligible UH community members and permission before publishing identifying information; for milestone submissions, remind each person to submit their own Lamakū link and ask for confirmation rather than submitting or marking it complete on their behalf. For individual essays, ask the author for their own experiences and examples instead of inventing personal reflections.

## Avoid duplicate issues and organize sub-issues

Before creating an issue, search relevant open and closed issues by assignment ID, task, and related feature. Read likely matches and check their assignees, parent/sub-issue relationships, and current status. Reuse or link an existing issue when it already covers the requested work; do not create another issue just to rephrase it. A closed issue may document completed work, but verify whether the new request is genuinely new before relying on it.

When a new task is distinct, find the most relevant existing assignment or feature tracker and attach it as a GitHub sub-issue where appropriate. Include a link to its parent and related issues, keep the task independently actionable, and retain the established issue format and effort tracking. Do not create a new parent or change an existing issue's parent without a clear reason; ask the user when ownership, scope, or the appropriate parent is ambiguous.

Individual submissions require separate work by each person, so one issue per person can be appropriate even when their descriptions are similar. Distinguish a shared tracker or coordination task from actual duplicate implementation. If potential duplicates already exist, report them and preserve their data and status; do not close, delete, reassign, or merge them without user authorization or clear confirmation of completion.
