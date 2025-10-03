import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "../../components/SEOHead";
import useScrollToTop from "../../hooks/useScrollToTop";
import {
  getBlogPostBySlug,
  getCategoryBySlug,
  getBlogPostsByCategory,
} from "../../lib/blogUtils";

const BlogPost = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();

  // Automatically scroll to top when route changes
  useScrollToTop();

  // Get the blog post
  const post = category && slug ? getBlogPostBySlug(category, slug) : null;
  const categoryInfo = category ? getCategoryBySlug(category) : null;

  // Get related posts (other posts in the same category)
  const relatedPosts = category
    ? getBlogPostsByCategory(category)
        .filter((p) => p.slug !== slug)
        .slice(0, 3)
    : [];

  // Redirect if post not found
  useEffect(() => {
    if (category && slug && !post) {
      navigate("/blog", { replace: true });
    }
  }, [post, category, slug, navigate]);

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Animation variants - matching BlogList animations
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

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  if (!post || !categoryInfo) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-aurora-text mb-2">
            Post Not Found
          </h2>
          <p className="text-aurora-muted mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-aurora-purple hover:bg-aurora-purple/80 text-white rounded-lg transition-colors duration-200"
          >
            Browse All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.description}
        keywords={post.tags.join(", ")}
        type="article"
      />
      <div className="min-h-screen">
        {/* Hero Section with Staggered Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pt-20 pb-16"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.nav
              variants={headerVariants}
              className="flex items-center space-x-2 text-sm text-aurora-muted mb-8"
            >
              <Link
                to="/blog"
                className="hover:text-aurora-text transition-colors duration-200"
              >
                Blog
              </Link>
              <span>/</span>
              <Link
                to={`/blog/${category}`}
                className="hover:text-aurora-text transition-colors duration-200"
              >
                {categoryInfo.name}
              </Link>
              <span>/</span>
              <span className="text-aurora-text">{post.title}</span>
            </motion.nav>

            {/* Category Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <span className="px-4 py-2 text-sm font-medium bg-aurora-purple/20 text-aurora-purple rounded-full">
                {categoryInfo.icon} {categoryInfo.name}
              </span>
              {post.featured && (
                <span className="px-4 py-2 text-sm font-medium bg-aurora-blue/20 text-aurora-blue rounded-full">
                  ⭐ Featured
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-aurora-text mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 text-aurora-muted mb-8"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-aurora-purple to-aurora-blue rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">
                    {post.author.charAt(0)}
                  </span>
                </div>
                <span>By {post.author}</span>
              </div>
              <span>•</span>
              <span>{formatDate(post.publishDate)}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-aurora-muted leading-relaxed mb-8 max-w-3xl"
            >
              {post.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-aurora-muted/10 text-aurora-muted rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="pb-16"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-aurora-card/20 backdrop-blur-sm border border-aurora-purple/20 rounded-xl p-8 md:p-12">
              {/* Article Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(
                        /```(\w+)?\n([\s\S]*?)```/g,
                        '<pre class="bg-aurora-night/50 border border-aurora-purple/20 rounded-lg p-4 overflow-x-auto"><code class="text-aurora-text">$2</code></pre>'
                      )
                      .replace(
                        /`([^`]+)`/g,
                        '<code class="bg-aurora-purple/20 text-aurora-purple px-1 py-0.5 rounded text-sm">$1</code>'
                      )
                      .replace(
                        /^# (.*$)/gm,
                        '<h1 class="text-3xl font-bold text-aurora-text mt-8 mb-4">$1</h1>'
                      )
                      .replace(
                        /^## (.*$)/gm,
                        '<h2 class="text-2xl font-bold text-aurora-text mt-6 mb-3">$1</h2>'
                      )
                      .replace(
                        /^### (.*$)/gm,
                        '<h3 class="text-xl font-bold text-aurora-text mt-4 mb-2">$1</h3>'
                      )
                      .replace(
                        /^\*\*(.*?)\*\*/gm,
                        '<strong class="text-aurora-text font-semibold">$1</strong>'
                      )
                      .replace(
                        /^\*(.*?)\*/gm,
                        '<em class="text-aurora-muted italic">$1</em>'
                      )
                      .replace(
                        /\n\n/g,
                        '</p><p class="text-aurora-muted leading-relaxed mb-4">'
                      )
                      .replace(
                        /^(?!<[h|p|c|u])/gm,
                        '<p class="text-aurora-muted leading-relaxed mb-4">'
                      )
                      .replace(/$(?![</])/gm, "</p>"),
                  }}
                />
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="pb-16"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-aurora-text mb-8 text-center"
              >
                More {categoryInfo.name} Articles
              </motion.h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {relatedPosts.map((relatedPost) => (
                  <motion.div key={relatedPost.id} variants={itemVariants}>
                    <Link
                      to={`/blog/${relatedPost.category}/${relatedPost.slug}`}
                      className="group block"
                    >
                      <div className="bg-aurora-card/20 backdrop-blur-sm border border-aurora-purple/20 rounded-xl p-6 hover:border-aurora-purple/40 hover:bg-aurora-card/30 transition-all duration-300">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-2">
                            {categoryInfo.icon}
                          </span>
                          <span className="text-sm text-aurora-purple font-medium">
                            {categoryInfo.name}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-aurora-text mb-2 group-hover:text-aurora-purple transition-colors duration-300 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-aurora-muted text-sm mb-4 line-clamp-3">
                          {relatedPost.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-aurora-muted">
                          <span>{formatDate(relatedPost.publishDate)}</span>
                          <span>{relatedPost.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Navigation */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
          className="pb-16"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link
                to={`/blog/${category}`}
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
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                Back to {categoryInfo.name}
              </Link>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center px-6 py-3 bg-aurora-purple hover:bg-aurora-purple/80 text-white rounded-lg transition-colors duration-200"
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
            </div>
          </div>
        </motion.div>

        {/* Custom Styles for Blog Content */}
        <style>{`
        .blog-content h1,
        .blog-content h2,
        .blog-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .blog-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        
        .blog-content pre {
          margin: 1.5rem 0;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        .blog-content code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      </div>
    </>
  );
};

export default BlogPost;
