export interface Skill {
  name: string;
  level: number;
}

export const skillCategories: { key: "backend" | "platform" | "practices"; skills: Skill[] }[] = [
  {
    key: "backend",
    skills: [
      { name: "Java", level: 85 },
      { name: "Kotlin", level: 70 },
      { name: "System Design", level: 60 },
      { name: "Distributed Systems", level: 60 },
    ],
  },
  {
    key: "platform",
    skills: [
      { name: "Spring Boot", level: 85 },
      { name: "Microservices", level: 70 },
      { name: "REST APIs", level: 90 },
      { name: "Event-driven Architecture", level: 60 },
    ],
  },
  {
    key: "practices",
    skills: [
      { name: "Observability", level: 75 },
      { name: "Testing", level: 80 },
      { name: "Code Review", level: 80 },
      { name: "Security", level: 60 },
    ],
  },
];
