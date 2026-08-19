// Body markup ported verbatim from derive-site/index.html.
export const MARKUP = String.raw`

<div id="atmos"></div>
<video id="herovid" autoplay muted loop playsinline poster="/assets/hero-liquid-key.png">
  <source src="/assets/hero-liquid.mp4" type="video/mp4">
</video>
<canvas id="liquid"></canvas>
<div class="plate" id="plate-hero"></div>
<div class="plate" id="plate-lattice"></div>
<div id="cursor"></div>
<div id="vignette"></div>
<div id="grain"></div>

<div id="loader"><div class="lw">Derive</div><div class="lb"><i></i></div></div>

<!-- ===== header ===== -->
<header class="hdr" id="hdr">
  <a class="brand" href="#top" aria-label="Derive home">
    <svg viewBox="0 0 7 24" aria-hidden="true"><line x1="3.5" y1="2" x2="3.5" y2="22" stroke="var(--ivory)" stroke-opacity="0.16" stroke-width="1.2" stroke-linecap="round"/><circle cx="3.5" cy="3.5" r="3" fill="var(--ivory)"/><circle cx="3.5" cy="12" r="3" fill="var(--ivory)"/><circle cx="3.5" cy="20.5" r="3" fill="var(--ivory)"/></svg>
    <span class="wm">Derive</span>
  </a>
  <nav class="nav">
    
    <a class="lnk" href="#intro">Operating Model</a>
    
    <a class="lnk" href="#domains">Coverage</a>
    <a class="btn sm" href="#close">Start a Conversation</a>
  </nav>
</header>

<main class="content" id="top">

  <!-- ===== hero ===== -->
  <section id="hero">
    <div class="wrap">
      
      <h1 class="display" aria-label="Managed Operations for Tax Teams">
        <span class="hero-line"><span class="w">Managed</span></span>
        <span class="hero-line"><span class="w">Operations for</span></span>
        <span class="hero-line"><span class="w em">Tax Teams.</span></span>
      </h1>
      <div class="hero-sub">
        
        <div class="hero-cta">
          <a class="btn" href="#close">Start a Conversation</a>
        </div>
      </div>
    </div>
    
  </section>

  <!-- ===== the gap ===== -->
  

  <!-- ===== introducing ===== -->
  <section id="intro" class="obs">
    <div class="wrap pad">
      
      <h2 class="h-sec rise">A new operating model for <span class="emg">enterprise&nbsp;tax</span>.</h2>
      <p class="body rise">Derive combines AI agents, tax specialists, and your team to execute tax work across the entire tax lifecycle, from recurring compliance to the most complex international workflows.</p>
      <p class="body rise" style="margin-top:18px;color:var(--ivory)">Instead of giving teams another tool, Derive becomes an <span class="em">operational layer</span> that helps work get done.</p>
    </div>
  </section>
  
  
  

  <!-- ===== proof scene — 3D: the chain of custody of Row 07 ===== -->
  

  <!-- ===== stat band ===== -->
  <section class="statband obs">
    <div class="wrap stats">
      <div class="rise"><b>5</b><span>tax domains, one operating model</span></div>
      <div class="rise"><b>30<span class="u">+</span></b><span>workflow types under coverage</span></div>
      <div class="rise"><b>100<span class="u">%</span></b><span>of work carries an audit trail</span></div>
      <div class="rise"><b>0</b><span>filed without your sign-off</span></div>
    </div>
  </section>

  <!-- ===== why derive ===== -->
  

  <!-- ===== across the tax function ===== -->
  <section id="domains">
    <div class="dom-head obs">
      
      <p class="dom-quote rise" style="margin-top:24px">Across recurring compliance, reporting, and the most <span class="em">complex international</span> tax workflows.</p>
    </div>
    <div class="dwin">
      <div class="dtrack" id="dtrack">
        <div class="dcard"><span class="dno">01 / CORPORATE</span><h3>Corporate Tax</h3><ul>
          <li><b>Tax Provision</b></li><li><b>Corporate Returns</b></li><li><b>Book&#8209;to&#8209;Tax</b></li><li><b>Tax Accounting</b></li></ul></div>
        <div class="dcard"><span class="dno">02 / INTERNATIONAL</span><h3>International Tax</h3><ul>
          <li><b>Country&#8209;by&#8209;Country</b> Reporting</li><li><b>Forms 5471 &amp; 8858</b></li><li><b>Foreign Tax Credits</b>, GILTI</li><li><b>Subpart F</b>, FDII, BEAT</li><li><b>Pillar Two</b> / GloBE</li></ul></div>
        <div class="dcard"><span class="dno">03 / TRANSFER PRICING</span><h3>Transfer Pricing</h3><ul>
          <li><b>Master File</b>, Local File</li><li><b>Benchmarking</b></li><li><b>Functional Analysis</b></li><li><b>Operational TP</b></li><li><b>Intercompany Agreements</b></li></ul></div>
        <div class="dcard"><span class="dno">04 / INDIRECT</span><h3>Indirect Tax</h3><ul>
          <li><b>VAT</b>, GST</li><li><b>Sales &amp; Use Tax</b></li><li><b>Customs</b></li><li><b>E&#8209;Invoicing</b></li></ul></div>
        <div class="dcard"><span class="dno">05 / OPERATIONS</span><h3>Tax Operations</h3><ul>
          <li><b>Subsidiary Tax Packages</b></li><li><b>Tax Calendars</b></li><li><b>Workpapers</b>, Data Collection</li><li><b>Entity Management</b></li><li><b>Notice Management</b></li></ul></div>
      </div>
    </div>
  </section>

  <!-- ===== close ===== -->
  <section id="close" class="obs">
    <div class="close-bg" aria-hidden="true"></div>
    <div class="wrap pad">
      
      <h2 class="rise">We&rsquo;re building Derive alongside a small group of tax&nbsp;teams.</h2>
      <p class="rise">If you&rsquo;re exploring the future of tax operations, we&rsquo;d love to talk.</p>
      <div class="rise"><a class="btn big" href="mailto:hello@getderive.com">Start a Conversation</a></div>
    </div>
  </section>

  <!-- ===== explainer ===== -->
  

  <!-- ===== footer ===== -->
  <footer>
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="#top" aria-label="Derive home">
          <svg viewBox="0 0 7 24" aria-hidden="true"><line x1="3.5" y1="2" x2="3.5" y2="22" stroke="var(--ivory)" stroke-opacity="0.16" stroke-width="1.2" stroke-linecap="round"/><circle cx="3.5" cy="3.5" r="3" fill="var(--ivory)"/><circle cx="3.5" cy="12" r="3" fill="var(--ivory)"/><circle cx="3.5" cy="20.5" r="3" fill="var(--ivory)"/></svg>
          <span class="wm">Derive</span>
        </a>
        <p>Managed Operations for Tax Teams. One operating model of agents, specialists, and your team.</p>
      </div>
      <div class="foot-cols">
        <div class="foot-col"><h4>Product</h4>
          <a href="#intro">Operating Model</a><a href="#domains">Coverage</a></div>
        <div class="foot-col"><h4>Company</h4>
          <a href="#close">Start a Conversation</a><a href="mailto:hello@getderive.com">Contact</a></div>
      </div>
    </div>
    <div class="foot-bot">
      <span class="cp">&copy; 2026 Derive. All rights reserved.</span>
      <div class="socials">
        <a href="#" aria-label="Derive on LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.3 8.65 21 10.9 21 14v7h-4v-6.2c0-1.48-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.29V21H9z"/></svg></a>
        <a href="#" aria-label="Derive on X"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.3l-7.2 8.24 8.48 11.26h-6.64l-5.2-6.8-5.95 6.8H1.72l7.7-8.8L1.3 2.25h6.81l4.7 6.21zM17.08 20.1h1.83L7.02 4.13H5.06z"/></svg></a>
      </div>
    </div>
  </footer>

</main>

`;
