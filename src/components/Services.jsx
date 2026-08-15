import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

const TagCard = ({ number, title, text, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    
    // Trigger when the line tip is 50px into the card
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;
    
    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <div 
      ref={ref}
      data-aos={aosType || "fade-up"} 
      data-aos-delay={aosDelay}
      className={`w-72 sm:w-80 rounded-[2rem] p-2 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 z-10 ${className} ${
        isActive ? 'bg-[#ff2a2a] border-red-400 shadow-[0_20px_50px_rgba(255,42,42,0.4)]' : 'bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* The hole punch */}
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20"></div>
      </div>
      
      {/* Inner container */}
      <div className={`w-full h-full rounded-[1.5rem] mt-8 p-8 flex flex-col min-h-[220px] transition-colors duration-700 ${
        isActive ? 'bg-red-700/50' : 'bg-[#f4f4f4]'
      }`}>
        <span className={`text-xl font-bold mb-2 font-serif italic transition-colors duration-700 ${
          isActive ? 'text-red-200' : 'text-gray-400'
        }`}>{number}</span>
        
        <h3 className={`text-2xl font-black mb-3 tracking-tight transition-colors duration-700 ${
          isActive ? 'text-white' : 'text-gray-900'
        }`}>{title}</h3>
        
        <p className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${
          isActive ? 'text-red-100' : 'text-gray-500'
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
            Building production systems from code to cloud
            {/* Hand-drawn arrow */}
            <svg className="absolute -bottom-10 right-10 w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" className="hidden" />
              <path d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            From backend architecture and cloud deployments to CI/CD automation — here's how I've contributed across real production environments.
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
            stroke="black" 
            strokeWidth="2" 
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
            stroke="black" 
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
            title="Backend & DevOps Intern"
            text="SyncSaS Technologies (Remote) · Dec 2024 – Jun 2025. Developed scalable backend services and RESTful APIs using Node.js, Express.js, and MongoDB. Deployed and maintained cloud-based production environments with Docker, AWS, Linux, and Nginx. Implemented CI/CD workflows using GitHub Actions and Jenkins."
            className="md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6"
            aosType="fade-left"
            aosDelay="100"
            pathLength={pathLength}
            containerRef={containerRef}
          />

          <TagCard 
            number="02"
            title="Software Engineer"
            text="Jan 2025 – Present. Independently designed, developed, deployed, and maintained an end-to-end production-grade web application. Worked directly with stakeholders on requirements, scoping, and delivery. Built production infrastructure using AWS, Docker, Linux, Nginx, SSL, DNS, and automated deployment workflows."
            className="md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6"
            aosType="fade-right"
            aosDelay="200"
            pathLength={pathLength}
            containerRef={containerRef}
          />

          <TagCard 
            number="03"
            title="Soliva Guard"
            text="Production E-Commerce Platform — React, Node.js, Express.js, MongoDB, Docker, AWS, Nginx, GitHub Actions. Built and deployed a production-grade platform with secure auth, payment integration, order management, and admin dashboard. Automated containerized deployments with CI/CD."
            className="md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3"
            aosType="fade-left"
            aosDelay="300"
            pathLength={pathLength}
            containerRef={containerRef}
          />

          <TagCard 
            number="04"
            title="K8s Multi-Tier Deploy"
            text="Kubernetes, Docker, Helm, Jenkins, AWS, GitHub Actions. Deployed a production-style multi-tier microservices application on Kubernetes. Automated CI/CD pipelines for rolling updates with minimal downtime. Implemented service discovery, load balancing, and health checks following cloud-native practices."
            className="md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%] -rotate-1 md:-rotate-3"
            aosType="fade-right"
            aosDelay="400"
            pathLength={pathLength}
            containerRef={containerRef}
          />

          {/* Hand-drawn end text */}
          <div 
            data-aos="fade-in" 
            data-aos-delay="600"
            className="hidden md:block absolute top-[1250px] left-[60%] font-['Caveat',cursive] text-3xl text-gray-600 rotate-6"
          >
            Shipped to production!
          </div>

        </div>

      </div>

      {/* Projects Section */}
      <div id="projects" className="max-w-6xl mx-auto mt-24 md:mt-32">
        <div data-aos="fade-up" className="mb-16">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Projects
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">What I've Built</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div data-aos="fade-up" data-aos-delay="100" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 group border border-gray-200">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">01</span>
            <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Soliva Guard</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">Production e-commerce platform with secure authentication, payment integration, order management, and admin dashboard. Automated containerized deployments with CI/CD.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['React', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'AWS', 'Nginx', 'GitHub Actions'].map(tag => (
                <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-600 tracking-wide uppercase">{tag}</span>
              ))}
            </div>
            <a href="https://solivaguard.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#ff2a2a] hover:underline underline-offset-4">Live Demo →</a>
          </div>

          {/* Project 2 */}
          <div data-aos="fade-up" data-aos-delay="200" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 group border border-gray-200">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">02</span>
            <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Multi-Tier K8s Deployment</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">Production-style multi-tier microservices on Kubernetes. Automated CI/CD pipelines for rolling updates with minimal downtime. Service discovery, load balancing, and health checks.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Kubernetes', 'Docker', 'Helm', 'Jenkins', 'AWS', 'GitHub Actions'].map(tag => (
                <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-600 tracking-wide uppercase">{tag}</span>
              ))}
            </div>
            <a href="https://github.com/adi-Git-Hub/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#ff2a2a] hover:underline underline-offset-4">GitHub →</a>
          </div>

          {/* Project 3 */}
          <div data-aos="fade-up" data-aos-delay="300" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 group border border-gray-200">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">03</span>
            <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">3D Shopping Experience</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">Immersive 3D e-commerce experience with interactive product visualization, smooth animations, and real-time user interactions. Optimized rendering and asset loading performance.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['React.js', 'Three.js', 'React Three Fiber', 'GSAP'].map(tag => (
                <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-600 tracking-wide uppercase">{tag}</span>
              ))}
            </div>
            <a href="https://github.com/adi-Git-Hub/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#ff2a2a] hover:underline underline-offset-4">GitHub →</a>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-6xl mx-auto mt-24 md:mt-32">
        <div data-aos="fade-up" className="mb-12">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Skills
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">Technical Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Backend Engineering */}
          <div data-aos="fade-up" data-aos-delay="100" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Backend Engineering</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express.js', 'React.js', 'Next.js', 'MongoDB', 'REST APIs', 'JWT Auth', 'Firebase', 'Three.js', 'GSAP', 'Git'].map(skill => (
                <span key={skill} className="text-[11px] font-bold px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>

          {/* Production Infrastructure */}
          <div data-aos="fade-up" data-aos-delay="200" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Production Infrastructure</h3>
            <div className="flex flex-wrap gap-2">
              {['AWS (EC2, IAM, VPC, S3, ECR, EKS)', 'Linux', 'Docker', 'Kubernetes', 'Helm', 'Terraform', 'Nginx', 'SSL/TLS', 'Reverse Proxy', 'DNS'].map(skill => (
                <span key={skill} className="text-[11px] font-bold px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>

          {/* DevOps Engineering */}
          <div data-aos="fade-up" data-aos-delay="300" className="bg-[#f4f4f4] rounded-[1.5rem] p-8 border border-gray-200">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">DevOps Engineering</h3>
            <div className="flex flex-wrap gap-2">
              {['CI/CD', 'GitHub Actions', 'Jenkins', 'Terraform', 'Containerization', 'Container Orchestration', 'Multi-Tier Architecture', 'Microservices', 'Production Deployment', 'Infrastructure Optimization', 'Cloud Cost Optimization', 'SonarQube'].map(skill => (
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
              Certifications
            </div>
            <div className="flex flex-col gap-4">
              {[
                { name: 'AWS Cloud Practitioner Essentials', url: 'https://adi-git-hub.github.io/aditya-certificate/certificates/pages/aws-cloud-practitioner-essentials.html' },
                { name: 'AWS Certified DevOps Engineer – Professional (Exam Prep)', url: 'https://adi-git-hub.github.io/aditya-certificate/certificates/pages/aws-certified-devops-engineer-exam-prep.html' },
                { name: 'AWS Certified DevOps Engineer – Professional (Domain 1)', url: 'https://adi-git-hub.github.io/aditya-certificate/certificates/pages/aws-certified-devops-engineer-domain-1-review.html' },
                { name: 'AWS Certified DevOps Engineer – Professional (Domain 2)', url: 'https://adi-git-hub.github.io/aditya-certificate/certificates/pages/aws-certified-devops-engineer-domain-2-review.html' },
                { name: 'AWS Certified DevOps Engineer – Professional (Domain 3)', url: 'https://adi-git-hub.github.io/aditya-certificate/certificates/pages/aws-certified-devops-engineer-domain-3-review.html' },
              ].map((cert, i) => (
                <a 
                  key={i}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f4f4f4] rounded-xl px-6 py-4 flex items-center justify-between border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 group"
                >
                  <span className="text-sm font-bold text-gray-800">{cert.name}</span>
                  <span className="text-xs font-bold text-[#ff2a2a] group-hover:underline underline-offset-4 whitespace-nowrap ml-4">View Credential →</span>
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
              <p className="text-base font-bold text-gray-600 mb-2">Artificial Intelligence</p>
              <p className="text-sm text-gray-500 font-medium">G. H. Raisoni College of Engineering and Management</p>
              <p className="text-sm text-gray-400 font-bold mt-3">2022 – 2026</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Services;
