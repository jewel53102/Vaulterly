-- =============================================================================
-- Vaulterly — Additional Vault Seed Data
-- =============================================================================
-- 9 vaults · 72 entries · 17 new tags
-- User: eb49d243-faee-4d36-b834-e74308e7ebac
--
-- Covers: No-Code, Content Creation, Data Science, Design,
--         Pre-Law, Economics, Academic Writing, Study Abroad, Fitness
--
-- Idempotent — safe to re-run (ON CONFLICT DO NOTHING throughout).
-- =============================================================================

DO $$
DECLARE
  seed_uid UUID := 'eb49d243-faee-4d36-b834-e74308e7ebac';

  -- -------------------------------------------------------------------------
  -- Vault IDs
  -- -------------------------------------------------------------------------
  v1  UUID := '77777777-7777-7777-7777-000000000001'; -- No-Code & Build Without Code
  v2  UUID := '77777777-7777-7777-7777-000000000002'; -- Content Creation & Monetization
  v3  UUID := '77777777-7777-7777-7777-000000000003'; -- Data Science & Analytics
  v4  UUID := '77777777-7777-7777-7777-000000000004'; -- Design for Non-Designers
  v5  UUID := '77777777-7777-7777-7777-000000000005'; -- Pre-Law & LSAT Prep
  v6  UUID := '77777777-7777-7777-7777-000000000006'; -- Economics & Finance Fundamentals
  v7  UUID := '77777777-7777-7777-7777-000000000007'; -- Academic Writing & Research Skills
  v8  UUID := '77777777-7777-7777-7777-000000000008'; -- Study Abroad & Travel Hacking
  v9  UUID := '77777777-7777-7777-7777-000000000009'; -- Fitness & Nutrition on a Student Budget

  -- -------------------------------------------------------------------------
  -- Tag IDs — new tags only; existing ones re-fetched below
  -- -------------------------------------------------------------------------
  t_no_code         UUID := '99999999-9999-9999-9999-000000000001';
  t_content         UUID := '99999999-9999-9999-9999-000000000002';
  t_video           UUID := '99999999-9999-9999-9999-000000000003';
  t_analytics       UUID := '99999999-9999-9999-9999-000000000004';
  t_sql             UUID := '99999999-9999-9999-9999-000000000005';
  t_design          UUID := '99999999-9999-9999-9999-000000000006';
  t_ui_ux           UUID := '99999999-9999-9999-9999-000000000007';
  t_law             UUID := '99999999-9999-9999-9999-000000000008';
  t_lsat            UUID := '99999999-9999-9999-9999-000000000009';
  t_economics       UUID := '99999999-9999-9999-9999-000000000010';
  t_finance         UUID := '99999999-9999-9999-9999-000000000011';
  t_writing         UUID := '99999999-9999-9999-9999-000000000012';
  t_research        UUID := '99999999-9999-9999-9999-000000000013';
  t_travel          UUID := '99999999-9999-9999-9999-000000000014';
  t_study_abroad    UUID := '99999999-9999-9999-9999-000000000015';
  t_fitness         UUID := '99999999-9999-9999-9999-000000000016';
  t_nutrition       UUID := '99999999-9999-9999-9999-000000000017';

  -- Re-used tags from previous seed files (fetched after insert block)
  t_free            UUID;
  t_tools           UUID;
  t_building        UUID;
  t_money           UUID;
  t_wellness        UUID;
  t_career          UUID;
  t_productivity    UUID;
  t_data_science    UUID;
  t_startup         UUID;

