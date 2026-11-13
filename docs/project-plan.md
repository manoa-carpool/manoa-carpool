# Manoa Carpool project plan

This is the team's plan for the backend, the pages, and who builds what in M1, M2, and M3. The GitHub issues on the milestone boards are the official task list; this file explains how the pieces fit together. Course requirements are linked from [AGENTS.md](../AGENTS.md).

## Fixed vs. flexible

**Fixed (set by the course, don't change):** the milestone due dates and requirements in [course-requirements.md](course-requirements.md): M1 Nov 19, M2 Dec 1, M3 Dec 12, the individual essays and final exam, IDPM rules, E57B effort tracking, and what the home page must contain.

**Flexible (the team's choice, change any time):** who owns what, the page list, the data model details, and the backend design below. When the team changes something, update this file and the matching issues so they stay in sync.

## Tech stack

We build on the course's [nextjs-application-template](https://github.com/ics-software-engineering/nextjs-application-template) and keep its conventions so everyone's code looks the same:

- Next.js (App Router, `src/app`), React, React Bootstrap, react-bootstrap-icons
- NextAuth credentials sign-in (from the template), with sign-up limited to `@hawaii.edu` emails
- PostgreSQL + Prisma (Prisma 7: the connection URL lives in `prisma.config.ts`)
- React Hook Form + Yup for forms, SweetAlert for success/failure messages
- Server actions in `src/lib/` for every database write
- ESLint (must pass before merging), Playwright for tests (M2)
- Deployed on Vercel; the PostgreSQL database is created from Vercel's Storage tab (Neon under the hood) and inspected with pgAdmin, the same way as E59/E60

## How the app works

1. A UH student signs up with their `@hawaii.edu` email and fills in a profile (name, home area, car, seats).
2. A driver posts a ride: from, to, departure time, open seats.
3. A rider searches open rides and requests a seat.
4. The driver accepts or declines. Accepting can never exceed the ride's seats.
5. After the ride, the driver and the rider each confirm it happened. When both confirm, the driver earns points (more for a first ride with that rider).
6. Riders and drivers rate each other (1–5). Anyone can report a no-show or a problem; admins review reports.
7. The leaderboard ranks drivers by points for the semester.

## Backend decisions (agreed Nov 12)

| Decision | What we chose | Why |
|---|---|---|
| Where backend code lives | Server actions + Prisma, like the template and BowFolios | What everyone already knows; no API routes needed |
| Backend files | Split by area: `dbActions.ts` (accounts), `rideActions.ts`, `requestActions.ts`, `points.ts`, `feedbackActions.ts` | Fewer merge conflicts with four people |
| Sign-up | `@hawaii.edu` emails only, checked in `createUser`; real email verification is a possible M3 upgrade | Our "UH students only" safety feature |
| Locations | A fixed list of Oahu areas (Kapolei, Ewa, Waipahu, Pearl City, Aiea, Mililani, Kaneohe, Kailua, Hawaii Kai, Kaimuki, Waikiki, Manoa campus, and so on), each with a map point and an approximate distance to campus | Easy search and filters, no home addresses stored |
| Map | Leaflet + OpenStreetMap (`react-leaflet`), showing ride routes between areas | Free and needs no API key, so no secret to protect |
| Points | Awarded only when both driver and rider confirm the ride: 10 per rider, +5 the first time a driver drives that rider, at most 2 counted rides per driver per day; miles come from the area-to-campus distance | Hard to farm points with a friend if there's a real prize |
| Seats | Accepting a request runs in one transaction that re-counts accepted seats; seats left is calculated, never stored | No overbooking when two requests are accepted at once |

## Data model

Based on Donald's draft (issue #6), adjusted to fit the template: ids are `Int` like the template, and `User` keeps the template's `email`, `password`, and `role` so sign-in keeps working.

| Model | Key fields | Notes |
|---|---|---|
| `User` | `id`, `email` (unique, `@hawaii.edu`), `password`, `role` (USER/ADMIN), `firstName`, `lastName`, `homeArea`, `carDescription`, `seatsAvailable`, `sameGenderOnly`, `gender` (optional), `points`, `createdAt` | Template fields plus profile. Rating is calculated from `Rating`, not stored. |
| `Ride` | `id`, `driverId` → User, `origin` and `destination` (area names from the fixed list), `departureTime`, `seats`, `notes`, `status` (OPEN/FULL/COMPLETED/CANCELLED), `createdAt` | Seats left = `seats` minus accepted requests. |
| `RideRequest` | `id`, `rideId` → Ride, `riderId` → User, `status` (PENDING/ACCEPTED/DECLINED/CANCELLED), `driverConfirmed`, `riderConfirmed`, `pointsAwarded`, `createdAt` | Unique on (`rideId`, `riderId`). A driver can't request their own ride. |
| `Rating` | `id`, `rideId`, `raterId`, `rateeId`, `score` (1–5), `comment`, `createdAt` | Unique on (`rideId`, `raterId`, `rateeId`). Only people who shared a confirmed ride can rate. |
| `Report` | `id`, `reporterId`, `reportedUserId`, `rideId` (optional), `reason`, `details`, `status` (OPEN/RESOLVED/DISMISSED), `createdAt` | Only admins see all reports. |

## Backend functions

All writes are server actions. Reads are Prisma queries called from server pages. Validation schemas go in `src/lib/validationSchemas.ts`.

| Area | Functions | File |
|---|---|---|
| Accounts | `createUser` (rejects non-`@hawaii.edu` emails), `updateProfile` | `src/lib/dbActions.ts` |
| Rides | `createRide`, `cancelRide`, `getOpenRides(filters)`, `getRidesForDriver` | `src/lib/rideActions.ts` |
| Requests | `requestSeat`, `cancelRequest`, `respondToRequest` (accept/decline in a transaction that checks seats), `confirmRide` (awards points once, when both confirm) | `src/lib/requestActions.ts` |
| Points | `pointsForRide` (10 per rider, +5 first ride with that rider, max 2 counted rides per day), `getLeaderboard` | `src/lib/points.ts` |
| Areas and map | `AREAS` list with map points and distance to campus | `src/lib/areas.ts` |
| Ratings and reports | `rateUser`, `getAverageRating`, `reportUser`, `resolveReport` (admin only) | `src/lib/feedbackActions.ts` |

Rule of thumb: pages and forms never call Prisma directly to write. They call one of these functions, so the rules (UH email, seat limits, points once) live in one place.

## Pages

| Route | Page | Who can see it |
|---|---|---|
| `/` | Landing: what the app is, sign up / sign in | Everyone |
| `/auth/signin`, `/auth/signup` | Template sign-in and sign-up (UH email only) | Everyone |
| `/rides` | Find a Ride: search and filter open rides, request a seat | Signed in |
| `/rides/[id]` | Ride details: driver, seats left, request or cancel | Signed in |
| `/drive` | Drive: post a ride, see and answer seat requests | Signed in |
| `/my-rides` | My Rides: upcoming and past rides, confirm a ride, rate | Signed in |
| `/profile` | Edit profile | Signed in |
| `/leaderboard` | Driver leaderboard | Signed in |
| `/admin` | Reports and users | Admin |

## Who owns what

Everyone writes code every milestone. Aaron and Robert own the backbone pieces that other work depends on. Donald and Samuel own pages and forms built on top of them.

| | M1: mockups, deployed (Nov 19) | M2: real data (Dec 1) | M3: finished app (Dec 12) |
|---|---|---|---|
| **Aaron** (backend) | App setup from the template; final Prisma schema, migration and seed; Vercel deploy | UH-email sign-up; ride and request server actions with the seat-limit transaction; profile model | Confirm-ride and points logic; admin tools; performance and data cleanup |
| **Robert** (process, testing, leaderboard) | AGENTS.md and issue rules; wireframes and logo; Leaderboard and My Rides mockups | Playwright tests using the Page Object Model (like BowFolios), for every page and form; GitHub Actions CI running build, ESLint, and Playwright on main, with a badge on the github.io page (E62); leaderboard query and page | Ratings and reports backend and admin review page; acceptance tests |
| **Donald** (driver side) | Database research and schema draft; Drive page and Ride Details mockups | Post-a-ride form using `createRide`; driver's request list using `respondToRequest`; tests for his pages | Driver profile details; real ride data from volunteers; seed data |
| **Samuel** (rider side and front end) | Navbar, landing page, Find a Ride mockup | Find a Ride search and filters from the database; Request Seat button; profile edit form; tests for his pages | My Rides confirm and rate flow; same-gender preference; community feedback round with 5 UH users |

Shared every milestone: estimates and actual hours on your own issues (E57B), updating the home page screenshots for your pages, and your individual Lamakū submission.

## Git workflow (IDPM)

The course's [IDPM antipatterns](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-idpm-antipatterns.html) say: don't fork, don't open pull requests, don't rebase. Everyone pushes to this one repo.

For each issue:

```
git checkout main
git pull
git checkout -b issue-NN          # NN = the issue number
# ...work, commit often with clear messages...
git push -u origin issue-NN
# when done:
git checkout main
git pull
git merge --no-edit issue-NN      # fix any conflicts, run npm run lint
git push
```

Then close the issue, move it to Done, and record your actual hours. Only touch files your issue is about; if you need to change a shared file (`dbActions.ts`, `schema.prisma`, the navbar), say so in Discord first.

**Safety:** GitHub blocks force-pushes on every branch and blocks deleting `main`, so pushed work can't be wiped. Never commit straight to `main`, never work on someone else's branch, and never use `git push --force`, `git reset --hard` on pushed work, or `git rebase`. The full list is in [AGENTS.md](../AGENTS.md#git-safety-rules-never-break-these).

## Contribution tracker

The pinned **Contribution tracker** issue is rewritten automatically after every push and once a day by `.github/workflows/contributions.yml`. It shows each person's commits (and share of the team total), commits in the last 7 days, days active, lines added and removed, and project issues closed and open. Target: everyone near 25% of commits and never under 15%, with commits every week. Run it yourself with `node scripts/contributions.mjs`. It's a guide, not the whole story: the course also reads commit messages and issues.

## Trial run (before real work)

Each person does trial issue "Trial run: practice the IDPM workflow" on their own:

1. Clone this repo (`git clone https://github.com/manoa-carpool/manoa-carpool.git`). The app doesn't need to exist yet for this.
2. Create the branch `issue-NN` for your trial issue.
3. Add a file `docs/team/<your-first-name>.md` with your name, GitHub username, and one line about what you're building.
4. Commit, push the branch, then merge it into `main` and push `main` (commands above).
5. Close the issue with your estimate and actual time filled in.

Everyone uses a different file, so there are no conflicts. When all four files are on `main`, the team knows everyone can clone, branch, push, and merge.
