export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio: string;
  description: string;
  colSpan: string;

  role?: string;
  tech?: string;
  client?: string;
}


export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  image: string;
  readTime?: string;
  date: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  image: string;
  images: string[];
  category: string;
  rotation: string;
  description: string;
  role?: string;
  tech: string[];
  link?: string;
  github?: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}
