import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "../../components/SEOHead";
import {
  getAllPosts,
  getBlogPostsByCategory,
  getCategoryBySlug,
  blogCategories,
  type BlogPost,
} from "../../lib/blogData";

const BlogList = () => {
  const { category } = useParams<{ category?: string }>();

  // Get posts based on category or all posts
  const posts: BlogPost[] = category
    ? getBlogPostsByCategory(category)
    : getAllPosts();

  // Get category info if viewing a specific category
  const categoryInfo = category ? getCategoryBySlug(category) : null;

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <>
      <SEOHead
        title={categoryInfo ? `${categoryInfo.name} Blog Posts` : "Blog"}
        description={
          categoryInfo
            ? `${
                categoryInfo.description
              } - Read articles about ${categoryInfo.name.toLowerCase()}`
            : "Explore articles about web development, programming, and technology"
        }
        keywords={
          categoryInfo
            ? `${categoryInfo.name.toLowerCase()}, ${
                categoryInfo.name
              } tutorials, ${categoryInfo.name} blog`
            : "blog, web development, programming, javascript, nodejs, python"
        }
      />
      <div className="min-h-screen bg-aurora-night pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {categoryInfo ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl mr-3">{categoryInfo.icon}</span>
                  <h1 className="text-4xl md:text-5xl font-bold text-aurora-text">
                    {categoryInfo.name}
                  </h1>
                </div>
                <p className="text-xl text-aurora-muted max-w-2xl mx-auto">
                  {categoryInfo.description}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Link
                    to="/blog"
                    className="px-4 py-2 text-sm bg-aurora-purple/20 text-aurora-purple hover:bg-aurora-purple/30 rounded-full transition-colors duration-200"
                  >
                    All Posts
                  </Link>
                  {blogCategories
                    .filter((cat) => cat.slug !== category)
                    .map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/blog/${cat.slug}`}
                        className="px-4 py-2 text-sm bg-aurora-muted/10 text-aurora-muted hover:bg-aurora-muted/20 rounded-full transition-colors duration-200"
                      >
                        {cat.icon} {cat.name}
                      </Link>
                    ))}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-aurora-text mb-4">
                  📝 All Blog Posts
                </h1>
                <p className="text-xl text-aurora-muted max-w-2xl mx-auto">
                  Explore articles about web development, programming, and
                  technology
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {blogCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/blog/${cat.slug}`}
                      className="px-4 py-2 text-sm bg-aurora-muted/10 text-aurora-muted hover:bg-aurora-muted/20 rounded-full transition-colors duration-200"
                    >
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 md:gap-12"
            >
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link to={`/blog/${post.category}/${post.slug}`}>
                    <div className="bg-aurora-card/30 backdrop-blur-sm border border-aurora-purple/20 rounded-xl p-6 md:p-8 hover:border-aurora-purple/40 hover:bg-aurora-card/40 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Content */}
                        <div className="flex-1">
                          {/* Category Badge & Featured */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 text-xs font-medium bg-aurora-purple/20 text-aurora-purple rounded-full">
                              {
                                blogCategories.find(
                                  (cat) => cat.id === post.category
                                )?.icon
                              }{" "}
                              {
                                blogCategories.find(
                                  (cat) => cat.id === post.category
                                )?.name
                              }
                            </span>
                            {post.featured && (
                              <span className="px-3 py-1 text-xs font-medium bg-aurora-blue/20 text-aurora-blue rounded-full">
                                ⭐ Featured
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h2 className="text-2xl md:text-3xl font-bold text-aurora-text mb-3 group-hover:text-aurora-purple transition-colors duration-300">
                            {post.title}
                          </h2>

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-sm text-aurora-muted mb-4">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>{formatDate(post.publishDate)}</span>
                            <span>•</span>
                            <span>{post.readTime} min read</span>
                          </div>

                          {/* Description */}
                          <p className="text-aurora-muted leading-relaxed mb-6">
                            {post.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-aurora-muted/10 text-aurora-muted rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 4 && (
                              <span className="px-2 py-1 text-xs bg-aurora-muted/10 text-aurora-muted rounded">
                                +{post.tags.length - 4} more
                              </span>
                            )}
                          </div>

                          {/* Read More Button */}
                          <div className="flex items-center text-aurora-purple group-hover:text-aurora-blue transition-colors duration-300">
                            <span className="font-medium">Read Article</span>
                            <svg
                              className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Visual Element */}
                        <div className="md:w-32 md:h-32 flex-shrink-0">
                          <div className="w-full h-24 md:h-full bg-gradient-to-br from-aurora-purple/20 to-aurora-blue/20 rounded-lg flex items-center justify-center">
                            <span className="text-3xl md:text-4xl">
                              {blogCategories.find(
                                (cat) => cat.id === post.category
                              )?.icon || "📄"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-aurora-text mb-2">
                No posts found
              </h3>
              <p className="text-aurora-muted mb-8">
                {categoryInfo
                  ? `No posts available in the ${categoryInfo.name} category yet.`
                  : "No blog posts available yet."}
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 bg-aurora-purple hover:bg-aurora-purple/80 text-white rounded-lg transition-colors duration-200"
              >
                Browse All Posts
              </Link>
            </motion.div>
          )}

          {/* Back to Top */}
          {posts.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-16"
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center px-6 py-3 bg-aurora-card/30 hover:bg-aurora-card/50 border border-aurora-purple/20 hover:border-aurora-purple/40 text-aurora-text rounded-lg transition-all duration-200"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Back to Top
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;
