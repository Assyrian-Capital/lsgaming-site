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
  Illinois map — real OpenStreetMap data via Leaflet (CartoDB Dark Matter).
  Open-source, free, no API key. Venues plotted at real lat/lon.
*/
const VENUES = [
  { id: 1,  name: "Briar Patch Tavern",      city: "Chicago",     lat: 41.8819, lng: -87.6420 },
  { id: 2,  name: "Lincoln Park Pub",        city: "Chicago",     lat: 41.9215, lng: -87.6534 },
  { id: 3,  name: "Riverside Grill",         city: "Aurora",      lat: 41.7606, lng: -88.3201 },
  { id: 4,  name: "Iron Horse Saloon",       city: "Joliet",      lat: 41.5250, lng: -88.0817 },
  { id: 5,  name: "Stockyard Bar",           city: "Rockford",    lat: 42.2711, lng: -89.0940 },
  { id: 6,  name: "Prairie Stop",            city: "Peoria",      lat: 40.6936, lng: -89.5890 },
  { id: 7,  name: "Capitol Tap",             city: "Springfield", lat: 39.7817, lng: -89.6501 },
  { id: 8,  name: "Quad Cities Club",        city: "Moline",      lat: 41.5067, lng: -90.5151 },
  { id: 9,  name: "Levee Lounge",            city: "Alton",       lat: 38.8906, lng: -90.1843 },
  { id: 10, name: "Mound City Saloon",       city: "Cairo",       lat: 37.0053, lng: -89.1764 },
  { id: 11, name: "Cornbelt Bar",            city: "Bloomington", lat: 40.4842, lng: -88.9937 },
  { id: 12, name: "Champaign Social",        city: "Champaign",   lat: 40.1164, lng: -88.2434 },
  { id: 13, name: "Decatur Den",             city: "Decatur",     lat: 39.8403, lng: -88.9548 },
  { id: 14, name: "Carbondale Tap",          city: "Carbondale",  lat: 37.7273, lng: -89.2168 },
  { id: 15, name: "Galena Gold Co.",         city: "Galena",      lat: 42.4167, lng: -90.4287 },
];

/* Load Leaflet from CDN once. Resolves when L is ready. */
let _leafletPromise = null;
function loadLeaflet() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.L) return Promise.resolve(window.L);
  if (_leafletPromise) return _leafletPromise;

  _leafletPromise = new Promise((resolve, reject) => {
    // CSS
    if (!document.querySelector('link[data-leaflet="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      link.setAttribute("data-leaflet", "1");
      document.head.appendChild(link);
    }
    // JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.body.appendChild(script);
  });
  return _leafletPromise;
}

function IllinoisMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [40.0, -89.2],
        zoom: 6,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: false,
      });
      mapRef.current = map;

      L.control.attribution({ prefix: false }).addTo(map);

      // CartoDB Dark Matter — free, no key, OSM data, dark theme
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19,
          attribution:
            '\u00a9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors \u00a9 <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(map);

      // Fit to Illinois bounds (rough)
      map.fitBounds([
        [36.97, -91.6],
        [42.51, -87.4],
      ], { padding: [10, 10] });

      // Custom gold pin icon (SVG)
      const makePinIcon = (highlight) => L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:18px;height:18px;">
            ${highlight ? `<div style="position:absolute;inset:-10px;border-radius:50%;background:radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%);animation:lsMapPulse 1.6s infinite;"></div>` : ""}
            <div style="
              position:absolute;inset:0;border-radius:50%;
              background: radial-gradient(circle at 35% 30%, #f7e399 0%, #d4af37 55%, #8a6a18 100%);
              border: 2px solid ${highlight ? "#f7e399" : "#0a0806"};
              box-shadow: 0 0 0 2px rgba(0,0,0,0.6), 0 2px 8px rgba(212,175,55,0.6);
            "></div>
            <div style="
              position:absolute;top:5px;left:5px;width:8px;height:8px;border-radius:50%;
              background: ${highlight ? "#c8102e" : "transparent"};
            "></div>
          </div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      VENUES.forEach((v) => {
        const marker = L.marker([v.lat, v.lng], {
          icon: makePinIcon(false),
          riseOnHover: true,
        }).addTo(map);

        marker.bindPopup(
          `<div style="font-family: Antonio, sans-serif; padding: 4px 2px;">
            <div style="font-size:14px; letter-spacing:0.08em; text-transform:uppercase; color:#f7e399; font-weight:700;">${v.name}</div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size:10px; letter-spacing:0.15em; color:#8b8478; text-transform:uppercase; margin-top:2px;">${v.city}, IL</div>
          </div>`,
          { className: "ls-popup", closeButton: false, offset: [0, -6] }
        );

        marker.on("click", () => {
          setActive(v.id);
          // refresh icon
          VENUES.forEach((vv, i) => {});
        });
        marker.on("mouseover", () => marker.openPopup());
        marker.on("mouseout", () => marker.closePopup());
      });

      // Add pulse keyframes once
      if (!document.getElementById("ls-map-anim")) {
        const style = document.createElement("style");
        style.id = "ls-map-anim";
        style.textContent = `
          @keyframes lsMapPulse {
            0% { transform: scale(0.6); opacity: 1; }
            100% { transform: scale(2.4); opacity: 0; }
          }
          .leaflet-popup-content-wrapper {
            background: #0a0806 !important;
            color: #f4eee0 !important;
            border: 1px solid #d4af37;
            border-radius: 4px !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.8) !important;
          }
          .leaflet-popup-tip {
            background: #0a0806 !important;
            border: 1px solid #d4af37;
          }
          .leaflet-popup-content {
            margin: 10px 14px !important;
          }
          .leaflet-control-attribution {
            background: rgba(10,8,6,0.85) !important;
            color: #5a554d !important;
            font-family: 'JetBrains Mono', monospace !important;
            font-size: 9px !important;
          }
          .leaflet-control-attribution a {
            color: #8b8478 !important;
          }
          .leaflet-control-zoom a {
            background: #1a1612 !important;
            color: #d4af37 !important;
            border: 1px solid #2a2a2a !important;
          }
          .leaflet-control-zoom a:hover {
            background: #2a1f0e !important;
            color: #f7e399 !important;
          }
          .leaflet-container {
            background: #0a0806 !important;
            border-radius: 8px;
          }
        `;
        document.head.appendChild(style);
      }
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="map-wrap">
      <div className="map" ref={containerRef} />

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
