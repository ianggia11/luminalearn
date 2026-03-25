-- One-time seed for explore page sample courses.
-- Adds optional metadata columns if they do not exist, then inserts sample rows.

alter table courses add column if not exists price text;
alter table courses add column if not exists reviews text;
alter table courses add column if not exists badge text;

insert into courses (
  title,
  summary,
  level,
  duration_hours,
  rating,
  image_url,
  icon,
  slot_a_label,
  slot_b_label,
  price,
  reviews,
  badge
)
select
  'Google AI Essentials',
  'Build practical AI workflows with hands-on prompts and real-world examples.',
  'Beginner',
  12,
  4.8,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCjWJkbPwNcwJO-Di_BZ8eA-KOfm8AruzxC721Ty3d_qNYxsGHWnImhfZ8iE41cNRyknvZvieuCne8u7g9lpDz5-AKCoScjQzHFVmQj-e_BqBvJHu5tiyE8Ia1QGw4UXqyjZAsN6cspch-P_NrWVdsODIV4s1AzwBQwboIspm_WBqDW4wSGJvlacAUGq0EAZoMgZDJD-_5IvVeMuQa9_mej3-0B4NYNOua1s8KNjfnYo70PE3zOd8fUNh_DAoyEMPp9GNXKrPDtr_QT',
  'auto_awesome',
  '10 AM - 13 PM',
  '15 PM - 18 PM',
  '$49',
  '12.4k',
  'Popular'
where not exists (select 1 from courses where title = 'Google AI Essentials');

insert into courses (
  title,
  summary,
  level,
  duration_hours,
  rating,
  image_url,
  icon,
  slot_a_label,
  slot_b_label,
  price,
  reviews,
  badge
)
select
  'Data Analytics',
  'Analyze datasets, build dashboards, and tell data-driven stories.',
  'Intermediate',
  18,
  4.7,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA9P-jlQoMxV29PVUdfgRYH9TkLbPF7Dg16uKUPPkUshmejgINd32z99ovtALROaROPGkTiBhXa-6Zi_94zOMW7N9NoA_vJhkgI4p3F6NnGSgeXycEnlWphTbsu5_Hq2Fk8sFF5iDwUDzqcr1elh7oayxSPUzuxXYMCsd-5DSJgMsOzYs71kV-XPO-UFviLqfU2Gsvsq8Y9prvHA1Ebo-ZtW-1-YRNCltoYz0adQLAAWO9o6pV0mbHqBOjLIwMz58Y_3WF_Wmw_PtUT',
  'query_stats',
  '10 AM - 13 PM',
  '15 PM - 18 PM',
  '$59',
  '8.1k',
  'Career Path'
where not exists (select 1 from courses where title = 'Data Analytics');

insert into courses (
  title,
  summary,
  level,
  duration_hours,
  rating,
  image_url,
  icon,
  slot_a_label,
  slot_b_label,
  price,
  reviews,
  badge
)
select
  'Cybersecurity',
  'Protect systems, identify threats, and build resilient security habits.',
  'Beginner',
  16,
  4.9,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Il5q4oAUChU-Nb4GBFuKFIIhu0YGJsziH4L22XOO3WhObcgrbadEzeuE0NSeUv2fh2arCPf0gQ25iO-Rcv_gHLIIxBsBhsGg40_aStJpA8UneAVJTaEGfeWjJGWZf-p50oxR3B3OlM4nT1FmzubwiH_TmbbPQKbdAI8GX1SH_DoWIMCf6ymw3IHO35TcFgwamqQTdIAM36E64GGWcFi1nx5xWdfpCyFiIVkAPDXp12ZYRQCFlqk7tHaGSA4ZYVdyNbkEpMMXxglK',
  'security',
  '10 AM - 13 PM',
  '15 PM - 18 PM',
  '$69',
  '6.5k',
  'New'
where not exists (select 1 from courses where title = 'Cybersecurity');

insert into courses (
  title,
  summary,
  level,
  duration_hours,
  rating,
  image_url,
  icon,
  slot_a_label,
  slot_b_label,
  price,
  reviews,
  badge
)
select
  'Prompting Essentials',
  'Master prompt patterns that unlock more reliable AI responses.',
  'Beginner',
  10,
  4.6,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA_i6UbEvuwwep0pzm5DOGu-4HLRJPVOmdPPWglr1PtItCFXjm2r9NE575ODd1PBA3huFq0wsRuCr-m5pQ8hPdXgVRWbXTzWWrhLPzsRb77jp1K6EnyHzIgnxL7w2TSLIT7F2hLnR3fwGqBxEJ9fLrSyLl9CdZCIVrkBDfgAbjyskQFWbI_yos94p1MQ_rcnr4RZG8KfUmz3meErARBKuL8jNNmfDJhO9NtC6PZGuvYFI1WWi6_tIY_dWZs9AUD-B25ya4ab6vC1mHw',
  'psychology',
  '10 AM - 13 PM',
  '15 PM - 18 PM',
  '$39',
  '5.9k',
  'Skill Builder'
where not exists (select 1 from courses where title = 'Prompting Essentials');
