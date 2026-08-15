# Aditya Pande — Certification Portfolio

Immersive certification portfolio hosted on GitHub Pages:
**https://adi-git-hub.github.io/aditya-certificate/**

Cinematic dark landing page with a real-time Three.js background (floating
DevOps-themed geometry, particle field, mouse-reactive camera), GSAP scroll
reveals, Lenis smooth scrolling, glassmorphism certificate panels with 3D
tilt and animated borders. Vanilla HTML/CSS/JS — libraries vendored locally
in `assets/js/vendor/`, no build step.

## Certifications

| Certificate | Issuer | Completed |
|---|---|---|
| [AWS Cloud Practitioner Essentials](certificates/pages/aws-cloud-practitioner-essentials.html) | AWS Training & Certification | October 30, 2025 |
| [Domain 1 Review: AWS Certified DevOps Engineer – Professional (DOP-C02)](certificates/pages/aws-certified-devops-engineer-domain-1-review.html) | AWS Training & Certification | October 30, 2025 |
| [Domain 2 Review: AWS Certified DevOps Engineer – Professional (DOP-C02)](certificates/pages/aws-certified-devops-engineer-domain-2-review.html) | AWS Training & Certification | October 30, 2025 |
| [Domain 3 Review: AWS Certified DevOps Engineer – Professional (DOP-C02)](certificates/pages/aws-certified-devops-engineer-domain-3-review.html) | AWS Training & Certification | October 30, 2025 |
| [Exam Prep Overview: AWS Certified DevOps Engineer – Professional (DOP-C02)](certificates/pages/aws-certified-devops-engineer-exam-prep.html) | AWS Training & Certification | October 30, 2025 |

## Structure

```
/
├── index.html                  # Cinematic landing page
├── assets/
│   ├── css/style.css           # Design system + glassmorphism styles
│   ├── js/main.js              # Interactions: cursor, tilt, magnetic, reveals
│   ├── js/scene.js             # Three.js background scene (ES module)
│   ├── js/vendor/              # three / gsap / ScrollTrigger / lenis
│   └── images/
└── certificates/
    ├── pdf/                    # Original certificate PDFs (SEO-friendly names)
    ├── preview/                # First-page PNG previews of each PDF
    └── pages/                  # Individual certificate pages
```

## Adding a new certificate

1. Add the PDF to `certificates/pdf/` with a kebab-case, SEO-friendly name (e.g. `aws-solutions-architect-associate.pdf`).
2. Generate a preview image from its first page:
   ```bash
   pdftoppm -png -r 120 -f 1 -l 1 certificates/pdf/<name>.pdf certificates/preview/<name>
   mv certificates/preview/<name>-1.png certificates/preview/<name>.png
   ```
3. Copy an existing page in `certificates/pages/`, update its title, details, and file references.
4. Add a matching card to `index.html`.

Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.
