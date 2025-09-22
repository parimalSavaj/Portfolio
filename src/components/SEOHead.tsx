import React from "react";
import { personalInfo } from "../lib/data";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  image?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  type = "website",
  image,
}) => {
  React.useEffect(() => {
    // Set document title
    const pageTitle = title
      ? `${title} | ${personalInfo.name}`
      : `${personalInfo.name} - Full Stack Developer Portfolio`;
    document.title = pageTitle;

    // Set description
    const pageDescription = description || personalInfo.bio;

    // Set keywords
    const pageKeywords = keywords
      ? `${keywords}, React, TypeScript, Full Stack Developer, Web Development, Portfolio`
      : "React, TypeScript, Full Stack Developer, Web Development, Portfolio, JavaScript, Node.js, Python, Blog";

    // Create meta tags
    const metaTags = [
      { name: "description", content: pageDescription },
      { name: "keywords", content: pageKeywords },
      { name: "author", content: personalInfo.name },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: type },
      { property: "og:url", content: window.location.href },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "theme-color", content: "#A855F7" }, // Aurora purple
    ];

    // Add image if provided
    if (image) {
      metaTags.push(
        { property: "og:image", content: image },
        { name: "twitter:image", content: image }
      );
    }

    // Add meta tags to document head
    metaTags.forEach(({ name, property, content }) => {
      const existingTag = document.querySelector(
        `meta[${name ? "name" : "property"}="${name || property}"]`
      );

      if (existingTag) {
        existingTag.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        if (name) meta.setAttribute("name", name);
        if (property) meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Add canonical link
    let canonicalLink = document.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = window.location.href;

    // Add structured data for blog posts
    if (type === "article") {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: pageDescription,
        author: {
          "@type": "Person",
          name: personalInfo.name,
        },
        publisher: {
          "@type": "Person",
          name: personalInfo.name,
        },
        url: window.location.href,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
      };

      let structuredDataScript = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (!structuredDataScript) {
        structuredDataScript = document.createElement("script");
        structuredDataScript.type = "application/ld+json";
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, type, image]);

  return null; // This component doesn't render anything
};

export default SEOHead;
