import Header from "./features/header/Header";
import Hero from "./features/hero/Hero";
import Skills from "./features/skills/Skills";
import ProjectsGrid from "./features/projects/ProjectsGrid";
import About from "./features/about/About";
import ContactForm from "./features/contact/ContactForm";
import Footer from "./features/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SEOHead from "./components/SEOHead";
import CustomCursor from "./components/CustomCursor";
import PlexusBackground from "./components/PlexusBackground";

function App() {
  return (
    <div className="min-h-screen relative">
      <SEOHead />

      {/* Global PlexusBackground for entire site */}
      <PlexusBackground />

      {/* All content with proper z-index */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Skills />
          <ProjectsGrid />
          <About />
          <ContactForm />
        </main>
        <Footer />
      </div>

      <div className="relative z-50">
        <ScrollToTop />
        <CustomCursor />
      </div>
    </div>
  );
}

export default App;
