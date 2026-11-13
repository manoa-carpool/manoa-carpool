# Manoa Carpool

A ride-matching app for the UH Manoa community: students with empty seats meet students who need a ride. Built for ICS 314 from the course's [nextjs-application-template](https://github.com/ics-software-engineering/nextjs-application-template).

- Project home page: https://manoa-carpool.github.io/
- Team plan, backend design, and git workflow: [docs/project-plan.md](docs/project-plan.md)
- Course requirements and deadlines: [docs/course-requirements.md](docs/course-requirements.md)
- Rules for people and AI assistants working in this repo: [AGENTS.md](AGENTS.md)

## Install

1. Install [Node.js](https://nodejs.org/) (LTS) and [PostgreSQL](https://www.postgresql.org/download/).
2. Create a local database:
   ```
   createdb manoa-carpool
   ```
3. Clone this repo and install the libraries:
   ```
   git clone https://github.com/manoa-carpool/manoa-carpool.git
   cd manoa-carpool
   npm install
   ```
4. Copy `sample.env` to `.env` and set `DATABASE_URL` to your local database, for example:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/manoa-carpool?schema=public"
   ```
   Never commit `.env`.
5. Create the tables, generate the Prisma client, and load the sample data:
   ```
   npx prisma migrate dev
   npx prisma generate
   npm run seed
   ```

## Run

```
npm run dev
```

Open http://localhost:3000 and sign in as `john@foo.com` (user) or `admin@foo.com` (admin), both with password `changeme`. These are sample accounts for local development only.

## Check your work before merging

```
npm run lint
npm run playwright
```

ESLint must pass before you merge into `main`. The `ci-manoa-carpool` GitHub Action runs ESLint, a build, and the Playwright tests on every push to `main`.
