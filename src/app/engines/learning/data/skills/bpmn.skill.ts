import type { Skill, Step, Module, Lesson } from '../../entities';

// ===================================================================================
// MODULE 1 — BPMN Notation Fundamentals
// ===================================================================================

const m1l1s1: Step = {
  id: 'bpmn-m1-l1-s1',
  title: 'Set up your diagramming tool',
  instruction:
    'Go to app.diagrams.net (also known as draw.io). Click "Start" — no account needed. When asked where to save, choose "Device" for now. A blank canvas opens. In the search bar on the left panel, type "BPMN" — you will see a BPMN shape library appear. Click to enable it. You should now see BPMN-specific shapes in the left panel.',
  prerequisites: [],
  resource: {
    id: 'bpmn-m1-l1-s1-res',
    type: 'tool',
    title: 'draw.io — Free Diagramming Tool',
    url: 'https://app.diagrams.net',
    whatIsThis:
      'The most widely used free diagramming tool. Supports BPMN 2.0 natively with a dedicated shape library. Works in the browser — no installation needed.',
    setupSteps: [
      'Go to app.diagrams.net.',
      'Click Start and choose "Device" for storage.',
      'In the left panel search box, type "BPMN".',
      'Click the BPMN shape library to enable it.',
    ],
  },
  estimatedMinutes: 5,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'bpmn-m1-l1-s1-c1', description: 'draw.io is open with a blank canvas and the BPMN shape library is visible in the left panel.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l1s2: Step = {
  id: 'bpmn-m1-l1-s2',
  title: 'Place and label the five core BPMN elements',
  instruction:
    'In draw.io, place one of each: (1) Start Event — circle with thin border, (2) End Event — circle with thick border, (3) Task — rounded rectangle, (4) Gateway — diamond shape, (5) Sequence Flow — arrow connecting two shapes. Label each shape with its element name. Connect them in order: Start → Task → Gateway → Task → End.',
  prerequisites: ['bpmn-m1-l1-s1'],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m1-l1-s2-c1', description: 'All 5 elements are on the canvas and correctly labelled.' },
      { id: 'bpmn-m1-l1-s2-c2', description: 'The elements are connected with arrows in a logical sequence.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1s3: Step = {
  id: 'bpmn-m1-l1-s3',
  title: 'Read the BPMN quick reference and identify 3 more elements',
  instruction:
    'Open the OMG BPMN reference poster (link below). Find 3 elements you have not used yet: Intermediate Event, Sub-Process, and Data Object. Read their descriptions. Then add one of each to your draw.io canvas and label them correctly.',
  prerequisites: ['bpmn-m1-l1-s2'],
  resource: {
    id: 'bpmn-m1-l1-s3-res',
    type: 'article',
    title: 'BPMN 2.0 Poster — OMG',
    url: 'https://www.omg.org/spec/BPMN/2.0/PDF',
    whatIsThis:
      'The official BPMN 2.0 specification from the Object Management Group — the organisation that created the standard. Use it as a reference, not a reading assignment.',
    setupSteps: [
      'Open the link — it is a PDF.',
      'Use Ctrl+F to search for "Intermediate Event", "Sub-Process", and "Data Object".',
      'Read only the element descriptions, not the full spec.',
    ],
  },
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m1-l1-s3-c1', description: 'Intermediate Event, Sub-Process, and Data Object are on your canvas and labelled.' },
      { id: 'bpmn-m1-l1-s3-c2', description: 'You can explain in one sentence what each of the 3 new elements represents.' },
    ],
  },
  reflection: {
    id: 'bpmn-m1-l1-r',
    prompt: 'Without looking back: name the 5 core BPMN elements and explain in one sentence when you would use a Gateway instead of going directly to the next Task.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1: Lesson = {
  id: 'bpmn-m1-l1',
  title: 'Core BPMN Elements',
  description: 'Set up draw.io, place and label the five core BPMN elements, and identify three additional elements from the official reference.',
  steps: [m1l1s1, m1l1s2, m1l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l2s1: Step = {
  id: 'bpmn-m1-l2-s1',
  title: 'Learn the three gateway types',
  instruction:
    'In draw.io, create three separate gateway shapes from the BPMN library. Label them: (1) Exclusive Gateway (XOR) — diamond with X — only one path is taken, (2) Parallel Gateway (AND) — diamond with + — all paths are taken simultaneously, (3) Inclusive Gateway (OR) — diamond with O — one or more paths are taken. Under each, write a one-line example of a real business decision that fits that type.',
  prerequisites: [],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m1-l2-s1-c1', description: 'All three gateway types are on the canvas with correct symbols and labels.' },
      { id: 'bpmn-m1-l2-s1-c2', description: 'Each gateway has a one-line real business example.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l2s2: Step = {
  id: 'bpmn-m1-l2-s2',
  title: 'Model a simple approval process with gateways',
  instruction:
    'In draw.io, model this process: "A manager submits an expense report. If the amount is under $500, it is auto-approved. If over $500, it goes to the Finance team for review. Finance either approves or rejects it. Both paths end with the manager being notified." Use: Start Event → Task → Exclusive Gateway → two paths → End Events. Label every element.',
  prerequisites: ['bpmn-m1-l2-s1'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m1-l2-s2-c1', description: 'The diagram has a Start Event, at least 2 Tasks, 1 Exclusive Gateway, and 2 End Events.' },
      { id: 'bpmn-m1-l2-s2-c2', description: 'Gateway paths are labelled with their conditions (e.g. "< $500" and "> $500").' },
      { id: 'bpmn-m1-l2-s2-c3', description: 'Every element is labelled — no unnamed shapes.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m1l2s3: Step = {
  id: 'bpmn-m1-l2-s3',
  title: 'Add a Parallel Gateway to the same diagram',
  instruction:
    'Extend your expense report diagram: after Finance approval, two things happen simultaneously — the manager receives a notification AND the accounting system is updated. Use a Parallel Gateway (AND) to split into two parallel tasks, then a Parallel Gateway to merge them before the End Event. Save the file as expense-report.drawio.',
  prerequisites: ['bpmn-m1-l2-s2'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m1-l2-s3-c1', description: 'The diagram has a Parallel Gateway splitting into 2 simultaneous tasks.' },
      { id: 'bpmn-m1-l2-s3-c2', description: 'A second Parallel Gateway merges the two paths before the End Event.' },
      { id: 'bpmn-m1-l2-s3-c3', description: 'The file is saved as expense-report.drawio.' },
    ],
  },
  reflection: {
    id: 'bpmn-m1-l2-r',
    prompt: 'Without looking back: what is the key difference between an Exclusive Gateway and a Parallel Gateway? Give a real business example of each.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2: Lesson = {
  id: 'bpmn-m1-l2',
  title: 'Gateways and Decision Points',
  description: 'Learn the three gateway types, model an approval process with Exclusive Gateways, and extend it with Parallel Gateways.',
  steps: [m1l2s1, m1l2s2, m1l2s3],
  dependencies: ['bpmn-m1-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l3s1: Step = {
  id: 'bpmn-m1-l3-s1',
  title: 'Understand Pools and Lanes',
  instruction:
    'In draw.io, add a Pool to a new blank canvas (find "Pool" in the BPMN library). Inside the Pool, add two Lanes: name one "Customer" and the other "Support Agent". Pools represent organisations or systems. Lanes represent roles or departments within that organisation. Each actor\'s tasks go in their lane.',
  prerequisites: [],
  estimatedMinutes: 8,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'bpmn-m1-l3-s1-c1', description: 'Your canvas has one Pool with two named Lanes: Customer and Support Agent.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l3s2: Step = {
  id: 'bpmn-m1-l3-s2',
  title: 'Model a customer support process with Swimlanes',
  instruction:
    'In your Pool with Customer and Support Agent lanes, model this process: Customer submits a support ticket → Support Agent reviews it → Agent decides: if simple, resolves immediately; if complex, escalates to a specialist (add a third lane: Specialist) → Specialist resolves → Customer receives resolution. Place each task in the correct lane. Use an Exclusive Gateway for the simple/complex decision.',
  prerequisites: ['bpmn-m1-l3-s1'],
  estimatedMinutes: 18,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m1-l3-s2-c1', description: 'The Pool has 3 lanes: Customer, Support Agent, Specialist.' },
      { id: 'bpmn-m1-l3-s2-c2', description: 'Each task is in the correct lane matching the actor who performs it.' },
      { id: 'bpmn-m1-l3-s2-c3', description: 'An Exclusive Gateway separates the simple and complex paths.' },
      { id: 'bpmn-m1-l3-s2-c4', description: 'The diagram has a Start Event in the Customer lane and an End Event after resolution.' },
    ],
  },
  baseXP: 25,
  baseCoins: 12,
};

const m1l3s3: Step = {
  id: 'bpmn-m1-l3-s3',
  title: 'Add a Message Flow between two Pools',
  instruction:
    'Add a second Pool below your first one and label it "Email System". In the Email System pool, add one task: "Send confirmation email". Connect the End Event of your support process to this task using a Message Flow (dashed arrow) — this represents communication between two separate organisations or systems. Save as support-process.drawio.',
  prerequisites: ['bpmn-m1-l3-s2'],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m1-l3-s3-c1', description: 'A second Pool labelled "Email System" is on the canvas.' },
      { id: 'bpmn-m1-l3-s3-c2', description: 'A dashed Message Flow arrow connects the first pool to the Email System pool.' },
      { id: 'bpmn-m1-l3-s3-c3', description: 'The file is saved as support-process.drawio.' },
    ],
  },
  reflection: {
    id: 'bpmn-m1-l3-r',
    prompt: 'Without looking back: what is the difference between a Sequence Flow (solid arrow) and a Message Flow (dashed arrow) in BPMN? When would you use each?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l3: Lesson = {
  id: 'bpmn-m1-l3',
  title: 'Pools, Lanes, and Message Flows',
  description: 'Model multi-actor processes using Pools and Swimlanes, and connect separate systems with Message Flows.',
  steps: [m1l3s1, m1l3s2, m1l3s3],
  dependencies: ['bpmn-m1-l2'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const module1: Module = {
  id: 'bpmn-m1',
  title: 'BPMN Notation Fundamentals',
  description: 'Master the core BPMN elements, gateway types, and swimlane notation using draw.io with real business process examples.',
  lessons: [m1l1, m1l2, m1l3],
  order: 1,
};

// ===================================================================================
// MODULE 2 — Modelling Real Business Processes
// ===================================================================================

const m2l1s1: Step = {
  id: 'bpmn-m2-l1-s1',
  title: 'Read a process description and identify actors and tasks',
  instruction:
    'Read this process description: "A customer places an order on an e-commerce website. The system checks inventory. If the item is in stock, the warehouse team picks and packs it, then hands it to the courier. If out of stock, the customer is notified and offered a refund or backorder. The courier delivers the item and the customer confirms receipt." In your note, list: all actors, all tasks, all decision points.',
  prerequisites: [],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l1-s1-c1', description: 'You listed at least 4 actors (Customer, System, Warehouse, Courier).' },
      { id: 'bpmn-m2-l1-s1-c2', description: 'You listed at least 6 tasks.' },
      { id: 'bpmn-m2-l1-s1-c3', description: 'You identified at least 2 decision points (gateways).' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l1s2: Step = {
  id: 'bpmn-m2-l1-s2',
  title: 'Model the order fulfilment process in draw.io',
  instruction:
    'Open draw.io. Create a Pool with lanes for each actor: Customer, System, Warehouse, Courier. Model the full order fulfilment process from your analysis. Include: Start Event, all tasks in correct lanes, Exclusive Gateways for decisions with labelled paths, End Events for each terminal path. All elements must be labelled.',
  prerequisites: ['bpmn-m2-l1-s1'],
  estimatedMinutes: 25,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l1-s2-c1', description: 'The diagram has 4 lanes with tasks assigned to the correct actor.' },
      { id: 'bpmn-m2-l1-s2-c2', description: 'Both decision points are modelled as Exclusive Gateways with labelled paths.' },
      { id: 'bpmn-m2-l1-s2-c3', description: 'There are at least 2 End Events covering the different terminal paths.' },
      { id: 'bpmn-m2-l1-s2-c4', description: 'Every shape is labelled — no unnamed elements.' },
    ],
  },
  baseXP: 30,
  baseCoins: 15,
};

const m2l1s3: Step = {
  id: 'bpmn-m2-l1-s3',
  title: 'Review your diagram for common BPMN mistakes',
  instruction:
    'Check your order fulfilment diagram against this list: (1) Every Sequence Flow goes in one direction — no loops without a Gateway, (2) Every Gateway has at least 2 outgoing paths, (3) No task has more than one incoming and one outgoing flow without a Gateway, (4) All End Events are reachable, (5) The Start Event has no incoming flow. Fix any issues found. Save as order-fulfilment.drawio.',
  prerequisites: ['bpmn-m2-l1-s2'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l1-s3-c1', description: 'All 5 checklist points pass for your diagram.' },
      { id: 'bpmn-m2-l1-s3-c2', description: 'The file is saved as order-fulfilment.drawio.' },
    ],
  },
  reflection: {
    id: 'bpmn-m2-l1-r',
    prompt: 'Without looking back: what is the most common BPMN mistake beginners make with Gateways, and how do you avoid it?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l1: Lesson = {
  id: 'bpmn-m2-l1',
  title: 'Modelling an Order Fulfilment Process',
  description: 'Analyse a written process description, identify actors and tasks, model it in draw.io, and review for common BPMN errors.',
  steps: [m2l1s1, m2l1s2, m2l1s3],
  dependencies: [],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const m2l2s1: Step = {
  id: 'bpmn-m2-l2-s1',
  title: 'Learn Timer and Error Events',
  instruction:
    'In draw.io, on a new canvas, place these three Intermediate Events from the BPMN library: (1) Timer Intermediate Event — clock symbol inside circle, (2) Error Intermediate Event — lightning bolt symbol, (3) Message Intermediate Event — envelope symbol. Label each and write one sentence explaining when you would use it in a real process.',
  prerequisites: [],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l2-s1-c1', description: 'All three Intermediate Events are on the canvas with correct symbols.' },
      { id: 'bpmn-m2-l2-s1-c2', description: 'Each event has a one-sentence real use case written below it.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l2s2: Step = {
  id: 'bpmn-m2-l2-s2',
  title: 'Add a timeout path to your order fulfilment diagram',
  instruction:
    'Open your order-fulfilment.drawio file. Find the "Deliver item" task in the Courier lane. Attach a Timer Boundary Event to it (right-click the task → Add → Boundary Event → Timer). Set it to represent "48 hours". Add a new path from the Timer Event to a new task: "Notify customer of delay". This models what happens if delivery takes too long.',
  prerequisites: ['bpmn-m2-l2-s1'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l2-s2-c1', description: 'A Timer Boundary Event is attached to the "Deliver item" task.' },
      { id: 'bpmn-m2-l2-s2-c2', description: 'The timer path leads to a "Notify customer of delay" task.' },
      { id: 'bpmn-m2-l2-s2-c3', description: 'The timer event is labelled "48 hours" or equivalent.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m2l2s3: Step = {
  id: 'bpmn-m2-l2-s3',
  title: 'Add an error handling path',
  instruction:
    'In the same diagram, find the "Pick and pack" task in the Warehouse lane. Attach an Error Boundary Event to it. Add a path from the Error Event to a new task: "Report inventory discrepancy" in the System lane. This models what happens when the warehouse discovers the item is actually out of stock during picking. Save the updated file.',
  prerequisites: ['bpmn-m2-l2-s2'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l2-s3-c1', description: 'An Error Boundary Event is attached to the "Pick and pack" task.' },
      { id: 'bpmn-m2-l2-s3-c2', description: 'The error path leads to a "Report inventory discrepancy" task.' },
      { id: 'bpmn-m2-l2-s3-c3', description: 'The file is saved with both the timer and error additions.' },
    ],
  },
  reflection: {
    id: 'bpmn-m2-l2-r',
    prompt: 'Without looking back: explain the difference between a Timer Boundary Event and an Error Boundary Event. Give a real business scenario for each.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2: Lesson = {
  id: 'bpmn-m2-l2',
  title: 'Intermediate Events and Exception Handling',
  description: 'Learn Timer, Error, and Message Intermediate Events, then add timeout and error handling paths to a real process diagram.',
  steps: [m2l2s1, m2l2s2, m2l2s3],
  dependencies: ['bpmn-m2-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l3s1: Step = {
  id: 'bpmn-m2-l3-s1',
  title: 'Find a real process to model',
  instruction:
    'Choose one of these real processes you interact with regularly: (a) Applying for a job online, (b) Returning a product to an online store, (c) Opening a bank account online. Write a plain text description of the process from your own experience — every step you go through, every decision point, every actor involved. Aim for 150–200 words.',
  prerequisites: [],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l3-s1-c1', description: 'Your description is 150–200 words.' },
      { id: 'bpmn-m2-l3-s1-c2', description: 'You identified at least 3 actors and 5 tasks.' },
      { id: 'bpmn-m2-l3-s1-c3', description: 'You identified at least 2 decision points.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l3s2: Step = {
  id: 'bpmn-m2-l3-s2',
  title: 'Model your chosen process in draw.io',
  instruction:
    'Open draw.io and model the process you described. Requirements: use Pools and Lanes for each actor, at least 2 Exclusive Gateways, at least one Intermediate Event (Timer or Message), all elements labelled, Start and End Events present. This is a free-form exercise — model what you actually experience, not an idealised version.',
  prerequisites: ['bpmn-m2-l3-s1'],
  estimatedMinutes: 25,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l3-s2-c1', description: 'The diagram uses Pools and Lanes with actors assigned correctly.' },
      { id: 'bpmn-m2-l3-s2-c2', description: 'At least 2 Exclusive Gateways with labelled paths are present.' },
      { id: 'bpmn-m2-l3-s2-c3', description: 'At least one Intermediate Event is included.' },
      { id: 'bpmn-m2-l3-s2-c4', description: 'All elements are labelled.' },
    ],
  },
  baseXP: 30,
  baseCoins: 15,
};

const m2l3s3: Step = {
  id: 'bpmn-m2-l3-s3',
  title: 'Identify one process inefficiency and model the improved version',
  instruction:
    'Look at your diagram and find one step that seems wasteful, redundant, or error-prone. Write in your note: what the problem is and why. Then create a second version of the relevant portion of the diagram showing how the process could be improved. It does not need to be a complete re-draw — just the changed section with a note explaining the improvement.',
  prerequisites: ['bpmn-m2-l3-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m2-l3-s3-c1', description: 'You identified and described one specific inefficiency.' },
      { id: 'bpmn-m2-l3-s3-c2', description: 'You drew an improved version of the affected section.' },
      { id: 'bpmn-m2-l3-s3-c3', description: 'The improvement is explained in plain language in your note.' },
    ],
  },
  reflection: {
    id: 'bpmn-m2-l3-r',
    prompt: 'Without looking back: what is the main value a BPMN diagram provides to a business stakeholder who cannot read code?',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m2l3: Lesson = {
  id: 'bpmn-m2-l3',
  title: 'Modelling a Real Process from Experience',
  description: 'Choose a real process, describe it in plain text, model it in BPMN, and identify one improvement opportunity.',
  steps: [m2l3s1, m2l3s2, m2l3s3],
  dependencies: ['bpmn-m2-l2'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const module2: Module = {
  id: 'bpmn-m2',
  title: 'Modelling Real Business Processes',
  description: 'Model a full order fulfilment process, add exception handling with Boundary Events, and practise with a real-world process of your choice.',
  lessons: [m2l1, m2l2, m2l3],
  order: 2,
};

// ===================================================================================
// MODULE 3 — BPMN for System Analysis
// ===================================================================================

const m3l1s1: Step = {
  id: 'bpmn-m3-l1-s1',
  title: 'Understand the difference between AS-IS and TO-BE',
  instruction:
    'In your note, write definitions for: AS-IS process (how it works today — with all its problems, workarounds, and inefficiencies) and TO-BE process (how it should work after the improvement). Then read this scenario: "Currently, approving a purchase order takes 5 days because it goes through 3 managers by email. The company wants to reduce it to 1 day using an automated approval system." Write which parts of this scenario describe AS-IS and which describe TO-BE.',
  prerequisites: [],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m3-l1-s1-c1', description: 'You correctly identified AS-IS elements (email, 3 managers, 5 days) in the scenario.' },
      { id: 'bpmn-m3-l1-s1-c2', description: 'You correctly identified TO-BE elements (automated system, 1 day) in the scenario.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l1s2: Step = {
  id: 'bpmn-m3-l1-s2',
  title: 'Draw the AS-IS purchase order process',
  instruction:
    'In draw.io, model the AS-IS purchase order process from the scenario: Requester submits a PO by email → Manager 1 reviews and forwards → Manager 2 reviews and forwards → Manager 3 approves or rejects → Requester is notified. Use Pools and Lanes. Include a Gateway for approve/reject. Label every element. This is intentionally slow and manual — that is the point.',
  prerequisites: ['bpmn-m3-l1-s1'],
  estimatedMinutes: 18,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m3-l1-s2-c1', description: 'The AS-IS diagram has 4 lanes: Requester, Manager 1, Manager 2, Manager 3.' },
      { id: 'bpmn-m3-l1-s2-c2', description: 'An Exclusive Gateway models the approve/reject decision.' },
      { id: 'bpmn-m3-l1-s2-c3', description: 'The diagram clearly shows the sequential, manual nature of the current process.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l1s3: Step = {
  id: 'bpmn-m3-l1-s3',
  title: 'Draw the TO-BE purchase order process',
  instruction:
    'On a new canvas, model the TO-BE process: Requester submits via an online system → System automatically checks if amount is under $1000 (auto-approve) or over (route to single approver) → Approver reviews in the system → System sends notification. Use a Parallel Gateway where appropriate — the notification and the approval record can be saved simultaneously. Save both files: po-as-is.drawio and po-to-be.drawio.',
  prerequisites: ['bpmn-m3-l1-s2'],
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m3-l1-s3-c1', description: 'The TO-BE diagram is visibly simpler than the AS-IS diagram.' },
      { id: 'bpmn-m3-l1-s3-c2', description: 'A System lane is present showing automated steps.' },
      { id: 'bpmn-m3-l1-s3-c3', description: 'Both files are saved with the correct names.' },
    ],
  },
  reflection: {
    id: 'bpmn-m3-l1-r',
    prompt: 'Without looking back: when presenting an AS-IS and TO-BE diagram to a business stakeholder, what is the single most important difference to highlight — and how would you explain it without using technical terms?',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l1: Lesson = {
  id: 'bpmn-m3-l1',
  title: 'AS-IS and TO-BE Process Analysis',
  description: 'Model both the current (AS-IS) and improved (TO-BE) versions of a purchase order process, showing the analyst\'s role in process improvement.',
  steps: [m3l1s1, m3l1s2, m3l1s3],
  dependencies: [],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const m3l2s1: Step = {
  id: 'bpmn-m3-l2-s1',
  title: 'Connect a BPMN process to user stories',
  instruction:
    'Take your TO-BE purchase order process. For each Task in the diagram, write one user story in this format: "As a [actor], I want to [action] so that [benefit]." For example: "As a Requester, I want to submit a purchase order online so that I do not have to send emails." Write user stories for at least 4 tasks.',
  prerequisites: [],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m3-l2-s1-c1', description: 'You wrote at least 4 user stories in the correct format.' },
      { id: 'bpmn-m3-l2-s1-c2', description: 'Each user story matches a specific task in your BPMN diagram.' },
      { id: 'bpmn-m3-l2-s1-c3', description: 'The "so that" part describes a business benefit, not a technical detail.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l2s2: Step = {
  id: 'bpmn-m3-l2-s2',
  title: 'Identify system requirements from the BPMN diagram',
  instruction:
    'Look at your TO-BE diagram. For each automated task (tasks in the System lane), write one functional requirement using the "The system shall..." format. For example: "The system shall automatically approve purchase orders under $1,000 and notify the requester within 5 minutes." Write requirements for all system tasks.',
  prerequisites: ['bpmn-m3-l2-s1'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m3-l2-s2-c1', description: 'You wrote one requirement for each system task in the diagram.' },
      { id: 'bpmn-m3-l2-s2-c2', description: 'Each requirement uses "The system shall..." format.' },
      { id: 'bpmn-m3-l2-s2-c3', description: 'Requirements include measurable conditions where appropriate (time limits, thresholds).' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l2s3: Step = {
  id: 'bpmn-m3-l2-s3',
  title: 'Create a requirements traceability matrix',
  instruction:
    'In a note or simple table, create a Requirements Traceability Matrix with 3 columns: BPMN Task | User Story | System Requirement. Fill in one row for each automated task. This table shows how every requirement traces back to a process step and a user need — a core deliverable of a System Analyst.',
  prerequisites: ['bpmn-m3-l2-s2'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m3-l2-s3-c1', description: 'Your table has 3 columns: BPMN Task, User Story, System Requirement.' },
      { id: 'bpmn-m3-l2-s3-c2', description: 'Every automated task has a complete row with all 3 fields filled in.' },
      { id: 'bpmn-m3-l2-s3-c3', description: 'The requirements in column 3 match the user stories in column 2.' },
    ],
  },
  reflection: {
    id: 'bpmn-m3-l2-r',
    prompt: 'Without looking back: why does a System Analyst need a traceability matrix? What problem does it solve when a developer asks "why do we need this feature?"',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l2: Lesson = {
  id: 'bpmn-m3-l2',
  title: 'From BPMN to Requirements',
  description: 'Derive user stories and system requirements from a BPMN diagram, then link them in a Requirements Traceability Matrix.',
  steps: [m3l2s1, m3l2s2, m3l2s3],
  dependencies: ['bpmn-m3-l1'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const m3l3s1: Step = {
  id: 'bpmn-m3-l3-s1',
  title: 'Read a Camunda BPMN tutorial',
  instruction:
    'Go to docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-concepts/. Read the "Process Definitions" and "Process Instances" sections. Write in your note: (1) what a Process Definition is, (2) what a Process Instance is, (3) the difference between the two. This shows you how BPMN diagrams are executed by a real process engine.',
  prerequisites: [],
  resource: {
    id: 'bpmn-m3-l3-s1-res',
    type: 'article',
    title: 'Camunda Documentation — Process Engine Concepts',
    url: 'https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-concepts/',
    whatIsThis:
      'Official Camunda documentation. Camunda is the most widely used open-source BPMN process engine — used in enterprise software across banking, insurance, and logistics. Understanding how it executes BPMN makes your diagrams more precise.',
    setupSteps: [
      'Open the link.',
      'Read only "Process Definitions" and "Process Instances" sections.',
      'Skip the code examples for now.',
    ],
  },
  estimatedMinutes: 12,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'bpmn-m3-l3-s1-c1', description: 'You can explain in plain language what a Process Definition is (the blueprint).' },
      { id: 'bpmn-m3-l3-s1-c2', description: 'You can explain what a Process Instance is (one execution of the blueprint).' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l3s2: Step = {
  id: 'bpmn-m3-l3-s2',
  title: 'Open Camunda Modeler and import your diagram',
  instruction:
    'Go to camunda.com/download/modeler and download the free Camunda Modeler desktop app. Install and open it. Create a new BPMN diagram. Recreate your TO-BE purchase order process (or draw a simpler 3-step version if time is short). The Camunda Modeler is stricter than draw.io — it will flag invalid BPMN. Fix any validation errors it shows.',
  prerequisites: ['bpmn-m3-l3-s1'],
  resource: {
    id: 'bpmn-m3-l3-s2-res',
    type: 'tool',
    title: 'Camunda Modeler — Free Download',
    url: 'https://camunda.com/download/modeler/',
    whatIsThis:
      'The official BPMN modeller from Camunda. Produces executable BPMN files that can run on a real process engine. More precise than draw.io for learning correct BPMN.',
    setupSteps: [
      'Go to camunda.com/download/modeler.',
      'Download for your OS and install.',
      'Open the app and click "New BPMN Diagram".',
    ],
  },
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m3-l3-s2-c1', description: 'Camunda Modeler is installed and open.' },
      { id: 'bpmn-m3-l3-s2-c2', description: 'You have a BPMN diagram in Camunda Modeler with no validation errors.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l3s3: Step = {
  id: 'bpmn-m3-l3-s3',
  title: 'Export your diagram and write a process summary',
  instruction:
    'In Camunda Modeler, export your diagram as a PNG image (File → Export as Image). Then write a 100-word process summary in plain English — as if you are handing this diagram to a business stakeholder who has never seen BPMN. The summary must explain: what the process does, who is involved, what the system does automatically, and what the key decision point is.',
  prerequisites: ['bpmn-m3-l3-s2'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'bpmn-m3-l3-s3-c1', description: 'You exported the diagram as a PNG file.' },
      { id: 'bpmn-m3-l3-s3-c2', description: 'Your summary is approximately 100 words.' },
      { id: 'bpmn-m3-l3-s3-c3', description: 'The summary covers all 4 required points: purpose, actors, automation, decision.' },
      { id: 'bpmn-m3-l3-s3-c4', description: 'The summary uses no BPMN jargon — a non-technical reader can understand it.' },
    ],
  },
  reflection: {
    id: 'bpmn-m3-l3-r',
    prompt: 'Without looking back: what is the difference between a BPMN diagram in draw.io and one in Camunda Modeler? Why does that difference matter for a System Analyst working with developers?',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l3: Lesson = {
  id: 'bpmn-m3-l3',
  title: 'BPMN with Camunda Modeler',
  description: 'Learn how process engines execute BPMN, build a diagram in Camunda Modeler, and produce a stakeholder-ready process summary.',
  steps: [m3l3s1, m3l3s2, m3l3s3],
  dependencies: ['bpmn-m3-l2'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const module3: Module = {
  id: 'bpmn-m3',
  title: 'BPMN for System Analysis',
  description: 'Apply BPMN to real analyst work: AS-IS/TO-BE analysis, requirements traceability, and professional-grade modelling with Camunda.',
  lessons: [m3l1, m3l2, m3l3],
  order: 3,
};

// ===================================================================================
// SKILL
// ===================================================================================

export const bpmnSkill: Skill = {
  id: 'bpmn',
  name: 'BPMN / UML',
  category: 'System Analysis',
  description:
    'Go from zero to confidently modelling real business processes in BPMN 2.0: master core notation, model multi-actor processes with gateways and events, perform AS-IS/TO-BE analysis, derive requirements from diagrams, and produce professional deliverables using draw.io and Camunda Modeler.',
  modules: [module1, module2, module3],
  dependencies: ['sql'],
  maxLevel: 4,
  color: '#7f1d1d',
};