import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Experience', 'Projects', 'Contact'];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#181214]/85 backdrop-blur-md py-4 shadow-lg border-b border-white/10' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left Side: Logo/Name */}
        <div className="flex items-center">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-white text-2xl font-black tracking-tight flex items-center cursor-pointer"
          >
            Hrutuja<span className="text-[#f0c59b]">.</span>
          </a>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
              className="text-white/85 hover:text-white font-medium relative group transition-colors duration-300 text-sm tracking-wide cursor-pointer"
            >
              {link}
              {/* Smooth hover underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f0c59b] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Side: CTA Button */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-6 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-semibold hover:bg-white hover:text-gray-900 hover:shadow-[0_0_20px_rgba(240,197,155,0.4)] transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 py-5 opacity-100 bg-[#1e1315]/95 backdrop-blur-xl border-b border-white/15 shadow-2xl' : 'max-h-0 opacity-0 bg-transparent'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
              className="text-white hover:text-[#f0c59b] font-bold text-lg border-b border-white/10 pb-2 transition-colors cursor-pointer"
            >
              {link}
            </a>
          ))}
          <div className="pt-2 pb-2">
             <a 
               href="#contact" 
               onClick={(e) => handleNavClick(e, '#contact')}
               className="inline-block px-6 py-3 rounded-full bg-white text-gray-900 font-bold hover:bg-[#f0c59b] transition-colors w-full text-center shadow-lg cursor-pointer"
             >
               Get In Touch
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
