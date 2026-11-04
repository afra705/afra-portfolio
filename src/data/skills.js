// status: "established" | "learning" — edit honestly; learning items get a badge.
const E = "established", L = "learning";
const s = (names, status = E) => names.map((name) => ({ name, status }));
export const skillGroups = [
  { title: "Frontend Development", items: s(["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Responsive Web Design"]) },
  { title: "Backend Development", items: [...s(["REST APIs"]), ...s(["Node.js", "Express.js", "MongoDB"], L)] },
  { title: "Development Tools", items: s(["Git", "GitHub", "VS Code", "npm", "Postman"]) },
  { title: "Additional Technical Skills", items: s(["TypeScript", "Authentication", "API Integration", "CRUD Operations", "State Management", "Problem Solving"]) },
{
  title: "Digital Marketing",
  items: [
    ...s(["Canva Graphic Design"]),
    ...s(["Video Editing with CapCut"]),
    ...s(["Social Media Management"]),
    ...s(["Social Media Content Creation"]),
    ...s(["Social Media Optimization (SMO)"]),
    ...s(["Social Media Marketing (SMM)"]),
    ...s(["Search Engine Optimization (SEO)"]),
    ...s(["Content Marketing"]),
    ...s(["Keyword Research"]),
    ...s(["Digital Marketing Analytics"], L)
  ]
}
];
