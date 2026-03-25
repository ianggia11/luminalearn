import React from "react";

export default function IndexPage() {
  return (
    <div className="bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
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
              <button className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90">
                <span className="truncate">Sign In</span>
              </button>
              <div
                className="size-10 aspect-square rounded-full border-2 border-primary/20 bg-cover bg-center bg-no-repeat"
                data-alt="User profile avatar placeholder"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSdZ7G0R6YFYJohFweKw4u5Blu2RuGg1xnGC5_fTdwmKBMjujmR7kiib2OvD8dJae1Is7G8f4btJo6noIXB9d9dOWj6G8x-Sc58RrKMs38dceBdxVofYzjtLLUt3_Z6EWBfmBDiAifppHVLl5QbE2rcCODr4eUABOqY8u20CgsgacBdPEfPkA9cxVxeloCV5noG9WH_SvxLh-wF0sbsk2WKgPVVWcrFr5UA46eE6_DSWesk7mtlVusfXGy-8xqR-tLfzRf1gcZsSas")',
                }}
              />
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 md:px-10">
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
    </div>
  );
}
