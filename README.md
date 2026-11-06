# 🚀 Bhavana N Masare — Personal Portfolio & Interactive 3D Experience

An interactive, creative portfolio designed for **Bhavana N Masare** (Information Technology Graduate, M.Tech Student & Software Development Enthusiast), featuring custom GSAP ScrollTrigger zooming animations, 3D interactive physics lanyard ID card, tech stack visualizers, and Nodemailer contact integration.

🔗 **Live Demo (GitHub Pages):** [https://adi-Git-Hub.github.io/portfolio-scrolling-animation/](https://adi-Git-Hub.github.io/portfolio-scrolling-animation/)

---

## ✨ Features

- **GSAP Scroll-Driven Spotlight Zoom**: Smooth, cinematic scroll transition from the glasses illustration with dynamic glare bands into the coral hero section.
- **Hero Section**:
  - Two-column desktop and responsive stacked mobile layout.
  - Verified circular portrait with decorative accents.
  - Action buttons: **Explore My Projects →**, **Download Resume**, and **Get In Touch**.
  - Direct contact links: Email, Phone, LinkedIn, and GitHub.
- **Resume Download**:
  - Direct download access to verified resume (`Bhavana_N_Masare_Resume.pdf`) available in Hero, About, and Footer sections.
- **Interactive 3D Lanyard & ID Card**:
  - React Three Fiber + Rapier physics engine.
  - Realistic cloth and physics simulation allowing users to drag and swing the badge.
  - Portrait texture mapping on the 3D ID badge.
- **Tech Stack & Tools**:
  - Official icons for Python, React.js, SQL, MongoDB, Power BI, Tableau, Node.js, and AI Fundamentals.
  - Dual view modes: **Interactive Frosted Grid** (default) and **3D Orbit System**.
- **Featured Projects**:
  - **SolivaGuard**: Collaborative E-Commerce Platform & Admin Dashboard (React.js, Node.js, MongoDB, Razorpay).
  - **EDVIKO**: AI-Powered Educational Platform (React.js, Node.js, Express, MongoDB, AI Services).
  - **Personal Portfolio Website**: Interactive 3D physics badge & GSAP timeline scroll portfolio.
- **Education & Certifications**:
  - M.Tech (Pursuing), Raisoni SkillTech University, Nagpur (2026–2028).
  - B.Tech in Information Technology, Sinhgad College of Engineering, Pune (CGPA: 6.72/10).
  - Great Learning Python Certificate (2026).
  - Great Learning MySQL for Data Analytics Certificate (2026).
- **Contact Form with Nodemailer**:
  - Direct email submission to `bhavanamasare73@gmail.com`.
  - Development test mode using Ethereal Email with browser previews.
  - Mailto client fallback.

---

## 🛠️ Tech Stack

- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Animation & Physics**: GSAP 3, ScrollTrigger, Lenis Smooth Scroll, Three.js, React Three Fiber, React Three Rapier, Framer Motion
- **Backend**: Node.js, Express, Nodemailer

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/adi-Git-Hub/portfolio-scrolling-animation.git
cd portfolio-scrolling-animation
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:5180](http://localhost:5180) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## ✉️ Nodemailer Configuration

Copy `.env.example` to `.env` and add your 16-character Google App Password:
```env
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=bhavanamasare73@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_TO=bhavanamasare73@gmail.com
PORT=5001
```

Run the backend email server:
```bash
npm run server
```

---

## 👤 Author

**Bhavana N Masare**
- Location: Maharashtra, India
- Phone: +91 9767537552
- Email: bhavanamasare73@gmail.com
