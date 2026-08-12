# 📋 GSD (Get Shit Done) — Complete Command Reference

> Optional workflow reference, not project state. Confirm each command and code-review-graph tool is installed in the active environment. Current repository context lives in `AGENTS.md` and `.planning/`.

> **With code-review-graph active, every command below gets smarter context automatically.**
> Run `code-review-graph update` before starting any session for freshest results.

---

## 🗂️ Table of Contents

1. [Project Setup Commands](#1-project-setup-commands)
2. [Milestone Commands](#2-milestone-commands)
3. [Phase Commands](#3-phase-commands)
4. [Work Session Commands](#4-work-session-commands)
5. [Code Quality Commands](#5-code-quality-commands)
6. [Research & Planning Commands](#6-research--planning-commands)
7. [Utility & Meta Commands](#7-utility--meta-commands)
8. [Quick Reference Cheatsheet](#8-quick-reference-cheatsheet)
9. [Recommended Workflows](#9-recommended-workflows)

---

## 1. Project Setup Commands

### `/gsd:new-project`
**What it does:** Initialises a brand new GSD-managed project. Sets up project structure, goals, milestones, and profile.

**When to use:**
- Starting a completely new project from scratch
- First time using GSD in a repo that has no GSD config yet

**How to use:**
```
/gsd:new-project
```
Then answer the prompts: project name, description, tech stack, goals.

---

### `/gsd:set-profile`
**What it does:** Sets your developer profile — name, preferences, working style, skill level.

**When to use:**
- First time setup
- Switching between different developer profiles (e.g., solo vs. team lead mode)
- Changing your preferred coding style or language

**How to use:**
```
/gsd:set-profile
```

---

### `/gsd:settings`
**What it does:** View and edit GSD global settings for the current project.

**When to use:**
- Changing AI behaviour preferences
- Updating project-level configuration
- Adjusting verbosity, output format, or automation level

**How to use:**
```
/gsd:settings
```

---

### `/gsd:map-codebase`
**What it does:** Asks the AI to deeply analyse and map your entire codebase — architecture, modules, patterns, entry points.

**When to use:**
- Joining an existing project you didn't write
- Onboarding onto a legacy codebase
- Before starting major refactoring work
- When code-review-graph is installed, this becomes extremely powerful — graph + AI map = full architecture picture

**How to use:**
```
/gsd:map-codebase
```

---

## 2. Milestone Commands

> Milestones are large goals (e.g., "Ship v1.0", "Complete Auth System"). Phases live inside milestones.

### `/gsd:new-milestone`
**What it does:** Creates a new milestone with a goal, description, and success criteria.

**When to use:**
- Starting a major new feature or product version
- Breaking down a big goal into a trackable unit
- After completing a previous milestone

**How to use:**
```
/gsd:new-milestone
```
Example input: *"Build the analytics dashboard with charts, filters, and export"*

---

### `/gsd:audit-milestone`
**What it does:** Reviews everything done in a milestone — what was completed, what was skipped, quality assessment.

**When to use:**
- End of a milestone before marking it complete
- Mid-milestone health check
- When something feels off and you want a full review
- With code-review-graph: gets blast-radius analysis of all changes made

**How to use:**
```
/gsd:audit-milestone
```

---

### `/gsd:complete-milestone`
**What it does:** Officially closes a milestone, generates a summary of all work done, and prepares for the next one.

**When to use:**
- All phases in the milestone are done and verified
- Ready to ship or hand off the work
- Want a written summary of what was built

**How to use:**
```
/gsd:complete-milestone
```

---

### `/gsd:plan-milestone-gaps`
**What it does:** Analyses the current milestone and identifies gaps — missing phases, untested areas, unhandled edge cases.

**When to use:**
- Mid-milestone review
- Before marking a milestone complete
- When you feel something is missing but can't pinpoint what

**How to use:**
```
/gsd:plan-milestone-gaps
```

---

### `/gsd:progress`
**What it does:** Shows current progress across milestones and phases — what's done, what's in progress, what's blocked.

**When to use:**
- Daily standup check
- When returning after a break
- Sharing progress with a team member
- Anytime you want a bird's-eye view

**How to use:**
```
/gsd:progress
```

---

## 3. Phase Commands

> Phases are the individual steps inside a milestone (e.g., "Set up database schema", "Build API endpoints", "Write tests").

### `/gsd:add-phase`
**What it does:** Appends a new phase to the end of the current milestone's phase list.

**When to use:**
- You realise a milestone needs an additional step you hadn't planned
- Adding a new task after the original phases are done
- Extending the scope of a milestone

**How to use:**
```
/gsd:add-phase
```
Example: *"Add a phase for setting up error boundary components"*

---

### `/gsd:insert-phase`
**What it does:** Inserts a new phase at a specific position in the phase list (not just at the end).

**When to use:**
- You need to add a step *between* two existing phases
- Discovered a dependency that must happen before a later phase
- Reordering the work sequence

**How to use:**
```
/gsd:insert-phase
```
Example: *"Insert a database migration phase before the API phase"*

---

### `/gsd:remove-phase`
**What it does:** Removes a phase from the current milestone.

**When to use:**
- A planned phase is no longer needed
- Scope was reduced
- A phase was merged into another

**How to use:**
```
/gsd:remove-phase
```

---

### `/gsd:plan-phase`
**What it does:** Breaks down a phase into detailed, step-by-step implementation tasks before you start coding.

**When to use:**
- Before starting a complex phase
- When unsure how to approach a phase
- Want the AI to think through the approach before touching code

**How to use:**
```
/gsd:plan-phase
```

---

### `/gsd:discuss-phase`
**What it does:** Opens a discussion about the current phase — tradeoffs, approaches, risks, alternatives — without executing anything.

**When to use:**
- You want to think through a phase before committing to an approach
- Evaluating multiple implementation strategies
- Architecture decisions that need careful thought
- With code-review-graph: AI uses graph context to discuss real impact on your codebase

**How to use:**
```
/gsd:discuss-phase
```

---

### `/gsd:execute-phase`
**What it does:** Executes the current phase — the AI starts writing code, making changes, following the plan.

**When to use:**
- Phase is planned and you're ready to implement
- After running `/gsd:discuss-phase` and agreeing on approach
- The main "do the work" command

**How to use:**
```
/gsd:execute-phase
```
> ⚠️ **Tip:** Always run `/gsd:plan-phase` or `/gsd:discuss-phase` first on complex phases.

---

### `/gsd:validate-phase`
**What it does:** Validates that a completed phase actually meets its goals — checks implementation against requirements.

**When to use:**
- After `/gsd:execute-phase` completes
- Before marking a phase done
- When you want the AI to double-check its own work

**How to use:**
```
/gsd:validate-phase
```

---

### `/gsd:research-phase`
**What it does:** Does deep research on a phase before implementation — looks up best practices, APIs, patterns, libraries.

**When to use:**
- Working with an unfamiliar library or technology
- Need to understand best practices before coding
- Complex algorithmic problems that need exploration first

**How to use:**
```
/gsd:research-phase
```

---

### `/gsd:list-phase-assumptions`
**What it does:** Lists all assumptions the AI has made about the current phase — surfaces hidden decisions.

**When to use:**
- Before executing a phase on a critical feature
- When the AI's plan seems off and you want to understand why
- Auditing the AI's reasoning before it writes code

**How to use:**
```
/gsd:list-phase-assumptions
```

---

## 4. Work Session Commands

### `/gsd:pause-work`
**What it does:** Saves your current work state — what was done, what's in progress, what's next — so you can resume cleanly later.

**When to use:**
- Ending your work session for the day
- Switching to a different task temporarily
- Before a meeting or break

**How to use:**
```
/gsd:pause-work
```

---

### `/gsd:resume-work`
**What it does:** Loads your saved work state and briefs you on exactly where you left off.

**When to use:**
- Starting a new work session
- Returning after a break or pause
- After running `/gsd:pause-work` in a previous session

**How to use:**
```
/gsd:resume-work
```

---

### `/gsd:quick`
**What it does:** A fast-mode command for small, isolated tasks that don't need full phase/milestone structure.

**When to use:**
- Quick one-off fixes
- Small tweaks that don't belong to any phase
- Hotfixes
- Exploring something quickly without committing to a full phase

**How to use:**
```
/gsd:quick Fix the broken import in AnalyticsCard.tsx
```

---

## 5. Code Quality Commands

### `/gsd:debug`
**What it does:** Structured debugging session — AI analyses the bug, traces the cause, proposes and applies a fix.

**When to use:**
- Something is broken and you don't know why
- Tests are failing
- Runtime errors or unexpected behaviour
- With code-review-graph: traces the full call chain to pinpoint root cause

**How to use:**
```
/gsd:debug
```
Then describe the bug or paste the error.

---

### `/gsd:add-tests`
**What it does:** Generates tests for your current code — unit tests, integration tests, edge cases.

**When to use:**
- After implementing a phase or feature
- When test coverage is low
- Before shipping to production
- With code-review-graph: automatically identifies untested functions and paths

**How to use:**
```
/gsd:add-tests
```

---

### `/gsd:cleanup`
**What it does:** Cleans up code — removes dead code, fixes formatting, improves naming, reduces duplication.

**When to use:**
- After a messy implementation sprint
- Before a code review with teammates
- End of a milestone clean-up pass
- With code-review-graph: dead code detection is much more accurate

**How to use:**
```
/gsd:cleanup
```

---

### `/gsd:verify-work`
**What it does:** Comprehensive verification of all work done — runs checks, validates against requirements, surfaces issues.

**When to use:**
- Before marking a milestone complete
- Pre-merge / pre-PR checks
- Final QA pass before shipping

**How to use:**
```
/gsd:verify-work
```

---

### `/gsd:reapply-patches`
**What it does:** Re-applies previously generated patches or changes that were lost, reverted, or need to be reapplied to a new version.

**When to use:**
- After a git rebase or merge conflict resolution
- When a patch was partially applied
- Re-applying changes after switching branches

**How to use:**
```
/gsd:reapply-patches
```

---

## 6. Research & Planning Commands

### `/gsd:add-todo`
**What it does:** Adds a TODO item to your project's tracked list.

**When to use:**
- Noting something to come back to later
- Capturing ideas during a coding session
- Tracking known issues or future improvements

**How to use:**
```
/gsd:add-todo Add dark mode support to the dashboard
```

---

### `/gsd:check-todos`
**What it does:** Lists all current TODOs, shows their status, and optionally helps you action them.

**When to use:**
- Start of a work session to see what's pending
- Before planning a new phase (clear the backlog first)
- Weekly review

**How to use:**
```
/gsd:check-todos
```

---

## 7. Utility & Meta Commands

### `/gsd:health`
**What it does:** Checks the overall health of your GSD setup — config validity, graph status, missing files, broken links.

**When to use:**
- Something feels off with GSD
- After installing new tools (like code-review-graph)
- First thing to run if commands start behaving strangely

**How to use:**
```
/gsd:health
```

---

### `/gsd:help`
**What it does:** Shows built-in help and documentation for GSD commands.

**When to use:**
- Forgot what a command does
- Exploring GSD for the first time
- Quick reference without leaving the IDE

**How to use:**
```
/gsd:help
```

---

### `/gsd:update`
**What it does:** Updates GSD itself — pulls latest command definitions, prompts, and configurations.

**When to use:**
- New GSD version is available
- Commands are behaving unexpectedly (might be stale)
- After being told to update by the GSD team

**How to use:**
```
/gsd:update
```

---

### `/gsd:join-discord`
**What it does:** Provides the link to join the GSD community Discord server.

**When to use:**
- Stuck on something and need community help
- Want to follow GSD updates and announcements
- Giving feedback to the GSD team

**How to use:**
```
/gsd:join-discord
```

---

## 8. Quick Reference Cheatsheet

| Command | Category | When to use (one line) |
|---|---|---|
| `/gsd:new-project` | Setup | Starting a brand new project |
| `/gsd:set-profile` | Setup | First time setup or switching profiles |
| `/gsd:settings` | Setup | Changing project config |
| `/gsd:map-codebase` | Setup | Understanding an existing codebase |
| `/gsd:new-milestone` | Milestone | Starting a major new goal |
| `/gsd:audit-milestone` | Milestone | Reviewing what was done in a milestone |
| `/gsd:complete-milestone` | Milestone | Closing a finished milestone |
| `/gsd:plan-milestone-gaps` | Milestone | Finding what's missing mid-milestone |
| `/gsd:progress` | Milestone | Bird's-eye view of all work |
| `/gsd:add-phase` | Phase | Adding a new step at end of milestone |
| `/gsd:insert-phase` | Phase | Adding a step between existing phases |
| `/gsd:remove-phase` | Phase | Removing an unneeded phase |
| `/gsd:plan-phase` | Phase | Detailed planning before coding |
| `/gsd:discuss-phase` | Phase | Thinking through approach before coding |
| `/gsd:execute-phase` | Phase | Actually doing the work |
| `/gsd:validate-phase` | Phase | Checking phase meets its goals |
| `/gsd:research-phase` | Phase | Deep research before unfamiliar work |
| `/gsd:list-phase-assumptions` | Phase | Surfacing AI's hidden decisions |
| `/gsd:pause-work` | Session | Saving state at end of session |
| `/gsd:resume-work` | Session | Picking up from where you left off |
| `/gsd:quick` | Session | One-off small tasks without phases |
| `/gsd:debug` | Quality | Fixing broken things |
| `/gsd:add-tests` | Quality | Generating tests for code |
| `/gsd:cleanup` | Quality | Removing dead code, fixing formatting |
| `/gsd:verify-work` | Quality | Final QA check before shipping |
| `/gsd:reapply-patches` | Quality | Re-applying lost or reverted patches |
| `/gsd:add-todo` | Planning | Noting something to do later |
| `/gsd:check-todos` | Planning | Reviewing pending TODOs |
| `/gsd:health` | Utility | Diagnosing GSD setup issues |
| `/gsd:help` | Utility | Built-in docs |
| `/gsd:update` | Utility | Updating GSD itself |
| `/gsd:join-discord` | Utility | Community support link |

---

## 9. Recommended Workflows

### 🆕 Starting a New Project
```
/gsd:new-project
/gsd:set-profile
/gsd:new-milestone    ← define your first big goal
/gsd:add-phase        ← break it into steps
/gsd:discuss-phase    ← think before coding
/gsd:execute-phase    ← write the code
/gsd:validate-phase   ← verify it works
/gsd:complete-milestone
```

---

### 📅 Daily Work Session
```
/gsd:resume-work      ← see where you left off
/gsd:progress         ← check overall status
code-review-graph update  ← freshen the graph (terminal)
/gsd:execute-phase    ← do the work
/gsd:add-tests        ← test what you built
/gsd:pause-work       ← save state before closing
```

---

### 🐛 Debugging Session
```
/gsd:debug            ← describe the bug
/gsd:add-tests        ← write a test that catches it
/gsd:verify-work      ← confirm the fix is solid
```

---

### 🚢 Pre-Ship Checklist
```
/gsd:check-todos          ← clear the backlog
/gsd:cleanup              ← tidy the code
/gsd:add-tests            ← fill test gaps
/gsd:verify-work          ← full QA pass
/gsd:audit-milestone      ← milestone review
/gsd:complete-milestone   ← close it out
```

---

### 🗺️ Joining an Existing Codebase
```
/gsd:map-codebase         ← understand the architecture
/gsd:health               ← check GSD setup is ok
/gsd:progress             ← see what's been done
/gsd:new-milestone        ← set your first goal
```

---

> 💡 **Pro Tip:** With **code-review-graph** active, commands like `/gsd:debug`, `/gsd:cleanup`, `/gsd:add-tests`, and `/gsd:execute-phase` all get automatic blast-radius context — meaning the AI knows exactly which files, functions, and tests are affected before touching anything.
