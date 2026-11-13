---
name: IDPM task
description: Every project issue uses this format. Fill in the parts in brackets; keep the rest as is.
---

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

These fields are mandatory, not optional. The M1, M2, and M3 checklists grade whether every issue records its estimate and actual effort.

- Estimated time to complete (hours): REQUIRED before starting
- Estimator: REQUIRED before starting
- Actual time to complete (hours; coding + non-coding): REQUIRED before closing
- Coding effort (hours): REQUIRED before closing
- Non-coding effort (hours): REQUIRED before closing
- AI-assisted coding (hours, part of coding effort, not extra): REQUIRED before closing (write 0 if none)
- AI-assisted non-coding (hours, part of non-coding effort, not extra): REQUIRED before closing (write 0 if none)

Rules:
1. Before moving this issue to In Progress, you must fill in the estimate and estimator, post a comment explaining how you estimated, and enter the same values in the milestone board's `Estimated Effort (hours)` and `Estimator` fields.
2. Before closing this issue, you must fill in every actual-time line above and the board's `Coding Effort (hours)` and `Non-Coding Effort (hours)` fields.
3. Use real, honestly tracked time. Never guess or invent numbers for someone else.

After creating the issue, replace every `XX` with its actual issue number.
