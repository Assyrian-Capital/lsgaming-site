/* global React, IllinoisMap, PartnerForm, Reveal, FAQItem, Counter */

/* =========================================================
   LOCATIONS
   ========================================================= */
function LocationsPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">Across Illinois</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "14ch" }}>
            Find a <span className="gold italic">venue.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            LS Gaming partners with 648 establishments across 87 counties. From Chicago corner taverns to downstate VFW posts — the same premium floor experience, statewide.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <IllinoisMap />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">Featured Venues</div>
            <h2 className="display h2 mt-3" style={{ maxWidth: "18ch" }}>
              Some of the <span className="gold">places we operate.</span>
            </h2>
          </Reveal>

          <div className="locations-list mt-6">
            {[
              ["Briar Patch Tavern", "Chicago", "12 terminals • Open since 2014"],
              ["Lincoln Park Pub", "Chicago", "5 terminals • Open since 2016"],
              ["Riverside Grill", "Aurora", "6 terminals • Open since 2018"],
              ["Iron Horse Saloon", "Joliet", "5 terminals • Open since 2013"],
              ["Stockyard Bar", "Rockford", "6 terminals • Open since 2015"],
              ["Prairie Stop Truck Plaza", "Peoria", "6 terminals • Open since 2017"],
              ["Capitol Tap House", "Springfield", "5 terminals • Open since 2014"],
              ["Quad Cities Social Club", "Moline", "6 terminals • Open since 2019"],
              ["Levee Lounge", "Alton", "5 terminals • Open since 2020"],
              ["Cornbelt Bar & Grill", "Bloomington", "6 terminals • Open since 2016"],
              ["Champaign Social House", "Champaign", "5 terminals • Open since 2018"],
              ["Galena Gold Company", "Galena", "5 terminals • Open since 2017"],
            ].map(([n, c, m]) => (
              <div className="location-item" key={n}>
                <h4>{n}</h4>
                <small>{c}, IL · {m}</small>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="lead" style={{ margin: "0 auto" }}>
              Looking for a complete list? Players can browse our full venue directory or contact us with the city.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   FOR ESTABLISHMENTS
   ========================================================= */
function PartnersPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">For Establishments</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "16ch" }}>
            Five terminals. <span className="gold italic">Eight grand a month.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            That's the median LS Gaming partner. Drop a 5-minute inquiry below and a revenue consultant will model the specific numbers for your venue within 24 hours.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <div className="grid-2">
            <Reveal>
              <div className="eyebrow">What you get</div>
              <h2 className="display h2 mt-3" style={{ marginBottom: 32 }}>
                Eligible? <span className="gold">Here's the deal.</span>
              </h2>

              <div style={{ display: "grid", gap: 22 }}>
                {[
                  ["Zero capital", "We cover every penny of installation — cabinets, electrical, conduit, signage, surveillance. Your only cost is square footage."],
                  ["Statutory split max", "We pay you the maximum allowable under Illinois law — period. No tier-locked rates, no volume-based ramps."],
                  ["Weekly ACH", "Settlements land in your account every Wednesday with line-item per-terminal reporting. No invoices, no follow-ups."],
                  ["2-hour service", "Statewide SLA. If your machine is down, our tech is in your parking lot inside 120 minutes. Audited monthly."],
                  ["Compliance handled", "Three full-time compliance staff manage every IGB filing on your behalf — for the life of our agreement."],
                  ["Marketing included", "Bar mats, exterior signage, local digital co-op — covered. We brand the gaming, you keep your venue identity."],
                ].map(([t, d]) => (
                  <div key={t} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{
                      width: 32, height: 32, flexShrink: 0,
                      borderRadius: "50%",
                      background: "var(--gold-grad)",
                      color: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--f-display)",
                      fontSize: 18,
                      marginTop: 2,
                    }}>✓</div>
                    <div>
                      <h4 style={{
                        fontFamily: "var(--f-display)",
                        fontSize: 20,
                        color: "var(--cream)",
                        margin: 0,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}>{t}</h4>
                      <p style={{ margin: "6px 0 0", fontSize: 14 }}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 40, padding: 24, background: "var(--panel)", border: "1px solid var(--hairline)", borderRadius: 12 }}>
                <div className="eyebrow">Eligibility checklist</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 8 }}>
                  {[
                    "Active Illinois liquor license (or pending application)",
                    "Minimum 800 sq ft venue floor",
                    "Open 25+ hours per week",
                    "No felony convictions on principal owners (last 10 yrs)",
                  ].map(t => (
                    <li key={t} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--cream-dim)" }}>
                      <span style={{ color: "var(--gold-2)" }}>—</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div style={{
                background: "var(--panel)",
                border: "1px solid var(--gold-3)",
                borderRadius: 16,
                padding: 36,
                position: "sticky",
                top: 100,
              }}>
                <div className="eyebrow">Inquiry</div>
                <h3 className="display h3 mt-3" style={{ marginBottom: 8 }}>
                  Start <span className="gold">earning.</span>
                </h3>
                <p style={{ fontSize: 14, marginBottom: 28, color: "var(--cream-dim)" }}>
                  5 minutes. No obligation. Response within one business day.
                </p>
                <PartnerForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   PLAYER INFO / RESPONSIBLE GAMING
   ========================================================= */
function PlayerPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">For Players</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "16ch" }}>
            Play smart. <span className="gold italic">Play safely.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            Video gaming is entertainment, not income. LS Gaming is a proud signatory of the Illinois Council on Problem Gambling Responsible Operator program.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap grid-2">
          <Reveal>
            <div className="eyebrow">The Basics</div>
            <h2 className="display h2 mt-3">Know what <span className="gold">you're playing.</span></h2>
            <p className="lead mt-3">
              Every video gaming terminal in Illinois is regulated, audited, and certified by the Illinois Gaming Board. Payout percentages are fixed in firmware, monitored in real-time, and randomly tested in field audits.
            </p>

            <div style={{ display: "grid", gap: 18, marginTop: 32 }}>
              {[
                ["Minimum age", "21 to play any video gaming terminal in Illinois. Valid government photo ID required."],
                ["Maximum wager", "$4 per spin under Illinois Public Act 103-657 (effective July 2024)."],
                ["Maximum award", "$1,199 single-play award. Larger awards require manual tax-form processing."],
                ["Payout floor", "All cabinets are certified at minimum 80% return-to-player by Illinois Gaming Board."],
              ].map(([t, d]) => (
                <div key={t} style={{ paddingBottom: 18, borderBottom: "1px solid var(--hairline)" }}>
                  <h4 style={{ fontFamily: "var(--f-display)", fontSize: 18, color: "var(--gold-1)", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>{t}</h4>
                  <p style={{ margin: "6px 0 0", fontSize: 14 }}>{d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="callout">
              <h4>If gaming has stopped being fun</h4>
              <p style={{ color: "var(--cream)" }}>
                Problem gambling is a treatable condition. Free, confidential help is available 24/7 anywhere in Illinois.
              </p>
              <div style={{
                marginTop: 24,
                padding: 20,
                background: "var(--ink)",
                border: "1px solid var(--red)",
                borderRadius: 8,
              }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--red)", textTransform: "uppercase" }}>Illinois Problem Gambling Helpline</div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 32, color: "var(--cream)", marginTop: 8 }}>1-800-GAMBLER</div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--muted)", marginTop: 4, letterSpacing: "0.1em" }}>or text ILGAMB to 53342</div>
              </div>
              <p style={{ marginTop: 20, fontSize: 14 }}>
                Self-exclusion programs, family resources, and licensed counselor referrals are available at no cost through the Illinois Council on Problem Gambling.
              </p>
              <button className="btn btn--ghost" style={{ marginTop: 12 }}>
                ICPG Resources <span className="arrow">→</span>
              </button>
            </div>

            <div style={{ marginTop: 32, padding: 28, background: "var(--panel)", border: "1px solid var(--hairline)", borderRadius: 12 }}>
              <h4 style={{ fontFamily: "var(--f-display)", fontSize: 22, color: "var(--cream)", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Set Your Limits</h4>
              <p style={{ marginTop: 10, fontSize: 14 }}>
                Decide on a session budget before you sit down. Treat that amount the same as the cost of any other entertainment — when it's gone, the session is over.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 10 }}>
                {[
                  "Only play with money set aside for entertainment",
                  "Take breaks — every cabinet has a pause feature",
                  "Don't chase losses or borrow to play",
                  "Don't drink to excess while playing",
                ].map(t => (
                  <li key={t} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--cream-dim)" }}>
                    <span style={{ color: "var(--gold-2)" }}>★</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   FAQ
   ========================================================= */
function FAQPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">FAQ</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "14ch" }}>
            Straight <span className="gold italic">answers.</span>
          </h1>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="eyebrow">For Establishments</div>
          <div className="mt-4">
            {[
              ["What does LS Gaming cost me up front?", "Nothing. We cover 100% of cabinets, installation, electrical, conduit, surveillance, signage, and ongoing service. Your only contribution is wall space and electricity."],
              ["How are revenue splits structured?", "Illinois law sets a fixed share between the licensed video gaming location and the terminal operator. We pay the statutory maximum to your establishment — no tier locks, no ramps, no creative accounting."],
              ["When do I get paid?", "ACH every Wednesday. Settlement reports show per-terminal, per-day net terminal income for the week prior. Historical reports are available on demand."],
              ["How long does install take?", "From signed contract: typically 28 days. We file your IGB paperwork, certify the cabinets, run conduit, and complete the install overnight so your venue never closes for it."],
              ["What if a machine breaks?", "Our statewide SLA is a two-hour parking-lot response. Most breakdowns are resolved on the spot. Cabinet swaps happen overnight."],
              ["Can I choose which games go on my floor?", "You can request. We recommend based on venue-type performance data — but it's your floor."],
              ["What happens at end of contract?", "Renew, walk, or move to another operator. If you leave, we remove cabinets at our cost. No restocking fees, no clawbacks."],
            ].map(([q, a]) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>

          <div className="eyebrow" style={{ marginTop: 64 }}>For Players</div>
          <div className="mt-4">
            {[
              ["What's the legal age to play?", "21 years old, with valid government-issued photo ID, in any licensed Illinois video gaming establishment."],
              ["What's the maximum bet?", "$4 per spin under Illinois Public Act 103-657 (effective July 2024)."],
              ["What's the maximum payout?", "$1,199 for a single play. Larger amounts require W-2G tax processing and are typically paid by check."],
              ["Are the games fair?", "Every cabinet is certified by the Illinois Gaming Board, with payout firmware audited in person at a minimum yearly cadence and tested remotely 24/7."],
              ["Can I exclude myself from play?", "Yes. The Illinois Gaming Board operates a free, statewide self-exclusion program. Contact 1-800-GAMBLER or your nearest IGB office."],
              ["Where can I see my play history?", "Each terminal prints a transaction receipt at session end. For longer-term history, ask the venue manager to pull session reports through the IGB SLEC system."],
            ].map(([q, a]) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { LocationsPage, PartnersPage, PlayerPage, FAQPage });
