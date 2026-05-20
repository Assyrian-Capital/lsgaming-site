/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* =========================================================
   SlotReel — spinning reel for hero
   ========================================================= */
const SYMBOLS = ["7", "♣", "♦", "★", "BAR", "♥", "$"];

function SlotReel({ delay = 0, finalSymbol = "7", spinning, color = "gold" }) {
  const stripRef = useRef(null);
  const [strip, setStrip] = useState(() => {
    const list = [];
    for (let i = 0; i < 30; i++) list.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    list.push(finalSymbol);
    return list;
  });

  useEffect(() => {
    if (!spinning) return;
    const el = stripRef.current;
    if (!el) return;
    // regenerate strip with new random middle but enforced final
    const list = [];
    for (let i = 0; i < 30; i++) list.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    list.push(finalSymbol);
    setStrip(list);

    // reset and animate
    el.style.transition = "none";
    el.style.transform = "translateY(0)";
    // force reflow
    void el.offsetHeight;
    const cellH = 140;
    const total = list.length * cellH;
    // settle so final symbol lands centered
    const target = -(total - cellH * 3); // show last 3
    setTimeout(() => {
      el.style.transition = `transform ${2.4 + delay}s cubic-bezier(.13,.7,.18,1)`;
      el.style.transform = `translateY(${target}px)`;
    }, delay * 1000);
  }, [spinning, finalSymbol, delay]);

  const colorClass = color === "red" ? "reel__symbol--red" : color === "gold" ? "reel__symbol--gold" : "";

  return (
    <div className="reel">
      <div className="reel__strip" ref={stripRef}>
        {strip.map((s, i) => (
          <div key={i} className={`reel__symbol ${colorClass}`}>{s}</div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SlotMachine — hero element
   ========================================================= */
function SlotMachine() {
  const [spinning, setSpinning] = useState(0);
  const [credits, setCredits] = useState(2450);
  const COMBOS = [
    ["7", "7", "7"],
    ["★", "★", "★"],
    ["$", "$", "$"],
    ["♦", "♦", "♦"],
    ["BAR", "BAR", "BAR"],
  ];
  const [combo, setCombo] = useState(COMBOS[0]);

  // Auto-spin on mount, then every ~7s
  useEffect(() => {
    const startTimer = setTimeout(() => spin(), 400);
    const loop = setInterval(() => {
      spin();
    }, 8500);
    return () => { clearTimeout(startTimer); clearInterval(loop); };
    // eslint-disable-next-line
  }, []);

  const spin = useCallback(() => {
    const next = COMBOS[Math.floor(Math.random() * COMBOS.length)];
    setCombo(next);
    setSpinning(s => s + 1);
    setCredits(c => c + Math.floor(Math.random() * 400) + 50);
  }, []);

  return (
    <div className="slot-machine">
      <div className="slot-machine__lights">
        <span /><span /><span /><span /><span />
      </div>
      <div className="slot-machine__marquee">LS GAMING</div>
      <div className="slot-machine__reels">
        <SlotReel key={`r1-${spinning}`} spinning={spinning} delay={0} finalSymbol={combo[0]} color="gold" />
        <SlotReel key={`r2-${spinning}`} spinning={spinning} delay={0.35} finalSymbol={combo[1]} color={combo[1] === "$" || combo[1] === "BAR" ? "red" : "gold"} />
        <SlotReel key={`r3-${spinning}`} spinning={spinning} delay={0.7} finalSymbol={combo[2]} color="gold" />
        <div className="slot-machine__paybar" />
      </div>
      <div className="slot-machine__base">
        <div className="slot-machine__credits">
          CREDITS <b>{credits.toLocaleString()}</b>
        </div>
        <button className="slot-machine__spin" onClick={spin}>SPIN</button>
      </div>
    </div>
  );
}

/* =========================================================
   Counter — animated number that runs when in view
   ========================================================= */
function Counter({ to, prefix = "", suffix = "", duration = 2000, decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  const formatted = decimals > 0
    ? val.toFixed(decimals)
    : Math.floor(val).toLocaleString();

  return (
    <span ref={ref}>{prefix}{formatted}{suffix}</span>
  );
}

/* =========================================================
   StatBlock
   ========================================================= */
function StatBlock({ to, prefix, suffix, label, decimals }) {
  return (
    <div className="stat-block">
      <span className="stat-block__num">
        <Counter to={to} prefix={prefix} suffix="" decimals={decimals} />
      </span>
      {suffix && <span className="stat-block__suffix">{suffix}</span>}
      <div className="stat-block__label">{label}</div>
    </div>
  );
}

/* =========================================================
   Carousel
   ========================================================= */
function Carousel({ slides }) {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx(i => (i + 1) % slides.length);
  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, [slides.length]);

  return (
    <div className="carousel">
      <div className="carousel__viewport">
        <div className="carousel__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {slides.map((s, i) => (
            <div className="carousel__slide" key={i}>
              <div className="game-art">
                <div className="game-art__screen">
                  <div className="game-art__title">{s.name}</div>
                  <div className="game-art__grid">
                    {s.symbols.map((sym, j) => (
                      <div key={j} className={`game-art__cell ${j % 4 === 0 ? "game-art__cell--red" : ""}`}>
                        {sym}
                      </div>
                    ))}
                  </div>
                  <div className="game-art__base">RTP {s.rtp} • {s.lines} LINES</div>
                </div>
              </div>
              <div>
                <div className="chip">{s.tag}</div>
                <h3 className="display h3" style={{ marginTop: 18 }}>
                  <span className="gold">{s.name}</span>
                </h3>
                <p className="lead" style={{ marginTop: 16 }}>{s.desc}</p>
                <div style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>Top Award</div>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 28, color: "var(--gold-1)", marginTop: 4 }}>{s.topAward}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>Volatility</div>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 28, color: "var(--gold-1)", marginTop: 4 }}>{s.vol}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>Denoms</div>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 28, color: "var(--gold-1)", marginTop: 4 }}>{s.denoms}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel__nav">
        <div className="carousel__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot ${i === idx ? "carousel__dot--active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="carousel__arrows">
          <button className="carousel__arrow" onClick={prev} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="carousel__arrow" onClick={next} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FAQ accordion
   ========================================================= */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button className="faq-item__q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className="faq-item__plus" />
      </button>
      <div className="faq-item__a">{a}</div>
    </div>
  );
}

