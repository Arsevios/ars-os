import type { Skill, Step, Module, Lesson } from '../../entities';

// ===================================================================================
// MODULE 1 — Listening and Comprehension (B1)
// ===================================================================================

const m1l1s1: Step = {
  id: 'english-m1-l1-s1',
  title: 'Set up your daily listening source',
  instruction:
    'Open YouTube and search for "BBC Learning English". Subscribe to the channel. Go to their "6 Minute English" playlist. Pick any episode from the last 3 months. Watch it once without subtitles, then once with English subtitles only (not your native language). Write down 5 words you did not know.',
  prerequisites: [],
  resource: {
    id: 'english-m1-l1-s1-res',
    type: 'video',
    title: 'BBC Learning English — 6 Minute English',
    url: 'https://www.youtube.com/@bbclearningenglish',
    whatIsThis: 'Free B1–B2 English lessons from the BBC. Short episodes on real topics with transcripts available on their website.',
    setupSteps: [
      'Go to youtube.com and search "BBC Learning English".',
      'Subscribe to the channel.',
      'Find the "6 Minute English" playlist.',
      'Pick any recent episode.',
    ],
  },
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m1-l1-s1-c1', description: 'You watched the episode once without subtitles.' },
      { id: 'english-m1-l1-s1-c2', description: 'You watched it again with English subtitles.' },
      { id: 'english-m1-l1-s1-c3', description: 'You wrote down 5 unknown words.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l1s2: Step = {
  id: 'english-m1-l1-s2',
  title: 'Look up your 5 words in context',
  instruction:
    'For each of your 5 words, go to youglish.com, type the word, and watch 2 short video clips where a native speaker uses it naturally. Do not use a dictionary definition — only observe the word in real speech. After each word, write one sentence of your own using it.',
  prerequisites: ['english-m1-l1-s1'],
  resource: {
    id: 'english-m1-l1-s2-res',
    type: 'interactive',
    title: 'YouGlish — See Words Used in Real Speech',
    url: 'https://youglish.com',
    whatIsThis: 'Shows YouTube clips of native speakers using any word you search. Faster and more natural than a dictionary.',
    setupSteps: [
      'Go to youglish.com.',
      'Type a word in the search bar.',
      'Click through 2–3 clips to hear it in context.',
    ],
  },
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m1-l1-s2-c1', description: 'You looked up all 5 words on YouGlish.' },
      { id: 'english-m1-l1-s2-c2', description: 'You wrote one original sentence for each word.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1s3: Step = {
  id: 'english-m1-l1-s3',
  title: 'Answer the episode comprehension question',
  instruction:
    'Go to bbclearningenglish.com and find the transcript for the episode you watched. Read it once. Every episode of 6 Minute English ends with a quiz question asked at the start — find the answer in the transcript and write it in your note. Then write 2–3 sentences summarising what the episode was about.',
  prerequisites: ['english-m1-l1-s2'],
  resource: {
    id: 'english-m1-l1-s3-res',
    type: 'website',
    title: 'BBC Learning English — Transcripts',
    url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
    whatIsThis: 'Full transcripts for every 6 Minute English episode. Use to check comprehension after listening.',
    setupSteps: [
      'Go to the link and find your episode by title.',
      'Click "Download" or "Transcript" to open the text.',
    ],
  },
  estimatedMinutes: 10,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'english-m1-l1-s3-c1', description: 'You found and wrote down the answer to the episode quiz question.' },
      { id: 'english-m1-l1-s3-c2', description: 'You wrote a 2–3 sentence summary of the episode in English.' },
    ],
  },
  reflection: {
    id: 'english-m1-l1-r',
    prompt: 'Without looking back: write 3 of your 5 new words in one paragraph about anything — work, your day, your goals.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l1: Lesson = {
  id: 'english-m1-l1',
  title: 'Daily Listening with BBC 6 Minute English',
  description: 'Build a daily listening habit using BBC content, acquire vocabulary in context, and practise comprehension.',
  steps: [m1l1s1, m1l1s2, m1l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l2s1: Step = {
  id: 'english-m1-l2-s1',
  title: 'Watch a TED Talk with English subtitles',
  instruction:
    'Go to ted.com/talks and filter by topic "Technology" or "Business". Pick any talk under 15 minutes. Watch with English subtitles turned on. While watching, pause whenever you do not understand a sentence and rewind once. Write down 3 sentences that were difficult and why — fast speech, accent, unknown word, or complex grammar.',
  prerequisites: [],
  resource: {
    id: 'english-m1-l2-s1-res',
    type: 'video',
    title: 'TED Talks — Technology and Business',
    url: 'https://www.ted.com/talks',
    whatIsThis: 'Free high-quality talks by experts on real topics. Excellent for B1–B2 listening practice with professional vocabulary.',
    setupSteps: [
      'Go to ted.com/talks.',
      'Filter by "Technology" or "Business".',
      'Pick a talk under 15 minutes.',
      'Turn on English subtitles via the CC button.',
    ],
  },
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m1-l2-s1-c1', description: 'You watched the full talk with English subtitles.' },
      { id: 'english-m1-l2-s1-c2', description: 'You wrote down 3 difficult sentences and identified why each was hard.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2s2: Step = {
  id: 'english-m1-l2-s2',
  title: 'Watch the same talk without subtitles',
  instruction:
    'Rewatch the same TED Talk you chose — this time with no subtitles. Do not pause. At the end, write down everything you understood: the main argument, 2 supporting points, and the conclusion. Compare to your subtitled viewing — what did you miss?',
  prerequisites: ['english-m1-l2-s1'],
  estimatedMinutes: 20,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'english-m1-l2-s2-c1', description: 'You watched the full talk without subtitles without pausing.' },
      { id: 'english-m1-l2-s2-c2', description: 'You wrote the main argument and 2 supporting points from memory.' },
      { id: 'english-m1-l2-s2-c3', description: 'You noted what you missed compared to the subtitled viewing.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2s3: Step = {
  id: 'english-m1-l2-s3',
  title: 'Read the TED Talk transcript and fill gaps',
  instruction:
    'On the TED Talk page, click "Read transcript". Find the 3 difficult sentences you wrote down earlier. Read the exact text. For each sentence, write: what you thought it meant vs what it actually said. Then find 3 new words from the transcript and add them to your vocabulary note.',
  prerequisites: ['english-m1-l2-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m1-l2-s3-c1', description: 'You found the exact text of your 3 difficult sentences in the transcript.' },
      { id: 'english-m1-l2-s3-c2', description: 'You wrote what you thought vs what was actually said for each.' },
      { id: 'english-m1-l2-s3-c3', description: 'You added 3 new words to your vocabulary note.' },
    ],
  },
  reflection: {
    id: 'english-m1-l2-r',
    prompt: 'Without looking back: what was the main argument of the TED Talk? Write 3–4 sentences in English as if explaining it to a colleague.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l2: Lesson = {
  id: 'english-m1-l2',
  title: 'TED Talks for Advanced Listening',
  description: 'Use TED Talks to push comprehension beyond simple content — with and without subtitles, then verify with transcripts.',
  steps: [m1l2s1, m1l2s2, m1l2s3],
  dependencies: ['english-m1-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m1l3s1: Step = {
  id: 'english-m1-l3-s1',
  title: 'Listen to a podcast episode at normal speed',
  instruction:
    'Open Spotify or a browser and find "Culips ESL Podcast". Pick any episode tagged B1 or B2. Listen at 1.0x speed — no subtitles, no transcript. Take notes: write down the topic, 3 key points, and any words you could not catch. Do not stop the audio.',
  prerequisites: [],
  resource: {
    id: 'english-m1-l3-s1-res',
    type: 'podcast',
    title: 'Culips ESL Podcast',
    url: 'https://culips.com',
    whatIsThis: 'A podcast specifically designed for English learners at B1–B2 level. Natural speech, interesting topics, transcripts available.',
    setupSteps: [
      'Go to culips.com or find Culips on Spotify.',
      'Pick a B1 or B2 episode.',
      'Listen at 1.0x speed with no aids.',
    ],
  },
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m1-l3-s1-c1', description: 'You listened to the full episode without stopping.' },
      { id: 'english-m1-l3-s1-c2', description: 'You wrote the topic and 3 key points from memory.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m1l3s2: Step = {
  id: 'english-m1-l3-s2',
  title: 'Listen again at 1.25x speed',
  instruction:
    'Replay the same podcast episode at 1.25x speed. This time, try to catch what you missed. After listening, compare your notes from the first listen — add anything new you understood. Then listen to the first 2 minutes at 1.5x speed. Write what you could and could not understand at that speed.',
  prerequisites: ['english-m1-l3-s1'],
  estimatedMinutes: 20,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'english-m1-l3-s2-c1', description: 'You listened to the full episode at 1.25x.' },
      { id: 'english-m1-l3-s2-c2', description: 'You added new points to your notes after the second listen.' },
      { id: 'english-m1-l3-s2-c3', description: 'You attempted 1.5x and noted what changed in comprehension.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l3s3: Step = {
  id: 'english-m1-l3-s3',
  title: 'Check the transcript and build a vocabulary card',
  instruction:
    'On culips.com, find the transcript for your episode (some are free, some require registration — use the free preview). Read the first half of the transcript. Find 5 phrases you did not catch while listening. For each phrase, write: the phrase, what it means, and one example sentence you create yourself.',
  prerequisites: ['english-m1-l3-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m1-l3-s3-c1', description: 'You found 5 phrases you missed while listening.' },
      { id: 'english-m1-l3-s3-c2', description: 'You wrote a meaning and example sentence for each phrase.' },
    ],
  },
  reflection: {
    id: 'english-m1-l3-r',
    prompt: 'Without looking back: what is the difference in your comprehension between 1.0x and 1.25x speed? What specifically breaks down — vocabulary, speed of speech, or connected speech patterns?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m1l3: Lesson = {
  id: 'english-m1-l3',
  title: 'Podcast Listening at Variable Speed',
  description: 'Build tolerance for natural speech speed using a podcast, then push comprehension with faster playback.',
  steps: [m1l3s1, m1l3s2, m1l3s3],
  dependencies: ['english-m1-l2'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const module1: Module = {
  id: 'english-m1',
  title: 'Listening and Comprehension (B1)',
  description: 'Build daily listening habits using BBC, TED Talks, and podcasts — with and without transcripts.',
  lessons: [m1l1, m1l2, m1l3],
  order: 1,
};

// ===================================================================================
// MODULE 2 — Speaking and Shadowing (B1→B2)
// ===================================================================================

const m2l1s1: Step = {
  id: 'english-m2-l1-s1',
  title: 'Find a shadowing clip and transcribe 30 seconds',
  instruction:
    'Go to YouTube and find a clip of a native English speaker talking at a natural pace — a news anchor, a YouTube tech presenter, or a TED speaker. Pick 30 seconds of clear speech. Play it three times and write down exactly what they say, word for word. Do not look up the transcript yet.',
  prerequisites: [],
  resource: {
    id: 'english-m2-l1-s1-res',
    type: 'video',
    title: 'English with Lucy — Pronunciation and Speaking',
    url: 'https://www.youtube.com/@EnglishwithLucy',
    whatIsThis: 'A YouTube channel focused on natural British English pronunciation and speaking patterns — ideal for shadowing practice.',
    setupSteps: [
      'Go to the channel.',
      'Pick any video where Lucy is speaking naturally (not a grammar lesson).',
      'Select 30 seconds from the first 2 minutes.',
    ],
  },
  estimatedMinutes: 10,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'english-m2-l1-s1-c1', description: 'You listened to the 30-second clip at least 3 times.' },
      { id: 'english-m2-l1-s1-c2', description: 'You wrote down what you heard word for word without using the transcript.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m2l1s2: Step = {
  id: 'english-m2-l1-s2',
  title: 'Shadow the clip out loud 5 times',
  instruction:
    'Play the 30-second clip and speak along with the speaker simultaneously — this is shadowing. Do not wait for them to finish a sentence; speak at the same time, matching their rhythm and intonation. Repeat 5 times. Record yourself on the 5th repetition using your phone voice recorder.',
  prerequisites: ['english-m2-l1-s1'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m2-l1-s2-c1', description: 'You shadowed the clip simultaneously (not repeating after) at least 5 times.' },
      { id: 'english-m2-l1-s2-c2', description: 'You recorded yourself on the 5th repetition.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l1s3: Step = {
  id: 'english-m2-l1-s3',
  title: 'Compare your recording to the original',
  instruction:
    'Listen to your recording. Then listen to the original clip. Note 3 specific differences: words where your stress was wrong, sounds you dropped or changed, or places where your rhythm did not match. Write them down. Then shadow the clip 3 more times focusing on fixing those specific points.',
  prerequisites: ['english-m2-l1-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m2-l1-s3-c1', description: 'You listened to your recording and identified 3 specific differences.' },
      { id: 'english-m2-l1-s3-c2', description: 'You shadowed 3 more times focusing on the identified weaknesses.' },
    ],
  },
  reflection: {
    id: 'english-m2-l1-r',
    prompt: 'Without looking back: what were the 3 specific pronunciation or rhythm differences you identified? Are they consistent patterns or one-off mistakes?',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l1: Lesson = {
  id: 'english-m2-l1',
  title: 'Shadowing Technique',
  description: 'Learn the shadowing method: transcribe, shadow simultaneously, record, and self-correct.',
  steps: [m2l1s1, m2l1s2, m2l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l2s1: Step = {
  id: 'english-m2-l2-s1',
  title: 'Record yourself explaining a technical concept',
  instruction:
    'Pick a concept you know well from your studies: what SQL is, what an HTTP method does, or what a system analyst does. Set a 2-minute timer. Record yourself explaining it in English without stopping, without notes, without pausing the recording. It does not need to be perfect.',
  prerequisites: [],
  estimatedMinutes: 10,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'english-m2-l2-s1-c1', description: 'You recorded yourself speaking for 2 minutes without stopping.' },
      { id: 'english-m2-l2-s1-c2', description: 'The topic was technical — not personal or casual.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2s2: Step = {
  id: 'english-m2-l2-s2',
  title: 'Transcribe your recording and find weak spots',
  instruction:
    'Listen to your 2-minute recording and transcribe it word for word — write exactly what you said, including filler words (um, uh, like, you know). Count: how many filler words, how many incomplete sentences, how many times you repeated yourself. Write the counts in your note.',
  prerequisites: ['english-m2-l2-s1'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m2-l2-s2-c1', description: 'You transcribed the full recording.' },
      { id: 'english-m2-l2-s2-c2', description: 'You counted filler words, incomplete sentences, and repetitions.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l2s3: Step = {
  id: 'english-m2-l2-s3',
  title: 'Re-record the same explanation with improvements',
  instruction:
    'Using your transcription as a reference, prepare mentally for 1 minute (no written notes allowed). Record yourself again explaining the same concept for 2 minutes. After recording, compare: did the filler word count go down? Were your sentences more complete? Write the new counts and the difference.',
  prerequisites: ['english-m2-l2-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'self-check',
    criteria: [
      { id: 'english-m2-l2-s3-c1', description: 'You recorded a second 2-minute explanation of the same topic.' },
      { id: 'english-m2-l2-s3-c2', description: 'You compared filler word counts between recording 1 and recording 2.' },
    ],
  },
  reflection: {
    id: 'english-m2-l2-r',
    prompt: 'Without looking back: what specific speaking patterns do you need to fix most — filler words, sentence structure, vocabulary gaps, or pronunciation? Give one concrete example from your recordings.',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m2l2: Lesson = {
  id: 'english-m2-l2',
  title: 'Self-Recording Technical Explanations',
  description: 'Record yourself explaining a technical concept, analyse weaknesses, and improve through a second recording.',
  steps: [m2l2s1, m2l2s2, m2l2s3],
  dependencies: ['english-m2-l1'],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m2l3s1: Step = {
  id: 'english-m2-l3-s1',
  title: 'Shadow a job interview answer',
  instruction:
    'Search YouTube for "system analyst interview answers" or "business analyst interview questions". Find a video where someone answers "Tell me about yourself" or "What does a system analyst do?". Pick a 60-second answer. Shadow it 5 times using the technique from Module 2, Lesson 1.',
  prerequisites: [],
  resource: {
    id: 'english-m2-l3-s1-res',
    type: 'video',
    title: 'YouTube — System Analyst Interview Answers',
    url: 'https://www.youtube.com/results?search_query=system+analyst+interview+answers+english',
    whatIsThis: 'Real interview answer examples from native or fluent English speakers. Use these to shadow professional register and vocabulary.',
    setupSteps: [
      'Search "system analyst interview answers" on YouTube.',
      'Pick a video where the speaker sounds natural and professional.',
      'Choose a 60-second clip for shadowing.',
    ],
  },
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m2-l3-s1-c1', description: 'You found a professional interview answer video.' },
      { id: 'english-m2-l3-s1-c2', description: 'You shadowed a 60-second clip at least 5 times.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l3s2: Step = {
  id: 'english-m2-l3-s2',
  title: 'Record your own answer to "Tell me about yourself"',
  instruction:
    'Set a 90-second timer. Record yourself answering "Tell me about yourself" as if in a real job interview for a Junior System Analyst position in the US market. Mention: your current skills, what you are learning, and your goal. Speak in English. Do not stop the recording.',
  prerequisites: ['english-m2-l3-s1'],
  estimatedMinutes: 15,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'english-m2-l3-s2-c1', description: 'You recorded a 90-second answer without stopping.' },
      { id: 'english-m2-l3-s2-c2', description: 'Your answer mentioned current skills, learning goals, and career target.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m2l3s3: Step = {
  id: 'english-m2-l3-s3',
  title: 'Compare your answer to the shadowed professional',
  instruction:
    'Listen to the professional clip and your recording back to back. Write down: 3 vocabulary words or phrases the professional used that you did not; any sentence structures they used that sounded more natural than yours; and one thing you did well. Rewrite your answer script incorporating the improvements.',
  prerequisites: ['english-m2-l3-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m2-l3-s3-c1', description: 'You identified 3 vocabulary items or phrases from the professional you did not use.' },
      { id: 'english-m2-l3-s3-c2', description: 'You identified one natural sentence structure difference.' },
      { id: 'english-m2-l3-s3-c3', description: 'You rewrote your answer script with the improvements.' },
    ],
  },
  reflection: {
    id: 'english-m2-l3-r',
    prompt: 'Without looking back: write your improved "Tell me about yourself" answer from memory in 4–5 sentences.',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m2l3: Lesson = {
  id: 'english-m2-l3',
  title: 'Interview Speaking Practice',
  description: 'Shadow a professional interview answer, record your own version, and improve through direct comparison.',
  steps: [m2l3s1, m2l3s2, m2l3s3],
  dependencies: ['english-m2-l2'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const module2: Module = {
  id: 'english-m2',
  title: 'Speaking and Shadowing (B1→B2)',
  description: 'Build spoken fluency through shadowing, self-recording technical explanations, and interview practice.',
  lessons: [m2l1, m2l2, m2l3],
  order: 2,
};

// ===================================================================================
// MODULE 3 — Writing and Technical Vocabulary
// ===================================================================================

const m3l1s1: Step = {
  id: 'english-m3-l1-s1',
  title: 'Read a real system analyst job posting',
  instruction:
    'Go to linkedin.com/jobs and search "junior system analyst" with location set to "United States". Open 3 job postings. For each one, copy the "Requirements" and "Responsibilities" sections into a note. Do not translate — read in English.',
  prerequisites: [],
  resource: {
    id: 'english-m3-l1-s1-res',
    type: 'website',
    title: 'LinkedIn Jobs — Junior System Analyst USA',
    url: 'https://www.linkedin.com/jobs/search/?keywords=junior+system+analyst&location=United+States',
    whatIsThis: 'Real job postings for the exact role you are targeting. Reading these trains you on the vocabulary and phrasing that US hiring managers use.',
    setupSteps: [
      'Open the link.',
      'Filter by "Entry level" if available.',
      'Open 3 different postings and copy the Requirements and Responsibilities.',
    ],
  },
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l1-s1-c1', description: 'You opened and read 3 real job postings.' },
      { id: 'english-m3-l1-s1-c2', description: 'You copied the Requirements and Responsibilities for each.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m3l1s2: Step = {
  id: 'english-m3-l1-s2',
  title: 'Extract and categorise key vocabulary',
  instruction:
    'From your 3 job postings, find words and phrases that appear in at least 2 of the 3 postings. These are the terms that matter. Categorise them into three groups: Technical Skills (SQL, API, BPMN), Soft Skills (stakeholder communication, requirements gathering), and Action Verbs (analyze, document, collaborate). Aim for at least 5 items per group.',
  prerequisites: ['english-m3-l1-s1'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l1-s2-c1', description: 'You have at least 5 Technical Skills terms.' },
      { id: 'english-m3-l1-s2-c2', description: 'You have at least 5 Soft Skills terms.' },
      { id: 'english-m3-l1-s2-c3', description: 'You have at least 5 Action Verbs.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l1s3: Step = {
  id: 'english-m3-l1-s3',
  title: 'Write one paragraph using 10 of your terms',
  instruction:
    'Write a 100–150 word paragraph describing what a junior system analyst does, using at least 10 words or phrases from your categorised list. Write it as if it were the summary section of your LinkedIn profile. Do not use Google Translate — write directly in English even if imperfect.',
  prerequisites: ['english-m3-l1-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l1-s3-c1', description: 'Your paragraph is 100–150 words.' },
      { id: 'english-m3-l1-s3-c2', description: 'You used at least 10 terms from your categorised list.' },
      { id: 'english-m3-l1-s3-c3', description: 'You wrote it directly in English without translating.' },
    ],
  },
  reflection: {
    id: 'english-m3-l1-r',
    prompt: 'Without looking back: write the 5 most important technical terms a junior system analyst must know from your research — and one sentence explaining each.',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l1: Lesson = {
  id: 'english-m3-l1',
  title: 'Job Posting Vocabulary',
  description: 'Read real US job postings, extract professional vocabulary, and use it in a LinkedIn-style summary paragraph.',
  steps: [m3l1s1, m3l1s2, m3l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m3l2s1: Step = {
  id: 'english-m3-l2-s1',
  title: 'Write a bug report in English',
  instruction:
    'Think of any software bug you have encountered — in an app, a website, or anything. Write a formal bug report in English using this structure: Title (one sentence), Steps to Reproduce (numbered list), Expected Result, Actual Result, Environment (browser, OS, device). Write 150–200 words total.',
  prerequisites: [],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l2-s1-c1', description: 'Your report has all 5 required sections.' },
      { id: 'english-m3-l2-s1-c2', description: 'Steps to Reproduce is a numbered list.' },
      { id: 'english-m3-l2-s1-c3', description: 'The report is 150–200 words.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l2s2: Step = {
  id: 'english-m3-l2-s2',
  title: 'Write a user story in the standard format',
  instruction:
    'Write 3 user stories using the format: "As a [role], I want [action] so that [benefit]." Choose a simple app like a to-do list or online shop. For each user story, add 3 acceptance criteria using the format: "Given [context], when [action], then [result]."',
  prerequisites: ['english-m3-l2-s1'],
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l2-s2-c1', description: 'You wrote 3 user stories in the correct "As a... I want... so that..." format.' },
      { id: 'english-m3-l2-s2-c2', description: 'Each story has 3 acceptance criteria in the Given/When/Then format.' },
      { id: 'english-m3-l2-s2-c3', description: 'All text is written directly in English.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l2s3: Step = {
  id: 'english-m3-l2-s3',
  title: 'Write a meeting summary email',
  instruction:
    'Imagine you just attended a 30-minute requirements meeting with a client. Write a follow-up email in English (120–180 words) with: Subject line, greeting, 3 bullet points of decisions made, 2 action items with owners and deadlines, and a closing. Use professional business English — no slang.',
  prerequisites: ['english-m3-l2-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l2-s3-c1', description: 'Your email has a subject line, greeting, and professional closing.' },
      { id: 'english-m3-l2-s3-c2', description: 'You listed 3 decisions as bullet points.' },
      { id: 'english-m3-l2-s3-c3', description: 'You listed 2 action items with owner names and deadlines.' },
      { id: 'english-m3-l2-s3-c4', description: 'The email is 120–180 words.' },
    ],
  },
  reflection: {
    id: 'english-m3-l2-r',
    prompt: 'Without looking back: what is the difference in tone between a bug report, a user story, and a follow-up email? Why does each require a different register?',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l2: Lesson = {
  id: 'english-m3-l2',
  title: 'Professional Writing for System Analysts',
  description: 'Write a bug report, user stories with acceptance criteria, and a professional follow-up email.',
  steps: [m3l2s1, m3l2s2, m3l2s3],
  dependencies: ['english-m3-l1'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const m3l3s1: Step = {
  id: 'english-m3-l3-s1',
  title: 'Read a technical article and summarise it',
  instruction:
    'Go to martinfowler.com/articles.html. Pick any article that is under 10 minutes to read (check the reading time shown). Read the full article in English without translating. Then write a 100-word summary in English: the main idea, 2 supporting points, and your own opinion on whether the concept is useful for a system analyst.',
  prerequisites: [],
  resource: {
    id: 'english-m3-l3-s1-res',
    type: 'article',
    title: 'Martin Fowler — Software Architecture Articles',
    url: 'https://martinfowler.com/articles.html',
    whatIsThis: 'High-quality technical writing by one of the most respected software architects. Used by senior engineers worldwide — reading this trains professional technical English.',
    setupSteps: [
      'Go to martinfowler.com/articles.html.',
      'Pick an article with an estimated reading time under 10 minutes.',
      'Read without translating.',
    ],
  },
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l3-s1-c1', description: 'You read the full article without translating.' },
      { id: 'english-m3-l3-s1-c2', description: 'Your summary is 100 words and covers the main idea and 2 supporting points.' },
      { id: 'english-m3-l3-s1-c3', description: 'You included your own opinion on its relevance to system analysis.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l3s2: Step = {
  id: 'english-m3-l3-s2',
  title: 'Identify sentence patterns used by expert writers',
  instruction:
    'Re-read the first 3 paragraphs of the Martin Fowler article. Find: one sentence that starts with a dependent clause (e.g. "When X happens, Y follows"), one sentence that uses a colon to introduce a list or explanation, and one sentence that contrasts two ideas using "however", "while", or "whereas". Write each sentence and label it.',
  prerequisites: ['english-m3-l3-s1'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l3-s2-c1', description: 'You found and labelled a dependent-clause opener.' },
      { id: 'english-m3-l3-s2-c2', description: 'You found and labelled a colon-introduction sentence.' },
      { id: 'english-m3-l3-s2-c3', description: 'You found and labelled a contrast sentence.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m3l3s3: Step = {
  id: 'english-m3-l3-s3',
  title: 'Write a short technical opinion piece using the patterns',
  instruction:
    'Write 150–200 words on this topic: "Should a system analyst know how to write SQL queries?" Use all three sentence patterns you identified: a dependent-clause opener, a colon introduction, and a contrast with however/while/whereas. Underline or mark each pattern in your text.',
  prerequisites: ['english-m3-l3-s2'],
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m3-l3-s3-c1', description: 'Your piece is 150–200 words.' },
      { id: 'english-m3-l3-s3-c2', description: 'You used and marked all three sentence patterns.' },
      { id: 'english-m3-l3-s3-c3', description: 'Your argument has a clear position, not just a list of facts.' },
    ],
  },
  reflection: {
    id: 'english-m3-l3-r',
    prompt: 'Without looking back: write one sentence using a colon to explain what a system analyst does, and one contrast sentence comparing a system analyst to a developer.',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m3l3: Lesson = {
  id: 'english-m3-l3',
  title: 'Reading and Imitating Technical Writing',
  description: 'Read expert technical articles, identify professional sentence patterns, and apply them in your own writing.',
  steps: [m3l3s1, m3l3s2, m3l3s3],
  dependencies: ['english-m3-l2'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const module3: Module = {
  id: 'english-m3',
  title: 'Writing and Technical Vocabulary',
  description: 'Build professional writing skills through job postings, analyst documents, and technical articles.',
  lessons: [m3l1, m3l2, m3l3],
  order: 3,
};

// ===================================================================================
// MODULE 4 — B2 Fluency and US Market Readiness
// ===================================================================================

const m4l1s1: Step = {
  id: 'english-m4-l1-s1',
  title: 'Watch a native English conversation and note connected speech',
  instruction:
    'Search YouTube for "American English connected speech examples". Find a video that explains linking, reduction, and elision with examples. Watch it fully. Then find a 30-second clip of natural American conversation anywhere online. Listen 5 times and write down at least 3 places where words connect or sounds are reduced (e.g. "gonna" = "going to", "wanna" = "want to", "didja" = "did you").',
  prerequisites: [],
  resource: {
    id: 'english-m4-l1-s1-res',
    type: 'video',
    title: 'Rachel\'s English — Connected Speech',
    url: 'https://www.youtube.com/@rachelsenglish',
    whatIsThis: 'The best YouTube channel for American English pronunciation. Rachel explains exactly how native speakers connect, reduce, and change sounds in real speech.',
    setupSteps: [
      'Go to the channel.',
      'Search for "connected speech" in the channel search.',
      'Pick any video under 10 minutes.',
    ],
  },
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m4-l1-s1-c1', description: 'You watched a connected speech explanation video.' },
      { id: 'english-m4-l1-s1-c2', description: 'You found a natural conversation clip and identified 3 connected speech examples.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m4l1s2: Step = {
  id: 'english-m4-l1-s2',
  title: 'Practise 10 common connected speech reductions',
  instruction:
    'Go to Rachel\'s English channel and find a video on reductions or contractions. Learn and practise saying these 10 forms out loud 5 times each: gonna, wanna, gotta, kinda, sorta, hafta, shoulda, coulda, woulda, dunno. Record yourself saying each one in a full sentence.',
  prerequisites: ['english-m4-l1-s1'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m4-l1-s2-c1', description: 'You said each of the 10 reductions out loud at least 5 times.' },
      { id: 'english-m4-l1-s2-c2', description: 'You recorded yourself using each one in a full sentence.' },
    ],
  },
  baseXP: 10,
  baseCoins: 5,
};

const m4l1s3: Step = {
  id: 'english-m4-l1-s3',
  title: 'Shadow a 60-second American English conversation',
  instruction:
    'Find a 60-second clip of American English casual conversation — a YouTube vlog, a podcast intro, or a casual interview. Shadow it 5 times using the full technique: simultaneously, matching rhythm and reductions. Record your 5th attempt and compare it to the original. Write down 2 reductions you successfully reproduced and 1 you still struggle with.',
  prerequisites: ['english-m4-l1-s2'],
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m4-l1-s3-c1', description: 'You shadowed a 60-second American English clip 5 times.' },
      { id: 'english-m4-l1-s3-c2', description: 'You recorded the 5th attempt and compared it.' },
      { id: 'english-m4-l1-s3-c3', description: 'You identified 2 reductions you reproduced and 1 you still struggle with.' },
    ],
  },
  reflection: {
    id: 'english-m4-l1-r',
    prompt: 'Without looking back: write 3 sentences using connected speech reductions naturally — the way you would say them out loud, not how you would write them formally.',
  },
  baseXP: 15,
  baseCoins: 8,
};

const m4l1: Lesson = {
  id: 'english-m4-l1',
  title: 'American English Connected Speech',
  description: 'Understand and practise the reductions and linking patterns that define natural American English speech.',
  steps: [m4l1s1, m4l1s2, m4l1s3],
  dependencies: [],
  completionBonusXP: 20,
  completionBonusCoins: 10,
};

const m4l2s1: Step = {
  id: 'english-m4-l2-s1',
  title: 'Prepare answers to 5 common US interview questions',
  instruction:
    'Research "common system analyst interview questions USA". Pick these 5: Tell me about yourself / Why do you want to be a system analyst / Describe a time you solved a complex problem / How do you handle unclear requirements / Where do you see yourself in 3 years. Write a 60–90 second answer for each in English. Use the STAR method for the behavioural questions (Situation, Task, Action, Result).',
  prerequisites: [],
  resource: {
    id: 'english-m4-l2-s1-res',
    type: 'article',
    title: 'Indeed — System Analyst Interview Questions',
    url: 'https://www.indeed.com/career-advice/interviewing/system-analyst-interview-questions',
    whatIsThis: 'A curated list of real system analyst interview questions with example answers. Use to understand what US employers expect.',
    setupSteps: [
      'Open the link and read the questions.',
      'Focus on the 5 questions listed in the instruction.',
      'Use the STAR method for behavioural questions.',
    ],
  },
  estimatedMinutes: 25,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m4-l2-s1-c1', description: 'You have written answers for all 5 questions.' },
      { id: 'english-m4-l2-s1-c2', description: 'Behavioural answers use the STAR structure.' },
      { id: 'english-m4-l2-s1-c3', description: 'Each answer is 60–90 seconds when read aloud.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m4l2s2: Step = {
  id: 'english-m4-l2-s2',
  title: 'Record all 5 answers back to back',
  instruction:
    'Set up your phone recorder. Record yourself answering all 5 interview questions back to back without stopping between questions — simulate a real interview flow. Allow yourself 5 seconds between answers to breathe, then continue. Total recording should be 5–8 minutes.',
  prerequisites: ['english-m4-l2-s1'],
  estimatedMinutes: 20,
  verification: {
    type: 'manual-confirm',
    criteria: [
      { id: 'english-m4-l2-s2-c1', description: 'You recorded all 5 answers without stopping between them.' },
      { id: 'english-m4-l2-s2-c2', description: 'Total recording is between 5 and 8 minutes.' },
    ],
  },
  baseXP: 15,
  baseCoins: 8,
};

const m4l2s3: Step = {
  id: 'english-m4-l2-s3',
  title: 'Grade your recording on 4 criteria',
  instruction:
    'Listen to your recording and score yourself 1–5 on each criterion: Clarity (can a listener understand every word), Fluency (minimal pauses and filler words), Vocabulary (professional and varied), Confidence (steady pace, no trails off). Write your scores and one specific improvement action for any criterion below 4.',
  prerequisites: ['english-m4-l2-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m4-l2-s3-c1', description: 'You scored yourself on all 4 criteria.' },
      { id: 'english-m4-l2-s3-c2', description: 'For any score below 4, you wrote one specific improvement action.' },
    ],
  },
  reflection: {
    id: 'english-m4-l2-r',
    prompt: 'Without looking back: answer "Tell me about yourself" in writing in 4–5 sentences as you would say it in a real interview tomorrow.',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m4l2: Lesson = {
  id: 'english-m4-l2',
  title: 'US Interview Preparation',
  description: 'Prepare, record, and grade answers to the 5 most common system analyst interview questions in the US market.',
  steps: [m4l2s1, m4l2s2, m4l2s3],
  dependencies: ['english-m4-l1'],
  completionBonusXP: 25,
  completionBonusCoins: 12,
};

const m4l3s1: Step = {
  id: 'english-m4-l3-s1',
  title: 'Write a cold outreach message to a US recruiter',
  instruction:
    'Go to LinkedIn and find a real recruiter at a US tech company who posts about hiring analysts or IT roles. Write a 100-word cold outreach message in English: introduce yourself, mention one specific thing from their profile or recent post, state your goal (junior SA role, available remotely), and ask one specific question. Do not send it yet — just write it.',
  prerequisites: [],
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m4-l3-s1-c1', description: 'Your message is 100 words.' },
      { id: 'english-m4-l3-s1-c2', description: 'You referenced something specific from the recruiter\'s profile or post.' },
      { id: 'english-m4-l3-s1-c3', description: 'You stated your goal clearly and asked one specific question.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m4l3s2: Step = {
  id: 'english-m4-l3-s2',
  title: 'Write a LinkedIn post about something you learned',
  instruction:
    'Write a LinkedIn post (150–200 words) about something technical you learned this week — SQL joins, HTTP methods, or anything from your studies. Structure: hook sentence (surprising fact or question), 3–4 sentences of explanation, one practical takeaway, and a closing question to invite comments. Write directly in English.',
  prerequisites: ['english-m4-l3-s1'],
  estimatedMinutes: 20,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m4-l3-s2-c1', description: 'Your post is 150–200 words.' },
      { id: 'english-m4-l3-s2-c2', description: 'It has a hook, explanation, takeaway, and closing question.' },
      { id: 'english-m4-l3-s2-c3', description: 'The content is genuinely technical, not vague.' },
    ],
  },
  baseXP: 20,
  baseCoins: 10,
};

const m4l3s3: Step = {
  id: 'english-m4-l3-s3',
  title: 'Review and refine both pieces for US professional tone',
  instruction:
    'Read your outreach message and LinkedIn post. Apply this checklist to each: no overly formal phrases ("I am writing to enquire"), no filler openers ("I hope this message finds you well"), no passive voice where active works better, no spelling errors, sentences under 25 words where possible. Rewrite any sentence that fails a check.',
  prerequisites: ['english-m4-l3-s2'],
  estimatedMinutes: 15,
  verification: {
    type: 'checklist',
    criteria: [
      { id: 'english-m4-l3-s3-c1', description: 'You removed overly formal or clichéd phrases from both pieces.' },
      { id: 'english-m4-l3-s3-c2', description: 'You replaced passive voice with active voice where possible.' },
      { id: 'english-m4-l3-s3-c3', description: 'No sentence in either piece exceeds 25 words.' },
    ],
  },
  reflection: {
    id: 'english-m4-l3-r',
    prompt: 'Without looking back: what is the single most important difference between formal British English and professional American English in written communication?',
  },
  baseXP: 20,
  baseCoins: 10,
};

const m4l3: Lesson = {
  id: 'english-m4-l3',
  title: 'US Professional Communication',
  description: 'Write a recruiter outreach message and a LinkedIn post, then refine both for US professional tone.',
  steps: [m4l3s1, m4l3s2, m4l3s3],
  dependencies: ['english-m4-l2'],
  completionBonusXP: 30,
  completionBonusCoins: 15,
};

const module4: Module = {
  id: 'english-m4',
  title: 'B2 Fluency and US Market Readiness',
  description: 'Master American connected speech, prepare for US interviews, and write professional communications for the US market.',
  lessons: [m4l1, m4l2, m4l3],
  order: 4,
};

// ===================================================================================
// SKILL
// ===================================================================================

export const englishSkill: Skill = {
  id: 'english',
  name: 'English',
  category: 'Soft Skills',
  description:
    'Go from B1 to C1 through daily listening, shadowing, professional writing, and US market preparation — using only free tools, real content, and deliberate practice with no grammar drills.',
  modules: [module1, module2, module3, module4],
  dependencies: [],
  maxLevel: 6,
  color: '#065f46',
};