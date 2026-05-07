-- =============================================================================
-- Vaulterly — Public Vault Seed Data
-- =============================================================================
-- Seeds 11 curated public vaults for the Explore page.
-- 11 vaults · 87 entries · 36 tags
--
-- BEFORE RUNNING:
--   1. Replace 'YOUR_ADMIN_USER_ID_HERE' with your actual Supabase auth user UUID.
--      Find it in: Supabase Dashboard → Authentication → Users
--   2. Run in the Supabase SQL Editor (or via psql).
--   3. This script is idempotent — safe to re-run (uses ON CONFLICT DO NOTHING).
-- =============================================================================

DO $$
DECLARE
  -- ⚠️  Replace with your real admin/seed user UUID from Supabase Auth
  seed_uid UUID := 'eb49d243-faee-4d36-b834-e74308e7ebac';

  -- -------------------------------------------------------------------------
  -- Vault IDs
  -- -------------------------------------------------------------------------
  v1  UUID := '11111111-1111-1111-1111-000000000001'; -- Ultimate Study Toolkit
  v2  UUID := '11111111-1111-1111-1111-000000000002'; -- Beat Procrastination
  v3  UUID := '11111111-1111-1111-1111-000000000003'; -- Free Textbooks & Papers
  v4  UUID := '11111111-1111-1111-1111-000000000004'; -- CS & Coding Bootcamp Essentials
  v5  UUID := '11111111-1111-1111-1111-000000000005'; -- Math From Zero to Calc
  v6  UUID := '11111111-1111-1111-1111-000000000006'; -- Pre-Med Reference Kit
  v7  UUID := '11111111-1111-1111-1111-000000000007'; -- Scholarship Hunter
  v8  UUID := '11111111-1111-1111-1111-000000000008'; -- Dorm Room on a Budget
  v9  UUID := '11111111-1111-1111-1111-000000000009'; -- Mental Health & Wellness
  v10 UUID := '11111111-1111-1111-1111-000000000010'; -- Internship & Job Hunt
  v11 UUID := '11111111-1111-1111-1111-000000000011'; -- Build Your Portfolio

  -- -------------------------------------------------------------------------
  -- Tag IDs
  -- -------------------------------------------------------------------------
  t_productivity  UUID := '33333333-3333-3333-3333-000000000001';
  t_study         UUID := '33333333-3333-3333-3333-000000000002';
  t_focus         UUID := '33333333-3333-3333-3333-000000000003';
  t_flashcards    UUID := '33333333-3333-3333-3333-000000000004';
  t_notes         UUID := '33333333-3333-3333-3333-000000000005';
  t_time_mgmt     UUID := '33333333-3333-3333-3333-000000000006';
  t_free          UUID := '33333333-3333-3333-3333-000000000007';
  t_apps          UUID := '33333333-3333-3333-3333-000000000008';
  t_coding        UUID := '33333333-3333-3333-3333-000000000009';
  t_programming   UUID := '33333333-3333-3333-3333-000000000010';
  t_webdev        UUID := '33333333-3333-3333-3333-000000000011';
  t_algorithms    UUID := '33333333-3333-3333-3333-000000000012';
  t_cs            UUID := '33333333-3333-3333-3333-000000000013';
  t_math          UUID := '33333333-3333-3333-3333-000000000014';
  t_calculus      UUID := '33333333-3333-3333-3333-000000000015';
  t_premed        UUID := '33333333-3333-3333-3333-000000000016';
  t_mcat          UUID := '33333333-3333-3333-3333-000000000017';
  t_anatomy       UUID := '33333333-3333-3333-3333-000000000018';
  t_medicine      UUID := '33333333-3333-3333-3333-000000000019';
  t_scholarships  UUID := '33333333-3333-3333-3333-000000000020';
  t_financial_aid UUID := '33333333-3333-3333-3333-000000000021';
  t_budget        UUID := '33333333-3333-3333-3333-000000000022';
  t_college_life  UUID := '33333333-3333-3333-3333-000000000023';
  t_mental_health UUID := '33333333-3333-3333-3333-000000000024';
  t_wellness      UUID := '33333333-3333-3333-3333-000000000025';
  t_meditation    UUID := '33333333-3333-3333-3333-000000000026';
  t_career        UUID := '33333333-3333-3333-3333-000000000027';
  t_jobs          UUID := '33333333-3333-3333-3333-000000000028';
  t_internships   UUID := '33333333-3333-3333-3333-000000000029';
  t_resume        UUID := '33333333-3333-3333-3333-000000000030';
  t_portfolio     UUID := '33333333-3333-3333-3333-000000000031';
  t_design        UUID := '33333333-3333-3333-3333-000000000032';
  t_github        UUID := '33333333-3333-3333-3333-000000000033';
  t_textbooks     UUID := '33333333-3333-3333-3333-000000000034';
  t_research      UUID := '33333333-3333-3333-3333-000000000035';
  t_habits        UUID := '33333333-3333-3333-3333-000000000036';

