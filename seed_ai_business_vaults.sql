-- =============================================================================
-- Vaulterly — AI & Business Vault Seed Data
-- =============================================================================
-- 10 vaults · 80 entries · 20 tags
-- User: eb49d243-faee-4d36-b834-e74308e7ebac
--
-- Idempotent — safe to re-run (ON CONFLICT DO NOTHING throughout).
-- =============================================================================

DO $$
DECLARE
  seed_uid UUID := 'eb49d243-faee-4d36-b834-e74308e7ebac';

  -- -------------------------------------------------------------------------
  -- Vault IDs
  -- -------------------------------------------------------------------------
  v1  UUID := '44444444-4444-4444-4444-000000000001'; -- AI Tools Every Student Needs Right Now
  v2  UUID := '44444444-4444-4444-4444-000000000002'; -- Learn Machine Learning for Free
  v3  UUID := '44444444-4444-4444-4444-000000000003'; -- Prompt Engineering: Get 10x Better AI Results
  v4  UUID := '44444444-4444-4444-4444-000000000004'; -- Build AI Apps Without a CS Degree
  v5  UUID := '44444444-4444-4444-4444-000000000005'; -- The AI Career Launchpad
  v6  UUID := '44444444-4444-4444-4444-000000000006'; -- Launch a Startup in College
  v7  UUID := '44444444-4444-4444-4444-000000000007'; -- Side Hustle Playbook for Students
  v8  UUID := '44444444-4444-4444-4444-000000000008'; -- Investing & Personal Finance Before You Graduate
  v9  UUID := '44444444-4444-4444-4444-000000000009'; -- Zero-Budget Growth Marketing
  v10 UUID := '44444444-4444-4444-4444-000000000010'; -- Entrepreneurship Essentials: Read What Founders Read

  -- -------------------------------------------------------------------------
  -- Tag IDs
  -- -------------------------------------------------------------------------
  t_ai              UUID := '66666666-6666-6666-6666-000000000001';
  t_ml              UUID := '66666666-6666-6666-6666-000000000002';
  t_prompt_eng      UUID := '66666666-6666-6666-6666-000000000003';
  t_no_code         UUID := '66666666-6666-6666-6666-000000000004';
  t_tools           UUID := '66666666-6666-6666-6666-000000000005';
  t_startup         UUID := '66666666-6666-6666-6666-000000000006';
  t_entrepreneurship UUID := '66666666-6666-6666-6666-000000000007';
  t_side_hustle     UUID := '66666666-6666-6666-6666-000000000008';
  t_freelancing     UUID := '66666666-6666-6666-6666-000000000009';
  t_investing       UUID := '66666666-6666-6666-6666-000000000010';
  t_personal_finance UUID := '66666666-6666-6666-6666-000000000011';
  t_marketing       UUID := '66666666-6666-6666-6666-000000000012';
  t_growth          UUID := '66666666-6666-6666-6666-000000000013';
  t_career          UUID := '66666666-6666-6666-6666-000000000014';
  t_free            UUID := '66666666-6666-6666-6666-000000000015';
  t_productivity    UUID := '66666666-6666-6666-6666-000000000016';
  t_data_science    UUID := '66666666-6666-6666-6666-000000000017';
  t_building        UUID := '66666666-6666-6666-6666-000000000018';
  t_reading         UUID := '66666666-6666-6666-6666-000000000019';
  t_money           UUID := '66666666-6666-6666-6666-000000000020';

