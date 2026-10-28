import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hrutujaIcard from '../assets/about/hrutuja_icard.png';
import Lanyard from './Lanyard/Lanyard';
import OrbitImages from './OrbitImages/OrbitImages';

gsap.registerPlugin(ScrollTrigger);

// 3D orbit icons for Data Analysis & ML Stack
import pythonIcon from '../assets/orbit-icons/python.png';
import pandasIcon from '../assets/orbit-icons/pandas.png';
import scikitIcon from '../assets/orbit-icons/scikit.png';
import sqlIcon from '../assets/orbit-icons/sql.png';
import tableauIcon from '../assets/orbit-icons/tableau.png';
import powerbiIcon from '../assets/orbit-icons/powerbi.png';
import numpyIcon from '../assets/orbit-icons/numpy.png';
import mlIcon from '../assets/orbit-icons/ml.png';

const techStack = [
  { name: 'Python', category: 'Core Language', icon: pythonIcon },
  { name: 'Pandas', category: 'Data Analysis', icon: pandasIcon },
  { name: 'NumPy', category: 'Numerical Computing', icon: numpyIcon },
  { name: 'Scikit-Learn', category: 'Machine Learning', icon: scikitIcon },
  { name: 'SQL', category: 'Database & Query', icon: sqlIcon },
  { name: 'Tableau', category: 'Visual Analytics', icon: tableauIcon },
  { name: 'Power BI', category: 'BI Dashboards', icon: powerbiIcon },
  { name: 'Machine Learning', category: 'Predictive AI', icon: mlIcon },
];

/* Keyword highlight — only important tech terms */
const K = ({ children }) => (
  <span className="text-white font-semibold">{children}</span>
);

