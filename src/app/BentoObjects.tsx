"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ---- glass material: transmission + iridescence + emerald absorption + inner glow ---- */
function glassMat() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#0f6b4a"), metalness: 0, roughness: 0.05,
    transmission: 1, thickness: 1.5, ior: 1.5,
    attenuationColor: new THREE.Color("#1fd08c"), attenuationDistance: 2.4,
    clearcoat: 1, clearcoatRoughness: 0.08,
    iridescence: 0.7, iridescenceIOR: 1.3, iridescenceThicknessRange: [130, 420],
    specularIntensity: 1, envMapIntensity: 1.8,
    emissive: new THREE.Color("#0a4030"), emissiveIntensity: 0.35, transparent: true,
  });
}
function accentMat() {
  return new THREE.MeshStandardMaterial({
    color: 0x5bf0bd, emissive: new THREE.Color(0x2fd39a), emissiveIntensity: 1.0,
    roughness: 0.3, metalness: 0,
  });
}
const TAU = Math.PI * 2;
const setEI = (m: THREE.Mesh, v: number) => { (m.material as THREE.MeshStandardMaterial).emissiveIntensity = v; };

type Model = { group: THREE.Group; update: (ph: number) => void };
// ph in [0,1]; ph==0 and ph==1 are the SAME pose (seamless). Idle renders ph=1.

/* 1. Complete Coverage: highlighted document pad, glow wave sweeps the lines */
function mCover(): Model {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new RoundedBoxGeometry(2.0, 2.7, 0.16, 5, 0.1), glassMat()));
  const ws = [1.3, 1.0, 1.2, 0.85, 1.1, 0.7];
  const bars = ws.map((w, i) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, 0.06), accentMat());
    b.geometry.translate(w / 2, 0, 0); b.position.set(-0.85, 0.9 - i * 0.36, 0.11); g.add(b); return b;
  });
  return { group: g, update: (ph) => {
    g.rotation.set(0.06 * Math.sin(ph * TAU), -0.28 + 0.14 * Math.sin(ph * TAU), 0);
    bars.forEach((b, i) => setEI(b, 0.55 + 0.9 * Math.max(0, Math.sin(ph * TAU - i * 0.7))));
  }};
}

/* 2. Operational Certainty: wax seal / stamp with a checkmark that lifts + presses */
function mCert(): Model {
  const g = new THREE.Group();
  const seal = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.34, 56), glassMat());
  seal.rotation.x = Math.PI / 2; g.add(seal);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.06, 16, 56), accentMat()); ring.position.z = 0.16; g.add(ring);
  const s = new THREE.Shape();
  s.moveTo(-0.5, 0); s.lineTo(-0.15, -0.42); s.lineTo(0.62, 0.5); s.lineTo(0.42, 0.68); s.lineTo(-0.15, -0.02); s.lineTo(-0.32, 0.16); s.closePath();
  const check = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: false }), accentMat());
  check.position.set(-0.08, -0.05, 0.14); check.scale.setScalar(0.9); g.add(check);
  return { group: g, update: (ph) => {
    g.rotation.set(0.05, -0.22 + 0.12 * Math.sin(ph * TAU), 0);
    check.position.z = 0.14 + 0.34 * Math.sin(ph * Math.PI);
    setEI(check, 0.6 + 1.0 * Math.sin(ph * Math.PI));
    setEI(ring, 0.5 + 0.7 * Math.sin(ph * Math.PI));
  }};
}

/* 3. Institutional Intelligence: crystalline brain, synapse pulse + full spin */
function mIntel(): Model {
  const g = new THREE.Group();
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 2), glassMat());
  core.scale.set(1.18, 0.95, 1.05); g.add(core);
  for (let i = 0; i < 3; i++) {
    const arc = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.04, 10, 44, Math.PI * 1.25), accentMat());
    setEI(arc, 0.35); arc.rotation.set(0.5 * i, 0.7 * i, 0.3 * i); g.add(arc);
  }
  const P = [[0.9,0.6,0.6],[-0.9,0.5,0.5],[0.4,-0.8,0.7],[-0.5,-0.6,0.8],[0,1,0.4],[0.75,0.05,-0.85]];
  const nodes = P.map((pt) => { const n = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), accentMat());
    n.position.set(pt[0], pt[1], pt[2]).multiplyScalar(1.05); g.add(n); return n; });
  return { group: g, update: (ph) => {
    g.rotation.set(0.12 * Math.sin(ph * TAU), -0.3 + ph * TAU, 0);
    nodes.forEach((n, i) => { const f = Math.max(0, Math.sin(ph * TAU - i)); setEI(n, 0.5 + 1.0 * f); n.scale.setScalar(1 + 0.2 * f); });
  }};
}

/* 4. Continuous Operations: infinity loop, pulse travels the full loop once */
function mCont(): Model {
  const g = new THREE.Group();
  const pts: THREE.Vector3[] = []; const A = 1.5;
  for (let i = 0; i < 90; i++) { const th = (i / 90) * TAU; const d = 1 + Math.sin(th) ** 2;
    pts.push(new THREE.Vector3(A * Math.cos(th) / d, A * Math.sin(th) * Math.cos(th) / d, 0)); }
  const curve = new THREE.CatmullRomCurve3(pts, true);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 200, 0.17, 18, true), glassMat()));
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 20), accentMat()); g.add(dot);
  return { group: g, update: (ph) => {
    g.rotation.set(0, -0.1 + 0.1 * Math.sin(ph * TAU), 0);
    dot.position.copy(curve.getPointAt(ph));
    setEI(dot, 1.0 + 0.6 * Math.abs(Math.sin(ph * TAU)));
  }};
}

