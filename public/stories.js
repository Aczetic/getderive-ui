/* Two scroll-scrubbed story films for the "operating model" section.
   Each is a pinned section; render(p) is a pure function of scroll progress (0..1) + time. */
(function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  function cl01(x){return x<0?0:x>1?1:x;}
  function sstep(a,b,x){x=cl01((x-a)/(b-a));return x*x*(3-2*x);}
  function lerp(a,b,k){return a+(b-a)*k;}
  function rr(ctx,x,y,w,h,r){ ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(x,y,w,h,r); else ctx.rect(x,y,w,h); }

  /* ---------- Story A: three forces braid into one operating model, then a layer ---------- */
  function renderA(ctx,p,W,H,t){
    ctx.clearRect(0,0,W,H);
    var cy=H*0.46, x0=W*0.10, x1=W*0.90, span=x1-x0;
    var EM='#3BE3A6', GD='#E4C179', IV='#F3EFE4', cols=[EM,GD,IV];
    var braid=sstep(0.02,0.26,p), flow=sstep(0.28,0.50,p), exc=sstep(0.52,0.72,p), plane=sstep(0.78,1.0,p);
    var sep=lerp(H*0.13,0,braid), exX=x0+span*0.52, reach=exc*(1-plane*0.5);
    // translucent operational plane (beat 4)
    if(plane>0){ var ph=lerp(6,H*0.30,plane); ctx.fillStyle='rgba(34,192,138,'+(0.12*plane).toFixed(3)+')';
      rr(ctx,x0-40,cy-ph/2,span+80,ph,Math.min(ph/2,40)); ctx.fill();
      ctx.strokeStyle='rgba(59,227,166,'+(0.32*plane).toFixed(2)+')'; ctx.lineWidth=1.5; ctx.stroke(); }
    // three woven strands; gold reaches toward the exception token
    for(var i=0;i<3;i++){
      ctx.beginPath();
      for(var sN=0;sN<=1.0001;sN+=0.006){
        var x=x0+span*sN, base=cy+(i-1)*sep;
        var weave=(22*(1-0.5*plane))*Math.sin(sN*11+t*0.9+i*Math.PI*2/3);
        var y=lerp(base+8*Math.sin(sN*6+t*0.6+i), cy+weave, braid);
        if(i===1 && reach>0){ var g=Math.exp(-Math.pow((x-exX)/(span*0.10),2)); y=lerp(y,cy,g*reach*0.6); }
        if(sN===0)ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      var em=(i===0)?(1+0.3*flow):1;
      ctx.lineWidth=lerp(6,9,braid)+plane*3; ctx.lineCap='round'; ctx.strokeStyle=cols[i];
      ctx.shadowColor=cols[i]; ctx.shadowBlur=13*em; ctx.globalAlpha=0.95; ctx.stroke();
    }
    ctx.shadowBlur=0; ctx.globalAlpha=1;
    // steady stream: tokens emerge checked (state change, not absorbed)
    if(flow>0){
      for(var k=0;k<8;k++){
        var tp=((t*0.09+k/8)%1), x=x0+span*tp, y=cy+(14*(1-plane))*Math.sin(tp*11+t*0.9), done=tp>0.85;
        ctx.globalAlpha=flow*(plane>0?0.65:1); ctx.fillStyle=done?EM:'rgba(59,227,166,0.85)';
        rr(ctx,x-3.5,y-3.5,7,7,2); ctx.fill();
        if(done){ ctx.strokeStyle=IV; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(x-2,y); ctx.lineTo(x-0.5,y+2); ctx.lineTo(x+2.5,y-2.5); ctx.stroke(); }
      }
      ctx.globalAlpha=1;
    }
    // exception token: tangled -> aligned by gold -> sealed by ivory
    if(exc>0){
      for(var j=0;j<3;j++){ var off=(1-exc)*(j-1)*7, jx=exX+off+Math.sin(t*9+j)*(1-exc)*4, jy=cy+(j-1)*3*(1-exc);
        ctx.globalAlpha=1; ctx.fillStyle=plane>0?EM:GD; rr(ctx,jx-8,jy-8,16,16,3); ctx.fill(); }
      if(plane>0){ ctx.strokeStyle=IV; ctx.lineWidth=2; ctx.globalAlpha=plane;
        ctx.beginPath(); ctx.arc(exX,cy,14+6*(1-plane),0,Math.PI*2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(exX-5,cy); ctx.lineTo(exX-1,cy+4); ctx.lineTo(exX+6,cy-5); ctx.stroke(); ctx.globalAlpha=1; }
    }
    // tool-boxes plug into the plane
    if(plane>0){ ctx.globalAlpha=plane;
      for(var b=0;b<4;b++){ var bx=x0+span*(0.10+b*0.25), by=cy-H*0.24;
        ctx.strokeStyle='rgba(243,239,228,0.3)'; ctx.lineWidth=1.5; rr(ctx,bx,by,88,42,10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx+44,by+42); ctx.lineTo(bx+44,cy-14);
        ctx.strokeStyle='rgba(59,227,166,'+(0.5*plane).toFixed(2)+')'; ctx.lineWidth=1.5; ctx.stroke(); }
      ctx.globalAlpha=1;
    }
  }

  /* ---------- Story B: work falls through a tool stack; Derive slides under as a layer ---------- */
  function renderB(ctx,p,W,H,t){
    ctx.clearRect(0,0,W,H);
    var x0=W*0.12, x1=W*0.88, span=x1-x0, cy=H*0.42;
    var slide=sstep(0.28,0.52,p), caught=sstep(0.56,0.80,p), weave=sstep(0.84,1.0,p);
    var nb=5, bw=span/nb, layerY=cy+H*0.16, ly=lerp(H+60,layerY,slide);
    for(var k=0;k<10;k++){
      var tp=((t*0.13+k*0.1)%1), col=k%nb, gap=(k%2===0);
      var ix=gap? x0+(col+1)*bw : x0+(col+0.5)*bw;
      var iy=lerp(-24,H+40,tp);
      if(caught>0 && gap && iy>ly-8){ iy=ly-8; ix=x0+(((tp*2.3)%1))*span; }
      ctx.globalAlpha=0.92; ctx.fillStyle=gap?'#E4C179':'#3BE3A6';
      rr(ctx,ix-5,iy-5,10,10,2); ctx.fill();
    }
    ctx.globalAlpha=1; ctx.strokeStyle='rgba(243,239,228,0.4)'; ctx.lineWidth=1.6;
    for(var b=0;b<nb;b++){ var bx=x0+b*bw+8; rr(ctx,bx,cy-30,bw-16,60,10); ctx.stroke(); }
    if(slide>0){
      var lh=lerp(6,H*0.12,weave);
      ctx.fillStyle='rgba(34,192,138,'+(0.15+0.08*weave).toFixed(3)+')'; rr(ctx,x0-20,ly-lh/2,span+40,lh,lh/2); ctx.fill();
      ctx.strokeStyle='rgba(59,227,166,0.5)'; ctx.lineWidth=1.5; ctx.stroke();
      if(weave>0){ var cols=['#3BE3A6','#E4C179','#F3EFE4'];
        for(var i=0;i<3;i++){ ctx.beginPath();
          for(var s=0;s<=1.0001;s+=0.02){ var x=x0+span*s, y=ly+10*weave*Math.sin(s*12+i*2.09+t); if(s===0)ctx.moveTo(x,y); else ctx.lineTo(x,y);}
          ctx.strokeStyle=cols[i]; ctx.globalAlpha=weave; ctx.lineWidth=3; ctx.stroke();
        }
        ctx.globalAlpha=1;
      }
    }
  }

  function setup(sel,render){
    var sec=document.querySelector(sel); if(!sec) return;
    var stage=sec.querySelector('.story-stage'), cv=sec.querySelector('.story-cv'), ctx=cv.getContext('2d');
    var beats=Array.prototype.slice.call(sec.querySelectorAll('.sc'));
    var P=0, vis=false;
    function resize(){ var r=stage.getBoundingClientRect(), dpr=Math.min(2,window.devicePixelRatio||1);
      cv.width=Math.round(r.width*dpr); cv.height=Math.round(r.height*dpr); ctx.setTransform(dpr,0,0,dpr,0,0); }
    resize(); window.addEventListener('resize',resize);
    function copy(){ for(var i=0;i<beats.length;i++){ var b=beats[i], s=parseFloat(b.dataset.s), e=parseFloat(b.dataset.e);
      var o=Math.min(sstep(s,s+0.05,P), 1-sstep(e-0.05,e,P)); b.style.opacity=Math.max(0,o).toFixed(3); } }
    function frame(){ if(vis){ var r=cv.getBoundingClientRect(); render(ctx,P,r.width,r.height,performance.now()/1000); copy(); } requestAnimationFrame(frame); }
    requestAnimationFrame(frame);
    ScrollTrigger.create({ trigger:sec, start:'top top', end:'+=320%', pin:stage, scrub:true,
      onUpdate:function(self){ P=self.progress; },
      onToggle:function(self){ vis=self.isActive; if(!vis){ var r=cv.getBoundingClientRect(); render(ctx,P,r.width,r.height,performance.now()/1000); copy(); } } });
  }
  setup('#story-a', renderA);
  setup('#story-b', renderB);
  if(window.ScrollTrigger) ScrollTrigger.refresh();
})();
