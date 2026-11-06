import React from 'react';

const bhavanaResume = encodeURI(`${import.meta.env.BASE_URL}resume_ (2).pdf`);

const Footer = () => {
  return (
    <footer className="bg-[#111113] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh] border-t border-white/5">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p className="text-white font-bold">BHAVANA N MASARE</p>
          <p className="text-gray-400">Information Technology Graduate &bull; M.Tech Student</p>
          <p className="text-[#f0c59b]">Python, Java, C++, React.js, SQL, MongoDB</p>
        </div>
        
        <div className="flex flex-col gap-1 md:items-center">
          <p className="text-white/80">"Building skills. Creating solutions. Learning continuously."</p>
          <div className="flex items-center gap-3 mt-1">
            <a href="#projects" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">View Featured Projects</a>
            <span className="text-white/30">&bull;</span>
            <a 
              href={bhavanaResume}
              download="Bhavana_N_Masare_Resume.pdf"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#f0c59b] hover:text-white underline transition-colors underline-offset-4 decoration-1 font-bold"
            >
              Download Resume ↓
            </a>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <p className="text-emerald-400 font-bold">&bull; Open to Opportunities</p>
          <p>Maharashtra, India &bull; {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex flex-col justify-center items-center py-14 md:py-16 overflow-hidden">
        <h2 
          className="text-[18vw] md:text-[16vw] leading-none font-black tracking-tighter lowercase select-none text-white/90 hover:text-[#f0c59b] transition-colors duration-500 w-full text-center"
          style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif" }}
        >
          bhavana
        </h2>
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 font-sans font-bold mt-2">
          Bhavana N Masare
        </p>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-4">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold text-white">Get In Touch</a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            &copy; {new Date().getFullYear()} Bhavana N Masare &bull; Software Development Enthusiast
          </p>
        </div>
        
        <div className="flex flex-col gap-2 md:items-center">
          <a href="mailto:bhavanamasare73@gmail.com" className="underline hover:text-[#f0c59b] transition-colors underline-offset-4 decoration-1 lowercase">bhavanamasare73@gmail.com</a>
          <a href="tel:+919767537552" className="text-white/60 hover:text-white transition-colors">+91 9767537552</a>
        </div>
        
        <div className="flex flex-col gap-2 md:items-end">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f0c59b] transition-colors underline-offset-4 decoration-1">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f0c59b] transition-colors underline-offset-4 decoration-1">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
