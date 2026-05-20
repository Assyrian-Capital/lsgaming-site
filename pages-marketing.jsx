/* global React, Reveal, Counter, StatBlock */

/* =========================================================
   MARKETING
   ========================================================= */
function MarketingPage({ go }) {
  const collateral = [
    {
      tag: "Signage",
      title: "Exterior + interior",
      body: "Code-compliant exterior gaming signage, branded interior wayfinding, ATM toppers, and bar-mat artwork — all designed in-house and fabricated within 10 days.",
      icon: "✷",
    },
    {
      tag: "Print",
      title: "Bar mats & tents",
      body: "Custom-printed bar mats, table tents, drink coasters, and matchbook covers featuring your venue brand alongside our jackpot collateral.",
      icon: "▣",
    },
    {
      tag: "Digital",
      title: "Local ad spend",
      body: "We run a quarterly co-op digital budget targeting your specific zip codes — Meta, Google Maps, and OTT/CTV when volume justifies it.",
      icon: "◐",
    },
    {
      tag: "Social",
      title: "Content kits",
      body: "Branded social content packs delivered monthly — short-form video templates, photo libraries, and copy you can drop into your accounts in minutes.",
      icon: "♢",
    },
    {
      tag: "Maps & SEO",
      title: "Listings management",
      body: "Google Business Profile, Apple Maps, Yelp, and TripAdvisor — claimed, optimized, and kept current with your hours, photos, and gaming-room status.",
      icon: "⌖",
    },
    {
      tag: "Email & SMS",
      title: "Player capture",
      body: "Opt-in player loyalty program with monthly drip emails and event-triggered SMS — compliant with Illinois VGT marketing regulations.",
      icon: "✦",
    },
  ];

  const promos = [
    ["Monthly Hot Seat", "$500/mo", "Random-draw prize during peak Friday & Saturday hours. Drives a measured +18% weekend gaming traffic."],
    ["Quarterly Tournament", "$2,500 pool", "Multi-venue invitational. Players qualify in your room, finals broadcast on our network."],
    ["Free Play Tuesdays", "$25/credit", "Loyalty-club members redeem free play during slowest weeknight. Most partners see Tuesday lift of 2x."],
    ["Birthday Bonus", "$10/credit", "Auto-sent to loyalty members during their birth month. 41% redemption rate, brings a spouse 60% of the time."],
  ];

  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">Marketing</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "16ch" }}>
            Marketing that <span className="gold italic">fills your seats.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            Every LS Gaming partner gets a turnkey co-op marketing program at zero additional cost. We don't just run your gaming floor — we fill it.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <div className="text-center">
              <div className="eyebrow" style={{ justifyContent: "center" }}>The program in numbers</div>
              <h2 className="display h2 mt-3">Co-op that <span className="gold">actually moves the needle.</span></h2>
            </div>
          </Reveal>
          <div className="grid-4 mt-6">
            <Reveal delay={1}><StatBlock to={2.4} suffix="M" prefix="$" label="Co-op Spend 2025" decimals={1} /></Reveal>
            <Reveal delay={2}><StatBlock to={18} suffix="%" label="Avg Weekend Lift" /></Reveal>
            <Reveal delay={3}><StatBlock to={648} label="Venues Supported" /></Reveal>
            <Reveal delay={4}><StatBlock to={41} suffix="%" label="Birthday Redemption" /></Reveal>
          </div>
        </div>
      </section>

      {/* COLLATERAL GRID */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
              <div>
                <div className="eyebrow">What we deliver</div>
                <h2 className="display h2 mt-3" style={{ maxWidth: "16ch" }}>
                  Six channels. <span className="gold italic">One partner.</span>
                </h2>
              </div>
              <p className="lead" style={{ maxWidth: "36ch", margin: 0 }}>
                Every partner venue gets all six. Nothing is upcharged. Nothing is gated to "premium tier" partners.
              </p>
            </div>
          </Reveal>
          <div className="grid-3 mt-6">
            {collateral.map((c, i) => (
              <Reveal delay={(i % 3) + 1} key={c.title}>
                <div className="card">
                  <div style={{
                    fontFamily: "var(--f-display)",
                    fontSize: 48,
                    background: "var(--gold-grad)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1,
                    marginBottom: 18,
                  }}>{c.icon}</div>
                  <div className="card__num">{c.tag}</div>
                  <h3 className="card__title">{c.title}</h3>
                  <p className="card__body">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOS TABLE */}
      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">Player promotions</div>
            <h2 className="display h2 mt-3">Four programs <span className="gold italic">always running.</span></h2>
            <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
              We design, fund, and operate every promotion. You just open your doors. Each promo is templated, IGB-approved, and ready to deploy on your floor inside seven days.
            </p>
          </Reveal>

          <div style={{ marginTop: 56, display: "grid", gap: 14 }}>
            {promos.map(([name, prize, desc], i) => (
              <Reveal delay={(i % 3) + 1} key={name}>
                <div style={{
                  background: "var(--panel)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 12,
                  padding: "28px 32px",
                  display: "grid",
                  gridTemplateColumns: "auto 180px 1fr auto",
                  gap: 32,
                  alignItems: "center",
                }}>
                  <div style={{
                    fontFamily: "var(--f-display)",
                    fontSize: 32,
                    color: "var(--muted-2)",
                    letterSpacing: "0.05em",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: "var(--f-display)",
                      fontSize: 22,
                      margin: 0,
                      color: "var(--cream)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}>{name}</h4>
                    <div style={{
                      fontFamily: "var(--f-display)",
                      fontSize: 26,
                      background: "var(--gold-grad)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      marginTop: 4,
                    }}>{prize}</div>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--cream-dim)" }}>{desc}</p>
                  <span className="chip">Funded by LS</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="text-center">
              <div className="eyebrow" style={{ justifyContent: "center" }}>How it works</div>
              <h2 className="display h2 mt-3">From kickoff <span className="gold italic">to running campaign.</span></h2>
            </div>
          </Reveal>
          <div className="grid-4 mt-6 process">
            {[
              ["01", "Brand audit", "We photograph your venue, audit your existing brand, and inventory what you already have."],
              ["02", "Asset build", "Signage, bar mats, social packs, and digital ads — all designed and approved within two weeks."],
              ["03", "Launch", "Print and install crews deploy on a single overnight visit. Digital campaigns go live the next morning."],
              ["04", "Iterate", "Monthly performance review with your account manager. We rotate creative quarterly to keep it fresh."],
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

      {/* CTA */}
      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <div style={{
              background: "linear-gradient(135deg, #1a1612 0%, #0a0806 100%)",
              border: "1px solid var(--gold-3)",
              borderRadius: 16,
              padding: "clamp(40px, 6vw, 80px)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(60% 80% at 50% 0%, rgba(212,175,55,0.12), transparent 60%)",
                pointerEvents: "none",
              }} />
              <div style={{ position: "relative" }}>
                <div className="eyebrow" style={{ justifyContent: "center" }}>Get the kit</div>
                <h2 className="display h2 mt-3" style={{ maxWidth: "20ch", margin: "12px auto 0" }}>
                  See the <span className="gold">full marketing kit</span> with sample numbers from a venue like yours.
                </h2>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
                  <button className="btn btn--gold" onClick={() => go("partners")}>
                    Request the kit <span className="arrow">→</span>
                  </button>
                  <button className="btn btn--ghost" onClick={() => go("contact")}>
                    Talk to marketing
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { MarketingPage });
