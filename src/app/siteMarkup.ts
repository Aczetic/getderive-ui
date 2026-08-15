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
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 8c8 0 8 8 16 8" fill="none" stroke="var(--emerald)" stroke-width="2" stroke-linecap="round"/>
      <path d="M4 16c8 0 8 5 16 5" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round"/>
      <path d="M4 24c8 0 11-8 24-8" fill="none" stroke="var(--ivory)" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <span class="wm">Derive</span>
  </a>
  <nav class="nav">
    <a class="lnk" href="#gap">The Gap</a>
    <a class="lnk" href="#intro">Operating Model</a>
    <a class="lnk" href="#why">Why Derive</a>
    <a class="lnk" href="#domains">Coverage</a>
    <a class="btn sm" href="#close"><span class="dot"></span>Start a Conversation</a>
  </nav>
</header>

<main class="content" id="top">

  <!-- ===== hero ===== -->
  <section id="hero">
    <div class="wrap">
      <span class="kicker hero-eyebrow">AI-Managed Operations</span>
      <h1 class="display" aria-label="AI-Managed Operations for Tax Teams">
        <span class="hero-line"><span class="w">AI-Managed</span></span>
        <span class="hero-line"><span class="w">Operations for</span></span>
        <span class="hero-line"><span class="w em">Tax Teams.</span></span>
      </h1>
      <div class="hero-sub">
        <p class="lead">Derive brings together AI agents, tax specialists, and your team in a single operating model to execute tax work with speed, consistency, and control.</p>
        <div class="hero-cta">
          <a class="btn" href="#close"><span class="dot"></span>Start a Conversation</a>
        </div>
      </div>
    </div>
    <div class="scrollcue" aria-hidden="true"><span class="rail"></span><span>Begin</span></div>
  </section>

  <!-- ===== the gap ===== -->
  <section id="gap" class="obs">
    <div class="wrap pad">
      <span class="kicker rise">The Tax Operations Gap</span>
      <h2 class="big rise" style="margin-top:26px">Tax has outgrown the way it&rsquo;s&nbsp;operated.</h2>
      <div class="cols">
        <p class="body rise">Tax teams are expected to manage increasing regulatory complexity, growing data volumes, expanding global obligations, and tighter deadlines &mdash; all while operating with lean teams and fragmented systems.</p>
        <div class="rise">
          <p class="body">The volume of work compounds every cycle. The tooling was built to organize it, not to carry it.</p>
          <p class="verdict">Traditional software helps teams <span class="em">manage</span> work. It doesn&rsquo;t <span class="emg">execute</span> it.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== introducing ===== -->
  <section id="intro" class="obs">
    <div class="wrap pad">
      <span class="kicker rise">Introducing Derive</span>
      <h2 class="h-sec rise">A new operating model for <span class="emg">enterprise&nbsp;tax</span>.</h2>
      <p class="body rise">Derive combines AI agents, tax specialists, and your team to execute tax work across the entire tax lifecycle &mdash; from recurring compliance to the most complex international workflows.</p>
      <p class="body rise" style="margin-top:18px;color:var(--ivory)">Instead of giving teams another tool, Derive becomes an <span class="em">operational layer</span> that helps work get done.</p>
    </div>
  </section>

  <!-- ===== proof scene — 3D: the chain of custody of Row 07 ===== -->
  <section id="proof">
    <div class="proof3d">
      <div class="proof-ui">
        <div class="pu-left">
          <span class="kicker">Inside a single obligation</span>
          <h2>Work executed end&#8209;to&#8209;end &mdash; with your team in&nbsp;command.</h2>
          <div class="pu-rail" id="puRail">
            <span data-i="0"><i>01</i>Learns</span><span data-i="1"><i>02</i>Runs</span><span data-i="2"><i>03</i>Escalates</span><span data-i="3"><i>04</i>Approves</span><span data-i="4"><i>05</i>Retains</span>
          </div>
          <article class="work-card pu-card" id="puCard">
            <div class="wc-top">
              <div><div class="wc-ent">Meridian Global US, Inc.</div><div class="wc-ob">FORM 5471 &middot; SCHEDULE J &middot; ROW 07 &middot; §986</div></div>
              <div class="wc-status" id="wc-status">Learning</div>
            </div>
            <div class="wc-body">
              <div class="cstate" data-i="0">
                <div class="crow"><span class="k">Sources</span><span class="v mono">Trial balance &middot; Prior filings &middot; GL feed</span></div>
                <div class="crow"><span class="k">Ownership</span><span class="v">100% CFC &middot; US parent</span></div>
                <div class="crow"><span class="k">Treatment</span><span class="v">Subpart F &middot; §951A GILTI</span></div>
                <p class="note">Derive ingests the entity&rsquo;s data and prior filings, and learns the treatment.</p>
              </div>
              <div class="cstate" data-i="1">
                <div class="sched">
                  <div class="sched-h">SCHEDULE J &mdash; EARNINGS &amp; PROFITS &middot; USD</div>
                  <div class="sr"><span>Opening balance</span><span>4,812,000</span></div>
                  <div class="sr"><span>Current-year E&amp;P</span><span>1,190,400</span></div>
                  <div class="sr hi"><span>Row 07 &middot; §986 FX remeasurement</span><span class="flag">(214,700)</span></div>
                  <div class="sr tot"><span>Closing balance</span><span>5,787,700</span></div>
                </div>
                <p class="note">An AI agent builds the workpapers and drafts the return &mdash; 14/14, conf 96.4%.</p>
              </div>
              <div class="cstate" data-i="2">
                <div class="crow"><span class="k">Exception</span><span class="v">Row 07 &middot; §986 FX remeasurement</span></div>
                <div class="comment">
                  <div class="ca"><span class="av">RO</span><span>R. Okafor &middot; International Tax</span></div>
                  <p>&ldquo;Spot vs. weighted-average rate diverged over 5% this period. Recommend the weighted-average method per policy TP&#8209;04; net impact (214,700).&rdquo;</p>
                </div>
                <p class="note warn">Row 07 is routed to a specialist &mdash; reasoning attached, awaiting your call.</p>
                <div class="approve-row">
                  <button class="btn approve-btn" id="approveBtn" type="button"><span class="dot"></span>Approve Row 07</button>
                  <button class="ctrl" id="requestBtn" type="button">Request change</button>
                </div>
              </div>
              <div class="cstate" data-i="3">
                <div class="approval">
                  <span class="ap-check">&#10003;</span>
                  <div><div class="ap-title">Approved by you</div><div class="ap-by">Head of Tax &middot; 2026&#8209;03&#8209;14 &middot; 09:22 UTC</div></div>
                </div>
                <div class="crow"><span class="k">Filing package</span><span class="v mono">sealed</span></div>
                <div class="crow"><span class="k">Audit trail</span><span class="v">source &rarr; calc &rarr; review &rarr; approval</span></div>
                <div class="evidence"><span class="chip">source data</span><span class="chip">calculations</span><span class="chip">specialist note</span><span class="chip">your approval</span></div>
                <p class="note">Retained end-to-end, with Row 07&rsquo;s approval on the record.</p>
              </div>
            </div>
          </article>
        </div>
        <div class="film-stage" id="filmStage">
          <div class="camera" id="fCam"><div class="scene" id="fScene">
            <svg class="wires" id="fWires"><path/><path/><path/><path/></svg>
            <div class="el src s1"><span class="k">SOURCE</span>Trial balance</div>
            <div class="el src s2"><span class="k">SOURCE</span>Prior filings</div>
            <div class="el src s3"><span class="k">SOURCE</span>GL feed</div>
            <div class="el src s4 r7"><span class="k">SOURCE</span>FX rates</div>
            <div class="el wp" id="fWp">
              <div class="wp-h"><span class="doc">SCHEDULE J &middot; FY2025</span><span class="rowid">ROW 07 &middot; §986</span></div>
              <div class="forming" id="fForming">&#9680; forming from sources&hellip;</div>
              <div class="wp-rows" id="fRows">
                <div class="row"><span class="lbl">Opening balance</span><span class="amt">4,812,000</span></div>
                <div class="row"><span class="lbl">Current-year E&amp;P</span><span class="amt">1,190,400</span></div>
                <div class="row hero" id="fHero"><span class="lbl">Row 07 &middot; IRC §986 FX<span class="flg">variance &gt;5%</span><span class="rsv">resolved</span></span><span class="amt" id="fHeroAmt">(214,700)</span></div>
                <div class="row tot"><span class="lbl">Closing balance</span><span class="amt">5,787,700</span></div>
              </div>
              <div class="wp-seal" id="fSeal"><span class="c">&#10003;</span><span><span class="t">Approved &middot; Head of Tax</span><br><span class="by">SIGNED BY YOU &middot; 2026-03-14 &middot; 09:22 UTC</span></span></div>
              <div class="sealtag" id="fTag">&#9670; SEALED</div>
            </div>
            <svg class="tether" id="fTether"><path id="fTPath"/><circle id="fTDot" r="4"/><circle id="fTPulse" r="5"/></svg>
            <div class="el spec" id="fSpec"><div class="reqtag">&#9670; ROUTED &middot; REVIEW REQUEST</div><div class="h"><span class="av">RO</span>R. Okafor &middot; International Tax</div><p>&ldquo;Spot vs. weighted-average diverged &gt;5%. Recommend weighted-average per policy TP-04.&rdquo;</p><div class="bell" id="fBell"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="3.6" r="1.5"/><path d="M14 5.6c-3.9 0-6.4 2.9-6.4 6.6 0 3.4-.5 5-1.7 6.4-.5.6-.1 1.5.7 1.5h14.8c.8 0 1.2-.9.7-1.5-1.2-1.4-1.7-3-1.7-6.4 0-3.7-2.5-6.6-6.4-6.6z"/><path d="M11.6 23.2a2.6 2.6 0 0 0 4.8 0"/><path class="wv" d="M23.6 9.4a7.2 7.2 0 0 1 1.7 4.6"/><path class="wv" d="M4.4 9.4a7.2 7.2 0 0 0-1.7 4.6"/></svg></div></div>
            <div class="el stamp" id="fStamp">&#10003;</div><div class="ring" id="fRing"></div>
            <div class="el audit" id="fAudit">
              <div class="ttl">AUDIT RECORD</div>
              <div class="st"><span class="d"><i></i></span>Ingested</div><div class="st"><span class="d"><i></i></span>Calculated</div>
              <div class="st"><span class="d"><i></i></span>Escalated</div><div class="st"><span class="d"><i></i></span>Resolved</div>
              <div class="st"><span class="d"><i></i></span>Approved</div>
              <div class="docid" id="fDocId">DOC &middot; MER-5471-J-0714 &middot; sealed</div>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  </section>

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
  <section id="why" class="obs">
    <div class="wrap pad">
      <div class="head">
        <div class="rise">
          <span class="kicker">Why Derive</span>
          <h2 class="h-sec" style="margin-top:22px">Built for modern<br>tax operations.</h2>
        </div>
        <p class="lead rise" style="max-width:34ch">Six ways the operating model changes what a tax function can carry.</p>
      </div>
      <div class="pillars rise">
        <div class="pillar"><span class="glow"></span><span class="no">01</span><h3>Complete Coverage</h3><p>Every entity, obligation and deadline is tracked and worked &mdash; nothing waits in an inbox or slips off a spreadsheet.</p></div>
        <div class="pillar"><span class="glow"></span><span class="no">02</span><h3>Operational Certainty</h3><p>The same governed process runs every cycle, with a full audit trail standing behind every number.</p></div>
        <div class="pillar"><span class="glow"></span><span class="no">03</span><h3>Institutional Intelligence</h3><p>Each cycle&rsquo;s treatments and judgments are retained, so expertise stops walking out the door with people.</p></div>
        <div class="pillar"><span class="glow"></span><span class="no">04</span><h3>Continuous Operations</h3><p>Obligations don&rsquo;t wait for quarter-end &mdash; work is executed, monitored and improved between the deadlines.</p></div>
        <div class="pillar"><span class="glow"></span><span class="no">05</span><h3>Business Impact</h3><p>Fewer handoffs and less leakage free your team to spend judgment where it actually moves the number.</p></div>
        <div class="pillar"><span class="glow"></span><span class="no">06</span><h3>Scalable Operations</h3><p>Take on more entities and jurisdictions without adding headcount at the same rate.</p></div>
      </div>
    </div>
  </section>

  <!-- ===== across the tax function ===== -->
  <section id="domains">
    <div class="dom-head obs">
      <span class="kicker rise">Across the Tax Function</span>
      <p class="dom-quote rise" style="margin-top:24px">Across recurring compliance, reporting, and the most <span class="em">complex international</span> tax workflows.</p>
    </div>
    <div class="dwin">
      <div class="dtrack" id="dtrack">
        <div class="dcard"><span class="dno">01 / CORPORATE</span><h3>Corporate Tax</h3><ul>
          <li><b>Tax Provision</b></li><li><b>Corporate Returns</b></li><li><b>Book&#8209;to&#8209;Tax</b></li><li><b>Tax Accounting</b></li></ul></div>
        <div class="dcard"><span class="dno">02 / INTERNATIONAL</span><h3>International Tax</h3><ul>
          <li><b>Country&#8209;by&#8209;Country</b> Reporting</li><li><b>Forms 5471 &amp; 8858</b></li><li><b>Foreign Tax Credits</b> &middot; GILTI</li><li><b>Subpart F</b> &middot; FDII &middot; BEAT</li><li><b>Pillar Two</b> / GloBE</li></ul></div>
        <div class="dcard"><span class="dno">03 / TRANSFER PRICING</span><h3>Transfer Pricing</h3><ul>
          <li><b>Master File</b> &middot; Local File</li><li><b>Benchmarking</b></li><li><b>Functional Analysis</b></li><li><b>Operational TP</b></li><li><b>Intercompany Agreements</b></li></ul></div>
        <div class="dcard"><span class="dno">04 / INDIRECT</span><h3>Indirect Tax</h3><ul>
          <li><b>VAT</b> &middot; GST</li><li><b>Sales &amp; Use Tax</b></li><li><b>Customs</b></li><li><b>E&#8209;Invoicing</b></li></ul></div>
        <div class="dcard"><span class="dno">05 / OPERATIONS</span><h3>Tax Operations</h3><ul>
          <li><b>Subsidiary Tax Packages</b></li><li><b>Tax Calendars</b></li><li><b>Workpapers</b> &middot; Data Collection</li><li><b>Entity Management</b></li><li><b>Notice Management</b></li></ul></div>
      </div>
    </div>
  </section>

  <!-- ===== close ===== -->
  <section id="close" class="obs">
    <div class="close-bg" aria-hidden="true"></div>
    <div class="wrap pad">
      <span class="kicker rise" style="justify-content:center">Start a Conversation</span>
      <h2 class="rise">We&rsquo;re building Derive alongside a small group of tax&nbsp;teams.</h2>
      <p class="rise">If you&rsquo;re exploring the future of tax operations, we&rsquo;d love to talk.</p>
      <div class="rise"><a class="btn big" href="mailto:hello@getderive.com"><span class="dot"></span>Start a Conversation</a></div>
    </div>
  </section>

  <!-- ===== explainer ===== -->
  <section class="explain obs">
    <div class="wrap">
      <h3 class="rise">What is AI-Managed Operations?</h3>
      <div class="rise">
        <p><span class="em2">A new operating model for enterprise tax teams.</span> Derive combines AI agents, tax specialists, and your existing team into a single managed-operations model. AI agents execute work, specialists provide domain expertise and oversight, and your team retains control of critical decisions and approvals.</p>
      </div>
    </div>
  </section>

  <!-- ===== footer ===== -->
  <footer>
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="#top" aria-label="Derive home">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M4 8c8 0 8 8 16 8" fill="none" stroke="var(--emerald)" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 16c8 0 8 5 16 5" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 24c8 0 11-8 24-8" fill="none" stroke="var(--ivory)" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="wm">Derive</span>
        </a>
        <p>AI-Managed Operations for Tax Teams. One operating model of agents, specialists, and your team.</p>
      </div>
      <div class="foot-cols">
        <div class="foot-col"><h4>Product</h4>
          <a href="#intro">Operating Model</a><a href="#proof">How it works</a><a href="#why">Why Derive</a><a href="#domains">Coverage</a></div>
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