BEGIN

  -- ===========================================================================
  -- VAULTS
  -- ===========================================================================
  INSERT INTO vaults (id, user_id, name, title, description, category, is_public, created_at)
  VALUES
    (v1, seed_uid,
     'Ultimate Study Toolkit', 'Ultimate Study Toolkit',
     'The essential toolkit for serious students — flashcards, focus tools, time trackers, and systems proven to boost retention and output.',
     'Productivity', true, NOW() - INTERVAL '10 days'),

    (v2, seed_uid,
     'Beat Procrastination', 'Beat Procrastination',
     'Science-backed apps, blocking tools, and habit frameworks to help you stop delaying and start doing.',
     'Productivity', true, NOW() - INTERVAL '9 days'),

    (v3, seed_uid,
     'Free Textbooks & Papers', 'Free Textbooks & Papers',
     'Never pay for a textbook again. The best free, legal, and open-access libraries and academic paper resources for every subject.',
     'Resources', true, NOW() - INTERVAL '8 days'),

    (v4, seed_uid,
     'CS & Coding Bootcamp Essentials', 'CS & Coding Bootcamp Essentials',
     'Everything you need to go from zero to job-ready developer: free curricula, practice platforms, docs, and student perks.',
     'Computer Science', true, NOW() - INTERVAL '7 days'),

    (v5, seed_uid,
     'Math From Zero to Calc', 'Math From Zero to Calc',
     'Algebra to multivariable calculus — free courses, video series, graphing tools, and step-by-step solvers that actually explain the why.',
     'Mathematics', true, NOW() - INTERVAL '6 days'),

    (v6, seed_uid,
     'Pre-Med Reference Kit', 'Pre-Med Reference Kit',
     'Curated MCAT prep, anatomy atlases, Anki decks, and clinical references to get you from bio 101 to med school application.',
     'Medicine', true, NOW() - INTERVAL '5 days'),

    (v7, seed_uid,
     'Scholarship Hunter', 'Scholarship Hunter',
     'Find money you don''t have to pay back. The best scholarship databases, search engines, and strategies to fund your education.',
     'Financial Aid', true, NOW() - INTERVAL '4 days'),

    (v8, seed_uid,
     'Dorm Room on a Budget', 'Dorm Room on a Budget',
     'Budget apps, meal prep guides, thrift hacks, and student discounts to make college life affordable without sacrificing quality.',
     'College Life', true, NOW() - INTERVAL '3 days'),

    (v9, seed_uid,
     'Mental Health & Wellness for Students', 'Mental Health & Wellness for Students',
     'Meditation apps, crisis resources, affordable therapy options, and daily wellness tools built for the realities of student life.',
     'Wellness', true, NOW() - INTERVAL '2 days'),

    (v10, seed_uid,
     'Internship & Job Hunt', 'Internship & Job Hunt',
     'Land your first internship or full-time role: job boards, resume tools, salary research, and insider prep guides.',
     'Career', true, NOW() - INTERVAL '1 day'),

    (v11, seed_uid,
     'Build Your Portfolio (No Experience Needed)', 'Build Your Portfolio (No Experience Needed)',
     'Free tools and project ideas to build a portfolio that gets you hired — even if you''re starting from scratch.',
     'Career', true, NOW())

  ON CONFLICT (id) DO NOTHING;


  -- ===========================================================================
  -- TAGS
  -- ===========================================================================
  INSERT INTO tags (id, user_id, name)
  VALUES
    (t_productivity,  seed_uid, 'productivity'),
    (t_study,         seed_uid, 'study'),
    (t_focus,         seed_uid, 'focus'),
    (t_flashcards,    seed_uid, 'flashcards'),
    (t_notes,         seed_uid, 'notes'),
    (t_time_mgmt,     seed_uid, 'time-management'),
    (t_free,          seed_uid, 'free'),
    (t_apps,          seed_uid, 'apps'),
    (t_coding,        seed_uid, 'coding'),
    (t_programming,   seed_uid, 'programming'),
    (t_webdev,        seed_uid, 'web-dev'),
    (t_algorithms,    seed_uid, 'algorithms'),
    (t_cs,            seed_uid, 'cs'),
    (t_math,          seed_uid, 'math'),
    (t_calculus,      seed_uid, 'calculus'),
    (t_premed,        seed_uid, 'pre-med'),
    (t_mcat,          seed_uid, 'mcat'),
    (t_anatomy,       seed_uid, 'anatomy'),
    (t_medicine,      seed_uid, 'medicine'),
    (t_scholarships,  seed_uid, 'scholarships'),
    (t_financial_aid, seed_uid, 'financial-aid'),
    (t_budget,        seed_uid, 'budget'),
    (t_college_life,  seed_uid, 'college-life'),
    (t_mental_health, seed_uid, 'mental-health'),
    (t_wellness,      seed_uid, 'wellness'),
    (t_meditation,    seed_uid, 'meditation'),
    (t_career,        seed_uid, 'career'),
    (t_jobs,          seed_uid, 'jobs'),
    (t_internships,   seed_uid, 'internships'),
    (t_resume,        seed_uid, 'resume'),
    (t_portfolio,     seed_uid, 'portfolio'),
    (t_design,        seed_uid, 'design'),
    (t_github,        seed_uid, 'github'),
    (t_textbooks,     seed_uid, 'textbooks'),
    (t_research,      seed_uid, 'research'),
    (t_habits,        seed_uid, 'habits')
  ON CONFLICT (id) DO NOTHING;


  -- ===========================================================================
  -- VAULT 1: Ultimate Study Toolkit
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0001-000000000001', seed_uid, v1,
     'Anki', 'https://apps.ankiweb.net',
     'The gold standard in spaced repetition flashcards. Create decks for any subject and Anki schedules reviews to maximize long-term memory retention.',
     NOW()),
    ('22222222-2222-2222-0001-000000000002', seed_uid, v1,
     'Notion', 'https://notion.so',
     'All-in-one workspace for notes, databases, task lists, and wikis. Free for personal use with powerful templates built for students.',
     NOW()),
    ('22222222-2222-2222-0001-000000000003', seed_uid, v1,
     'Forest — Stay Focused', 'https://www.forestapp.cc',
     'Gamified Pomodoro timer that grows a virtual tree while you study. Leave your phone and watch your forest grow.',
     NOW()),
    ('22222222-2222-2222-0001-000000000004', seed_uid, v1,
     'Focusmate', 'https://focusmate.com',
     'Virtual co-working with a live accountability partner. Schedule 25- or 50-minute sessions and work alongside someone else in real time.',
     NOW()),
    ('22222222-2222-2222-0001-000000000005', seed_uid, v1,
     'Obsidian', 'https://obsidian.md',
     'Local-first, Markdown-based note-taking with bi-directional links — ideal for building a "second brain" that connects ideas across subjects.',
     NOW()),
    ('22222222-2222-2222-0001-000000000006', seed_uid, v1,
     'Toggl Track', 'https://toggl.com/track',
     'Simple, free time tracker. Run it while studying to see exactly where your hours go and identify patterns in your productivity.',
     NOW()),
    ('22222222-2222-2222-0001-000000000007', seed_uid, v1,
     'Raindrop.io', 'https://raindrop.io',
     'Beautiful bookmarking and resource organizer. Save articles, videos, and PDFs into organized collections with tags and full-text search.',
     NOW()),
    ('22222222-2222-2222-0001-000000000008', seed_uid, v1,
     'Spaced Repetition — SuperMemo Wiki', 'https://supermemo.guru/wiki/Spaced_repetition',
     'The definitive deep-dive into the science of spaced repetition — how it works, why it works, and how to use it most effectively.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0001-000000000001', t_flashcards),
    ('22222222-2222-2222-0001-000000000001', t_study),
    ('22222222-2222-2222-0001-000000000002', t_notes),
    ('22222222-2222-2222-0001-000000000002', t_productivity),
    ('22222222-2222-2222-0001-000000000003', t_focus),
    ('22222222-2222-2222-0001-000000000003', t_apps),
    ('22222222-2222-2222-0001-000000000004', t_focus),
    ('22222222-2222-2222-0001-000000000004', t_productivity),
    ('22222222-2222-2222-0001-000000000005', t_notes),
    ('22222222-2222-2222-0001-000000000005', t_productivity),
    ('22222222-2222-2222-0001-000000000006', t_time_mgmt),
    ('22222222-2222-2222-0001-000000000006', t_productivity),
    ('22222222-2222-2222-0001-000000000007', t_study),
    ('22222222-2222-2222-0001-000000000007', t_productivity),
    ('22222222-2222-2222-0001-000000000008', t_study),
    ('22222222-2222-2222-0001-000000000008', t_flashcards)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 2: Beat Procrastination
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0002-000000000001', seed_uid, v2,
     'Cold Turkey Blocker', 'https://getcoldturkey.com',
     'The most powerful website and app blocker available. Can be set to be completely unbypassable — even a restart won''t get around it.',
     NOW()),
    ('22222222-2222-2222-0002-000000000002', seed_uid, v2,
     'Freedom', 'https://freedom.to',
     'Block distracting sites and apps across all your devices simultaneously. Schedule recurring focus sessions in advance.',
     NOW()),
    ('22222222-2222-2222-0002-000000000003', seed_uid, v2,
     'Habitica', 'https://habitica.com',
     'Gamify your life — turn habits, daily tasks, and to-dos into an RPG adventure. Earn rewards for doing the things you keep avoiding.',
     NOW()),
    ('22222222-2222-2222-0002-000000000004', seed_uid, v2,
     'Structured — Daily Planner', 'https://structured.app',
     'Visual daily timeline planner that makes your schedule feel manageable. Drag and drop tasks into your day and see your time at a glance.',
     NOW()),
    ('22222222-2222-2222-0002-000000000005', seed_uid, v2,
     'Huberman Lab: Master Your Focus', 'https://www.hubermanlab.com/episode/using-science-to-optimize-sleep-learning-and-metabolism',
     'Andrew Huberman''s science-backed protocols for attention, motivation, and building deep focus habits. Free podcast episode.',
     NOW()),
    ('22222222-2222-2222-0002-000000000006', seed_uid, v2,
     'Atomic Habits — James Clear', 'https://jamesclear.com/atomic-habits',
     'The definitive guide to building good habits and breaking bad ones. Free chapter summaries and supporting articles on the site.',
     NOW()),
    ('22222222-2222-2222-0002-000000000007', seed_uid, v2,
     'Focusmate', 'https://focusmate.com',
     'Body doubling works. Show up, state your task, work silently alongside a real person. Free accountability that costs nothing.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0002-000000000001', t_focus),
    ('22222222-2222-2222-0002-000000000001', t_productivity),
    ('22222222-2222-2222-0002-000000000002', t_focus),
    ('22222222-2222-2222-0002-000000000002', t_apps),
    ('22222222-2222-2222-0002-000000000003', t_habits),
    ('22222222-2222-2222-0002-000000000003', t_apps),
    ('22222222-2222-2222-0002-000000000004', t_time_mgmt),
    ('22222222-2222-2222-0002-000000000004', t_productivity),
    ('22222222-2222-2222-0002-000000000005', t_focus),
    ('22222222-2222-2222-0002-000000000005', t_wellness),
    ('22222222-2222-2222-0002-000000000006', t_habits),
    ('22222222-2222-2222-0002-000000000006', t_productivity),
    ('22222222-2222-2222-0002-000000000007', t_focus),
    ('22222222-2222-2222-0002-000000000007', t_productivity)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 3: Free Textbooks & Papers
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0003-000000000001', seed_uid, v3,
     'OpenStax', 'https://openstax.org',
     'Peer-reviewed, openly licensed textbooks for college courses — completely free. Covers biology, chemistry, physics, economics, history, and more.',
     NOW()),
    ('22222222-2222-2222-0003-000000000002', seed_uid, v3,
     'MIT OpenCourseWare', 'https://ocw.mit.edu',
     'Free lecture notes, exams, problem sets, and videos from actual MIT courses. One of the best free educational resources in existence.',
     NOW()),
    ('22222222-2222-2222-0003-000000000003', seed_uid, v3,
     'Project Gutenberg', 'https://gutenberg.org',
     'Over 70,000 free eBooks — primarily classics and public domain works. Essential for lit courses, history, and philosophy.',
     NOW()),
    ('22222222-2222-2222-0003-000000000004', seed_uid, v3,
     'Google Scholar', 'https://scholar.google.com',
     'Search across academic papers, theses, books, and court opinions. Use the "Cited by" feature to trace research lineages.',
     NOW()),
    ('22222222-2222-2222-0003-000000000005', seed_uid, v3,
     'JSTOR Open Access', 'https://www.jstor.org/open',
     'Thousands of free academic articles, primary sources, and open books. No paywall for open-access content.',
     NOW()),
    ('22222222-2222-2222-0003-000000000006', seed_uid, v3,
     'Open Library', 'https://openlibrary.org',
     'Borrow digital books for free from the Internet Archive. Huge selection spanning millions of titles — check here before buying.',
     NOW()),
    ('22222222-2222-2222-0003-000000000007', seed_uid, v3,
     'Anna''s Archive', 'https://annas-archive.org',
     'The world''s largest open-access library search engine. Searches across multiple repositories to find free versions of books and papers.',
     NOW()),
    ('22222222-2222-2222-0003-000000000008', seed_uid, v3,
     'Unpaywall', 'https://unpaywall.org',
     'Browser extension that automatically finds free, legal versions of research papers as you browse. Works seamlessly with Google Scholar.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0003-000000000001', t_textbooks),
    ('22222222-2222-2222-0003-000000000001', t_free),
    ('22222222-2222-2222-0003-000000000002', t_free),
    ('22222222-2222-2222-0003-000000000002', t_study),
    ('22222222-2222-2222-0003-000000000003', t_textbooks),
    ('22222222-2222-2222-0003-000000000003', t_free),
    ('22222222-2222-2222-0003-000000000004', t_research),
    ('22222222-2222-2222-0003-000000000004', t_study),
    ('22222222-2222-2222-0003-000000000005', t_research),
    ('22222222-2222-2222-0003-000000000005', t_free),
    ('22222222-2222-2222-0003-000000000006', t_textbooks),
    ('22222222-2222-2222-0003-000000000006', t_free),
    ('22222222-2222-2222-0003-000000000007', t_textbooks),
    ('22222222-2222-2222-0003-000000000007', t_research),
    ('22222222-2222-2222-0003-000000000008', t_research),
    ('22222222-2222-2222-0003-000000000008', t_free)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 4: CS & Coding Bootcamp Essentials
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0004-000000000001', seed_uid, v4,
     'The Odin Project', 'https://www.theodinproject.com',
     'Free, open-source full-stack web development curriculum. Structured path from HTML/CSS to React and Node.js with real projects.',
     NOW()),
    ('22222222-2222-2222-0004-000000000002', seed_uid, v4,
     'freeCodeCamp', 'https://www.freecodecamp.org',
     '3,000 hours of free coding curriculum with earn-able certifications. Covers responsive web design, JavaScript, Python, data structures, and more.',
     NOW()),
    ('22222222-2222-2222-0004-000000000003', seed_uid, v4,
     'CS50 by Harvard (Free)', 'https://cs50.harvard.edu/x',
     'Harvard''s legendary intro to Computer Science — completely free. Covers C, Python, SQL, web development, and problem-solving fundamentals.',
     NOW()),
    ('22222222-2222-2222-0004-000000000004', seed_uid, v4,
     'LeetCode', 'https://leetcode.com',
     'Practice the coding interview problems used by Google, Amazon, Meta, and more. Start with Easy problems and work your way up.',
     NOW()),
    ('22222222-2222-2222-0004-000000000005', seed_uid, v4,
     'GitHub Student Developer Pack', 'https://education.github.com/pack',
     'Free access to 100+ developer tools including GitHub Copilot, cloud credits, domains, and more — for students with a school email.',
     NOW()),
    ('22222222-2222-2222-0004-000000000006', seed_uid, v4,
     'The Missing Semester (MIT)', 'https://missing.csail.mit.edu',
     'The shell, Git, Vim, debugging, profiling — the practical tools CS programs skip. Essential for any serious developer.',
     NOW()),
    ('22222222-2222-2222-0004-000000000007', seed_uid, v4,
     'MDN Web Docs', 'https://developer.mozilla.org',
     'The definitive reference for HTML, CSS, and JavaScript. Bookmark this over W3Schools — it''s more accurate and more complete.',
     NOW()),
    ('22222222-2222-2222-0004-000000000008', seed_uid, v4,
     'roadmap.sh', 'https://roadmap.sh',
     'Community-driven visual roadmaps for frontend, backend, DevOps, and more. Know exactly what to learn next and in what order.',
     NOW()),
    ('22222222-2222-2222-0004-000000000009', seed_uid, v4,
     'Exercism', 'https://exercism.org',
     'Practice coding in 70+ languages with exercises and optional mentored feedback. Great for learning new languages or sharpening old ones.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0004-000000000001', t_webdev),
    ('22222222-2222-2222-0004-000000000001', t_free),
    ('22222222-2222-2222-0004-000000000002', t_coding),
    ('22222222-2222-2222-0004-000000000002', t_free),
    ('22222222-2222-2222-0004-000000000003', t_cs),
    ('22222222-2222-2222-0004-000000000003', t_free),
    ('22222222-2222-2222-0004-000000000004', t_algorithms),
    ('22222222-2222-2222-0004-000000000004', t_coding),
    ('22222222-2222-2222-0004-000000000005', t_free),
    ('22222222-2222-2222-0004-000000000005', t_github),
    ('22222222-2222-2222-0004-000000000006', t_cs),
    ('22222222-2222-2222-0004-000000000006', t_programming),
    ('22222222-2222-2222-0004-000000000007', t_webdev),
    ('22222222-2222-2222-0004-000000000007', t_coding),
    ('22222222-2222-2222-0004-000000000008', t_cs),
    ('22222222-2222-2222-0004-000000000008', t_career),
    ('22222222-2222-2222-0004-000000000009', t_coding),
    ('22222222-2222-2222-0004-000000000009', t_programming)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 5: Math From Zero to Calc
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0005-000000000001', seed_uid, v5,
     'Khan Academy — Math', 'https://www.khanacademy.org/math',
     'Free, self-paced math courses from basic arithmetic through multivariable calculus, linear algebra, and differential equations.',
     NOW()),
    ('22222222-2222-2222-0005-000000000002', seed_uid, v5,
     '3Blue1Brown', 'https://www.3blue1brown.com',
     'Visual, intuitive explanations of calculus, linear algebra, neural networks, and more. Watch the "Essence of Calculus" series first.',
     NOW()),
    ('22222222-2222-2222-0005-000000000003', seed_uid, v5,
     'Paul''s Online Math Notes', 'https://tutorial.math.lamar.edu',
     'Legendary free notes for Algebra, Calc I, Calc II, Calc III, and Differential Equations. Often clearer than the assigned textbook.',
     NOW()),
    ('22222222-2222-2222-0005-000000000004', seed_uid, v5,
     'Desmos Graphing Calculator', 'https://www.desmos.com/calculator',
     'The best free graphing calculator on the web. Visualize functions, explore transformations, and check your work instantly.',
     NOW()),
    ('22222222-2222-2222-0005-000000000005', seed_uid, v5,
     'Wolfram Alpha', 'https://www.wolframalpha.com',
     'Step-by-step solutions to math problems — not just the answer but the full working. Essential for checking work and learning methods.',
     NOW()),
    ('22222222-2222-2222-0005-000000000006', seed_uid, v5,
     'Professor Leonard (YouTube)', 'https://www.youtube.com/@ProfessorLeonard',
     'Full university-level math lecture series on YouTube: Precalculus, Calc I/II/III, Statistics, Differential Equations. Best free professor online.',
     NOW()),
    ('22222222-2222-2222-0005-000000000007', seed_uid, v5,
     'MIT OCW — Mathematics', 'https://ocw.mit.edu/search/?d=Mathematics',
     'MIT''s full math course catalog with lecture notes, assignments, and exams. Especially strong for linear algebra and real analysis.',
     NOW()),
    ('22222222-2222-2222-0005-000000000008', seed_uid, v5,
     'PatrickJMT', 'https://patrickjmt.com',
     'Thousands of short, focused math tutorial videos organized by topic. Perfect for quickly understanding a concept before a test.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0005-000000000001', t_math),
    ('22222222-2222-2222-0005-000000000001', t_free),
    ('22222222-2222-2222-0005-000000000002', t_math),
    ('22222222-2222-2222-0005-000000000002', t_calculus),
    ('22222222-2222-2222-0005-000000000003', t_math),
    ('22222222-2222-2222-0005-000000000003', t_calculus),
    ('22222222-2222-2222-0005-000000000004', t_math),
    ('22222222-2222-2222-0005-000000000004', t_free),
    ('22222222-2222-2222-0005-000000000005', t_math),
    ('22222222-2222-2222-0005-000000000005', t_study),
    ('22222222-2222-2222-0005-000000000006', t_math),
    ('22222222-2222-2222-0005-000000000006', t_calculus),
    ('22222222-2222-2222-0005-000000000007', t_math),
    ('22222222-2222-2222-0005-000000000007', t_free),
    ('22222222-2222-2222-0005-000000000008', t_math),
    ('22222222-2222-2222-0005-000000000008', t_study)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 6: Pre-Med Reference Kit
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0006-000000000001', seed_uid, v6,
     'Osmosis', 'https://www.osmosis.org',
     'Video-based medical education covering every organ system, disease, and pharmacology topic. Free tier available with excellent content.',
     NOW()),
    ('22222222-2222-2222-0006-000000000002', seed_uid, v6,
     'AMBOSS (Free Tier)', 'https://www.amboss.com',
     'Medical knowledge library with USMLE-style questions and detailed explanations. The free tier provides meaningful access to clinical content.',
     NOW()),
    ('22222222-2222-2222-0006-000000000003', seed_uid, v6,
     'AnkiHub — Medical Decks', 'https://www.ankihub.net',
     'Community-maintained, continuously updated Anki decks for USMLE Step 1 and Step 2. The AnKing deck is the gold standard for Step prep.',
     NOW()),
    ('22222222-2222-2222-0006-000000000004', seed_uid, v6,
     'Khan Academy — MCAT Prep', 'https://www.khanacademy.org/test-prep/mcat',
     'Complete, free MCAT prep from Khan Academy covering all four sections: B/B, C/P, CARS, and P/S. Made in partnership with AAMC.',
     NOW()),
    ('22222222-2222-2222-0006-000000000005', seed_uid, v6,
     'TeachMeAnatomy', 'https://teachmeanatomy.info',
     'Comprehensive, clearly written anatomy notes with clinical relevance highlighted. Covers every body system with diagrams.',
     NOW()),
    ('22222222-2222-2222-0006-000000000006', seed_uid, v6,
     'PubMed', 'https://pubmed.ncbi.nlm.nih.gov',
     'Free access to over 35 million biomedical literature citations and abstracts. The primary database for medical research.',
     NOW()),
    ('22222222-2222-2222-0006-000000000007', seed_uid, v6,
     'Medscape Reference', 'https://reference.medscape.com',
     'Free clinical reference tool: drug database, disease overviews, and treatment guidelines. Invaluable for clinical rotations.',
     NOW()),
    ('22222222-2222-2222-0006-000000000008', seed_uid, v6,
     'AAMC Official MCAT Resources', 'https://students-residents.aamc.org/prepare-mcat-exam/prepare-mcat-exam',
     'The official MCAT prep materials from the AAMC — the only source that knows exactly what''s on the exam. Start here for practice tests.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0006-000000000001', t_medicine),
    ('22222222-2222-2222-0006-000000000001', t_premed),
    ('22222222-2222-2222-0006-000000000002', t_mcat),
    ('22222222-2222-2222-0006-000000000002', t_medicine),
    ('22222222-2222-2222-0006-000000000003', t_flashcards),
    ('22222222-2222-2222-0006-000000000003', t_mcat),
    ('22222222-2222-2222-0006-000000000004', t_mcat),
    ('22222222-2222-2222-0006-000000000004', t_free),
    ('22222222-2222-2222-0006-000000000005', t_anatomy),
    ('22222222-2222-2222-0006-000000000005', t_premed),
    ('22222222-2222-2222-0006-000000000006', t_research),
    ('22222222-2222-2222-0006-000000000006', t_medicine),
    ('22222222-2222-2222-0006-000000000007', t_medicine),
    ('22222222-2222-2222-0006-000000000007', t_premed),
    ('22222222-2222-2222-0006-000000000008', t_mcat),
    ('22222222-2222-2222-0006-000000000008', t_premed)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 7: Scholarship Hunter
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0007-000000000001', seed_uid, v7,
     'Fastweb', 'https://www.fastweb.com',
     'The largest free scholarship search engine with 1.5M+ scholarships. Create a profile and get matched to relevant opportunities.',
     NOW()),
    ('22222222-2222-2222-0007-000000000002', seed_uid, v7,
     'Bold.org', 'https://bold.org',
     'Scholarships with fewer applicants than the major platforms. Great for niche awards including identity-based and interest-specific scholarships.',
     NOW()),
    ('22222222-2222-2222-0007-000000000003', seed_uid, v7,
     'College Board Scholarship Search', 'https://bigfuture.collegeboard.org/scholarship-search',
     'Comprehensive scholarship database from the makers of the SAT. Filter by state, year, major, and eligibility criteria.',
     NOW()),
    ('22222222-2222-2222-0007-000000000004', seed_uid, v7,
     'Going Merry', 'https://www.goingmerry.com',
     'Apply to multiple scholarships using one shared application. Streamlines essay and document submission significantly.',
     NOW()),
    ('22222222-2222-2222-0007-000000000005', seed_uid, v7,
     'Scholarships.com', 'https://www.scholarships.com',
     'Matches students to scholarships from a database totaling billions in available aid. Includes local, national, and niche awards.',
     NOW()),
    ('22222222-2222-2222-0007-000000000006', seed_uid, v7,
     'Community Foundation Locator (COF)', 'https://www.cof.org/page/community-foundation-locator',
     'Find local community foundations in your area — they often fund less-competitive local scholarships that go unclaimed every year.',
     NOW()),
    ('22222222-2222-2222-0007-000000000007', seed_uid, v7,
     'Federal Student Aid (FAFSA)', 'https://studentaid.gov/h/apply-for-aid/fafsa',
     'The gateway to all federal grants and subsidized loans. File as early as possible — many aid programs are first-come, first-served.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0007-000000000001', t_scholarships),
    ('22222222-2222-2222-0007-000000000001', t_free),
    ('22222222-2222-2222-0007-000000000002', t_scholarships),
    ('22222222-2222-2222-0007-000000000002', t_financial_aid),
    ('22222222-2222-2222-0007-000000000003', t_scholarships),
    ('22222222-2222-2222-0007-000000000003', t_financial_aid),
    ('22222222-2222-2222-0007-000000000004', t_scholarships),
    ('22222222-2222-2222-0007-000000000004', t_financial_aid),
    ('22222222-2222-2222-0007-000000000005', t_scholarships),
    ('22222222-2222-2222-0007-000000000005', t_financial_aid),
    ('22222222-2222-2222-0007-000000000006', t_scholarships),
    ('22222222-2222-2222-0007-000000000006', t_financial_aid),
    ('22222222-2222-2222-0007-000000000007', t_financial_aid),
    ('22222222-2222-2222-0007-000000000007', t_free)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 8: Dorm Room on a Budget
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0008-000000000001', seed_uid, v8,
     'YNAB — Free for College Students', 'https://www.ynab.com/college',
     'The best budgeting app, free for one year with a .edu email. YNAB''s zero-based budgeting method is genuinely life-changing for tight budgets.',
     NOW()),
    ('22222222-2222-2222-0008-000000000002', seed_uid, v8,
     'Budget Bytes', 'https://www.budgetbytes.com',
     'Incredible meal prep recipes designed for tight budgets, with per-serving cost breakdowns. Proof that eating well doesn''t require spending much.',
     NOW()),
    ('22222222-2222-2222-0008-000000000003', seed_uid, v8,
     'Amazon Student (Prime)', 'https://www.amazon.com/joinstudent',
     'Six months of Amazon Prime free for students with a .edu email, then 50% off. Free shipping, Prime Video, Prime Music, and more.',
     NOW()),
    ('22222222-2222-2222-0008-000000000004', seed_uid, v8,
     'Splitwise', 'https://www.splitwise.com',
     'Track shared expenses with roommates fairly and transparently. No more awkward "you owe me" conversations — Splitwise handles the math.',
     NOW()),
    ('22222222-2222-2222-0008-000000000005', seed_uid, v8,
     'Student Beans', 'https://www.studentbeans.com',
     'Verified student discount platform with hundreds of offers on clothing, tech, food, and subscriptions. Verify your student status once, use everywhere.',
     NOW()),
    ('22222222-2222-2222-0008-000000000006', seed_uid, v8,
     'Goodwill & Thrift Store Guide', 'https://www.goodwill.org',
     'Thrift stores near campus are goldmines for dorm essentials — lamps, frames, storage, cookware — for a fraction of retail prices.',
     NOW()),
    ('22222222-2222-2222-0008-000000000007', seed_uid, v8,
     'Honey / Capital One Shopping', 'https://www.joinhoney.com',
     'Browser extension that automatically tests every coupon code at checkout. Saves real money on textbooks, supplies, and everyday purchases.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0008-000000000001', t_budget),
    ('22222222-2222-2222-0008-000000000001', t_apps),
    ('22222222-2222-2222-0008-000000000002', t_budget),
    ('22222222-2222-2222-0008-000000000002', t_college_life),
    ('22222222-2222-2222-0008-000000000003', t_budget),
    ('22222222-2222-2222-0008-000000000003', t_free),
    ('22222222-2222-2222-0008-000000000004', t_budget),
    ('22222222-2222-2222-0008-000000000004', t_college_life),
    ('22222222-2222-2222-0008-000000000005', t_budget),
    ('22222222-2222-2222-0008-000000000005', t_college_life),
    ('22222222-2222-2222-0008-000000000006', t_budget),
    ('22222222-2222-2222-0008-000000000006', t_college_life),
    ('22222222-2222-2222-0008-000000000007', t_budget),
    ('22222222-2222-2222-0008-000000000007', t_apps)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 9: Mental Health & Wellness for Students
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0009-000000000001', seed_uid, v9,
     'Headspace (Student Plan)', 'https://www.headspace.com/studentplan',
     'Guided meditation and mindfulness app with a deeply discounted student plan. Includes sleep sounds, focus music, and stress courses.',
     NOW()),
    ('22222222-2222-2222-0009-000000000002', seed_uid, v9,
     'Calm', 'https://www.calm.com',
     'Sleep stories, breathing exercises, masterclasses, and daily meditations. One of the most polished mental wellness apps available.',
     NOW()),
    ('22222222-2222-2222-0009-000000000003', seed_uid, v9,
     'Crisis Text Line', 'https://www.crisistextline.org',
     'Text HOME to 741741 for free, 24/7, confidential support from a trained crisis counselor. Available in the US, UK, Canada, and Ireland.',
     NOW()),
    ('22222222-2222-2222-0009-000000000004', seed_uid, v9,
     '988 Suicide & Crisis Lifeline', 'https://988lifeline.org',
     'Call or text 988 anytime for free, confidential mental health crisis support in the US. Available 24/7 in English and Spanish.',
     NOW()),
    ('22222222-2222-2222-0009-000000000005', seed_uid, v9,
     'Open Path Collective', 'https://openpathcollective.org',
     'Affordable therapy sessions ($30–$80 per session) for individuals in financial need, including students. Real licensed therapists.',
     NOW()),
    ('22222222-2222-2222-0009-000000000006', seed_uid, v9,
     'Insight Timer', 'https://insighttimer.com',
     'The world''s largest free library of guided meditations — over 150,000 tracks from thousands of teachers. No subscription required.',
     NOW()),
    ('22222222-2222-2222-0009-000000000007', seed_uid, v9,
     'Woebot Health', 'https://woebothealth.com',
     'AI mental health companion that uses evidence-based cognitive behavioral therapy techniques. Available anytime, free to start.',
     NOW()),
    ('22222222-2222-2222-0009-000000000008', seed_uid, v9,
     'University Counseling Center Finder', 'https://www.counseling.org/knowledge-center/find-a-counselor',
     'Find mental health counseling resources at your university or in your area. Most college counseling centers offer free sessions to enrolled students.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0009-000000000001', t_mental_health),
    ('22222222-2222-2222-0009-000000000001', t_meditation),
    ('22222222-2222-2222-0009-000000000002', t_mental_health),
    ('22222222-2222-2222-0009-000000000002', t_wellness),
    ('22222222-2222-2222-0009-000000000003', t_mental_health),
    ('22222222-2222-2222-0009-000000000003', t_wellness),
    ('22222222-2222-2222-0009-000000000004', t_mental_health),
    ('22222222-2222-2222-0009-000000000004', t_wellness),
    ('22222222-2222-2222-0009-000000000005', t_mental_health),
    ('22222222-2222-2222-0009-000000000005', t_wellness),
    ('22222222-2222-2222-0009-000000000006', t_meditation),
    ('22222222-2222-2222-0009-000000000006', t_free),
    ('22222222-2222-2222-0009-000000000007', t_mental_health),
    ('22222222-2222-2222-0009-000000000007', t_apps),
    ('22222222-2222-2222-0009-000000000008', t_mental_health),
    ('22222222-2222-2222-0009-000000000008', t_college_life)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 10: Internship & Job Hunt
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0010-000000000001', seed_uid, v10,
     'Handshake', 'https://joinhandshake.com',
     'The #1 platform for college students to find internships and entry-level jobs. Employers actively recruit here specifically for students.',
     NOW()),
    ('22222222-2222-2222-0010-000000000002', seed_uid, v10,
     'Glassdoor', 'https://www.glassdoor.com',
     'Research company salaries, interview questions, and culture reviews from real employees before you apply or accept an offer.',
     NOW()),
    ('22222222-2222-2222-0010-000000000003', seed_uid, v10,
     'Levels.fyi', 'https://www.levels.fyi',
     'Transparent, crowdsourced compensation data for tech roles by company, level, and location. Know your worth before negotiating.',
     NOW()),
    ('22222222-2222-2222-0010-000000000004', seed_uid, v10,
     'Resume Worded', 'https://resumeworded.com',
     'AI-powered resume and LinkedIn profile grader. Instant, specific feedback on what to fix to get past applicant tracking systems.',
     NOW()),
    ('22222222-2222-2222-0010-000000000005', seed_uid, v10,
     'Forage Virtual Internships', 'https://www.theforage.com',
     'Free virtual work experience programs from top companies including Goldman Sachs, JPMorgan, BCG, and more. Great for the resume.',
     NOW()),
    ('22222222-2222-2222-0010-000000000006', seed_uid, v10,
     'Huntr Job Tracker', 'https://huntr.co',
     'Kanban-style board for organizing your job applications. Track status, deadlines, contacts, and notes for every role you''re pursuing.',
     NOW()),
    ('22222222-2222-2222-0010-000000000007', seed_uid, v10,
     'Big Interview', 'https://biginterview.com',
     'Practice answering interview questions with AI feedback. Covers behavioral, technical, and case interview formats.',
     NOW()),
    ('22222222-2222-2222-0010-000000000008', seed_uid, v10,
     'LinkedIn for Students', 'https://university.linkedin.com',
     'Free LinkedIn Learning access with a .edu email, career explorer tools, and alumni network features. Build your profile before you need it.',
     NOW()),
    ('22222222-2222-2222-0010-000000000009', seed_uid, v10,
     'Team Blind', 'https://www.teamblind.com',
     'Anonymous professional forum with candid discussion about company culture, salaries, interview processes, and career strategies at specific firms.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0010-000000000001', t_internships),
    ('22222222-2222-2222-0010-000000000001', t_jobs),
    ('22222222-2222-2222-0010-000000000002', t_career),
    ('22222222-2222-2222-0010-000000000002', t_jobs),
    ('22222222-2222-2222-0010-000000000003', t_career),
    ('22222222-2222-2222-0010-000000000003', t_jobs),
    ('22222222-2222-2222-0010-000000000004', t_resume),
    ('22222222-2222-2222-0010-000000000004', t_career),
    ('22222222-2222-2222-0010-000000000005', t_internships),
    ('22222222-2222-2222-0010-000000000005', t_free),
    ('22222222-2222-2222-0010-000000000006', t_career),
    ('22222222-2222-2222-0010-000000000006', t_jobs),
    ('22222222-2222-2222-0010-000000000007', t_career),
    ('22222222-2222-2222-0010-000000000007', t_internships),
    ('22222222-2222-2222-0010-000000000008', t_career),
    ('22222222-2222-2222-0010-000000000008', t_resume),
    ('22222222-2222-2222-0010-000000000009', t_career),
    ('22222222-2222-2222-0010-000000000009', t_jobs)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 11: Build Your Portfolio (No Experience Needed)
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('22222222-2222-2222-0011-000000000001', seed_uid, v11,
     'GitHub Pages', 'https://pages.github.com',
     'Host your portfolio website for free directly from a GitHub repository. Custom domain support included. Perfect for developer portfolios.',
     NOW()),
    ('22222222-2222-2222-0011-000000000002', seed_uid, v11,
     'Netlify', 'https://www.netlify.com',
     'Deploy your portfolio in seconds with free hosting, HTTPS, and a custom domain. Easier than GitHub Pages for non-developers.',
     NOW()),
    ('22222222-2222-2222-0011-000000000003', seed_uid, v11,
     'Canva', 'https://www.canva.com',
     'Free drag-and-drop design tool for portfolio graphics, case study decks, and presentation slides. No design experience needed.',
     NOW()),
    ('22222222-2222-2222-0011-000000000004', seed_uid, v11,
     'Behance', 'https://www.behance.net',
     'Portfolio platform for creative professionals: design, photography, motion, illustration. Employers actively browse Behance to find talent.',
     NOW()),
    ('22222222-2222-2222-0011-000000000005', seed_uid, v11,
     'Figma (Free for Students)', 'https://www.figma.com/education',
     'Industry-standard UI/UX design tool, free for students with a .edu email. Essential for design portfolios and product roles.',
     NOW()),
    ('22222222-2222-2222-0011-000000000006', seed_uid, v11,
     'Project Ideas for Beginners (GitHub)', 'https://github.com/karan/Projects',
     '500+ beginner-friendly project ideas across languages and domains. Browse for inspiration and build something you can actually show off.',
     NOW()),
    ('22222222-2222-2222-0011-000000000007', seed_uid, v11,
     'Read.cv', 'https://read.cv',
     'Minimal, elegant CV and portfolio builder popular with designers and developers. Looks more intentional than a standard LinkedIn profile.',
     NOW()),
    ('22222222-2222-2222-0011-000000000008', seed_uid, v11,
     'Frontend Mentor', 'https://www.frontendmentor.io',
     'Real-world frontend challenges with professional designs provided. Complete them, add them to your portfolio, and get peer code reviews.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('22222222-2222-2222-0011-000000000001', t_portfolio),
    ('22222222-2222-2222-0011-000000000001', t_github),
    ('22222222-2222-2222-0011-000000000002', t_portfolio),
    ('22222222-2222-2222-0011-000000000002', t_webdev),
    ('22222222-2222-2222-0011-000000000003', t_design),
    ('22222222-2222-2222-0011-000000000003', t_portfolio),
    ('22222222-2222-2222-0011-000000000004', t_design),
    ('22222222-2222-2222-0011-000000000004', t_portfolio),
    ('22222222-2222-2222-0011-000000000005', t_design),
    ('22222222-2222-2222-0011-000000000005', t_free),
    ('22222222-2222-2222-0011-000000000006', t_coding),
    ('22222222-2222-2222-0011-000000000006', t_portfolio),
    ('22222222-2222-2222-0011-000000000007', t_portfolio),
    ('22222222-2222-2222-0011-000000000007', t_career),
    ('22222222-2222-2222-0011-000000000008', t_webdev),
    ('22222222-2222-2222-0011-000000000008', t_portfolio)
  ON CONFLICT DO NOTHING;


  RAISE NOTICE 'Vaulterly seed complete: 11 vaults, 87 entries, 36 tags inserted.';

END $$;
