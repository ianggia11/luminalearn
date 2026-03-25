import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const DEFAULT_AVATAR_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_i6UbEvuwwep0pzm5DOGu-4HLRJPVOmdPPWglr1PtItCFXjm2r9NE575ODd1PBA3huFq0wsRuCr-m5pQ8hPdXgVRWbXTzWWrhLPzsRb77jp1K6EnyHzIgnxL7w2TSLIT7F2hLnR3fwGqBxEJ9fLrSyLl9CdZCIVrkBDfgAbjyskQFWbI_yos94p1MQ_rcnr4RZG8KfUmz3meErARBKuL8jNNmfDJhO9NtC6PZGuvYFI1WWi6_tIY_dWZs9AUD-B25ya4ab6vC1mHw";

const PRESET_AVATAR_URLS = [
  DEFAULT_AVATAR_URL,
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB4lFEkL-0rfmNEp0_pPUiEZgzcxEwPfJd9iWNK54oFQ5Jk8hVAZklH2zXbTiL7oYGZYMoO08kG9qdHwy8vXvNW41FvNkHADh_YPkYpl-Cr8UAZJx2ELd6b8LYNv0mE3xztT96GJuj2LJ7pXSAwQRjX8JZXgikP0I5dH5lTqvdt6FePhKX_MktJGe1sS9k5ntd-c_BJ8ZKMm68w6iSRr1UWqVTlmtKzwyzGO0E_9S-xgbYiF6yuhfRyRGOH_2tPJpo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB_wsY-zVLetwIQjfwWZWF10RWlwTP9dWmpexcEDDzTu78eQnU1C7Ozzu-EpXA3cpQgsJ4LjeZpg3kaXpi-72N7-MLsr6bf8HXe95O2dzk-uV9ZRo6oRZFYbtKTgMSwP_TVXY1rN6tZnuZ0Z1UumGR2fHyp347m4i03yryfOv4rjApIC-NDNxblNjddjKgW7R7xPUEdGzvFMp8R5tTYxGu6xtcTVPgVsUklNNxm9hEaKxF4MXyAsrg6OZAE7WataMj3hvpM3HRj9Zt9",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCSdZ7G0R6YFYJohFweKw4u5Blu2RuGg1xnGC5_fTdwmKBMjujmR7kiib2OvD8dJae1Is7G8f4btJo6noIXB9d9dOWj6G8x-Sc58RrKMs38dceBdxVofYzjtLLUt3_Z6EWBfmBDiAifppHVLl5QbE2rcCODr4eUABOqY8u20CgsgacBdPEfPkA9cxVxeloCV5noG9WH_SvxLh-wF0sbsk2WKgPVVWcrFr5UA46eE6_DSWesk7mtlVusfXGy-8xqR-tLfzRf1gcZsSas",
];

const DEFAULT_COURSE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDW-4tV0811P8big1Qqnii4grRIXV0dRSC-L1JS4fUPupYMihC64zdZFymVldkM_lBSl6yebpta73zgPZWcvKDwEzF3dli8RKAm7qejFsJPWXvtc5eRBrrOyt1h4HWPntrkYHRNK1Q4bo_2mCJBqONDjjvk0JsY4DQ46q8uBUdXqM31kJoG8doAqKfKBY-eP4Pa5nmgMiJ8p4uH4gta0buzC6LbrLr_EdApZzOzwtvIgmHn9-O0SQ_3TVQd1KbY3D_GFHhKS0LyiQvE";

const EXPLORE_SAMPLE_COURSES = [
  {
    title: "Google AI Essentials",
    provider: "Google",
    level: "Beginner",
    rating: 4.8,
    reviews: "12.4k",
    price: "$49",
    badge: "Popular",
    durationHours: 12,
    icon: "auto_awesome",
    summary: "Build practical AI workflows with hands-on prompts and real-world examples.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjWJkbPwNcwJO-Di_BZ8eA-KOfm8AruzxC721Ty3d_qNYxsGHWnImhfZ8iE41cNRyknvZvieuCne8u7g9lpDz5-AKCoScjQzHFVmQj-e_BqBvJHu5tiyE8Ia1QGw4UXqyjZAsN6cspch-P_NrWVdsODIV4s1AzwBQwboIspm_WBqDW4wSGJvlacAUGq0EAZoMgZDJD-_5IvVeMuQa9_mej3-0B4NYNOua1s8KNjfnYo70PE3zOd8fUNh_DAoyEMPp9GNXKrPDtr_QT",
  },
  {
    title: "Data Analytics",
    provider: "Lumina Learn",
    level: "Intermediate",
    rating: 4.7,
    reviews: "8.1k",
    price: "$59",
    badge: "Career Path",
    durationHours: 18,
    icon: "query_stats",
    summary: "Analyze datasets, build dashboards, and tell data-driven stories.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9P-jlQoMxV29PVUdfgRYH9TkLbPF7Dg16uKUPPkUshmejgINd32z99ovtALROaROPGkTiBhXa-6Zi_94zOMW7N9NoA_vJhkgI4p3F6NnGSgeXycEnlWphTbsu5_Hq2Fk8sFF5iDwUDzqcr1elh7oayxSPUzuxXYMCsd-5DSJgMsOzYs71kV-XPO-UFviLqfU2Gsvsq8Y9prvHA1Ebo-ZtW-1-YRNCltoYz0adQLAAWO9o6pV0mbHqBOjLIwMz58Y_3WF_Wmw_PtUT",
  },
  {
    title: "Cybersecurity",
    provider: "Lumina Learn",
    level: "Beginner",
    rating: 4.9,
    reviews: "6.5k",
    price: "$69",
    badge: "New",
    durationHours: 16,
    icon: "security",
    summary: "Protect systems, identify threats, and build resilient security habits.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7Il5q4oAUChU-Nb4GBFuKFIIhu0YGJsziH4L22XOO3WhObcgrbadEzeuE0NSeUv2fh2arCPf0gQ25iO-Rcv_gHLIIxBsBhsGg40_aStJpA8UneAVJTaEGfeWjJGWZf-p50oxR3B3OlM4nT1FmzubwiH_TmbbPQKbdAI8GX1SH_DoWIMCf6ymw3IHO35TcFgwamqQTdIAM36E64GGWcFi1nx5xWdfpCyFiIVkAPDXp12ZYRQCFlqk7tHaGSA4ZYVdyNbkEpMMXxglK",
  },
  {
    title: "Prompting Essentials",
    provider: "Lumina Learn",
    level: "Beginner",
    rating: 4.6,
    reviews: "5.9k",
    price: "$39",
    badge: "Skill Builder",
    durationHours: 10,
    icon: "psychology",
    summary: "Master prompt patterns that unlock more reliable AI responses.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_i6UbEvuwwep0pzm5DOGu-4HLRJPVOmdPPWglr1PtItCFXjm2r9NE575ODd1PBA3huFq0wsRuCr-m5pQ8hPdXgVRWbXTzWWrhLPzsRb77jp1K6EnyHzIgnxL7w2TSLIT7F2hLnR3fwGqBxEJ9fLrSyLl9CdZCIVrkBDfgAbjyskQFWbI_yos94p1MQ_rcnr4RZG8KfUmz3meErARBKuL8jNNmfDJhO9NtC6PZGuvYFI1WWi6_tIY_dWZs9AUD-B25ya4ab6vC1mHw",
  },
];

