import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { doodleSVG } from './doodle.js';
import bannerImage from '../assets/hero/banner.jpg';
import hrutujaPortrait from '../assets/hero/hrutuja_portrait.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const spotlightRef = useRef(null);
  const svgContainerRef = useRef(null);
  const heroContentRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Expose lenis globally for smooth navigation
    window.__lenis = lenis;

    // 2. Setup SVG and Sunglasses Zoom with Glare Reflections
    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';

    const settings = {
      lensImageURL: bannerImage,
      glaresPerLens: 2,
      finalZoomScale: 22,
      zoomFocusPoint: '47% 21%',
    };

    if (svgContainerRef.current) {
      svgContainerRef.current.innerHTML = doodleSVG;
    }

    const svg = svgContainerRef.current?.querySelector('svg');
    if (!svg) return;

    const defs = document.createElementNS(SVG_NAMESPACE, 'defs');
    svg.insertBefore(defs, svg.firstChild);

    const glareBands = [];
    const lensImages = [];

    const glarePaths = [...svg.querySelectorAll('path')].filter((path) => {
      return parseFloat(window.getComputedStyle(path).opacity) === 0.6;
    });

    glarePaths.forEach((glarePath, lensIndex) => {
      const lensShape = glarePath.previousElementSibling;
      if (!lensShape) return;

      const lensBounds = lensShape.getBBox();

      const clipId = `lens-clip-${lensIndex}`;
      const clipPath = document.createElementNS(SVG_NAMESPACE, 'clipPath');
      clipPath.setAttribute('id', clipId);
      clipPath.appendChild(lensShape.cloneNode(true));
      defs.appendChild(clipPath);

      const lensGroup = document.createElementNS(SVG_NAMESPACE, 'g');
      lensGroup.setAttribute('clip-path', `url(#${clipId})`);

      const lensImage = document.createElementNS(SVG_NAMESPACE, 'image');
      lensImage.setAttribute('href', settings.lensImageURL);
      lensImage.setAttributeNS(
        XLINK_NAMESPACE,
        'xlink:href',
        settings.lensImageURL,
      );
      lensImage.setAttribute('x', lensBounds.x);
      lensImage.setAttribute('y', lensBounds.y);
      lensImage.setAttribute('width', lensBounds.width);
      lensImage.setAttribute('height', lensBounds.height);
      lensImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      lensImage.setAttribute('opacity', '0');
      lensGroup.appendChild(lensImage);
      lensImages.push(lensImage);

      const bandWidth = lensBounds.width * 0.22;
      const sweepDistance = lensBounds.width + bandWidth * 2;
      const spacingBetweenBands = sweepDistance / settings.glaresPerLens;

      for (let i = 0; i < settings.glaresPerLens; i++) {
        const band = document.createElementNS(SVG_NAMESPACE, 'rect');
        band.setAttribute(
          'x',
          lensBounds.x + lensBounds.width * 0.3 - i * spacingBetweenBands,
        );
        band.setAttribute('y', lensBounds.y - lensBounds.height * 0.25);
        band.setAttribute('width', bandWidth);
        band.setAttribute('height', lensBounds.height * 1.5);
        band.setAttribute('fill', '#ffffff');
        band.setAttribute('opacity', '0.6');
        lensGroup.appendChild(band);
        glareBands.push({ band, sweepDistance });
      }

      glarePath.parentNode.insertBefore(lensGroup, glarePath);
      glarePath.remove();
    });

    gsap.set(svg, {
      transformOrigin: settings.zoomFocusPoint,
      transformBox: 'fill-box',
    });

    // 3. Create Pinned ScrollTrigger for the Spotlight Zoom into Hrutuja's Hero
    const spotlightSection = spotlightRef.current;

    const st = ScrollTrigger.create({
      trigger: spotlightSection,
      start: 'top top',
      end: () => '+=' + window.innerHeight * 2.5,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;

        // Animate glare bands
        const glareProgress = Math.min(progress / 0.75, 1);
        glareBands.forEach(({ band, sweepDistance }) => {
          gsap.set(band, { x: glareProgress * sweepDistance });
        });

        // Zoom into sunglasses (scale from 1 to 43)
        const scale = 1 + progress * 2 * (settings.finalZoomScale - 1);
        gsap.set(svg, { scale });

        // Fade in post-glasses architectural banner inside the sunglasses
        if (progress >= 0.4) {
          const fadeProgress = Math.min((progress - 0.4) / 0.35, 1);
          lensImages.forEach((image) =>
            gsap.set(image, { opacity: fadeProgress }),
          );
        } else {
          lensImages.forEach((image) => gsap.set(image, { opacity: 0 }));
        }

        // Reveal Hrutuja's Hero Section (Two-column layout)
        if (heroContentRef.current) {
          if (progress >= 0.55) {
            const heroOpacity = Math.min((progress - 0.55) / 0.3, 1);
            gsap.set(heroContentRef.current, {
              opacity: heroOpacity,
              pointerEvents: progress >= 0.75 ? 'auto' : 'none',
            });
          } else {
            gsap.set(heroContentRef.current, {
              opacity: 0,
              pointerEvents: 'none',
            });
          }
        }
      },
    });

    return () => {
      st.kill();
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
      window.__lenis = null;
    };
  }, []);

  const handleNav = (e, target) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = './Hrutuja_Dhoble_Resume.pdf';
    link.download = 'Hrutuja_Dhoble_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="home" className="relative w-full">
      {/* ═══════════════════════════════════════════════════════════
          STAGE 1 & 2: SPOTLIGHT SECTION (Woman with Sunglasses)
          Starts naturally near the top of viewport with NO NAVBAR.
          As user scrolls, zooms into the sunglasses and reveals
          the post-glasses pink/coral banner & Hrutuja's Hero.
      ═══════════════════════════════════════════════════════════ */}
      <section 
        ref={spotlightRef}
        className="spotlight relative w-full h-screen overflow-hidden bg-[#eb5e55]"
      >
        {/* SVG Container: Illustrated woman wearing sunglasses */}
        <div 
          ref={svgContainerRef}
          className="svg-container absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* ═══════════════════════════════════════════════════════════
            STAGE 3: HRUTUJA'S PREMIUM HERO SECTION (Two-Column Layout)
            Reveals directly inside the post-glasses zoom scene
            Matches reference layout, coral-red theme & exact content
        ═══════════════════════════════════════════════════════════ */}
        <div 
          ref={heroContentRef}
          className="absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none opacity-0 px-4 sm:px-8 md:px-14 lg:px-20 py-4 sm:py-6 overflow-y-auto lg:overflow-visible"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(235, 94, 85, 0.4) 0%, rgba(235, 94, 85, 0.92) 80%)'
          }}
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-12 relative z-20 my-auto pb-12 lg:pb-0">
            
            {/* ═══════════════════════════════════════════
                LEFT COLUMN (55–60% Width): Text & Controls
            ═══════════════════════════════════════════ */}
            <div className="w-full lg:w-[58%] flex flex-col items-start text-left">
              
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/20 border border-white/25 text-[#fff4ea] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-2 sm:mb-4 shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DATA ANALYSIS &bull; MACHINE LEARNING</span>
              </div>

              {/* Main Heading: "Hrutuja Dhoble" (two lines on desktop) */}
              <h1 
                className="text-white font-black tracking-tight leading-[0.96] text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] mb-2 sm:mb-3"
                style={{
                  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                Hrutuja <br className="hidden sm:inline" />
                <span className="text-[#fff4ea]">Dhoble</span>
              </h1>

              {/* Professional Role */}
              <p className="text-[#fce7d2] text-base sm:text-xl md:text-2xl font-bold tracking-tight mb-2 sm:mb-3">
                Data Analyst <span className="text-white/60 font-normal">|</span> Machine Learning Enthusiast
              </p>

              {/* Short Introduction Description */}
              <p className="text-white/90 text-xs sm:text-base md:text-[17px] max-w-xl font-normal leading-relaxed mb-4 sm:mb-6">
                Turning raw data into meaningful insights through analytics, visualization, and machine learning.
              </p>

              {/* Technology Skill Chips */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mb-4 sm:mb-7 max-w-lg">
                {['Python', 'SQL', 'Power BI', 'Tableau', 'Machine Learning'].map((chip) => (
                  <span 
                    key={chip}
                    className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/20 border border-white/30 text-white font-semibold text-[11px] sm:text-sm tracking-wide shadow-sm backdrop-blur-sm hover:bg-white/30 transition-colors select-none"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Two CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-7 w-full">
                {/* Primary CTA */}
                <a
                  href="#projects"
                  onClick={(e) => handleNav(e, '#projects')}
                  className="px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-[#fff4ea] text-gray-900 font-bold text-xs sm:text-base hover:bg-white hover:shadow-[0_0_25px_rgba(255,244,234,0.6)] transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore My Projects</span>
                  <span className="text-lg">→</span>
                </a>

                {/* Secondary CTA */}
                <a
                  href="./Hrutuja_Dhoble_Resume.pdf"
                  download="Hrutuja_Dhoble_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full border-2 border-[#fff4ea] text-[#fff4ea] font-bold text-xs sm:text-base hover:bg-[#fff4ea] hover:text-gray-900 transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Compact Social Links */}
              <div className="flex items-center gap-2.5 sm:gap-3 text-white">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#fff4ea]/70 font-semibold mr-1">Connect:</span>
                
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/hrutuja-dhoble-4bb192258"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hrutuja Dhoble on LinkedIn"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/25 border border-white/30 flex items-center justify-center text-white hover:bg-[#fff4ea] hover:text-gray-900 transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/HrutujaDhoble"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hrutuja Dhoble on GitHub"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/25 border border-white/30 flex items-center justify-center text-white hover:bg-[#fff4ea] hover:text-gray-900 transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:hrutujadhoble483@gmail.com"
                  aria-label="Send email to Hrutuja Dhoble"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/25 border border-white/30 flex items-center justify-center text-white hover:bg-[#fff4ea] hover:text-gray-900 transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-white" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
              </div>

            </div>

            {/* ═══════════════════════════════════════════
                RIGHT COLUMN (40–45% Width): Portrait & Rings
            ═══════════════════════════════════════════ */}
            <div className="w-full lg:w-[42%] flex items-center justify-center relative my-2 sm:my-3 lg:my-0">
              <div className="relative flex items-center justify-center">
                
                {/* Outer Dashed Decorative Ring */}
                <div className="absolute -inset-4 sm:-inset-8 md:-inset-12 lg:-inset-14 rounded-full border border-dashed border-[#fff4ea]/20 pointer-events-none" />
                
                {/* Inner Thin Cream Accent Ring */}
                <div className="absolute -inset-2 sm:-inset-4 md:-inset-5 lg:-inset-6 rounded-full border border-[#fff4ea]/30 pointer-events-none" />

                {/* Decorative Star Accents */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-[#fff4ea] text-xl sm:text-2xl select-none animate-pulse pointer-events-none">✦</div>
                <div className="absolute -bottom-2 -left-3 sm:-bottom-3 sm:-left-4 text-[#fce7d2] text-base sm:text-lg select-none opacity-80 pointer-events-none">✦</div>

                {/* Portrait Image Container: Prominent Circular Crop with Thin Cream Border */}
                <div className="w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-[430px] lg:h-[430px] rounded-full overflow-hidden border-[3px] sm:border-[4px] border-[#fff4ea] shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#eb5e55] relative z-10">
                  <img
                    src={hrutujaPortrait}
                    alt="Hrutuja Dhoble"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Subtle SCROLL DOWN Indicator at Bottom Center */}
          <a
            href="#about"
            onClick={(e) => handleNav(e, '#about')}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#fff4ea]/75 hover:text-white transition-colors cursor-pointer select-none z-30"
            aria-label="Scroll down to About section"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold">SCROLL DOWN</span>
            <svg 
              className="w-4 h-4 animate-bounce text-[#fff4ea]" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Larevoltosa Core SVG & Spotlight Styles */}
      <style>{`
        .svg-container svg {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          min-width: 700px;
        }

        path[style*="00000165916812323603747700000005172204528299523731"],
        path[style*="00000155118913244152270350000004269844240891065749"] {
          fill: #eb5e55 !important;
        }
      `}</style>
    </div>
  );
};

export default Hero;
