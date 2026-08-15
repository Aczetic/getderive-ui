"use client";
import { useEffect, useRef } from "react";
import { MARKUP } from "./siteMarkup";

// Faithful port of derive-site/index.html: the markup is injected verbatim, then the
// original vendor libs (gsap -> ScrollTrigger -> lenis) and the ported inline scripts
// (public/site.js) are loaded in order, after the DOM exists.
const SCRIPTS = [
  "/vendor/gsap.min.js",
  "/vendor/ScrollTrigger.min.js",
  "/vendor/lenis.min.js",
  "/site.js",
];

export default function Home() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // guard against double-invoke
    ran.current = true;
    let i = 0;
    const loadNext = () => {
      if (i >= SCRIPTS.length) return;
      const s = document.createElement("script");
      s.src = SCRIPTS[i++];
      s.async = false; // preserve execution order
      s.onload = loadNext;
      document.body.appendChild(s);
    };
    loadNext();
  }, []);

  return <div id="site-root" dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
