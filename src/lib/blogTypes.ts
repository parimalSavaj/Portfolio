// Blog Post Structure - Easy to understand and add new posts
export interface BlogPost {
  id: string; // Unique ID (use simple names like "my-first-post")
  title: string; // The blog post title
  slug: string; // URL-friendly version of title (no spaces, lowercase)
  category: string; // Must match one of the categories below
  author: string; // Your name
  publishDate: string; // Format: "2024-01-15" (YYYY-MM-DD)
  description: string; // Short summary (1-2 sentences)
  content: string; // Full blog post content (can use Markdown)
  tags: string[]; // Array of tags like ["javascript", "react"]
  readTime: number; // Estimated read time in minutes
  featured?: boolean; // Optional: true if you want it featured on homepage
}

// Blog Category Structure
export interface BlogCategory {
  id: string; // Unique category ID
  name: string; // Display name
  slug: string; // URL-friendly name
  description: string; // Short description
  color: string; // Hex color code like "#f7df1e"
  icon: string; // Emoji icon
}