/* =========================================================
   Reveal — wraps children, fades in when in view
   ========================================================= */
function Reveal({ children, delay = 0, as = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${delay ? `reveal-d${delay}` : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* =========================================================
   Illinois map with venue pins
   ========================================================= */
/*
  Illinois map — detailed outline built from real lat/lon vertices
  along the actual state boundary (Census TIGER simplified, public domain).
  Projection: x = (lon + 91.5) * 50,  y = (42.5 - lat) * 69
  Western border = Mississippi River (wavy: Alton, Quincy, Quad Cities bends).
  Southern border = Ohio River to Cairo. Eastern = Lake Michigan + Wabash.
*/
const VENUES = [
  // x, y are projected SVG coordinates
  { id: 1,  name: "Briar Patch Tavern",      city: "Chicago",     x: 193, y:  43 },
  { id: 2,  name: "Lincoln Park Pub",        city: "Chicago",     x: 194, y:  40 },
  { id: 3,  name: "Riverside Grill",         city: "Aurora",      x: 159, y:  51 },
  { id: 4,  name: "Iron Horse Saloon",       city: "Joliet",      x: 171, y:  68 },
  { id: 5,  name: "Stockyard Bar",           city: "Rockford",    x: 121, y:  18 },
  { id: 6,  name: "Prairie Stop",            city: "Peoria",      x:  96, y: 125 },
  { id: 7,  name: "Capitol Tap",             city: "Springfield", x:  93, y: 188 },
  { id: 8,  name: "Quad Cities Club",        city: "Moline",      x:  56, y:  70 },
  { id: 9,  name: "Levee Lounge",            city: "Alton",       x:  78, y: 251 },
  { id: 10, name: "Mound City Saloon",       city: "Cairo",       x: 118, y: 374 },
  { id: 11, name: "Cornbelt Bar",            city: "Bloomington", x: 126, y: 139 },
  { id: 12, name: "Champaign Social",        city: "Champaign",   x: 163, y: 164 },
  { id: 13, name: "Decatur Den",             city: "Decatur",     x: 128, y: 183 },
  { id: 14, name: "Carbondale Tap",          city: "Carbondale",  x: 114, y: 326 },
  { id: 15, name: "Galena Gold Co.",         city: "Galena",      x:  55, y:  10 },
];

/* Illinois outline. Clockwise from NW corner (Galena, 42.50N -90.64W).
   N border (WI): flat. E border: Lake Michigan -> straight south down IN -> Wabash curve.
   S border: Ohio River, wavy SW to Cairo tip. W border: Mississippi River,
   smooth gently-wavy near-vertical line back up to NW (no notches). */
const IL_PATH = `
  M 43 0
  L 185 0
  L 185 30
  L 194 43
  L 199 55
  L 199 100
  L 199 160
  L 199 220
  L 198 234
  L 193 258
  L 184 280
  L 180 296
  L 178 312
  L 174 318
  L 162 332
  L 150 348
  L 138 360
  L 129 366
  L 122 372
  L 118 376
  L 116 380
  L 108 360
  L 100 338
  L 92 316
  L 85 294
  L 78 272
  L 72 250
  L 66 226
  L 60 202
  L 54 178
  L 50 154
  L 48 130
  L 46 106
  L 44 82
  L 44 58
  L 43 34
  Z
`.replace(/\s+/g, " ").trim();

function IllinoisMap() {
  const [active, setActive] = useState(null);

  return (
    <div className="map-wrap">
      <div className="map">
        <svg viewBox="-16 -16 252 408" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="ilFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1f1a13" />
              <stop offset="1" stopColor="#0a0806" />
            </linearGradient>
            <linearGradient id="ilStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f4d77a" stopOpacity="0.9" />
              <stop offset="1" stopColor="#8a6a18" stopOpacity="0.5" />
            </linearGradient>
            <pattern id="ilDots" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="rgba(212, 175, 55, 0.22)" />
            </pattern>
            <filter id="ilGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <radialGradient id="pinGold" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#f7e399" />
              <stop offset="0.6" stopColor="#d4af37" />
              <stop offset="1" stopColor="#8a6a18" />
            </radialGradient>
            <radialGradient id="pinRed" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#e63950" />
              <stop offset="0.6" stopColor="#c8102e" />
              <stop offset="1" stopColor="#7a0a1f" />
            </radialGradient>
          </defs>

          {/* soft glow behind the state */}
          <path d={IL_PATH} fill="rgba(212, 175, 55, 0.08)" filter="url(#ilGlow)" />

          {/* state fill */}
          <path d={IL_PATH} fill="url(#ilFill)" stroke="url(#ilStroke)" strokeWidth="1" strokeLinejoin="round" />
          {/* dot texture clipped to state */}
          <path d={IL_PATH} fill="url(#ilDots)" />

          {/* Lake Michigan (east of state, NE) */}
          <path
            d="M 185 -16 L 236 -16 L 236 120 L 210 100 Q 200 75 199 55 L 194 43 L 185 30 Z"
            fill="rgba(70, 100, 140, 0.25)"
            stroke="rgba(120, 160, 200, 0.32)"
            strokeWidth="0.6"
          />
          <text x="216" y="50" fill="rgba(160, 195, 230, 0.6)" fontSize="3.6" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6" textAnchor="middle">LAKE</text>
          <text x="216" y="58" fill="rgba(160, 195, 230, 0.6)" fontSize="3.6" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6" textAnchor="middle">MICHIGAN</text>

          {/* Neighbor labels (offset OUTSIDE the state shape) */}
          <text x="115" y="-8" fill="rgba(140, 132, 120, 0.5)" fontSize="3.6" fontFamily="JetBrains Mono, monospace" letterSpacing="0.7" textAnchor="middle">WISCONSIN</text>
          <text x="-10" y="100" fill="rgba(140, 132, 120, 0.45)" fontSize="3.4" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6" textAnchor="middle" transform="rotate(-90, -10, 100)">IOWA</text>
          <text x="-10" y="240" fill="rgba(140, 132, 120, 0.45)" fontSize="3.4" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6" textAnchor="middle" transform="rotate(-90, -10, 240)">MISSOURI</text>
          <text x="230" y="220" fill="rgba(140, 132, 120, 0.45)" fontSize="3.4" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6" textAnchor="middle" transform="rotate(90, 230, 220)">INDIANA</text>
          <text x="150" y="396" fill="rgba(140, 132, 120, 0.45)" fontSize="3.4" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6" textAnchor="middle">KENTUCKY</text>

          {/* HQ marker — Joliet */}
          <g transform="translate(171, 68)">
            <circle r="6" fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="0.4">
              <animate attributeName="r" from="3" to="10" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Pins */}
          {VENUES.map(v => {
            const isActive = active === v.id;
            return (
              <g
                key={v.id}
                transform={`translate(${v.x}, ${v.y})`}
                style={{ cursor: "pointer" }}
                onClick={() => setActive(isActive ? null : v.id)}
              >
                {isActive && (
                  <>
                    <circle r="1.5" fill="rgba(200,16,46,0.6)">
                      <animate attributeName="r" from="1.5" to="8" dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.7" to="0" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
                <circle r={isActive ? 3.6 : 2.4} fill={isActive ? "url(#pinGold)" : "url(#pinRed)"} stroke="#0a0806" strokeWidth="0.5" />
                <circle r={isActive ? 3.6 : 2.4} fill="none" stroke={isActive ? "#f7e399" : "rgba(244,215,122,0.55)"} strokeWidth="0.35" />
                {/* invisible hit target */}
                <circle r="8" fill="transparent" />
              </g>
            );
          })}

          {/* Tooltip — drawn as SVG so it always aligns */}
          {active != null && (() => {
            const v = VENUES.find(x => x.id === active);
            if (!v) return null;
            const above = v.y > 60;
            const ox = Math.max(40, Math.min(160, v.x));
            const oy = above ? v.y - 14 : v.y + 14;
            const text1 = v.name.toUpperCase();
            const text2 = `${v.city.toUpperCase()}, IL`;
            const w = Math.max(text1.length, text2.length) * 1.8 + 14;
            return (
              <g style={{ pointerEvents: "none" }}>
                <rect
                  x={ox - w / 2}
                  y={oy - (above ? 12 : 0)}
                  width={w}
                  height="12"
                  rx="1.5"
                  fill="#0a0806"
                  stroke="#d4af37"
                  strokeWidth="0.4"
                />
                <text x={ox} y={oy - (above ? 6 : -6)} textAnchor="middle" fill="#f4d77a" fontSize="3.2" fontFamily="Antonio, sans-serif" letterSpacing="0.5">{text1}</text>
                <text x={ox} y={oy - (above ? 2 : -10)} textAnchor="middle" fill="#8b8478" fontSize="2.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">{text2}</text>
              </g>
            );
          })()}
        </svg>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>Active Locations</div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 32, color: "var(--gold-1)", marginTop: 4 }}>
            <Counter to={648} />
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>Counties Served</div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 32, color: "var(--gold-1)", marginTop: 4 }}>
            <Counter to={87} />
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>Machines Deployed</div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 32, color: "var(--gold-1)", marginTop: 4 }}>
            <Counter to={3920} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Partner inquiry form
   ========================================================= */
