/* global React, Reveal */
const { useState } = React;

/* =========================================================
   CAREERS
   ========================================================= */
function CareersPage() {
  const jobs = [
    ["Field Service Technician", "Joliet, Aurora, Naperville", "Full-time", "$58k–$72k + on-call"],
    ["Field Service Technician", "Rockford, Belvidere", "Full-time", "$58k–$72k + on-call"],
    ["Field Service Technician", "Bloomington, Champaign", "Full-time", "$58k–$72k + on-call"],
    ["Regional Account Manager", "Chicago South", "Full-time", "$78k base + commission"],
    ["Compliance Specialist", "Joliet HQ", "Full-time", "$64k–$78k"],
    ["Logistics Coordinator", "Joliet HQ", "Full-time", "$52k–$62k"],
    ["Cash Logistics Driver", "Statewide", "Full-time, Armed", "$68k + bonuses"],
    ["Software QA Engineer", "Joliet / Remote", "Full-time", "$92k–$118k"],
  ];

  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">Careers</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "14ch" }}>
            Work <span className="gold italic">the floor.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            68 employees, all W-2, all in Illinois. We promote from within, pay above-market, and cover full health, dental and vision starting day one.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <div className="grid-4">
            {[
              ["100%", "Health Coverage"],
              ["4%", "401(k) Match"],
              ["21", "PTO Days, Year One"],
              ["12", "Paid Holidays"],
            ].map(([n, l]) => (
              <Reveal key={l}>
                <div className="stat-block">
                  <div className="stat-block__num">{n}</div>
                  <div className="stat-block__label">{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">Open Positions</div>
            <h2 className="display h2 mt-3">Eight roles <span className="gold italic">open now.</span></h2>
          </Reveal>
          <div style={{ display: "grid", gap: 14, marginTop: 40 }}>
            {jobs.map(([t, loc, type, comp], i) => (
              <Reveal delay={(i % 3) + 1} key={`${t}-${loc}`}>
                <div className="job">
                  <div className="job__info">
                    <h4>{t}</h4>
                    <small>{loc}</small>
                  </div>
                  <div className="job__meta">
                    <span className="chip">{type}</span>
                    <span className="chip">{comp}</span>
                  </div>
                  <button className="btn btn--ghost" style={{ padding: "10px 18px", fontSize: 12 }}>
                    Apply <span className="arrow">→</span>
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap text-center">
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Don't see your role?</div>
            <h2 className="display h2 mt-3">Send a <span className="gold italic">cold pitch.</span></h2>
            <p className="lead mt-3" style={{ margin: "16px auto 0" }}>
              We grow into new counties every quarter. If you're field-tech sharp or operations sharp, send your résumé to <a style={{ color: "var(--gold-1)" }} href="mailto:careers@lsgaming.com">careers@lsgaming.com</a> — a hiring manager actually reads them.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   BLOG / NEWS
   ========================================================= */
function BlogPage() {
  const posts = [
    {
      date: "Apr 22, 2026",
      title: "LS Gaming surpasses 3,900 active terminals statewide",
      excerpt: "Quarterly milestone as we expand into Saline and Williamson counties — bringing total Illinois county coverage to 87.",
      glyph: "★",
      color: "gold",
    },
    {
      date: "Apr 08, 2026",
      title: "What the new $4 max-wager means for your earn",
      excerpt: "Public Act 103-657 raised the per-spin ceiling. Three months of data later: a 14% uplift in net terminal income.",
      glyph: "$",
      color: "gold",
    },
    {
      date: "Mar 24, 2026",
      title: "Red Hot Route 66 wins Illinois cabinet of the year",
      excerpt: "Our exclusive Illinois-themed title swept the IGOA awards. Behind the scenes of the year's most-played video game.",
      glyph: "♥",
      color: "red",
    },
    {
      date: "Mar 11, 2026",
      title: "Five things every Illinois tavern owner gets wrong about VGTs",
      excerpt: "After 14 years and 648 venues, the same misconceptions keep coming up. Quick myth-busting from our operations team.",
      glyph: "BAR",
      color: "gold",
    },
    {
      date: "Feb 19, 2026",
      title: "Inside our new Joliet operations center",
      excerpt: "22,000 sq ft. 14 service bays. A statewide control room. A walking tour of the new HQ that came online last month.",
      glyph: "♦",
      color: "gold",
    },
    {
      date: "Feb 02, 2026",
      title: "Responsible Operator: LS Gaming renews ICPG certification",
      excerpt: "Eleventh consecutive year as a certified Responsible Operator with the Illinois Council on Problem Gambling.",
      glyph: "♣",
      color: "gold",
    },
  ];

  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">Newsroom</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "14ch" }}>
            Word from <span className="gold italic">the floor.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            Operational updates, industry analysis, and Illinois Gaming Board news that matters to our partners.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}>
            {posts.map((p, i) => (
              <Reveal delay={(i % 3) + 1} key={p.title}>
                <article className="blog-card">
                  <div className="blog-card__cover">
                    <div className={`glyph ${p.color === "red" ? "glyph--red" : ""}`}>{p.glyph}</div>
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__date">{p.date}</div>
                    <h3 className="blog-card__title">{p.title}</h3>
                    <p className="blog-card__excerpt">{p.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   CONTACT
   ========================================================= */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    setErrs(e);
    if (Object.keys(e).length === 0) setDone(true);
  };

  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__inner">
          <div className="eyebrow">Contact</div>
          <h1 className="display h1 mt-3" style={{ maxWidth: "14ch" }}>
            Talk to a <span className="gold italic">human.</span>
          </h1>
          <p className="lead mt-3" style={{ maxWidth: "60ch" }}>
            One Joliet office. A real receptionist. No call tree. Pick a phone number or send a note below.
          </p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap grid-2">
          <Reveal>
            <div style={{ display: "grid", gap: 32 }}>
              {[
                ["Headquarters", "1844 Industrial Pkwy\nJoliet, IL 60435", null],
                ["General", "(815) 555-0142", "info@lsgaming.com"],
                ["Become a Partner", "(815) 555-0188", "partners@lsgaming.com"],
                ["Service Dispatch (24/7)", "(815) 555-0199", "dispatch@lsgaming.com"],
                ["Careers", "(815) 555-0123", "careers@lsgaming.com"],
                ["Media", "(815) 555-0155", "press@lsgaming.com"],
              ].map(([t, p, e]) => (
                <div key={t} style={{ paddingBottom: 24, borderBottom: "1px solid var(--hairline)" }}>
                  <div className="eyebrow" style={{ color: "var(--gold-2)" }}>{t}</div>
                  <div style={{ marginTop: 10 }}>
                    <div style={{
                      fontFamily: "var(--f-display)",
                      fontSize: 24,
                      letterSpacing: "0.02em",
                      color: "var(--cream)",
                      whiteSpace: "pre-line",
                    }}>{p}</div>
                    {e && (
                      <a href={`mailto:${e}`} style={{ color: "var(--gold-1)", fontFamily: "var(--f-mono)", fontSize: 13, letterSpacing: "0.08em" }}>{e}</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div style={{
              background: "var(--panel)",
              border: "1px solid var(--gold-3)",
              borderRadius: 16,
              padding: 36,
            }}>
              <div className="eyebrow">Send a Note</div>
              <h3 className="display h3 mt-3" style={{ marginBottom: 24 }}>
                Drop us a <span className="gold">line.</span>
              </h3>

              {done ? (
                <div className="success-banner">
                  <h3>★ Message Sent ★</h3>
                  <p style={{ margin: 0, color: "var(--cream)" }}>
                    Thanks, {form.name}. We'll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className={`field ${errs.name ? "field--err" : ""}`}>
                    <label className="field__label">Your Name</label>
                    <input className="field__input" value={form.name} onChange={set("name")} />
                    {errs.name && <div className="field__err">{errs.name}</div>}
                  </div>
                  <div className={`field ${errs.email ? "field--err" : ""}`}>
                    <label className="field__label">Email</label>
                    <input className="field__input" type="email" value={form.email} onChange={set("email")} />
                    {errs.email && <div className="field__err">{errs.email}</div>}
                  </div>
                  <div className={`field ${errs.message ? "field--err" : ""}`}>
                    <label className="field__label">Message</label>
                    <textarea className="field__textarea" value={form.message} onChange={set("message")} />
                    {errs.message && <div className="field__err">{errs.message}</div>}
                  </div>
                  <button type="submit" className="btn btn--gold">
                    Send Message <span className="arrow">→</span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div style={{
              background: "linear-gradient(135deg, #1a1612 0%, #0a0806 100%)",
              border: "1px solid var(--hairline)",
              borderRadius: 16,
              padding: 32,
              minHeight: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
                pointerEvents: "none",
              }} />
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{
                  width: 64, height: 64, margin: "0 auto 16px",
                  borderRadius: "50%",
                  background: "var(--red-grad)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 6px rgba(200,16,46,0.2), 0 0 30px rgba(200,16,46,0.4)",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 22s-8-7.5-8-13a8 8 0 0116 0c0 5.5-8 13-8 13z"/>
                    <circle cx="12" cy="9" r="3"/>
                  </svg>
                </div>
                <h3 className="display h3">LS Gaming HQ</h3>
                <p style={{ fontFamily: "var(--f-mono)", fontSize: 13, letterSpacing: "0.15em", color: "var(--cream-dim)", textTransform: "uppercase" }}>
                  1844 Industrial Pkwy · Joliet, IL 60435
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { CareersPage, BlogPage, ContactPage });