const About = () => {
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);
  const [shouldFall, setShouldFall] = useState(false);
  const [orbitWidth, setOrbitWidth] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'orbit'

  /* ── Scroll-based card fall at 80% — uses ScrollTrigger for zero-reflow efficiency ── */
  useEffect(() => {
    if (!sectionRef.current || shouldFall) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        if (self.progress >= 0.8 && !shouldFall) {
          setShouldFall(true);
        }
      },
    });
    return () => trigger.kill();
  }, [shouldFall]);

  /* ── Track orbit container width for responsive custom path ── */
  useEffect(() => {
    if (!orbitRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width;
      if (w > 0) setOrbitWidth(w);
    });
    observer.observe(orbitRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Responsive elliptical orbit path ── */
  const ORBIT_H = 200;
  const orbitPath = useMemo(() => {
    if (orbitWidth <= 0) return '';
    const cx = orbitWidth / 2;
    const cy = ORBIT_H / 2;
    const rx = orbitWidth * 0.43;
    const ry = 72;
    return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
  }, [orbitWidth]);

  const iconSize = Math.max(56, Math.min(82, orbitWidth * 0.13));

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden font-sans"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(240,197,155,0.22) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 85%, rgba(235,94,85,0.28) 0%, transparent 50%),
          linear-gradient(180deg, #eb5e55 0%, #db5047 25%, #c83d36 60%, #a82c26 100%)
        `,
      }}
    >
      {/* ── Ambient glow spots ── */}
      <div className="absolute top-[10%] left-[12%] w-[450px] h-[450px] rounded-full bg-white/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[8%] w-[380px] h-[380px] rounded-full bg-red-950/25 blur-[100px] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-40">
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 lg:gap-20 items-start">

          {/* ═══════════════════════════════════
              LEFT COLUMN — Interactive 3D Pass Badge
              38% width, large, dominant
          ═══════════════════════════════════ */}
          <div className="flex flex-col items-center w-full md:w-[38%] shrink-0">
            <div className="relative flex justify-center w-full h-[620px] md:h-[700px]">
              {/* Soft shadow beneath the card */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[40%] h-8 bg-black/15 rounded-full blur-2xl pointer-events-none" />
              <Lanyard
                position={[0, 0, 15]}
                gravity={[0, -40, 0]}
                transparent={true}
                frontImage={hrutujaIcard}
                backImage={hrutujaIcard}
                lanyardWidth={1.5}
                shouldFall={shouldFall}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════
              RIGHT COLUMN — Text + Orbit
              62% width, text first, orbit below
          ═══════════════════════════════════ */}
          <div className="flex-1 mt-4 md:mt-12 relative z-20">

            {/* Badge */}
            <div
              data-aos="fade-up"
              className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-1.5 text-[13px] text-white/90 font-semibold tracking-wide uppercase mb-8 backdrop-blur-sm bg-white/[0.08]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              About Me
            </div>

            {/* Heading */}
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
            >
              Hello!
            </h2>

            {/* Paragraph — max-w 620px, generous line-height, selective bold */}
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-base md:text-[16.5px] text-red-50/90 leading-[1.85] md:leading-[1.95] max-w-[620px]"
            >
              Hi, I'm{' '}
              <span className="text-white font-black text-lg tracking-wide">
                HRUTUJA DHOBLE
              </span>
              , a <K>Data Analyst</K> and <K>Machine Learning</K> enthusiast focused on turning raw data into meaningful insights through analytics, visualization, and intelligent modeling. I specialize in exploratory data analysis, statistical evaluation, and developing predictive machine learning systems with <K>Python</K>, <K>Pandas</K>, <K>NumPy</K>, and <K>Scikit-Learn</K>. My work encompasses business analytics, health outcome predictions, and designing interactive dashboards in <K>Tableau</K> and <K>Power BI</K> to make data intuitive and impactful for decision-makers.
            </p>

            {/* ── Technology Stack Showcase ── */}
            <div
              ref={orbitRef}
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-8 md:mt-10 w-full max-w-[640px]"
            >
              {/* Header with View Toggle */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest">
                    Tech Stack & Tools
                  </h3>
                </div>

                <div className="flex items-center bg-black/25 p-0.5 rounded-full border border-white/15 text-[11px] font-semibold text-white/80">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#fff4ea] text-gray-900 shadow-sm font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Grid View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('orbit')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      viewMode === 'orbit'
                        ? 'bg-[#fff4ea] text-gray-900 shadow-sm font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    3D Orbit
                  </button>
                </div>
              </div>

              {/* View 1: Clean, Fully-Labeled Interactive Tech Grid */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="group relative flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 hover:border-white/40 backdrop-blur-md shadow-md hover:shadow-xl transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 cursor-default"
                    >
                      <div className="w-12 h-12 flex items-center justify-center mb-2 transform group-hover:scale-105 transition-transform duration-200 ease-out">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                        />
                      </div>
                      <span className="text-white font-bold text-xs sm:text-[13px] tracking-tight text-center leading-snug">
                        {tech.name}
                      </span>
                      <span className="text-white/60 text-[10px] font-medium tracking-wide text-center mt-0.5">
                        {tech.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* View 2: Smooth 3D Orbit Animation */}
              {viewMode === 'orbit' && orbitWidth > 0 && orbitPath && (
                <div className="relative py-2">
                  <OrbitImages
                    images={techStack.map((t) => t.icon)}
                    responsive={false}
                    width="100%"
                    height={ORBIT_H}
                    baseWidth={orbitWidth}
                    shape="custom"
                    customPath={orbitPath}
                    itemSize={54}
                    duration={36}
                    rotation={-5}
                    showPath={true}
                    pathColor="rgba(255, 244, 234, 0.25)"
                    pathWidth={1.5}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Torn paper divider ── */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-14 md:h-24 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
        </svg>
      </div>

      {/* ── Decorative accents (very subtle) ── */}
      <div className="absolute top-10 right-10 md:right-20 text-white/[0.08] pointer-events-none">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-white/[0.05] pointer-events-none">
        <svg className="w-14 h-14 animate-pulse" fill="currentColor" viewBox="0 0 24 24" style={{ animationDelay: '1.5s' }}>
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>
    </section>
  );
};

export default About;
