import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // 1. Root-level Lenis instance — Apple-grade physics & smooth inertia
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.1,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    window.__lenis = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // 3. Initialize AOS with unified Apple-style cubic-bezier easing
    AOS.init({
      duration: 700,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      once: true,
      offset: 50,
    });

    // 4. Smooth Anchor Link Delegation (replaces jerky jumps with fluid inertia)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, {
            offset: 0,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Refresh ScrollTrigger and AOS after layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      AOS.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      window.__lenis = null;
    };
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
