# ARS OS Architecture

Version: 0.1

---

# Project Vision

ARS OS (AI Operating System) is a personal operating system designed to manage every important area of life inside a single application.

The project is not a task manager.

The project is not a note-taking app.

The project is a long-term platform for personal growth, education, career, finance, content creation, and life management.

---

# Main Goals

- Build one system instead of many disconnected apps.
- Learn software engineering while building a real product.
- Improve English by using it in the codebase.
- Keep the architecture scalable for many years.

---

# Technology Stack

Frontend

- React
- TypeScript
- Vite

State Management

- Zustand

Routing

- React Router

Validation

- Zod

Forms

- React Hook Form

Version Control

- Git
- GitHub

---

# Project Structure

```
src/

app/
assets/
components/
config/
features/
hooks/
lib/
services/
store/
styles/
types/
utils/
```

---

# Feature Structure

Each feature should follow the same structure.

Example:

```
features/

dashboard/

components/
pages/
hooks/
services/
types/
utils/
```

Business logic must stay inside the feature.

Reusable components belong in components/.

---

# Naming Rules

Folders

lowercase

Example

dashboard

creator

finance

Components

PascalCase

Example

DashboardPage.tsx

Sidebar.tsx

Header.tsx

Hooks

useSomething.ts

Example

useTheme.ts

useUser.ts

Stores

something.store.ts

Example

user.store.ts

settings.store.ts

Types

User.ts

Mission.ts

Finance.ts

---

# Code Style

Always use:

- Functional React components
- TypeScript
- Named exports when possible
- Strong typing
- Small reusable components

Avoid:

- Huge files
- Duplicate code
- Inline styles
- Business logic inside UI components

---

# UI Principles

Simple.

Fast.

Minimal.

Readable.

Function is more important than decoration.

---

# Application Modules

Dashboard

Second Brain

Missions

Skill Tree

Finance

Creator Hub

Music

Journal

Analytics

Calendar

AI Coach

Settings

---

# State Management

Global state

Zustand

Local state

React Hooks

Never mix business logic with UI.

---

# Documentation

Every important module must have a specification before implementation.

Specifications are stored in:

specs/

Example

Dashboard.md

Finance.md

SecondBrain.md

---

# Development Workflow

1. Write specification.

2. Review specification.

3. Implement feature.

4. Test feature.

5. Commit changes.

6. Update CHANGELOG.

---

# Git Commit Style

Examples

feat: add dashboard layout

feat: add sidebar

fix: routing issue

refactor: move services

docs: update architecture

---

# Long-term Vision

ARS OS should become a complete personal operating system that integrates:

- Knowledge Management
- Learning
- Career
- Finance
- Health
- Content Creation
- Music
- AI Assistance
- Analytics
- Planning

Everything should work together as one ecosystem.