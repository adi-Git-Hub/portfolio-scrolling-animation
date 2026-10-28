# 🚀 Hrutuja Dhoble — Premium Data Analyst Portfolio & Scroll Animation

An interactive, creative portfolio designed for **Hrutuja Dhoble** (Data Analyst & Machine Learning Enthusiast), featuring custom GSAP ScrollTrigger zooming animations, 3D interactive physics lanyard ID card, tech stack visualizers, Nodemailer contact integration, and instant resume download.

🔗 **Live Demo (GitHub Pages):** [https://adi-Git-Hub.github.io/portfolio-scrolling-animation/](https://adi-Git-Hub.github.io/portfolio-scrolling-animation/)

---

## ✨ Features

- **GSAP Scroll-Driven Spotlight Zoom**: Smooth, cinematic scroll transition from the glasses illustration with dynamic glare bands into the coral hero section.
- **Hero Section**:
  - Two-column desktop and responsive stacked mobile layout.
  - Verified circular portrait with decorative accents.
  - Quick action buttons: **Explore My Projects →** and **Download Resume** (downloads `Hrutuja_Dhoble_Resume.pdf`).
  - Social profiles: LinkedIn, GitHub, and Email.
- **Interactive 3D Lanyard & ID Card**:
  - React Three Fiber + Rapier physics engine.
  - Realistic cloth and physics simulation allowing users to drag and swing the card.
  - Front and back portrait textures of Hrutuja.
- **Tech Stack & Tools**:
  - High-resolution, transparent official logos for Python, Pandas, NumPy, Scikit-Learn, SQL, Tableau, Power BI, and Machine Learning.
  - Dual view modes: **Interactive Frosted Grid** (default) and **3D Orbit System**.
- **Contact Form with Nodemailer**:
  - Direct email submission to `hrutujadhoble483@gmail.com`.
  - Development test mode using Ethereal Email with browser previews.
  - Bulletproof mailto client fallback.
- **Automated GitHub Pages Deployment**:
  - Pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) on every push to `main`.
  - Pre-built `gh-pages` branch for instant deployment.

---

## 🛠️ Tech Stack

- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Animation & Physics**: GSAP 3, ScrollTrigger, Lenis Smooth Scroll, Three.js, React Three Fiber, React Three Rapier
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

## 📄 Resume Download

The official resume PDF is located in `public/Hrutuja_Dhoble_Resume.pdf` and is downloaded directly when users click the **Download Resume** button in the hero section.

---

## ✉️ Nodemailer Configuration

Copy `.env.example` to `.env` and add your 16-character Google App Password:
```env
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=hrutujadhoble483@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_TO=hrutujadhoble483@gmail.com
PORT=5001
```

Run the backend email server:
```bash
npm run server
```

---

## 🌐 Deploy to GitHub Pages

This repo includes `.github/workflows/deploy.yml`:
1. In repository settings on GitHub, navigate to **Pages**.
2. Under **Build and deployment > Source**, select:
   - **GitHub Actions** (recommended) OR
   - **Deploy from a branch** &rarr; select branch `gh-pages` & folder `/ (root)`.
3. Your site will be live at `https://<username>.github.io/portfolio-scrolling-animation/`!

---

## 👤 Author

**Hrutuja Dhoble**
- LinkedIn: [Hrutuja Dhoble](https://linkedin.com/in/hrutuja-dhoble-4bb192258)
- GitHub: [@HrutujaDhoble](https://github.com/HrutujaDhoble)
- Email: hrutujadhoble483@gmail.com
