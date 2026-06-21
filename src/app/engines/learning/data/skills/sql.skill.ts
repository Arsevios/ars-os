import type { Skill, Step } from '../../entities';

// ===================================================================================
// MODULE 1 — SQL Foundations
// ===================================================================================

const m1l1s1: Step = {
  id: 'sql-m1-l1-s1',
  title: 'Understand what SQL does',
  instruction:
    'This step is reading only, no tool needed yet. SQL is a language for asking questions to a database. A database stores information in tables: each table has rows (records, e.g. one customer) and columns (fields, e.g. name, country). A query is a written question, like "show me all customers from Spain," translated into SQL: SELECT * FROM customers WHERE country = \'Spain\'. To start, just open the linked resource and read it.',
  prerequisites: [],
  resource: {
    id: 'sql-m1-l1-s1-res',
    type: 'article',
    title: 'W3Schools — SQL Introduction',
    url: 'https://www.w3schools.com/sql/sql_intro.asp',
    whatIsThis:
      'A short reference page explaining what SQL is, in plain language, with a sample table.',
    setupSteps: [
      'Open the link in any browser, phone or laptop.',
      'No login or installation needed.',
      'Read only the "What is SQL" and "What Can SQL do" sections — skip the rest for now.',
    ],
  },
  estimatedMinutes: 5,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'sql-m1-l1-s1-c1', description: 'You can explain in your own words what a table row is and what a table column is.' },
      { id: 'sql-m1-l1-s1-c2', description: 'You can explain in one sentence what a SQL query is used for.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l1s2: Step = {
  id: 'sql-m1-l1-s2',
  title: 'Open your SQL practice tool',
  instruction:
    'Set up the workspace you will use for every exercise in this skill. Open your phone or laptop browser, type sqliteonline.com into the address bar, and press Enter. Wait for the page to load — you will see an empty code editor panel. If a "New" or template dialog appears, close it (tap the X); the default SQLite database is already active and ready to use. Nothing needs to be installed, it runs in the browser.',
  prerequisites: ['sql-m1-l1-s1'],
  resource: {
    id: 'sql-m1-l1-s2-res',
    type: 'interactive',
    title: 'SQLite Online',
    url: 'https://sqliteonline.com',
    whatIsThis:
      'A free, browser-based SQL editor that runs a real SQLite database. Works on phone and desktop. No installation, no account, no payment required.',
    setupSteps: [
      'Open your browser and go to sqliteonline.com.',
      'Wait for the editor panel on the left to finish loading.',
      'Close any "New database" dialog that appears — the default database is already selected.',
      'You write SQL in the editor and press the Run/Play button (▶) to execute it.',
    ],
  },
  estimatedMinutes: 3,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'sql-m1-l1-s2-c1', description: 'The SQLite Online editor page is open and fully loaded in your browser, with no dialog blocking the editor.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l1s3: Step = {
  id: 'sql-m1-l1-s3',
  title: 'Run your first query',
  instruction:
    'In the SQLite Online editor you opened in the previous step, type SELECT 1+1; and press the Run button (▶). Success looks like a results table appearing below the editor with one row, one column, and the value 2.',
  prerequisites: ['sql-m1-l1-s2'],
  estimatedMinutes: 3,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m1-l1-s3-c1', description: 'Running SELECT 1+1; produces a result table containing the single value 2.' },
    ],
    exampleAnswer: '2',
  },
  reflection: {
    id: 'sql-m1-l1-r',
    prompt:
      'Without looking back, write down: what is a row, what is a column, and which website you will use to practice SQL.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1: Lesson = {
  id: 'sql-m1-l1',
  title: 'What SQL Is and Setting Up Your Workspace',
  description:
    'Understand what SQL and a database are, then set up a free browser-based SQL editor and run your very first query.',
  steps: [m1l1s1, m1l1s2, m1l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l2s1: Step = {
  id: 'sql-m1-l2-s1',
  title: 'Create a practice table',
  instruction:
    'In the SQLite Online editor (already open from the previous lesson), copy, paste, and run exactly this: CREATE TABLE customers (id INTEGER, name TEXT, country TEXT); INSERT INTO customers VALUES (1,\'Ana\',\'Spain\'),(2,\'Boris\',\'Belarus\'),(3,\'Caro\',\'Uruguay\'); Success looks like no red error message appearing after running it.',
  prerequisites: [],
  estimatedMinutes: 5,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'sql-m1-l2-s1-c1', description: 'Running the CREATE TABLE and INSERT statements produces no error message.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l2s2: Step = {
  id: 'sql-m1-l2-s2',
  title: 'Select all columns from the table',
  instruction:
    'In the SQLite Online editor, type SELECT * FROM customers; and run it. The * means "all columns." Success looks like a results table with 3 rows and three columns: id, name, country.',
  prerequisites: ['sql-m1-l2-s1'],
  estimatedMinutes: 3,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m1-l2-s2-c1', description: 'The result table shows exactly 3 rows with columns id, name, and country.' },
    ],
    exampleAnswer: '1|Ana|Spain\n2|Boris|Belarus\n3|Caro|Uruguay',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l2s3: Step = {
  id: 'sql-m1-l2-s3',
  title: 'Select specific columns',
  instruction:
    'In the SQLite Online editor, type SELECT name, country FROM customers; and run it. Success looks like a results table showing only the name and country columns (no id column), still 3 rows.',
  prerequisites: ['sql-m1-l2-s2'],
  estimatedMinutes: 3,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m1-l2-s3-c1', description: 'The result shows only the name and country columns, with 3 rows and no id column.' },
    ],
    exampleAnswer: 'Ana|Spain\nBoris|Belarus\nCaro|Uruguay',
  },
  reflection: {
    id: 'sql-m1-l2-r',
    prompt: 'Without looking back, write the SQL query that selects only the name column from a table called customers.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2: Lesson = {
  id: 'sql-m1-l2',
  title: 'SELECT and FROM',
  description: 'Create your first table and practice reading data from it with SELECT and FROM.',
  steps: [m1l2s1, m1l2s2, m1l2s3],
  dependencies: ['sql-m1-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l3s1: Step = {
  id: 'sql-m1-l3-s1',
  title: 'Understand the WHERE clause',
  instruction:
    'This step is reading only, no tool needed yet. WHERE filters rows so only the ones matching a condition are returned. Example: WHERE country = \'Spain\' keeps only rows where the country column equals Spain. Text values go in single quotes, numbers do not.',
  prerequisites: [],
  estimatedMinutes: 4,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'sql-m1-l3-s1-c1', description: 'You can explain why text values need single quotes in a WHERE clause but numbers do not.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l3s2: Step = {
  id: 'sql-m1-l3-s2',
  title: 'Filter with one condition',
  instruction:
    'In the SQLite Online editor, run SELECT * FROM customers WHERE country = \'Uruguay\'; Success looks like exactly one row being returned: Caro, Uruguay.',
  prerequisites: ['sql-m1-l3-s1'],
  estimatedMinutes: 3,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m1-l3-s2-c1', description: 'Only Caro\'s row (Uruguay) is returned.' },
    ],
    exampleAnswer: '3|Caro|Uruguay',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l3s3: Step = {
  id: 'sql-m1-l3-s3',
  title: 'Combine conditions with AND / OR',
  instruction:
    'In the SQLite Online editor, run SELECT * FROM customers WHERE country = \'Spain\' OR country = \'Uruguay\'; Success looks like exactly two rows being returned: Ana and Caro, not Boris.',
  prerequisites: ['sql-m1-l3-s2'],
  estimatedMinutes: 4,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m1-l3-s3-c1', description: 'Exactly two rows are returned (Ana and Caro), and Boris is excluded.' },
    ],
    exampleAnswer: '1|Ana|Spain\n3|Caro|Uruguay',
  },
  reflection: {
    id: 'sql-m1-l3-r',
    prompt: 'Without looking back, write a WHERE clause that would return customers from Belarus AND whose id is greater than 1.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l3: Lesson = {
  id: 'sql-m1-l3',
  title: 'Filtering Rows with WHERE',
  description: 'Learn to filter rows using WHERE, with single and combined conditions.',
  steps: [m1l3s1, m1l3s2, m1l3s3],
  dependencies: ['sql-m1-l2'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const module1: Module = {
  id: 'sql-m1',
  title: 'SQL Foundations',
  description: 'Set up your tool and learn to read and filter data from a single table.',
  lessons: [m1l1, m1l2, m1l3],
  order: 1,
};

// ===================================================================================
// MODULE 2 — Sorting and Aggregating Data
// ===================================================================================

const m2l1s1: Step = {
  id: 'sql-m2-l1-s1',
  title: 'Understand ORDER BY',
  instruction:
    'This step is reading only, no tool needed yet. ORDER BY sorts results. ASC means ascending (A→Z, smallest→largest, the default if omitted). DESC means descending (Z→A, largest→smallest).',
  prerequisites: [],
  estimatedMinutes: 3,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'sql-m2-l1-s1-c1', description: 'You can state which direction ASC and DESC each sort in, from memory.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l1s2: Step = {
  id: 'sql-m2-l1-s2',
  title: 'Sort alphabetically',
  instruction:
    'In the SQLite Online editor, run SELECT * FROM customers ORDER BY name ASC; Success looks like rows appearing in the order: Ana, Boris, Caro.',
  prerequisites: ['sql-m2-l1-s1'],
  estimatedMinutes: 3,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m2-l1-s2-c1', description: 'Rows are returned in the order Ana, Boris, Caro.' },
    ],
    exampleAnswer: 'Ana, Boris, Caro',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l1s3: Step = {
  id: 'sql-m2-l1-s3',
  title: 'Sort in reverse',
  instruction:
    'In the SQLite Online editor, run SELECT * FROM customers ORDER BY id DESC; Success looks like rows appearing in the order: id 3 (Caro), id 2 (Boris), id 1 (Ana).',
  prerequisites: ['sql-m2-l1-s2'],
  estimatedMinutes: 3,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m2-l1-s3-c1', description: 'Rows are returned in the order id 3, id 2, id 1.' },
    ],
    exampleAnswer: '3, 2, 1',
  },
  reflection: {
    id: 'sql-m2-l1-r',
    prompt: 'Without looking back, what keyword reverses the default sort order?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l1: Lesson = {
  id: 'sql-m2-l1',
  title: 'Sorting Results with ORDER BY',
  description: 'Control the order in which query results are returned.',
  steps: [m2l1s1, m2l1s2, m2l1s3],
  dependencies: ['sql-m1-l3'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l2s1: Step = {
  id: 'sql-m2-l2-s1',
  title: 'Create an orders table with numbers to aggregate',
  instruction:
    'In the SQLite Online editor, copy, paste, and run: CREATE TABLE orders (id INTEGER, customer_id INTEGER, amount REAL); INSERT INTO orders VALUES (1,1,50),(2,1,80),(3,2,30),(4,3,120),(5,3,40); Success looks like no error message appearing after running it.',
  prerequisites: [],
  estimatedMinutes: 5,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'sql-m2-l2-s1-c1', description: 'Running the CREATE TABLE and INSERT statements produces no error message.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l2s2: Step = {
  id: 'sql-m2-l2-s2',
  title: 'Count rows',
  instruction:
    'In the SQLite Online editor, run SELECT COUNT(*) FROM orders; Success looks like a result showing the number 5.',
  prerequisites: ['sql-m2-l2-s1'],
  estimatedMinutes: 3,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m2-l2-s2-c1', description: 'The result shows the number 5.' },
    ],
    exampleAnswer: '5',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l2s3: Step = {
  id: 'sql-m2-l2-s3',
  title: 'Sum and average a column',
  instruction:
    'In the SQLite Online editor, run SELECT SUM(amount), AVG(amount) FROM orders; Success looks like a result showing SUM = 320 and AVG = 64.',
  prerequisites: ['sql-m2-l2-s2'],
  estimatedMinutes: 4,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m2-l2-s3-c1', description: 'The result shows SUM = 320 and AVG = 64.' },
    ],
    exampleAnswer: '320|64',
  },
  reflection: {
    id: 'sql-m2-l2-r',
    prompt: 'Without looking back, write the query that would return the largest single order amount.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2: Lesson = {
  id: 'sql-m2-l2',
  title: 'Aggregate Functions: COUNT, SUM, AVG',
  description: 'Summarize numeric data across many rows using aggregate functions.',
  steps: [m2l2s1, m2l2s2, m2l2s3],
  dependencies: ['sql-m2-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l3s1: Step = {
  id: 'sql-m2-l3-s1',
  title: 'Understand GROUP BY',
  instruction:
    'This step is reading only, no tool needed yet. GROUP BY collects rows that share the same value in a column into one group, so aggregate functions (COUNT, SUM, etc.) run per group instead of over the whole table. Example: grouping orders by customer_id gives one total per customer instead of one grand total.',
  prerequisites: [],
  estimatedMinutes: 4,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'sql-m2-l3-s1-c1', description: 'You can explain why GROUP BY is needed instead of just SUM(amount) when you want a total per customer.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l3s2: Step = {
  id: 'sql-m2-l3-s2',
  title: 'Count orders per customer',
  instruction:
    'In the SQLite Online editor, run SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id; Success looks like three rows: customer_id 1 → 2, customer_id 2 → 1, customer_id 3 → 2.',
  prerequisites: ['sql-m2-l3-s1'],
  estimatedMinutes: 4,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m2-l3-s2-c1', description: 'Three rows are returned matching customer_id 1→2, 2→1, 3→2.' },
    ],
    exampleAnswer: '1|2\n2|1\n3|2',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l3s3: Step = {
  id: 'sql-m2-l3-s3',
  title: 'Filter groups with HAVING',
  instruction:
    'In the SQLite Online editor, run SELECT customer_id, SUM(amount) FROM orders GROUP BY customer_id HAVING SUM(amount) > 100; Success looks like only customer_id 3 being returned with a total of 160 (WHERE cannot be used here because it runs before grouping — HAVING runs after).',
  prerequisites: ['sql-m2-l3-s2'],
  estimatedMinutes: 5,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m2-l3-s3-c1', description: 'Only customer_id 3 is returned, with a total of 160.' },
    ],
    exampleAnswer: '3|160',
  },
  reflection: {
    id: 'sql-m2-l3-r',
    prompt: 'Without looking back, explain in one sentence why HAVING is used instead of WHERE when filtering on an aggregate like SUM().',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l3: Lesson = {
  id: 'sql-m2-l3',
  title: 'Grouping Data with GROUP BY and HAVING',
  description: 'Group rows by a shared value and filter those groups with HAVING.',
  steps: [m2l3s1, m2l3s2, m2l3s3],
  dependencies: ['sql-m2-l2'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const module2: Module = {
  id: 'sql-m2',
  title: 'Sorting and Aggregating Data',
  description: 'Order results and summarize numeric data with aggregate functions and grouping.',
  lessons: [m2l1, m2l2, m2l3],
  order: 2,
};

// ===================================================================================
// MODULE 3 — Combining Tables with JOIN
// ===================================================================================

const m3l1s1: Step = {
  id: 'sql-m3-l1-s1',
  title: 'Understand why data is split across tables',
  instruction:
    'This step is reading only, no tool needed yet. Real databases avoid repeating data: customer details live once in customers, and orders only store a customer_id pointing back to that customer. This avoids duplicating a customer\'s name and country on every single order row.',
  prerequisites: [],
  estimatedMinutes: 4,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'sql-m3-l1-s1-c1', description: 'You can explain why storing the full customer name on every order row would be wasteful and error-prone.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l1s2: Step = {
  id: 'sql-m3-l1-s2',
  title: 'See the problem directly',
  instruction:
    'In the SQLite Online editor, run SELECT * FROM orders; Success looks like seeing customer_id values (1, 2, 3) but no customer names, confirming you cannot tell who placed each order from this table alone.',
  prerequisites: ['sql-m3-l1-s1'],
  estimatedMinutes: 3,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'sql-m3-l1-s2-c1', description: 'You can see the orders table only contains customer_id numbers, with no customer names.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l1s3: Step = {
  id: 'sql-m3-l1-s3',
  title: 'Manually match an order to a customer',
  instruction:
    'Pick order id 4 from the orders table (customer_id 3). In the SQLite Online editor, run SELECT * FROM customers WHERE id = 3; to find out who that is, without using JOIN yet. Success looks like the result showing Caro, Uruguay.',
  prerequisites: ['sql-m3-l1-s2'],
  estimatedMinutes: 4,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m3-l1-s3-c1', description: 'The result correctly shows Caro, Uruguay as the customer behind order id 4.' },
    ],
    exampleAnswer: '3|Caro|Uruguay',
  },
  reflection: {
    id: 'sql-m3-l1-r',
    prompt: 'Without looking back, explain why customer_id exists in the orders table instead of the full customer name.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l1: Lesson = {
  id: 'sql-m3-l1',
  title: 'Why We Need Joins',
  description: 'Understand why data lives in separate tables and what problem JOIN solves.',
  steps: [m3l1s1, m3l1s2, m3l1s3],
  dependencies: ['sql-m2-l3'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m3l2s1: Step = {
  id: 'sql-m3-l2-s1',
  title: 'Understand INNER JOIN syntax',
  instruction:
    'This step is reading only, no tool needed yet. INNER JOIN combines rows from two tables where a condition matches. Syntax: SELECT columns FROM tableA INNER JOIN tableB ON tableA.column = tableB.column. It only returns rows that have a match in both tables.',
  prerequisites: [],
  estimatedMinutes: 4,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'sql-m3-l2-s1-c1', description: 'You can point to the part of the syntax that decides which rows are considered a match.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l2s2: Step = {
  id: 'sql-m3-l2-s2',
  title: 'Join customers and orders',
  instruction:
    'In the SQLite Online editor, run SELECT orders.id, customers.name, orders.amount FROM orders INNER JOIN customers ON orders.customer_id = customers.id; Success looks like 5 rows being returned, each showing an order id together with the actual customer name instead of just a number.',
  prerequisites: ['sql-m3-l2-s1'],
  estimatedMinutes: 5,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m3-l2-s2-c1', description: '5 rows are returned, each with a customer name instead of a customer_id number.' },
    ],
    exampleAnswer: '1|Ana|50\n2|Ana|80\n3|Boris|30\n4|Caro|120\n5|Caro|40',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l2s3: Step = {
  id: 'sql-m3-l2-s3',
  title: 'Join and filter together',
  instruction:
    'In the SQLite Online editor, run SELECT orders.id, customers.name, orders.amount FROM orders INNER JOIN customers ON orders.customer_id = customers.id WHERE customers.country = \'Spain\'; Success looks like only Ana\'s 2 orders being returned (id 1 and 2).',
  prerequisites: ['sql-m3-l2-s2'],
  estimatedMinutes: 5,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m3-l2-s3-c1', description: 'Only Ana\'s two orders (id 1 and 2) are returned.' },
    ],
    exampleAnswer: '1|Ana|50\n2|Ana|80',
  },
  reflection: {
    id: 'sql-m3-l2-r',
    prompt: 'Without looking back, write the ON condition that links orders.customer_id to the correct customer.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l2: Lesson = {
  id: 'sql-m3-l2',
  title: 'INNER JOIN',
  description: 'Combine two tables and return only rows that match in both.',
  steps: [m3l2s1, m3l2s2, m3l2s3],
  dependencies: ['sql-m3-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m3l3s1: Step = {
  id: 'sql-m3-l3-s1',
  title: 'Understand the difference between INNER and LEFT JOIN',
  instruction:
    'This step is reading only, no tool needed yet. INNER JOIN only returns rows with a match on both sides. LEFT JOIN returns every row from the left (first) table, and fills in NULL for any columns from the right table when there is no match.',
  prerequisites: [],
  estimatedMinutes: 4,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'sql-m3-l3-s1-c1', description: 'You can state which table is the "left" table in: FROM customers LEFT JOIN orders.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l3s2: Step = {
  id: 'sql-m3-l3-s2',
  title: 'Add a customer with no orders, then LEFT JOIN',
  instruction:
    'In the SQLite Online editor, run INSERT INTO customers VALUES (4,\'Dmitri\',\'Poland\'); Then run SELECT customers.name, orders.id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id; Success looks like Dmitri appearing in the results with NULL in the orders.id column, instead of being missing entirely.',
  prerequisites: ['sql-m3-l3-s1'],
  estimatedMinutes: 5,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m3-l3-s2-c1', description: 'Dmitri appears in the results with NULL in the orders.id column.' },
    ],
    exampleAnswer: 'Dmitri|NULL',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l3s3: Step = {
  id: 'sql-m3-l3-s3',
  title: 'Find customers with zero orders',
  instruction:
    'In the SQLite Online editor, run SELECT customers.name FROM customers LEFT JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL; Success looks like only Dmitri being returned — a real business question ("which customers never ordered") answered in one query.',
  prerequisites: ['sql-m3-l3-s2'],
  estimatedMinutes: 5,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'sql-m3-l3-s3-c1', description: 'Only Dmitri is returned as the result.' },
    ],
    exampleAnswer: 'Dmitri',
  },
  reflection: {
    id: 'sql-m3-l3-r',
    prompt: 'Without looking back, explain why WHERE orders.id IS NULL is the part that isolates customers with no orders.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l3: Lesson = {
  id: 'sql-m3-l3',
  title: 'LEFT JOIN',
  description: 'Keep every row from one table even without a match, and use that to find missing relationships.',
  steps: [m3l3s1, m3l3s2, m3l3s3],
  dependencies: ['sql-m3-l2'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const module3: Module = {
  id: 'sql-m3',
  title: 'Combining Tables with JOIN',
  description: 'Connect multiple tables to answer questions a single table cannot.',
  lessons: [m3l1, m3l2, m3l3],
  order: 3,
};

// ===================================================================================
// SKILL
// ===================================================================================

export const sqlSkill: Skill = {
  id: 'sql',
  name: 'SQL',
  category: 'Data Analysis',
  description:
    'Go from zero prior knowledge to confidently querying a real database: selecting and filtering data, sorting and aggregating it, and combining multiple tables with joins — practiced entirely in a free browser-based tool, no installation required.',
  modules: [module1, module2, module3],
  dependencies: [],
  maxLevel: 5,
};