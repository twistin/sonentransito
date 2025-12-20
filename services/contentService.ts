import matter from 'gray-matter';
import mediaLibrary from '../content/media/library.json';
import type {
  AudioTrack,
  GalleryItem,
  MediaLibrary,
  Post,
  PostAudioBlock,
  PostFrontMatter,
  UpcomingProject,
} from '../types';

const postModules = import.meta.glob('../content/posts/**/*.md', {
  as: 'raw',
  eager: true,
});

const library = (mediaLibrary as MediaLibrary) || { gallery: [], soundTracks: [], upcomingProjects: [] };

const normalizePostAudio = (audio: PostFrontMatter['audio'], slug: string): AudioTrack[] => {
  if (!audio) {
    return [];
  }

  const audioBlocks: PostAudioBlock[] = Array.isArray(audio) ? audio : [audio];

  return audioBlocks.map((block, index) => ({
    id: `${slug}-audio-${index}`,
    title: block.title,
    context: block.context,
    url: block.url,
    platform: block.platform,
    type: block.type,
    duration: block.duration,
  }));
};

const posts: Post[] = Object.entries(postModules).map(([path, rawContent]) => {
  const slug = path
    .replace('../content/posts/', '')
    .replace(/\.md$/, '');

  const parsed = matter(String(rawContent));

  return {
    slug,
    content: parsed.content.trim(),
    frontmatter: parsed.data as PostFrontMatter,
  };
}).sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

const derivedGallery: GalleryItem[] = posts.flatMap((post) => {
  const galleryBlocks = post.frontmatter.gallery ?? [];
  return galleryBlocks.map((block, index) => ({
    id: `${post.slug}-gallery-${index}`,
    image: block.image,
    caption: block.caption,
    series: post.frontmatter.series ?? post.frontmatter.title,
  }));
});

const galleryItems: GalleryItem[] = [...(library.gallery || []), ...derivedGallery];

const postAudioTracks = posts.flatMap((post) => normalizePostAudio(post.frontmatter.audio, post.slug));

const soundTracks: AudioTrack[] = [...(library.soundTracks || []), ...postAudioTracks];

const upcomingProjects: UpcomingProject[] = library.upcomingProjects || [];

export const getPosts = (): Post[] => posts;

export const getPostBySlug = (slug: string): Post | undefined => posts.find((post) => post.slug === slug);

export const getGalleryItems = (): GalleryItem[] => galleryItems;

export const getSoundTracks = (): AudioTrack[] => soundTracks;

export const getUpcomingProjects = (): UpcomingProject[] => upcomingProjects;