function PartnerForm() {
  const [data, setData] = useState({
    business: "",
    contact: "",
    email: "",
    phone: "",
    city: "",
    type: "Bar / Tavern",
    license: "Yes",
    notes: "",
  });
  const [errs, setErrs] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setData(d => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.business.trim()) e.business = "Required";
    if (!data.contact.trim()) e.contact = "Required";
    if (!data.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Invalid email";
    if (!data.phone.trim()) e.phone = "Required";
    else if (!/^[\d\s\-\(\)\+]{10,}$/.test(data.phone)) e.phone = "Invalid phone";
    if (!data.city.trim()) e.city = "Required";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="success-banner">
        <h3>★ Thank You ★</h3>
        <p style={{ margin: 0, color: "var(--cream)" }}>
          Your inquiry has been received. A revenue consultant will contact <b>{data.business}</b> within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className={`field ${errs.business ? "field--err" : ""}`}>
          <label className="field__label">Business Name *</label>
          <input className="field__input" value={data.business} onChange={set("business")} />
          {errs.business && <div className="field__err">{errs.business}</div>}
        </div>
        <div className={`field ${errs.contact ? "field--err" : ""}`}>
          <label className="field__label">Contact Person *</label>
          <input className="field__input" value={data.contact} onChange={set("contact")} />
          {errs.contact && <div className="field__err">{errs.contact}</div>}
        </div>
        <div className={`field ${errs.email ? "field--err" : ""}`}>
          <label className="field__label">Email *</label>
          <input className="field__input" type="email" value={data.email} onChange={set("email")} />
          {errs.email && <div className="field__err">{errs.email}</div>}
        </div>
        <div className={`field ${errs.phone ? "field--err" : ""}`}>
          <label className="field__label">Phone *</label>
          <input className="field__input" value={data.phone} onChange={set("phone")} placeholder="(312) 555-0100" />
          {errs.phone && <div className="field__err">{errs.phone}</div>}
        </div>
        <div className={`field ${errs.city ? "field--err" : ""}`}>
          <label className="field__label">City *</label>
          <input className="field__input" value={data.city} onChange={set("city")} />
          {errs.city && <div className="field__err">{errs.city}</div>}
        </div>
        <div className="field">
          <label className="field__label">Establishment Type</label>
          <select className="field__select" value={data.type} onChange={set("type")}>
            <option>Bar / Tavern</option>
            <option>Restaurant</option>
            <option>Fraternal Organization</option>
            <option>Truck Stop</option>
            <option>Veterans Org.</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field field--full">
          <label className="field__label">Do you hold an Illinois liquor license?</label>
          <select className="field__select" value={data.license} onChange={set("license")}>
            <option>Yes</option>
            <option>No — applied</option>
            <option>No — planning to apply</option>
          </select>
        </div>
        <div className="field field--full">
          <label className="field__label">Tell us about your venue</label>
          <textarea className="field__textarea" value={data.notes} onChange={set("notes")} placeholder="Hours, foot traffic, current setup, square footage available for a gaming room..." />
        </div>
      </div>
      <button type="submit" className="btn btn--gold" style={{ marginTop: 12 }}>
        Submit Inquiry <span className="arrow">→</span>
      </button>
    </form>
  );
}

/* Expose */
Object.assign(window, {
  SlotMachine, Counter, StatBlock, Carousel, FAQItem, Reveal, IllinoisMap, PartnerForm,
});
