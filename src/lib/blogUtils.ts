import { blogPosts, blogCategories } from "./blogData";
import type { BlogPost, BlogCategory } from "./blogTypes";

// Helper functions for blog data
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category);
};

export const getBlogPostBySlug = (
  category: string,
  slug: string
): BlogPost | undefined => {
  return blogPosts.find(
    (post) => post.category === category && post.slug === slug
  );
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured);
};

export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
};

export const getCategoryBySlug = (slug: string): BlogCategory | undefined => {
  return blogCategories.find((category) => category.slug === slug);
};
