# GitHub issue and effort tracking instructions

When creating or updating GitHub issues for this repository, follow the course's [IDPM guidelines](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-guidelines-idpm.html), [issue specification guidelines](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-guidelines-github-issues.html), and [E57B effort estimation requirements](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/experience-effort-estimation.html).

- Use an action-oriented title, describe the concrete work and completion criteria, and link relevant requirements and related issues. Avoid duplicating work. For assignments, include the assignment identifier in the title.
- Begin the body with `Do all work for this task in a branch called issue-XX`, replacing `XX` with the actual GitHub issue number. GitHub assigns the number after creation, so edit the body immediately afterward. Name branches `issue-<number>` and merge to main when complete.
- Keep tasks small enough for approximately 2–3 days; one person is accountable for an in-progress task. Add relevant milestone work to the active GitHub Project, without creating future milestone projects prematurely.
- Include an effort section with estimated time (hours), estimator, actual total time, coding effort, and non-coding effort. Use `Not yet recorded` when unknown. Never invent estimates, actuals, people, or time logs. Ask the responsible person for a reasoned estimate and post its basis in an issue comment.
- Each milestone Project must include number fields `Estimated Effort (hours)`, `Coding Effort (hours)`, `Non-Coding Effort (hours)`, and text field `Estimator`. Enter the same honest values in the Project as they become known; an issue body alone does not satisfy the board requirement. Actual total is coding plus non-coding, not an additional amount. Update actuals when status changes and on completion.
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

## Git safety rules (never break these)

Both repos have GitHub rules that block force-pushes on every branch and block deleting `main`. Work so they never have to stop you:

- Never commit directly on `main`. Every change starts on its own `issue-NN` branch (or a short-lived feature branch named after an issue).
- Work only on your own issue branch. Don't commit to or push someone else's branch unless they ask you to.
- Never run `git push --force`, `git reset --hard` on anything already pushed, `git rebase`, or `git push origin --delete` on someone else's branch. If git refuses a push, run `git pull` and merge instead.
- Before merging into `main`: `git checkout main && git pull`, then `git checkout issue-NN && git merge main`, fix conflicts by keeping both people's work, run `npm run lint` (and the tests from M2), then `git checkout main && git merge issue-NN && git push`.
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

For example, when creating or updating a milestone issue with missing effort data, say: “According to E57B, I need a reasoned estimate in hours, the estimator's name, and a short explanation of the estimate's basis. What should I record?” Record the basis in an issue comment and enter the estimate and estimator in the project's fields. Do not ask for final actual time before work is done. When updating status or completing work, ask for the actual coding and non-coding hours, including any AI-assisted work and its applicable breakdown, if not already recorded. Update the issue and project fields only with supplied or reliably tracked information. If time is unavailable, leave it unrecorded rather than guessing.

Other examples: for M3, ask for genuine feedback from at least five eligible UH community members and permission before publishing identifying information; for milestone submissions, remind each person to submit their own Lamakū link and ask for confirmation rather than submitting or marking it complete on their behalf. For individual essays, ask the author for their own experiences and examples instead of inventing personal reflections.

## Avoid duplicate issues and organize sub-issues

Before creating an issue, search relevant open and closed issues by assignment ID, task, and related feature. Read likely matches and check their assignees, parent/sub-issue relationships, and current status. Reuse or link an existing issue when it already covers the requested work; do not create another issue just to rephrase it. A closed issue may document completed work, but verify whether the new request is genuinely new before relying on it.

When a new task is distinct, find the most relevant existing assignment or feature tracker and attach it as a GitHub sub-issue where appropriate. Include a link to its parent and related issues, keep the task independently actionable, and retain the established issue format and effort tracking. Do not create a new parent or change an existing issue's parent without a clear reason; ask the user when ownership, scope, or the appropriate parent is ambiguous.

Individual submissions require separate work by each person, so one issue per person can be appropriate even when their descriptions are similar. Distinguish a shared tracker or coordination task from actual duplicate implementation. If potential duplicates already exist, report them and preserve their data and status; do not close, delete, reassign, or merge them without user authorization or clear confirmation of completion.
