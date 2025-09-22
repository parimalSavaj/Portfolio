import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./features/header/Header";
import Footer from "./features/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SEOHead from "./components/SEOHead";
import PlexusBackground from "./components/PlexusBackground";
import HomePage from "./pages/HomePage";
import BlogList from "./features/blog/BlogList";
import BlogPost from "./features/blog/BlogPost";

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <SEOHead />

        {/* Global PlexusBackground for entire site */}
        <PlexusBackground />

        {/* All content with proper z-index */}
        <div className="relative z-10">
          <Header />
          <main>
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<HomePage />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:category" element={<BlogList />} />
              <Route path="/blog/:category/:slug" element={<BlogPost />} />
            </Routes>
          </main>
          <Footer />
        </div>

        <div className="relative z-50">
          <ScrollToTop />
        </div>
      </div>
    </Router>
  );
}

export default App;
