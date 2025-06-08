import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import * as toml from 'toml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '../posts');
const OUTPUT_FILE = path.join(__dirname, '../src/data/posts.json');

function splitContentAtMore(content) {
  const moreTag = '<!--more-->';
  const moreIndex = content.indexOf(moreTag);
  
  if (moreIndex === -1) {
    // No <!--more--> tag found, use first paragraph as excerpt
    const firstParagraph = content.split('\n\n')[0];
    return {
      excerpt: generateExcerptFromText(firstParagraph),
      mainContent: content
    };
  }
  
  const beforeMore = content.substring(0, moreIndex).trim();
  const afterMore = content.substring(moreIndex + moreTag.length).trim();
  
  return {
    excerpt: generateExcerptFromText(beforeMore),
    mainContent: afterMore
  };
}

function generateExcerptFromText(content) {
  // Remove markdown syntax for a cleaner excerpt
  let cleanContent = content
    .replace(/^\*\*tl;dr\*\*\s*/i, '') // Remove "tl;dr" at the beginning
    .replace(/^tl;dr\s*/i, '') // Remove plain "tl;dr" at the beginning
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown, keep text
    .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown, keep text
    .replace(/`(.*?)`/g, '$1') // Remove inline code markdown, keep text
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/^\s*[\*\+\-]\s+/gm, '') // Remove bullet points
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  // Clean up extra spaces
  cleanContent = cleanContent.replace(/\s+/g, ' ').trim();

  // Get first 150 characters, ending at word boundary
  if (cleanContent.length <= 150) {
    return cleanContent;
  }

  const truncated = cleanContent.substring(0, 150);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  } catch (error) {
    console.error('Error parsing date:', dateString);
    return dateString;
  }
}

function parseMarkdownFile(filename, fileContent) {
  let parsed;
  
  // Check if it's TOML frontmatter (starts with +++)
  if (fileContent.trim().startsWith('+++')) {
    console.log(`Processing TOML frontmatter for ${filename}`);
    // Manual TOML parsing since gray-matter isn't working properly with TOML
    const lines = fileContent.split('\n');
    const frontmatterEnd = lines.findIndex((line, index) => index > 0 && line.trim() === '+++');
    if (frontmatterEnd > 0) {
      const frontmatterLines = lines.slice(1, frontmatterEnd);
      const frontmatterText = frontmatterLines.join('\n');
      try {
        const frontmatterData = toml.parse(frontmatterText);
        parsed = {
          data: frontmatterData,
          content: lines.slice(frontmatterEnd + 1).join('\n')
        };
        console.log(`TOML parsing successful for ${filename}:`, frontmatterData);
      } catch (error) {
        console.error(`TOML parsing failed for ${filename}:`, error);
        parsed = { data: {}, content: fileContent };
      }
    } else {
      console.error(`Could not find TOML frontmatter end for ${filename}`);
      parsed = { data: {}, content: fileContent };
    }
  } else {
    // Default to YAML frontmatter (starts with ---)
    console.log(`Processing YAML frontmatter for ${filename}`);
    parsed = matter(fileContent);
    console.log(`YAML parsed data for ${filename}:`, parsed.data);
  }

  const frontmatter = parsed.data;
  const rawContent = parsed.content;

  // Generate slug from filename
  const slug = filename.replace('.md', '');

  // Split content at <!--more--> tag
  const { excerpt, mainContent } = splitContentAtMore(rawContent);

  // Calculate read time based on main content word count
  const readTime = calculateReadTime(mainContent);

  // Extract category from tags or use default
  const category = frontmatter.tags && frontmatter.tags.length > 0 
    ? frontmatter.tags[0] 
    : 'General';

  return {
    slug,
    title: frontmatter.title || 'Untitled',
    excerpt,
    content: mainContent, // Only the content after <!--more-->
    date: formatDate(frontmatter.date || new Date().toISOString()),
    author: 'Alfin Joseph', // Default author
    category,
    readTime,
    tags: frontmatter.tags || []
  };
}

async function generatePostsIndex() {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read all markdown files from posts directory
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
    
    const posts = [];
    const categories = new Set();

    for (const file of files) {
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      try {
        const post = parseMarkdownFile(file, fileContent);
        posts.push(post);
        categories.add(post.category);
        console.log(`✓ Processed: ${file}`);
      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
      }
    }

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create the final data structure
    const data = {
      posts,
      categories: Array.from(categories).sort(),
      generatedAt: new Date().toISOString()
    };

    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
    
    console.log(`\n🎉 Successfully generated posts index!`);
    console.log(`📁 Output: ${OUTPUT_FILE}`);
    console.log(`📝 Posts: ${posts.length}`);
    console.log(`🏷️  Categories: ${categories.size}`);
    
  } catch (error) {
    console.error('Error generating posts index:', error);
    process.exit(1);
  }
}

generatePostsIndex();