BEGIN

  -- ===========================================================================
  -- VAULTS
  -- ===========================================================================
  INSERT INTO vaults (id, user_id, name, title, description, category, is_public, created_at)
  VALUES
    (v1, seed_uid,
     'No-Code & Build Without Code',
     'No-Code & Build Without Code',
     'Build real products, automations, and businesses without writing a single line of code. The tools used by the fastest no-code founders and solopreneurs.',
     'Technology', true, NOW() - INTERVAL '9 days'),

    (v2, seed_uid,
     'Content Creation & Monetization',
     'Content Creation & Monetization',
     'Turn your knowledge, creativity, or personality into income. The exact tools and platforms top student creators use to build audiences and get paid.',
     'Creative', true, NOW() - INTERVAL '8 days'),

    (v3, seed_uid,
     'Data Science & Analytics',
     'Data Science & Analytics',
     'SQL, Python, dashboards, and data storytelling — the skills behind the most in-demand entry-level jobs of the decade. Start here, land anywhere.',
     'Data Science', true, NOW() - INTERVAL '7 days'),

    (v4, seed_uid,
     'Design for Non-Designers',
     'Design for Non-Designers',
     'Look professional without hiring a designer. Free tools, color palettes, font pairings, and design principles that make everything you create stand out.',
     'Design', true, NOW() - INTERVAL '6 days'),

    (v5, seed_uid,
     'Pre-Law & LSAT Prep',
     'Pre-Law & LSAT Prep',
     'Everything you need to go from pre-law student to law school admit — free LSAT prep, school research tools, application guides, and insider advice.',
     'Law', true, NOW() - INTERVAL '5 days'),

    (v6, seed_uid,
     'Economics & Finance Fundamentals',
     'Economics & Finance Fundamentals',
     'The economic and financial literacy most students never get in class. Free courses, sharp podcasts, and resources that make markets, money, and policy click.',
     'Business', true, NOW() - INTERVAL '4 days'),

    (v7, seed_uid,
     'Academic Writing & Research Skills',
     'Academic Writing & Research Skills',
     'Write better papers, cite correctly, find sources faster, and actually enjoy the research process. Tools and guides every student needs from day one.',
     'Academic', true, NOW() - INTERVAL '3 days'),

    (v8, seed_uid,
     'Study Abroad & Travel Hacking for Students',
     'Study Abroad & Travel Hacking for Students',
     'Go further on less. Program finders, flight deal tools, budget travel guides, and money transfer apps to make studying abroad actually affordable.',
     'Travel', true, NOW() - INTERVAL '2 days'),

    (v9, seed_uid,
     'Fitness & Nutrition on a Student Budget',
     'Fitness & Nutrition on a Student Budget',
     'Stay healthy, strong, and energized without a gym membership or a meal plan. Free workouts, budget-friendly nutrition guides, and science-backed health tools.',
     'Wellness', true, NOW() - INTERVAL '1 day')

  ON CONFLICT (id) DO NOTHING;


  -- ===========================================================================
  -- TAGS — insert new ones, skip any that already exist by name
  -- ===========================================================================
  INSERT INTO tags (id, user_id, name)
  VALUES
    (t_no_code,      seed_uid, 'no-code'),
    (t_content,      seed_uid, 'content-creation'),
    (t_video,        seed_uid, 'video'),
    (t_analytics,    seed_uid, 'analytics'),
    (t_sql,          seed_uid, 'sql'),
    (t_design,       seed_uid, 'design'),
    (t_ui_ux,        seed_uid, 'ui-ux'),
    (t_law,          seed_uid, 'law'),
    (t_lsat,         seed_uid, 'lsat'),
    (t_economics,    seed_uid, 'economics'),
    (t_finance,      seed_uid, 'finance'),
    (t_writing,      seed_uid, 'writing'),
    (t_research,     seed_uid, 'research'),
    (t_travel,       seed_uid, 'travel'),
    (t_study_abroad, seed_uid, 'study-abroad'),
    (t_fitness,      seed_uid, 'fitness'),
    (t_nutrition,    seed_uid, 'nutrition')
  ON CONFLICT (user_id, name) DO NOTHING;

  -- Re-fetch all tag IDs (new + re-used) using the actual DB values
  SELECT id INTO t_no_code      FROM tags WHERE user_id = seed_uid AND name = 'no-code';
  SELECT id INTO t_content      FROM tags WHERE user_id = seed_uid AND name = 'content-creation';
  SELECT id INTO t_video        FROM tags WHERE user_id = seed_uid AND name = 'video';
  SELECT id INTO t_analytics    FROM tags WHERE user_id = seed_uid AND name = 'analytics';
  SELECT id INTO t_sql          FROM tags WHERE user_id = seed_uid AND name = 'sql';
  SELECT id INTO t_design       FROM tags WHERE user_id = seed_uid AND name = 'design';
  SELECT id INTO t_ui_ux        FROM tags WHERE user_id = seed_uid AND name = 'ui-ux';
  SELECT id INTO t_law          FROM tags WHERE user_id = seed_uid AND name = 'law';
  SELECT id INTO t_lsat         FROM tags WHERE user_id = seed_uid AND name = 'lsat';
  SELECT id INTO t_economics    FROM tags WHERE user_id = seed_uid AND name = 'economics';
  SELECT id INTO t_finance      FROM tags WHERE user_id = seed_uid AND name = 'finance';
  SELECT id INTO t_writing      FROM tags WHERE user_id = seed_uid AND name = 'writing';
  SELECT id INTO t_research     FROM tags WHERE user_id = seed_uid AND name = 'research';
  SELECT id INTO t_travel       FROM tags WHERE user_id = seed_uid AND name = 'travel';
  SELECT id INTO t_study_abroad FROM tags WHERE user_id = seed_uid AND name = 'study-abroad';
  SELECT id INTO t_fitness      FROM tags WHERE user_id = seed_uid AND name = 'fitness';
  SELECT id INTO t_nutrition    FROM tags WHERE user_id = seed_uid AND name = 'nutrition';
  SELECT id INTO t_free         FROM tags WHERE user_id = seed_uid AND name = 'free';
  SELECT id INTO t_tools        FROM tags WHERE user_id = seed_uid AND name = 'tools';
  SELECT id INTO t_building     FROM tags WHERE user_id = seed_uid AND name = 'building';
  SELECT id INTO t_money        FROM tags WHERE user_id = seed_uid AND name = 'money';
  SELECT id INTO t_wellness     FROM tags WHERE user_id = seed_uid AND name = 'wellness';
  SELECT id INTO t_career       FROM tags WHERE user_id = seed_uid AND name = 'career';
  SELECT id INTO t_productivity FROM tags WHERE user_id = seed_uid AND name = 'productivity';
  SELECT id INTO t_data_science FROM tags WHERE user_id = seed_uid AND name = 'data-science';
  SELECT id INTO t_startup      FROM tags WHERE user_id = seed_uid AND name = 'startup';


  -- ===========================================================================
  -- VAULT 1: No-Code & Build Without Code
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0001-000000000001', seed_uid, v1,
     'Webflow', 'https://webflow.com',
     'Build professional, fully custom websites visually — no code, no templates that look like templates. The go-to tool for designers and non-dev founders.',
     NOW()),
    ('88888888-8888-8888-0001-000000000002', seed_uid, v1,
     'Bubble', 'https://bubble.io',
     'Build fully functional web apps with a visual drag-and-drop editor. Database, logic, user auth, APIs — all without writing code. Used by real funded startups.',
     NOW()),
    ('88888888-8888-8888-0001-000000000003', seed_uid, v1,
     'Glide', 'https://www.glideapps.com',
     'Turn a Google Sheet or Airtable into a beautiful mobile app in minutes. Perfect for internal tools, community apps, and student project demos.',
     NOW()),
    ('88888888-8888-8888-0001-000000000004', seed_uid, v1,
     'Zapier', 'https://zapier.com',
     'Automate repetitive tasks by connecting 6,000+ apps. If X happens in one tool, make Y happen in another — no code, just logic. Free plan covers most student use.',
     NOW()),
    ('88888888-8888-8888-0001-000000000005', seed_uid, v1,
     'Make (formerly Integromat)', 'https://make.com',
     'More powerful than Zapier for complex automations, with a visual flow builder and a generous free tier. Build multi-step workflows between any tools you use.',
     NOW()),
    ('88888888-8888-8888-0001-000000000006', seed_uid, v1,
     'Softr', 'https://softr.io',
     'Build client portals, marketplaces, and membership sites on top of Airtable or Google Sheets. Functional no-code apps with real user logins — free to start.',
     NOW()),
    ('88888888-8888-8888-0001-000000000007', seed_uid, v1,
     'Carrd', 'https://carrd.co',
     'Build a clean, fast single-page website for $19/year. Perfect for personal portfolios, landing pages, and link-in-bio pages. Insanely simple.',
     NOW()),
    ('88888888-8888-8888-0001-000000000008', seed_uid, v1,
     'Airtable', 'https://airtable.com',
     'A spreadsheet that thinks it''s a database. Build project trackers, content calendars, CRMs, and app back-ends — all visually, no SQL required.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0001-000000000001', t_no_code),
    ('88888888-8888-8888-0001-000000000001', t_building),
    ('88888888-8888-8888-0001-000000000002', t_no_code),
    ('88888888-8888-8888-0001-000000000002', t_building),
    ('88888888-8888-8888-0001-000000000003', t_no_code),
    ('88888888-8888-8888-0001-000000000003', t_tools),
    ('88888888-8888-8888-0001-000000000004', t_no_code),
    ('88888888-8888-8888-0001-000000000004', t_productivity),
    ('88888888-8888-8888-0001-000000000005', t_no_code),
    ('88888888-8888-8888-0001-000000000005', t_productivity),
    ('88888888-8888-8888-0001-000000000006', t_no_code),
    ('88888888-8888-8888-0001-000000000006', t_startup),
    ('88888888-8888-8888-0001-000000000007', t_no_code),
    ('88888888-8888-8888-0001-000000000007', t_building),
    ('88888888-8888-8888-0001-000000000008', t_no_code),
    ('88888888-8888-8888-0001-000000000008', t_tools)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 2: Content Creation & Monetization
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0002-000000000001', seed_uid, v2,
     'Descript', 'https://www.descript.com',
     'Edit video and audio by editing the transcript — delete a word on the page, it disappears from the video. The fastest content editing tool for creators.',
     NOW()),
    ('88888888-8888-8888-0002-000000000002', seed_uid, v2,
     'CapCut', 'https://www.capcut.com',
     'Free, powerful video editing app dominant among TikTok and Reels creators. Auto-captions, templates, and effects that make professional edits take minutes.',
     NOW()),
    ('88888888-8888-8888-0002-000000000003', seed_uid, v2,
     'Riverside.fm', 'https://riverside.fm',
     'Record studio-quality podcast and video interviews remotely. Each participant records locally so quality is flawless even on bad connections. Free tier available.',
     NOW()),
    ('88888888-8888-8888-0002-000000000004', seed_uid, v2,
     'YouTube Studio', 'https://studio.youtube.com',
     'The command center for growing a YouTube channel. Analytics, audience insights, SEO tools, and monetization settings — master this before you post a single video.',
     NOW()),
    ('88888888-8888-8888-0002-000000000005', seed_uid, v2,
     'Gumroad', 'https://gumroad.com',
     'Sell digital products — templates, guides, presets, ebooks, courses — directly to your audience with zero upfront cost. Takes a small cut per sale.',
     NOW()),
    ('88888888-8888-8888-0002-000000000006', seed_uid, v2,
     'Ko-fi', 'https://ko-fi.com',
     'Accept tips, sell memberships, and take commissions from your audience with zero platform fees on tips. The most creator-friendly monetization tool available.',
     NOW()),
    ('88888888-8888-8888-0002-000000000007', seed_uid, v2,
     'Substack', 'https://substack.com',
     'Launch a free or paid newsletter and own your audience directly. Students with a niche — finance, tech, culture, humor — have built real income here from scratch.',
     NOW()),
    ('88888888-8888-8888-0002-000000000008', seed_uid, v2,
     'TubeBuddy', 'https://www.tubebuddy.com',
     'Browser extension that adds keyword research, A/B thumbnail testing, and SEO scoring directly inside YouTube Studio. Free tier is genuinely useful.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0002-000000000001', t_content),
    ('88888888-8888-8888-0002-000000000001', t_video),
    ('88888888-8888-8888-0002-000000000002', t_content),
    ('88888888-8888-8888-0002-000000000002', t_video),
    ('88888888-8888-8888-0002-000000000003', t_content),
    ('88888888-8888-8888-0002-000000000003', t_tools),
    ('88888888-8888-8888-0002-000000000004', t_content),
    ('88888888-8888-8888-0002-000000000004', t_video),
    ('88888888-8888-8888-0002-000000000005', t_content),
    ('88888888-8888-8888-0002-000000000005', t_money),
    ('88888888-8888-8888-0002-000000000006', t_content),
    ('88888888-8888-8888-0002-000000000006', t_money),
    ('88888888-8888-8888-0002-000000000007', t_content),
    ('88888888-8888-8888-0002-000000000007', t_money),
    ('88888888-8888-8888-0002-000000000008', t_content),
    ('88888888-8888-8888-0002-000000000008', t_tools)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 3: Data Science & Analytics
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0003-000000000001', seed_uid, v3,
     'Kaggle Learn — SQL & Data Science', 'https://www.kaggle.com/learn',
     'Free hands-on courses in SQL, Python, data visualization, and ML — run entirely in the browser. Earn certificates and access real datasets from day one.',
     NOW()),
    ('88888888-8888-8888-0003-000000000002', seed_uid, v3,
     'Mode SQL Tutorial', 'https://mode.com/sql-tutorial',
     'The clearest free SQL tutorial available. Goes from basic SELECT queries to window functions and subqueries used by real data analysts at top companies.',
     NOW()),
    ('88888888-8888-8888-0003-000000000003', seed_uid, v3,
     'Google Data Analytics Certificate (Coursera)', 'https://www.coursera.org/professional-certificates/google-data-analytics',
     'Google''s entry-level data analytics certificate. Covers SQL, R, Tableau, and data storytelling. Audit every course free — only pay if you want the certificate.',
     NOW()),
    ('88888888-8888-8888-0003-000000000004', seed_uid, v3,
     'Tableau Public', 'https://public.tableau.com',
     'Build and publish interactive data visualizations for free using Tableau Public. A strong Tableau portfolio is one of the fastest paths to a data analyst role.',
     NOW()),
    ('88888888-8888-8888-0003-000000000005', seed_uid, v3,
     'SQLZoo', 'https://sqlzoo.net',
     'Interactive SQL exercises in the browser — no setup required. Work through increasingly complex queries against real databases across 10+ lesson modules.',
     NOW()),
    ('88888888-8888-8888-0003-000000000006', seed_uid, v3,
     'Towards Data Science', 'https://towardsdatascience.com',
     'The most widely-read data science publication. Practical tutorials, project walkthroughs, and career advice written by practitioners for practitioners.',
     NOW()),
    ('88888888-8888-8888-0003-000000000007', seed_uid, v3,
     'Power BI (Free for Students)', 'https://www.microsoft.com/en-us/power-platform/products/power-bi',
     'Microsoft''s free data visualization and business intelligence tool. Widely used in corporate environments — knowing Power BI is a real hiring differentiator.',
     NOW()),
    ('88888888-8888-8888-0003-000000000008', seed_uid, v3,
     'DataLemur — SQL Interview Practice', 'https://datalemur.com',
     'SQL and data science interview questions from Facebook, Amazon, Airbnb, and more — with hints and solutions. Purpose-built for landing data analyst roles.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0003-000000000001', t_data_science),
    ('88888888-8888-8888-0003-000000000001', t_free),
    ('88888888-8888-8888-0003-000000000002', t_sql),
    ('88888888-8888-8888-0003-000000000002', t_analytics),
    ('88888888-8888-8888-0003-000000000003', t_data_science),
    ('88888888-8888-8888-0003-000000000003', t_analytics),
    ('88888888-8888-8888-0003-000000000004', t_analytics),
    ('88888888-8888-8888-0003-000000000004', t_tools),
    ('88888888-8888-8888-0003-000000000005', t_sql),
    ('88888888-8888-8888-0003-000000000005', t_free),
    ('88888888-8888-8888-0003-000000000006', t_data_science),
    ('88888888-8888-8888-0003-000000000006', t_analytics),
    ('88888888-8888-8888-0003-000000000007', t_analytics),
    ('88888888-8888-8888-0003-000000000007', t_career),
    ('88888888-8888-8888-0003-000000000008', t_sql),
    ('88888888-8888-8888-0003-000000000008', t_career)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 4: Design for Non-Designers
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0004-000000000001', seed_uid, v4,
     'Figma (Free)', 'https://www.figma.com',
     'The industry-standard design tool — free for individuals. Use it for UI mockups, presentation layouts, social graphics, or just making things look intentional.',
     NOW()),
    ('88888888-8888-8888-0004-000000000002', seed_uid, v4,
     'Refactoring UI', 'https://www.refactoringui.com',
     'Free design tips from the creators of Tailwind CSS. Teaches non-designers the specific, actionable decisions that make interfaces look polished and professional.',
     NOW()),
    ('88888888-8888-8888-0004-000000000003', seed_uid, v4,
     'Laws of UX', 'https://lawsofux.com',
     'The psychological principles behind great design — Fitts''s Law, Hick''s Law, the Peak-End Rule — explained visually and concisely. Free and endlessly useful.',
     NOW()),
    ('88888888-8888-8888-0004-000000000004', seed_uid, v4,
     'Coolors — Color Palette Generator', 'https://coolors.co',
     'Generate beautiful, harmonious color palettes in seconds. Lock colors you like, hit spacebar, and instantly explore thousands of combinations.',
     NOW()),
    ('88888888-8888-8888-0004-000000000005', seed_uid, v4,
     'Google Fonts', 'https://fonts.google.com',
     'Over 1,400 free, open-source fonts you can use in any project. Browse pairings, preview your text live, and download or embed in seconds.',
     NOW()),
    ('88888888-8888-8888-0004-000000000006', seed_uid, v4,
     'Fontpair', 'https://www.fontpair.co',
     'Curated Google Font pairings that just work. Browse by style and see how heading and body font combinations look together before committing.',
     NOW()),
    ('88888888-8888-8888-0004-000000000007', seed_uid, v4,
     'Unsplash', 'https://unsplash.com',
     'Thousands of beautiful, high-resolution photos completely free for any use — commercial or personal. No attribution required. Use for presentations and projects.',
     NOW()),
    ('88888888-8888-8888-0004-000000000008', seed_uid, v4,
     'Canva Design School', 'https://www.canva.com/learn/design',
     'Free design tutorials, courses, and articles covering layout, typography, color, and brand identity — taught in plain English for absolute beginners.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0004-000000000001', t_design),
    ('88888888-8888-8888-0004-000000000001', t_ui_ux),
    ('88888888-8888-8888-0004-000000000002', t_design),
    ('88888888-8888-8888-0004-000000000002', t_ui_ux),
    ('88888888-8888-8888-0004-000000000003', t_design),
    ('88888888-8888-8888-0004-000000000003', t_ui_ux),
    ('88888888-8888-8888-0004-000000000004', t_design),
    ('88888888-8888-8888-0004-000000000004', t_tools),
    ('88888888-8888-8888-0004-000000000005', t_design),
    ('88888888-8888-8888-0004-000000000005', t_free),
    ('88888888-8888-8888-0004-000000000006', t_design),
    ('88888888-8888-8888-0004-000000000006', t_tools),
    ('88888888-8888-8888-0004-000000000007', t_design),
    ('88888888-8888-8888-0004-000000000007', t_free),
    ('88888888-8888-8888-0004-000000000008', t_design),
    ('88888888-8888-8888-0004-000000000008', t_free)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 5: Pre-Law & LSAT Prep
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0005-000000000001', seed_uid, v5,
     'Khan Academy LSAT Prep', 'https://www.khanacademy.org/prep/lsat',
     'The only official free LSAT prep — made in partnership with LSAC. Full-length practice tests, question-by-question explanations, and personalized study plans.',
     NOW()),
    ('88888888-8888-8888-0005-000000000002', seed_uid, v5,
     '7Sage LSAT', 'https://7sage.com',
     'The most respected free LSAT curriculum online. 7Sage''s logic games explanations alone are worth more than most paid prep courses. Free core content available.',
     NOW()),
    ('88888888-8888-8888-0005-000000000003', seed_uid, v5,
     'LSAC Official Website', 'https://www.lsac.org',
     'The official source for LSAT registration, CAS (credential assembly service), and the law school search tool. Everything admissions-related starts here.',
     NOW()),
    ('88888888-8888-8888-0005-000000000004', seed_uid, v5,
     'Law School Numbers', 'https://www.lawschoolnumbers.com',
     'Database of real law school applicant profiles with GPA, LSAT scores, and admissions outcomes. The most honest tool for calibrating where you''ll get in.',
     NOW()),
    ('88888888-8888-8888-0005-000000000005', seed_uid, v5,
     'r/lawschooladmissions', 'https://www.reddit.com/r/lawschooladmissions',
     'The most active pre-law community online. Real cycle results, application strategy, personal statement feedback, and school-specific intel — invaluable.',
     NOW()),
    ('88888888-8888-8888-0005-000000000006', seed_uid, v5,
     'PowerScore LSAT Blog', 'https://blog.powerscore.com/lsat',
     'Free strategy articles and breakdowns of every LSAT question type from one of the most trusted LSAT prep companies. Great for targeted skill improvement.',
     NOW()),
    ('88888888-8888-8888-0005-000000000007', seed_uid, v5,
     'Above the Law', 'https://abovethelaw.com',
     'Essential reading for anyone considering a legal career. Law school rankings, BigLaw culture, salary data, and the unfiltered realities of legal practice.',
     NOW()),
    ('88888888-8888-8888-0005-000000000008', seed_uid, v5,
     'Prelaw Advisor Resources (NALP)', 'https://www.nalp.org/enterlawschool',
     'The National Association for Law Placement''s resources on law school, career paths, and what to expect from different areas of legal practice.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0005-000000000001', t_lsat),
    ('88888888-8888-8888-0005-000000000001', t_free),
    ('88888888-8888-8888-0005-000000000002', t_lsat),
    ('88888888-8888-8888-0005-000000000002', t_free),
    ('88888888-8888-8888-0005-000000000003', t_law),
    ('88888888-8888-8888-0005-000000000003', t_lsat),
    ('88888888-8888-8888-0005-000000000004', t_law),
    ('88888888-8888-8888-0005-000000000004', t_lsat),
    ('88888888-8888-8888-0005-000000000005', t_law),
    ('88888888-8888-8888-0005-000000000005', t_lsat),
    ('88888888-8888-8888-0005-000000000006', t_lsat),
    ('88888888-8888-8888-0005-000000000006', t_tools),
    ('88888888-8888-8888-0005-000000000007', t_law),
    ('88888888-8888-8888-0005-000000000007', t_career),
    ('88888888-8888-8888-0005-000000000008', t_law),
    ('88888888-8888-8888-0005-000000000008', t_career)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 6: Economics & Finance Fundamentals
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0006-000000000001', seed_uid, v6,
     'Khan Academy — Economics & Finance', 'https://www.khanacademy.org/economics-finance-domain',
     'Free courses on micro and macroeconomics, personal finance, and financial markets. Clear explanations with no prerequisites — great for any student.',
     NOW()),
    ('88888888-8888-8888-0006-000000000002', seed_uid, v6,
     'Marginal Revolution University', 'https://mru.org',
     'Free economics courses from Tyler Cowen and Alex Tabarrok (GMU). Genuinely engaging content that makes economics feel relevant to the real world.',
     NOW()),
    ('88888888-8888-8888-0006-000000000003', seed_uid, v6,
     'Bloomberg Market Concepts (Free)', 'https://www.bloomberg.com/professional/product/bloomberg-market-concepts',
     'Bloomberg''s free e-learning course covering markets, economics, currencies, and fixed income. Earns a certificate that looks sharp on a finance resume.',
     NOW()),
    ('88888888-8888-8888-0006-000000000004', seed_uid, v6,
     'Planet Money (NPR)', 'https://www.npr.org/podcasts/510289/planet-money',
     'The best economics podcast in existence. Makes every topic — inflation, supply chains, interest rates, weird markets — genuinely fun and totally understandable.',
     NOW()),
    ('88888888-8888-8888-0006-000000000005', seed_uid, v6,
     'Econlib — Library of Economics and Liberty', 'https://www.econlib.org',
     'Free encyclopedic resource on economics theory, history of economic thought, and policy analysis. Excellent for research papers and genuine intellectual curiosity.',
     NOW()),
    ('88888888-8888-8888-0006-000000000006', seed_uid, v6,
     'Investopedia', 'https://www.investopedia.com',
     'The most comprehensive free financial dictionary and learning resource. Look up any finance or economics term and get a clear, example-driven explanation.',
     NOW()),
    ('88888888-8888-8888-0006-000000000007', seed_uid, v6,
     'CFA Institute — Free Learning Resources', 'https://www.cfainstitute.org/learning',
     'Free investment and finance education from the CFA Institute. Covers portfolio theory, ethics, and financial analysis — useful whether or not you pursue the CFA.',
     NOW()),
    ('88888888-8888-8888-0006-000000000008', seed_uid, v6,
     'The Economist — Student Subscription', 'https://www.economist.com/student',
     'Heavily discounted student access to The Economist. The most important weekly publication for understanding global economics, business, and geopolitics.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0006-000000000001', t_economics),
    ('88888888-8888-8888-0006-000000000001', t_free),
    ('88888888-8888-8888-0006-000000000002', t_economics),
    ('88888888-8888-8888-0006-000000000002', t_free),
    ('88888888-8888-8888-0006-000000000003', t_finance),
    ('88888888-8888-8888-0006-000000000003', t_career),
    ('88888888-8888-8888-0006-000000000004', t_economics),
    ('88888888-8888-8888-0006-000000000004', t_free),
    ('88888888-8888-8888-0006-000000000005', t_economics),
    ('88888888-8888-8888-0006-000000000005', t_research),
    ('88888888-8888-8888-0006-000000000006', t_finance),
    ('88888888-8888-8888-0006-000000000006', t_free),
    ('88888888-8888-8888-0006-000000000007', t_finance),
    ('88888888-8888-8888-0006-000000000007', t_career),
    ('88888888-8888-8888-0006-000000000008', t_economics),
    ('88888888-8888-8888-0006-000000000008', t_finance)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 7: Academic Writing & Research Skills
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0007-000000000001', seed_uid, v7,
     'Purdue OWL', 'https://owl.purdue.edu',
     'The gold standard free resource for academic writing. APA, MLA, Chicago citation guides, essay structure, grammar rules — bookmark this on day one of college.',
     NOW()),
    ('88888888-8888-8888-0007-000000000002', seed_uid, v7,
     'Zotero', 'https://www.zotero.org',
     'Free, open-source reference manager. Collect sources from the web with one click, organize them into folders, and generate perfectly formatted citations automatically.',
     NOW()),
    ('88888888-8888-8888-0007-000000000003', seed_uid, v7,
     'Connected Papers', 'https://www.connectedpapers.com',
     'Visual tool for exploring academic literature. Enter one paper and see a graph of related works — the fastest way to find the key sources in any research field.',
     NOW()),
    ('88888888-8888-8888-0007-000000000004', seed_uid, v7,
     'Hemingway Editor', 'https://hemingwayapp.com',
     'Paste your writing in and it highlights sentences that are too long, passive voice, and weak adverbs. Makes academic prose clearer and more direct immediately.',
     NOW()),
    ('88888888-8888-8888-0007-000000000005', seed_uid, v7,
     'Scribbr — Academic Writing Guides', 'https://www.scribbr.com',
     'Comprehensive free guides on every aspect of academic writing — thesis structure, research methodology, citation styles, and proofreading. Extremely well organized.',
     NOW()),
    ('88888888-8888-8888-0007-000000000006', seed_uid, v7,
     'UNC Writing Center Tips & Tools', 'https://writingcenter.unc.edu/tips-and-tools',
     'Free handouts from UNC''s Writing Center on every genre of academic writing — literature reviews, argument papers, abstracts, lab reports, and more.',
     NOW()),
    ('88888888-8888-8888-0007-000000000007', seed_uid, v7,
     'Google Scholar', 'https://scholar.google.com',
     'Search academic papers, theses, books, and court opinions. Use "Cited by" to find foundational works and "Related articles" to discover adjacent research.',
     NOW()),
    ('88888888-8888-8888-0007-000000000008', seed_uid, v7,
     'Semantic Scholar', 'https://www.semanticscholar.org',
     'AI-powered academic search engine that summarizes papers, shows citation counts, and surfaces the most influential research in any field — completely free.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0007-000000000001', t_writing),
    ('88888888-8888-8888-0007-000000000001', t_free),
    ('88888888-8888-8888-0007-000000000002', t_research),
    ('88888888-8888-8888-0007-000000000002', t_tools),
    ('88888888-8888-8888-0007-000000000003', t_research),
    ('88888888-8888-8888-0007-000000000003', t_tools),
    ('88888888-8888-8888-0007-000000000004', t_writing),
    ('88888888-8888-8888-0007-000000000004', t_tools),
    ('88888888-8888-8888-0007-000000000005', t_writing),
    ('88888888-8888-8888-0007-000000000005', t_research),
    ('88888888-8888-8888-0007-000000000006', t_writing),
    ('88888888-8888-8888-0007-000000000006', t_free),
    ('88888888-8888-8888-0007-000000000007', t_research),
    ('88888888-8888-8888-0007-000000000007', t_free),
    ('88888888-8888-8888-0007-000000000008', t_research),
    ('88888888-8888-8888-0007-000000000008', t_free)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 8: Study Abroad & Travel Hacking for Students
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0008-000000000001', seed_uid, v8,
     'GoOverseas', 'https://www.gooverseas.com',
     'The largest directory of study abroad, volunteer, and work abroad programs for students. Filter by destination, duration, cost, and subject area.',
     NOW()),
    ('88888888-8888-8888-0008-000000000002', seed_uid, v8,
     'Going (Scott''s Cheap Flights)', 'https://www.going.com',
     'Get email alerts for flight deals up to 90% off from your home airport. Free tier sends the best mistake fares and sale alerts — the highest ROI travel tool.',
     NOW()),
    ('88888888-8888-8888-0008-000000000003', seed_uid, v8,
     'Google Flights', 'https://www.google.com/flights',
     'The best free tool for flexible flight searching. Use the Explore map to find the cheapest destinations from your airport on any given set of dates.',
     NOW()),
    ('88888888-8888-8888-0008-000000000004', seed_uid, v8,
     'Wise — International Money Transfers', 'https://wise.com',
     'Send and receive money internationally at the real exchange rate with minimal fees. Essential for study abroad — saves significantly over bank wire transfers.',
     NOW()),
    ('88888888-8888-8888-0008-000000000005', seed_uid, v8,
     'Hostelworld', 'https://www.hostelworld.com',
     'Book budget accommodation across 170+ countries. Hostels aren''t just cheap — the social environment makes them ideal for solo student travelers.',
     NOW()),
    ('88888888-8888-8888-0008-000000000006', seed_uid, v8,
     'ISIC — International Student Identity Card', 'https://www.isic.org',
     'The globally recognized student ID. Unlocks discounts on travel, museums, accommodation, and services in 130+ countries. Costs under $25.',
     NOW()),
    ('88888888-8888-8888-0008-000000000007', seed_uid, v8,
     'US State Department — Student Travel', 'https://travel.state.gov',
     'Official travel advisories, passport applications, and the Smart Traveler Enrollment Program (STEP) to register your trip with the US embassy. Essential for safety.',
     NOW()),
    ('88888888-8888-8888-0008-000000000008', seed_uid, v8,
     'Nomad List', 'https://nomadlist.com',
     'Data on cost of living, internet speed, safety, and weather for hundreds of cities worldwide. Use it to compare study abroad destinations or plan gap year trips.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0008-000000000001', t_study_abroad),
    ('88888888-8888-8888-0008-000000000001', t_free),
    ('88888888-8888-8888-0008-000000000002', t_travel),
    ('88888888-8888-8888-0008-000000000002', t_money),
    ('88888888-8888-8888-0008-000000000003', t_travel),
    ('88888888-8888-8888-0008-000000000003', t_free),
    ('88888888-8888-8888-0008-000000000004', t_travel),
    ('88888888-8888-8888-0008-000000000004', t_money),
    ('88888888-8888-8888-0008-000000000005', t_travel),
    ('88888888-8888-8888-0008-000000000005', t_study_abroad),
    ('88888888-8888-8888-0008-000000000006', t_study_abroad),
    ('88888888-8888-8888-0008-000000000006', t_travel),
    ('88888888-8888-8888-0008-000000000007', t_travel),
    ('88888888-8888-8888-0008-000000000007', t_study_abroad),
    ('88888888-8888-8888-0008-000000000008', t_travel),
    ('88888888-8888-8888-0008-000000000008', t_tools)
  ON CONFLICT DO NOTHING;


  -- ===========================================================================
  -- VAULT 9: Fitness & Nutrition on a Student Budget
  -- ===========================================================================
  INSERT INTO entries (id, user_id, vault_id, title, url, description, created_at)
  VALUES
    ('88888888-8888-8888-0009-000000000001', seed_uid, v9,
     'Darebee', 'https://darebee.com',
     'Over 1,000 completely free, no-equipment workout plans and programs. No ads, no upsells — just well-designed training for any fitness level, anywhere.',
     NOW()),
    ('88888888-8888-8888-0009-000000000002', seed_uid, v9,
     'Nike Training Club', 'https://www.nike.com/ntc-app',
     'Nike''s workout app — hundreds of free guided workouts from 15 to 60 minutes, across strength, endurance, yoga, and mobility. No Nike gear required.',
     NOW()),
    ('88888888-8888-8888-0009-000000000003', seed_uid, v9,
     'Jeff Nippard (YouTube)', 'https://www.youtube.com/@JeffNippard',
     'Science-based fitness content from a natural bodybuilder and biochemistry graduate. His free "Fundamentals" programs are among the best beginner lifting guides online.',
     NOW()),
    ('88888888-8888-8888-0009-000000000004', seed_uid, v9,
     'Cronometer', 'https://cronometer.com',
     'The most accurate free nutrition tracker available. Logs micronutrients (not just calories) so you can see if you''re actually getting enough iron, B12, zinc, and more.',
     NOW()),
    ('88888888-8888-8888-0009-000000000005', seed_uid, v9,
     'Examine.com', 'https://examine.com',
     'Unbiased, research-backed summaries of every supplement and nutrient. No ads, no affiliate links — just what the science actually says about creatine, protein, and more.',
     NOW()),
    ('88888888-8888-8888-0009-000000000006', seed_uid, v9,
     'Budget Bytes — Meal Prep', 'https://www.budgetbytes.com/category/recipes/meal-prep',
     'Meal prep recipes designed for busy students on tight budgets, with per-serving costs listed. Eating well and cheaply isn''t a contradiction — this proves it.',
     NOW()),
    ('88888888-8888-8888-0009-000000000007', seed_uid, v9,
     'Huberman Lab — Sleep & Recovery', 'https://www.hubermanlab.com/topics/sleep',
     'Andrew Huberman''s science-backed protocols for sleep optimization — the single highest-leverage health intervention for student performance and recovery.',
     NOW()),
    ('88888888-8888-8888-0009-000000000008', seed_uid, v9,
     'r/Fitness Wiki', 'https://www.reddit.com/r/Fitness/wiki/index',
     'The most comprehensive free fitness FAQ on the internet. Beginner programs, nutrition basics, injury prevention, and myth-busting — written by thousands of real lifters.',
     NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO entry_tags (entry_id, tag_id) VALUES
    ('88888888-8888-8888-0009-000000000001', t_fitness),
    ('88888888-8888-8888-0009-000000000001', t_free),
    ('88888888-8888-8888-0009-000000000002', t_fitness),
    ('88888888-8888-8888-0009-000000000002', t_free),
    ('88888888-8888-8888-0009-000000000003', t_fitness),
    ('88888888-8888-8888-0009-000000000003', t_free),
    ('88888888-8888-8888-0009-000000000004', t_nutrition),
    ('88888888-8888-8888-0009-000000000004', t_tools),
    ('88888888-8888-8888-0009-000000000005', t_nutrition),
    ('88888888-8888-8888-0009-000000000005', t_wellness),
    ('88888888-8888-8888-0009-000000000006', t_nutrition),
    ('88888888-8888-8888-0009-000000000006', t_money),
    ('88888888-8888-8888-0009-000000000007', t_wellness),
    ('88888888-8888-8888-0009-000000000007', t_fitness),
    ('88888888-8888-8888-0009-000000000008', t_fitness),
    ('88888888-8888-8888-0009-000000000008', t_free)
  ON CONFLICT DO NOTHING;


  RAISE NOTICE 'Additional vault seed complete: 9 vaults, 72 entries, 17 new tags inserted.';

END $$;
