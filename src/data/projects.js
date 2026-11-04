// Single source of truth for every project (homepage, /projects, /projects/:id).
// Fields marked TODO are intentionally empty: fill them with your real notes.
export const projects = [
  {
    id: "fitlog",
    aliases: ["fitlog-kora"], // /projects/fitlog-kora redirects to /projects/fitlog
    name: "Fitlog ",
    type: "Fitness Web Application",
    description:
      "A fitness-focused web application designed to provide an interactive and user-friendly experience for fitness-related activities.",
    image: "/images/projects/1 (1).png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "DaisyUI", "React Icons", "React Toastify"],
    category: ["Frontend", "React", "Next.js"],
    featured: true,
    overview:
      "FitLog is a workout library web application. Visitors can browse exercises, open detailed information for each one, save favourites and build a personal workout plan.",
    problem: "", // TODO
    features: [
      "Workout library with duration, muscle groups, difficulty, equipment and calories burned",
      "Detail view for each exercise with description and instructions",
      "Save favourite workouts for later",
      "Personalised workout plan",
      "Toast notifications for user actions",
      "Responsive layout for mobile, tablet and desktop",
    ],
    role: "", // TODO
    challenges: [], // TODO
    solutions: [], // TODO
    lessons: [], // TODO
    improvements: [], // TODO
    futurePlans: [], // TODO
    liveUrl: "https://fitlog-by-ifti.vercel.app/",
    githubUrl: "https://github.com/afra705/Assigment-6",
  },
  {
    id: "bazar-dor",
    aliases: [],
    name: "Bazar Dor (বাজার দর)",
    type: "Full-Stack Web Application",
    description:
      "A Bengali-language market price application that helps users explore everyday commodity prices through a localized and responsive interface.",
    image: "/images/projects/1 (2).png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Better Auth", "REST API",'hero ui',],
    category: ["Full Stack", "React", "Next.js"],
    featured: true,
    overview:
      "BazarDor is a market price tracking application for Bangladesh. Users can explore daily prices of essential products, compare prices across markets and see minimum, maximum and average prices to make informed purchasing decisions.",
    problem: "", // TODO
    features: [
      "Daily prices for essentials such as rice, lentils, oil, vegetables, fish, meat, eggs and spices",
      "Comparison of minimum and maximum prices across markets",
      "Price statistics: minimum, maximum and average",
      "Product categories and detailed price pages",
      "User sign up, sign in and profile management",
    ],
    role: "",
    challenges: [],
    solutions: [],
    lessons: [],
    improvements: [],
    futurePlans: [],
    liveUrl: "https://assigment-7-topaz.vercel.app/",
    githubUrl: "https://github.com/afra705/Assigment-7",
  },
  {
    id: "news-bulletin",
    aliases: [],
    name: "News-Bulletin",
    type: "News Web Application",
    description:
      "A news-focused web application designed to provide a structured and accessible news browsing experience.",
    image: "/images/projects/1(3).png",
    // Verify against the repo's package.json and adjust if needed.
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "DaisyUI", "React Icons", "React Toastify"],
    category: ["Frontend", "React", "Next.js"],
    featured: true,
    overview:
      "News-Bulletin is a news web application built with Next.js that gives readers a structured, accessible way to browse news.",
    problem: "",
    features: [], // TODO: the repo README is the default Next.js template, so list your real features here
    role: "",
    challenges: [],
    solutions: [],
    lessons: [],
    improvements: [],
    futurePlans: [],
    liveUrl: "https://news-bulletin-ten.vercel.app/",
    githubUrl: "https://github.com/afra705/Bangla-News-24",
  },
];

export const findProject = (id) =>
  projects.find((p) => p.id === id || p.aliases?.includes(id));
