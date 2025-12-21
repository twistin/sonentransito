
export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  date: string;
  category: string;
  url?: string;
  tags?: string[];
}

export type AudioPlatform = 'soundcloud' | 'bandcamp' | 'local' | 'other';

export type AudioDiscipline = 'soundscape' | 'music' | 'field-recording' | 'performance';

export interface AudioTrack {
  id: string;
  title: string;
  context: string;
  url: string;
  platform?: AudioPlatform;
  type?: AudioDiscipline;
  duration?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  series?: string;
}

export interface UpcomingProject {
  title: string;
  focus: string;
  status: string;
}

export interface PostGalleryBlock {
  image: string;
  caption: string;
}

export interface PostAudioBlock {
  title: string;
  context: string;
  url: string;
  platform?: AudioPlatform;
  type?: AudioDiscipline;
  duration?: string;
}

export interface PostFrontMatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  tools?: string[];  // Technical tools/stack used: SuperCollider, React, MaxMSP, etc.
  series?: string;
  ambientAudio?: string;  // URL to ambient soundscape audio for this post/salida
  gallery?: PostGalleryBlock[];
  audio?: PostAudioBlock | PostAudioBlock[];
}

export interface Post {
  slug: string;
  content: string;
  frontmatter: PostFrontMatter;
}

export interface MediaLibrary {
  gallery: GalleryItem[];
  soundTracks: AudioTrack[];
  upcomingProjects: UpcomingProject[];
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
