/* global React, SlotMachine, Counter, StatBlock, Carousel, FAQItem, Reveal */

/* =========================================================
   HOME
   ========================================================= */
function HomePage({ go }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="wrap hero__inner">
          <div className="hero__content">
            <div className="eyebrow">Illinois licensed terminal operator</div>
            <h1 className="display h1 hero__title">
              <span className="line">Add <span className="gold">$8,400</span></span>
              <span className="line"><span className="italic">a month</span> to your</span>
              <span className="line">bottom <span className="red">line.</span></span>
            </h1>
            <p className="hero__sub">
              LS Gaming installs, services and operates premium video gaming terminals across Illinois. Zero capital outlay. Industry-leading payouts. Same-day technical response, 7 days a week.
            </p>
            <div className="hero__actions">
              <button className="btn btn--gold" onClick={() => go("partners")}>
                Become a Partner <span className="arrow">→</span>
              </button>
              <button className="btn btn--ghost" onClick={() => go("services")}>
                How It Works
              </button>
            </div>
            <div className="hero__stats">
              <div>
                <div className="hero__stat-num"><Counter to={648} /></div>
                <div className="hero__stat-label">Active Locations</div>
              </div>
              <div>
                <div className="hero__stat-num"><Counter to={142} prefix="$" suffix="M" /></div>
                <div className="hero__stat-label">Paid in 2025</div>
              </div>
              <div>
                <div className="hero__stat-num"><Counter to={14} /></div>
                <div className="hero__stat-label">Years Operating</div>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <SlotMachine />
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="marquee-strip">
        <div className="marquee-strip__inner">
          {Array.from({ length: 2 }).map((_, j) => (
            <span key={j}>
              <span>Higher payouts</span>
              <span>24/7 service</span>
              <span>Full compliance</span>
              <span>Premium cabinets</span>
              <span>Weekly settlements</span>
              <span>Zero installation cost</span>
              <span>Illinois operated</span>
            </span>
          ))}
        </div>
      </div>

      {/* WHY LS */}
      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">The Difference</div>
            <h2 className="display h2 mt-3" style={{ maxWidth: "16ch" }}>
              Built for <span className="gold">venue owners</span>, not investors.
            </h2>
          </Reveal>
          <div className="grid-3 mt-6">
            <Reveal delay={1}>
              <div className="card">
                <div className="card__num">01 — Revenue</div>
                <h3 className="card__title">Top of the splits</h3>
                <p className="card__body">
                  Statutory maximum to your establishment. Transparent weekly settlements with line-item terminal reporting — no creative accounting.
                </p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card">
                <div className="card__num">02 — Service</div>
                <h3 className="card__title">Two-hour response</h3>
                <p className="card__body">
                  In-state technicians on call 24/7. A machine down for an hour costs you $90 in average earn — we treat downtime like an emergency.
                </p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="card">
                <div className="card__num">03 — Compliance</div>
                <h3 className="card__title">IGB by the book</h3>
                <p className="card__body">
                  Every cabinet, license, and bond filed and current. Your account manager handles renewals so your liquor license stays clean.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="text-center">
              <div className="eyebrow" style={{ justifyContent: "center" }}>From signed to spinning</div>
              <h2 className="display h2 mt-3">Four weeks <span className="gold italic">to revenue.</span></h2>
            </div>
          </Reveal>

          <div className="grid-4 mt-6 process">
            {[
              ["01", "Apply", "Submit a 5-minute inquiry. We confirm Illinois liquor license eligibility within 24 hours."],
              ["02", "Survey", "Free site visit. We map the optimal gaming area for your room, code, and traffic."],
              ["03", "Install", "Five terminals deployed in a single overnight install. Zero downtime for your venue."],
              ["04", "Earn", "Your first weekly settlement lands 8 days after the IGB activates your machines."],
            ].map(([n, t, d], i) => (
              <Reveal delay={(i % 4) + 1} key={n}>
                <div className="process__step">
                  <div className="process__num">{n}</div>
                  <h4 className="process__title">{t}</h4>
                  <p className="process__desc">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GAMES PREVIEW */}
      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
              <div>
                <div className="eyebrow">The floor</div>
                <h2 className="display h2 mt-3" style={{ maxWidth: "14ch" }}>
                  Cabinets that <span className="gold">earn.</span>
                </h2>
              </div>
              <button className="btn btn--ghost" onClick={() => go("games")}>View full library <span className="arrow">→</span></button>
            </div>
          </Reveal>

          <Carousel slides={[
            {
              name: "GOLDEN VAULT",
              tag: "TOP EARNER 2025",
              symbols: ["7","♣","$","♦","★","BAR","♥","$","7"],
              rtp: "94.2%",
              lines: 25,
              topAward: "$1,199",
              vol: "HIGH",
              denoms: "1¢ – 25¢",
              desc: "A vertical 23\" portrait with the highest hold percentage on our floor. Hold-and-spin mechanic with progressive grand jackpot that locks in players for 30-minute sessions on average.",
            },
            {
              name: "DIAMOND HEIST",
              tag: "NEW THIS QUARTER",
              symbols: ["♦","7","★","♦","♣","$","♦","BAR","♦"],
              rtp: "93.8%",
              lines: 30,
              topAward: "$1,199",
              vol: "MED-HIGH",
              denoms: "1¢ – $1",
              desc: "Five-reel video with a free-spin vault bonus. Strong appeal to weekday lunch crowds — 41% above floor average earn per day in trial venues.",
            },
            {
              name: "RIVERBOAT RICHES",
              tag: "STAFF FAVORITE",
              symbols: ["★","♥","BAR","7","$","♦","★","♣","BAR"],
              rtp: "94.0%",
              lines: 20,
              topAward: "$1,199",
              vol: "MEDIUM",
              denoms: "1¢ – 10¢",
              desc: "Mississippi-themed mid-volatility classic with hold-mechanic bonus. Pulls strong from the over-55 daytime demographic and stays bright in low-light venues.",
            },
            {
              name: "RED HOT ROUTE 66",
              tag: "ILLINOIS EXCLUSIVE",
              symbols: ["♥","★","7","♥","BAR","♥","$","♥","♣"],
              rtp: "93.5%",
              lines: 40,
              topAward: "$1,199",
              vol: "HIGH",
              denoms: "1¢ – 50¢",
              desc: "Built around Illinois iconography. Multiplier wilds and a Mother Road bonus map that lights up the room — our most-photographed cabinet on social.",
            },
          ]} />
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div style={{
              background: "linear-gradient(135deg, #1a1612 0%, #0a0806 100%)",
              border: "1px solid var(--gold-3)",
              borderRadius: 16,
              padding: "clamp(40px, 6vw, 80px)",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(60% 80% at 100% 0%, rgba(212,175,55,0.15), transparent 60%)",
                pointerEvents: "none",
              }} />
              <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "center" }}>
                <div>
                  <div className="eyebrow">Calculate your earn</div>
                  <h2 className="display h2 mt-3" style={{ maxWidth: "18ch" }}>
                    A typical Illinois tavern earns <span className="gold">$101k a year</span> with us.
                  </h2>
                  <p className="lead mt-3">
                    The average LS Gaming partner adds five terminals and sees a stabilized monthly net of $8,400 — paid weekly. We'll model your specific venue free of charge.
                  </p>
                  <button className="btn btn--gold mt-4" onClick={() => go("partners")}>
                    Run my numbers <span className="arrow">→</span>
                  </button>
                </div>
                <div className="grid-2" style={{ gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <div className="stat-block">
                    <div className="stat-block__num"><Counter to={8400} prefix="$" /></div>
                    <div className="stat-block__label">Avg Monthly Net</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-block__num"><Counter to={5} /></div>
                    <div className="stat-block__label">Terminals Std.</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-block__num"><Counter to={28} /></div>
                    <div className="stat-block__label">Days to Earn</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-block__num">$<Counter to={0} />0</div>
                    <div className="stat-block__label">Capital Outlay</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   ABOUT
   ========================================================= */
function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">About us</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "16ch" }}>
            Fourteen years <span className="gold italic">on the floor.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            LS Gaming is a privately-held Illinois Gaming Board licensed terminal operator. We were one of the first 30 operators licensed when the Illinois Video Gaming Act went live in 2012 — and we've spent every year since proving why our partners stay.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap grid-2">
          <Reveal>
            <div className="eyebrow">The Story</div>
            <h2 className="display h2 mt-3">Started in a <span className="red">basement.</span></h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="lead">
              Larry Sokolov serviced his first slot machine in 1994 — the back-room VFW in Mount Prospect where his father drank coffee on Saturdays. When Illinois legalized video gaming eighteen years later, Larry mortgaged the house, bought six cabinets, and shook hands on five locations.
            </p>
            <p className="lead mt-3">
              Today LS Gaming operates 3,920+ terminals across 87 Illinois counties. Larry still personally signs every partner contract. The basement workshop is now a 22,000 sq ft Joliet operations center — but the philosophy hasn't moved an inch.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="text-center">
              <div className="eyebrow" style={{ justifyContent: "center" }}>By the numbers</div>
              <h2 className="display h2 mt-3">A serious <span className="gold">operation.</span></h2>
            </div>
          </Reveal>
          <div className="grid-4 mt-6">
            <Reveal delay={1}><StatBlock to={648} label="Active Locations" /></Reveal>
            <Reveal delay={2}><StatBlock to={142} prefix="$" suffix="M" label="Player Payouts '25" /></Reveal>
            <Reveal delay={3}><StatBlock to={87} label="Counties Served" /></Reveal>
            <Reveal delay={4}><StatBlock to={68} label="W-2 Employees" /></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">Leadership</div>
            <h2 className="display h2 mt-3">The team <span className="gold italic">behind it.</span></h2>
          </Reveal>
          <div className="grid-4 mt-6">
            {[
              ["LARRY SOKOLOV", "Founder & CEO", "LS"],
              ["MARGARET CHEN", "Chief Operating Officer", "MC"],
              ["DERRICK OYELOWO", "VP, Field Operations", "DO"],
              ["KATIE FERGUSON", "Director of Compliance", "KF"],
            ].map(([n, t, init], i) => (
              <Reveal delay={(i % 4) + 1} key={n}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    aspectRatio: "1",
                    width: "100%",
                    background: "linear-gradient(180deg, #2a1f0e 0%, #0a0806 100%)",
                    border: "1px solid var(--gold-3)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    fontFamily: "var(--f-display)",
                    fontSize: 80,
                    background: "linear-gradient(135deg, #1a1612, #0a0806)",
                    color: "transparent",
                    backgroundImage: "linear-gradient(180deg, #f7e399 0%, #d4af37 45%, #8a6a18 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, #1a1612, #0a0806)",
                      borderRadius: 12,
                      zIndex: -1,
                    }} />
                    {init}
                  </div>
                  <h4 style={{
                    fontFamily: "var(--f-display)",
                    fontSize: 18,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    margin: 0,
                    color: "var(--cream)",
                  }}>{n}</h4>
                  <small style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                  }}>{t}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <Reveal>
              <div className="eyebrow">Our values</div>
              <h2 className="display h2 mt-3">Plain talk. <span className="gold italic">Square deals.</span></h2>
            </Reveal>
            <Reveal delay={1}>
              <div style={{ display: "grid", gap: 32 }}>
                {[
                  ["Transparency", "Weekly settlements show every spin, every coin in, every win. Pull the report any time."],
                  ["Speed", "Our two-hour service guarantee isn't marketing. It's measurable in our SLA dashboard, which our partners can audit."],
                  ["Local", "Illinois owned, Illinois operated, Illinois banked. No private equity. No coast-based call center."],
                  ["Compliance", "Three full-time compliance staff. We've never had a license action against us. We never will."],
                ].map(([t, d]) => (
                  <div key={t}>
                    <h4 style={{ fontFamily: "var(--f-display)", fontSize: 22, color: "var(--gold-1)", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>{t}</h4>
                    <p style={{ marginTop: 8 }}>{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   SERVICES
   ========================================================= */
function ServicesPage({ go }) {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">How it works</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "14ch" }}>
            Everything <span className="gold italic">handled.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            You run a venue. We run the gaming floor. Twelve services bundled into one weekly settlement — and a single phone number that always picks up.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <div className="grid-3">
            {[
              ["Site Survey", "Free pre-install consultation. We map ADA-compliant gaming area, electrical, surveillance line-of-sight, and ATM placement."],
              ["Licensing Support", "Our compliance team walks your liquor license, location license, and gaming license filings from application to issued."],
              ["Overnight Install", "Two-truck overnight install of up to six terminals. Conduit, surveillance hookups, signage — gone by sunrise."],
              ["Cabinet Curation", "We rotate underperformers off your floor without being asked. Top-quartile cabinets stay, bottom-quartile swap out quarterly."],
              ["24/7 Service", "Two-hour technician response window, statewide. No tier-one phone tree — direct dispatch to your local tech."],
              ["Cash Management", "Daily TITO ticket reconciliation and weekly armored pickup. You never touch a redemption envelope unless you want to."],
              ["Compliance & Audit", "All IGB filings, terminal certifications, software updates, and surveillance retention handled centrally."],
              ["Weekly Settlement", "ACH every Wednesday with itemized per-cabinet, per-day net terminal income reporting. Pull historicals any time."],
              ["Marketing Co-op", "Bar-mat artwork, exterior signage, local digital ad spend — covered. Your venue stays branded, gaming stays subtle."],
              ["Player Promotions", "Monthly tournaments and giveaways at top-performing venues. Drives weekday traffic in your slowest hours."],
              ["Training", "Staff onboarding on dispenser handling, responsible gaming intervention, and basic troubleshooting."],
              ["Account Management", "A single named rep. Direct cell. Same person from year one to year ten."],
            ].map(([t, d], i) => (
              <Reveal delay={(i % 3) + 1} key={t}>
                <div className="card" style={{ padding: "28px 24px" }}>
                  <div className="card__num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="card__title" style={{ fontSize: 22 }}>{t}</h3>
                  <p className="card__body" style={{ fontSize: 14 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap text-center">
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>The math</div>
            <h2 className="display h2 mt-3">Zero up-front. <span className="gold italic">Every time.</span></h2>
            <p className="lead mt-3" style={{ margin: "16px auto 0" }}>
              LS Gaming covers 100% of cabinet purchase, installation, conduit, electrical, surveillance, signage, and ongoing service. Your only contribution is wall space and electricity.
            </p>
            <button className="btn btn--gold mt-6" onClick={() => go("partners")}>
              Talk to a consultant <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   GAMES
   ========================================================= */
const GAMES_LIBRARY = [
  { name: "Golden Vault", maker: "Light & Wonder", glyph: "$", color: "gold" },
  { name: "Diamond Heist", maker: "AGS", glyph: "♦", color: "gold" },
  { name: "Riverboat Riches", maker: "Scientific Games", glyph: "★", color: "gold" },
  { name: "Red Hot Route 66", maker: "LS Exclusive", glyph: "♥", color: "red" },
  { name: "Triple Crown", maker: "IGT", glyph: "7", color: "red" },
  { name: "Lucky Streak", maker: "WMS", glyph: "♣", color: "gold" },
  { name: "Cash Cyclone", maker: "AGS", glyph: "$", color: "red" },
  { name: "Emerald Empire", maker: "IGT", glyph: "♦", color: "gold" },
  { name: "Bourbon & Bones", maker: "LS Exclusive", glyph: "BAR", color: "gold" },
  { name: "Phoenix Rising", maker: "Konami", glyph: "★", color: "red" },
  { name: "Liberty Bell", maker: "IGT", glyph: "♥", color: "red" },
  { name: "Stack of Gold", maker: "Light & Wonder", glyph: "$", color: "gold" },
  { name: "Mystic Lanterns", maker: "Konami", glyph: "★", color: "gold" },
  { name: "Vault Breaker", maker: "AGS", glyph: "♣", color: "gold" },
  { name: "Chicago Chic", maker: "LS Exclusive", glyph: "7", color: "red" },
  { name: "Black Diamond Deluxe", maker: "Scientific Games", glyph: "♦", color: "gold" },
];

function GamesPage() {
  const [filter, setFilter] = React.useState("All");
  const makers = ["All", "LS Exclusive", "IGT", "AGS", "Light & Wonder", "Scientific Games", "Konami", "WMS"];
  const filtered = filter === "All" ? GAMES_LIBRARY : GAMES_LIBRARY.filter(g => g.maker === filter);

  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">The Floor</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "14ch" }}>
            Sixty-four titles. <span className="gold italic">Curated.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            Every cabinet on the LS Gaming floor has been hand-selected from our data — we keep only the top 30% of any title we trial. Underperformers rotate off your floor automatically.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40, justifyContent: "center" }}>
              {makers.map(m => (
                <button
                  key={m}
                  onClick={() => setFilter(m)}
                  style={{
                    background: filter === m ? "var(--gold-grad)" : "transparent",
                    border: `1px solid ${filter === m ? "var(--gold-2)" : "var(--hairline)"}`,
                    color: filter === m ? "var(--ink)" : "var(--cream-dim)",
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "10px 16px",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="game-lib">
            {filtered.map((g, i) => (
              <Reveal delay={(i % 4) + 1} key={g.name}>
                <div className="game-tile">
                  <div className="game-tile__art">
                    <div className={`big ${g.color === "red" ? "big--red" : ""}`}>{g.glyph}</div>
                  </div>
                  <div className="game-tile__info">
                    <h4>{g.name}</h4>
                    <small>{g.maker}</small>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { HomePage, AboutPage, ServicesPage, GamesPage });
