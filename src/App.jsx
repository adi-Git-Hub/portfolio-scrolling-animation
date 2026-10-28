import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize AOS with Apple-style cubic-bezier easing and restrained duration
    AOS.init({
      duration: 500,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#eb5e55]">
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
