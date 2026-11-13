# Course requirements and deadlines (fixed)

Everything the ICS 314 Final Project module asks for, in one place. These are set by the course and do not change; the team's own plan is in [project-plan.md](project-plan.md). Wording is paraphrased closely from the course site (pulled 2026-11-12). Each section links to the original page, which is the official version if anything here disagrees.

Course pages: [Experiences index](https://courses.ics.hawaii.edu/ics314f26/experiences/) · [Final Project module](https://courses.ics.hawaii.edu/ics314f26/modules/final-project/)

## Due dates

| What | Due (11:00 PM) | Who submits |
|---|---|---|
| E55 Team bonding + team contract | Thu Nov 12 | |
| E57 IDPM planning | Sat Nov 14 | |
| **Milestone 1** | **Thu Nov 19** | Whole team (each person on Lamaku) |
| E60 Deploy final project to Vercel | Mon Nov 23 | |
| **Milestone 2** | **Tue Dec 1** | Whole team (each person on Lamaku) |
| E63 Reflect on design patterns | Thu Dec 3 | Each person |
| **Milestone 3** | **Sat Dec 12** | Whole team (each person on Lamaku) |
| E57B / XC Project effort estimation and tracking | Sun Dec 13 | Each person |
| Reflect on your use of AI in ICS 314 (essay) | Tue Dec 15 | Each person |
| Reflect on software engineering (essay) | Wed Dec 16 | Each person |
| Final exam (portfolio) | Fri Dec 18 | Each person |

Always double-check times in Lamaku. The course pages say Lamaku is the official deadline.

## Rules that apply to every milestone

- Manage the work with GitHub issues and a GitHub project named for the milestone: **M1**, **M2**, **M3**.
- Follow [Issue Driven Project Management](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-guidelines-idpm.html):
  - Branches are named `issue-XX` (the issue number, nothing else).
  - Each issue is about 3 days of work or less.
  - Once In Progress, exactly one person owns it.
  - Each person should have at least two tasks when a milestone starts.
- Record **estimated and actual effort on every issue** ([E57B effort estimation](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/experience-effort-estimation.html)). The project fields to add are:
  - Estimated Effort (hours)
  - Estimator
  - Coding Effort (hours)
  - Non-Coding Effort (hours)
- When a milestone is due, its board should have nothing left in Backlog/To Do or In Progress. Move unfinished issues to the next milestone's board.
- Keep the home page up to date by following the [GitHub hosting guidelines](https://courses.ics.hawaii.edu/ics314f26/morea/project-management/reading-guidelines-github-hosting.html).
- **Individual grading** ([SE requirements reading](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/reading-se-requirements.html)):
  - The team is judged partly by its commit history. Commit early and often, with clear messages.
  - Uneven commits give team members different credit.
  - If the issues don't show who did what and when, the team can be capped at 50%.

**Submitting each milestone:**
1. One person posts the github.io URL in the **#final-project** Discord channel.
2. **Every** team member submits the same URL on Lamaku.

## Milestone 1: due Thu Nov 19

Source: [Milestone 1](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-final-project-m1.html) · [M1 checklist](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/checklist-milestone1.html)

**App**
- [ ] Deployed to Vercel.
- [ ] Landing page that explains what the site is about.
  - A color-blocked layout is suggested.
  - It doesn't need a menu bar, but it must have a place to log in.
- [ ] Mockups of at least 4 other pages.

**Process**
- [ ] GitHub issues + a project called "M1".
- [ ] IDPM practices, with branches named per IDPM.
- [ ] Estimate and actual effort recorded on every issue (E57B).

**Home page (manoa-carpool.github.io)**
- [ ] Link to the GitHub organization and all its repos.
- [ ] Link to the Team Contract.
- [ ] A section named exactly **"Deployment"** with the Vercel link.
- [ ] Up-to-date screenshots of the project.
- [ ] Link to the M1 project.
  - It shows completed issues with estimates and actual effort.
  - Nothing left in Backlog or In Progress by the due date.
- [ ] Link to the M2 project, showing the issues planned for M2.
- [ ] Follows the GitHub hosting guidelines.

## Milestone 2: due Tue Dec 1

Source: [Milestone 2](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-final-project-m2.html) · [M2 checklist](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/checklist-milestone2.html)

Goal: significantly better app **and** significantly better process than M1. Apply the suggestions from the M1 assessment.

**App**
- [ ] 4 pages besides the landing page are live in the deployment. The template's Sign In/Register pages don't count.
- [ ] At least one page **reads** from the database (PostgreSQL).
- [ ] At least one page **writes** to the database (through a form).

**Process**
- [ ] GitHub issues + a project called "M2", using IDPM with `issue-XX` branches.
- [ ] Estimate and actual effort on every issue (E57B).
- [ ] **Playwright "availability" tests for every page:** every page displays, and every form works with valid input. Hints: [E62 testing your final project](https://courses.ics.hawaii.edu/ics314f26/morea/testing/experience-testing-final-project.html).
- [ ] **Continuous integration with GitHub Actions:** every commit to main runs ESLint and all Playwright tests.
- [ ] **CI badge** showing current results on the home page.

**Home page**
- [ ] Link to the GitHub organization and all repos.
- [ ] **Overview:** what the system does and what problems it solves for the UH community.
- [ ] **User Guide:** walks through all current features, with up-to-date screenshots and a description of what you can do on each page.
- [ ] **Developer Guide:** how to download, install, run, and modify the system.
- [ ] Link to the running Vercel deployment.
- [ ] Link to the M2 project (completed issues, nothing in Backlog or In Progress by the due date).
- [ ] Link to the M3 project: **one In Progress issue per team member, plus at least one Backlog issue per team member.**

## Milestone 3: due Sat Dec 12

Source: [Milestone 3](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-final-project-m3.html) · [M3 checklist](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/checklist-milestone3.html)

**App**
- [ ] Significantly more functionality than M2.
- [ ] **A significant amount of real data.**
  - The course's examples are 50 real recipes, or a dozen real musicians willing to share their info.
  - For us, that means real UH students' profiles, cars and routes, with their permission.
- [ ] **At least 5 UH community members who are not in ICS 314** try the app and give feedback.
- [ ] Acceptance testing (see E62).

**Process**
- [ ] GitHub issues + a project called "M3" (the checklist says "M2" here, which looks like a typo), using IDPM with `issue-XX` branches.
- [ ] Estimate and actual effort on every issue.
- [ ] Playwright tests and CI with a badge, still passing.
- [ ] **Project effort report spreadsheet**, and **each member writes an effort estimation and tracking essay** (E57B).

**Home page**
- [ ] Link to the GitHub organization and all repos.
- [ ] Overview.
- [ ] User Guide (all features, up-to-date screenshots and descriptions).
- [ ] **Community Feedback:** summary of what the 5 community members said.
- [ ] Developer Guide.
- [ ] Link to the running Vercel deployment.
- [ ] Links to the M1, M2, and M3 projects, each fully completed (nothing in Backlog or In Progress).

## Reflect on Software Engineering (essay, each person): due Wed Dec 16

Source: [Reflect on Software Engineering](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-software-engineering-technical-essay.html)

- [ ] Write one last essay on what you learned about **software engineering in general**, not just web development.
- [ ] Pick **2 or 3** of these topics and discuss what they mean beyond web apps:
  - Open Source Software Development
  - Configuration Management
  - Functional Programming
  - Development Environments
  - Coding Standards
  - User Interface Frameworks
  - Agile Project Management
  - Design Patterns
  - Ethics in Software Engineering
- [ ] Example from the page: could you use Issue Driven Project Management on a non-web project? Explain what Agile and IDPM are and how you'd apply them elsewhere.
- [ ] **Define every term** you use. Don't assume the reader knows what "configuration management" or "design patterns" means.
- [ ] Submit on Lamaku. It also counts as one of the 4 required essays for the final exam portfolio.

## Reflect on Your Use of AI in ICS 314 (essay, each person): due Tue Dec 15

Source: [Reflect on Your Use of AI](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-my-use-of-ai-technical-essay.html)

Use this **exact outline**, with the sections clearly visible:

1. **Introduction:** AI in education and why it matters for software engineering. Name the AI tools you used (for example ChatGPT, Copilot, Claude).
2. **Personal Experience with AI:** address **every one** of these 14 items with specific examples and the prompts you used.
   - For each, say how useful AI was and its benefits and costs.
   - If you didn't use AI for an item, explain **why**. Don't just say "I didn't use it."
   - The items:
     1. Experience WODs (e.g. E18)
     2. Practice WODs
     3. WODs
     4. Essays
     5. Final project
     6. Learning a concept / tutorial
     7. Answering a question in class or in Discord
     8. Asking or answering a smart-question
     9. Coding example
     10. Explaining code
     11. Writing code
     12. Documenting code
     13. Quality assurance (e.g. fixing ESLint errors)
     14. Other uses in ICS 314
3. **Impact on Learning and Understanding:** effects on comprehension, skills, and problem solving.
4. **Practical Applications:** AI outside ICS 314 (real projects, the HAIC, and so on), and how well it worked.
5. **Challenges and Opportunities:** limitations you hit, and ideas for using AI more in SE education.
6. **Comparative Analysis:** traditional teaching vs. AI-enhanced, covering engagement, retention, and practical skills.
7. **Future Considerations:** where AI in SE education is headed.
8. **Conclusion:** summary and recommendations for future courses.

**Submit:** post it in your portfolio, then put the portfolio link on Lamaku **and** in the **#ai-essay-urls** Discord channel.

**Graded on:**
- Used the outline and covered all sections and all 14 items.
- Depth and specific examples.
- Critical analysis.
- Clarity and organization.
- Understanding of AI concepts.

(The page says it won't affect how your other work is graded.)

## Final Exam (portfolio, each person): due Fri Dec 18

Source: [Final Exam](https://courses.ics.hawaii.edu/ics314f26/morea/final-project/experience-final-exam.html) · [Portfolio style guide](https://courses.ics.hawaii.edu/ics314f26/morea/professional-persona/reading-professional-portfolio-style-guide.html) · [Technical essay style guide](https://courses.ics.hawaii.edu/ics314f26/morea/professional-persona/reading-technical-essay-style-guide.html)

It's take-home: a polished revision of your professional portfolio (A-Mundanilkunathil.github.io for Aaron).

- [ ] **Home page:** a headshot, your current interests, and links to GitHub and LinkedIn.
- [ ] **Projects page:** at least 3 projects, each with at least one screenshot.
  - One must be **Manoa Carpool**.
  - Include an overview, **your own contributions**, what you learned, screenshots, and a link to the team's GitHub org page.
- [ ] **Essays page:** at least 4 essays, one of which is **Reflect on Software Engineering**.
  - All 4 must meet the technical essay style guide.
  - Old essays that got full credit may still need rewriting, since the standard has gone up.
  - Write for the world, not the professor.
- [ ] **Resume page:** current skills, interests, and job experience.
- [ ] **No spelling or grammar errors** anywhere. Use the VS Code spell checker.
- [ ] **No broken images or links.**
- [ ] Start early, publish small changes, and check the site after each commit.

**Submit:** your portfolio URL on Lamaku **and** in the **#final-exam** Discord channel.

## Notes on the course pages

- The M1 page's "Vercel" link actually points to digitalocean.com. The requirement is Vercel.
- The M3 checklist says to use a project called "M2". The M3 page says "M3", so use M3.
- The course pages say "BackLog" while new GitHub boards say "Todo". Treat them as the same column.
