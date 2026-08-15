// Floating DevOps constellation — Three.js background scene.
// Abstract neon geometry: orchestration wheel, IaC cube stack, cloud,
// service nodes and a data knot drifting in space, camera reacting to mouse.

import * as THREE from "./vendor/three.module.min.js";

const canvas = document.getElementById("scene");
if (canvas) init(canvas);

function init(canvas) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 700px)").matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    // Static single-frame mode (reduced motion) must keep its buffer,
    // or the canvas blanks on the next page composite.
    preserveDrawingBuffer: reducedMotion,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x04050c, 0.045);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 14);

  // --- Lighting -------------------------------------------------------
  scene.add(new THREE.AmbientLight(0x223055, 1.1));

  const keyLight = new THREE.PointLight(0x4d7cfe, 320, 60);
  keyLight.position.set(8, 6, 10);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0xa06bff, 260, 60);
  rimLight.position.set(-9, -5, 8);
  scene.add(rimLight);

  const cyanLight = new THREE.PointLight(0x2be0f0, 140, 40);
  cyanLight.position.set(0, 8, 4);
  scene.add(cyanLight);

  // --- Materials ------------------------------------------------------
  const metal = (color, emissive, intensity = 0.25) =>
    new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity: intensity,
      metalness: 0.85,
      roughness: 0.28,
    });

  const wire = (color, opacity = 0.5) =>
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });

  // Soft glow sprite (fake bloom)
  const glowTexture = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,0.85)");
    grad.addColorStop(0.25, "rgba(255,255,255,0.28)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();

  const glow = (color, scale) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    sprite.scale.setScalar(scale);
    return sprite;
  };

  // --- Floating objects ----------------------------------------------
  const floaters = new THREE.Group();
  scene.add(floaters);

  function floater(mesh, { pos, spin, amp, speed, glowColor, glowScale }) {
    const holder = new THREE.Group();
    holder.position.set(...pos);
    holder.add(mesh);
    if (glowColor) holder.add(glow(glowColor, glowScale || 4));
    holder.userData = {
      basePos: new THREE.Vector3(...pos),
      spin,
      amp,
      speed,
      phase: Math.random() * Math.PI * 2,
    };
    floaters.add(holder);
    return holder;
  }

  // Orchestration wheel (Kubernetes-inspired: torus + seven spokes + hub)
  {
    const g = new THREE.Group();
    const mat = metal(0x2f5bd6, 0x3f6dff, 0.5);
    g.add(new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.075, 20, 72), mat));
    const spokeGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.28, 10);
    for (let i = 0; i < 7; i++) {
      const spoke = new THREE.Mesh(spokeGeo, mat);
      const a = (i / 7) * Math.PI * 2;
      spoke.position.set(Math.cos(a) * 0.64, Math.sin(a) * 0.64, 0);
      spoke.rotation.z = a + Math.PI / 2;
      g.add(spoke);
    }
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), metal(0x77b7ff, 0x9cd4ff, 0.7)));
    floater(g, {
      pos: [5.6, 2.4, -2],
      spin: [0.0, 0.0, 0.12],
      amp: 0.55,
      speed: 0.5,
      glowColor: 0x4d7cfe,
      glowScale: 6.5,
    });
  }

  // IaC cube stack (Terraform-inspired: three offset slabs)
  {
    const g = new THREE.Group();
    const mat = metal(0x6d3fd4, 0x8b5cf6, 0.45);
    const slab = new THREE.BoxGeometry(0.95, 0.95, 0.32);
    [[-0.55, 0, 0], [0.55, 0.28, -0.1], [0.55, -0.75, -0.1]].forEach(([x, y, z]) => {
      const m = new THREE.Mesh(slab, mat);
      m.position.set(x, y, z);
      g.add(m);
    });
    g.rotation.y = 0.5;
    floater(g, {
      pos: [-6.2, 1.6, -3],
      spin: [0.08, 0.14, 0],
      amp: 0.5,
      speed: 0.42,
      glowColor: 0xa06bff,
      glowScale: 6,
    });
  }

  // Cloud (cluster of glassy spheres)
  {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: 0x9db8e8,
      emissive: 0x35507f,
      emissiveIntensity: 0.35,
      metalness: 0.35,
      roughness: 0.4,
      transparent: true,
      opacity: 0.9,
    });
    [
      [0, 0, 0, 0.62],
      [-0.72, -0.14, 0.06, 0.44],
      [0.74, -0.12, 0.04, 0.48],
      [0.1, 0.42, -0.06, 0.42],
    ].forEach(([x, y, z, r]) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 26, 26), mat);
      m.position.set(x, y, z);
      g.add(m);
    });
    floater(g, {
      pos: [-4.6, -2.9, -1.5],
      spin: [0, 0.1, 0],
      amp: 0.65,
      speed: 0.36,
      glowColor: 0x6fa8ff,
      glowScale: 6.5,
    });
  }

  // Service node (octahedron, cyan)
  floater(new THREE.Mesh(new THREE.OctahedronGeometry(0.85), metal(0x14b8cc, 0x2be0f0, 0.55)), {
    pos: [4.9, -2.6, -1],
    spin: [0.18, 0.22, 0.05],
    amp: 0.5,
    speed: 0.6,
    glowColor: 0x2be0f0,
    glowScale: 5,
  });

  // Mesh network (wireframe icosahedron)
  floater(new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), wire(0x4d7cfe, 0.4)), {
    pos: [0.4, 3.4, -5],
    spin: [0.05, 0.09, 0.03],
    amp: 0.45,
    speed: 0.3,
  });

  // Data knot (pipeline)
  floater(
    new THREE.Mesh(new THREE.TorusKnotGeometry(0.62, 0.18, 120, 18), metal(0x3352c9, 0x5d7dff, 0.4)),
    {
      pos: [1.9, -3.6, -3.5],
      spin: [0.12, 0.16, 0],
      amp: 0.5,
      speed: 0.44,
      glowColor: 0x4d7cfe,
      glowScale: 4.5,
    }
  );

  // Distant wireframe cube
  floater(new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), wire(0xa06bff, 0.3)), {
    pos: [-2.6, 4.2, -7],
    spin: [0.07, 0.1, 0.06],
    amp: 0.4,
    speed: 0.33,
  });

  // --- Particle field -------------------------------------------------
  const particleCount = isMobile ? 380 : 950;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const palette = [new THREE.Color(0x4d7cfe), new THREE.Color(0x2be0f0), new THREE.Color(0xa06bff), new THREE.Color(0xffffff)];
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 44;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 26 - 4;
    const c = palette[(Math.random() * palette.length) | 0];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  scene.add(particles);

  // --- Interaction ----------------------------------------------------
  const mouse = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  let scrollY = window.scrollY;
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // In static (reduced-motion) mode the loop isn't running — redraw once.
    if (reducedMotion) renderer.render(scene, camera);
  });

  // --- Loop -----------------------------------------------------------
  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running && !reducedMotion) {
      clock.getDelta();
      requestAnimationFrame(tick);
    }
  });

  function tick() {
    if (!running) return;
    const t = clock.getElapsedTime();

    smooth.x += (mouse.x - smooth.x) * 0.045;
    smooth.y += (mouse.y - smooth.y) * 0.045;

    camera.position.x = smooth.x * 1.4;
    camera.position.y = -smooth.y * 0.9 - scrollY * 0.0016;
    camera.lookAt(0, -scrollY * 0.0016, 0);

    floaters.children.forEach((h) => {
      const { basePos, spin, amp, speed, phase } = h.userData;
      h.position.y = basePos.y + Math.sin(t * speed + phase) * amp;
      h.position.x = basePos.x + Math.cos(t * speed * 0.7 + phase) * amp * 0.4;
      const target = h.children[0];
      target.rotation.x += spin[0] * 0.016;
      target.rotation.y += spin[1] * 0.016;
      target.rotation.z += spin[2] * 0.016;
    });

    particles.rotation.y = t * 0.012;
    keyLight.position.x = 8 + Math.sin(t * 0.4) * 3;
    rimLight.position.y = -5 + Math.cos(t * 0.3) * 2.5;

    renderer.render(scene, camera);
    if (!reducedMotion) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
