
export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  date: string;
  category: string;
}

export interface Soundscape {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'soundscape' | 'music';
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}
