/* Ported verbatim from derive-site/index.html (thread-field + hero liquid + proof film). */
(function(){
  "use strict";
  var JUMP = new URLSearchParams(location.search).get('jump');
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var AUTOMATION = (navigator.webdriver === true) || (JUMP !== null);
  history.scrollRestoration = 'manual';                 // refresh always starts at the top
  if (JUMP === null) { try { window.scrollTo(0,0); } catch(e){} }

  /* ---------- canvas thread field ---------- */
  var cv = document.getElementById('field'), cx = cv ? cv.getContext('2d') : null;
  var W=0, H=0, DPR = Math.min(1.5, window.devicePixelRatio || 1);
  var state = { order: 1, alpha: 0.6, t: 0 };   // smooth ordered lattice; renders only inside #close
  var PF = { flow:0 };   // proof journey position (0..4), reversible on scroll
  var THREADS = [];
  var LANES = 9;
  function lerp(a,b,t){ return a+(b-a)*t; }
  function easeInOut(t){ t=Math.max(0,Math.min(1,t)); return t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; }
  function buildThreads(){
    THREADS.length = 0;
    var n = window.innerWidth < 760 ? 100 : 170;   // horizontal ribbons, densely stacked
    for (var i=0;i<n;i++){
      THREADS.push({
        baseY: -0.08 + 1.16*(i/(n-1)),            // spread across (and just past) the section
        hueGold: (i%5===0) || (i%5===2),          // ~40% gold, interleaved with emerald
        w: 0.5 + Math.random()*0.6,
        op: 0.18 + Math.random()*0.34,
        ph: Math.random()*0.5,
        av: 0.85 + Math.random()*0.4
      });
    }
  }
  function resize(){
    if(!cv) return;
    var cw = cv.clientWidth||innerWidth, ch = cv.clientHeight||innerHeight;
    W = cv.width = Math.floor(cw*DPR);
    H = cv.height = Math.floor(ch*DPR);
  }
  function drawField(){
    if(!cx) return;
    cx.clearRect(0,0,W,H);
    if (state.alpha <= 0.012) return;
    var ga = state.alpha * (window.innerWidth < 760 ? 0.8 : 1), t = state.t, seg = 44;
    cx.lineCap = 'round';
    for (var i=0;i<THREADS.length;i++){
      var th = THREADS[i];
      cx.beginPath();
      for (var s2=0;s2<=seg;s2++){
        var x = s2/seg;
        // shared-frequency waves; phase drifts smoothly with baseY -> a coherent woven ribbon fabric
        var y = th.baseY + th.av*(
            0.110*Math.sin(x*6.3 + t*0.6 + th.baseY*3.1 + th.ph)
          + 0.060*Math.sin(x*10.6 - t*0.42 + th.baseY*5.4)
          + 0.026*Math.sin(x*3.1 + t*0.24 + th.baseY*1.4));
        var X = x*W, Y = y*H;
        if (s2===0) cx.moveTo(X,Y); else cx.lineTo(X,Y);
      }
      cx.globalAlpha = ga;
      cx.strokeStyle = th.hueGold ? 'rgba(228,193,121,'+(th.op*0.8).toFixed(3)+')'
                                  : 'rgba(34,192,138,'+(th.op*0.95).toFixed(3)+')';
      cx.lineWidth = th.w*DPR; cx.stroke();
    }
    cx.globalAlpha = 1;
  }
  function tick(){
    requestAnimationFrame(tick);
    if(!cv) return;
    var rr=cv.getBoundingClientRect(); if(rr.bottom<-30 || rr.top>innerHeight+30 || rr.width<2) return;
    if(!RM) state.t += 0.010; state.order = 1; drawField();
  }

  /* ---------- WebGL liquid hero (Option C, live) ---------- */
  var LQ = { on:false, gl:null, cv:null, uRes:null, uTime:null, dpr:Math.min(1.25, window.devicePixelRatio||1), start:0 };
  var LQ_FS = [
    "precision highp float;",
    "uniform vec2 u_res; uniform float u_time;",
    "float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }",
    "float noise(vec2 p){ vec2 i=floor(p), f=fract(p);",
    "  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));",
    "  vec2 u=f*f*(3.-2.*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }",
    "float fbm(vec2 p){ float v=0., a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5;} return v; }",
    "void main(){",
    "  vec2 uv = gl_FragCoord.xy/u_res.xy;",
    "  vec2 p = uv*vec2(u_res.x/u_res.y,1.0)*2.1;",
    "  float t = u_time*0.05;",
    "  vec2 q = vec2(fbm(p+vec2(0.0,t)), fbm(p+vec2(5.2,-t)));",
    "  vec2 r = vec2(fbm(p+3.6*q+vec2(1.7,9.2)+t*0.4), fbm(p+3.6*q+vec2(8.3,2.8)-t*0.4));",
    "  float f = fbm(p+3.8*r);",
    "  vec3 ink=vec3(0.039,0.059,0.051), emerald=vec3(0.133,0.753,0.541), gold=vec3(0.894,0.757,0.475);",
    "  vec3 col = ink;",
    "  col = mix(col, emerald, smoothstep(0.34,0.74,f)*0.92);",
    "  col = mix(col, gold, smoothstep(0.56,0.92, f+0.15*r.x)*0.72);",
    "  float glow = pow(smoothstep(0.42,0.96,f),2.0);",
    "  col += emerald*glow*0.22 + gold*glow*0.16*r.y;",
    "  float ne = smoothstep(0.0,1.25, uv.x + (1.0-uv.y));",   // darken upper-left for headline
    "  col *= mix(0.16,1.0,ne);",
    "  col *= 1.0 - 0.32*length(uv-0.5);",
    "  gl_FragColor = vec4(col*0.94, 1.0);",
    "}"
  ].join("\n");
  function initLiquid(){
    var cv = document.getElementById('liquid'); if(!cv) return;
    LQ.cv = cv;
    var gl = cv.getContext('webgl') || cv.getContext('experimental-webgl');
    var fallback = function(){ cv.style.display='none'; setPlate('plate-hero','/assets/hero-liquid-key.png', 0.9); };
    if(!gl){ fallback(); return; }
    LQ.gl = gl;
    function sh(t,s){ var o=gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); return o; }
    var prog=gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}"));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, LQ_FS));
    gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){ fallback(); return; }
    gl.useProgram(prog);
    var buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(prog,'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    LQ.uRes=gl.getUniformLocation(prog,'u_res'); LQ.uTime=gl.getUniformLocation(prog,'u_time');
    LQ.cv.style.display='block'; LQ.start=performance.now(); resizeLiquid(); LQ.on=true;
    if(RM){ renderLiquid(4.0); }                         // one static frame, no loop
    else requestAnimationFrame(liquidLoop);
  }
  function resizeLiquid(){
    if(!LQ.gl) return;
    var w=Math.floor(innerWidth*LQ.dpr), h=Math.floor(innerHeight*LQ.dpr);
    LQ.cv.width=w; LQ.cv.height=h; LQ.cv.style.width=innerWidth+'px'; LQ.cv.style.height=innerHeight+'px';
    LQ.gl.viewport(0,0,w,h);
  }
  function renderLiquid(tsec){
    var gl=LQ.gl; if(!gl) return;
    gl.uniform2f(LQ.uRes, LQ.cv.width, LQ.cv.height);
    gl.uniform1f(LQ.uTime, tsec);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function liquidLoop(now){
    if(!LQ.on) return;
    if((state.liquidOp===undefined?1:state.liquidOp) > 0.02) renderLiquid((now-LQ.start)/1000);
    requestAnimationFrame(liquidLoop);
  }

  /* ---------- proof journey: code-drawn isometric ledger that REORGANIZES on scroll ---------- */
  /* ---------- boot ---------- */
  resize(); buildThreads();
  var loaderBar = document.querySelector('#loader .lb i');
  if (loaderBar) loaderBar.style.width = '40%';

  function setPlate(id, url, op){
    var img = new Image();
    img.onload = function(){
      var el = document.getElementById(id);
      if(!el) return;
      el.style.backgroundImage = 'url('+url+')';
      requestAnimationFrame(function(){ el.style.opacity = op; });
    };
    img.onerror = function(){};
    img.src = url;
  }

  function start(){
    if (loaderBar) loaderBar.style.width = '100%';
    var loader = document.getElementById('loader');
    setTimeout(function(){ if(loader) loader.classList.add('gone'); }, 260);

    setPlate('plate-lattice','/assets/lattice.png', 0);
    var hv = document.getElementById('herovid');
    if (hv){
      hv.playbackRate = 0.5;                                  // half speed
      hv.addEventListener('error', function(){ hv.style.display='none'; setPlate('plate-hero','/assets/hero-liquid-key.png',0.92); });
      if (RM){ try{ hv.pause(); }catch(e){} }
      else { var pr = hv.play(); if(pr && pr.catch) pr.catch(function(){}); }
    }

    gsap.registerPlugin(ScrollTrigger);

    if (!AUTOMATION && !RM){
      var lenis = new Lenis({ lerp:0.09, smoothWheel:true, wheelMultiplier:1 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(t){ lenis.raf(t*1000); });
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
    }

    var heroEl = document.getElementById('hero');
    if (AUTOMATION || RM) heroEl.classList.add('ready','nosnap');
    else requestAnimationFrame(function(){ requestAnimationFrame(function(){ heroEl.classList.add('ready'); }); });

    buildScenes();
    startFrame();
  }

  function buildScenes(){
    var hdr = document.getElementById('hdr');
    ScrollTrigger.create({ start:0, end:'max',
      onUpdate:function(self){ hdr.classList.toggle('scrolled', self.scroll()>40); },
      onRefresh:function(self){ hdr.classList.toggle('scrolled', self.scroll()>40); } });

    /* ---- PINNED SCENES FIRST (creation-order law) ---- */
    var cstates = Array.prototype.slice.call(document.querySelectorAll('#puCard .cstate'));
    var railEls = Array.prototype.slice.call(document.querySelectorAll('#puRail span'));
    var wcStatus = document.getElementById('wc-status');
    var STAT = ['Learning','Running','Escalated','Retained'];
    var STAT5 = ['Learning','Running','Escalated','Approved','Retained'];
    function proofUI(){
      var T = PF.flow;
      var cs = T<0.5?0:T<1.5?1:T<2.5?2:3;
      cstates.forEach(function(c,i){ c.classList.toggle('on', i===cs); });
      var rs = Math.max(0,Math.min(4,Math.round(T)));
      railEls.forEach(function(r,i){ r.classList.toggle('act', i===rs); r.classList.toggle('done', i<rs); });
      if(wcStatus) wcStatus.textContent = STAT5[rs];
      var b=document.getElementById('approveBtn');
      if(b){ if(T>=2.55){ b.classList.add('approved'); b.innerHTML='<span class="dot"></span>Approved by you ✓'; }
             else { b.classList.remove('approved'); b.innerHTML='<span class="dot"></span>Approve Row 07'; } }
    }
    window.__proofUI = proofUI;
    function nudgeApprove(){ var y=window.scrollY+innerHeight*1.2; if(window.__lenis){ window.__lenis.scrollTo(y,{duration:1.1}); } else { window.scrollTo({top:y,behavior:'smooth'}); } }
    var ab=document.getElementById('approveBtn'); if(ab) ab.addEventListener('click',nudgeApprove);
    var rqb=document.getElementById('requestBtn'); if(rqb) rqb.addEventListener('click',nudgeApprove);
    proofUI();

    var mm = gsap.matchMedia();
    mm.add('(min-width: 861px)', function(){
      var proof = document.querySelector('#proof') ? ScrollTrigger.create({
        trigger:'#proof', start:'top top', end:'+=2000%', pin:'.proof3d', scrub:true,
        onUpdate:function(self){ PF.flow = Math.max(0, Math.min(4, self.progress*4.25 - 0.12)); proofUI();
          if(window.__film) window.__film.render(self.progress*window.__film.END); },
        onRefresh:function(self){ proofUI(); if(window.__film){ window.__film.measure(); window.__film.render(self.progress*window.__film.END); } }
      }) : null;
      var track = document.getElementById('dtrack');
      var dom = ScrollTrigger.create({
        trigger:'#domains', start:'top top', end:function(){ return '+='+(track.scrollWidth - innerWidth + innerWidth*0.05); },
        pin:true, scrub:0.55, invalidateOnRefresh:true,
        onUpdate:function(self){ gsap.set(track,{ x: -(track.scrollWidth - innerWidth) * self.progress }); }
      });
      return function(){ if(proof) proof.kill(); dom.kill(); gsap.set(track,{x:0}); };
    });
    mm.add('(max-width: 860px)', function(){
      PF.flow=1;
      cstates.forEach(function(c){ c.style.position='relative'; c.style.marginBottom='20px'; c.classList.add('on'); });
      railEls.forEach(function(r){ r.classList.add('done'); });
    });

    /* ---- AMBIENT AFTER PINS ---- */
    var liquid = document.getElementById('liquid');
    var herovid = document.getElementById('herovid');
    var plateHero = document.getElementById('plate-hero');
    function applyArc(p){
      state.liquidOp = p < 0.85 ? 1 : 0;   // no fade — opaque panels clip the fixed hero video as they rise
    }
    ScrollTrigger.create({
      trigger:'#hero', start:'top top', endTrigger:'#intro', end:'bottom center', scrub:true,
      onUpdate:function(self){ applyArc(self.progress); },
      onRefresh:function(self){ applyArc(self.progress); }
    });
    applyArc(0);

    // hero video shows ONLY while the hero is on screen (position-based → scroll-up always restores it,
    // and it never bleeds through the pinned proof section's spacer)
    ScrollTrigger.create({ start:0, end:'max',
      onUpdate:function(self){ if(herovid) herovid.style.opacity = self.scroll() < innerHeight*0.85 ? 1 : 0; },
      onRefresh:function(self){ if(herovid) herovid.style.opacity = self.scroll() < innerHeight*0.85 ? 1 : 0; } });

    var plateLat = document.getElementById('plate-lattice');
    ScrollTrigger.create({ trigger:'#close', start:'top bottom', end:'bottom top',
      onUpdate:function(self){ if(plateLat) plateLat.style.opacity = (Math.sin(Math.min(1,self.progress)*Math.PI)*0.42).toFixed(3); },
      onRefresh:function(self){ if(plateLat) plateLat.style.opacity = (Math.sin(Math.min(1,self.progress)*Math.PI)*0.42).toFixed(3); } });

    /* arrival */
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin:'0px 0px -12% 0px', threshold:0.1 });
    document.querySelectorAll('#intro .wrap, .statband .wrap, #domains .dom-head, #close .wrap')
      .forEach(function(s){ s.classList.add('obsblock'); io.observe(s); });

    ScrollTrigger.refresh();
  }

  function startFrame(){
    if (JUMP !== null){
      window.scrollTo(0, +JUMP || 0);
      ScrollTrigger.update();
      drawField();
    }
    requestAnimationFrame(tick);
    setTimeout(function(){
      document.querySelectorAll('.obsblock').forEach(function(s){
        if (s.getBoundingClientRect().top < innerHeight*0.92) s.classList.add('in');
      });
      window.__ready = true;
    }, JUMP!==null ? 60 : 340);
  }

  /* ---------- cursor glow ---------- */
  var cur = document.getElementById('cursor'), curSeen=false;
  if (!('ontouchstart' in window)){
    window.addEventListener('mousemove', function(e){
      if(!curSeen){ curSeen=true; cur.style.opacity='1'; }
      if(window.gsap) gsap.to(cur,{ x:e.clientX, y:e.clientY, duration:0.5, ease:'power2.out', overwrite:true });
    }, { passive:true });
  }

  /* ---------- resize ---------- */
  var rt;
  window.addEventListener('resize', function(){
    clearTimeout(rt); resize(); resizeLiquid();
    rt = setTimeout(function(){ buildThreads(); if(window.ScrollTrigger) ScrollTrigger.refresh(); }, 220);
  });

  /* ---------- go ---------- */
  if (document.fonts && document.fonts.ready){
    Promise.race([document.fonts.ready, new Promise(function(r){ setTimeout(r,2500); })]).then(start);
  } else { start(); }
})();

