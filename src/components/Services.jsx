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
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section 
      id="experience"
      ref={containerRef}
      className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto relative md:h-[1350px]">
        
        {/* Header Content */}
        <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Experience &amp; Work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            Transforming complex data into predictive insights
            {/* Hand-drawn arrow */}
            <svg className="absolute -bottom-10 right-10 w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" className="hidden" />
              <path d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            From exploratory data analysis and statistical modeling to interactive dashboards and machine learning systems.
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
            title="Data Analytics & Modeling"
            text="Exploratory Data Analysis · Statistical Modeling. Cleaning, parsing, and transforming raw transactional and behavioral datasets. Engineering predictive features and evaluating core distributions using Python, Pandas, NumPy, and Scikit-Learn."
            className="md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6"
            aosType="fade-left"
            aosDelay="100"
            pathLength={pathLength}
            targetProgress={0.18}
          />

          <TagCard 
            number="02"
            title="Employee Performance Analysis"
            text="Workforce Analytics & Modeling. Designed end-to-end data pipelines and classification models to identify key productivity drivers and retention factors, producing actionable dashboards that highlight attrition risk."
            className="md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6"
            aosType="fade-right"
            aosDelay="200"
            pathLength={pathLength}
            targetProgress={0.42}
          />

          <TagCard 
            number="03"
            title="Disease Outbreak Prediction"
            text="Predictive Healthcare Analytics. Constructed epidemiological forecasting models evaluating multi-variable clinical datasets. Achieved robust classification metrics to aid early disease outbreak detection and geographic risk mapping."
            className="md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3"
            aosType="fade-left"
            aosDelay="300"
            pathLength={pathLength}
            targetProgress={0.65}
          />

          <TagCard 
            number="04"
            title="SoulEase Mental Health App"
            text="Sentiment Analytics & AI Assistance. Built personalized recommendation logic and sentiment analysis models, translating user mood check-ins and health records into supportive wellness insights."
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
            Insights delivered to production!
          </div>

        </div>

      </div>

      {/* Projects Section */}
      <div id="projects" className="max-w-6xl mx-auto mt-24 md:mt-32">
        <div data-aos="fade-up" className="mb-16">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Featured Projects
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">What I've Built</h2>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
            Selected projects demonstrating data analytics, predictive machine learning, and human-centric software solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div data-aos="fade-up" data-aos-delay="100" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(235,94,85,0.15)] transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-1 group border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#eb5e55] uppercase mb-4 block">01</span>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Employee Performance Analysis</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                Comprehensive data analytics and predictive evaluation exploring workforce productivity, tenure correlations, and workplace satisfaction to predict employee retention patterns.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'EDA', 'Data Visualization'].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-700 tracking-wide uppercase">{tag}</span>
                ))}
              </div>
              <a href="https://github.com/HrutujaDhoble" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#eb5e55] hover:underline underline-offset-4 flex items-center gap-1">
                GitHub Repository →
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div data-aos="fade-up" data-aos-delay="200" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(235,94,85,0.15)] transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-1 group border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#eb5e55] uppercase mb-4 block">02</span>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Disease Outbreak Prediction</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                Epidemiological machine learning classification model forecasting contagious outbreak vectors, clinical severity, and regional hotspots to support preventive healthcare planning.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Machine Learning', 'Python', 'Scikit-Learn', 'Classification', 'Predictive Modeling'].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-700 tracking-wide uppercase">{tag}</span>
                ))}
              </div>
              <a href="https://github.com/HrutujaDhoble" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#eb5e55] hover:underline underline-offset-4 flex items-center gap-1">
                GitHub Repository →
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div data-aos="fade-up" data-aos-delay="300" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(235,94,85,0.15)] transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-1 group border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#eb5e55] uppercase mb-4 block">03</span>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">SoulEase Mental Health Care App</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                Empathetic digital wellbeing platform leveraging natural language sentiment analysis and psychological mood tracking to provide personalized mental wellness suggestions.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Sentiment Analysis', 'NLP', 'Python', 'React', 'Data Analytics', 'Healthcare AI'].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-700 tracking-wide uppercase">{tag}</span>
                ))}
              </div>
              <a href="https://github.com/HrutujaDhoble" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#eb5e55] hover:underline underline-offset-4 flex items-center gap-1">
                GitHub Repository →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-6xl mx-auto mt-24 md:mt-32">
        <div data-aos="fade-up" className="mb-12">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Technical Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">Skills &amp; Technologies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Data Analytics & Visualization */}
          <div data-aos="fade-up" data-aos-delay="100" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Data Analytics &amp; Visualization</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Pandas', 'NumPy', 'SQL', 'Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'Excel', 'EDA', 'Statistical Analysis', 'Data Wrangling'].map(skill => (
                <span key={skill} className="text-[11px] font-bold px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>

          {/* Machine Learning & AI */}
          <div data-aos="fade-up" data-aos-delay="200" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Machine Learning &amp; AI</h3>
            <div className="flex flex-wrap gap-2">
              {['Scikit-Learn', 'Supervised Learning', 'Classification', 'Regression', 'Clustering', 'Predictive Modeling', 'NLP', 'Sentiment Analysis', 'Feature Engineering', 'Model Evaluation'].map(skill => (
                <span key={skill} className="text-[11px] font-bold px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>

          {/* Tools & Development */}
          <div data-aos="fade-up" data-aos-delay="300" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Tools &amp; Workflow</h3>
            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub', 'Jupyter Notebooks', 'Google Colab', 'VS Code', 'REST APIs', 'Data Pipelines', 'Data Preprocessing', 'Hypothesis Testing', 'Data Storytelling'].map(skill => (
                <span key={skill} className="text-[11px] font-bold px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Education */}
      <div className="max-w-6xl mx-auto mt-24 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Certifications */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
              Certifications &amp; Learning
            </div>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Data Analytics & Visualization Specialization', issuer: 'Verified Credential' },
                { name: 'Machine Learning & Predictive Modeling with Python', issuer: 'Verified Credential' },
                { name: 'Data Analysis with Pandas, NumPy & SQL', issuer: 'Verified Credential' },
                { name: 'Tableau & Power BI for Business Intelligence', issuer: 'Verified Credential' },
              ].map((cert, i) => (
                <a 
                  key={i}
                  href="https://linkedin.com/in/hrutuja-dhoble-4bb192258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f4f4f4] rounded-xl px-6 py-4 flex items-center justify-between border border-gray-200 hover:shadow-md hover:border-[#eb5e55]/40 transition-all duration-300 group"
                >
                  <span className="text-sm font-bold text-gray-800">{cert.name}</span>
                  <span className="text-xs font-bold text-[#eb5e55] group-hover:underline underline-offset-4 whitespace-nowrap ml-4">LinkedIn Profile →</span>
                </a>
              ))}
            </div>
          </div>

          {/* Education */}
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
              Education
            </div>
            <div className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200">
              <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Bachelor of Technology</h3>
              <p className="text-base font-bold text-[#eb5e55] mb-2">Data Science &amp; Engineering Focus</p>
              <p className="text-sm text-gray-600 font-medium">Undergraduate Academic Curriculum</p>
              <p className="text-sm text-gray-400 font-bold mt-3">2022 – 2026</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Services;