BEGIN

  -- ===========================================================================
  -- VAULTS
  -- ===========================================================================
  INSERT INTO vaults (id, user_id, name, title, description, category, is_public, created_at)
  VALUES
    (v1, seed_uid,
     'AI Tools Every Student Needs Right Now',
     'AI Tools Every Student Needs Right Now',
     'The essential AI toolkit for 2025 — the exact tools top students use to research faster, write better, study smarter, and get more done in less time.',
     'Artificial Intelligence', true, NOW() - INTERVAL '10 days'),

    (v2, seed_uid,
     'Learn Machine Learning for Free',
     'Learn Machine Learning for Free',
     'From zero to building real models — the best free courses, datasets, and hands-on platforms used by ML engineers at Google, Meta, and top startups.',
     'Artificial Intelligence', true, NOW() - INTERVAL '9 days'),

    (v3, seed_uid,
     'Prompt Engineering: Get 10x Better AI Results',
     'Prompt Engineering: Get 10x Better AI Results',
     'The skill that separates AI power users from everyone else. Master prompt engineering with these guides, libraries, and frameworks used by professionals.',
     'Artificial Intelligence', true, NOW() - INTERVAL '8 days'),

    (v4, seed_uid,
     'Build AI Apps Without a CS Degree',
     'Build AI Apps Without a CS Degree',
     'Ship your first AI-powered app using the same APIs and tools real startups use. No PhD required — just these resources and a weekend.',
     'Artificial Intelligence', true, NOW() - INTERVAL '7 days'),

    (v5, seed_uid,
     'The AI Career Launchpad',
     'The AI Career Launchpad',
     'Break into the most in-demand field of the decade. Job boards, skill-building paths, and insider resources for landing an AI role straight out of college.',
     'Artificial Intelligence', true, NOW() - INTERVAL '6 days'),

    (v6, seed_uid,
     'Launch a Startup in College',
     'Launch a Startup in College',
     'The exact resources Y Combinator founders used before they were famous. Validate your idea, build an MVP, and get your first customers — while in school.',
     'Business', true, NOW() - INTERVAL '5 days'),

    (v7, seed_uid,
     'Side Hustle Playbook for Students',
     'Side Hustle Playbook for Students',
     'Make real money while earning your degree. The best platforms, templates, and strategies for freelancing and consulting as a student — no experience required.',
     'Business', true, NOW() - INTERVAL '4 days'),

    (v8, seed_uid,
     'Investing & Personal Finance Before You Graduate',
     'Investing & Personal Finance Before You Graduate',
     'The money knowledge most people learn too late. Start investing, eliminate bad debt, and build wealth in your 20s using these free, no-hype resources.',
     'Business', true, NOW() - INTERVAL '3 days'),

    (v9, seed_uid,
     'Zero-Budget Growth Marketing',
     'Zero-Budget Growth Marketing',
     'Grow a product, brand, or audience from scratch with no ad spend. The SEO, email, content, and social playbooks used by the fastest-growing bootstrapped companies.',
     'Business', true, NOW() - INTERVAL '2 days'),

    (v10, seed_uid,
     'Entrepreneurship Essentials: Read What Founders Read',
     'Entrepreneurship Essentials: Read What Founders Read',
     'The essays, blogs, and frameworks that shaped the thinking of the world''s most successful founders. Free, battle-tested, and more valuable than most MBA courses.',
     'Business', true, NOW() - INTERVAL '1 day')

  ON CONFLICT (id) DO NOTHING;


  -- ===========================================================================
  -- TAGS
  -- ===========================================================================
  INSERT INTO tags (id, user_id, name)
  VALUES
    (t_ai,               seed_uid, 'ai'),
    (t_ml,               seed_uid, 'machine-learning'),
    (t_prompt_eng,       seed_uid, 'prompt-engineering'),
    (t_no_code,          seed_uid, 'no-code'),
    (t_tools,            seed_uid, 'tools'),
    (t_startup,          seed_uid, 'startup'),
    (t_entrepreneurship, seed_uid, 'entrepreneurship'),
    (t_side_hustle,      seed_uid, 'side-hustle'),
    (t_freelancing,      seed_uid, 'freelancing'),
    (t_investing,        seed_uid, 'investing'),
    (t_personal_finance, seed_uid, 'personal-finance'),
    (t_marketing,        seed_uid, 'marketing'),
    (t_growth,           seed_uid, 'growth'),
    (t_career,           seed_uid, 'career'),
    (t_free,             seed_uid, 'free'),
    (t_productivity,     seed_uid, 'productivity'),
    (t_data_science,     seed_uid, 'data-science'),
    (t_building,         seed_uid, 'building'),
    (t_reading,          seed_uid, 'reading'),
    (t_money,            seed_uid, 'money')
  ON CONFLICT (user_id, name) DO NOTHING;

  -- Re-fetch real tag IDs in case any already existed with different UUIDs
  SELECT id INTO t_ai               FROM tags WHERE user_id = seed_uid AND name = 'ai';
  SELECT id INTO t_ml               FROM tags WHERE user_id = seed_uid AND name = 'machine-learning';
  SELECT id INTO t_prompt_eng       FROM tags WHERE user_id = seed_uid AND name = 'prompt-engineering';
  SELECT id INTO t_no_code          FROM tags WHERE user_id = seed_uid AND name = 'no-code';
  SELECT id INTO t_tools            FROM tags WHERE user_id = seed_uid AND name = 'tools';
  SELECT id INTO t_startup          FROM tags WHERE user_id = seed_uid AND name = 'startup';
  SELECT id INTO t_entrepreneurship FROM tags WHERE user_id = seed_uid AND name = 'entrepreneurship';
  SELECT id INTO t_side_hustle      FROM tags WHERE user_id = seed_uid AND name = 'side-hustle';
  SELECT id INTO t_freelancing      FROM tags WHERE user_id = seed_uid AND name = 'freelancing';
  SELECT id INTO t_investing        FROM tags WHERE user_id = seed_uid AND name = 'investing';
  SELECT id INTO t_personal_finance FROM tags WHERE user_id = seed_uid AND name = 'personal-finance';
  SELECT id INTO t_marketing        FROM tags WHERE user_id = seed_uid AND name = 'marketing';
  SELECT id INTO t_growth           FROM tags WHERE user_id = seed_uid AND name = 'growth';
  SELECT id INTO t_career           FROM tags WHERE user_id = seed_uid AND name = 'career';
  SELECT id INTO t_free             FROM tags WHERE user_id = seed_uid AND name = 'free';
  SELECT id INTO t_productivity     FROM tags WHERE user_id = seed_uid AND name = 'productivity';
  SELECT id INTO t_data_science     FROM tags WHERE user_id = seed_uid AND name = 'data-science';
  SELECT id INTO t_building         FROM tags WHERE user_id = seed_uid AND name = 'building';
  SELECT id INTO t_reading          FROM tags WHERE user_id = seed_uid AND name = 'reading';
  SELECT id INTO t_money            FROM tags WHERE user_id = seed_uid AND name = 'money';


  -- ===========================================================================
  -- VAULT 1: AI Tools Every Student Needs Right Now
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0001-000000000001', seed_uid, v1,
     'ChatGPT', 'https://chat.openai.com',
     'The AI assistant that started it all. Use it to explain complex topics, debug code, draft essays, brainstorm ideas, and simulate conversations for exam prep.',
     NOW()),
    ('55555555-5555-5555-0001-000000000002', seed_uid, v1,
     'Claude by Anthropic', 'https://claude.ai',
     'Exceptional at long-form analysis, summarizing research papers, and nuanced writing tasks. Often outperforms ChatGPT on reasoning-heavy academic work.',
     NOW()),
    ('55555555-5555-5555-0001-000000000003', seed_uid, v1,
     'Perplexity AI', 'https://www.perplexity.ai',
     'AI-powered search engine that cites its sources. The best replacement for Googling — gives direct answers with references you can actually verify.',
     NOW()),
    ('55555555-5555-5555-0001-000000000004', seed_uid, v1,
     'Gamma — AI Presentation Maker', 'https://gamma.app',
     'Generate beautiful, professional presentations and documents from a prompt in seconds. A game-changer for group projects and pitch decks.',
     NOW()),
    ('55555555-5555-5555-0001-000000000005', seed_uid, v1,
     'Otter.ai — AI Meeting Notes', 'https://otter.ai',
     'Automatically transcribes and summarizes lectures, meetings, and study sessions. Never miss a key point — free tier covers most student use cases.',
     NOW()),
    ('55555555-5555-5555-0001-000000000006', seed_uid, v1,
     'Elicit — AI Research Assistant', 'https://elicit.com',
     'AI tool built specifically for academic research. Upload papers and ask questions — it extracts key findings, methods, and conclusions for you.',
     NOW()),
    ('55555555-5555-5555-0001-000000000007', seed_uid, v1,
     'Grammarly', 'https://www.grammarly.com',
     'AI writing assistant that catches grammar mistakes, suggests clearer phrasing, and adjusts your tone. Essential for every paper, email, and cover letter.',
     NOW()),
    ('55555555-5555-5555-0001-000000000008', seed_uid, v1,
     'Notion AI', 'https://www.notion.so/product/ai',
     'Built directly into Notion — summarize notes, generate outlines, autofill tables, and translate content without ever leaving your workspace.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0001-000000000001', t_ai),
    ('55555555-5555-5555-0001-000000000001', t_tools),
    ('55555555-5555-5555-0001-000000000002', t_ai),
    ('55555555-5555-5555-0001-000000000002', t_tools),
    ('55555555-5555-5555-0001-000000000003', t_ai),
    ('55555555-5555-5555-0001-000000000003', t_tools),
    ('55555555-5555-5555-0001-000000000004', t_ai),
    ('55555555-5555-5555-0001-000000000004', t_productivity),
    ('55555555-5555-5555-0001-000000000005', t_ai),
    ('55555555-5555-5555-0001-000000000005', t_productivity),
    ('55555555-5555-5555-0001-000000000006', t_ai),
    ('55555555-5555-5555-0001-000000000006', t_tools),
    ('55555555-5555-5555-0001-000000000007', t_ai),
    ('55555555-5555-5555-0001-000000000007', t_productivity),
    ('55555555-5555-5555-0001-000000000008', t_ai),
    ('55555555-5555-5555-0001-000000000008', t_productivity)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 2: Learn Machine Learning for Free
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0002-000000000001', seed_uid, v2,
     'fast.ai — Practical Deep Learning', 'https://course.fast.ai',
     'The most acclaimed free ML course in the world. Taught top-down with real code from day one. Used by engineers now at OpenAI, Google DeepMind, and top labs.',
     NOW()),
    ('55555555-5555-5555-0002-000000000002', seed_uid, v2,
     'Google Machine Learning Crash Course', 'https://developers.google.com/machine-learning/crash-course',
     'Google''s own free ML course with video lectures, interactive exercises, and real TensorFlow examples. Structured for beginners with zero ML background.',
     NOW()),
    ('55555555-5555-5555-0002-000000000003', seed_uid, v2,
     'Kaggle Learn', 'https://www.kaggle.com/learn',
     'Free micro-courses in Python, ML, deep learning, SQL, and data visualization — with hands-on notebooks you run in the browser. No setup required.',
     NOW()),
    ('55555555-5555-5555-0002-000000000004', seed_uid, v2,
     'DeepLearning.AI Short Courses', 'https://www.deeplearning.ai/short-courses',
     'Andrew Ng''s free short courses on LLMs, prompt engineering, RAG, fine-tuning, and more. The most up-to-date practical AI curriculum available.',
     NOW()),
    ('55555555-5555-5555-0002-000000000005', seed_uid, v2,
     'Hugging Face NLP Course', 'https://huggingface.co/learn/nlp-course/chapter1/1',
     'The definitive free course for working with transformers, LLMs, and modern NLP. Uses the Hugging Face ecosystem — the industry standard for AI development.',
     NOW()),
    ('55555555-5555-5555-0002-000000000006', seed_uid, v2,
     '3Blue1Brown — Neural Networks Series', 'https://www.3blue1brown.com/topics/neural-networks',
     'Visually stunning animated explanations of how neural networks and backpropagation actually work. Builds deep intuition before you touch any code.',
     NOW()),
    ('55555555-5555-5555-0002-000000000007', seed_uid, v2,
     'Stanford CS229 — Machine Learning', 'https://cs229.stanford.edu',
     'Stanford''s legendary ML course taught by Andrew Ng — full lecture notes, problem sets, and videos available free online. The gold standard ML curriculum.',
     NOW()),
    ('55555555-5555-5555-0002-000000000008', seed_uid, v2,
     'StatQuest with Josh Starmer', 'https://statquest.org',
     'Complex ML and statistics concepts broken down with simple, visual explanations and real examples. Exceptional for building the math intuition behind ML.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0002-000000000001', t_ml),
    ('55555555-5555-5555-0002-000000000001', t_free),
    ('55555555-5555-5555-0002-000000000002', t_ml),
    ('55555555-5555-5555-0002-000000000002', t_free),
    ('55555555-5555-5555-0002-000000000003', t_ml),
    ('55555555-5555-5555-0002-000000000003', t_data_science),
    ('55555555-5555-5555-0002-000000000004', t_ml),
    ('55555555-5555-5555-0002-000000000004', t_ai),
    ('55555555-5555-5555-0002-000000000005', t_ml),
    ('55555555-5555-5555-0002-000000000005', t_ai),
    ('55555555-5555-5555-0002-000000000006', t_ml),
    ('55555555-5555-5555-0002-000000000006', t_free),
    ('55555555-5555-5555-0002-000000000007', t_ml),
    ('55555555-5555-5555-0002-000000000007', t_data_science),
    ('55555555-5555-5555-0002-000000000008', t_ml),
    ('55555555-5555-5555-0002-000000000008', t_data_science)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 3: Prompt Engineering: Get 10x Better AI Results
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0003-000000000001', seed_uid, v3,
     'Learn Prompting', 'https://learnprompting.org',
     'The most comprehensive free guide to prompt engineering — from basic techniques to advanced methods like chain-of-thought, few-shot, and agent prompting.',
     NOW()),
    ('55555555-5555-5555-0003-000000000002', seed_uid, v3,
     'Prompt Engineering Guide (DAIR.AI)', 'https://www.promptingguide.ai',
     'Research-backed prompt engineering techniques used by AI professionals. Covers zero-shot, few-shot, CoT, ReAct, and the latest LLM prompting research.',
     NOW()),
    ('55555555-5555-5555-0003-000000000003', seed_uid, v3,
     'OpenAI Prompt Engineering Guide', 'https://platform.openai.com/docs/guides/prompt-engineering',
     'Official best practices from OpenAI on writing effective prompts for GPT-4 and beyond. Includes six core strategies with worked examples.',
     NOW()),
    ('55555555-5555-5555-0003-000000000004', seed_uid, v3,
     'Anthropic Prompt Library', 'https://docs.anthropic.com/claude/prompt-library',
     'A free library of production-ready prompts for dozens of real-world tasks — coding, analysis, writing, data extraction — optimized for Claude.',
     NOW()),
    ('55555555-5555-5555-0003-000000000005', seed_uid, v3,
     'OpenAI Cookbook', 'https://cookbook.openai.com',
     'A growing collection of code examples and guides for building with the OpenAI API. Real implementation patterns for RAG, function calling, fine-tuning, and more.',
     NOW()),
    ('55555555-5555-5555-0003-000000000006', seed_uid, v3,
     'DeepLearning.AI — Prompt Engineering for Developers', 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers',
     'Andrew Ng and OpenAI''s Isa Fulford teach prompt engineering best practices in this free 1-hour course designed for developers building real products.',
     NOW()),
    ('55555555-5555-5555-0003-000000000007', seed_uid, v3,
     'Fabric — AI Prompt Framework', 'https://github.com/danielmiessler/fabric',
     'Open-source framework of battle-tested prompt "patterns" for real tasks: summarizing, writing, analyzing, extracting wisdom from content, and more.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0003-000000000001', t_prompt_eng),
    ('55555555-5555-5555-0003-000000000001', t_free),
    ('55555555-5555-5555-0003-000000000002', t_prompt_eng),
    ('55555555-5555-5555-0003-000000000002', t_ai),
    ('55555555-5555-5555-0003-000000000003', t_prompt_eng),
    ('55555555-5555-5555-0003-000000000003', t_ai),
    ('55555555-5555-5555-0003-000000000004', t_prompt_eng),
    ('55555555-5555-5555-0003-000000000004', t_tools),
    ('55555555-5555-5555-0003-000000000005', t_prompt_eng),
    ('55555555-5555-5555-0003-000000000005', t_building),
    ('55555555-5555-5555-0003-000000000006', t_prompt_eng),
    ('55555555-5555-5555-0003-000000000006', t_free),
    ('55555555-5555-5555-0003-000000000007', t_prompt_eng),
    ('55555555-5555-5555-0003-000000000007', t_tools)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 4: Build AI Apps Without a CS Degree
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0004-000000000001', seed_uid, v4,
     'OpenAI API Documentation', 'https://platform.openai.com/docs',
     'The starting point for building AI-powered apps. Clear docs for text generation, image creation, embeddings, function calling, and speech — all with free credits to start.',
     NOW()),
    ('55555555-5555-5555-0004-000000000002', seed_uid, v4,
     'LangChain', 'https://python.langchain.com',
     'The most widely used framework for building LLM-powered apps. Chain prompts, connect data sources, and build agents with less code and more power.',
     NOW()),
    ('55555555-5555-5555-0004-000000000003', seed_uid, v4,
     'Streamlit', 'https://streamlit.io',
     'Turn a Python script into a shareable web app in minutes — no frontend skills needed. The fastest way to demo and ship AI projects.',
     NOW()),
    ('55555555-5555-5555-0004-000000000004', seed_uid, v4,
     'Hugging Face Spaces', 'https://huggingface.co/spaces',
     'Free hosting for AI demo apps built with Gradio or Streamlit. Browse thousands of live AI apps for inspiration and fork them to build your own.',
     NOW()),
    ('55555555-5555-5555-0004-000000000005', seed_uid, v4,
     'Replicate', 'https://replicate.com',
     'Run state-of-the-art AI models (image generation, speech, video, code) via a simple API — no GPU required. Pay only for what you use.',
     NOW()),
    ('55555555-5555-5555-0004-000000000006', seed_uid, v4,
     'Cursor IDE', 'https://cursor.sh',
     'AI-first code editor built on VS Code. Understands your entire codebase and writes, refactors, and explains code in context. Dramatically faster development.',
     NOW()),
    ('55555555-5555-5555-0004-000000000007', seed_uid, v4,
     'Vercel AI SDK', 'https://sdk.vercel.ai',
     'Open-source toolkit for building AI-powered web apps with React and Next.js. Streaming responses, chat UIs, and multi-model support out of the box.',
     NOW()),
    ('55555555-5555-5555-0004-000000000008', seed_uid, v4,
     'Supabase + pgvector', 'https://supabase.com/docs/guides/ai/vector-columns',
     'Add a vector database to your app for semantic search and RAG using Supabase''s free tier. The easiest way to give AI apps long-term memory.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0004-000000000001', t_ai),
    ('55555555-5555-5555-0004-000000000001', t_building),
    ('55555555-5555-5555-0004-000000000002', t_ai),
    ('55555555-5555-5555-0004-000000000002', t_building),
    ('55555555-5555-5555-0004-000000000003', t_no_code),
    ('55555555-5555-5555-0004-000000000003', t_building),
    ('55555555-5555-5555-0004-000000000004', t_ai),
    ('55555555-5555-5555-0004-000000000004', t_free),
    ('55555555-5555-5555-0004-000000000005', t_ai),
    ('55555555-5555-5555-0004-000000000005', t_building),
    ('55555555-5555-5555-0004-000000000006', t_ai),
    ('55555555-5555-5555-0004-000000000006', t_tools),
    ('55555555-5555-5555-0004-000000000007', t_ai),
    ('55555555-5555-5555-0004-000000000007', t_building),
    ('55555555-5555-5555-0004-000000000008', t_ai),
    ('55555555-5555-5555-0004-000000000008', t_building)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 5: The AI Career Launchpad
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0005-000000000001', seed_uid, v5,
     'AI Jobs Board', 'https://aijobs.net',
     'The largest dedicated job board for AI, ML, and data science roles. Filter by role type, location, remote, and seniority level.',
     NOW()),
    ('55555555-5555-5555-0005-000000000002', seed_uid, v5,
     'Hugging Face Jobs', 'https://huggingface.co/jobs',
     'Job listings from the companies most active in open-source AI — Hugging Face, EleutherAI, Mistral, and more. Where AI-first companies hire.',
     NOW()),
    ('55555555-5555-5555-0005-000000000003', seed_uid, v5,
     'DeepLearning.AI Career Resources', 'https://www.deeplearning.ai/resources',
     'Career guides, skill assessments, and advice from Andrew Ng on how to break into AI regardless of your current background.',
     NOW()),
    ('55555555-5555-5555-0005-000000000004', seed_uid, v5,
     'Kaggle Competitions', 'https://www.kaggle.com/competitions',
     'Compete in real ML challenges with prize money and public leaderboards. Even top-25% finishes on beginner competitions look strong on a resume.',
     NOW()),
    ('55555555-5555-5555-0005-000000000005', seed_uid, v5,
     'GitHub — Build a Public AI Portfolio', 'https://github.com',
     'Every AI project you build should live on GitHub. Recruiters and hiring managers at AI companies will look at your repositories before your resume.',
     NOW()),
    ('55555555-5555-5555-0005-000000000006', seed_uid, v5,
     'Papers With Code', 'https://paperswithcode.com',
     'Browse the latest AI research papers alongside their open-source implementations. Stay current with the field and contribute to repos to build credibility.',
     NOW()),
    ('55555555-5555-5555-0005-000000000007', seed_uid, v5,
     'LinkedIn AI Skills Assessments', 'https://www.linkedin.com/learning/topics/artificial-intelligence',
     'Pass LinkedIn''s AI and ML skill assessments to earn badges that appear on your profile. Endorsed skills increase recruiter contact rates significantly.',
     NOW()),
    ('55555555-5555-5555-0005-000000000008', seed_uid, v5,
     'Chip Huyen — AI Engineering Resources', 'https://huyenchip.com',
     'Blog and resources from ML engineer and Stanford lecturer Chip Huyen. Exceptional practical advice on ML systems design and AI career navigation.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0005-000000000001', t_ai),
    ('55555555-5555-5555-0005-000000000001', t_career),
    ('55555555-5555-5555-0005-000000000002', t_ai),
    ('55555555-5555-5555-0005-000000000002', t_career),
    ('55555555-5555-5555-0005-000000000003', t_ai),
    ('55555555-5555-5555-0005-000000000003', t_career),
    ('55555555-5555-5555-0005-000000000004', t_ml),
    ('55555555-5555-5555-0005-000000000004', t_career),
    ('55555555-5555-5555-0005-000000000005', t_ai),
    ('55555555-5555-5555-0005-000000000005', t_building),
    ('55555555-5555-5555-0005-000000000006', t_ml),
    ('55555555-5555-5555-0005-000000000006', t_ai),
    ('55555555-5555-5555-0005-000000000007', t_ai),
    ('55555555-5555-5555-0005-000000000007', t_career),
    ('55555555-5555-5555-0005-000000000008', t_ml),
    ('55555555-5555-5555-0005-000000000008', t_career)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 6: Launch a Startup in College
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0006-000000000001', seed_uid, v6,
     'Y Combinator Startup School', 'https://www.startupschool.org',
     'Free 8-week online program from the world''s top startup accelerator. Covers ideation, product-market fit, growth, fundraising — and you get YC mentor access.',
     NOW()),
    ('55555555-5555-5555-0006-000000000002', seed_uid, v6,
     'Paul Graham Essays', 'http://paulgraham.com/articles.html',
     'The most widely read startup essays ever written. "Do Things That Don''t Scale," "How to Get Startup Ideas," and dozens more — required reading for any founder.',
     NOW()),
    ('55555555-5555-5555-0006-000000000003', seed_uid, v6,
     'How to Start a Startup — Sam Altman (Stanford)', 'https://startupclass.samaltman.com',
     'Sam Altman''s legendary Stanford lecture series featuring Reid Hoffman, Peter Thiel, and other top founders. 20 lectures, fully free.',
     NOW()),
    ('55555555-5555-5555-0006-000000000004', seed_uid, v6,
     'Stripe Atlas', 'https://stripe.com/atlas',
     'Incorporate your startup as a US C-Corp from anywhere in the world for $500 — includes a registered agent, EIN, and Stripe account. The fastest path to legality.',
     NOW()),
    ('55555555-5555-5555-0006-000000000005', seed_uid, v6,
     'Wellfound (AngelList Talent)', 'https://wellfound.com',
     'The premier job board and co-founder matching platform for the startup world. Post your company, find early-stage jobs, or recruit your first team members.',
     NOW()),
    ('55555555-5555-5555-0006-000000000006', seed_uid, v6,
     'Product Hunt', 'https://www.producthunt.com',
     'Launch your product to thousands of early adopters, tech enthusiasts, and potential customers on day one. A successful PH launch can change everything.',
     NOW()),
    ('55555555-5555-5555-0006-000000000007', seed_uid, v6,
     'First Round Review', 'https://review.firstround.com',
     'Deep-dive tactical articles from First Round Capital on building companies — hiring, culture, product, engineering, and founder psychology.',
     NOW()),
    ('55555555-5555-5555-0006-000000000008', seed_uid, v6,
     'Indie Hackers', 'https://www.indiehackers.com',
     'Community of founders building profitable businesses. Browse revenue-sharing case studies, AMA threads, and revenue milestones from real bootstrapped companies.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0006-000000000001', t_startup),
    ('55555555-5555-5555-0006-000000000001', t_free),
    ('55555555-5555-5555-0006-000000000002', t_startup),
    ('55555555-5555-5555-0006-000000000002', t_entrepreneurship),
    ('55555555-5555-5555-0006-000000000003', t_startup),
    ('55555555-5555-5555-0006-000000000003', t_entrepreneurship),
    ('55555555-5555-5555-0006-000000000004', t_startup),
    ('55555555-5555-5555-0006-000000000004', t_building),
    ('55555555-5555-5555-0006-000000000005', t_startup),
    ('55555555-5555-5555-0006-000000000005', t_career),
    ('55555555-5555-5555-0006-000000000006', t_startup),
    ('55555555-5555-5555-0006-000000000006', t_marketing),
    ('55555555-5555-5555-0006-000000000007', t_startup),
    ('55555555-5555-5555-0006-000000000007', t_entrepreneurship),
    ('55555555-5555-5555-0006-000000000008', t_startup),
    ('55555555-5555-5555-0006-000000000008', t_entrepreneurship)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 7: Side Hustle Playbook for Students
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0007-000000000001', seed_uid, v7,
     'Upwork', 'https://www.upwork.com',
     'The world''s largest freelance marketplace. Students with writing, design, coding, or research skills can land paid gigs within days of creating a profile.',
     NOW()),
    ('55555555-5555-5555-0007-000000000002', seed_uid, v7,
     'Fiverr', 'https://www.fiverr.com',
     'Sell packaged services (gigs) starting at any price point. Perfect for students offering writing, graphic design, video editing, social media, or tutoring.',
     NOW()),
    ('55555555-5555-5555-0007-000000000003', seed_uid, v7,
     'Toptal', 'https://www.toptal.com',
     'Freelance network for the top 3% of talent in software, design, and finance. Rates are premium — worth applying after you have a strong portfolio.',
     NOW()),
    ('55555555-5555-5555-0007-000000000004', seed_uid, v7,
     'Bonsai — Freelance Contracts & Invoices', 'https://www.hellobonsai.com',
     'Free freelance contract templates, invoice generators, and project trackers. Look professional and protect yourself legally from your very first client.',
     NOW()),
    ('55555555-5555-5555-0007-000000000005', seed_uid, v7,
     'Wiza — Cold Outreach for Freelancers', 'https://wiza.co',
     'Find verified email addresses of potential clients on LinkedIn. Cold outreach done right is the fastest way to land freelance work without competing on platforms.',
     NOW()),
    ('55555555-5555-5555-0007-000000000006', seed_uid, v7,
     'Gumroad', 'https://gumroad.com',
     'Sell digital products — templates, guides, presets, courses, or code — directly to your audience. Zero upfront cost, takes a small percentage per sale.',
     NOW()),
    ('55555555-5555-5555-0007-000000000007', seed_uid, v7,
     'Substack', 'https://substack.com',
     'Launch a paid newsletter and get paid directly by subscribers. Students with a niche (finance, tech, wellness, satire) have built real income here.',
     NOW()),
    ('55555555-5555-5555-0007-000000000008', seed_uid, v7,
     'Lemon Squeezy', 'https://www.lemonsqueezy.com',
     'All-in-one platform for selling software, SaaS subscriptions, and digital products. Handles payments, tax compliance, and licensing automatically.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0007-000000000001', t_freelancing),
    ('55555555-5555-5555-0007-000000000001', t_side_hustle),
    ('55555555-5555-5555-0007-000000000002', t_freelancing),
    ('55555555-5555-5555-0007-000000000002', t_side_hustle),
    ('55555555-5555-5555-0007-000000000003', t_freelancing),
    ('55555555-5555-5555-0007-000000000003', t_career),
    ('55555555-5555-5555-0007-000000000004', t_freelancing),
    ('55555555-5555-5555-0007-000000000004', t_side_hustle),
    ('55555555-5555-5555-0007-000000000005', t_freelancing),
    ('55555555-5555-5555-0007-000000000005', t_marketing),
    ('55555555-5555-5555-0007-000000000006', t_side_hustle),
    ('55555555-5555-5555-0007-000000000006', t_money),
    ('55555555-5555-5555-0007-000000000007', t_side_hustle),
    ('55555555-5555-5555-0007-000000000007', t_money),
    ('55555555-5555-5555-0007-000000000008', t_side_hustle),
    ('55555555-5555-5555-0007-000000000008', t_money)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 8: Investing & Personal Finance Before You Graduate
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0008-000000000001', seed_uid, v8,
     'Investopedia', 'https://www.investopedia.com',
     'The most comprehensive free financial education site on the internet. Clear definitions, tutorials, and simulators for every personal finance and investing concept.',
     NOW()),
    ('55555555-5555-5555-0008-000000000002', seed_uid, v8,
     'Bogleheads'' Guide to Investing', 'https://www.bogleheads.org/wiki/Getting_started',
     'The simple, low-cost investing philosophy used by millions. Index funds, tax-advantaged accounts, and long-term thinking — everything you need, nothing you don''t.',
     NOW()),
    ('55555555-5555-5555-0008-000000000003', seed_uid, v8,
     'r/personalfinance — Prime Directive', 'https://www.reddit.com/r/personalfinance/wiki/commontopics',
     'The community-built flowchart for managing your money at every stage — from student loan debt to investing surplus income. One of the best free financial resources.',
     NOW()),
    ('55555555-5555-5555-0008-000000000004', seed_uid, v8,
     'Khan Academy — Personal Finance', 'https://www.khanacademy.org/college-careers-more/personal-finance',
     'Free, structured personal finance course covering taxes, retirement accounts, credit, insurance, and home buying. No prior knowledge needed.',
     NOW()),
    ('55555555-5555-5555-0008-000000000005', seed_uid, v8,
     'JL Collins — Stock Series', 'https://jlcollinsnh.com/stock-series',
     'The definitive plain-English guide to index fund investing. Collins''s blog series has convinced thousands to stop stock-picking and build real wealth instead.',
     NOW()),
    ('55555555-5555-5555-0008-000000000006', seed_uid, v8,
     'NerdWallet', 'https://www.nerdwallet.com',
     'Unbiased, ad-transparent comparisons of credit cards, bank accounts, brokerages, and student loan refinancing options. Find the best products for your situation.',
     NOW()),
    ('55555555-5555-5555-0008-000000000007', seed_uid, v8,
     'IRS Free File', 'https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free',
     'File your federal taxes for free if you earn under $79,000. Most students qualify — don''t pay TurboTax for something the government offers at no cost.',
     NOW()),
    ('55555555-5555-5555-0008-000000000008', seed_uid, v8,
     'Fidelity Youth Account', 'https://www.fidelity.com/go/youth-account/overview',
     'A free brokerage account for students 13–17, or use Fidelity''s standard zero-fee accounts as a young adult. The best platform for beginner investors.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0008-000000000001', t_investing),
    ('55555555-5555-5555-0008-000000000001', t_personal_finance),
    ('55555555-5555-5555-0008-000000000002', t_investing),
    ('55555555-5555-5555-0008-000000000002', t_personal_finance),
    ('55555555-5555-5555-0008-000000000003', t_personal_finance),
    ('55555555-5555-5555-0008-000000000003', t_money),
    ('55555555-5555-5555-0008-000000000004', t_personal_finance),
    ('55555555-5555-5555-0008-000000000004', t_free),
    ('55555555-5555-5555-0008-000000000005', t_investing),
    ('55555555-5555-5555-0008-000000000005', t_money),
    ('55555555-5555-5555-0008-000000000006', t_personal_finance),
    ('55555555-5555-5555-0008-000000000006', t_money),
    ('55555555-5555-5555-0008-000000000007', t_personal_finance),
    ('55555555-5555-5555-0008-000000000007', t_free),
    ('55555555-5555-5555-0008-000000000008', t_investing),
    ('55555555-5555-5555-0008-000000000008', t_free)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 9: Zero-Budget Growth Marketing
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0009-000000000001', seed_uid, v9,
     'Ahrefs Blog — SEO Learning Hub', 'https://ahrefs.com/blog',
     'The best free SEO education available. Covers keyword research, backlinks, technical SEO, and content strategy with real data-backed case studies.',
     NOW()),
    ('55555555-5555-5555-0009-000000000002', seed_uid, v9,
     'Mailchimp Free Plan', 'https://mailchimp.com/pricing',
     'Send up to 1,000 emails/month free. Email marketing consistently delivers the highest ROI of any marketing channel — start building your list now.',
     NOW()),
    ('55555555-5555-5555-0009-000000000003', seed_uid, v9,
     'Buffer Free Plan', 'https://buffer.com',
     'Schedule and publish social media posts across platforms from one dashboard. The free plan covers 3 channels and is more than enough for most students.',
     NOW()),
    ('55555555-5555-5555-0009-000000000004', seed_uid, v9,
     'Google Search Console', 'https://search.google.com/search-console',
     'Free tool from Google showing exactly how your site performs in search — which queries bring visitors, where you rank, and what to fix for more traffic.',
     NOW()),
    ('55555555-5555-5555-0009-000000000005', seed_uid, v9,
     'SparkToro — Audience Research', 'https://sparktoro.com',
     'Find out where your target audience spends time online — which podcasts they listen to, accounts they follow, and sites they visit. Free tier available.',
     NOW()),
    ('55555555-5555-5555-0009-000000000006', seed_uid, v9,
     'Beehiiv — Newsletter Growth Platform', 'https://www.beehiiv.com',
     'The fastest-growing newsletter platform with built-in referral programs, monetization, and analytics. Free up to 2,500 subscribers.',
     NOW()),
    ('55555555-5555-5555-0009-000000000007', seed_uid, v9,
     'GrowthHackers Community', 'https://growthhackers.com',
     'Community and case study library for growth marketers. Browse real experiments, channel breakdowns, and tactics used by fast-growing startups.',
     NOW()),
    ('55555555-5555-5555-0009-000000000008', seed_uid, v9,
     'Lenny''s Newsletter', 'https://www.lennysnewsletter.com',
     'Weekly deep-dives on product growth, retention, and marketing from Lenny Rachitsky (ex-Airbnb). The most influential product/growth newsletter in tech.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0009-000000000001', t_marketing),
    ('55555555-5555-5555-0009-000000000001', t_growth),
    ('55555555-5555-5555-0009-000000000002', t_marketing),
    ('55555555-5555-5555-0009-000000000002', t_growth),
    ('55555555-5555-5555-0009-000000000003', t_marketing),
    ('55555555-5555-5555-0009-000000000003', t_free),
    ('55555555-5555-5555-0009-000000000004', t_marketing),
    ('55555555-5555-5555-0009-000000000004', t_growth),
    ('55555555-5555-5555-0009-000000000005', t_marketing),
    ('55555555-5555-5555-0009-000000000005', t_growth),
    ('55555555-5555-5555-0009-000000000006', t_marketing),
    ('55555555-5555-5555-0009-000000000006', t_side_hustle),
    ('55555555-5555-5555-0009-000000000007', t_marketing),
    ('55555555-5555-5555-0009-000000000007', t_startup),
    ('55555555-5555-5555-0009-000000000008', t_marketing),
    ('55555555-5555-5555-0009-000000000008', t_growth)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 10: Entrepreneurship Essentials: Read What Founders Read
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('55555555-5555-5555-0010-000000000001', seed_uid, v10,
     'Y Combinator Library', 'https://www.ycombinator.com/library',
     'Curated essays, videos, and advice from YC partners and portfolio founders on every aspect of building a company — free and endlessly useful.',
     NOW()),
    ('55555555-5555-5555-0010-000000000002', seed_uid, v10,
     'Paul Graham Essays', 'http://paulgraham.com/articles.html',
     'If you read one thing about startups, make it this. PG''s essays on ideas, fundraising, hiring, and founder psychology are simply irreplaceable.',
     NOW()),
    ('55555555-5555-5555-0010-000000000003', seed_uid, v10,
     'Stratechery by Ben Thompson', 'https://stratechery.com',
     'The sharpest business strategy analysis in tech. Free Daily Update emails cover the biggest moves in tech and why they matter strategically.',
     NOW()),
    ('55555555-5555-5555-0010-000000000004', seed_uid, v10,
     'a16z Blog & Podcast', 'https://a16z.com/blog',
     'Essays and podcast episodes from one of Silicon Valley''s top VC firms. Exceptional for understanding market trends, technology waves, and company building.',
     NOW()),
    ('55555555-5555-5555-0010-000000000005', seed_uid, v10,
     'Harvard Business Review — Free Articles', 'https://hbr.org',
     'HBR publishes some articles free. Bookmark the management, strategy, and leadership pieces — the writing density per article is unmatched.',
     NOW()),
    ('55555555-5555-5555-0010-000000000006', seed_uid, v10,
     'The Knowledge Project (Shane Parrish)', 'https://fs.blog/knowledge-project-podcast',
     'Podcast and blog focused on mental models, decision-making, and learning from the world''s top performers. Essential thinking frameworks for founders.',
     NOW()),
    ('55555555-5555-5555-0010-000000000007', seed_uid, v10,
     'Acquired Podcast', 'https://www.acquired.fm',
     'Deep-dive company histories of Apple, NVIDIA, Berkshire Hathaway, and more. The best way to learn business strategy through real, fascinating stories.',
     NOW()),
    ('55555555-5555-5555-0010-000000000008', seed_uid, v10,
     'Not Boring by Packy McCormick', 'https://www.notboring.co',
     'Long-form analysis of the most interesting companies and ideas in tech and business. Free issues are exceptional — widely read by founders and investors alike.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('55555555-5555-5555-0010-000000000001', t_startup),
    ('55555555-5555-5555-0010-000000000001', t_entrepreneurship),
    ('55555555-5555-5555-0010-000000000002', t_entrepreneurship),
    ('55555555-5555-5555-0010-000000000002', t_reading),
    ('55555555-5555-5555-0010-000000000003', t_entrepreneurship),
    ('55555555-5555-5555-0010-000000000003', t_reading),
    ('55555555-5555-5555-0010-000000000004', t_startup),
    ('55555555-5555-5555-0010-000000000004', t_reading),
    ('55555555-5555-5555-0010-000000000005', t_entrepreneurship),
    ('55555555-5555-5555-0010-000000000005', t_reading),
    ('55555555-5555-5555-0010-000000000006', t_entrepreneurship),
    ('55555555-5555-5555-0010-000000000006', t_reading),
    ('55555555-5555-5555-0010-000000000007', t_entrepreneurship),
    ('55555555-5555-5555-0010-000000000007', t_reading),
    ('55555555-5555-5555-0010-000000000008', t_startup),
    ('55555555-5555-5555-0010-000000000008', t_reading)
  ON CONFLICT DO NOTHING;


  RAISE NOTICE 'AI & Business seed complete: 10 vaults, 80 entries, 20 tags inserted.';

END $$;
