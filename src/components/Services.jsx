import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

const TagCard = ({ number, title, text, className, aosDelay, aosType, pathLength, targetProgress = 0.5 }) => {
  const [isActive, setIsActive] = useState(false);

  // Synchronized with dashed line progress with zero layout reflows
  useMotionValueEvent(pathLength, "change", (latest) => {
    const shouldActive = latest >= targetProgress;
    if (shouldActive !== isActive) {
      setIsActive(shouldActive);
    }
  });

  return (
    <div 
      data-aos={aosType || "fade-up"} 
      data-aos-delay={aosDelay}
      className={`w-72 sm:w-80 rounded-[2rem] p-2 relative flex flex-col items-center hover:scale-[1.02] transition-[transform,box-shadow,border-color] duration-250 ease-out z-10 hardware-accelerated ${className} ${
        isActive ? 'bg-[#eb5e55] border-rose-300 shadow-[0_20px_50px_rgba(235,94,85,0.35)]' : 'bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* The hole punch */}
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20"></div>
      </div>
      
      {/* Inner container */}
      <div className={`w-full h-full rounded-[1.5rem] mt-8 p-8 flex flex-col min-h-[220px] transition-[background-color,color] duration-300 ease-out ${
        isActive ? 'bg-[#c83d36]' : 'bg-[#f4f4f4]'
      }`}>
        <span className={`text-xl font-bold mb-2 font-serif italic transition-colors duration-300 ${
          isActive ? 'text-rose-100' : 'text-gray-400'
        }`}>{number}</span>
        
        <h3 className={`text-2xl font-black mb-3 tracking-tight transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-900'
        }`}>{title}</h3>
        
        <p className={`text-sm leading-relaxed font-medium transition-colors duration-300 ${
          isActive ? 'text-rose-50' : 'text-gray-500'
        }`}>
          {text}
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  const experienceContainerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: experienceContainerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section 
      id="experience"
      className="bg-white pt-24 pb-28 md:pb-36 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div 
        ref={experienceContainerRef}
        className="max-w-6xl mx-auto relative md:h-[1350px]"
      >
        
        {/* Header Content */}
        <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Experience &amp; Work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            Building practical software and AI-driven solutions
            {/* Hand-drawn arrow */}
            <svg className="absolute -bottom-10 right-10 w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" className="hidden" />
              <path d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            From application engineering and database systems to collaborative full-stack platforms and AI integration.
          </p>
        </div>

        {/* Desktop SVG Animated Dashed Line */}
        <svg 
          className="hidden md:block absolute top-0 left-0 w-full h-[1350px] pointer-events-none z-0" 
          viewBox="0 0 1000 1350" 
          preserveAspectRatio="none"
        >
          {/* Faint background path (optional guide) */}
          <path 
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="2" 
            strokeDasharray="8 10" 
          />

          {/* Mask to reveal the dashed path based on scroll */}
          <mask id="path-mask">
            <motion.path 
              d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" 
              fill="none" 
              stroke="white" 
              strokeWidth="20" 
              style={{ pathLength }}
            />
          </mask>

          {/* The actual dashed line that gets revealed */}
          <path 
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" 
            fill="none" 
            stroke="#eb5e55" 
            strokeWidth="2.5" 
            strokeDasharray="8 10" 
            mask="url(#path-mask)"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Mobile Animated Vertical Dashed Line */}
        <svg 
          className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" 
          viewBox="0 0 4 100" 
          preserveAspectRatio="none"
        >
          <path 
            d="M 2,0 L 2,100" 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            vectorEffect="non-scaling-stroke"
          />
          <mask id="path-mask-mobile">
            <motion.path 
              d="M 2,0 L 2,100" 
              fill="none" 
              stroke="white" 
              strokeWidth="4" 
              style={{ pathLength }}
              vectorEffect="non-scaling-stroke"
            />
          </mask>
          <path 
            d="M 2,0 L 2,100" 
            fill="none" 
            stroke="#eb5e55" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            mask="url(#path-mask-mobile)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Cards Container */}
        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          
          <TagCard 
            number="01"
            title="Software & Web Development"
            text="Application Development · Modern Web. Designing and engineering practical software with Python, Java, C++, React.js, and JavaScript, focusing on structured architecture, problem solving, and responsive web design."
            className="md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6"
            aosType="fade-left"
            aosDelay="100"
            pathLength={pathLength}
            targetProgress={0.18}
          />

          <TagCard 
            number="02"
            title="SolivaGuard Platform"
            text="Collaborative E-Commerce Work. Contributed to customer shopping experiences, product and order management workflows, administrative dashboard features, and Razorpay payment gateway integration."
            className="md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6"
            aosType="fade-right"
            aosDelay="200"
            pathLength={pathLength}
            targetProgress={0.42}
          />

          <TagCard 
            number="03"
            title="EDVIKO AI Platform"
            text="AI-Powered Educational Technology. Implemented AI-assisted learning experiences, interactive academic support workflows, document processing features, and REST API database integration."
            className="md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3"
            aosType="fade-left"
            aosDelay="300"
            pathLength={pathLength}
            targetProgress={0.65}
          />

          <TagCard 
            number="04"
            title="Databases & Analytics"
            text="Database Management & Visualization. Designing schemas, structuring queries, and managing data with SQL, MySQL, and MongoDB, complemented by business dashboards in Power BI and Tableau."
            className="md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%] -rotate-1 md:-rotate-3"
            aosType="fade-right"
            aosDelay="400"
            pathLength={pathLength}
            targetProgress={0.88}
          />

          {/* Hand-drawn end text */}
          <div 
            data-aos="fade-in" 
            data-aos-delay="600"
            className="hidden md:block absolute top-[1250px] left-[60%] font-['Caveat',cursive] text-3xl text-[#eb5e55] font-bold rotate-6"
          >
            Practical solutions engineered with purpose!
          </div>

        </div>

      </div>

      {/* Subtle section transition divider */}
      <div className="w-full max-w-6xl mx-auto my-16 md:my-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Projects Section */}
      <div id="projects" className="max-w-6xl mx-auto">
        <div data-aos="fade-up" className="mb-16">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Featured Projects
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">What I've Built</h2>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
            Selected projects demonstrating collaborative software engineering, AI-assisted learning systems, and modern web application development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project 1: SolivaGuard */}
          <div data-aos="fade-up" data-aos-delay="0" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(235,94,85,0.15)] transition-[transform,box-shadow,border-color] duration-250 ease-out hover:-translate-y-1.5 group border border-gray-200 hover:border-[#eb5e55]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#eb5e55] uppercase">01</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide">Collaborative</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">SolivaGuard — E-Commerce Platform &amp; Admin Dashboard</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                A collaborative e-commerce platform featuring customer shopping functionality and an administrative dashboard. Contributed to customer-facing shopping workflows, product &amp; order management, backend API integration, authentication, and Razorpay payment integration.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'API Integration'].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-700 tracking-wide uppercase">{tag}</span>
                ))}
              </div>
              <div className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#eb5e55]" />
                <span>Collaborative Platform Engineering</span>
              </div>
            </div>
          </div>

          {/* Project 2: EDVIKO */}
          <div data-aos="fade-up" data-aos-delay="120" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(235,94,85,0.15)] transition-[transform,box-shadow,border-color] duration-250 ease-out hover:-translate-y-1.5 group border border-gray-200 hover:border-[#eb5e55]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#eb5e55] uppercase">02</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wide">EdTech &amp; AI</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">EDVIKO — AI-Powered Educational Platform</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                An educational technology project focused on providing AI-assisted learning experiences and digital academic support. Features AI-powered tutor assistance, interactive classroom workflows for students and educators, document and quiz evaluations, and RESTful database persistence.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AI Services', 'Framer Motion'].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-700 tracking-wide uppercase">{tag}</span>
                ))}
              </div>
              <div className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#eb5e55]" />
                <span>AI Learning Assistance &amp; System Integration</span>
              </div>
            </div>
          </div>

          {/* Project 3: Personal Portfolio */}
          <div data-aos="fade-up" data-aos-delay="240" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(235,94,85,0.15)] transition-[transform,box-shadow,border-color] duration-250 ease-out hover:-translate-y-1.5 group border border-gray-200 hover:border-[#eb5e55]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#eb5e55] uppercase">03</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wide">Live Project</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Personal Portfolio Website</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                A personal portfolio showcasing academic background, technical skills, projects, and professional interests. Features a responsive modern interface, interactive 3D physics-driven ID badge, GSAP timeline zoom scrub, and integrated Nodemailer contact service.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React 19', 'Tailwind CSS v4', 'Three.js / R3F', 'GSAP', 'Vite', 'Node.js'].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-700 tracking-wide uppercase">{tag}</span>
                ))}
              </div>
              <a href="#home" className="text-sm font-bold text-[#eb5e55] hover:underline underline-offset-4 flex items-center gap-1 cursor-pointer">
                Explore Current Site ↑
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div id="skills" className="max-w-6xl mx-auto mt-24 md:mt-32">
        <div data-aos="fade-up" className="mb-12">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Technical Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">Skills &amp; Technologies</h2>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
            Core programming languages, web frameworks, databases, and visualization tools verified through academic curriculum and projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Programming & Core Concepts */}
          <div data-aos="fade-up" data-aos-delay="0" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight">Programming &amp; Core Concepts</h3>
              <p className="text-xs text-gray-500 font-medium mb-5">Foundational languages and algorithmic problem solving</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'C', 'C++', 'Java', 'Data Structures & Algorithms', 'OOP', 'Problem Solving'].map(skill => (
                <span key={skill} className="text-[11px] font-bold px-3.5 py-1.5 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>

          {/* Web Development & APIs */}
          <div data-aos="fade-up" data-aos-delay="120" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight">Web Development &amp; APIs</h3>
              <p className="text-xs text-gray-500 font-medium mb-5">Frontend interfaces, backend runtimes, and integrations</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'REST APIs', 'API Integration', 'Application Development'].map(skill => (
                <span key={skill} className="text-[11px] font-bold px-3.5 py-1.5 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>

          {/* Databases & Analytics */}
          <div data-aos="fade-up" data-aos-delay="240" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight">Databases, Data &amp; AI</h3>
              <p className="text-xs text-gray-500 font-medium mb-5">Relational and document storage, BI tools, and AI fundamentals</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['SQL', 'MySQL', 'DBMS', 'MongoDB', 'Power BI', 'Tableau', 'AI/ML Fundamentals'].map(skill => (
                <span key={skill} className="text-[11px] font-bold px-3.5 py-1.5 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Education */}
      <div id="education" className="max-w-6xl mx-auto mt-24 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Certifications */}
          <div data-aos="fade-up" data-aos-delay="0">
            <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
              Certifications &amp; Learning
            </div>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Great Learning — Python Certificate', issuer: 'Great Learning', year: '2026' },
                { name: 'Great Learning — MySQL for Data Analytics', issuer: 'Great Learning', year: '2026' },
              ].map((cert, i) => (
                <div 
                  key={i}
                  className="bg-[#f4f4f4] rounded-xl px-6 py-4 flex items-center justify-between border border-gray-200 hover:shadow-md hover:border-[#eb5e55]/40 transition-all duration-300 group"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{cert.issuer} &bull; {cert.year}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div data-aos="fade-up" data-aos-delay="150">
            <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
              Education
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#f4f4f4] rounded-[1.5rem] p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">M.Tech (Pursuing)</h3>
                  <span className="text-xs font-bold text-[#eb5e55] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">2026–2028</span>
                </div>
                <p className="text-sm font-bold text-[#eb5e55] mb-1">Raisoni SkillTech University, Nagpur</p>
                <p className="text-xs text-gray-600 font-medium">Expected Completion: 2028</p>
              </div>

              <div className="bg-[#f4f4f4] rounded-[1.5rem] p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">Bachelor of Technology</h3>
                  <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2.5 py-0.5 rounded-full">CGPA: 6.72/10</span>
                </div>
                <p className="text-sm font-bold text-[#eb5e55] mb-1">Information Technology</p>
                <p className="text-xs text-gray-600 font-medium">Sinhgad College of Engineering, Vadgaon, Pune</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Seamless Organic Dark Bridge to Contact Section ── */}
      <div className="absolute -bottom-px left-0 w-full pointer-events-none z-10 overflow-hidden leading-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 sm:h-16 md:h-24 fill-[#121214] block"
          shapeRendering="geometricPrecision"
        >
          <path d="M0,0 C320,100 780,110 1200,30 L1200,120 L0,120 Z" />
        </svg>
      </div>

    </section>
  );
};

export default Services;
