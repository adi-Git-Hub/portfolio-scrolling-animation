import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false,
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sentMode, setSentMode] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }
    if (!formData.permission) {
      setStatus('error');
      setErrorMsg('Please give permission to contact you.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setPreviewUrl(null);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setSentMode(data.mode || 'live');
        setPreviewUrl(data.previewUrl || null);
        setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong with Nodemailer. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Connection error. Could not reach the email server. Please check your connection or send directly via email below.');
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#121214] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-800">
      {/* Huge Background Text — Composited on GPU layer for zero raster lag */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 will-change-transform hardware-accelerated"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-white/90 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Barlow Condensed', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div 
          data-aos="fade-up"
          className="bg-[#eb5e55] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between shadow-2xl hardware-accelerated"
        >
          <div className="text-xs font-bold tracking-[0.2em] mb-8 md:mb-14 uppercase opacity-95 text-[#fce7d2]">
            Let's Connect &bull; Open to Analytics &amp; ML Opportunities
          </div>

          {/* Contact Info Links */}
          <div className="flex flex-wrap gap-6 mb-12 text-sm font-semibold">
            <a href="mailto:hrutujadhoble483@gmail.com" className="text-white/95 hover:text-white underline underline-offset-4 decoration-1 transition-colors flex items-center gap-1.5">
              <span>✉</span> hrutujadhoble483@gmail.com
            </a>
            <a href="https://github.com/HrutujaDhoble" target="_blank" rel="noopener noreferrer" className="text-white/95 hover:text-white underline underline-offset-4 decoration-1 transition-colors flex items-center gap-1.5">
              <span>↗</span> GitHub
            </a>
            <a href="https://linkedin.com/in/hrutuja-dhoble-4bb192258" target="_blank" rel="noopener noreferrer" className="text-white/95 hover:text-white underline underline-offset-4 decoration-1 transition-colors flex items-center gap-1.5">
              <span>↗</span> LinkedIn
            </a>
          </div>

          {/* Success Message */}
          {status === 'success' && (
            <div className="mb-8 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-5 flex flex-col gap-3 animate-pulse-once border border-white/30">
              <div className="flex items-center gap-4">
                <svg className="w-7 h-7 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-bold text-lg">Message Sent Successfully via Nodemailer!</p>
                  <p className="text-sm text-white/90 mt-0.5">
                    {sentMode === 'live' 
                      ? "Delivered directly to Hrutuja's Gmail inbox (hrutujadhoble483@gmail.com). I'll reply promptly!" 
                      : "Handled by Nodemailer test environment. Your message was processed and queued."}
                  </p>
                </div>
              </div>

              {previewUrl && (
                <div className="mt-2 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-white/80">
                    🔍 Dev preview ready (Ethereal Email):
                  </span>
                  <a 
                    href={previewUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-900 font-semibold shadow hover:bg-[#fce7d2] transition-colors"
                  >
                    <span>View Sent Email Preview</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {status === 'error' && errorMsg && (
            <div className="mb-8 bg-black/30 backdrop-blur-sm rounded-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-red-300/30">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-white">{errorMsg}</p>
              </div>
              <a 
                href={`mailto:hrutujadhoble483@gmail.com?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(formData.message || 'Hi Hrutuja,')}`}
                className="text-xs font-bold underline underline-offset-2 hover:text-[#fce7d2] whitespace-nowrap"
              >
                Open in Email App &rarr;
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                <div className="relative">
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium rounded-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    id="message" 
                    placeholder="Type your message here" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full h-full min-h-[120px] bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium resize-none rounded-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-12 mt-4">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-white/90">
                <input 
                  type="checkbox" 
                  id="permission" 
                  checked={formData.permission}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded-sm border-white/40 bg-transparent text-white focus:ring-white focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" 
                  style={{ accentColor: "white" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-8 text-xs text-white/80 font-medium">
                <p className="leading-relaxed max-w-[400px]">
                  Thank you for visiting my portfolio. I will get back to you as soon as possible.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed text-white/60">
                    Open to full-time roles, internships, and data science collaborations.
                  </p>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className={`px-8 py-3 rounded-full border border-white/50 text-white font-bold flex items-center justify-center gap-3 transition-[background-color,color,transform,box-shadow] duration-200 ease-out active:scale-95 group whitespace-nowrap self-start sm:self-auto cursor-pointer ${
                      status === 'loading' 
                        ? 'opacity-70 cursor-not-allowed' 
                        : 'hover:bg-white hover:text-gray-900 shadow-md hover:shadow-xl'
                    }`}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : status === 'success' ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
