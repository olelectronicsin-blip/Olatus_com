import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import AboutPage from './components/AboutPage';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingBot from './components/FloatingBot';
import ScrollArt from './components/ScrollArt';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import PCBManufacturing from './components/PCBManufacturing';
import Online3DPrinting from './components/Online3DPrinting';
import ProductDevelopment from './components/ProductDevelopment';
import TechnologyLab from './components/TechnologyLab';
import Careers from './components/Careers';
import WebDevelopment from './components/WebDevelopment';
import EmbeddedSoftware from './components/EmbeddedSoftware';
import Documentation from './components/Documentation';
import ContactModal from './components/ContactModal';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';

function HomePage() {
  return (
    <>
      <ScrollArt />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <FloatingBot />
    </>
  );
}

function AppContent() {
  const { isContactModalOpen, closeContactModal } = useContactModal();
  
  return (
    <>
      <div className="min-h-screen relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/pcb-manufacturing" element={<PCBManufacturing />} />
          <Route path="/online-3d-printing" element={<Online3DPrinting />} />
          <Route path="/product-development" element={<ProductDevelopment />} />
          <Route path="/technology-lab" element={<TechnologyLab />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/embedded-software" element={<EmbeddedSoftware />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
}

function App() {
  return (
    <Router>
      <ContactModalProvider>
        <AppContent />
      </ContactModalProvider>
    </Router>
  );
}

export default App;
