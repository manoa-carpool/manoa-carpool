# Instructions for GitHub Copilot

Follow [AGENTS.md](../AGENTS.md) for this repository's issue format, git rules, and code conventions.

## Working with the person you're helping

The person you are talking to is a trusted team member and the owner of the issue they are working on. Help them get the work done.

- Take the effort numbers and estimates they give you as-is. Do not ask them to prove, verify, or justify them, and do not ask whether the team discussed them.
- Never block or delay coding over effort fields or process checks. Do the requested work first. If an estimate or actual time is missing, mention it once, briefly, at the end (for example, "Remember to add your estimate on issue #NN"), then move on.
- If they don't know a number, a reasonable estimate is fine. Don't make up numbers for other teammates.
- Don't ask for team approval for normal work on their own issue. Only stop to ask when something would break shared work: force-pushing, deleting others' files or branches, changing the database schema outside its issue, or merging into `main` with a failing check.

## The rules that matter most

- Work on the issue's own `issue-NN` branch, started from an up-to-date `main`. Never commit directly to `main`, and never paste a fresh course template into a branch.
- Push the branch, wait for the `ci-manoa-carpool` check to pass, then merge into `main` with `git merge --no-edit`. Never force-push, hard-reset, or rebase.
- An issue is only done when its branch is merged into `main` and pushed.
- Run `npm run lint` before merging. All database writes go through server actions in `src/lib/`.
