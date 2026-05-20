/* global React, ReactDOM, HomePage, AboutPage, ServicesPage, GamesPage, LocationsPage, PartnersPage, PlayerPage, FAQPage, CareersPage, BlogPage, ContactPage, MarketingPage */
const { useState, useEffect } = React;

const ROUTES = {
  home: { label: "Home", Component: HomePage },
  about: { label: "About", Component: AboutPage },
  services: { label: "Services", Component: ServicesPage },
  marketing: { label: "Marketing", Component: MarketingPage },
  games: { label: "Games", Component: GamesPage },
  locations: { label: "Locations", Component: LocationsPage },
  partners: { label: "For Establishments", Component: PartnersPage },
  player: { label: "Player Info", Component: PlayerPage },
  faq: { label: "FAQ", Component: FAQPage },
  careers: { label: "Careers", Component: CareersPage },
  blog: { label: "News", Component: BlogPage },
  contact: { label: "Contact", Component: ContactPage },
};

const NAV_ORDER = ["home", "about", "services", "marketing", "games", "locations", "partners", "player", "faq", "careers", "blog", "contact"];

function getRouteFromHash() {
  const h = (window.location.hash || "").replace(/^#\/?/, "").trim();
  return h && ROUTES[h] ? h : "home";
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync route to URL hash
  useEffect(() => {
    const onHash = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (r) => {
    if (!ROUTES[r]) return;
    window.location.hash = `/${r}`;
    setRoute(r);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const { Component } = ROUTES[route];

  return (
    <div>
      {/* Nav */}
      <nav
        className={`nav ${scrolled || route !== "home" ? "nav--scrolled" : ""}`}
        data-screen-label={`Page · ${ROUTES[route].label}`}
      >
        <div className="nav__inner">
          <button className="nav__logo" onClick={() => go("home")} aria-label="LS Gaming home">
            <img src="assets/lsg-logo.webp" alt="LS Gaming" />
          </button>

          <div className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
            {NAV_ORDER.filter(r => r !== "home" && r !== "partners").map(r => (
              <button
                key={r}
                onClick={() => go(r)}
                className={`nav__link ${route === r ? "nav__link--active" : ""}`}
              >
                {ROUTES[r].label}
              </button>
            ))}
            <button
              onClick={() => go("partners")}
              className="btn btn--gold nav__cta"
            >
              Become a Partner
            </button>
          </div>

          <button
            className="nav__burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Page */}
      <main key={route}>
        <Component go={go} />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer__grid">
            <div className="footer__brand">
              <img src="assets/lsg-logo.webp" alt="LS Gaming" />
              <p style={{ fontSize: 14, color: "var(--cream-dim)", maxWidth: "36ch", marginTop: 4 }}>
                Illinois Gaming Board licensed terminal operator since 2012. Joliet, Illinois.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                {["IGB License #VGTO-1014", "ICPG Certified Operator", "BBB A+ Rated"].map(t => (
                  <span key={t} className="chip" style={{ fontSize: 9, letterSpacing: "0.15em" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="footer__col">
              <h5>Operations</h5>
              <ul>
                <li><button onClick={() => go("services")}>Services</button></li>
                <li><button onClick={() => go("games")}>Game Library</button></li>
                <li><button onClick={() => go("locations")}>Locations</button></li>
                <li><button onClick={() => go("partners")}>Become a Partner</button></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Company</h5>
              <ul>
                <li><button onClick={() => go("about")}>About</button></li>
                <li><button onClick={() => go("careers")}>Careers</button></li>
                <li><button onClick={() => go("blog")}>News</button></li>
                <li><button onClick={() => go("contact")}>Contact</button></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Players</h5>
              <ul>
                <li><button onClick={() => go("player")}>Responsible Gaming</button></li>
                <li><button onClick={() => go("faq")}>FAQ</button></li>
                <li><button>1-800-GAMBLER</button></li>
                <li><button>Self-Exclusion (ICPG)</button></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <div>© 2026 LS Gaming, LLC · All rights reserved</div>
            <div className="footer__legal">
              <button>Privacy</button>
              <button>Terms</button>
              <button>Accessibility</button>
              <button>IGB Disclosures</button>
            </div>
          </div>
          <div style={{
            marginTop: 32,
            padding: 18,
            background: "rgba(200, 16, 46, 0.06)",
            border: "1px solid rgba(200, 16, 46, 0.3)",
            borderRadius: 8,
            textAlign: "center",
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: "0.15em",
            color: "var(--cream-dim)",
            textTransform: "uppercase",
          }}>
            ★  Must be 21+ to play  ·  Gambling problem? Call 1-800-GAMBLER  ★
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
