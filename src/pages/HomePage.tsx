import React from "react";
import Hero from "../features/hero/Hero";
import Skills from "../features/skills/Skills";
import ProjectsGrid from "../features/projects/ProjectsGrid";
import About from "../features/about/About";
import ContactForm from "../features/contact/ContactForm";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Skills />
      <ProjectsGrid />
      <About />
      <ContactForm />
    </>
  );
};

export default HomePage;
