/* The ledger is the source: sample its luminosity into a registered dither.
   One 3.6-second resolve, then stop drawing. No perpetual particle simulation. */
(() => {
  const canvas = document.querySelector('.ledger-dither');
  const context = canvas?.getContext('2d', { alpha: true });
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!context) return;
  const source = new Image();
  const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  let points = [], width = 0, height = 0, frame = 0, resizeTimer;
  let started = 0, previousFrame = 0, resolved = false, loaded = false;
  const duration = 3600;
  const clamp = value => Math.max(0, Math.min(1, value));
  const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

  function sample() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const cell = Math.max(3.5, Math.sqrt(width * height / (width < 700 ? 15000 : 32000)));
    const columns = Math.ceil(width / cell), rows = Math.ceil(height / cell);
    const sampler = document.createElement('canvas');
    sampler.width = columns; sampler.height = rows;
    const sampleContext = sampler.getContext('2d', { willReadFrequently: true });
    if (!sampleContext) return;
    const scale = Math.max(width / source.width, height / source.height);
    const imageWidth = source.width * scale, imageHeight = source.height * scale;
    const left = (width - imageWidth) * (width <= 700 ? .62 : .5);
    const top = (height - imageHeight) * .5;
    sampleContext.drawImage(source, left / cell, top / cell, imageWidth / cell, imageHeight / cell);
    const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
    points = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
      const index = (y * columns + x) * 4;
      const light = (pixels[index] * .2126 + pixels[index + 1] * .7152 + pixels[index + 2] * .0722) / 255;
      const threshold = (bayer[(y % 4) * 4 + x % 4] + .5) / 16;
      if (light < .055 || threshold > Math.min(.88, light * 1.5)) continue;
      const seed = y * columns + x;
      points.push({x:(x+.5)*cell, y:(y+.5)*cell, light,
        dx:(hash(seed)-.5)*22, dy:(hash(seed+17)-.5)*14,
        size:.6+light*.95, delay:hash(seed+41)*.1});
    }
  }

  function draw(progress) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#e8d9b9';
    for (const point of points) {
      // Left-to-right settling, with every point ending over its source pixel.
      const local = clamp((progress - point.x / width * .18 - point.delay) / .72);
      const unsettled = Math.pow(1 - local, 3);
      context.globalAlpha = (.16 + point.light * .7) * (.10 + unsettled * .9);
      const size = point.size * (1 + unsettled * .45);
      context.fillRect(point.x + point.dx * unsettled, point.y + point.dy * unsettled, size, size);
    }
    context.globalAlpha = 1;
  }

  function tick(time) {
    if (!started) started = time;
    const progress = clamp((time - started) / duration);
    if (time - previousFrame >= 32 || progress === 1) {
      draw(progress); previousFrame = time;
    }
    if (progress < 1) frame = requestAnimationFrame(tick);
    else { resolved = true; canvas.dataset.motion = 'resolved'; }
  }

  function finish() {
    cancelAnimationFrame(frame);
    resolved = true;
    context.clearRect(0, 0, width, height);
    canvas.dataset.motion = 'reduced';
  }

  source.onload = () => {
    loaded = true;
    if (reduceMotion.matches) { finish(); return; }
    sample();
    canvas.dataset.motion = 'running';
    frame = requestAnimationFrame(tick);
  };
  source.onerror = () => { canvas.hidden = true; };
  source.src = 'assets/derive-ledger.webp';

  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!loaded || reduceMotion.matches) return;
      sample();
      if (resolved) draw(1);
    }, 150);
  });
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) finish();
    else if (loaded) { sample(); draw(1); }
  });
  document.addEventListener('visibilitychange', () => {
    if (!loaded) return;
    if (document.hidden) cancelAnimationFrame(frame);
    else if (!resolved && !reduceMotion.matches) frame = requestAnimationFrame(tick);
  });
})();
