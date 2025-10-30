interface User {
  id: string;
  title: string;
  subTitle: string;
  createdAt: string;
}

export const people: User[] = [
  {
    id: "1",
    title: "Learn Next.js",
    subTitle: "Understand the App Router and Server Components",
    createdAt: "2025-10-25T09:32:00Z",
  },
  {
    id: "2",
    title: "Build Portfolio",
    subTitle: "Add animations and dark mode switch",
    createdAt: "2025-10-26T14:12:00Z",
  },
  {
    id: "3",
    title: "Fix Tailwind Styles",
    subTitle: "Refactor components to use reusable classes",
    createdAt: "2025-10-27T08:45:00Z",
  },
  {
    id: "4",
    title: "Refine Modal UX",
    subTitle: "Add smooth opening and closing transitions",
    createdAt: "2025-10-27T19:10:00Z",
  },
  {
    id: "5",
    title: "Deploy to Vercel",
    subTitle: "Connect custom domain and verify DNS records",
    createdAt: "2025-10-28T16:28:00Z",
  },
];
