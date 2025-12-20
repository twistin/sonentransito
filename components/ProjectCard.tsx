/**
 * ProjectCard - A dynamic card component for showcasing projects/posts
 * 
 * Features:
 * - Dynamic badge system for tags and tools
 * - Animated "glow" border for featured/latest projects
 * - Hover interactions with sonic feedback
 * - Responsive design with size variants
 */

import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { sonicProps } from '../hooks/useSonicInteraction';

// Predefined colors for tool badges based on category
const toolColors: Record<string, { bg: string; text: string; border: string }> = {
    // Audio/Music Tools
    'SuperCollider': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    'TidalCycles': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
    'MaxMSP': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    'Ableton': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    'PureData': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },

    // Visual/Creative Tools
    'OpenFrameworks': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
    'Processing': { bg: 'bg-blue-400/10', text: 'text-blue-300', border: 'border-blue-400/30' },
    'TouchDesigner': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30' },

    // Web/Dev Tools
    'React': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' },
    'TypeScript': { bg: 'bg-blue-600/10', text: 'text-blue-400', border: 'border-blue-600/30' },
    'Python': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },

    // Recording/Field
    'Binaural': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    'Field Recording': { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },

    // Default
    'default': { bg: 'bg-white/5', text: 'text-white/60', border: 'border-white/10' },
};

const getToolStyle = (tool: string) => {
    return toolColors[tool] || toolColors['default'];
};

// Tag colors (conceptual tags, different from tools)
const tagColors = [
    'text-neonOrange',
    'text-neonPink',
    'text-neonGreen',
    'text-purple-400',
    'text-cyan-400',
];

interface ProjectCardProps {
    post: Post;
    /** Is this the most recent/featured project? */
    isFeatured?: boolean;
    /** Card size variant */
    size?: 'normal' | 'large';
    /** Show full excerpt or truncated */
    showFullExcerpt?: boolean;
    /** Index for staggered animations */
    index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    post,
    isFeatured = false,
    size = 'normal',
    showFullExcerpt = false,
    index = 0,
}) => {
    const { frontmatter, slug } = post;
    const { title, date, excerpt, coverImage, tags = [], tools = [], series } = frontmatter;

    // Format date
    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
    });

    // Size-based classes
    const sizeClasses = {
        normal: 'col-span-1',
        large: 'col-span-1 md:col-span-2 lg:col-span-2',
    };

    // Featured glow animation CSS
    const glowAnimation = isFeatured ? `
    before:absolute before:inset-0 before:-z-10 before:rounded-lg
    before:bg-gradient-to-r before:from-neonOrange before:via-neonPink before:to-purple-500
    before:opacity-0 before:blur-xl before:transition-opacity before:duration-500
    hover:before:opacity-40
    after:absolute after:inset-[1px] after:rounded-lg after:bg-white dark:after:bg-darkBg after:-z-[5]
    shadow-[0_0_20px_rgba(255,95,31,0.15),0_0_40px_rgba(168,85,247,0.1)]
  ` : '';

    return (
        <article
            className={`
        group relative overflow-hidden rounded-lg
        bg-white dark:bg-darkBg
        border ${isFeatured ? 'border-neonOrange/30' : 'border-black/5 dark:border-white/5'}
        transition-all duration-500 ease-out
        hover:border-neonPink/50 hover:shadow-2xl hover:-translate-y-1
        ${sizeClasses[size]}
        ${glowAnimation}
      `}
            style={{
                animationDelay: `${index * 100}ms`,
            }}
            {...sonicProps(isFeatured ? 'sweep' : 'glitch', 0.25)}
        >
            {/* Featured Badge */}
            {isFeatured && (
                <div className="absolute top-4 right-4 z-20">
                    <span className="
            px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em]
            bg-gradient-to-r from-neonOrange to-neonPink text-white
            rounded-full shadow-lg shadow-neonOrange/20
            animate-pulse
          ">
                        Reciente
                    </span>
                </div>
            )}

            {/* Cover Image */}
            {coverImage && (
                <div className={`relative overflow-hidden ${size === 'large' ? 'h-64' : 'h-48'}`}>
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            // Fallback gradient if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Series badge on image */}
                    {series && (
                        <span className="absolute bottom-4 left-4 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] bg-black/60 text-white/90 backdrop-blur-sm rounded">
                            {series}
                        </span>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Date */}
                <div className="flex items-center gap-4">
                    <time className="text-[10px] font-bold tracking-[0.3em] text-neonPink uppercase">
                        {formattedDate}
                    </time>
                    {isFeatured && (
                        <span className="flex items-center gap-1 text-[9px] text-neonGreen">
                            <span className="w-1.5 h-1.5 rounded-full bg-neonGreen animate-pulse" />
                            LIVE
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className={`
          font-black uppercase tracking-tight
          text-contentDark dark:text-white
          group-hover:text-neonOrange transition-colors duration-300
          ${size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'}
        `}>
                    <Link to={`/research/${slug}`} className="hover:underline decoration-neonOrange/30">
                        {title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className={`
          text-contentDark/60 dark:text-white/50 leading-relaxed font-light
          ${showFullExcerpt ? '' : 'line-clamp-2'}
          ${size === 'large' ? 'text-base' : 'text-sm'}
        `}>
                    {excerpt}
                </p>

                {/* Tools Badges (Technical Stack) */}
                {tools.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {tools.map((tool) => {
                            const style = getToolStyle(tool);
                            return (
                                <span
                                    key={tool}
                                    className={`
                    px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em]
                    rounded-md border
                    ${style.bg} ${style.text} ${style.border}
                    transition-all duration-200 hover:scale-105
                  `}
                                >
                                    #{tool}
                                </span>
                            );
                        })}
                    </div>
                )}

                {/* Conceptual Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                        {tags.map((tag, i) => (
                            <span
                                key={tag}
                                className={`
                  text-[10px] font-medium tracking-wide
                  ${tagColors[i % tagColors.length]}
                  opacity-60 hover:opacity-100 transition-opacity cursor-pointer
                `}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom accent line for featured */}
            {isFeatured && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neonOrange via-neonPink to-purple-500 opacity-80" />
            )}
        </article>
    );
};

export default ProjectCard;