function LandingPage({ onOpenLogin, variant = "default" }) {
  const isExplore = variant === "explore";
  const [exploreCourses, setExploreCourses] = useState([]);
  const [exploreLoading, setExploreLoading] = useState(false);
  const [exploreError, setExploreError] = useState("");
  const [exploreSeeding, setExploreSeeding] = useState(false);

  const getExploreMeta = (title) =>
    EXPLORE_SAMPLE_COURSES.find(
      (course) => course.title.toLowerCase() === (title || "").toLowerCase(),
    );

  const loadExploreCourses = async () => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setExploreError("Supabase environment variables are missing.");
      setExploreCourses([]);
      setExploreLoading(false);
      return;
    }

    setExploreLoading(true);
    setExploreError("");

    const { data, error } = await supabase
      .from("courses")
      .select(
        "id,title,summary,level,duration_hours,rating,image_url,icon,slot_a_label,slot_b_label,price,reviews,badge",
      )
      .order("title", { ascending: true });

    if (error) {
      setExploreError("Unable to load courses from the database.");
      setExploreCourses([]);
    } else {
      setExploreCourses(data || []);
    }

    setExploreLoading(false);
  };

  const handleSeedExploreCourses = async () => {
    if (exploreSeeding) return;
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setExploreError("Supabase environment variables are missing.");
      return;
    }

    setExploreSeeding(true);
    setExploreError("");

    const { data: existingCourses, error: existingError } = await supabase
      .from("courses")
      .select("title");

    if (existingError) {
      setExploreError(existingError.message || "Unable to check existing courses.");
      setExploreSeeding(false);
      return;
    }

    const existingTitles = new Set(
      (existingCourses || []).map((course) => (course.title || "").toLowerCase()),
    );

    const payload = EXPLORE_SAMPLE_COURSES.filter(
      (course) => !existingTitles.has(course.title.toLowerCase()),
    ).map((course) => ({
      title: course.title,
      summary: course.summary,
      level: course.level,
      duration_hours: course.durationHours,
      rating: course.rating,
      image_url: course.image,
      icon: course.icon,
      slot_a_label: "10 AM - 13 PM",
      slot_b_label: "15 PM - 18 PM",
      price: course.price,
      reviews: course.reviews,
      badge: course.badge,
    }));

    if (!payload.length) {
      setExploreError("Sample courses are already in the database.");
      setExploreSeeding(false);
      return;
    }

    const { error: insertError } = await supabase.from("courses").insert(payload);

    if (insertError) {
      setExploreError(insertError.message || "Unable to add sample courses.");
      setExploreSeeding(false);
      return;
    }

    await loadExploreCourses();
    setExploreSeeding(false);
  };

  useEffect(() => {
    if (!isExplore) return;
    loadExploreCourses();
  }, [isExplore]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-background-light px-6 py-4 dark:bg-background-dark md:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-primary">
              <div className="size-6">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                EduStream
              </h2>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <a
                className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300"
                href="#"
              >
                Courses
              </a>
              <a
                className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300"
                href="#"
              >
                Mentors
              </a>
              <a
                className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300"
                href="#"
              >
                Pricing
              </a>
              <a
                className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300"
                href="#"
              >
                About
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <label className="hidden h-10 min-w-40 max-w-64 flex-col lg:flex">
              <div className="flex h-full w-full flex-1 items-stretch overflow-hidden rounded-lg border border-primary/20">
                <div className="flex items-center justify-center bg-white pl-4 text-slate-500 dark:bg-slate-800">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  className="form-input h-full w-full min-w-0 flex-1 border-none bg-white px-4 pl-2 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-0 focus:ring-0 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="Search courses..."
                />
              </div>
            </label>
            {isExplore ? (
              <Link
                className="flex h-10 min-w-[140px] cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90"
                to="/dashboard"
              >
                <span className="truncate">Back to Dashboard</span>
              </Link>
            ) : (
              <button
                className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90"
                onClick={onOpenLogin}
                type="button"
              >
                <span className="truncate">Sign In</span>
              </button>
            )}
            <div
              className="size-10 aspect-square rounded-full border-2 border-primary/20 bg-cover bg-center bg-no-repeat"
              data-alt="User profile avatar placeholder"
              style={{
                backgroundImage: `url("${DEFAULT_AVATAR_URL}")`,
              }}
            />
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 md:px-10">
          {isExplore ? (
            <section className="space-y-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Explore Courses
                  </span>
                  <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl lg:text-5xl">
                    Discover courses built for ambitious learners
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Curated skill paths, hands-on projects, and verified certificates to help you level up fast.
                  </p>
                </div>
                <div className="w-full max-w-md rounded-2xl border border-primary/10 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                    <span className="material-symbols-outlined text-slate-500">search</span>
                    <input
                      className="w-full border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-0 focus:ring-0 dark:text-slate-100"
                      placeholder="Search for AI, cybersecurity, data analytics..."
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                      Beginner
                    </span>
                    <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                      Intermediate
                    </span>
                    <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                      Under $70
                    </span>
                    <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                      Certificates
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <aside className="space-y-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Filter by</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">Categories</h3>
                  </div>
                  <div className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>AI & Machine Learning</span>
                      <span className="text-xs text-slate-400">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data Analytics</span>
                      <span className="text-xs text-slate-400">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cybersecurity</span>
                      <span className="text-xs text-slate-400">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Prompt Engineering</span>
                      <span className="text-xs text-slate-400">9</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Business</span>
                      <span className="text-xs text-slate-400">20</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-primary/5 px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
                    Upgrade to Premium to unlock advanced filters and mentor sessions.
                  </div>
                </aside>

                <div className="lg:col-span-3">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Popular Courses</h2>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Handpicked tracks for fast career growth.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                      Sort by: Most Popular
                      <span className="material-symbols-outlined text-base">expand_more</span>
                    </div>
                  </div>

                  {exploreError ? (
                    <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {exploreError}
                    </div>
                  ) : null}

                  {exploreLoading ? (
                    <div className="rounded-xl border border-slate-100 bg-white px-6 py-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                      Loading courses...
                    </div>
                  ) : exploreCourses.length ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {exploreCourses.map((course) => {
                        const meta = getExploreMeta(course.title);
                        const rating = course.rating ?? meta?.rating ?? 4.7;
                        const reviews = course.reviews ?? meta?.reviews ?? "1.2k";
                        const price = course.price ?? meta?.price ?? "$49";
                        const badge = course.badge ?? meta?.badge ?? "Course";
                        const provider = meta?.provider ?? "Lumina Learn";
                        const level = course.level || meta?.level || "Beginner";
                        const image = course.image_url || meta?.image || DEFAULT_COURSE_IMAGE;
                        const summary = course.summary || meta?.summary || "Hands-on learning with real projects.";

                        return (
                          <div
                            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                            key={course.id || course.title}
                          >
                            <div className="relative">
                              <div
                                className="h-40 w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                data-alt={`${course.title} course cover`}
                                style={{ backgroundImage: `url("${image}")` }}
                              />
                              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                                {badge}
                              </span>
                            </div>
                            <div className="flex flex-1 flex-col gap-3 px-5 py-4">
                              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                <span className="font-semibold text-primary">{provider}</span>
                                <span>{level}</span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{course.title}</h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{summary}</p>
                              <div className="flex items-center gap-2 text-amber-500">
                                <span className="material-symbols-outlined fill-1 text-base">star</span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                  {rating}
                                </span>
                                <span className="text-xs text-slate-400">({reviews} reviews)</span>
                              </div>
                              <div className="mt-auto flex items-center justify-between">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{price}</p>
                                <button
                                  className="rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
                                  type="button"
                                >
                                  View details
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses found</h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Add the sample courses to populate the explore catalog.
                      </p>
                      <button
                        className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                        type="button"
                        onClick={handleSeedExploreCourses}
                        disabled={exploreSeeding}
                      >
                        {exploreSeeding ? "Adding courses..." : "Add Sample Courses"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ) : null}
          {!isExplore ? (
            <>
              <section className="@container mb-12">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
              <div
                className="aspect-video w-full rounded-xl bg-cover bg-center bg-no-repeat shadow-lg lg:flex-1"
                data-alt="Students collaborating on laptops in a modern workspace"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgrma5gsto7nvWlEMKkDvarb8BrWnVW-FuRtCHi-Nfd8t3Is1L0vCTBLP86x_DGSbl0d-VsO47yH-vEPcXNbywHQG7YuQIzCrVdU6IbhFF3rxTms0PMGTuxwzFZ5NrTSAvJ5zNd3QHonQRrgWkuATTmIwSH6h4Q2rQJxm7pcS2GZBf3XsClw_cPPhvrqrMj5IQDqKY8mmyZ6RNfR83f81EJTIYGt0rhFJ6jDwuyyDhpnnK5-qtQ8Gy8M0_uDG2lxyND5YCVm_i9ub4")',
                }}
              />
              <div className="flex flex-col gap-8 lg:w-1/2 lg:justify-center lg:pl-8">
                <div className="flex flex-col gap-4">
                  <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    New Teal Workspace
                  </span>
                  <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl lg:text-6xl">
                    Master New Skills with <span className="text-primary">Expert-Led</span> Courses
                  </h1>
                  <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
                    Join over 5,000 students learning data science, design, and business in our new teal-themed
                    workspace. Professional growth starts here.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white shadow-md transition-all hover:bg-primary/90">
                    <span className="truncate">Explore Courses</span>
                  </button>
                  <button className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-lg border-2 border-primary/20 bg-white px-6 text-base font-bold text-slate-900 transition-all hover:bg-primary/5 dark:bg-slate-800 dark:text-slate-100">
                    <span className="truncate">Apply Now</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
                Featured Courses
              </h2>
              <a className="flex items-center gap-1 font-semibold text-primary hover:underline" href="#">
                View all <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-primary/5 bg-white p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md dark:bg-slate-800">
                <div className="relative overflow-hidden rounded-lg">
                  <div
                    className="aspect-video w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    data-alt="UI UX design interface on a screen"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjWJkbPwNcwJO-Di_BZ8eA-KOfm8AruzxC721Ty3d_qNYxsGHWnImhfZ8iE41cNRyknvZvieuCne8u7g9lpDz5-AKCoScjQzHFVmQj-e_BqBvJHu5tiyE8Ia1QGw4UXqyjZAsN6cspch-P_NrWVdsODIV4s1AzwBQwboIspm_WBqDW4wSGJvlacAUGq0EAZoMgZDJD-_5IvVeMuQa9_mej3-0B4NYNOua1s8KNjfnYo70PE3zOd8fUNh_DAoyEMPp9GNXKrPDtr_QT")',
                    }}
                  />
                  <div className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm dark:bg-slate-900/90">
                    Best Seller
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-normal text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                    UI/UX Design Mastery
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-bold text-primary">$49.99</span>
                    <span className="text-sm text-slate-400 line-through">$79.99</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-amber-500">
                    <span className="material-symbols-outlined fill-1 text-sm">star</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">4.8 (1.2k reviews)</span>
                  </div>
                </div>
              </div>

              <div className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-primary/5 bg-white p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md dark:bg-slate-800">
                <div className="relative overflow-hidden rounded-lg">
                  <div
                    className="aspect-video w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    data-alt="Abstract data visualization charts"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9P-jlQoMxV29PVUdfgRYH9TkLbPF7Dg16uKUPPkUshmejgINd32z99ovtALROaROPGkTiBhXa-6Zi_94zOMW7N9NoA_vJhkgI4p3F6NnGSgeXycEnlWphTbsu5_Hq2Fk8sFF5iDwUDzqcr1elh7oayxSPUzuxXYMCsd-5DSJgMsOzYs71kV-XPO-UFviLqfU2Gsvsq8Y9prvHA1Ebo-ZtW-1-YRNCltoYz0adQLAAWO9o6pV0mbHqBOjLIwMz58Y_3WF_Wmw_PtUT")',
                    }}
                  />
                  <div className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm dark:bg-slate-900/90">
                    Advanced
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-normal text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                    Advanced Data Science
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-bold text-primary">$89.99</span>
                    <span className="text-sm text-slate-400 line-through">$129.99</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-amber-500">
                    <span className="material-symbols-outlined fill-1 text-sm">star</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">4.9 (850 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-primary/5 bg-white p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md dark:bg-slate-800">
                <div className="relative overflow-hidden rounded-lg">
                  <div
                    className="aspect-video w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    data-alt="Marketing analytics dashboard"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7Il5q4oAUChU-Nb4GBFuKFIIhu0YGJsziH4L22XOO3WhObcgrbadEzeuE0NSeUv2fh2arCPf0gQ25iO-Rcv_gHLIIxBsBhsGg40_aStJpA8UneAVJTaEGfeWjJGWZf-p50oxR3B3OlM4nT1FmzubwiH_TmbbPQKbdAI8GX1SH_DoWIMCf6ymw3IHO35TcFgwamqQTdIAM36E64GGWcFi1nx5xWdfpCyFiIVkAPDXp12ZYRQCFlqk7tHaGSA4ZYVdyNbkEpMMXxglK")',
                    }}
                  />
                  <div className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm dark:bg-slate-900/90">
                    Beginner
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-normal text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                    Digital Marketing 101
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-bold text-primary">$39.99</span>
                    <span className="text-sm text-slate-400 line-through">$59.99</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-amber-500">
                    <span className="material-symbols-outlined fill-1 text-sm">star</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">4.7 (2k reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 rounded-2xl bg-primary/5 px-8 py-12">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">Why Choose Us</h2>
              <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
                We provide the tools and mentorship needed to succeed in today's digital landscape.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-xl border border-primary/10 bg-white p-6 text-center shadow-sm dark:bg-slate-800">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <h4 className="mb-2 text-lg font-bold">Expert Instructors</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Learn from industry professionals with years of hands-on experience.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-primary/10 bg-white p-6 text-center shadow-sm dark:bg-slate-800">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-3xl">terminal</span>
                </div>
                <h4 className="mb-2 text-lg font-bold">Hands-on Learning</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Apply what you learn with real-world projects and collaborative coding.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-primary/10 bg-white p-6 text-center shadow-sm dark:bg-slate-800">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-3xl">group</span>
                </div>
                <h4 className="mb-2 text-lg font-bold">Vibrant Community</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Connect with peers and mentors in our exclusive student workspace.
                </p>
              </div>
            </div>
          </section>

              <section className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center text-white">
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">Ready to boost your career?</h2>
              <p className="max-w-xl text-lg text-white/80">
                Join the EduStream community today and get 20% off your first professional course.
              </p>
              <button className="flex h-14 min-w-[200px] cursor-pointer items-center justify-center rounded-lg bg-white px-8 text-lg font-black text-primary shadow-xl transition-all hover:bg-slate-100">
                <span className="truncate">Apply Now</span>
              </button>
            </div>
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              </section>
            </>
          ) : null}
        </main>

        <footer className="border-t border-primary/10 bg-white px-10 py-10 dark:bg-slate-900">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-slate-500 dark:text-slate-400 md:flex-row">
            <div className="flex items-center gap-3 text-primary">
              <div className="size-5">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100">EduStream</span>
            </div>
            <p className="text-sm">&copy; 2024 EduStream Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a className="transition-colors hover:text-primary" href="#">
                Privacy
              </a>
              <a className="transition-colors hover:text-primary" href="#">
                Terms
              </a>
              <a className="transition-colors hover:text-primary" href="#">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DashboardPage({ onSignOut, onOpenProfile, avatarUrl, session }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const resolvedAvatarUrl = avatarUrl || DEFAULT_AVATAR_URL;
  const [profileName, setProfileName] = useState({ firstName: "", lastName: "" });
  const [applications, setApplications] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [dashboardStatus, setDashboardStatus] = useState({ error: "" });
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [motivationMemo, setMotivationMemo] = useState("");
  const [applyError, setApplyError] = useState("");
  const [applySaving, setApplySaving] = useState(false);

  const applicationCount = applications.length;
  const normalizedStatus = (status) => status || "Pending";
  const activeCount = applications.filter(
    (application) => normalizedStatus(application.status) === "Accepted",
  ).length;
  const completedCount = applications.filter(
    (application) => normalizedStatus(application.status) === "Completed",
  ).length;
  const pendingCount = applications.filter((application) => {
    const status = normalizedStatus(application.status);
    return status === "Pending" || status === "In Review";
  }).length;

  const displayName = useMemo(() => {
    const name = `${profileName.firstName} ${profileName.lastName}`.trim();
    if (name) return name;
    if (session?.user?.email) return session.user.email;
    return "Student";
  }, [profileName.firstName, profileName.lastName, session?.user?.email]);

  const formatAppliedDate = (value) => {
    if (!value) return "—";
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(value));
    } catch {
      return "—";
    }
  };

  const statusTone = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500";
      case "Completed":
        return "bg-indigo-500";
      case "Rejected":
        return "bg-rose-500";
      case "In Review":
        return "bg-primary";
      case "Pending":
      default:
        return "bg-primary";
    }
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    if (onOpenProfile) {
      onOpenProfile();
    }
  };

  const handleSignOutClick = () => {
    setMenuOpen(false);
    onSignOut();
  };

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    let isActive = true;

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setProfileName({ firstName: "", lastName: "" });
      return () => {
        isActive = false;
      };
    }

    if (!session?.user) {
      setProfileName({ firstName: "", lastName: "" });
      return () => {
        isActive = false;
      };
    }

    setProfileName({ firstName: "", lastName: "" });

    supabase
      .from("profiles")
      .select("first_name,last_name")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!isActive) return;
        if (error || !data) {
          setProfileName({ firstName: "", lastName: "" });
          return;
        }
        setProfileName({
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
        });
      });

    return () => {
      isActive = false;
    };
  }, [session?.user]);

  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setDashboardStatus({ error: "Supabase environment variables are missing." });
      setApplications([]);
      setRecommended([]);
      setApplicationsLoading(false);
      setRecommendationsLoading(false);
      return;
    }

    if (!session?.user) {
      setDashboardStatus({ error: "" });
      setApplications([]);
      setRecommended([]);
      setApplicationsLoading(false);
      setRecommendationsLoading(false);
      return;
    }

    let isActive = true;
    const timeoutId = setTimeout(() => {
      if (!isActive) return;
      setApplicationsLoading(false);
      setRecommendationsLoading(false);
      setDashboardStatus((prev) =>
        prev.error ? prev : { error: "Dashboard request timed out. Please refresh." },
      );
    }, 8000);

    const loadDashboard = async () => {
      setDashboardStatus({ error: "" });
      setApplicationsLoading(true);
      setRecommendationsLoading(true);

      try {
        const { data: coursesData, error: coursesError } = await supabase
          .from("courses")
          .select("id,title,summary,level,duration_hours,rating,image_url,icon,slot_a_label,slot_b_label");

        if (!isActive) return;

        if (coursesError) {
          setDashboardStatus({ error: "Unable to load recommended courses." });
          setRecommended([]);
          setRecommendationsLoading(false);
        } else {
          setRecommended(coursesData || []);
          setRecommendationsLoading(false);
        }

        const { data: applicationData, error: applicationError } = await supabase
          .from("course_applications")
          .select(
            "id,status,applied_at,start_slot,motivation_memo,course:courses(id,title,summary,level,duration_hours,rating,image_url,icon,slot_a_label,slot_b_label)",
          )
          .eq("user_id", session.user.id)
          .order("applied_at", { ascending: false });

        if (!isActive) return;

        if (applicationError) {
          setDashboardStatus({ error: "Unable to load course applications." });
          setApplications([]);
          setApplicationsLoading(false);
          return;
        }

        const safeApplications = applicationData || [];
        const appliedCourseIds = safeApplications
          .map((application) => application.course?.id)
          .filter(Boolean);

        setApplications(safeApplications);
        setApplicationsLoading(false);

        if (appliedCourseIds.length > 0) {
          setRecommended((prev) => prev.filter((course) => !appliedCourseIds.includes(course.id)));
        }
      } catch {
        if (!isActive) return;
        setApplications([]);
        setRecommended([]);
        setDashboardStatus({ error: "Unable to load dashboard data." });
        setApplicationsLoading(false);
        setRecommendationsLoading(false);
      }
    };

    loadDashboard().finally(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [session?.user, refreshKey]);

  const openApplyModal = (course) => {
    setSelectedCourse(course);
    setSelectedSlot("");
    setMotivationMemo("");
    setApplyError("");
    setApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setApplyModalOpen(false);
    setSelectedCourse(null);
    setSelectedSlot("");
    setMotivationMemo("");
    setApplyError("");
    setApplySaving(false);
  };

  const handleApplySubmit = async (event) => {
    event.preventDefault();

    if (!selectedCourse) {
      setApplyError("Please select a course to apply.");
      return;
    }

    if (!selectedSlot) {
      setApplyError("Please select a start time.");
      return;
    }

    if (!motivationMemo.trim()) {
      setApplyError("Please tell us what motivates you to join.");
      return;
    }

    if (!session?.user) {
      setApplyError("Please sign in to apply.");
      return;
    }

    setApplySaving(true);
    setApplyError("");

    const { data, error } = await supabase
      .from("course_applications")
      .insert({
        user_id: session.user.id,
        course_id: selectedCourse.id,
        start_slot: Number(selectedSlot),
        motivation_memo: motivationMemo.trim(),
        status: "Pending",
      })
      .select("id,status,applied_at,start_slot,motivation_memo")
      .single();

    if (error) {
      setApplySaving(false);
      setApplyError(error.message || "Unable to submit your application.");
      return;
    }

    const newApplication = {
      ...data,
      course: selectedCourse,
    };

    setApplications((prev) => [newApplication, ...prev]);
    setRecommended((prev) => prev.filter((course) => course.id !== selectedCourse.id));
    closeApplyModal();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-background-dark md:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-primary">
              <div className="size-6">
                <span className="material-symbols-outlined text-3xl">database</span>
              </div>
              <Link
                className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white"
                to="/dashboard"
              >
                Lumina Learn
              </Link>
            </div>
            <nav className="hidden items-center gap-9 md:flex">
              <Link className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300" to="/profile">
                Profile
              </Link>
              <Link className="text-sm font-semibold text-primary" to="/dashboard">
                My Course
              </Link>
              <a className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300" href="#">
                Certificates
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-8">
            <label className="hidden h-10 min-w-40 max-w-64 flex-col sm:flex">
              <div className="flex h-full w-full flex-1 items-stretch rounded-lg bg-slate-100 dark:bg-slate-800">
                <div className="flex items-center justify-center pl-4 text-slate-500">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  className="form-input w-full min-w-0 flex-1 border-none bg-transparent text-sm placeholder:text-slate-500 focus:ring-0"
                  placeholder="Search courses..."
                />
              </div>
            </label>
            <div className="relative flex items-center">
              {menuOpen ? (
                <button
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                  aria-label="Close profile menu"
                />
              ) : null}
              <button
                className="relative z-50 flex items-center"
                onClick={() => setMenuOpen((value) => !value)}
                type="button"
                aria-label="Open profile menu"
              >
                <div
                  className="size-10 aspect-square rounded-full border-2 border-primary bg-cover bg-center bg-no-repeat"
                  data-alt="User profile picture of a young professional man"
                  style={{
                    backgroundImage: `url("${resolvedAvatarUrl}")`,
                  }}
                />
              </button>
              {menuOpen ? (
                <div className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <button
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    type="button"
                    onClick={handleProfileClick}
                  >
                    <span className="material-symbols-outlined text-lg">person</span>
                    Profile
                  </button>
                  <button
                    className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-50 dark:border-slate-800 dark:hover:bg-rose-500/10"
                    type="button"
                    onClick={handleSignOutClick}
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Sign Out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="flex flex-1 justify-center px-4 py-8 md:px-10 lg:px-40">
          <div className="layout-content-container flex max-w-[1200px] flex-1 flex-col">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              <aside className="flex flex-col gap-6 lg:col-span-1">
                <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-12 aspect-square rounded-full bg-cover bg-center bg-no-repeat"
                      data-alt="Alex Johnson profile photo"
                      style={{
                        backgroundImage: `url("${resolvedAvatarUrl}")`,
                      }}
                    />
                    <div className="flex flex-col">
                      <h1 className="text-base font-bold leading-normal text-slate-900 dark:text-white">
                        {displayName}
                      </h1>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Premium Member</p>
                    </div>
                  </div>
                  <hr className="my-2 border-slate-100 dark:border-slate-800" />
                  <nav className="flex flex-col gap-1">
                    <a className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2.5 text-white" href="#">
                      <span className="material-symbols-outlined text-xl">dashboard</span>
                      <p className="text-sm font-medium">Dashboard</p>
                    </a>
                    <a
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-xl">school</span>
                      <p className="text-sm font-medium">Courses</p>
                    </a>
                    <a
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-xl">chat</span>
                      <p className="text-sm font-medium">Messages</p>
                    </a>
                    <a
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-xl">settings</span>
                      <p className="text-sm font-medium">Settings</p>
                    </a>
                  </nav>
                </div>
              </aside>

              <main className="flex flex-col gap-6 lg:col-span-3">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                      Welcome back, {displayName}
                    </h2>
                    <p className="text-base font-normal text-slate-500 dark:text-slate-400">
                      Track your learning progress and current applications.
                    </p>
                  </div>
                  <Link
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                    to="/explore"
                  >
                    <span className="material-symbols-outlined text-lg">explore</span>
                    Browse More Courses
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Courses</p>
                      <span className="material-symbols-outlined text-primary">play_circle</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{activeCount}</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className="h-1.5 w-3/4 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Completed</p>
                      <span className="material-symbols-outlined text-primary">verified</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{completedCount}</p>
                    <p className="text-xs font-semibold text-primary">+2 this month</p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Applications</p>
                      <span className="material-symbols-outlined text-primary">description</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{applicationCount}</p>
                    <p className="text-xs font-semibold text-slate-400">
                      {pendingCount ? `${pendingCount} awaiting review` : "No pending reviews"}
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5 dark:border-slate-800 dark:bg-slate-900">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Course Applications</h3>
                    <button className="text-sm font-semibold text-primary hover:underline" type="button">
                      View All
                    </button>
                  </div>
                  {dashboardStatus.error ? (
                    <div className="px-6 py-4 text-sm text-rose-600">{dashboardStatus.error}</div>
                  ) : null}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead className="bg-accent-light/20 dark:bg-primary/10">
                        <tr>
                          <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Course Name
                          </th>
                          <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Applied Date
                          </th>
                          <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Status
                          </th>
                          <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {applicationsLoading ? (
                          <tr>
                            <td className="px-6 py-6 text-sm text-slate-500 dark:text-slate-400" colSpan={4}>
                              Loading applications...
                            </td>
                          </tr>
                        ) : applications.length ? (
                          applications.map((application) => (
                            <tr
                              className="transition-colors hover:bg-accent-light/10 dark:hover:bg-primary/5"
                              key={application.id}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex size-8 items-center justify-center rounded bg-primary/20 text-primary">
                                    <span className="material-symbols-outlined text-lg">
                                      {application.course?.icon || "school"}
                                    </span>
                                  </div>
                                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {application.course?.title || "Untitled course"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                {formatAppliedDate(application.applied_at)}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${statusTone(
                                    normalizedStatus(application.status),
                                  )}`}
                                >
                                  {normalizedStatus(application.status)}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <button className="text-slate-400 transition-colors hover:text-primary" type="button">
                                  <span className="material-symbols-outlined">more_horiz</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="px-6 py-6 text-sm text-slate-500 dark:text-slate-400" colSpan={4}>
                              No applications yet. Apply to a course to get started.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recommended for You</h3>
                    <button
                      className="text-xs font-semibold text-primary hover:underline"
                      type="button"
                      onClick={triggerRefresh}
                    >
                      Reload
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {recommendationsLoading ? (
                      <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                        Loading recommendations...
                      </div>
                    ) : recommended.length ? (
                      recommended.map((course) => (
                        <div
                          className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-slate-100 bg-white p-4 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                          key={course.id}
                        >
                          <div className="flex gap-4">
                            <div
                              className="size-24 shrink-0 rounded-lg bg-cover bg-center"
                              data-alt={course.title}
                              style={{
                                backgroundImage: `url("${course.image_url || DEFAULT_COURSE_IMAGE}")`,
                              }}
                            />
                            <div className="flex flex-1 flex-col justify-between py-1">
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                                  {course.title}
                                </h4>
                                <p className="mt-1 text-xs text-slate-500">
                                  {course.duration_hours ? `${course.duration_hours} hours` : "Flexible hours"}{" "}
                                  {course.level ? `- ${course.level}` : ""}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 text-primary">
                                <span className="material-symbols-outlined text-sm">star</span>
                                <span className="text-xs font-bold">{course.rating ?? "4.8"}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            className="flex h-10 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-white transition-all hover:bg-primary/90"
                            type="button"
                            onClick={() => openApplyModal(course)}
                          >
                            Apply
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                        You’re all caught up. No new recommendations right now.
                      </div>
                    )}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {applyModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8 backdrop-blur-sm"
          onClick={closeApplyModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Course Application</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedCourse?.title}</h3>
              </div>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                onClick={closeApplyModal}
                type="button"
                aria-label="Close application modal"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <form className="space-y-6 px-6 py-6" onSubmit={handleApplySubmit}>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Preferred start time</p>
                <div className="mt-3 grid gap-3">
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-primary/60 dark:border-slate-800 dark:text-slate-200">
                    <input
                      checked={selectedSlot === "1"}
                      className="h-4 w-4 text-primary"
                      name="start_slot"
                      type="radio"
                      value="1"
                      onChange={(event) => setSelectedSlot(event.target.value)}
                      disabled={applySaving}
                    />
                    <span>{selectedCourse?.slot_a_label || "10 AM - 13 PM"}</span>
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-primary/60 dark:border-slate-800 dark:text-slate-200">
                    <input
                      checked={selectedSlot === "2"}
                      className="h-4 w-4 text-primary"
                      name="start_slot"
                      type="radio"
                      value="2"
                      onChange={(event) => setSelectedSlot(event.target.value)}
                      disabled={applySaving}
                    />
                    <span>{selectedCourse?.slot_b_label || "15 PM - 18 PM"}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-white">
                  What motivates you to join this course? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  rows={4}
                  placeholder="Share your goals or what you hope to learn."
                  value={motivationMemo}
                  onChange={(event) => setMotivationMemo(event.target.value)}
                  disabled={applySaving}
                />
              </div>

              {applyError ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {applyError}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  className="h-10 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  type="button"
                  onClick={closeApplyModal}
                  disabled={applySaving}
                >
                  Cancel
                </button>
                <button
                  className="flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                  type="submit"
                  disabled={applySaving}
                >
                  {applySaving ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProfilePage({ onSignOut, session, onAvatarChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatarUrl: "",
    street1: "",
    street2: "",
    city: "",
    state: "CA",
    zip: "",
  });
  const [profileStatus, setProfileStatus] = useState({ type: "", message: "" });
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState({ type: "", message: "" });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const completion = useMemo(() => {
    const requiredValues = [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.phone,
      profile.street1,
      profile.city,
      profile.state,
      profile.zip,
    ];
    const filled = requiredValues.filter((value) => value && value.trim().length > 0).length;
    return Math.round((filled / requiredValues.length) * 100);
  }, [profile]);

  const displayName = useMemo(() => {
    const name = `${profile.firstName} ${profile.lastName}`.trim();
    return name.length ? name : "Your Profile";
  }, [profile.firstName, profile.lastName]);

  const displayEmail = profile.email || session?.user?.email || "your@email.com";
  const resolvedAvatarUrl = profile.avatarUrl || DEFAULT_AVATAR_URL;

  const handleSignOutClick = () => {
    setMenuOpen(false);
    onSignOut();
  };

  const togglePasswordPanel = () => {
    setShowPasswordPanel((value) => {
      const nextValue = !value;
      if (!nextValue) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordStatus({ type: "", message: "" });
      }
      return nextValue;
    });
  };

  useEffect(() => {
    let isActive = true;

    const loadProfile = async () => {
      if (!session?.user) {
        setProfileLoading(false);
        return;
      }

      setProfileLoading(true);
      setProfileStatus({ type: "", message: "" });

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name,last_name,email,phone,avatar_url,street1,street2,city,state,zip")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!isActive) return;

      if (error) {
        setProfileStatus({
          type: "error",
          message: "Unable to load your profile. Please try again.",
        });
      } else if (data) {
        setProfile({
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          email: data.email ?? session.user.email ?? "",
          phone: data.phone ?? "",
          avatarUrl: data.avatar_url ?? "",
          street1: data.street1 ?? "",
          street2: data.street2 ?? "",
          city: data.city ?? "",
          state: data.state ?? "CA",
          zip: data.zip ?? "",
        });
        if (onAvatarChange) {
          onAvatarChange(data.avatar_url ?? "");
        }
      } else {
        setProfile((prev) => ({
          ...prev,
          email: session.user.email ?? "",
        }));
        if (onAvatarChange) {
          onAvatarChange("");
        }
      }

      setProfileLoading(false);
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, [session?.user]);

  const handleProfileChange = (field) => (event) => {
    const { value } = event.target;
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileStatus({ type: "", message: "" });

    if (!session?.user) {
      setProfileStatus({ type: "error", message: "Please sign in to update your profile." });
      return;
    }

    const requiredFields = [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "email", label: "Email Address" },
      { key: "phone", label: "Phone Number" },
      { key: "street1", label: "Street 1" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "zip", label: "Zip Code" },
    ];

    const missing = requiredFields.filter((field) => !profile[field.key]?.trim());
    if (missing.length) {
      setProfileStatus({
        type: "error",
        message: `Please complete: ${missing.map((field) => field.label).join(", ")}.`,
      });
      return;
    }

    setProfileSaving(true);

    const normalizedEmail = profile.email.trim();
    const currentEmail = session.user.email;
    const emailChanged = currentEmail && normalizedEmail !== currentEmail;

    if (emailChanged) {
      const { error } = await supabase.auth.updateUser({ email: normalizedEmail });
      if (error) {
        setProfileSaving(false);
        setProfileStatus({
          type: "error",
          message: error.message || "Unable to update your email. Please try again.",
        });
        return;
      }
    }

    const { error } = await supabase.from("profiles").upsert(
      {
        id: session.user.id,
        first_name: profile.firstName.trim(),
        last_name: profile.lastName.trim(),
        email: normalizedEmail,
        phone: profile.phone.trim(),
        avatar_url: profile.avatarUrl || null,
        street1: profile.street1.trim(),
        street2: profile.street2.trim() || null,
        city: profile.city.trim(),
        state: profile.state.trim() || "CA",
        zip: profile.zip.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    if (error) {
      setProfileStatus({
        type: "error",
        message: error.message || "Unable to save your profile. Please try again.",
      });
    } else {
      setProfileStatus({
        type: "success",
        message: emailChanged
          ? "Profile saved. Please check your inbox to confirm the new email."
          : "Profile saved successfully.",
      });
      if (onAvatarChange) {
        onAvatarChange(profile.avatarUrl || "");
      }
    }

    setProfileSaving(false);
  };

  const handlePasswordUpdate = async () => {
    setPasswordStatus({ type: "", message: "" });

    if (!session?.user) {
      setPasswordStatus({ type: "error", message: "Please sign in to update your password." });
      return;
    }

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordStatus({ type: "error", message: "Please fill in all password fields." });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordStatus({ type: "error", message: "New passwords do not match." });
      return;
    }

    const emailForReauth = session.user.email || profile.email.trim();
    if (!emailForReauth) {
      setPasswordStatus({ type: "error", message: "Unable to verify your email for re-auth." });
      return;
    }

    setPasswordSaving(true);

    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: emailForReauth,
      password: currentPassword,
    });

    if (reauthError) {
      setPasswordSaving(false);
      setPasswordStatus({ type: "error", message: "Current password is incorrect." });
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
      setPasswordStatus({
        type: "error",
        message: updateError.message || "Unable to update your password. Please try again.",
      });
    } else {
      setPasswordStatus({ type: "success", message: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordPanel(false);
    }

    setPasswordSaving(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-background-dark md:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-primary">
              <div className="size-6">
                <span className="material-symbols-outlined text-3xl">database</span>
              </div>
              <Link
                className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white"
                to="/dashboard"
              >
                Lumina Learn
              </Link>
            </div>
            <nav className="hidden items-center gap-9 md:flex">
              <Link className="text-sm font-semibold text-primary" to="/profile">
                Profile
              </Link>
              <Link className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300" to="/dashboard">
                My Course
              </Link>
              <a className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300" href="#">
                Certificates
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-8">
            <label className="hidden h-10 min-w-40 max-w-64 flex-col sm:flex">
              <div className="flex h-full w-full flex-1 items-stretch rounded-lg bg-slate-100 dark:bg-slate-800">
                <div className="flex items-center justify-center pl-4 text-slate-500">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  className="form-input w-full min-w-0 flex-1 border-none bg-transparent text-sm placeholder:text-slate-500 focus:ring-0"
                  placeholder="Search settings..."
                />
              </div>
            </label>
            <div className="relative flex items-center">
              {menuOpen ? (
                <button
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                  aria-label="Close profile menu"
                />
              ) : null}
              <button
                className="relative z-50 flex items-center"
                onClick={() => setMenuOpen((value) => !value)}
                type="button"
                aria-label="Open profile menu"
              >
                <div
                  className="size-10 aspect-square rounded-full border-2 border-primary bg-cover bg-center bg-no-repeat"
                  data-alt="User profile picture of a young professional man"
                  style={{
                    backgroundImage: `url("${resolvedAvatarUrl}")`,
                  }}
                />
              </button>
              {menuOpen ? (
                <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                    <div
                      className="size-10 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url("${resolvedAvatarUrl}")`,
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{displayName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Student</p>
                    </div>
                  </div>
                  <div className="flex flex-col py-2">
                    <Link
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                      to="/profile"
                    >
                      <span className="material-symbols-outlined text-lg">person</span>
                      Profile
                    </Link>
                    <button
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-50/60 dark:hover:bg-rose-500/10"
                      type="button"
                      onClick={handleSignOutClick}
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 md:px-10">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Profile</h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Keep your personal details and contact info up to date.
              </p>
            </div>
            <button
              className="flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90"
              type="submit"
              form="profile-form"
              disabled={profileSaving || profileLoading}
            >
              {profileSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <div
                  className="size-16 rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${resolvedAvatarUrl}")`,
                  }}
                />
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{displayName}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{displayEmail}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-slate-700 dark:text-slate-200">
                  Profile completion <span className="font-semibold text-primary">{completion}%</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  Tip: Keep your address current for certificate delivery.
                </div>
              </div>
            </section>

            <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <form className="space-y-8" id="profile-form" onSubmit={handleProfileSubmit}>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal details</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    This information appears on your learning certificates.
                  </p>
                </div>
                {profileLoading ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    Loading your profile...
                  </div>
                ) : null}
                {profileStatus.message ? (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      profileStatus.type === "error"
                        ? "border-rose-200 bg-rose-50 text-rose-700"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {profileStatus.message}
                  </div>
                ) : null}

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile photo</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Choose an avatar to personalize your profile.
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {PRESET_AVATAR_URLS.map((url) => {
                      const isSelected = resolvedAvatarUrl === url;
                      return (
                        <button
                          key={url}
                          className={`relative flex items-center justify-center rounded-full p-0.5 transition ${
                            isSelected
                              ? "ring-2 ring-primary"
                              : "ring-1 ring-slate-200 hover:ring-primary/40 dark:ring-slate-700"
                          }`}
                          type="button"
                          onClick={() => setProfile((prev) => ({ ...prev, avatarUrl: url }))}
                          disabled={profileLoading || profileSaving}
                          aria-pressed={isSelected}
                        >
                          <span className="sr-only">Select avatar</span>
                          <div
                            className="size-14 rounded-full bg-cover bg-center"
                            style={{ backgroundImage: `url("${url}")` }}
                          />
                          {isSelected ? (
                            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white shadow-sm">
                              <span className="material-symbols-outlined text-[12px]">check</span>
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center">
                      First Name <span className="ml-1 text-rose-500">*</span>
                    </span>
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="Alex"
                      type="text"
                      value={profile.firstName}
                      onChange={handleProfileChange("firstName")}
                      disabled={profileLoading || profileSaving}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center">
                      Last Name <span className="ml-1 text-rose-500">*</span>
                    </span>
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="Johnson"
                      type="text"
                      value={profile.lastName}
                      onChange={handleProfileChange("lastName")}
                      disabled={profileLoading || profileSaving}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center">
                      Email Address <span className="ml-1 text-rose-500">*</span>
                    </span>
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="alexj@company.com"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange("email")}
                      disabled={profileLoading || profileSaving}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center">
                      Phone Number <span className="ml-1 text-rose-500">*</span>
                    </span>
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="(415) 555-0134"
                      type="tel"
                      value={profile.phone}
                      onChange={handleProfileChange("phone")}
                      disabled={profileLoading || profileSaving}
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Password</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Update your password for this account.
                      </p>
                    </div>
                    <button
                      className="text-xs font-semibold text-primary"
                      type="button"
                      onClick={togglePasswordPanel}
                    >
                      {showPasswordPanel ? "Hide" : "Change Password"}
                    </button>
                  </div>
                  {showPasswordPanel ? (
                    <div className="mt-4 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          <span className="inline-flex items-center">
                            Current Password <span className="ml-1 text-rose-500">*</span>
                          </span>
                        <input
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                          placeholder="********"
                          type="password"
                          value={currentPassword}
                          onChange={(event) => setCurrentPassword(event.target.value)}
                          disabled={passwordSaving}
                        />
                      </label>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="inline-flex items-center">
                          New Password <span className="ml-1 text-rose-500">*</span>
                        </span>
                        <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 dark:border-slate-800 dark:bg-slate-900">
                          <input
                            className="w-full border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-0 dark:text-slate-100"
                            placeholder="Create a new password"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            disabled={passwordSaving}
                          />
                          <button
                            className="text-slate-400 transition hover:text-slate-600"
                            type="button"
                            onClick={() => setShowNewPassword((value) => !value)}
                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                            disabled={passwordSaving}
                          >
                            <span className="material-symbols-outlined text-base">visibility</span>
                          </button>
                        </div>
                      </label>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 sm:col-span-2">
                        <span className="inline-flex items-center">
                          Confirm New Password <span className="ml-1 text-rose-500">*</span>
                        </span>
                        <input
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                          placeholder="Re-enter new password"
                          type="password"
                          value={confirmNewPassword}
                          onChange={(event) => setConfirmNewPassword(event.target.value)}
                          disabled={passwordSaving}
                        />
                      </label>
                      </div>
                      {passwordStatus.message ? (
                        <div
                          className={`rounded-xl border px-4 py-3 text-xs ${
                            passwordStatus.type === "error"
                              ? "border-rose-200 bg-rose-50 text-rose-700"
                              : "border-emerald-200 bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {passwordStatus.message}
                        </div>
                      ) : null}
                      <button
                        className="flex h-10 w-full items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 sm:w-auto sm:px-6"
                        type="button"
                        onClick={handlePasswordUpdate}
                        disabled={passwordSaving}
                      >
                        {passwordSaving ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  ) : null}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Address</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    We currently support addresses within California.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 sm:col-span-2">
                    <span className="inline-flex items-center">
                      Street 1 <span className="ml-1 text-rose-500">*</span>
                    </span>
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="123 Market Street"
                      type="text"
                      value={profile.street1}
                      onChange={handleProfileChange("street1")}
                      disabled={profileLoading || profileSaving}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 sm:col-span-2">
                    Street 2 (Optional)
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="Suite 400"
                      type="text"
                      value={profile.street2}
                      onChange={handleProfileChange("street2")}
                      disabled={profileLoading || profileSaving}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center">
                      City <span className="ml-1 text-rose-500">*</span>
                    </span>
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="San Francisco"
                      type="text"
                      value={profile.city}
                      onChange={handleProfileChange("city")}
                      disabled={profileLoading || profileSaving}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center">
                      State (California only) <span className="ml-1 text-rose-500">*</span>
                    </span>
                    <select
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      value={profile.state}
                      onChange={handleProfileChange("state")}
                      disabled={profileLoading || profileSaving}
                    >
                      <option value="CA">CA - California</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center">
                      Zip Code <span className="ml-1 text-rose-500">*</span>
                    </span>
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary/40 focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="94103"
                      type="text"
                      value={profile.zip}
                      onChange={handleProfileChange("zip")}
                      disabled={profileLoading || profileSaving}
                    />
                  </label>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Changes will take effect immediately after saving.
                  </p>
                  <button
                    className="flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90"
                    type="submit"
                    disabled={profileSaving || profileLoading}
                  >
                    {profileSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function RequireAuth({ isAuthenticated, isReady, children }) {
  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const isLanding = location.pathname === "/";

  useEffect(() => {
    if (!showLogin) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLogin]);

  useEffect(() => {
    let isMounted = true;

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setAuthError("Supabase environment variables are missing. Please add them and refresh.");
      setAuthReady(true);
      return () => {
        isMounted = false;
      };
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return;
      if (error) {
        setAuthError("Unable to connect to authentication. Please check your settings.");
        setAuthReady(true);
        return;
      }

      setSession(data.session);
      setIsAuthenticated(Boolean(data.session));
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsAuthenticated(Boolean(nextSession));
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setAvatarUrl("");
      return;
    }

    if (!session?.user) {
      setAvatarUrl("");
      return;
    }

    let isActive = true;

    supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!isActive || error) return;
        setAvatarUrl(data?.avatar_url ?? "");
      });

    return () => {
      isActive = false;
    };
  }, [session?.user]);

  const openLogin = () => {
    setAuthError("");
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
    setAuthError("");
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setAuthError("Please enter both email and password.");
      return;
    }

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setAuthError("Supabase environment variables are missing. Please add them and retry.");
      return;
    }

    setAuthBusy(true);
    setAuthError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) {
      setAuthError(error.message || "Invalid email or password. Please try again.");
      setAuthBusy(false);
      return;
    }

    setShowPassword(false);
    closeLogin();
    setAuthBusy(false);
    navigate("/dashboard");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setShowLogin(false);
    setShowPassword(false);
    setEmail("");
    setPassword("");
    setAuthError("");
    navigate("/");
  };

  return (
    <div className="bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <Routes>
        <Route path="/" element={<LandingPage onOpenLogin={openLogin} />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth isAuthenticated={isAuthenticated} isReady={authReady}>
              <DashboardPage
                onSignOut={handleSignOut}
                onOpenProfile={() => navigate("/profile")}
                avatarUrl={avatarUrl}
                session={session}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/explore"
          element={
            <RequireAuth isAuthenticated={isAuthenticated} isReady={authReady}>
              <LandingPage variant="explore" />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth isAuthenticated={isAuthenticated} isReady={authReady}>
              <ProfilePage
                onSignOut={handleSignOut}
                session={session}
                onAvatarChange={setAvatarUrl}
              />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
      </Routes>

      {showLogin && isLanding ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8 backdrop-blur-sm"
          onClick={closeLogin}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-xl">shield</span>
                </div>
                <div className="text-sm font-semibold text-slate-900">Portal Access</div>
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:text-slate-700"
                onClick={closeLogin}
                type="button"
                aria-label="Close login dialog"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form className="px-6 py-8" onSubmit={handleLoginSubmit}>
              <h3 className="text-3xl font-black text-slate-900">Welcome Back</h3>
              <p className="mt-2 text-sm text-slate-500">
                Enter your credentials to access your secure dashboard
              </p>

              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-800" htmlFor="login-email">
                  Email Address
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-primary/20 bg-white px-4 py-3 shadow-sm">
                  <span className="material-symbols-outlined text-base text-slate-400">mail</span>
                  <input
                    className="w-full border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-0 focus:ring-0"
                    id="login-email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    disabled={authBusy}
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-800" htmlFor="login-password">
                    Password
                  </label>
                  <button className="text-xs font-semibold text-primary" type="button">
                    Forgot?
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-primary/20 bg-white px-4 py-3 shadow-sm">
                  <span className="material-symbols-outlined text-base text-slate-400">lock</span>
                  <input
                    className="w-full border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-0 focus:ring-0"
                    id="login-password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    disabled={authBusy}
                  />
                  <button
                    className="text-slate-400 transition hover:text-slate-600"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={authBusy}
                  >
                    <span className="material-symbols-outlined text-base">visibility</span>
                  </button>
                </div>
              </div>

              {authError ? <p className="mt-3 text-xs font-semibold text-rose-500">{authError}</p> : null}

              <button
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-white shadow-lg transition-all hover:bg-primary/90"
                type="submit"
                disabled={authBusy}
              >
                {authBusy ? "Signing In..." : "Sign In"}{" "}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px w-full bg-slate-200"></div>
                <span className="tracking-[0.2em]">OR CONTINUE WITH</span>
                <div className="h-px w-full bg-slate-200"></div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm"
                  type="button"
                >
                  <span className="text-lg font-black text-rose-500">G</span> Google
                </button>
                <button
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base text-primary">badge</span> SSO
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-slate-500">
                Don't have an account? <span className="font-semibold text-primary">Create an account</span>
              </p>
            </form>

            <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              All systems operational
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
