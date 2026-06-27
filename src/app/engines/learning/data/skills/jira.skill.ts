import type { Skill, Step, Module, Lesson } from '../../entities';

// ===================================================================================
// MODULE 1 — Jira Fundamentals
// ===================================================================================

const m1l1s1: Step = {
  id: 'jira-m1-l1-s1',
  title: 'Create a free Jira account and project',
  instruction:
    'Go to atlassian.com/software/jira and click "Get it free". Sign up with your email. When asked to create a project, choose "Scrum" template and name it "ARS-OS Dev". Select "Team-managed" when prompted. You will land on a board view with columns: To Do, In Progress, Done.',
  prerequisites: [],
  resource: {
    id: 'jira-m1-l1-s1-res',
    type: 'tool',
    title: 'Jira — Free Plan',
    url: 'https://www.atlassian.com/software/jira',
    whatIsThis:
      'The industry-standard issue tracking and project management tool used by most software teams. Free plan supports up to 10 users — more than enough for learning.',
    setupSteps: [
      'Go to atlassian.com/software/jira.',
      'Click "Get it free" and sign up.',
      'Create a Scrum project named "ARS-OS Dev".',
      'Select Team-managed when prompted.',
    ],
  },
  estimatedMinutes: 8,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'jira-m1-l1-s1-c1', description: 'You are logged into Jira and can see a Scrum board with To Do, In Progress, and Done columns.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l1s2: Step = {
  id: 'jira-m1-l1-s2',
  title: 'Create your first Epic and 3 Stories',
  instruction:
    'In your Jira project, click "Create" (top left). Create an Epic: Summary = "User Authentication", Description = "All features related to user login and registration". Then create 3 Stories linked to this Epic: (1) "User can register with email and password", (2) "User can log in with existing credentials", (3) "User can reset forgotten password". Set Story Points to 3, 2, and 2 respectively.',
  prerequisites: ['jira-m1-l1-s1'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m1-l1-s2-c1', description: 'One Epic named "User Authentication" exists in your project.' },
      { id: 'jira-m1-l1-s2-c2', description: 'Three Stories are linked to the Epic with story points assigned.' },
      { id: 'jira-m1-l1-s2-c3', description: 'All three Stories appear in the To Do column on the board.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1s3: Step = {
  id: 'jira-m1-l1-s3',
  title: 'Move issues through the board and understand workflow',
  instruction:
    'On your Scrum board, drag "User can register with email and password" from To Do to In Progress. Then drag it to Done. Click on the issue to open it — read the History section at the bottom to see the status changes logged automatically. Then move the second Story to In Progress. Leave the third in To Do.',
  prerequisites: ['jira-m1-l1-s2'],
  estimatedMinutes: 8,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m1-l1-s3-c1', description: 'Story 1 is in Done, Story 2 is In Progress, Story 3 is in To Do.' },
      { id: 'jira-m1-l1-s3-c2', description: 'You can see status change history in the issue detail view.' },
    ],
  },
  reflection: {
    id: 'jira-m1-l1-r',
    prompt: 'Without looking back: what is the difference between an Epic and a Story in Jira? Give one example of each from a real software project.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1: Lesson = {
  id: 'jira-m1-l1',
  title: 'Jira Setup and Core Issue Types',
  description: 'Create a Jira account, set up a Scrum project, create Epics and Stories, and move issues through the board.',
  steps: [m1l1s1, m1l1s2, m1l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l2s1: Step = {
  id: 'jira-m1-l2-s1',
  title: 'Write a well-structured bug report',
  instruction:
    'In Jira, create a new issue with type "Bug". Fill in every field: Summary = "Login button unresponsive on mobile Safari 16". Description must include these sections: Steps to Reproduce (numbered list of exact steps), Expected Result (what should happen), Actual Result (what actually happens), Environment (OS, browser, version). Priority = High. Add a label: "mobile".',
  prerequisites: [],
  resource: {
    id: 'jira-m1-l2-s1-res',
    type: 'article',
    title: 'How to Write a Good Bug Report — Atlassian',
    url: 'https://www.atlassian.com/blog/software-teams/10-steps-to-better-bug-reports',
    whatIsThis:
      'Atlassian\'s guide to writing bug reports that developers can actually act on. The standard format used by QA and analysts in professional teams.',
    setupSteps: [
      'Read the article once before writing your bug report.',
      'Focus on the "Steps to Reproduce" and "Expected vs Actual" sections.',
    ],
  },
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m1-l2-s1-c1', description: 'The bug report has all 4 required sections: Steps, Expected, Actual, Environment.' },
      { id: 'jira-m1-l2-s1-c2', description: 'Steps to Reproduce are numbered and specific enough to follow.' },
      { id: 'jira-m1-l2-s1-c3', description: 'Priority is set to High and label "mobile" is added.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2s2: Step = {
  id: 'jira-m1-l2-s2',
  title: 'Create a Task and link it to a Story',
  instruction:
    'Create a new Task: Summary = "Write API documentation for /auth/login endpoint". In the issue detail, find the "Link" option and link it to your "User can log in" Story using the relationship "is subtask of" or "relates to". Assign the Task to yourself. Set Due Date to 3 days from today.',
  prerequisites: ['jira-m1-l2-s1'],
  estimatedMinutes: 8,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m1-l2-s2-c1', description: 'The Task exists and is linked to the login Story.' },
      { id: 'jira-m1-l2-s2-c2', description: 'The Task is assigned to you with a due date set.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l2s3: Step = {
  id: 'jira-m1-l2-s3',
  title: 'Use filters to find issues',
  instruction:
    'In your Jira project, click "Board" then find the search/filter bar. Filter by: Assignee = you. Then try: Priority = High. Then try: Label = mobile. Write down in your note: how many issues match each filter. Then use "Basic" search to find all issues updated in the last 7 days.',
  prerequisites: ['jira-m1-l2-s2'],
  estimatedMinutes: 8,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m1-l2-s3-c1', description: 'You applied all three filters and recorded the result counts.' },
      { id: 'jira-m1-l2-s3-c2', description: 'You found issues updated in the last 7 days using search.' },
    ],
  },
  reflection: {
    id: 'jira-m1-l2-r',
    prompt: 'Without looking back: what are the 4 required sections of a good bug report, and why is "Steps to Reproduce" the most important one?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2: Lesson = {
  id: 'jira-m1-l2',
  title: 'Bug Reports and Issue Management',
  description: 'Write a structured bug report, link issues together, and use filters to manage and find work items.',
  steps: [m1l2s1, m1l2s2, m1l2s3],
  dependencies: ['jira-m1-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l3s1: Step = {
  id: 'jira-m1-l3-s1',
  title: 'Create a Sprint and add issues to it',
  instruction:
    'In your Jira project, go to Backlog view (left sidebar). Click "Create Sprint". Name it "Sprint 1 — Auth Features". Drag all three of your User Authentication Stories into Sprint 1. Click "Start Sprint" — set duration to 2 weeks. You will now see these issues on your active board.',
  prerequisites: [],
  estimatedMinutes: 8,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'jira-m1-l3-s1-c1', description: 'Sprint 1 is active with all 3 Stories visible on the board.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l3s2: Step = {
  id: 'jira-m1-l3-s2',
  title: 'Read and interpret the Burndown Chart',
  instruction:
    'In your active Sprint, go to Reports (left sidebar) → Burndown Chart. Read the chart: the grey line is the ideal burndown (linear decrease), the red/blue line is your actual progress. Complete one more Story by moving it to Done on the board, then refresh the Burndown Chart. Write in your note: what the chart shows about your sprint progress.',
  prerequisites: ['jira-m1-l3-s1'],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m1-l3-s2-c1', description: 'You can read the Burndown Chart and explain what the two lines represent.' },
      { id: 'jira-m1-l3-s2-c2', description: 'You moved one Story to Done and saw the chart update.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l3s3: Step = {
  id: 'jira-m1-l3-s3',
  title: 'Complete the Sprint and review velocity',
  instruction:
    'In your Jira project, go to Active Sprint and click "Complete Sprint". Jira will ask what to do with unfinished issues — move them to the Backlog. After completing, go to Reports → Velocity Chart. Read the chart: it shows story points committed vs completed per sprint. Write in your note: what your velocity was for Sprint 1 and what it means for planning Sprint 2.',
  prerequisites: ['jira-m1-l3-s2'],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m1-l3-s3-c1', description: 'Sprint 1 is marked as complete.' },
      { id: 'jira-m1-l3-s3-c2', description: 'You read the Velocity Chart and recorded your Sprint 1 velocity.' },
      { id: 'jira-m1-l3-s3-c3', description: 'You can explain what velocity means for Sprint 2 planning.' },
    ],
  },
  reflection: {
    id: 'jira-m1-l3-r',
    prompt: 'Without looking back: what is the purpose of a Burndown Chart, and what does it mean if the actual line is consistently above the ideal line?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l3: Lesson = {
  id: 'jira-m1-l3',
  title: 'Sprints and Reporting',
  description: 'Create and run a Sprint, read the Burndown Chart, complete the Sprint, and interpret the Velocity Chart.',
  steps: [m1l3s1, m1l3s2, m1l3s3],
  dependencies: ['jira-m1-l2'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const module1: Module = {
  id: 'jira-m1',
  title: 'Jira Fundamentals',
  description: 'Set up a Scrum project, manage Epics, Stories, and Bugs, run a Sprint, and read agile reports.',
  lessons: [m1l1, m1l2, m1l3],
  order: 1,
};

// ===================================================================================
// MODULE 2 — Confluence and System Analyst Workflows
// ===================================================================================

const m2l1s1: Step = {
  id: 'jira-m2-l1-s1',
  title: 'Create a Confluence space and first page',
  instruction:
    'In Atlassian, open Confluence (top navigation → Apps → Confluence, or go to confluence.atlassian.com). Create a new Space named "ARS-OS Documentation". Inside the space, click "Create" and make a page titled "Project Overview". Add these sections with headings: Purpose, Scope, Key Stakeholders, Links to Jira. Save the page.',
  prerequisites: [],
  resource: {
    id: 'jira-m2-l1-s1-res',
    type: 'tool',
    title: 'Confluence — Free with Jira',
    url: 'https://confluence.atlassian.com',
    whatIsThis:
      'Atlassian\'s documentation and knowledge base tool. Free plan included with your Jira account. Used by most software teams for requirements, specs, meeting notes, and technical documentation.',
    setupSteps: [
      'Log in to your Atlassian account.',
      'Click Apps in the top navigation and select Confluence.',
      'Create a new Space for your project.',
    ],
  },
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l1-s1-c1', description: 'A Confluence space named "ARS-OS Documentation" exists.' },
      { id: 'jira-m2-l1-s1-c2', description: 'A "Project Overview" page exists with all 4 required sections.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l1s2: Step = {
  id: 'jira-m2-l1-s2',
  title: 'Write a requirements page in Confluence',
  instruction:
    'Create a new Confluence page titled "Authentication Feature — Requirements". Use the requirements you wrote in the English module (or write new ones). Structure the page: Background (why this feature is needed, 2–3 sentences), Functional Requirements (numbered list using "The system shall..." format, at least 5), Out of Scope (at least 2 items explicitly excluded). Insert a Jira Issues macro to show your Authentication Epic inline.',
  prerequisites: ['jira-m2-l1-s1'],
  estimatedMinutes: 18,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l1-s2-c1', description: 'The page has all 3 sections: Background, Functional Requirements, Out of Scope.' },
      { id: 'jira-m2-l1-s2-c2', description: 'At least 5 functional requirements in "The system shall..." format.' },
      { id: 'jira-m2-l1-s2-c3', description: 'At least 2 items in Out of Scope.' },
    ],
  },
  baseXP: 25,
  baseCoins: 12,
};

const m2l1s3: Step = {
  id: 'jira-m2-l1-s3',
  title: 'Link Confluence page to Jira issues',
  instruction:
    'In Jira, open your "User Authentication" Epic. In the issue detail, find the "Confluence Pages" section (or use the Link button → Confluence Page). Link your "Authentication Feature — Requirements" page to this Epic. Then open the Confluence page and verify the Jira issue appears in the "Jira Links" section at the top. This two-way link is how professional teams connect specs to work items.',
  prerequisites: ['jira-m2-l1-s2'],
  estimatedMinutes: 8,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l1-s3-c1', description: 'The Confluence page is linked to the Jira Epic.' },
      { id: 'jira-m2-l1-s3-c2', description: 'The Jira issue appears in the Confluence page\'s Jira Links section.' },
    ],
  },
  reflection: {
    id: 'jira-m2-l1-r',
    prompt: 'Without looking back: why is linking Confluence requirements pages to Jira Epics important for a System Analyst? What problem does it solve when a developer asks "where is the spec for this feature?"',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l1: Lesson = {
  id: 'jira-m2-l1',
  title: 'Confluence Documentation',
  description: 'Set up a Confluence space, write a structured requirements page, and link it to Jira issues for traceability.',
  steps: [m2l1s1, m2l1s2, m2l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l2s1: Step = {
  id: 'jira-m2-l2-s1',
  title: 'Write meeting notes in Confluence',
  instruction:
    'In Confluence, use the Meeting Notes template (Create → Templates → Meeting Notes). Fill it in as if you just ran a requirements meeting for the Authentication feature. Include: Date, Attendees (3 fictional names + yourself), Agenda (3 items), Discussion Notes (2–3 sentences per agenda item), Action Items (at least 3, each with owner and due date). Save the page in your ARS-OS Documentation space.',
  prerequisites: [],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l2-s1-c1', description: 'The meeting notes page uses the template structure.' },
      { id: 'jira-m2-l2-s1-c2', description: 'At least 3 action items with owner and due date are listed.' },
      { id: 'jira-m2-l2-s1-c3', description: 'Discussion notes are present for each agenda item.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2s2: Step = {
  id: 'jira-m2-l2-s2',
  title: 'Convert action items to Jira Tasks',
  instruction:
    'Take the 3 action items from your meeting notes. For each one, create a Jira Task in your project. Set the assignee and due date to match the meeting notes. Then in Confluence, select each action item text, right-click, and use "Create Jira Issue" (or manually link the created Jira task). After all 3 are linked, the meeting notes page will show live Jira status next to each action.',
  prerequisites: ['jira-m2-l2-s1'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l2-s2-c1', description: '3 Jira Tasks exist matching the meeting action items.' },
      { id: 'jira-m2-l2-s2-c2', description: 'Each Task has the correct assignee and due date.' },
      { id: 'jira-m2-l2-s2-c3', description: 'The Confluence meeting notes page is linked to or shows the Jira Tasks.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2s3: Step = {
  id: 'jira-m2-l2-s3',
  title: 'Create a page hierarchy in Confluence',
  instruction:
    'In your ARS-OS Documentation space, organise your pages into a hierarchy. The structure should be: ARS-OS Documentation (root) → Authentication Feature (parent page) → Requirements, Meeting Notes (child pages). In Confluence, drag pages in the sidebar to create parent-child relationships. Add a Table of Contents macro to the Authentication Feature parent page.',
  prerequisites: ['jira-m2-l2-s2'],
  estimatedMinutes: 8,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l2-s3-c1', description: 'Pages are organised in a parent-child hierarchy in the sidebar.' },
      { id: 'jira-m2-l2-s3-c2', description: 'The Authentication Feature parent page has a Table of Contents macro.' },
    ],
  },
  reflection: {
    id: 'jira-m2-l2-r',
    prompt: 'Without looking back: describe the workflow from meeting → action items → Jira tasks → Confluence. Why is keeping these connected important for a System Analyst?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2: Lesson = {
  id: 'jira-m2-l2',
  title: 'Meeting Notes and Traceability',
  description: 'Write structured meeting notes, convert action items to Jira Tasks, and organise documentation in a page hierarchy.',
  steps: [m2l2s1, m2l2s2, m2l2s3],
  dependencies: ['jira-m2-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l3s1: Step = {
  id: 'jira-m2-l3-s1',
  title: 'Use JQL to write custom queries',
  instruction:
    'In Jira, go to Issues → Advanced Search (or click "Switch to JQL"). Write these 3 queries one at a time and record how many results each returns: (1) project = "ARS-OS Dev" AND status = "To Do", (2) project = "ARS-OS Dev" AND priority = High AND assignee = currentUser(), (3) project = "ARS-OS Dev" AND created >= -7d ORDER BY created DESC.',
  prerequisites: [],
  resource: {
    id: 'jira-m2-l3-s1-res',
    type: 'article',
    title: 'JQL Reference — Atlassian Documentation',
    url: 'https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/',
    whatIsThis:
      'Official Jira Query Language reference. JQL is SQL-like syntax for filtering issues — essential for reporting, dashboards, and automation in professional Jira usage.',
    setupSteps: [
      'Open the link as a reference.',
      'Focus on the "Fields", "Operators", and "Keywords" sections.',
    ],
  },
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l3-s1-c1', description: 'All 3 JQL queries returned results without syntax errors.' },
      { id: 'jira-m2-l3-s1-c2', description: 'You recorded the result count for each query.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l3s2: Step = {
  id: 'jira-m2-l3-s2',
  title: 'Create a custom dashboard',
  instruction:
    'In Jira, go to Dashboards → Create Dashboard. Name it "ARS-OS Status". Add these gadgets: (1) Assigned to Me — shows your open issues, (2) Sprint Health — shows current sprint progress, (3) Issue Statistics — set to show issues by Priority. Arrange them so the most important information is at the top. Save the dashboard.',
  prerequisites: ['jira-m2-l3-s1'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l3-s2-c1', description: 'A dashboard named "ARS-OS Status" exists with at least 3 gadgets.' },
      { id: 'jira-m2-l3-s2-c2', description: 'All 3 required gadgets are present and showing data.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l3s3: Step = {
  id: 'jira-m2-l3-s3',
  title: 'Write a sprint status report',
  instruction:
    'In Confluence, create a new page: "Sprint 1 Status Report". Write a 150-word report covering: Sprint goal, Issues completed (list them), Issues not completed and why, Key blockers encountered, Plan for next sprint. Use data from your Jira dashboard and reports. This is a real deliverable System Analysts produce at the end of every sprint.',
  prerequisites: ['jira-m2-l3-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'jira-m2-l3-s3-c1', description: 'The report is approximately 150 words.' },
      { id: 'jira-m2-l3-s3-c2', description: 'All 5 required sections are present.' },
      { id: 'jira-m2-l3-s3-c3', description: 'Completed and incomplete issues are listed by name, not just count.' },
      { id: 'jira-m2-l3-s3-c4', description: 'The report is saved in your Confluence ARS-OS Documentation space.' },
    ],
  },
  reflection: {
    id: 'jira-m2-l3-r',
    prompt: 'Without looking back: what is JQL and how is it similar to SQL? Write one JQL query that would find all high-priority bugs assigned to you that were created this month.',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m2l3: Lesson = {
  id: 'jira-m2-l3',
  title: 'JQL, Dashboards, and Reporting',
  description: 'Write JQL queries to filter issues, build a custom Jira dashboard, and produce a sprint status report in Confluence.',
  steps: [m2l3s1, m2l3s2, m2l3s3],
  dependencies: ['jira-m2-l2'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const module2: Module = {
  id: 'jira-m2',
  title: 'Confluence and System Analyst Workflows',
  description: 'Document requirements in Confluence, link specs to Jira issues, write meeting notes with traceable action items, and produce sprint reports.',
  lessons: [m2l1, m2l2, m2l3],
  order: 2,
};

// ===================================================================================
// SKILL
// ===================================================================================

export const jiraSkill: Skill = {
  id: 'jira',
  name: 'Jira / Confluence',
  category: 'System Analysis',
  description:
    'Go from zero to confidently managing work in Jira and documenting it in Confluence: create and manage Epics, Stories, and Bugs, run Sprints, write structured requirements pages, link specs to issues, use JQL for reporting, and produce the deliverables a System Analyst owns in a real agile team.',
  modules: [module1, module2],
  dependencies: [],
  maxLevel: 3,
  color: '#7c3aed',
};