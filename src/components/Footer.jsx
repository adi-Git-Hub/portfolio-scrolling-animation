import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111113] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh] border-t border-white/5">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p className="text-white font-bold">Data Analytics &amp; Machine Learning</p>
          <p className="text-gray-400">Exploratory Data Analysis, Statistical Modeling</p>
          <p className="text-[#f0c59b]">Python, Pandas, Scikit-Learn, Tableau</p>
        </div>
        
        <div className="flex flex-col gap-1 md:items-center">
          <p>B.Tech — Data Science &amp; Engineering</p>
          <a href="#projects" className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1">View Featured Projects</a>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <p className="text-emerald-400 font-bold">&bull; Open to Opportunities</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-16 md:py-20 overflow-hidden">
        <h2 
          className="text-[18vw] md:text-[16vw] leading-none font-black tracking-tighter lowercase select-none text-white/90 hover:text-[#f0c59b] transition-colors duration-500 w-full text-center"
          style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif" }}
        >
          hrutuja
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold">Get In Touch</a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            &copy; {new Date().getFullYear()} Hrutuja Dhoble &bull; Data Analyst &amp; ML Enthusiast
          </p>
        </div>
        
        <div className="flex flex-col gap-1 md:items-center">
          <a href="mailto:hrutujadhoble483@gmail.com" className="underline hover:text-[#f0c59b] transition-colors underline-offset-4 decoration-1 lowercase">hrutujadhoble483@gmail.com</a>
        </div>
        
        <div className="flex flex-col gap-2 md:items-end">
          <a href="https://github.com/HrutujaDhoble" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f0c59b] transition-colors underline-offset-4 decoration-1">GitHub</a>
          <a href="https://linkedin.com/in/hrutuja-dhoble-4bb192258" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f0c59b] transition-colors underline-offset-4 decoration-1">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