/* ============================================================================
   PROOF FILM — stage engine. One pure function render(t); the scroll pin is the
   playhead. No setTimeout, no CSS transitions on animated properties.
   ========================================================================= */
(function(){
  var $=function(s){return document.querySelector(s)}, $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
  var stage=$('#filmStage'); if(!stage) return;
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function cl(x,a,b){return x<a?a:x>b?b:x}
  function cl01(x){return x<0?0:x>1?1:x}
  function at(t,s,d){return cl01((t-s)/d)}
  function lerp(a,b,k){return a+(b-a)*k}
  var E={ out:function(k){return 1-Math.pow(1-k,3)}, quint:function(k){return 1-Math.pow(1-k,5)},
    inQuad:function(k){return k*k}, grav:function(k){return k*k}, inCubic:function(k){return k*k*k},
    inOut:function(k){return k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2},
    outBack:function(k){var c=1.70158;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2)} };
  function spring(k,f,d){ if(k>=1)return 1; if(k<=0)return 0;
    var v=1-Math.exp(-d*k)*Math.cos(f*k*Math.PI), end=1-Math.exp(-d)*Math.cos(f*Math.PI);
    return v-(end-1)*k; }
  var MAT={chip:{f:1.05,d:5.0},paper:{f:1.05,d:4.4},data:{f:1.35,d:7.4},card:{f:1.55,d:5.3}};
  function sp(k,m){return spring(k,m.f,m.d)}
  function stretch(sv){var y=1+cl(sv,-0.30,0.30);return {x:1/y,y:y}}
  function rgba(r,g,b,a){return 'rgba('+(r|0)+','+(g|0)+','+(b|0)+','+a.toFixed(3)+')'}
  function mix(a,b,k){return [lerp(a[0],b[0],k),lerp(a[1],b[1],k),lerp(a[2],b[2],k)]}
  var AMBER=[224,162,60], IVORY=[243,239,228], EMERALD=[34,192,138];
  var _sc=new WeakMap();
  function setIf(el,prop,val){var m=_sc.get(el); if(!m){m={};_sc.set(el,m);} if(m[prop]===val)return; m[prop]=val; el.style[prop]=val;}

  var T={ learnIn:0.15, chipGap:0.18, chipDur:0.88, wireFrom:1.10, wireGap:0.18, converge:2.30,
    paperFrom:2.86, paperDur:0.62, chipsOut:2.42, camRun:3.60, rowStart:4.05, rowGap:0.16,
    dimStart:7.15, focus:7.35, camEsc:7.55, tetherDraw:8.05, specIn:8.55,
    pFwd:[9.00,9.42,9.84], pRev:[10.95,11.37,11.79], pDur:0.50, lineOut:12.34,
    camApp:10.95, brace:12.36, fall:12.44, fallDur:0.62, contact:13.06, resolve:13.06,
    sealIn:14.30, stampOut:15.00, camRet:15.55, auditFrom:15.85, auditGap:0.30, tagIn:17.15, docIn:17.55, END:18.50 };

  var cam=$('#fCam'), scene=$('#fScene'), wp=$('#fWp'), hero=$('#fHero'), heroAmt=$('#fHeroAmt'),
      spec=$('#fSpec'), stamp=$('#fStamp'), ring=$('#fRing'), seal=$('#fSeal'), tag=$('#fTag'),
      auditEl=$('#fAudit'), docid=$('#fDocId'), forming=$('#fForming'), wpHead=$('#filmStage .wp-h'),
      tetherSvg=$('#fTether'), tpath=$('#fTPath'), tdot=$('#fTDot'), tpulse=$('#fTPulse'), wiresSvg=$('#fWires'), bell=$('#fBell');
  var chips=$$('#filmStage .src'), wires=$$('#fWires path'), rows=$$('#fRows .row'),
      auditSteps=$$('#fAudit .st'), auditBars=$$('#fAudit .st .d i'),
      flagBadge=hero.querySelector('.flg'), rsvBadge=hero.querySelector('.rsv'), bellWaves=$$('#fBell .wv');

  var G={wireLen:[],tlen:0,wpW:454,wpH:210}, lastT=0;
  function measure(){
    var camPrev=cam.style.transform; cam.style.transform='none';
    chips.forEach(function(c){c.style.transform='none';});
    spec.style.transform='none'; wp.style.transform='translate(-50%,-50%)'; wp.style.borderRadius='14px';
    var wr=wp.getBoundingClientRect(), sr=scene.getBoundingClientRect();
    if(!sr.width){ cam.style.transform=camPrev; return; }
    G.wpW=wr.width; G.wpH=wr.height;
    var cvx=wr.left+wr.width/2-sr.left, cvy=wr.top+wr.height/2-sr.top;
    wiresSvg.setAttribute('viewBox','0 0 '+sr.width+' '+sr.height);
    G.wireLen=wires.map(function(w,i){
      var r=chips[i].getBoundingClientRect();
      var x0=r.left+r.width/2-sr.left, y0=r.bottom-sr.top+2, my=y0+(cvy-y0)*0.55;
      w.setAttribute('d','M'+x0.toFixed(1)+','+y0.toFixed(1)+' C'+x0.toFixed(1)+','+my.toFixed(1)+' '+cvx.toFixed(1)+','+my.toFixed(1)+' '+cvx.toFixed(1)+','+cvy.toFixed(1));
      var L=w.getTotalLength(); w.style.strokeDasharray=L; return L;});
    var hr=hero.getBoundingClientRect(), pr=spec.getBoundingClientRect();
    var x1=hr.right-sr.left-2, y1=hr.top+hr.height/2-sr.top, x2=pr.left-sr.left+1, y2=pr.top+pr.height/2-sr.top, mx=(x1+x2)/2;
    tetherSvg.setAttribute('viewBox','0 0 '+sr.width+' '+sr.height);
    tpath.setAttribute('d','M'+x1.toFixed(1)+','+y1.toFixed(1)+' C'+mx.toFixed(1)+','+y1.toFixed(1)+' '+mx.toFixed(1)+','+y2.toFixed(1)+' '+x2.toFixed(1)+','+y2.toFixed(1));
    G.tlen=tpath.getTotalLength(); tdot.setAttribute('cx',x2.toFixed(1)); tdot.setAttribute('cy',y2.toFixed(1));
    cam.style.transform=camPrev; render(lastT);
  }

  function render(t){
    lastT=t;
    /* camera */
    var kRun=E.inOut(at(t,T.camRun,1.15)), kEsc=E.inOut(at(t,T.camEsc,1.2)),
        kApp=E.inOut(at(t,T.camApp,1.0)), kRet=E.inOut(at(t,T.camRet,1.2));
    var cx=0, cy=lerp(16,0,kRun), cz=lerp(-56,0,kRun), crx=lerp(2.2,0,kRun), cs=lerp(.94,1,kRun);
    cx=lerp(cx,-26,kEsc); cy=lerp(cy,4,kEsc); cz=lerp(cz,40,kEsc); crx=lerp(crx,-1.4,kEsc); cs=lerp(cs,1.075,kEsc);
    cx=lerp(cx,-3,kApp);  cy=lerp(cy,-3,kApp); cz=lerp(cz,30,kApp); crx=lerp(crx,.6,kApp);  cs=lerp(cs,1.04,kApp);
    cx=lerp(cx,16,kRet);  cy=lerp(cy,2,kRet);  cz=lerp(cz,-34,kRet);crx=lerp(crx,0,kRet);   cs=lerp(cs,.965,kRet);
    cam.style.transform='translate3d('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px,'+cz.toFixed(2)+'px) rotateX('+crx.toFixed(2)+'deg) scale('+cs.toFixed(4)+')';

    /* source chips */
    chips.forEach(function(c,i){
      var kIn=at(t,T.learnIn+i*T.chipGap,T.chipDur), s1=E.out(kIn);   /* pure deceleration: no twitch */
      var y=lerp(-42,0,s1), z=lerp(80,0,E.quint(kIn)), rx=lerp(30,0,E.quint(kIn)), sc=lerp(1.06,1,s1), op=cl01(kIn/0.18);
      var sq={x:1,y:1};
      if(kIn>0&&kIn<1){ if(kIn<0.55) sq=stretch(0.030*E.inQuad(kIn/0.55));
        else sq=stretch(-0.038*Math.exp(-9*(kIn-0.55))); }   /* one decaying squash, no oscillation */
      var kGo=E.out(at(t,T.chipsOut+i*0.07,0.62));
      if(kGo>0){ op=lerp(op,0,kGo); z=lerp(z,-40,kGo); sc=lerp(sc,.94,kGo); }
      c.style.opacity=op.toFixed(3);
      c.style.transform='translate3d(0px,'+y.toFixed(1)+'px,'+(z+34).toFixed(1)+'px) rotateX('+rx.toFixed(2)+'deg) scale('+(sc*sq.x).toFixed(4)+','+(sc*sq.y).toFixed(4)+')';
    });
    wires.forEach(function(w,i){
      var L=G.wireLen[i]||100, st0=T.wireFrom+i*T.wireGap;
      var k=E.inOut(at(t,st0,T.converge-st0)), k2=E.out(at(t,T.converge+0.10,0.42));
      w.style.strokeDashoffset=(L*(1-k)).toFixed(1);
      w.style.opacity=(k*(1-k2)*0.85).toFixed(3);
    });

    /* the disc BECOMES the document */
    var D=22, W=G.wpW, H=G.wpH;
    var pop=spring(at(t,T.converge,0.44),1.55,4.0);
    var kExp=sp(at(t,T.paperFrom,T.paperDur),MAT.paper), kExpL=E.out(at(t,T.paperFrom,T.paperDur));
    var sx=Math.max(lerp((D/W)*pop,1,kExp),0.00012), sy=Math.max(lerp((D/H)*pop,1,kExp),0.00012);
    var re=t-T.contact, recoil=0, flash=0;
    if(re>0&&re<0.9){ var dd=Math.exp(-8*re); recoil=-10*dd*Math.sin(re*22); flash=Math.max(0,dd*Math.cos(re*9)); }
    var rr=lerp(D/2,14,kExpL);
    setIf(wp,'borderRadius',(rr/sx).toFixed(1)+'px / '+(rr/sy).toFixed(1)+'px');
    wp.style.transform='translate(-50%,-50%) translate3d(0,0,'+recoil.toFixed(2)+'px) rotateX(3deg) scale('+sx.toFixed(5)+','+sy.toFixed(5)+')';
    wp.style.opacity=(pop>0.002?1:0).toFixed(3);
    var cool=E.inOut(kExpL), bg=mix([104,236,196],[16,26,22],cool);
    setIf(wp,'background','rgb('+(bg[0]|0)+','+(bg[1]|0)+','+(bg[2]|0)+')');
    setIf(wp,'borderColor',rgba(243,239,228,lerp(0,.11,cool)));
    setIf(wp,'boxShadow','0 '+lerp(8,50,kExpL).toFixed(0)+'px '+lerp(24,110,kExpL).toFixed(0)+'px rgba(0,0,0,.55)'
      + (flash>0.01?', 0 0 0 3px '+rgba(243,239,228,.6*flash)+', 0 0 44px '+rgba(34,192,138,.32*flash):''));
    var contentOp=E.out(at(t,T.paperFrom+T.paperDur*0.85,0.38));
    wpHead.style.opacity=contentOp.toFixed(3);
    forming.style.opacity=(contentOp*cl01(1-at(t,T.paperFrom+T.paperDur+0.15,0.45))*(0.5+0.45*Math.abs(Math.sin(t*2.0)))).toFixed(3);

    /* rows calculate in */
    var dim=E.out(at(t,T.dimStart,0.5))*(1-E.out(at(t,T.resolve,0.5)));
    rows.forEach(function(r,i){
      if(r===hero) return;
      var k=at(t,T.rowStart+i*T.rowGap,0.62), sS=sp(k,MAT.data);
      var op=lerp(.32,1,E.out(k))*(1-dim*0.9)*contentOp, rx=lerp(-46,0,sS), ty=lerp(11,0,sS);
      var lock=Math.max(0,Math.exp(-7*Math.max(0,t-(T.rowStart+i*T.rowGap+0.42))))*(k>0.6?1:0);
      var calc=E.out(at(t,T.rowStart+i*T.rowGap+0.22,0.42));
      r.style.opacity=op.toFixed(3);
      r.style.transform='perspective(560px) rotateX('+rx.toFixed(2)+'deg) translateY('+ty.toFixed(2)+'px)';
      setIf(r,'background',lock>0.01?rgba(34,192,138,.26*lock):'transparent');
      setIf(r,'filter',dim>0.02?'saturate('+lerp(1,.35,dim).toFixed(3)+')':'none');
      var a=r.querySelector('.amt');
      if(a&&!r.classList.contains('tot')) setIf(a,'color',rgba(lerp(143,243,calc),lerp(163,239,calc),lerp(154,228,calc),1));
    });

    /* ROW 07 — the through-line */
    var hk=at(t,T.rowStart+2*T.rowGap,0.62), hs=sp(hk,MAT.data);
    var hOp=lerp(.32,1,E.out(hk))*contentOp, hRx=lerp(-46,0,hs), hTy=lerp(11,0,hs), hSc=1, bgc=[0,0,0], bga=0;
    var kFocus=at(t,T.focus,0.8), kBrace=at(t,T.brace,0.30), kRes=at(t,T.resolve,1.0);
    if(kFocus>0){ var f=E.out(kFocus);
      hSc=lerp(1,1.022,f)+(kFocus<0.72?-0.014*Math.sin(kFocus/0.72*Math.PI):0.013*Math.sin((kFocus-0.72)/0.28*Math.PI));
      bgc=AMBER; bga=lerp(0,.2,f); }
    if(kBrace>0){ var bb=E.out(kBrace); hSc=lerp(hSc,.99,bb); bga=lerp(bga,.26,bb); }
    if(kRes>0){ var wf=Math.max(0,Math.exp(-6.5*(t-T.resolve))*Math.cos((t-T.resolve)*5));
      bgc=mix(AMBER,IVORY,cl01(wf*1.9)); bgc=mix(bgc,EMERALD,E.out(cl01((kRes-0.30)/0.7)));
      bga=lerp(.26,.16,E.out(kRes))+0.34*wf;
      hSc=1+0.036*Math.exp(-7*(t-T.resolve))*Math.cos((t-T.resolve)*15); }
    hero.style.opacity=hOp.toFixed(3);
    hero.style.transform='perspective(560px) rotateX('+hRx.toFixed(2)+'deg) translateY('+hTy.toFixed(2)+'px) scale('+hSc.toFixed(4)+')';
    setIf(hero,'background',bga>0.005?rgba(bgc[0],bgc[1],bgc[2],bga):'transparent');
    setIf(hero,'boxShadow',(kFocus>0&&kRes<=0)?'0 0 0 1px '+rgba(224,162,60,.45*E.out(kFocus)):'none');
    var toG=E.out(cl01((kRes-0.30)/0.7));
    setIf(heroAmt,'color',kRes>0?rgba(lerp(228,34,toG),lerp(193,192,toG),lerp(121,138,toG),1):'#E4C179');
    flagBadge.style.opacity=(E.out(at(t,T.focus+0.25,0.3))*(1-E.out(at(t,T.resolve,0.25)))).toFixed(3);
    rsvBadge.style.opacity=(E.out(at(t,T.resolve+0.30,0.4))).toFixed(3);

    /* escalation route */
    var kT=E.out(at(t,T.tetherDraw,0.55)), tOut=E.out(at(t,T.lineOut,0.45));  /* line removed only AFTER the answer lands */
    setIf(tpath,'strokeDasharray',String(G.tlen)); tpath.style.strokeDashoffset=((1-kT)*G.tlen+tOut*G.tlen).toFixed(1);
    tetherSvg.style.opacity=(cl01(kT)*(1-tOut)).toFixed(3);
    tdot.style.opacity=(E.out(at(t,T.tetherDraw+0.45,0.3))*(1-tOut)).toFixed(3);
    /* ONE flow animation used in BOTH directions: reverse is the identical motion with f -> 1-f.
       The line stays fully connected throughout and is only removed once the answer has landed. */
    function flow(times,dur,rev){
      var on=false, arrive=0;
      if(RM||G.tlen<=4) return {on:on,arrive:arrive};
      for(var i=0;i<times.length;i++){
        var pt=times[i], ph=(t-pt)/dur;
        if(ph>=0&&ph<=1){
          var f=E.inOut(ph); if(rev) f=1-f;
          var pp=tpath.getPointAtLength(f*G.tlen);
          tpulse.setAttribute('cx',pp.x.toFixed(1)); tpulse.setAttribute('cy',pp.y.toFixed(1));
          tpulse.style.opacity=(ph<0.94?1:0).toFixed(3); on=true;
        }
        var since=t-(pt+dur); if(since>=0&&since<0.75) arrive=Math.max(arrive,Math.exp(-6.5*since));
      }
      return {on:on,arrive:arrive};
    }
    var fwd=flow(T.pFwd,T.pDur,false), rev=flow(T.pRev,T.pDur,true);
    var pv=fwd.arrive, pOn=fwd.on||rev.on;
    if(!pOn) tpulse.style.opacity=0;
    var kS=sp(at(t,T.specIn,0.7),MAT.card), kSO=E.inOut(at(t,T.lineOut,0.70));
    var spx=lerp(20,0,kS), spz=lerp(-50,20,kS), sps=lerp(.95,1,kS), spo=E.out(at(t,T.specIn,0.4));
    spx=lerp(spx,-46,kSO); spz=lerp(spz,-70,kSO); sps=lerp(sps,.88,kSO); spo=lerp(spo,0,kSO);
    spec.style.opacity=spo.toFixed(3);
    spec.style.transform='translate3d('+spx.toFixed(2)+'px,'+lerp(0,14,kSO).toFixed(2)+'px,'+spz.toFixed(2)+'px) scale('+sps.toFixed(4)+')';
    bell.style.opacity=(spo*cl01(E.out(at(t,T.specIn+0.15,0.4)))).toFixed(3);
    bell.style.transform='rotate('+(pv>0.01?21*pv*Math.sin(t*44):0).toFixed(2)+'deg)';
    bell.style.filter='drop-shadow(0 0 '+(3+14*pv).toFixed(1)+'px rgba(228,193,121,'+(0.32+0.62*pv).toFixed(2)+'))';
    bellWaves.forEach(function(w){ setIf(w,'opacity',(pv*0.9).toFixed(3)); });
    /* REVERSE = the specialist is ACTIVE and answering: the card holds a sustained glow, not just a blip */
    var specAct=E.out(at(t,T.pRev[0]-0.30,0.45))*(1-E.out(at(t,T.lineOut,0.40)));
    var gl=Math.max(pv,specAct*0.9);
    setIf(spec,'boxShadow',gl>0.02?'0 0 0 '+(2+1.6*gl).toFixed(1)+'px '+rgba(228,193,121,.30+.55*gl)+', 0 0 '+(16+26*gl).toFixed(0)+'px '+rgba(224,162,60,.22+.42*gl)+', 0 18px 46px rgba(0,0,0,.5)':'0 16px 40px rgba(0,0,0,.5)');
    setIf(spec,'borderColor',rgba(228,193,121,.4+.5*gl));

    /* the approval impact */
    var sy2,sqx=1,sqy=1,srx=0,sop=0,sz=16, ANT=0.36;
    if(t<T.fall){ var ka=cl01((t-(T.fall-ANT))/ANT);
      sop=cl01(ka/0.35); sy2=-106-10*E.outBack(ka); srx=50+7*ka;
      var q1=stretch(0.05*ka); sqx=q1.x; sqy=q1.y; sz=lerp(122,112,ka); }
    else if(t<T.contact){ var kf=at(t,T.fall,T.fallDur), g=E.grav(kf);
      sy2=lerp(-116,0,g); srx=lerp(57,0,E.out(kf)); sop=1; sz=lerp(112,16,g);
      var q2=stretch(0.125*g); sqx=q2.x; sqy=q2.y; }
    else { var e2=t-T.contact, d2=Math.exp(-7.5*e2), s2=d2*Math.cos(e2*19);
      sy2=-14*d2*Math.sin(e2*19); sop=1; sz=16;
      var q3=stretch(-0.10*s2); sqx=q3.x; sqy=q3.y;
      var ko2=at(t,T.stampOut,0.5);
      if(ko2>0){ var ke=E.inCubic(ko2); sop=1-ke; sy2-=15*ke; sqx=lerp(sqx,.97,ke); sqy=lerp(sqy,.97,ke); } }
    stamp.style.opacity=cl01(sop).toFixed(3);
    stamp.style.transform='translate3d(0,'+sy2.toFixed(2)+'px,'+sz.toFixed(1)+'px) rotateX('+srx.toFixed(2)+'deg) scale('+sqx.toFixed(4)+','+sqy.toFixed(4)+')';
    var rk=at(t,T.contact,0.62);
    ring.style.opacity=(rk>0&&rk<1?(0.85*(1-E.out(rk))):0).toFixed(3);
    ring.style.transform='scale('+lerp(1,4.2,E.out(rk)).toFixed(3)+')';

    /* seal + retention */
    var kSeal=sp(at(t,T.sealIn,0.7),MAT.card);
    seal.style.opacity=E.out(at(t,T.sealIn,0.45)).toFixed(3);
    seal.style.transform='translate3d(0,'+lerp(7,0,kSeal).toFixed(2)+'px,0)';
    var kTag=sp(at(t,T.tagIn,0.55),MAT.data);
    tag.style.opacity=E.out(at(t,T.tagIn,0.35)).toFixed(3);
    tag.style.transform='translate3d(0,'+lerp(-5,0,kTag).toFixed(2)+'px,0) scale('+lerp(.9,1,kTag).toFixed(3)+')';
    var kA=E.out(at(t,T.camRet-0.1,0.6));
    auditEl.style.opacity=kA.toFixed(3);
    auditEl.style.transform='translate3d('+lerp(18,0,kA).toFixed(1)+'px,-50%,-20px)';
    auditSteps.forEach(function(stp,i){
      var on=E.out(at(t,T.auditFrom+i*T.auditGap,0.34));
      setIf(stp,'color',on>0.5?'var(--ivory)':'var(--sage-dim)');
      var dt=stp.querySelector('.d');
      setIf(dt,'background',on>0.5?'var(--emerald)':'var(--sage-dim)');
      setIf(dt,'boxShadow',on>0.5?'0 0 10px '+rgba(34,192,138,.6*on):'none');
      dt.style.transform='scale('+lerp(1,1.15,on).toFixed(3)+')';
      if(auditBars[i]){ auditBars[i].style.transform='scaleY('+on.toFixed(3)+')';
        setIf(auditBars[i],'background',on>0.4?rgba(34,192,138,.6*on):'var(--hair)'); }
    });
    docid.style.opacity=E.out(at(t,T.docIn,0.45)).toFixed(3);
  }

  var rzP=false;
  function remeasure(){ if(rzP)return; rzP=true;
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ rzP=false; measure(); }); }); }
  addEventListener('resize',remeasure);
  var lastW=0,lastH=0;
  if(window.ResizeObserver){ var ro=new ResizeObserver(function(e){
    var r=e[0].contentRect; if(Math.abs(r.width-lastW)<2&&Math.abs(r.height-lastH)<2) return;
    lastW=r.width; lastH=r.height; remeasure(); }); ro.observe(scene); }
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(measure);
  requestAnimationFrame(function(){ measure(); render(0); });

  window.__film={ render:render, measure:measure, END:T.END };
})();
