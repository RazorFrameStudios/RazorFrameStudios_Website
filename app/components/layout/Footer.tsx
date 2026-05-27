"use client"
import Link from "next/link";

const GLOW_GREEN = "0 0 20px rgba(3,192,74,0.7), 0 0 60px rgba(3,192,74,0.3)";
const GLOW_WHITE = "0 0 30px rgba(3,192,74,0.15)";

export default function Footer() {
  return (
    <footer style={{
      background: "#000000",
      color: "white",
      padding: "4rem 1.5rem 2rem",
      borderTop: "0.5px solid rgba(3,192,74,0.15)",
      boxShadow: "0 -1px 40px rgba(3,192,74,0.06)",
    }}>
      <div style={{ maxWidth: "min(90rem, 92vw)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem" }}>
        {/* Brand — Coolvetica */}
        <div>
          <h3 style={{
            fontSize: "1.35rem",
            fontWeight: 600,
            fontFamily: "'Coolvetica', sans-serif",
            marginBottom: "0.75rem",
            color: "white",
            textShadow: GLOW_WHITE,
            letterSpacing: "-0.02em"
          }}>
            RazorFrame Studios
          </h3>
          {/* Tagline — Arial */}
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.6, fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 400 }}>
            Creating high-performing content for creators and brands.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{
            fontSize: "0.8rem",
            fontWeight: 700,
            fontFamily: "Arial, Helvetica, sans-serif",
            marginBottom: "1.25rem",
            color: "#03C04A",
            textShadow: GLOW_GREEN,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Navigation
          </h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Work", href: "/work" },
              { label: "Contact", href: "/booking" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontWeight: 400,
                    transition: "color 0.2s, text-shadow 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#03C04A";
                    e.currentTarget.style.textShadow = GLOW_GREEN;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{
            fontSize: "0.8rem",
            fontWeight: 700,
            fontFamily: "Arial, Helvetica, sans-serif",
            marginBottom: "1.25rem",
            color: "#03C04A",
            textShadow: GLOW_GREEN,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Contact
          </h4>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontFamily: "Arial, Helvetica, sans-serif", marginBottom: "0.5rem" }}>
            <a
              onClick={() => {
                window.open("https://mail.google.com/mail/?view=cm&to=razorframestudios@gmail.com", "_blank");
              }}
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", transition: "color 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#03C04A"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              razorframestudios@gmail.com
            </a>
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontFamily: "Arial, Helvetica, sans-serif" }}>Based in India</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: "min(90rem, 92vw)",
        margin: "3rem auto 0",
        paddingTop: "1.5rem",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        textAlign: "center",
        color: "rgba(255,255,255,0.2)",
        fontSize: "0.82rem",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}>
        © {new Date().getFullYear()} RazorFrame Studios. All rights reserved.
      </div>
    </footer>
  );
}