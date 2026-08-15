// Interaction layer: smooth scroll, reveals, hero sequence, cursor,
// magnetic buttons, panel tilt, ripples.

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasGsap = typeof gsap !== "undefined";

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Nav scrolled state
  var nav = document.querySelector(".nav");
  function onScrollNav() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  // ------------------------------------------------------------------
  // Lenis smooth scroll
  // ------------------------------------------------------------------
  var lenis = null;
  if (!reducedMotion && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    if (hasGsap && typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      })(0);
    }
  }

  // Anchor links through Lenis
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (target && lenis) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -20, duration: 1.4 });
      }
    });
  });

  // ------------------------------------------------------------------
  // Hero entrance + reveals (GSAP)
  // ------------------------------------------------------------------
  if (hasGsap && !reducedMotion) {
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

    var heroTitle = document.querySelector("[data-split]");
    if (heroTitle) {
      // Split into gradient words. Transforms must live on the
      // background-clip:text element itself — transformed children
      // break the clipped gradient and render invisible text.
      var words = heroTitle.textContent.trim().split(/\s+/);
      heroTitle.innerHTML = words
        .map(function (word) {
          return '<span class="word grad">' + word + "</span>";
        })
        .join(" ");

      gsap.set(heroTitle, { opacity: 1 });
      var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".eyebrow", { y: 24, opacity: 0, duration: 0.9 }, 0.15)
        .from(heroTitle.querySelectorAll(".word"), {
          yPercent: 60,
          opacity: 0,
          rotateX: -40,
          filter: "blur(10px)",
          transformOrigin: "50% 100%",
          stagger: 0.16,
          duration: 1.2,
        }, 0.3)
        .from(".role-line", { y: 26, opacity: 0, duration: 0.9 }, 0.9)
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.9 }, 1.05)
        .from(".hero-cta .btn", { y: 22, opacity: 0, stagger: 0.12, duration: 0.8 }, 1.2)
        .from(".scroll-hint", { opacity: 0, duration: 1 }, 1.6)
        .from(".nav", { y: -24, opacity: 0, duration: 0.8 }, 0.5);
    }

    // Scroll reveals
    if (typeof ScrollTrigger !== "undefined") {
      document.querySelectorAll(".reveal").forEach(function (el) {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      // Slight parallax on panel media
      if (finePointer) {
        document.querySelectorAll(".panel-media").forEach(function (media) {
          gsap.fromTo(media, { y: 26 }, {
            y: -26,
            ease: "none",
            scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        });
      }
    }
  } else {
    // No GSAP or reduced motion: show everything
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = 1;
      el.style.transform = "none";
      el.style.filter = "none";
    });
    var t = document.querySelector("[data-split]");
    if (t) {
      t.innerHTML = t.textContent.trim().split(/\s+/)
        .map(function (w) { return '<span class="word grad">' + w + "</span>"; })
        .join(" ");
      t.style.opacity = 1;
    }
  }

  // ------------------------------------------------------------------
  // Rotating role words
  // ------------------------------------------------------------------
  var roleEl = document.querySelector(".role-word");
  if (roleEl && !reducedMotion) {
    var roles = ["Cloud Engineer", "DevOps Engineer", "Backend Engineer"];
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % roles.length;
      if (hasGsap) {
        gsap.to(roleEl, {
          y: -14,
          opacity: 0,
          duration: 0.32,
          ease: "power2.in",
          onComplete: function () {
            roleEl.textContent = roles[idx];
            gsap.fromTo(roleEl, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
          },
        });
      } else {
        roleEl.textContent = roles[idx];
      }
    }, 2600);
  }

  // ------------------------------------------------------------------
  // Custom cursor
  // ------------------------------------------------------------------
  if (finePointer && !reducedMotion) {
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    var halo = document.createElement("div");
    halo.className = "cursor-halo";
    document.body.append(halo, dot);

    var cx = innerWidth / 2, cy = innerHeight / 2;
    var hx = cx, hy = cy;
    window.addEventListener("pointermove", function (e) {
      cx = e.clientX;
      cy = e.clientY;
      dot.style.transform = "translate(" + (cx - 3) + "px," + (cy - 3) + "px)";
    }, { passive: true });

    (function haloLoop() {
      hx += (cx - hx) * 0.08;
      hy += (cy - hy) * 0.08;
      halo.style.transform = "translate(" + (hx - 170) + "px," + (hy - 170) + "px)";
      requestAnimationFrame(haloLoop);
    })();
  }

  // ------------------------------------------------------------------
  // Magnetic buttons
  // ------------------------------------------------------------------
  if (finePointer && !reducedMotion) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      var strength = 22;
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = "translate(" + dx * strength * 0.4 + "px," + dy * strength * 0.35 + "px)";
      });
      btn.addEventListener("pointerleave", function () {
        if (hasGsap) {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)", clearProps: "transform" });
        } else {
          btn.style.transform = "";
        }
      });
    });
  }

  // Ripple click
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height);
      var span = document.createElement("span");
      span.className = "ripple";
      span.style.width = span.style.height = size + "px";
      span.style.left = e.clientX - r.left - size / 2 + "px";
      span.style.top = e.clientY - r.top - size / 2 + "px";
      btn.appendChild(span);
      setTimeout(function () { span.remove(); }, 650);
    });
  });

  // ------------------------------------------------------------------
  // Panel tilt + cursor glow
  // ------------------------------------------------------------------
  if (finePointer && !reducedMotion) {
    document.querySelectorAll(".panel").forEach(function (panel) {
      var raf = null;
      panel.addEventListener("pointermove", function (e) {
        var r = panel.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        panel.style.setProperty("--mx", px * 100 + "%");
        panel.style.setProperty("--my", py * 100 + "%");
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var rx = (0.5 - py) * 7;
          var ry = (px - 0.5) * 9;
          panel.style.transform =
            "translateY(-8px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
        });
      });
      panel.addEventListener("pointerleave", function () {
        if (hasGsap) {
          gsap.to(panel, {
            rotateX: 0, rotateY: 0, y: 0,
            duration: 0.9, ease: "elastic.out(1, 0.5)", clearProps: "transform",
          });
        } else {
          panel.style.transform = "";
        }
      });
    });
  }
})();
