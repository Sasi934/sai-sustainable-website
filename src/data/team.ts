/**
 * APPROVED CONTENT — source: SAI_Experience_Web Dev.docx. No biographies invented.
 * No photographs exist in either source; the team presentation is typographic by design.
 */

export type Person = {
  name: string;
  role: string;
  bio: string;
  skills?: string[];
};

export const leadership: Person[] = [
  {
    name: "Aravind Kumar",
    role: "Business & Delivery Leadership",
    bio: "Aravind Kumar holds a Bachelor's degree in Engineering and brings extensive professional experience across procurement, industrial operations, commercial coordination and project execution. Within SAI, Aravind supports solution planning, client coordination, commercial strategy and delivery alignment. He helps translate operational requirements into practical technology objectives and keeps the solution focused on the client's actual needs.",
  },
  {
    name: "Dev Khanna",
    role: "Environmental Engineer & Operations Director",
    bio: "Dev Khanna is an Environmental Engineer and Operations Director at SAI Sustainable Services Inc. He supports project execution, operational coordination and client requirements across SAI's activities, bringing a practical approach to organizing people, timelines and deliverables.",
  },
];

export const technologyTeam: Person[] = [
  {
    name: "Harshavardhan",
    role: "Software Engineer / AI / UI/UX",
    bio: "Harshavardhan works as a Software Engineer at an MNC and brings additional experience from an IIIT Hyderabad internship. His profile combines software engineering with Azure development, AI engineering and UI/UX analysis and design, making him well suited to projects where application development and intelligent features need to work together.",
    skills: [
      "Software engineering and application development.",
      "MNC software engineering experience.",
      "Certified Azure Developer capability.",
      "AI engineering and automation.",
      "UI/UX analysis and design.",
    ],
  },
  {
    name: "Ippala Veera Shashank Reddy",
    role: "Frontend / Full-Stack Developer",
    bio: "Ippala Veera Shashank Reddy is a Computer Science and Engineering professional focused on frontend and full-stack development. His experience includes responsive user interfaces, authentication, REST APIs and CRUD applications, allowing him to contribute across the frontend and application workflow.",
    skills: [
      "HTML, CSS and JavaScript.",
      "React.js and responsive frontend development.",
      "Java, Node.js and Express.js.",
      "Sequelize and database-backed applications.",
      "Authentication and REST APIs.",
      "CRUD development and application workflows.",
    ],
  },
  {
    name: "Rayapati Rajeshwara Rao",
    role: "Data Analytics / Salesforce",
    bio: "Rayapati Rajeshwara Rao brings capability across data analytics, Tableau and Salesforce development. He supports SAI on projects where operational data needs to be transformed into useful reports, dashboards and decision-support information, while also contributing to business-system and process improvement requirements.",
    skills: [
      "Data analytics and reporting.",
      "Tableau dashboards and visualization.",
      "Salesforce development.",
      "Business-system support.",
      "Process analysis and decision-support reporting.",
    ],
  },
];