/* 5. Business Impact: arrow rests in the bullseye; hover fires a ripple */
function mImpact(): Model {
  const g = new THREE.Group();
  const rings = [1.35, 0.92, 0.5].map((r) => { const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.085, 14, 48), glassMat()); g.add(ring); return ring; });
  const center = new THREE.Mesh(new THREE.CircleGeometry(0.3, 40), accentMat()); center.position.z = 0.03; g.add(center);
  const ar = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.3, 12), accentMat()); shaft.rotation.z = Math.PI / 2; ar.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.42, 16), accentMat()); head.rotation.z = -Math.PI / 2; head.position.x = 0.78; ar.add(head);
  ar.rotation.z = 0.55; ar.position.set(0.1, 0.1, 0.5); g.add(ar);
  return { group: g, update: (ph) => {
    g.rotation.set(0, -0.18 + 0.1 * Math.sin(ph * TAU), 0);
    const r = Math.sin(ph * Math.PI);
    rings.forEach((ring, i) => ring.scale.setScalar(1 + 0.14 * r * (3 - i)));
    setEI(center, 0.6 + 1.3 * r);
  }};
}

/* 6. Scalable Operations: buildings + rising arrow, growth pulse rises */
function mScale(): Model {
  const g = new THREE.Group();
  const hs = [1.2, 1.8, 2.6];
  const bl = hs.map((h, i) => { const b = new THREE.Mesh(new RoundedBoxGeometry(0.72, h, 0.72, 3, 0.05), glassMat());
    b.geometry.translate(0, h / 2, 0); b.position.set(-0.95 + i * 0.92, -1.35, 0); g.add(b); return b; });
  const ar = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.7, 12), accentMat()); shaft.rotation.z = -0.7; shaft.geometry.translate(0, 0.85, 0); ar.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.52, 16), accentMat()); head.position.set(Math.sin(0.7) * 1.7, Math.cos(0.7) * 1.7, 0); head.rotation.z = -0.7; ar.add(head);
  ar.position.set(0.6, 0.2, 0.55); g.add(ar);
  return { group: g, update: (ph) => {
    g.rotation.set(0, -0.32 + 0.12 * Math.sin(ph * TAU), 0);
    bl.forEach((b, i) => b.scale.set(1, 1 + 0.06 * Math.max(0, Math.sin(ph * TAU - i * 0.9)), 1));
    ar.position.y = 0.2 + 0.28 * Math.sin(ph * Math.PI);
  }};
}

const BUILDERS: Record<string, () => Model> = { cover: mCover, cert: mCert, intel: mIntel, cont: mCont, impact: mImpact, scale: mScale };

/* shared studio HDRI (something for the glass to refract/reflect) */
let equirect: Promise<THREE.Texture> | null = null;
function loadEnv() {
  if (!equirect) equirect = new Promise((res) => {
    new THREE.TextureLoader().load("/assets/studio-env.jpg", (t) => { t.mapping = THREE.EquirectangularReflectionMapping; res(t); });
  });
  return equirect;
}

function setupTile(el: HTMLElement, eq: THREE.Texture): (() => void) | void {
  const builder = BUILDERS[el.dataset.obj || ""]; if (!builder) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  let w = Math.max(1, el.clientWidth), h = Math.max(1, el.clientHeight);
  renderer.setSize(w, h, false); renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(32, w / h, 0.1, 100); cam.position.set(0, 0.4, 7.4); cam.lookAt(0, 0, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromEquirectangular(eq).texture;
  scene.add(new THREE.PointLight(0x2fd39a, 6, 20).translateZ(0.5)); // inner glow tone
  const key = new THREE.PointLight(0xa9ffe0, 14, 60); key.position.set(3, 4, 5); scene.add(key);
  scene.add(new THREE.AmbientLight(0x1a3a2c, 0.5));
  const model = builder(); scene.add(model.group);

  const DUR = 1500;
  let ph = 1, animStart = 0, raf = 0;
  const frame = () => { model.update(ph); renderer.render(scene, cam); };
  const loop = (now: number) => {
    const e = (now - animStart) / DUR;
    if (e >= 1) { ph = 1; animStart = 0; frame(); raf = 0; return; }
    ph = e; frame(); raf = requestAnimationFrame(loop);
  };
  const host = (el.closest(".btile") as HTMLElement) || el;
  if (!reduce) host.addEventListener("mouseenter", () => { animStart = performance.now(); ph = 0; if (!raf) raf = requestAnimationFrame(loop); });
  frame();

  const ro = new ResizeObserver(() => {
    w = Math.max(1, el.clientWidth); h = Math.max(1, el.clientHeight);
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); if (!raf) frame();
  });
  ro.observe(el);
  return () => { ro.disconnect(); if (raf) cancelAnimationFrame(raf); renderer.dispose(); pmrem.dispose(); if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement); };
}

export default function BentoObjects() {
  useEffect(() => {
    let alive = true; let cleanups: (void | (() => void))[] = [];
    loadEnv().then((eq) => { if (!alive) return; cleanups = Array.from(document.querySelectorAll<HTMLElement>("[data-obj]")).map((n) => setupTile(n, eq)); });
    return () => { alive = false; cleanups.forEach((c) => c && c()); };
  }, []);
  return null;
}
