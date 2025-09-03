import Header from "./features/header/Header";
import Hero from "./features/hero/Hero";
import Skills from "./features/skills/Skills";
import ProjectsGrid from "./features/projects/ProjectsGrid";
import About from "./features/about/About";
import ContactForm from "./features/contact/ContactForm";
import Footer from "./features/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SEOHead from "./components/SEOHead";

function App() {
  return (
    <div className="min-h-screen bg-aurora-night">
      <SEOHead />
      <Header />
      <main>
        <Hero />
        <Skills />
        <ProjectsGrid />
        <About />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
