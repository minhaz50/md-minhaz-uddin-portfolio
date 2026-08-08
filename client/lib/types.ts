export type Project = {
  id: string;
  slug: string;
  name: string;
  image: string;
  summary: string;
  description: string;
  stack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  challenges: string;
  improvements: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectInput = {
  slug: string;
  name: string;
  image: string;
  summary: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  challenges: string;
  improvements: string;
  order?: number;
};
