import matter from 'gray-matter';
import * as toml from 'toml';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  tags?: string[];
}

export interface PostFrontmatter {
  title: string;
  date: string;
  draft?: boolean;
  tags?: string[];
}

export function parseMarkdownFile(filename: string, fileContent: string): BlogPost {
  // Parse the frontmatter and content using gray-matter
  // Configure gray-matter to handle TOML frontmatter (delimited by +++)
  const parsed = matter(fileContent, {
    delimiters: ['+++', '+++'],
    engines: {
      toml: {
        parse: toml.parse.bind(toml),
        stringify: () => ''
      }
    }
  });

  const frontmatter = parsed.data as PostFrontmatter;
  const content = parsed.content;

  // Generate slug from filename
  const slug = filename.replace('.md', '');

  // Generate excerpt from content (first 150 characters, ending at word boundary)
  const excerpt = generateExcerpt(content);

  // Calculate read time based on word count
  const readTime = calculateReadTime(content);

  // Extract category from tags or use default
  const category = frontmatter.tags && frontmatter.tags.length > 0 
    ? frontmatter.tags[0] 
    : 'General';

  return {
    slug,
    title: frontmatter.title,
    excerpt,
    content,
    date: formatDate(frontmatter.date),
    author: 'Alfin Joseph', // Default author
    category,
    readTime,
    tags: frontmatter.tags
  };
}

function generateExcerpt(content: string): string {
  // Remove markdown syntax for a cleaner excerpt
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  // Get first 150 characters, ending at word boundary
  if (cleanContent.length <= 150) {
    return cleanContent;
  }

  const truncated = cleanContent.substring(0, 150);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  } catch (error) {
    console.error('Error parsing date:', dateString);
    return dateString;
  }
}
