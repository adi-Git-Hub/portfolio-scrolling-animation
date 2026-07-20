import React, { useRef, useState, useEffect, useMemo } from 'react';
import stackImage from '../assets/about/image.png';
import Lanyard from './Lanyard/Lanyard';
import OrbitImages from './OrbitImages/OrbitImages';

// 3D orbit icons
import awsIcon from '../assets/orbit-icons/aws.jpg';
import dockerIcon from '../assets/orbit-icons/docker.jpg';
import kubernetesIcon from '../assets/orbit-icons/kubernetes.jpg';
import terraformIcon from '../assets/orbit-icons/terraform.jpg';
import linuxIcon from '../assets/orbit-icons/linux.jpg';
import nodejsIcon from '../assets/orbit-icons/nodejs.jpg';
import reactIcon from '../assets/orbit-icons/react.jpg';
import mongodbIcon from '../assets/orbit-icons/mongodb.jpg';

const orbitIcons = [
  awsIcon, dockerIcon, kubernetesIcon, terraformIcon,
  linuxIcon, nodejsIcon, reactIcon, mongodbIcon,
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

  /* ── Scroll-based card fall at 80% ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || shouldFall) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (-rect.top / rect.height >= 0.8) setShouldFall(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      ref={sectionRef}
      className="relative w-full overflow-hidden font-sans"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(255,130,130,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 85%, rgba(100,0,0,0.25) 0%, transparent 50%),
          linear-gradient(145deg, #a21c1c 0%, #e83a3a 20%, #dc2626 50%, #b91c1c 75%, #8b1515 100%)
        `,
      }}
    >
      {/* ── Ambient glow spots ── */}
      <div className="absolute top-[10%] left-[12%] w-[450px] h-[450px] rounded-full bg-white/[0.025] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[8%] w-[380px] h-[380px] rounded-full bg-red-950/25 blur-[100px] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-40">
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 lg:gap-20 items-start">

          {/* ═══════════════════════════════════
              LEFT COLUMN — Portrait (Hero)
              38% width, large, dominant
          ═══════════════════════════════════ */}
          <div className="flex flex-col items-center w-full md:w-[38%] shrink-0">
            <div className="relative flex justify-center w-full h-[700px] animate-float">
              {/* Soft shadow beneath the card */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[40%] h-8 bg-black/15 rounded-full blur-2xl pointer-events-none" />
              <Lanyard
                position={[0, 0, 15]}
                gravity={[0, -40, 0]}
                transparent={true}
                frontImage={stackImage}
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
              className="inline-flex items-center gap-2 border border-white/15 rounded-full px-5 py-1.5 text-[13px] text-red-100/70 font-semibold tracking-wide uppercase mb-8 backdrop-blur-sm bg-white/[0.05]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
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
              className="text-base md:text-[16.5px] text-red-100/75 leading-[1.85] md:leading-[1.95] max-w-[620px]"
            >
              Hi, I'm{' '}
              <span className="text-white font-black text-lg tracking-wide">
                ADITYA PANDE
              </span>
              , a <K>Backend</K> &amp; <K>DevOps</K> Engineer with hands-on
              experience building and maintaining production-grade systems. I work
              across backend development, cloud infrastructure, and deployment
              automation — from writing scalable <K>REST APIs</K> with{' '}
              <K>Node.js</K> and Express to containerizing applications with{' '}
              <K>Docker</K> and orchestrating workloads on <K>Kubernetes</K>. I
              deploy and manage production environments on <K>AWS</K>, automate{' '}
              <K>CI/CD</K> pipelines, and handle everything from DNS and SSL to
              infrastructure optimization and post-deployment maintenance.
            </p>

            {/* ── Orbit Technology Showcase ──
                Positioned directly below the paragraph.
                Horizontal elliptical orbit as a secondary tech display. */}
            <div
              ref={orbitRef}
              data-aos="fade-up"
              data-aos-delay="400"
              className="mt-10 md:mt-12 w-full max-w-[620px]"
            >
              {orbitWidth > 0 && orbitPath && (
                <OrbitImages
                  images={orbitIcons}
                  responsive={false}
                  width="100%"
                  height={ORBIT_H}
                  baseWidth={orbitWidth}
                  shape="custom"
                  customPath={orbitPath}
                  itemSize={iconSize}
                  duration={32}
                  rotation={-5}
                />
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
      <div className="absolute top-10 right-10 md:right-20 text-white/[0.06] pointer-events-none">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-white/[0.04] pointer-events-none">
        <svg className="w-14 h-14 animate-pulse" fill="currentColor" viewBox="0 0 24 24" style={{ animationDelay: '1.5s' }}>
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>
    </section>
  );
};

export default About;
