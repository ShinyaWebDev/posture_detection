import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { styles } from "../utils/styles";

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Check if mobile on window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navLinksStyle = {
    ...styles.navLinks,
    ...(isMobile && isMenuOpen
      ? {
          position: "absolute" as const,
          top: "100%",
          left: 0,
          right: 0,
          background: "#101827",
          flexDirection: "column" as const,
          padding: "8px",
          borderTop: "1px solid #1f2a44",
          zIndex: 1000,
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        }
      : {}),
    ...(isMobile && !isMenuOpen
      ? {
          display: "none",
        }
      : {}),
  };

  const mobileNavStyle = {
    position: "relative" as const,
  };

  return (
    <nav style={{ ...styles.nav, ...(isMobile ? mobileNavStyle : {}) }}>
      <div style={styles.navInner}>
        <Link to="/" style={styles.navBrand}>
          Posture Coach
        </Link>

        {/* Mobile menu button */}
        {isMobile && (
          <button
            style={{
              background: "transparent",
              border: "1px solid #2b3b63",
              color: "#c7d2fe",
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 18,
              minHeight: 44,
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        )}

        <ul style={navLinksStyle}>
          <li>
            <Link
              to="/"
              style={{
                ...styles.navLink,
                ...(isActive("/") ? styles.navLinkActive : {}),
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/desk"
              style={{
                ...styles.navLink,
                ...(isActive("/desk") ? styles.navLinkActive : {}),
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Desk Posture
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              style={{
                ...styles.navLink,
                ...(isActive("/settings") ? styles.navLinkActive : {}),
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{
                ...styles.navLink,
                ...(isActive("/about") ? styles.navLinkActive : {}),
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
