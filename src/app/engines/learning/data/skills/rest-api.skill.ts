import type { Skill, Step, Module, Lesson } from '../../entities';

// ===================================================================================
// MODULE 1 — HTTP Fundamentals
// ===================================================================================

const m1l1s1: Step = {
  id: 'rest-api-m1-l1-s1',
  title: 'Install and open Postman',
  instruction:
    'Go to postman.com/downloads, download the free desktop app for your OS, and install it. Open Postman. When it asks you to sign in, click "Skip and go to the app" at the bottom of the screen. You should see the main workspace with a blank request tab.',
  prerequisites: [],
  resource: {
    id: 'rest-api-m1-l1-s1-res',
    type: 'tool',
    title: 'Postman — API Platform',
    url: 'https://www.postman.com/downloads/',
    whatIsThis: 'The industry-standard tool for sending HTTP requests and inspecting responses. Free, no code required.',
    setupSteps: [
      'Go to postman.com/downloads.',
      'Click the download button for your operating system.',
      'Run the installer and open Postman.',
      'Click "Skip and go to the app" — no account needed.',
    ],
  },
  estimatedMinutes: 5,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'rest-api-m1-l1-s1-c1', description: 'Postman is open and you can see a blank "New Request" tab in the workspace.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l1s2: Step = {
  id: 'rest-api-m1-l1-s2',
  title: 'Send your first GET request',
  instruction:
    'In Postman, make sure the method dropdown says GET. In the URL bar, type https://jsonplaceholder.typicode.com/posts/1 and click Send. In the response panel at the bottom you will see a JSON object with fields: userId, id, title, body. The status in the top-right of the response panel should say 200 OK.',
  prerequisites: ['rest-api-m1-l1-s1'],
  resource: {
    id: 'rest-api-m1-l1-s2-res',
    type: 'website',
    title: 'JSONPlaceholder — Free Fake REST API',
    url: 'https://jsonplaceholder.typicode.com',
    whatIsThis: 'A public fake REST API for testing. No authentication, no setup, returns real JSON responses instantly.',
    setupSteps: [
      'No setup needed — just use the URL directly in Postman.',
    ],
  },
  estimatedMinutes: 5,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m1-l1-s2-c1', description: 'The response status shows 200 OK.' },
      { id: 'rest-api-m1-l1-s2-c2', description: 'The response body contains a JSON object with fields userId, id, title, and body.' },
    ],
    exampleAnswer: '200 OK — { "userId": 1, "id": 1, "title": "...", "body": "..." }',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1s3: Step = {
  id: 'rest-api-m1-l1-s3',
  title: 'Read the response headers',
  instruction:
    'After your GET request to /posts/1, click the "Headers" tab in the response panel (next to "Body"). Find the header named Content-Type and write down its value. Then find the X-Powered-By or Server header. Write both values in a text note — you will need them in the reflection.',
  prerequisites: ['rest-api-m1-l1-s2'],
  estimatedMinutes: 5,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m1-l1-s3-c1', description: 'You can state the Content-Type value returned by JSONPlaceholder.' },
      { id: 'rest-api-m1-l1-s3-c2', description: 'You can explain in one sentence what a response header is and why it matters.' },
    ],
  },
  reflection: {
    id: 'rest-api-m1-l1-r',
    prompt: 'Without looking back: what does the Content-Type header tell the client, and why does it matter for a system analyst reading an API spec?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1: Lesson = {
  id: 'rest-api-m1-l1',
  title: 'Your First API Request',
  description: 'Install Postman, send a GET request to a real API, and read the response body and headers.',
  steps: [m1l1s1, m1l1s2, m1l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l2s1: Step = {
  id: 'rest-api-m1-l2-s1',
  title: 'Map the five HTTP methods to actions',
  instruction:
    'Open the MDN HTTP methods reference (link below). Read only the summary tables for GET, POST, PUT, PATCH, and DELETE. For each method, write one line in a note: what it does, and one real-world example (e.g. GET — read a product page).',
  prerequisites: [],
  resource: {
    id: 'rest-api-m1-l2-s1-res',
    type: 'article',
    title: 'MDN — HTTP request methods',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods',
    whatIsThis: 'The authoritative reference for HTTP methods from Mozilla. Plain language with clear descriptions of each method.',
    setupSteps: [
      'Open the link.',
      'Read only the sections for GET, POST, PUT, PATCH, DELETE.',
      'Skip "Safe", "Idempotent", and "Cacheable" columns for now.',
    ],
  },
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m1-l2-s1-c1', description: 'You can state what each of the five methods does without looking at the reference.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l2s2: Step = {
  id: 'rest-api-m1-l2-s2',
  title: 'Send POST, PUT, and DELETE in Postman',
  instruction:
    'In Postman, create three new requests against JSONPlaceholder:\n1. POST https://jsonplaceholder.typicode.com/posts — Body tab → raw → JSON: {"title":"test","body":"hello","userId":1}\n2. PUT https://jsonplaceholder.typicode.com/posts/1 — same body\n3. DELETE https://jsonplaceholder.typicode.com/posts/1 — no body\nFor each request, note the status code returned.',
  prerequisites: ['rest-api-m1-l2-s1'],
  estimatedMinutes: 10,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m1-l2-s2-c1', description: 'POST returns status 201.' },
      { id: 'rest-api-m1-l2-s2-c2', description: 'PUT returns status 200.' },
      { id: 'rest-api-m1-l2-s2-c3', description: 'DELETE returns status 200.' },
    ],
    exampleAnswer: 'POST → 201, PUT → 200, DELETE → 200',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2s3: Step = {
  id: 'rest-api-m1-l2-s3',
  title: 'Match methods to CRUD operations',
  instruction:
    'In your note, write the CRUD table: Create → POST, Read → GET, Update → PUT/PATCH, Delete → DELETE. Then answer: if a mobile app needs to update only the "status" field of an order without sending the whole order object — which method should it use and why?',
  prerequisites: ['rest-api-m1-l2-s2'],
  estimatedMinutes: 5,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m1-l2-s3-c1', description: 'You can match all four CRUD operations to the correct HTTP method(s) from memory.' },
      { id: 'rest-api-m1-l2-s3-c2', description: 'You can explain why PATCH is preferred over PUT for partial updates.' },
    ],
  },
  reflection: {
    id: 'rest-api-m1-l2-r',
    prompt: 'Without looking back: which HTTP method would you use to update only the delivery address on an existing order, and why not PUT?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2: Lesson = {
  id: 'rest-api-m1-l2',
  title: 'HTTP Methods and CRUD',
  description: 'Learn the five core HTTP methods and map them to Create, Read, Update, Delete operations.',
  steps: [m1l2s1, m1l2s2, m1l2s3],
  dependencies: ['rest-api-m1-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l3s1: Step = {
  id: 'rest-api-m1-l3-s1',
  title: 'Read the HTTP status code categories',
  instruction:
    'Open the MDN status codes reference (link below). Read the five category descriptions: 1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error. For each category, write one example code and one sentence about when you would see it.',
  prerequisites: [],
  resource: {
    id: 'rest-api-m1-l3-s1-res',
    type: 'article',
    title: 'MDN — HTTP response status codes',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
    whatIsThis: 'Complete reference for all HTTP status codes with plain-language descriptions and use cases.',
    setupSteps: [
      'Open the link.',
      'Read the five category introductions at the top.',
      'Focus on: 200, 201, 204, 400, 401, 403, 404, 422, 500, 503.',
    ],
  },
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m1-l3-s1-c1', description: 'You can name which category (2xx, 4xx, etc.) each of these belongs to: 200, 201, 400, 401, 404, 500.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l3s2: Step = {
  id: 'rest-api-m1-l3-s2',
  title: 'Trigger real error codes in Postman',
  instruction:
    'In Postman, send these requests and record the status code for each:\n1. GET https://jsonplaceholder.typicode.com/posts/99999 — does it return 404?\n2. GET https://httpstat.us/500 — forces a 500 response\n3. GET https://httpstat.us/401 — forces a 401 response\nNote: httpstat.us is a public service that returns any status code you ask for.',
  prerequisites: ['rest-api-m1-l3-s1'],
  resource: {
    id: 'rest-api-m1-l3-s2-res',
    type: 'website',
    title: 'httpstat.us — HTTP Status Code Testing',
    url: 'https://httpstat.us',
    whatIsThis: 'A simple service that returns any HTTP status code on demand. Used for testing how your client handles errors.',
    setupSteps: [
      'No setup — just use the URL pattern https://httpstat.us/{code} in Postman.',
    ],
  },
  estimatedMinutes: 8,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m1-l3-s2-c1', description: 'GET /posts/99999 returns 404 (JSONPlaceholder returns empty object {} with 200 — note that not all APIs return 404 for missing resources).' },
      { id: 'rest-api-m1-l3-s2-c2', description: 'GET https://httpstat.us/500 returns status 500.' },
      { id: 'rest-api-m1-l3-s2-c3', description: 'GET https://httpstat.us/401 returns status 401.' },
    ],
    exampleAnswer: '/posts/99999 → 200 (empty), httpstat.us/500 → 500, httpstat.us/401 → 401',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l3s3: Step = {
  id: 'rest-api-m1-l3-s3',
  title: 'Write an error-handling table',
  instruction:
    'In your note, create a table with three columns: Status Code | Meaning | What the client should do. Fill in rows for: 200, 201, 400, 401, 403, 404, 422, 500. Use plain business language in the third column — e.g. "Show user an error message: invalid input" for 422.',
  prerequisites: ['rest-api-m1-l3-s2'],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'rest-api-m1-l3-s3-c1', description: 'Your table has all 8 status codes.' },
      { id: 'rest-api-m1-l3-s3-c2', description: 'The "What the client should do" column uses business language, not technical jargon.' },
      { id: 'rest-api-m1-l3-s3-c3', description: 'You can distinguish 401 (not authenticated) from 403 (authenticated but not allowed).' },
    ],
  },
  reflection: {
    id: 'rest-api-m1-l3-r',
    prompt: 'Without looking: a user tries to access an admin page while logged in as a regular user. Which status code should the API return — 401 or 403? Why?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l3: Lesson = {
  id: 'rest-api-m1-l3',
  title: 'HTTP Status Codes',
  description: 'Learn the five status code categories, trigger real errors in Postman, and build an error-handling reference table.',
  steps: [m1l3s1, m1l3s2, m1l3s3],
  dependencies: ['rest-api-m1-l2'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const module1: Module = {
  id: 'rest-api-m1',
  title: 'HTTP Fundamentals',
  description: 'Set up Postman, master the five HTTP methods, and understand status codes through hands-on requests.',
  lessons: [m1l1, m1l2, m1l3],
  order: 1,
};

// ===================================================================================
// MODULE 2 — Reading and Writing API Contracts
// ===================================================================================

const m2l1s1: Step = {
  id: 'rest-api-m2-l1-s1',
  title: 'Open the Swagger Petstore and read an endpoint',
  instruction:
    'Go to petstore.swagger.io. This is a live Swagger UI connected to a real API. Find the GET /pet/{petId} endpoint. Click on it to expand it. Read the Parameters section (what inputs it needs) and the Responses section (what it returns). Write down: the parameter name, its type, and what 404 means in this context.',
  prerequisites: [],
  resource: {
    id: 'rest-api-m2-l1-s1-res',
    type: 'interactive',
    title: 'Swagger Petstore — Live API Documentation',
    url: 'https://petstore.swagger.io',
    whatIsThis: 'The official Swagger demo API with a live UI. Shows exactly how professional API documentation looks and works.',
    setupSteps: [
      'Open petstore.swagger.io in your browser.',
      'Scroll to the "pet" section.',
      'Click GET /pet/{petId} to expand it.',
    ],
  },
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m2-l1-s1-c1', description: 'You can name the required parameter for GET /pet/{petId} and its data type.' },
      { id: 'rest-api-m2-l1-s1-c2', description: 'You can state what the 404 response means for this specific endpoint.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l1s2: Step = {
  id: 'rest-api-m2-l1-s2',
  title: 'Execute a live request from Swagger UI',
  instruction:
    'On petstore.swagger.io, find GET /pet/findByStatus. Click it, then click "Try it out". In the status dropdown, select "available". Click Execute. Scroll down to the Server response section — you will see the curl command, the request URL, and the JSON response body. Check the response code shown.',
  prerequisites: ['rest-api-m2-l1-s1'],
  estimatedMinutes: 8,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m2-l1-s2-c1', description: 'The response code is 200.' },
      { id: 'rest-api-m2-l1-s2-c2', description: 'The response body is a JSON array of pet objects.' },
    ],
    exampleAnswer: '200 — JSON array of pets with status "available"',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l1s3: Step = {
  id: 'rest-api-m2-l1-s3',
  title: 'Reproduce the Swagger request in Postman',
  instruction:
    'Copy the request URL that Swagger UI showed after execution (it will look like https://petstore.swagger.io/v2/pet/findByStatus?status=available). Open Postman, create a new GET request, paste the URL, and click Send. Confirm you get the same 200 response with a JSON array.',
  prerequisites: ['rest-api-m2-l1-s2'],
  estimatedMinutes: 5,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m2-l1-s3-c1', description: 'Postman returns 200 with the same JSON array as Swagger UI.' },
    ],
    exampleAnswer: '200 — same JSON array in Postman as in Swagger UI',
  },
  reflection: {
    id: 'rest-api-m2-l1-r',
    prompt: 'Without looking back: what is the difference between API documentation (Swagger UI) and an API testing tool (Postman)? When would you use each?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l1: Lesson = {
  id: 'rest-api-m2-l1',
  title: 'Reading API Documentation with Swagger',
  description: 'Navigate a real Swagger UI, read an endpoint contract, execute live requests, and reproduce them in Postman.',
  steps: [m2l1s1, m2l1s2, m2l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l2s1: Step = {
  id: 'rest-api-m2-l2-s1',
  title: 'Read a JSON response and identify its structure',
  instruction:
    'In Postman, send GET https://jsonplaceholder.typicode.com/users/1. In the response body, identify: one string field, one number field, one nested object, and one nested object inside another nested object. Write down the field names and their types.',
  prerequisites: [],
  estimatedMinutes: 8,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'rest-api-m2-l2-s1-c1', description: 'You identified at least one string, one number, and one nested object in the response.' },
      { id: 'rest-api-m2-l2-s1-c2', description: 'You can write the dot-notation path to the zipcode field (e.g. address.zipcode).' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l2s2: Step = {
  id: 'rest-api-m2-l2-s2',
  title: 'Send a POST request with a JSON body',
  instruction:
    'In Postman, create a new POST request to https://jsonplaceholder.typicode.com/posts. In the Body tab, select "raw" and set the type dropdown to JSON. Paste this body: {"title": "My first post", "body": "This is the content", "userId": 1}. Click Send. Confirm the response body echoes your data back with a new "id" field added.',
  prerequisites: ['rest-api-m2-l2-s1'],
  estimatedMinutes: 8,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m2-l2-s2-c1', description: 'Response status is 201 Created.' },
      { id: 'rest-api-m2-l2-s2-c2', description: 'Response body contains your title and body fields plus a new id field.' },
    ],
    exampleAnswer: '201 — { "id": 101, "title": "My first post", "body": "...", "userId": 1 }',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2s3: Step = {
  id: 'rest-api-m2-l2-s3',
  title: 'Add a Content-Type request header',
  instruction:
    'In your POST request from the previous step, click the Headers tab. Add a header: Key = Content-Type, Value = application/json. Send the request again. The response should still be 201. Now remove the header and try again — observe if the behavior changes. Write down what you observe.',
  prerequisites: ['rest-api-m2-l2-s2'],
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m2-l2-s3-c1', description: 'You can explain what Content-Type: application/json tells the server.' },
      { id: 'rest-api-m2-l2-s3-c2', description: 'You observed what happens when the Content-Type header is missing.' },
    ],
  },
  reflection: {
    id: 'rest-api-m2-l2-r',
    prompt: 'Without looking back: a developer says the API returns 415 Unsupported Media Type. What is the most likely cause and how would you fix it?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2: Lesson = {
  id: 'rest-api-m2-l2',
  title: 'JSON Request and Response Bodies',
  description: 'Read and map JSON structures, send POST requests with a JSON body, and understand the Content-Type header.',
  steps: [m2l2s1, m2l2s2, m2l2s3],
  dependencies: ['rest-api-m2-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l3s1: Step = {
  id: 'rest-api-m2-l3-s1',
  title: 'Add an Authorization header to a request',
  instruction:
    'In Postman, create a new GET request to https://httpbin.org/bearer. Click the Authorization tab, select type "Bearer Token", and enter any string as the token (e.g. "my-test-token-123"). Click Send. The response body will echo back the token you sent. This confirms the Authorization header was received.',
  prerequisites: [],
  resource: {
    id: 'rest-api-m2-l3-s1-res',
    type: 'website',
    title: 'httpbin.org — HTTP Request & Response Service',
    url: 'https://httpbin.org',
    whatIsThis: 'A free service that echoes back HTTP requests. Perfect for seeing exactly what headers and body your client is sending.',
    setupSteps: [
      'No setup needed — use the URL directly in Postman.',
      'The /bearer endpoint specifically checks for a Bearer token in the Authorization header.',
    ],
  },
  estimatedMinutes: 8,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m2-l3-s1-c1', description: 'Response status is 200.' },
      { id: 'rest-api-m2-l3-s1-c2', description: 'Response body contains your token string in the "token" field.' },
    ],
    exampleAnswer: '200 — { "authenticated": true, "token": "my-test-token-123" }',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l3s2: Step = {
  id: 'rest-api-m2-l3-s2',
  title: 'Observe what 401 looks like without a token',
  instruction:
    'In Postman, send GET https://httpbin.org/bearer with NO Authorization header (delete it or switch the Authorization type to "No Auth"). Observe the response status and body. Write down: what status code you received and what the response body says.',
  prerequisites: ['rest-api-m2-l3-s1'],
  estimatedMinutes: 5,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m2-l3-s2-c1', description: 'Response status is 401 when no Authorization header is sent.' },
    ],
    exampleAnswer: '401 Unauthorized',
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l3s3: Step = {
  id: 'rest-api-m2-l3-s3',
  title: 'Use Postman environments to store the token',
  instruction:
    'In Postman, click the Environments icon (gear or eye icon, top right). Create a new environment called "Test". Add a variable: Variable = auth_token, Initial value = my-test-token-123. Save. In your bearer request, change the token field from the hardcoded string to {{auth_token}}. Send — the result should still be 200 with your token echoed back.',
  prerequisites: ['rest-api-m2-l3-s2'],
  estimatedMinutes: 10,
  verification: {
    type: 'output-match',
    criteria: [
      { id: 'rest-api-m2-l3-s3-c1', description: 'The request still returns 200 when using {{auth_token}} variable instead of a hardcoded string.' },
      { id: 'rest-api-m2-l3-s3-c2', description: 'You can explain why storing tokens in environment variables is safer than hardcoding them.' },
    ],
    exampleAnswer: '200 — token echoed back correctly using environment variable',
  },
  reflection: {
    id: 'rest-api-m2-l3-r',
    prompt: 'Without looking back: what is the difference between authentication (401) and authorization (403)? Give one real-world example of each.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l3: Lesson = {
  id: 'rest-api-m2-l3',
  title: 'Authentication Headers',
  description: 'Send Bearer tokens, observe 401 errors, and use Postman environment variables to manage credentials.',
  steps: [m2l3s1, m2l3s2, m2l3s3],
  dependencies: ['rest-api-m2-l2'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const module2: Module = {
  id: 'rest-api-m2',
  title: 'Reading and Writing API Contracts',
  description: 'Navigate Swagger documentation, work with JSON bodies, and handle authentication headers.',
  lessons: [m2l1, m2l2, m2l3],
  order: 2,
};

// ===================================================================================
// MODULE 3 — API Analysis for System Analysts
// ===================================================================================

const m3l1s1: Step = {
  id: 'rest-api-m3-l1-s1',
  title: 'Find a public OpenAPI spec and open it in Swagger Editor',
  instruction:
    'Go to editor.swagger.io. The editor loads with a sample Petstore spec. In the left panel you can see YAML — this is an OpenAPI specification. Read the "info" block at the top (title, version, description) and the first two paths. Write down: what API this describes and what the first two endpoints do.',
  prerequisites: [],
  resource: {
    id: 'rest-api-m3-l1-s1-res',
    type: 'interactive',
    title: 'Swagger Editor',
    url: 'https://editor.swagger.io',
    whatIsThis: 'The official online editor for OpenAPI specifications. Shows the YAML source on the left and rendered documentation on the right.',
    setupSteps: [
      'Open editor.swagger.io — it loads with the Petstore example automatically.',
      'Read the left panel (YAML) alongside the right panel (rendered docs).',
    ],
  },
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m3-l1-s1-c1', description: 'You can identify the API title, version, and base URL from the spec.' },
      { id: 'rest-api-m3-l1-s1-c2', description: 'You can describe what the first two paths/endpoints do.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l1s2: Step = {
  id: 'rest-api-m3-l1-s2',
  title: 'Identify request parameters and response schemas',
  instruction:
    'In Swagger Editor, find the GET /pet/{petId} path in the YAML. Read its "parameters" block — note the parameter name, "in" field (path/query/header), and "required" field. Then read the "responses" block — find the 200 response schema. Write down: what object type the 200 response returns.',
  prerequisites: ['rest-api-m3-l1-s1'],
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m3-l1-s2-c1', description: 'You can name the parameter and state whether it is in the path, query, or header.' },
      { id: 'rest-api-m3-l1-s2-c2', description: 'You can state what schema type the 200 response returns.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l1s3: Step = {
  id: 'rest-api-m3-l1-s3',
  title: 'Write a mini API spec for a simple endpoint',
  instruction:
    'In a text note, write a plain-English description of a new endpoint: "GET /orders/{orderId} — returns a single order by ID. Parameters: orderId (path, required, integer). Responses: 200 returns an order object with fields id, status, totalAmount, createdAt. 404 if order not found." This is the analyst\'s job — describing what the API must do before developers build it.',
  prerequisites: ['rest-api-m3-l1-s2'],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'rest-api-m3-l1-s3-c1', description: 'Your description includes the HTTP method and URL pattern.' },
      { id: 'rest-api-m3-l1-s3-c2', description: 'You specified the parameter name, location (path), type, and whether it is required.' },
      { id: 'rest-api-m3-l1-s3-c3', description: 'You described both a success (200) and an error (404) response.' },
      { id: 'rest-api-m3-l1-s3-c4', description: 'The 200 response includes at least the field names and their data types.' },
    ],
  },
  reflection: {
    id: 'rest-api-m3-l1-r',
    prompt: 'Without looking back: what is the difference between a path parameter (/orders/{id}) and a query parameter (/orders?status=pending)? When would you use each?',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l1: Lesson = {
  id: 'rest-api-m3-l1',
  title: 'Reading OpenAPI Specifications',
  description: 'Navigate an OpenAPI spec in Swagger Editor, read parameters and response schemas, and write a mini endpoint description.',
  steps: [m3l1s1, m3l1s2, m3l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m3l2s1: Step = {
  id: 'rest-api-m3-l2-s1',
  title: 'Explore a real public API with Postman',
  instruction:
    'In Postman, send GET https://api.github.com/users/torvalds. This is GitHub\'s real public API — no authentication needed for public data. Read the JSON response. Identify: what data type the "followers" field is, what the "repos_url" field contains, and how many fields are in the top-level object.',
  prerequisites: [],
  resource: {
    id: 'rest-api-m3-l2-s1-res',
    type: 'article',
    title: 'GitHub REST API Documentation',
    url: 'https://docs.github.com/en/rest',
    whatIsThis: 'Official documentation for GitHub\'s REST API. One of the best-designed public APIs — ideal for learning real-world API patterns.',
    setupSteps: [
      'No authentication needed for public user data.',
      'Use the URL directly in Postman.',
    ],
  },
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m3-l2-s1-c1', description: 'You can state the data type of the "followers" field.' },
      { id: 'rest-api-m3-l2-s1-c2', description: 'You can describe what the "repos_url" field value is used for.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l2s2: Step = {
  id: 'rest-api-m3-l2-s2',
  title: 'Follow a URL from the response to get related data',
  instruction:
    'From the previous response, copy the value of "repos_url" (it will be something like https://api.github.com/users/torvalds/repos). Paste it into a new Postman GET request and send it. You will get an array of repository objects. Count how many repositories are in the first response page. Find the "language" field in the first repository.',
  prerequisites: ['rest-api-m3-l2-s1'],
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m3-l2-s2-c1', description: 'You successfully followed the repos_url to get a list of repositories.' },
      { id: 'rest-api-m3-l2-s2-c2', description: 'You can state the programming language of the first repository in the list.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l2s3: Step = {
  id: 'rest-api-m3-l2-s3',
  title: 'Identify pagination in the API response',
  instruction:
    'In Postman, check the response headers of your repos request. Look for a "Link" header — it contains URLs for the next and last pages of results. Add ?per_page=5 to your URL (https://api.github.com/users/torvalds/repos?per_page=5) and send again. Check the Link header again — it should now show next, prev, first, last page links.',
  prerequisites: ['rest-api-m3-l2-s2'],
  estimatedMinutes: 8,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'rest-api-m3-l2-s3-c1', description: 'You found the Link header and can describe what it contains.' },
      { id: 'rest-api-m3-l2-s3-c2', description: 'You can explain what the per_page query parameter does and why pagination matters for system design.' },
    ],
  },
  reflection: {
    id: 'rest-api-m3-l2-r',
    prompt: 'Without looking back: a mobile app needs to show a list of 10,000 products. Why should the API use pagination, and what query parameters would you expect it to support?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l2: Lesson = {
  id: 'rest-api-m3-l2',
  title: 'Exploring a Real Public API',
  description: 'Query the GitHub API, follow embedded URLs to related resources, and understand pagination in API responses.',
  steps: [m3l2s1, m3l2s2, m3l2s3],
  dependencies: ['rest-api-m3-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m3l3s1: Step = {
  id: 'rest-api-m3-l3-s1',
  title: 'Map a user story to API endpoints',
  instruction:
    'Read this user story: "As a customer, I want to view my order history, see the details of a specific order, and cancel an order that has not shipped yet." In your note, write the API endpoints this story requires: list the HTTP method, URL pattern, and one-sentence description for each endpoint needed to implement this story.',
  prerequisites: [],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'rest-api-m3-l3-s1-c1', description: 'You identified at least 3 endpoints: list orders, get one order, cancel order.' },
      { id: 'rest-api-m3-l3-s1-c2', description: 'Each endpoint has a correct HTTP method (GET for reads, DELETE or PATCH for cancel).' },
      { id: 'rest-api-m3-l3-s1-c3', description: 'Your URL patterns use path parameters where appropriate (e.g. /orders/{id}).' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l3s2: Step = {
  id: 'rest-api-m3-l3-s2',
  title: 'Define the request and response for the cancel endpoint',
  instruction:
    'For the "cancel order" endpoint you defined, write a detailed spec in your note:\n- Method and URL\n- Path parameters (name, type, required)\n- Request body fields if any (name, type, required, example value)\n- Response for success (status code, body fields)\n- Response for "order already shipped" case (status code, error message)\n- Response for "order not found" case (status code)',
  prerequisites: ['rest-api-m3-l3-s1'],
  estimatedMinutes: 12,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'rest-api-m3-l3-s2-c1', description: 'Your spec includes at least 3 response scenarios: success, already shipped, not found.' },
      { id: 'rest-api-m3-l3-s2-c2', description: 'You assigned correct status codes to each scenario.' },
      { id: 'rest-api-m3-l3-s2-c3', description: 'The success response includes the updated order status in the body.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l3s3: Step = {
  id: 'rest-api-m3-l3-s3',
  title: 'Review your spec against REST conventions',
  instruction:
    'Read this checklist and verify your cancel endpoint spec against each point:\n1. URL uses nouns not verbs (/orders/{id} not /cancelOrder/{id})\n2. HTTP method matches the action semantics\n3. All error cases are covered with appropriate status codes\n4. Response body is consistent: success returns the updated resource, errors return a message\n5. No sensitive data (passwords, tokens) in the URL\nMark each point as pass/fail in your note and fix anything that fails.',
  prerequisites: ['rest-api-m3-l3-s2'],
  estimatedMinutes: 10,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'rest-api-m3-l3-s3-c1', description: 'Your URL uses a noun, not a verb.' },
      { id: 'rest-api-m3-l3-s3-c2', description: 'Your HTTP method is semantically correct for a cancellation.' },
      { id: 'rest-api-m3-l3-s3-c3', description: 'All five checklist points pass.' },
    ],
  },
  reflection: {
    id: 'rest-api-m3-l3-r',
    prompt: 'Without looking back: a developer proposes POST /cancelOrder/{id}. Name two REST convention violations and suggest the correct alternative.',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l3: Lesson = {
  id: 'rest-api-m3-l3',
  title: 'Designing API Endpoints from User Stories',
  description: 'Translate a user story into API endpoints, write a full request/response spec, and validate it against REST conventions.',
  steps: [m3l3s1, m3l3s2, m3l3s3],
  dependencies: ['rest-api-m3-l2'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const module3: Module = {
  id: 'rest-api-m3',
  title: 'API Analysis for System Analysts',
  description: 'Read OpenAPI specs, explore a real public API, and design endpoints from user stories.',
  lessons: [m3l1, m3l2, m3l3],
  order: 3,
};

// ===================================================================================
// SKILL
// ===================================================================================

export const restApiSkill: Skill = {
  id: 'rest-api',
  name: 'REST / API',
  category: 'System Analysis',
  description:
    'Go from zero to confidently reading API documentation, sending real HTTP requests, understanding authentication, and designing API endpoints from user stories — using Postman and real public APIs.',
  modules: [module1, module2, module3],
  dependencies: [],
  maxLevel: 4,
  color: '#0e7490',
};