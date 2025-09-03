import React from "react";
import { personalInfo } from "../lib/data";

const SEOHead = () => {
  React.useEffect(() => {
    // Set document title
    document.title = `${personalInfo.name} - Full Stack Developer Portfolio`;

    // Create meta tags
    const metaTags = [
      { name: "description", content: personalInfo.bio },
      {
        name: "keywords",
        content:
          "React, TypeScript, Full Stack Developer, Web Development, Portfolio",
      },
      { name: "author", content: personalInfo.name },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { property: "og:title", content: `${personalInfo.name} - Portfolio` },
      { property: "og:description", content: personalInfo.bio },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${personalInfo.name} - Portfolio` },
      { name: "twitter:description", content: personalInfo.bio },
      { name: "theme-color", content: "#A855F7" }, // Aurora purple
    ];

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
  }, []);

  return null; // This component doesn't render anything
};

export default SEOHead;
