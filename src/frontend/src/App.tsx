import {
  Banknote,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileText,
  Lock,
  MapPin,
  Menu,
  Minus,
  Monitor,
  Plus,
  QrCode,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Star,
  Trash2,
  User,
  X,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCamera } from "./camera/useCamera";

// ===== TYPES =====
interface Product {
  id: number;
  name: string;
  barcode: string;
  price: number;
  icon: string;
  category: string;
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

type CartState = Record<number, CartItem>;

// ===== DATA =====
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Atta 5kg",
    barcode: "8901030814052",
    price: 249,
    icon: "🌾",
    category: "Staples",
    stock: 45,
  },
  {
    id: 2,
    name: "Toor Dal 1kg",
    barcode: "8906063010012",
    price: 159,
    icon: "🫘",
    category: "Pulses",
    stock: 32,
  },
  {
    id: 3,
    name: "Rice 5kg",
    barcode: "8902102300016",
    price: 299,
    icon: "🍚",
    category: "Staples",
    stock: 28,
  },
  {
    id: 4,
    name: "Sunflower Oil 1L",
    barcode: "8901725124038",
    price: 189,
    icon: "🌻",
    category: "Oils & Fats",
    stock: 60,
  },
  {
    id: 5,
    name: "Biscuits Pack",
    barcode: "8901719112027",
    price: 35,
    icon: "🍪",
    category: "Snacks",
    stock: 120,
  },
  {
    id: 6,
    name: "Milk 1L",
    barcode: "8902884000012",
    price: 68,
    icon: "🥛",
    category: "Dairy",
    stock: 80,
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Barcode Scanner", href: "#barcode-scanner" },
  { label: "Demo", href: "#demo" },
  { label: "Checkout", href: "#checkout" },
  { label: "Benefits", href: "#benefits" },
];

const FEATURES = [
  {
    icon: QrCode,
    title: "Barcode Scanner Integration",
    desc: "Precision scanning module reads all standard barcodes instantly. No manual entry required.",
  },
  {
    icon: Monitor,
    title: "Real-Time Cart Display",
    desc: "Live digital display on the cart shows your running total with every scanned item.",
  },
  {
    icon: FileText,
    title: "Auto Billing System",
    desc: "Smart algorithm generates accurate bills with GST breakdown in milliseconds.",
  },
  {
    icon: Zap,
    title: "Queue-Free Checkout",
    desc: "Skip the cashier line entirely. Pay directly at the cart and walk out.",
  },
  {
    icon: Smartphone,
    title: "Mobile Compatible",
    desc: "Sync your cart with your phone. Track, manage, and pay from your device.",
  },
  {
    icon: Receipt,
    title: "Digital Receipt",
    desc: "Eco-friendly digital receipts delivered instantly. No paper waste.",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    emoji: "🛒",
    title: "Grab a Smart Cart",
    desc: "Pick up a DMart Smart Cart at the entrance. It comes pre-equipped with a barcode scanner and digital display.",
  },
  {
    emoji: "📷",
    title: "Scan Products",
    desc: "Simply scan each product's barcode as you place it in the cart. Instant recognition every time.",
  },
  {
    emoji: "🧾",
    title: "Review Digital Bill",
    desc: "See your running total in real-time on the cart's screen. Track every item as you shop.",
  },
  {
    emoji: "✅",
    title: "Pay & Go",
    desc: "Tap to pay directly on the cart. Walk out — no cashier queue needed!",
  },
];

const CUSTOMER_BENEFITS = [
  {
    title: "Save Time",
    desc: "Skip long checkout queues and complete your shopping faster.",
  },
  {
    title: "No Queues",
    desc: "Pay directly at the cart without waiting at the billing counter.",
  },
  {
    title: "Real-Time Bill Tracking",
    desc: "Monitor your spending live as you shop with no surprises.",
  },
  {
    title: "Easy Returns",
    desc: "Remove items from your digital cart instantly at any point.",
  },
];

// ===== UTILITY =====
function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}

function generateReceiptNo(): string {
  return `DMT-${Date.now().toString().slice(-8)}-${Math.floor(
    Math.random() * 1000,
  )
    .toString()
    .padStart(3, "0")}`;
}

// ===== COMPONENTS =====

// Navbar
function Navbar({
  scrolled,
  mobileOpen,
  setMobileOpen,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        style={{ padding: "0 1.5rem" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            data-ocid="nav.primary_button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src="/assets/uploads/image-1.png"
              alt="DMart"
              style={{ height: "40px", objectFit: "contain" }}
            />
          </button>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                data-ocid="nav.link"
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "4px 0",
                  transition: "color 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.color =
                    "oklch(0.82 0.18 86)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.color =
                    "rgba(255,255,255,0.85)";
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("#demo")}
              data-ocid="nav.primary_button"
              style={{
                background: "oklch(0.82 0.18 86)",
                color: "oklch(0.16 0.07 152)",
                border: "none",
                borderRadius: "8px",
                padding: "8px 20px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.transform =
                  "translateY(-2px)";
                (e.target as HTMLButtonElement).style.boxShadow =
                  "0 8px 20px oklch(0.82 0.18 86 / 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform =
                  "translateY(0)";
                (e.target as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Try Demo
            </button>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu md:hidden">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1rem",
            }}
          >
            <img
              src="/assets/uploads/image-1.png"
              alt="DMart"
              style={{ height: "36px", objectFit: "contain" }}
            />
          </div>
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "background 0.2s",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNavClick("#demo")}
            style={{
              background: "oklch(0.82 0.18 86)",
              color: "oklch(0.16 0.07 152)",
              border: "none",
              borderRadius: "10px",
              padding: "14px 40px",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              marginTop: "0.5rem",
            }}
          >
            Try Demo
          </button>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="bg-hero-gradient"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "72px",
      }}
    >
      {/* Grid overlay */}
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0 }}
      />
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Floating orbs */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "oklch(0.42 0.13 152 / 0.25)",
          filter: "blur(80px)",
          top: "-100px",
          left: "-150px",
          animation: "orbFloat1 15s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "oklch(0.82 0.18 86 / 0.12)",
          filter: "blur(60px)",
          bottom: "50px",
          right: "10%",
          animation: "orbFloat2 18s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "oklch(0.55 0.15 152 / 0.2)",
          filter: "blur(50px)",
          top: "40%",
          left: "40%",
          animation: "orbFloat3 12s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 1.5rem",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1.5px solid oklch(0.82 0.18 86 / 0.7)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "1.5rem",
              color: "oklch(0.82 0.18 86)",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <Star size={12} fill="oklch(0.82 0.18 86)" />
            College Innovation Project
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily:
                "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            Shop Smart.
            <br />
            <span style={{ color: "oklch(0.82 0.18 86)" }}>
              Skip the Queue.
            </span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.72)",
              marginBottom: "2.5rem",
              maxWidth: "480px",
            }}
          >
            Introducing{" "}
            <strong style={{ color: "white", fontWeight: 700 }}>
              DMart Crystal Mall Smart Cart
            </strong>{" "}
            — a C2P (Concept to Practice) innovation that transforms how you
            shop. Scan, track, and pay, all from your cart.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            <button
              type="button"
              onClick={() => scrollToSection("#how-it-works")}
              data-ocid="hero.primary_button"
              style={{
                background: "oklch(0.82 0.18 86)",
                color: "oklch(0.16 0.07 152)",
                border: "none",
                borderRadius: "12px",
                padding: "14px 28px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-3px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 12px 30px oklch(0.82 0.18 86 / 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              See How It Works
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#demo")}
              data-ocid="hero.secondary_button"
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.4)",
                borderRadius: "12px",
                padding: "14px 28px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "border-color 0.25s, background 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.8)";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.4)";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }}
            >
              View Demo
              <Zap size={18} />
            </button>
          </div>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { value: "80%", label: "Less Wait Time" },
              { value: "6+", label: "Smart Features" },
              { value: "C2P", label: "System Model" },
            ].map((stat) => (
              <div key={stat.value}>
                <div
                  style={{
                    fontFamily: "'Mona Sans', system-ui, sans-serif",
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    color: "oklch(0.82 0.18 86)",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.55)",
                    fontWeight: 500,
                    marginTop: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Floating Cart */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          className="hero-right"
        >
          {/* Outer glow ring */}
          <div
            className="pulse-glow"
            style={{
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "oklch(0.42 0.13 152 / 0.25)",
              border: "2px solid oklch(0.42 0.13 152 / 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "oklch(0.42 0.13 152 / 0.3)",
                border: "2px solid oklch(0.42 0.13 152 / 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="cart-float"
                style={{ fontSize: "6rem", lineHeight: 1, display: "block" }}
                role="img"
                aria-label="Shopping Cart"
              >
                🛒
              </span>
            </div>

            {/* Floating tags */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                right: "-30px",
                background: "white",
                borderRadius: "10px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                animation: "floatTag 3s ease-in-out infinite",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>✅</span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "oklch(0.22 0.09 152)",
                }}
              >
                Item Scanned!
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                left: "-40px",
                background: "oklch(0.82 0.18 86)",
                borderRadius: "10px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                animation: "floatTag 4s ease-in-out infinite 0.5s",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>💳</span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "oklch(0.16 0.07 152)",
                }}
              >
                Pay &amp; Go
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                top: "55%",
                right: "-45px",
                background: "oklch(0.22 0.09 152)",
                borderRadius: "10px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid oklch(0.42 0.13 152 / 0.4)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                animation: "floatTag 3.5s ease-in-out infinite 1s",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>🧾</span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Live Bill
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "rgba(255,255,255,0.4)",
          animation: "floatTag 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll to explore
        </span>
        <div
          style={{
            width: "24px",
            height: "36px",
            border: "2px solid rgba(255,255,255,0.25)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "8px",
              background: "rgba(255,255,255,0.4)",
              borderRadius: "2px",
              animation: "floatTag 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center;
          }
          .hero-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const el of entry.target.querySelectorAll(".reveal")) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{
        background: "oklch(0.97 0.005 145)",
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section tag */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "4rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              background: "oklch(0.42 0.13 152 / 0.1)",
              color: "oklch(0.42 0.13 152)",
              border: "1px solid oklch(0.42 0.13 152 / 0.3)",
              borderRadius: "100px",
              padding: "4px 16px",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Simple Process
          </span>
          <h2
            style={{
              fontFamily:
                "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "oklch(0.16 0.07 152)",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
          >
            How It Works
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "1.05rem",
              color: "oklch(0.45 0.02 260)",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            Four simple steps to a completely queue-free shopping experience
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            position: "relative",
          }}
          className="steps-grid"
        >
          {/* Connector line (desktop only) */}
          <div
            className="step-connector-line"
            style={{
              position: "absolute",
              top: "40px",
              left: "calc(12.5% + 24px)",
              right: "calc(12.5% + 24px)",
              height: "2px",
              background:
                "linear-gradient(90deg, oklch(0.42 0.13 152), oklch(0.82 0.18 86), oklch(0.42 0.13 152))",
              zIndex: 0,
            }}
          />

          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Icon circle */}
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "white",
                    border: "3px solid oklch(0.88 0.015 145)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.2rem",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.3s, border-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 12px 32px oklch(0.42 0.13 152 / 0.25)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "oklch(0.42 0.13 152)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.08)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "oklch(0.88 0.015 145)";
                  }}
                >
                  {step.emoji}
                </div>
                {/* Step badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "oklch(0.82 0.18 86)",
                    color: "oklch(0.16 0.07 152)",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                  }}
                >
                  {i + 1}
                </div>
              </div>

              <h3
                style={{
                  fontFamily:
                    "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: "oklch(0.16 0.07 152)",
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  lineHeight: 1.65,
                  color: "oklch(0.45 0.02 260)",
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .step-connector-line {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const el of entry.target.querySelectorAll(".reveal")) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{
        background: "white",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "4rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              background: "oklch(0.42 0.13 152 / 0.1)",
              color: "oklch(0.42 0.13 152)",
              border: "1px solid oklch(0.42 0.13 152 / 0.3)",
              borderRadius: "100px",
              padding: "4px 16px",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Capabilities
          </span>
          <h2
            style={{
              fontFamily:
                "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "oklch(0.16 0.07 152)",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
          >
            Packed with Smart Features
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "1.05rem",
              color: "oklch(0.45 0.02 260)",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            Everything you need for a seamless, tech-powered shopping experience
          </p>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="features-grid"
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`feature-card reveal reveal-delay-${(i % 3) + 1}`}
                style={{
                  background: "white",
                  border: "1.5px solid oklch(0.88 0.015 145)",
                  borderRadius: "16px",
                  padding: "2rem",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background: "oklch(0.42 0.13 152 / 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    transition: "background 0.3s",
                  }}
                  className="feature-icon-wrap"
                >
                  <Icon
                    size={24}
                    color="oklch(0.42 0.13 152)"
                    className="feature-icon"
                  />
                </div>
                <h3
                  style={{
                    fontFamily:
                      "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "oklch(0.16 0.07 152)",
                    marginBottom: "0.6rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    color: "oklch(0.45 0.02 260)",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ===== BARCODE SCANNER UTILITY =====
function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (_) {
    // ignore
  }
}

// ===== BARCODE SCANNER SECTION =====
function BarcodeScannerSection({
  cart,
  setCart,
}: {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
}) {
  const [activeTab, setActiveTab] = useState<"camera" | "manual">("camera");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [scanState, setScanState] = useState<
    "idle" | "scanning" | "found" | "not-found"
  >("idle");
  const [foundProduct, setFoundProduct] = useState<Product | null>(null);
  const [manualForm, setManualForm] = useState<{
    name: string;
    price: string;
    category: string;
    imagePreview: string | null;
  }>({ name: "", price: "", category: "", imagePreview: null });

  const sectionRef = useRef<HTMLElement>(null);

  // Camera hook
  const {
    isActive: cameraActive,
    isSupported: cameraSupported,
    error: cameraError,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    videoRef,
    canvasRef,
  } = useCamera({ facingMode: "environment" });

  // Cart computed values
  const cartItems = Object.values(cart);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const el of entry.target.querySelectorAll(".reveal")) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const doScan = useCallback(() => {
    if (scanState === "scanning") return;
    setScanState("scanning");
    setTimeout(() => {
      const randomProduct =
        PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      setFoundProduct(randomProduct);
      setScanState("found");
      playBeep();
    }, 1500);
  }, [scanState]);

  const lookUpBarcode = useCallback(() => {
    const trimmed = barcodeInput.trim();
    if (!trimmed) return;
    const found = PRODUCTS.find((p) => p.barcode === trimmed);
    if (found) {
      setFoundProduct(found);
      setScanState("found");
      playBeep();
    } else {
      setScanState("not-found");
    }
  }, [barcodeInput]);

  const addToCart = useCallback(
    (product: Product) => {
      setCart((prev) => {
        if (prev[product.id]) {
          return {
            ...prev,
            [product.id]: {
              product,
              quantity: prev[product.id].quantity + 1,
            },
          };
        }
        return { ...prev, [product.id]: { product, quantity: 1 } };
      });
      setScanState("idle");
      setFoundProduct(null);
      setBarcodeInput("");
      playBeep();
    },
    [setCart],
  );

  const saveManualProduct = useCallback(() => {
    if (!manualForm.name || !manualForm.price) return;
    const tempProduct: Product = {
      id: Date.now(),
      name: manualForm.name,
      barcode: `MANUAL-${Date.now()}`,
      price: Number.parseFloat(manualForm.price) || 0,
      icon: "📦",
      category: manualForm.category || "General",
      stock: 99,
    };
    setCart((prev) => ({
      ...prev,
      [tempProduct.id]: { product: tempProduct, quantity: 1 },
    }));
    setManualForm({ name: "", price: "", category: "", imagePreview: null });
    setScanState("idle");
    setBarcodeInput("");
    playBeep();
  }, [manualForm, setCart]);

  const updateQty = useCallback(
    (id: number, delta: number) => {
      setCart((prev) => {
        const item = prev[id];
        if (!item) return prev;
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          const next = { ...prev };
          delete next[id];
          return next;
        }
        return { ...prev, [id]: { ...item, quantity: newQty } };
      });
    },
    [setCart],
  );

  const removeItem = useCallback(
    (id: number) => {
      setCart((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    },
    [setCart],
  );

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1.5px solid oklch(0.88 0.015 145)",
    borderRadius: "10px",
    padding: "11px 14px",
    background: "oklch(0.98 0.003 145)",
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: "0.9rem",
    color: "oklch(0.16 0.07 152)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  return (
    <section
      id="barcode-scanner"
      ref={sectionRef}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.16 0.07 152) 0%, oklch(0.22 0.09 152) 50%, oklch(0.18 0.08 152) 100%)",
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, opacity: 0.5 }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Innovation Banner */}
        <div
          className="reveal"
          style={{
            background: "oklch(0.82 0.18 86 / 0.12)",
            border: "1px solid oklch(0.82 0.18 86 / 0.35)",
            borderRadius: "12px",
            padding: "12px 20px",
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Zap
            size={16}
            color="oklch(0.82 0.18 86)"
            style={{ flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "oklch(0.82 0.18 86)",
            }}
          >
            Queue-Free Smart Checkout
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            · C2P (Concept to Practice) Innovation · Reduces Billing Counter
            Wait Time
          </span>
        </div>

        {/* Section Heading */}
        <div
          className="reveal"
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              background: "oklch(0.82 0.18 86 / 0.15)",
              color: "oklch(0.82 0.18 86)",
              border: "1px solid oklch(0.82 0.18 86 / 0.3)",
              borderRadius: "100px",
              padding: "4px 16px",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            New Feature
          </span>
          <h2
            style={{
              fontFamily:
                "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              marginBottom: "0.75rem",
            }}
          >
            Add Product via Barcode Scanner
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "460px",
              lineHeight: 1.7,
              margin: "0 auto",
            }}
          >
            Scan a product barcode using your camera or enter it manually —
            items are added to your cart instantly.
          </p>
        </div>

        {/* Two-panel layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="bs-grid"
        >
          {/* ===== LEFT PANEL: Scanner & Product Fetch ===== */}
          <div
            className="reveal"
            style={{
              background: "oklch(0.12 0.06 152 / 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid oklch(0.42 0.13 152 / 0.3)",
              borderRadius: "20px",
              padding: "1.75rem",
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "oklch(0.7 0.2 152)",
                  boxShadow: "0 0 8px oklch(0.7 0.2 152)",
                  animation: "pulseGlow 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Mona Sans', system-ui, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-0.01em",
                }}
              >
                Barcode Scanner
              </span>
            </div>

            {/* Tab Toggle */}
            <div
              style={{
                display: "flex",
                background: "oklch(0.08 0.04 152 / 0.6)",
                borderRadius: "12px",
                padding: "4px",
                marginBottom: "1.5rem",
                gap: "4px",
              }}
            >
              {(["camera", "manual"] as const).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setScanState("idle");
                    setFoundProduct(null);
                  }}
                  data-ocid="barcode-scanner.tab"
                  style={{
                    flex: 1,
                    padding: "9px 14px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      activeTab === tab
                        ? "oklch(0.42 0.13 152)"
                        : "transparent",
                    color:
                      activeTab === tab ? "white" : "rgba(255,255,255,0.5)",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {tab === "camera" ? "📷 Camera Scan" : "⌨️ Enter Manually"}
                </button>
              ))}
            </div>

            {/* ===== CAMERA TAB ===== */}
            {activeTab === "camera" && (
              <div>
                {/* Camera viewfinder */}
                <div
                  style={{
                    border: "2px solid oklch(0.42 0.13 152 / 0.4)",
                    borderRadius: "12px",
                    position: "relative",
                    overflow: "hidden",
                    background: "oklch(0.08 0.04 152 / 0.5)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {/* Corner brackets */}
                  {[
                    {
                      top: "6px",
                      left: "6px",
                      borderRight: "none",
                      borderBottom: "none",
                    },
                    {
                      top: "6px",
                      right: "6px",
                      borderLeft: "none",
                      borderBottom: "none",
                    },
                    {
                      bottom: "6px",
                      left: "6px",
                      borderRight: "none",
                      borderTop: "none",
                    },
                    {
                      bottom: "6px",
                      right: "6px",
                      borderLeft: "none",
                      borderTop: "none",
                    },
                  ].map((s, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static decorative corners
                      key={i}
                      style={{
                        position: "absolute",
                        width: "18px",
                        height: "18px",
                        border: "2.5px solid oklch(0.82 0.18 86)",
                        zIndex: 2,
                        ...s,
                      }}
                    />
                  ))}

                  {/* Video feed */}
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      display: cameraActive ? "block" : "none",
                    }}
                  />
                  <canvas ref={canvasRef} style={{ display: "none" }} />

                  {/* Static window when camera off */}
                  {!cameraActive && (
                    <div
                      style={{
                        height: "120px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Scan beam */}
                      <div
                        className={`scan-beam ${scanState === "scanning" ? "scan-beam-fast" : ""}`}
                        style={
                          scanState === "scanning"
                            ? {
                                background:
                                  "linear-gradient(90deg, transparent, oklch(0.82 0.18 86), oklch(1 0 0 / 0.6), oklch(0.82 0.18 86), transparent)",
                                boxShadow:
                                  "0 0 20px oklch(0.82 0.18 86), 0 0 40px oklch(0.82 0.18 86 / 0.5)",
                                animationDuration: "0.25s",
                              }
                            : {}
                        }
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.85rem",
                          color:
                            scanState === "scanning"
                              ? "oklch(0.82 0.18 86)"
                              : "rgba(255,255,255,0.35)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          fontWeight: scanState === "scanning" ? 700 : 400,
                        }}
                      >
                        {scanState === "scanning"
                          ? "⟳ Scanning..."
                          : "Aim camera at barcode"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Camera controls */}
                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}
                >
                  <button
                    type="button"
                    onClick={startCamera}
                    disabled={
                      cameraActive || cameraLoading || cameraSupported === false
                    }
                    data-ocid="barcode-scanner.start_button"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid oklch(0.42 0.13 152 / 0.4)",
                      background:
                        cameraActive ||
                        cameraLoading ||
                        cameraSupported === false
                          ? "oklch(0.42 0.13 152 / 0.1)"
                          : "oklch(0.42 0.13 152 / 0.25)",
                      color:
                        cameraActive ||
                        cameraLoading ||
                        cameraSupported === false
                          ? "rgba(255,255,255,0.3)"
                          : "oklch(0.82 0.18 86)",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor:
                        cameraActive ||
                        cameraLoading ||
                        cameraSupported === false
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    📷 {cameraLoading ? "Starting..." : "Start Camera"}
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    disabled={!cameraActive || cameraLoading}
                    data-ocid="barcode-scanner.stop_button"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid oklch(0.577 0.245 27.325 / 0.3)",
                      background:
                        !cameraActive || cameraLoading
                          ? "oklch(0.577 0.245 27.325 / 0.05)"
                          : "oklch(0.577 0.245 27.325 / 0.15)",
                      color:
                        !cameraActive || cameraLoading
                          ? "rgba(255,255,255,0.3)"
                          : "oklch(0.7 0.2 27.325)",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor:
                        !cameraActive || cameraLoading
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    ⏹ Stop Camera
                  </button>
                </div>

                {/* Camera error */}
                {cameraError && (
                  <div
                    style={{
                      marginBottom: "0.75rem",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "oklch(0.577 0.245 27.325 / 0.12)",
                      border: "1px solid oklch(0.577 0.245 27.325 / 0.3)",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.75rem",
                      color: "oklch(0.75 0.15 27.325)",
                    }}
                  >
                    ⚠ {cameraError.message}
                  </div>
                )}

                {/* Scan Product button */}
                <button
                  type="button"
                  onClick={doScan}
                  disabled={scanState === "scanning"}
                  data-ocid="barcode-scanner.primary_button"
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "12px",
                    border: "none",
                    background:
                      scanState === "scanning"
                        ? "oklch(0.42 0.13 152 / 0.5)"
                        : "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                    color: "white",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor:
                      scanState === "scanning" ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    marginBottom: "0.75rem",
                  }}
                  onMouseEnter={(e) => {
                    if (scanState !== "scanning") {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(-2px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 8px 24px oklch(0.42 0.13 152 / 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "none";
                  }}
                >
                  {scanState === "scanning" ? (
                    <>
                      <span
                        style={{
                          animation: "spin 1s linear infinite",
                          display: "inline-block",
                        }}
                      >
                        ⟳
                      </span>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <QrCode size={18} />
                      Scan Product
                    </>
                  )}
                </button>
              </div>
            )}

            {/* ===== MANUAL BARCODE TAB ===== */}
            {activeTab === "manual" && (
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    htmlFor="bs-barcode-input"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.6)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Barcode Number
                  </label>
                  <input
                    id="bs-barcode-input"
                    type="text"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") lookUpBarcode();
                    }}
                    placeholder="e.g. 8901030814052"
                    data-ocid="barcode-scanner.input"
                    style={{
                      ...inputStyle,
                      background: "oklch(0.10 0.05 152 / 0.8)",
                      border: "1.5px solid oklch(0.42 0.13 152 / 0.4)",
                      color: "white",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "oklch(0.82 0.18 86)";
                      e.target.style.boxShadow =
                        "0 0 0 3px oklch(0.82 0.18 86 / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.42 0.13 152 / 0.4)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.35)",
                      marginTop: "4px",
                    }}
                  >
                    Try: 8901030814052 · 8906063010012 · 8902102300016
                  </p>
                </div>

                <button
                  type="button"
                  onClick={lookUpBarcode}
                  data-ocid="barcode-scanner.primary_button"
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "12px",
                    border: "none",
                    background:
                      "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                    color: "white",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    marginBottom: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 8px 24px oklch(0.42 0.13 152 / 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "none";
                  }}
                >
                  <QrCode size={18} />
                  Look Up Product
                </button>
              </div>
            )}

            {/* ===== PRODUCT FOUND STATE ===== */}
            {scanState === "found" && foundProduct && (
              <div
                style={{
                  marginTop: "1.25rem",
                  background: "white",
                  borderRadius: "16px",
                  border: "2px solid oklch(0.42 0.13 152 / 0.6)",
                  padding: "1.5rem",
                  animation: "slideInUp 0.3s ease-out",
                }}
              >
                {/* Icon + name row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "14px",
                      background: "oklch(0.42 0.13 152 / 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.2rem",
                      flexShrink: 0,
                    }}
                  >
                    {foundProduct.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "1.05rem",
                        fontWeight: 800,
                        color: "oklch(0.16 0.07 152)",
                        letterSpacing: "-0.01em",
                        marginBottom: "4px",
                      }}
                    >
                      {foundProduct.name}
                    </div>
                    {/* Category badge */}
                    <span
                      style={{
                        background: "oklch(0.42 0.13 152 / 0.1)",
                        color: "oklch(0.32 0.11 152)",
                        borderRadius: "100px",
                        padding: "2px 10px",
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        display: "inline-block",
                      }}
                    >
                      {foundProduct.category}
                    </span>
                  </div>
                </div>

                {/* Price + stock row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    padding: "10px 14px",
                    background: "oklch(0.97 0.005 145)",
                    borderRadius: "10px",
                    border: "1px solid oklch(0.88 0.015 145)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Mona Sans', system-ui, sans-serif",
                      fontSize: "1.6rem",
                      fontWeight: 900,
                      color: "oklch(0.32 0.11 152)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {formatCurrency(foundProduct.price)}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "oklch(0.55 0.18 152)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "oklch(0.40 0.13 152)",
                      }}
                    >
                      In Stock: {foundProduct.stock} units
                    </span>
                  </div>
                </div>

                {/* Barcode display */}
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', monospace, sans-serif",
                    fontSize: "0.72rem",
                    color: "oklch(0.55 0.02 260)",
                    marginBottom: "1rem",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                  }}
                >
                  Barcode: {foundProduct.barcode}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => addToCart(foundProduct)}
                    data-ocid="barcode-scanner.add_button"
                    style={{
                      flex: 1,
                      padding: "11px",
                      borderRadius: "10px",
                      border: "none",
                      background:
                        "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                      color: "white",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    <Plus size={16} />
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setScanState("idle");
                      setFoundProduct(null);
                      setBarcodeInput("");
                    }}
                    style={{
                      padding: "11px 16px",
                      borderRadius: "10px",
                      border: "1.5px solid oklch(0.42 0.13 152 / 0.3)",
                      background: "transparent",
                      color: "oklch(0.45 0.02 260)",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "oklch(0.42 0.13 152 / 0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }}
                  >
                    Scan Another
                  </button>
                </div>
              </div>
            )}

            {/* ===== PRODUCT NOT FOUND STATE ===== */}
            {scanState === "not-found" && (
              <div style={{ marginTop: "1.25rem" }}>
                {/* Error message */}
                <div
                  style={{
                    background: "oklch(0.577 0.245 27.325 / 0.12)",
                    border: "1px solid oklch(0.577 0.245 27.325 / 0.35)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    marginBottom: "1.25rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>⚠️</span>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.85rem",
                      color: "oklch(0.75 0.15 27.325)",
                      fontWeight: 600,
                      lineHeight: 1.5,
                    }}
                  >
                    Product not found. Add product details manually.
                  </span>
                </div>

                {/* Manual entry form on white card */}
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    border: "1.5px solid oklch(0.88 0.015 145)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Mona Sans', system-ui, sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "oklch(0.16 0.07 152)",
                      marginBottom: "1rem",
                    }}
                  >
                    Add Product Manually
                  </h4>

                  <div style={{ marginBottom: "0.75rem" }}>
                    <label
                      htmlFor="bs-manual-name"
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "oklch(0.45 0.02 260)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      Product Name *
                    </label>
                    <input
                      id="bs-manual-name"
                      type="text"
                      value={manualForm.name}
                      onChange={(e) =>
                        setManualForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="e.g. Organic Honey 500g"
                      data-ocid="barcode-scanner.manual.input"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "oklch(0.42 0.13 152)";
                        e.target.style.boxShadow =
                          "0 0 0 3px oklch(0.42 0.13 152 / 0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "oklch(0.88 0.015 145)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="bs-manual-price"
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "oklch(0.45 0.02 260)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Price (₹) *
                      </label>
                      <input
                        id="bs-manual-price"
                        type="number"
                        value={manualForm.price}
                        onChange={(e) =>
                          setManualForm((f) => ({
                            ...f,
                            price: e.target.value,
                          }))
                        }
                        placeholder="0.00"
                        data-ocid="barcode-scanner.manual.input"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "oklch(0.42 0.13 152)";
                          e.target.style.boxShadow =
                            "0 0 0 3px oklch(0.42 0.13 152 / 0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "oklch(0.88 0.015 145)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bs-manual-category"
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "oklch(0.45 0.02 260)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Category
                      </label>
                      <input
                        id="bs-manual-category"
                        type="text"
                        value={manualForm.category}
                        onChange={(e) =>
                          setManualForm((f) => ({
                            ...f,
                            category: e.target.value,
                          }))
                        }
                        placeholder="e.g. Grocery"
                        data-ocid="barcode-scanner.manual.input"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "oklch(0.42 0.13 152)";
                          e.target.style.boxShadow =
                            "0 0 0 3px oklch(0.42 0.13 152 / 0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "oklch(0.88 0.015 145)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Image upload */}
                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      htmlFor="bs-manual-image"
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "oklch(0.45 0.02 260)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      Product Image (optional)
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {/* Preview */}
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "10px",
                          background: "oklch(0.97 0.005 145)",
                          border: "1.5px solid oklch(0.88 0.015 145)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          overflow: "hidden",
                        }}
                      >
                        {manualForm.imagePreview ? (
                          <img
                            src={manualForm.imagePreview}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: "1.5rem" }}>📦</span>
                        )}
                      </div>
                      <label
                        htmlFor="bs-manual-image"
                        style={{
                          flex: 1,
                          padding: "9px 14px",
                          borderRadius: "10px",
                          border: "1.5px dashed oklch(0.42 0.13 152 / 0.4)",
                          background: "oklch(0.42 0.13 152 / 0.04)",
                          color: "oklch(0.45 0.13 152)",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          textAlign: "center",
                          display: "block",
                        }}
                      >
                        📁 Upload Image
                        <input
                          id="bs-manual-image"
                          type="file"
                          accept="image/*"
                          data-ocid="barcode-scanner.upload_button"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setManualForm((f) => ({
                                  ...f,
                                  imagePreview: ev.target?.result as string,
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={saveManualProduct}
                    disabled={!manualForm.name || !manualForm.price}
                    data-ocid="barcode-scanner.save_button"
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: "12px",
                      border: "none",
                      background:
                        !manualForm.name || !manualForm.price
                          ? "oklch(0.75 0.015 145)"
                          : "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                      color:
                        !manualForm.name || !manualForm.price
                          ? "oklch(0.55 0.01 145)"
                          : "white",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      cursor:
                        !manualForm.name || !manualForm.price
                          ? "not-allowed"
                          : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (manualForm.name && manualForm.price) {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    <ShoppingCart size={16} />
                    Save &amp; Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ===== RIGHT PANEL: Cart Panel ===== */}
          <div
            className="reveal reveal-delay-2"
            style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            }}
          >
            {/* Cart header */}
            <div
              style={{
                background: "oklch(0.42 0.13 152)",
                padding: "1.25rem 1.75rem",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <ShoppingCart size={22} color="white" />
              <span
                style={{
                  fontFamily: "'Mona Sans', system-ui, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "white",
                  flex: 1,
                }}
              >
                Smart Cart
              </span>
              {itemCount > 0 && (
                <span
                  style={{
                    background: "oklch(0.82 0.18 86)",
                    color: "oklch(0.16 0.07 152)",
                    borderRadius: "100px",
                    padding: "2px 10px",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                  }}
                >
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Cart items */}
            <div
              style={{
                minHeight: "280px",
                maxHeight: "380px",
                overflowY: "auto",
                padding: "1rem",
              }}
            >
              {cartItems.length === 0 ? (
                <div
                  data-ocid="barcode-scanner.cart.empty_state"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "240px",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: "oklch(0.42 0.13 152 / 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ShoppingBag
                      size={32}
                      color="oklch(0.42 0.13 152)"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "oklch(0.16 0.07 152)",
                        marginBottom: "4px",
                      }}
                    >
                      Cart is empty
                    </p>
                    <p
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.85rem",
                        color: "oklch(0.55 0.02 260)",
                      }}
                    >
                      Scan a product to add it here
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {cartItems.map((item, idx) => (
                    <div
                      key={item.product.id}
                      data-ocid={`barcode-scanner.cart.item.${idx + 1}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        background: "oklch(0.97 0.005 145)",
                        border: "1px solid oklch(0.88 0.015 145)",
                      }}
                    >
                      <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>
                        {item.product.icon}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "oklch(0.16 0.07 152)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.product.name}
                        </div>
                        <div
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.72rem",
                            color: "oklch(0.55 0.02 260)",
                          }}
                        >
                          {formatCurrency(item.product.price)} each
                        </div>
                      </div>
                      {/* Qty controls */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQty(item.product.id, -1)}
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "6px",
                            border: "1.5px solid oklch(0.88 0.015 145)",
                            background: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} color="oklch(0.16 0.07 152)" />
                        </button>
                        <span
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            color: "oklch(0.16 0.07 152)",
                            minWidth: "22px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.product.id, 1)}
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "6px",
                            border: "1.5px solid oklch(0.42 0.13 152 / 0.3)",
                            background: "oklch(0.42 0.13 152 / 0.08)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} color="oklch(0.42 0.13 152)" />
                        </button>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Mona Sans', system-ui, sans-serif",
                          fontSize: "0.875rem",
                          fontWeight: 800,
                          color: "oklch(0.32 0.11 152)",
                          minWidth: "52px",
                          textAlign: "right",
                          flexShrink: 0,
                        }}
                      >
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        data-ocid={`barcode-scanner.cart.delete_button.${idx + 1}`}
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "6px",
                          border:
                            "1.5px solid oklch(0.577 0.245 27.325 / 0.25)",
                          background: "oklch(0.577 0.245 27.325 / 0.06)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={12} color="oklch(0.577 0.245 27.325)" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart footer */}
            <div
              style={{
                borderTop: "1.5px solid oklch(0.88 0.015 145)",
                padding: "1.25rem 1.75rem",
                background: "white",
              }}
            >
              {cartItems.length > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.82rem",
                        color: "oklch(0.55 0.02 260)",
                      }}
                    >
                      Subtotal
                    </span>
                    <span
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.82rem",
                        color: "oklch(0.45 0.02 260)",
                        fontWeight: 600,
                      }}
                    >
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.82rem",
                        color: "oklch(0.55 0.02 260)",
                      }}
                    >
                      GST (18%)
                    </span>
                    <span
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.82rem",
                        color: "oklch(0.577 0.245 27.325)",
                        fontWeight: 600,
                      }}
                    >
                      +{formatCurrency(gst)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                      paddingTop: "8px",
                      borderTop: "1px solid oklch(0.88 0.015 145)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.9rem",
                        color: "oklch(0.45 0.02 260)",
                        fontWeight: 700,
                      }}
                    >
                      Grand Total
                    </span>
                    <span
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 900,
                        color: "oklch(0.32 0.11 152)",
                      }}
                    >
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </>
              )}

              {cartItems.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "oklch(0.45 0.02 260)",
                    }}
                  >
                    Cart Total
                  </span>
                  <span
                    style={{
                      fontFamily: "'Mona Sans', system-ui, sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "oklch(0.75 0.015 145)",
                    }}
                  >
                    ₹0.00
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  const el = document.querySelector("#checkout");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                disabled={cartItems.length === 0}
                data-ocid="barcode-scanner.cart.primary_button"
                style={{
                  width: "100%",
                  background:
                    cartItems.length === 0
                      ? "oklch(0.75 0.015 145)"
                      : "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                  color:
                    cartItems.length === 0 ? "oklch(0.55 0.01 145)" : "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (cartItems.length > 0) {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 8px 24px oklch(0.42 0.13 152 / 0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                }}
              >
                <ChevronRight size={18} />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bs-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

// Interactive Demo Section
function DemoSection({
  cart,
  setCart,
  paymentCompleted,
}: {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  paymentCompleted: boolean;
}) {
  const [scanningId, setScanningId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [receiptNo] = useState(() => generateReceiptNo());
  const [newlyAddedId, setNewlyAddedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Camera integration
  const {
    isActive: cameraActive,
    isSupported: cameraSupported,
    error: cameraError,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    videoRef,
    canvasRef,
  } = useCamera({ facingMode: "environment" });

  const cartItems = Object.values(cart);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const handleScan = useCallback(
    (product: Product) => {
      if (scanningId) return;
      setScanningId(product.id);
      setNewlyAddedId(null);
      setTimeout(() => {
        setScanningId(null);
        setCart((prev) => {
          if (prev[product.id]) {
            return {
              ...prev,
              [product.id]: {
                product,
                quantity: prev[product.id].quantity + 1,
              },
            };
          }
          return { ...prev, [product.id]: { product, quantity: 1 } };
        });
        setNewlyAddedId(product.id);
        setTimeout(() => setNewlyAddedId(null), 800);
      }, 700);
    },
    [scanningId, setCart],
  );

  const updateQty = useCallback(
    (id: number, delta: number) => {
      setCart((prev) => {
        const item = prev[id];
        if (!item) return prev;
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          const next = { ...prev };
          delete next[id];
          return next;
        }
        return { ...prev, [id]: { ...item, quantity: newQty } };
      });
    },
    [setCart],
  );

  const removeItem = useCallback(
    (id: number) => {
      setCart((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    },
    [setCart],
  );

  const clearCart = useCallback(() => {
    setCart({});
    setShowModal(false);
  }, [setCart]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const el of entry.target.querySelectorAll(".reveal")) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="demo"
        ref={sectionRef}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.07 152) 0%, oklch(0.22 0.09 152) 50%, oklch(0.18 0.08 152) 100%)",
          padding: "6rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          className="grid-overlay"
          style={{ position: "absolute", inset: 0, opacity: 0.5 }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Heading */}
          <div
            className="reveal"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "3.5rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                background: "oklch(0.82 0.18 86 / 0.15)",
                color: "oklch(0.82 0.18 86)",
                border: "1px solid oklch(0.82 0.18 86 / 0.3)",
                borderRadius: "100px",
                padding: "4px 16px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Try It Now
            </span>
            <h2
              style={{
                fontFamily:
                  "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.03em",
                marginBottom: "1rem",
              }}
            >
              Interactive Demo
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "450px",
                lineHeight: 1.7,
              }}
            >
              Click any product to simulate scanning. Watch your cart update in
              real-time!
            </p>
          </div>

          {/* Two-panel layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
            className="demo-grid"
          >
            {/* Left: Scanner Panel */}
            <div
              className="reveal"
              style={{
                background: "oklch(0.12 0.06 152 / 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(0.42 0.13 152 / 0.3)",
                borderRadius: "20px",
                padding: "1.75rem",
              }}
            >
              {/* Panel header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "oklch(0.7 0.2 152)",
                    boxShadow: "0 0 8px oklch(0.7 0.2 152)",
                    animation: "pulseGlow 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Mona Sans', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "white",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Barcode Scanner
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    marginLeft: "2px",
                  }}
                >
                  · Camera Scanner
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    background: cameraActive
                      ? "oklch(0.82 0.18 86 / 0.25)"
                      : "oklch(0.42 0.13 152 / 0.3)",
                    color: cameraActive
                      ? "oklch(0.82 0.18 86)"
                      : "oklch(0.7 0.2 152)",
                    borderRadius: "100px",
                    padding: "2px 10px",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                  }}
                >
                  {cameraActive ? "LIVE" : "ACTIVE"}
                </span>
              </div>

              {/* Camera / Scan window */}
              <div
                style={{
                  border: "2px solid oklch(0.42 0.13 152 / 0.4)",
                  borderRadius: "12px",
                  position: "relative",
                  overflow: "hidden",
                  background: "oklch(0.08 0.04 152 / 0.5)",
                  marginBottom:
                    cameraActive || cameraError ? "0.75rem" : "1.5rem",
                }}
              >
                {/* Corner brackets */}
                <div
                  style={{
                    position: "absolute",
                    width: "18px",
                    height: "18px",
                    border: "2.5px solid oklch(0.82 0.18 86)",
                    top: "6px",
                    left: "6px",
                    borderRight: "none",
                    borderBottom: "none",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "18px",
                    height: "18px",
                    border: "2.5px solid oklch(0.82 0.18 86)",
                    top: "6px",
                    right: "6px",
                    borderLeft: "none",
                    borderBottom: "none",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "18px",
                    height: "18px",
                    border: "2.5px solid oklch(0.82 0.18 86)",
                    bottom: "6px",
                    left: "6px",
                    borderRight: "none",
                    borderTop: "none",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "18px",
                    height: "18px",
                    border: "2.5px solid oklch(0.82 0.18 86)",
                    bottom: "6px",
                    right: "6px",
                    borderLeft: "none",
                    borderTop: "none",
                    zIndex: 2,
                  }}
                />

                {/* Video element (always rendered, hidden when camera inactive) */}
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  style={{
                    width: "100%",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    display: cameraActive ? "block" : "none",
                  }}
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />

                {/* Static scan window when camera not active */}
                {!cameraActive && (
                  <div
                    style={{
                      height: "90px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Scan beam */}
                    <div
                      className={`scan-beam ${scanningId ? "scan-beam-fast" : ""}`}
                      style={
                        scanningId
                          ? {
                              background:
                                "linear-gradient(90deg, transparent, oklch(0.82 0.18 86), oklch(1 0 0 / 0.6), oklch(0.82 0.18 86), transparent)",
                              boxShadow:
                                "0 0 20px oklch(0.82 0.18 86), 0 0 40px oklch(0.82 0.18 86 / 0.5)",
                              animationDuration: "0.25s",
                              animationIterationCount: "4",
                            }
                          : {}
                      }
                    />
                    {/* Scan text */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.78rem",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {scanningId
                        ? `Scanning ${PRODUCTS.find((p) => p.id === scanningId)?.name}...`
                        : "Click product to scan"}
                    </div>
                  </div>
                )}
              </div>

              {/* Camera controls */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "1.5rem",
                }}
              >
                <button
                  type="button"
                  onClick={startCamera}
                  disabled={
                    cameraActive || cameraLoading || cameraSupported === false
                  }
                  data-ocid="scanner.start_button"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid oklch(0.42 0.13 152 / 0.4)",
                    background:
                      cameraActive || cameraLoading || cameraSupported === false
                        ? "oklch(0.42 0.13 152 / 0.1)"
                        : "oklch(0.42 0.13 152 / 0.25)",
                    color:
                      cameraActive || cameraLoading || cameraSupported === false
                        ? "rgba(255,255,255,0.3)"
                        : "oklch(0.82 0.18 86)",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor:
                      cameraActive || cameraLoading || cameraSupported === false
                        ? "not-allowed"
                        : "pointer",
                    transition: "background 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  📷 {cameraLoading ? "Starting..." : "Start Camera"}
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  disabled={!cameraActive || cameraLoading}
                  data-ocid="scanner.stop_button"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid oklch(0.577 0.245 27.325 / 0.3)",
                    background:
                      !cameraActive || cameraLoading
                        ? "oklch(0.577 0.245 27.325 / 0.05)"
                        : "oklch(0.577 0.245 27.325 / 0.15)",
                    color:
                      !cameraActive || cameraLoading
                        ? "rgba(255,255,255,0.3)"
                        : "oklch(0.7 0.2 27.325)",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor:
                      !cameraActive || cameraLoading
                        ? "not-allowed"
                        : "pointer",
                    transition: "background 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  ⏹ Stop Camera
                </button>
              </div>

              {/* Camera error */}
              {cameraError && (
                <div
                  style={{
                    marginBottom: "1rem",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "oklch(0.577 0.245 27.325 / 0.12)",
                    border: "1px solid oklch(0.577 0.245 27.325 / 0.3)",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    color: "oklch(0.75 0.15 27.325)",
                  }}
                >
                  ⚠ {cameraError.message}
                </div>
              )}

              {/* Product list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {PRODUCTS.map((product) => (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() => handleScan(product)}
                    disabled={!!scanningId}
                    className={scanningId === product.id ? "scan-flash" : ""}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background:
                        scanningId === product.id
                          ? "oklch(0.82 0.18 86 / 0.2)"
                          : "oklch(0.42 0.13 152 / 0.1)",
                      border:
                        scanningId === product.id
                          ? "1px solid oklch(0.82 0.18 86 / 0.5)"
                          : "1px solid oklch(0.42 0.13 152 / 0.2)",
                      cursor: scanningId ? "not-allowed" : "pointer",
                      transition:
                        "background 0.2s, border 0.2s, transform 0.15s",
                      opacity:
                        scanningId && scanningId !== product.id ? 0.6 : 1,
                      textAlign: "left",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      if (!scanningId) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "oklch(0.42 0.13 152 / 0.2)";
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateX(4px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!scanningId) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "oklch(0.42 0.13 152 / 0.1)";
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateX(0)";
                      }
                    }}
                  >
                    <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>
                      {product.icon}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "white",
                          marginBottom: "2px",
                        }}
                      >
                        {product.name}
                      </div>
                      <div
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', monospace, sans-serif",
                          fontSize: "0.72rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {product.barcode}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: 800,
                        color: "oklch(0.82 0.18 86)",
                        flexShrink: 0,
                      }}
                    >
                      {formatCurrency(product.price)}
                    </span>
                  </button>
                ))}
              </div>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.35)",
                  textAlign: "center",
                  marginTop: "1rem",
                  letterSpacing: "0.04em",
                }}
              >
                ↑ Click a product to scan it
              </p>
            </div>

            {/* Right: Cart Panel */}
            <div
              className="reveal reveal-delay-2"
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
              }}
            >
              {/* Cart header */}
              <div
                style={{
                  background: "oklch(0.42 0.13 152)",
                  padding: "1.25rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <ShoppingCart size={22} color="white" />
                <span
                  style={{
                    fontFamily: "'Mona Sans', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "white",
                    flex: 1,
                  }}
                >
                  Digital Cart
                </span>
                {itemCount > 0 && (
                  <span
                    style={{
                      background: "oklch(0.82 0.18 86)",
                      color: "oklch(0.16 0.07 152)",
                      borderRadius: "100px",
                      padding: "2px 10px",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                    }}
                  >
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Cart items */}
              <div
                style={{
                  minHeight: "300px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  padding: "1rem",
                }}
              >
                {cartItems.length === 0 ? (
                  <div
                    data-ocid="cart.empty_state"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "280px",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        background: "oklch(0.42 0.13 152 / 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ShoppingBag
                        size={32}
                        color="oklch(0.42 0.13 152)"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          fontFamily: "'Mona Sans', system-ui, sans-serif",
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "oklch(0.16 0.07 152)",
                          marginBottom: "4px",
                        }}
                      >
                        Your cart is empty
                      </p>
                      <p
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.85rem",
                          color: "oklch(0.55 0.02 260)",
                        }}
                      >
                        Scan products to add them here
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {cartItems.map((item, idx) => (
                      <div
                        key={item.product.id}
                        data-ocid={`cart.item.${idx + 1}`}
                        className={
                          newlyAddedId === item.product.id
                            ? "cart-item-enter"
                            : ""
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          background: "oklch(0.97 0.005 145)",
                          border: "1px solid oklch(0.88 0.015 145)",
                        }}
                      >
                        <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>
                          {item.product.icon}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontFamily:
                                "'Plus Jakarta Sans', system-ui, sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "oklch(0.16 0.07 152)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            style={{
                              fontFamily:
                                "'Plus Jakarta Sans', system-ui, sans-serif",
                              fontSize: "0.72rem",
                              color: "oklch(0.55 0.02 260)",
                            }}
                          >
                            {formatCurrency(item.product.price)} each
                          </div>
                        </div>
                        {/* Qty controls */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => updateQty(item.product.id, -1)}
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "6px",
                              border: "1.5px solid oklch(0.88 0.015 145)",
                              background: "white",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background 0.2s",
                              flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = "oklch(0.97 0.005 145)";
                            }}
                            onMouseLeave={(e) => {
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = "white";
                            }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} color="oklch(0.16 0.07 152)" />
                          </button>
                          <span
                            style={{
                              fontFamily:
                                "'Plus Jakarta Sans', system-ui, sans-serif",
                              fontSize: "0.875rem",
                              fontWeight: 700,
                              color: "oklch(0.16 0.07 152)",
                              minWidth: "22px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.product.id, 1)}
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "6px",
                              border: "1.5px solid oklch(0.42 0.13 152 / 0.3)",
                              background: "oklch(0.42 0.13 152 / 0.08)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background 0.2s",
                              flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background =
                                "oklch(0.42 0.13 152 / 0.18)";
                            }}
                            onMouseLeave={(e) => {
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background =
                                "oklch(0.42 0.13 152 / 0.08)";
                            }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} color="oklch(0.42 0.13 152)" />
                          </button>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Mona Sans', system-ui, sans-serif",
                            fontSize: "0.875rem",
                            fontWeight: 800,
                            color: "oklch(0.32 0.11 152)",
                            minWidth: "52px",
                            textAlign: "right",
                            flexShrink: 0,
                          }}
                        >
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          data-ocid={`cart.delete_button.${idx + 1}`}
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "6px",
                            border:
                              "1.5px solid oklch(0.577 0.245 27.325 / 0.25)",
                            background: "oklch(0.577 0.245 27.325 / 0.06)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s",
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background =
                              "oklch(0.577 0.245 27.325 / 0.15)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background =
                              "oklch(0.577 0.245 27.325 / 0.06)";
                          }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={12} color="oklch(0.577 0.245 27.325)" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart footer */}
              <div
                style={{
                  borderTop: "1.5px solid oklch(0.88 0.015 145)",
                  padding: "1.25rem 1.75rem",
                  background: "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "oklch(0.45 0.02 260)",
                    }}
                  >
                    Cart Total
                  </span>
                  <span
                    style={{
                      fontFamily: "'Mona Sans', system-ui, sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "oklch(0.32 0.11 152)",
                    }}
                  >
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                {/* Payment required notice */}
                {cartItems.length > 0 && !paymentCompleted && (
                  <div
                    style={{
                      background: "oklch(0.97 0.09 86 / 0.5)",
                      border: "1px solid oklch(0.82 0.18 86 / 0.5)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Lock
                      size={14}
                      color="oklch(0.55 0.18 86)"
                      style={{ flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.78rem",
                        color: "oklch(0.45 0.15 86)",
                        fontWeight: 600,
                        lineHeight: 1.4,
                      }}
                    >
                      Complete payment in the{" "}
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.querySelector("#checkout");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          color: "oklch(0.42 0.13 152)",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                        }}
                      >
                        Checkout section
                      </button>{" "}
                      to generate your bill.
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (cartItems.length > 0 && paymentCompleted) {
                      setShowModal(true);
                    } else if (cartItems.length > 0 && !paymentCompleted) {
                      const el = document.querySelector("#checkout");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  disabled={cartItems.length === 0}
                  data-ocid="cart.primary_button"
                  style={{
                    width: "100%",
                    background:
                      cartItems.length === 0
                        ? "oklch(0.75 0.015 145)"
                        : paymentCompleted
                          ? "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))"
                          : "oklch(0.75 0.015 145)",
                    color:
                      cartItems.length === 0
                        ? "oklch(0.55 0.01 145)"
                        : paymentCompleted
                          ? "white"
                          : "oklch(0.50 0.01 145)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "14px",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (cartItems.length > 0 && paymentCompleted) {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(-2px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 8px 24px oklch(0.42 0.13 152 / 0.35)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "none";
                  }}
                >
                  {paymentCompleted ? (
                    <>
                      <Receipt size={18} />
                      Generate Bill
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Complete Payment to Generate Bill
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bill Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          data-ocid="bill.modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowModal(false);
          }}
        >
          <dialog
            open
            aria-label="Digital Receipt"
            style={{
              background: "white",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "480px",
              overflow: "hidden",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
              border: "none",
              padding: 0,
              position: "relative",
            }}
          >
            {/* Receipt header */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.22 0.09 152))",
                padding: "2rem 2rem 1.75rem",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <CheckCircle2 size={28} color="oklch(0.82 0.18 86)" />
              </div>
              <h3
                style={{
                  fontFamily: "'Mona Sans', system-ui, sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 900,
                  color: "white",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                DMart Crystal Mall
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "1rem",
                }}
              >
                Smart Cart Digital Receipt
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                <span>Receipt: {receiptNo}</span>
                <span>{new Date().toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Receipt body */}
            <div style={{ overflowY: "auto", flex: 1 }}>
              <div style={{ padding: "1.5rem 1.75rem" }}>
                {/* Items table */}
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid oklch(0.88 0.015 145)",
                      }}
                    >
                      {["Item", "Qty", "Unit Price", "Total"].map((h) => (
                        <th
                          key={h}
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "oklch(0.55 0.02 260)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            padding: "0 8px 10px",
                            textAlign: h === "Item" ? "left" : "right",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.product.id}
                        style={{
                          borderBottom: "1px solid oklch(0.95 0.005 145)",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px 8px",
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.85rem",
                            color: "oklch(0.16 0.07 152)",
                          }}
                        >
                          <span style={{ marginRight: "6px" }}>
                            {item.product.icon}
                          </span>
                          {item.product.name}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            textAlign: "right",
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.85rem",
                            color: "oklch(0.45 0.02 260)",
                          }}
                        >
                          {item.quantity}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            textAlign: "right",
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.85rem",
                            color: "oklch(0.45 0.02 260)",
                          }}
                        >
                          {formatCurrency(item.product.price)}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            textAlign: "right",
                            fontFamily: "'Mona Sans', system-ui, sans-serif",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "oklch(0.16 0.07 152)",
                          }}
                        >
                          {formatCurrency(item.product.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div
                  style={{
                    marginTop: "1.25rem",
                    background: "oklch(0.97 0.005 145)",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    border: "1px solid oklch(0.88 0.015 145)",
                  }}
                >
                  {[
                    { label: "Subtotal", value: formatCurrency(subtotal) },
                    { label: "GST (18%)", value: formatCurrency(gst) },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.875rem",
                          color: "oklch(0.45 0.02 260)",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.875rem",
                          color: "oklch(0.16 0.07 152)",
                          fontWeight: 600,
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      borderTop: "1.5px solid oklch(0.88 0.015 145)",
                      marginTop: "8px",
                      paddingTop: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: "oklch(0.16 0.07 152)",
                      }}
                    >
                      Grand Total
                    </span>
                    <span
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "1.3rem",
                        fontWeight: 900,
                        color: "oklch(0.32 0.11 152)",
                      }}
                    >
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div
              style={{
                padding: "1.25rem 1.75rem",
                borderTop: "1.5px solid oklch(0.88 0.015 145)",
                display: "flex",
                gap: "1rem",
              }}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                data-ocid="bill.cancel_button"
                style={{
                  flex: 1,
                  background: "transparent",
                  color: "oklch(0.32 0.11 152)",
                  border: "1.5px solid oklch(0.42 0.13 152 / 0.3)",
                  borderRadius: "10px",
                  padding: "12px",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "oklch(0.42 0.13 152 / 0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setTimeout(() => {
                    const el = document.querySelector("#checkout");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                data-ocid="bill.confirm_button"
                style={{
                  flex: 1,
                  background:
                    "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 8px 20px oklch(0.42 0.13 152 / 0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                }}
              >
                <CheckCircle2 size={16} />
                Confirm &amp; Clear
              </button>
            </div>
          </dialog>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .demo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

// ===== PAYMENT CHECKOUT SECTION =====
type PaymentMethod = "upi" | "card" | "cash";

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function PaymentCheckoutSection({
  cart,
  onPaymentComplete,
}: {
  cart: CartState;
  onPaymentComplete: () => void;
}) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [receiptNo] = useState(() => `DMT-${Date.now().toString().slice(-8)}`);
  const [paymentTime] = useState(() => new Date());

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const GST_RATE = 0.18;
  const gstAmount = subtotal * GST_RATE;
  const grandTotal = subtotal + gstAmount;
  const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const el of entry.target.querySelectorAll(".reveal")) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePay = () => {
    setPaymentDone(true);
    onPaymentComplete();
  };

  const methodButtons: {
    method: PaymentMethod;
    icon: React.ReactNode;
    label: string;
  }[] = [
    { method: "upi", icon: <Smartphone size={20} />, label: "UPI" },
    { method: "card", icon: <CreditCard size={20} />, label: "Card" },
    { method: "cash", icon: <Banknote size={20} />, label: "Cash" },
  ];

  return (
    <>
      <section
        id="checkout"
        ref={sectionRef}
        data-ocid="checkout.section"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.07 152) 0%, oklch(0.22 0.09 152) 50%, oklch(0.18 0.08 152) 100%)",
          padding: "6rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          className="grid-overlay"
          style={{ position: "absolute", inset: 0, opacity: 0.4 }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Queue-free banner */}
          <div
            className="reveal"
            style={{
              background: "oklch(0.82 0.18 86 / 0.12)",
              border: "1px solid oklch(0.82 0.18 86 / 0.35)",
              borderRadius: "12px",
              padding: "12px 20px",
              marginBottom: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Zap size={18} color="oklch(0.82 0.18 86)" />
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "oklch(0.82 0.18 86)",
              }}
            >
              Queue-Free Checkout Innovation
            </span>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              · Scan. Pay. Walk out. No queues, no waiting — powered by C2P
              Smart Cart technology.
            </span>
          </div>

          {/* Section heading */}
          <div
            className="reveal"
            style={{
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <span
              style={{
                background: "oklch(0.82 0.18 86 / 0.15)",
                color: "oklch(0.82 0.18 86)",
                border: "1px solid oklch(0.82 0.18 86 / 0.3)",
                borderRadius: "100px",
                padding: "4px 16px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: "1rem",
              }}
            >
              Complete Your Purchase
            </span>
            <h2
              style={{
                fontFamily:
                  "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.03em",
                marginBottom: "0.75rem",
              }}
            >
              Smart Checkout
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "460px",
                lineHeight: 1.7,
                margin: "0 auto",
              }}
            >
              Choose your preferred payment method and complete checkout in
              seconds — no cashier needed.
            </p>
          </div>

          {/* Two-column layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
            className="checkout-grid"
          >
            {/* LEFT: Order Summary */}
            <div
              className="reveal"
              style={{
                background: "white",
                borderRadius: "20px",
                border: "1.5px solid oklch(0.88 0.015 145)",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
              }}
            >
              {/* Summary header */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                  padding: "1.25rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <ShoppingCart size={20} color="white" />
                <span
                  style={{
                    fontFamily: "'Mona Sans', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  Order Summary
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    background: "oklch(0.82 0.18 86)",
                    color: "oklch(0.16 0.07 152)",
                    borderRadius: "100px",
                    padding: "2px 10px",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                  }}
                >
                  {totalItemCount} item{totalItemCount !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Cart items list */}
              <div style={{ padding: "1.25rem 1.75rem" }}>
                {cartItems.length === 0 ? (
                  <div
                    data-ocid="checkout.empty_state"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2rem 1rem",
                      gap: "0.75rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "oklch(0.42 0.13 152 / 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ShoppingBag
                        size={28}
                        color="oklch(0.42 0.13 152)"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "oklch(0.16 0.07 152)",
                        margin: 0,
                      }}
                    >
                      Cart is empty
                    </p>
                    <p
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.82rem",
                        color: "oklch(0.55 0.02 260)",
                        margin: 0,
                      }}
                    >
                      Scan products in the demo above to add items
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {cartItems.map((item, idx) => (
                      <div
                        key={item.product.id}
                        data-ocid={`checkout.item.${idx + 1}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          background: "oklch(0.97 0.005 145)",
                          border: "1px solid oklch(0.92 0.01 145)",
                        }}
                      >
                        <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>
                          {item.product.icon}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontFamily:
                                "'Plus Jakarta Sans', system-ui, sans-serif",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: "oklch(0.16 0.07 152)",
                            }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            style={{
                              fontFamily:
                                "'Plus Jakarta Sans', system-ui, sans-serif",
                              fontSize: "0.72rem",
                              color: "oklch(0.55 0.02 260)",
                            }}
                          >
                            Qty: {item.quantity} ×{" "}
                            {formatCurrency(item.product.price)}
                          </div>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Mona Sans', system-ui, sans-serif",
                            fontSize: "0.9rem",
                            fontWeight: 800,
                            color: "oklch(0.32 0.11 152)",
                            flexShrink: 0,
                          }}
                        >
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {cartItems.length > 0 && (
                  <>
                    {/* Divider */}
                    <div
                      style={{
                        height: "1.5px",
                        background: "oklch(0.88 0.015 145)",
                        margin: "1.25rem 0",
                      }}
                    />

                    {/* Price breakdown */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.875rem",
                            color: "oklch(0.45 0.02 260)",
                          }}
                        >
                          Subtotal (before GST)
                        </span>
                        <span
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.875rem",
                            color: "oklch(0.45 0.02 260)",
                            fontWeight: 600,
                          }}
                        >
                          {formatCurrency(subtotal)}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.875rem",
                            color: "oklch(0.45 0.02 260)",
                          }}
                        >
                          GST (18%)
                        </span>
                        <span
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "oklch(0.577 0.245 27.325)",
                          }}
                        >
                          +{formatCurrency(gstAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Grand total */}
                    <div
                      style={{
                        background: "oklch(0.42 0.13 152 / 0.06)",
                        border: "2px solid oklch(0.42 0.13 152 / 0.2)",
                        borderRadius: "14px",
                        padding: "1rem 1.25rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.75rem",
                            color: "oklch(0.45 0.02 260)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginBottom: "2px",
                          }}
                        >
                          Grand Total
                        </div>
                        <div
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.7rem",
                            color: "oklch(0.55 0.02 260)",
                          }}
                        >
                          Subtotal + GST
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Mona Sans', system-ui, sans-serif",
                          fontSize: "2rem",
                          fontWeight: 900,
                          color: "oklch(0.35 0.13 152)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {formatCurrency(grandTotal)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT: Payment Panel */}
            <div
              className="reveal reveal-delay-2"
              style={{
                background: "white",
                borderRadius: "20px",
                border: "1.5px solid oklch(0.88 0.015 145)",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
              }}
            >
              {/* Payment header */}
              <div
                style={{
                  padding: "1.5rem 1.75rem 0",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Mona Sans', system-ui, sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 900,
                    color: "oklch(0.16 0.07 152)",
                    letterSpacing: "-0.02em",
                    marginBottom: "1.25rem",
                  }}
                >
                  Choose Payment Method
                </h3>

                {/* Method selector */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "8px",
                    marginBottom: "1.5rem",
                  }}
                >
                  {methodButtons.map(({ method, icon, label }) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setSelectedMethod(method)}
                      data-ocid={`checkout.${method}_tab`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                        padding: "14px 8px",
                        borderRadius: "12px",
                        border:
                          selectedMethod === method
                            ? "2px solid oklch(0.42 0.13 152)"
                            : "1.5px solid oklch(0.88 0.015 145)",
                        background:
                          selectedMethod === method
                            ? "oklch(0.42 0.13 152 / 0.07)"
                            : "white",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        color:
                          selectedMethod === method
                            ? "oklch(0.35 0.13 152)"
                            : "oklch(0.45 0.02 260)",
                      }}
                    >
                      <span
                        style={{
                          color:
                            selectedMethod === method
                              ? "oklch(0.42 0.13 152)"
                              : "oklch(0.55 0.02 260)",
                        }}
                      >
                        {icon}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "oklch(0.91 0.01 145)",
                    marginBottom: "1.5rem",
                  }}
                />
              </div>

              {/* Method panels */}
              <div style={{ padding: "0 1.75rem 1.75rem" }}>
                {/* UPI Panel */}
                {selectedMethod === "upi" && (
                  <div>
                    {/* QR code — dynamic based on cart total */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div
                        style={{
                          padding: "12px",
                          background: "white",
                          border: "2px solid oklch(0.88 0.015 145)",
                          borderRadius: "16px",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                          display: "inline-block",
                          position: "relative",
                        }}
                      >
                        {grandTotal > 0 ? (
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=dmart@upi&pn=DMart+Crystal+Mall&am=${grandTotal.toFixed(2)}&cu=INR&tn=DMart+Smart+Cart+Purchase`)}`}
                            alt={`UPI QR Code for ${formatCurrency(grandTotal)}`}
                            style={{
                              width: "180px",
                              height: "180px",
                              display: "block",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "180px",
                              height: "180px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              background: "oklch(0.97 0.005 145)",
                              borderRadius: "8px",
                            }}
                          >
                            <QrCode
                              size={40}
                              color="oklch(0.75 0.01 145)"
                              strokeWidth={1}
                            />
                            <span
                              style={{
                                fontFamily:
                                  "'Plus Jakarta Sans', system-ui, sans-serif",
                                fontSize: "0.72rem",
                                color: "oklch(0.55 0.02 260)",
                                textAlign: "center",
                                padding: "0 12px",
                              }}
                            >
                              Add items to cart to generate QR
                            </span>
                          </div>
                        )}
                        {grandTotal > 0 && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "-12px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              background: "oklch(0.42 0.13 152)",
                              color: "white",
                              borderRadius: "100px",
                              padding: "3px 12px",
                              fontFamily: "'Mona Sans', system-ui, sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: 800,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatCurrency(grandTotal)}
                          </div>
                        )}
                      </div>
                      <p
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.78rem",
                          color: "oklch(0.55 0.02 260)",
                          marginTop: grandTotal > 0 ? "20px" : "8px",
                          textAlign: "center",
                        }}
                      >
                        Scan with any UPI app — PhonePe, GPay, Paytm
                      </p>
                    </div>

                    {/* OR divider */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: "1px",
                          background: "oklch(0.88 0.015 145)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "oklch(0.55 0.02 260)",
                          flexShrink: 0,
                        }}
                      >
                        OR ENTER UPI ID
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: "1px",
                          background: "oklch(0.88 0.015 145)",
                        }}
                      />
                    </div>

                    {/* UPI ID input */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        border: "1.5px solid oklch(0.88 0.015 145)",
                        borderRadius: "10px",
                        padding: "0 14px",
                        background: "oklch(0.98 0.003 145)",
                        marginBottom: "1rem",
                        transition: "border-color 0.2s",
                      }}
                      onFocusCapture={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          "oklch(0.42 0.13 152)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 0 0 3px oklch(0.42 0.13 152 / 0.12)";
                      }}
                      onBlurCapture={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          "oklch(0.88 0.015 145)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "none";
                      }}
                    >
                      <Smartphone
                        size={16}
                        color="oklch(0.55 0.02 260)"
                        style={{ flexShrink: 0 }}
                      />
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        data-ocid="checkout.upi_input"
                        autoComplete="off"
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.9rem",
                          color: "oklch(0.16 0.07 152)",
                          padding: "12px 0",
                        }}
                      />
                    </div>

                    {/* Info message */}
                    <div
                      style={{
                        background: "oklch(0.96 0.015 220)",
                        border: "1px solid oklch(0.78 0.05 220)",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <span style={{ fontSize: "0.85rem", flexShrink: 0 }}>
                        ℹ️
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.8rem",
                          color: "oklch(0.35 0.08 220)",
                          lineHeight: 1.5,
                        }}
                      >
                        Payment updates instantly after successful transaction.
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handlePay}
                      data-ocid="checkout.pay_button"
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        padding: "15px",
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(-2px)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "0 10px 28px oklch(0.42 0.13 152 / 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(0)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "none";
                      }}
                    >
                      <Smartphone size={18} />
                      Pay Now — {formatCurrency(grandTotal)}
                    </button>
                  </div>
                )}

                {/* Card Panel */}
                {selectedMethod === "card" && (
                  <div>
                    {/* Secure badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "oklch(0.42 0.13 152 / 0.07)",
                        border: "1px solid oklch(0.42 0.13 152 / 0.25)",
                        borderRadius: "8px",
                        padding: "8px 14px",
                        marginBottom: "1.25rem",
                        width: "fit-content",
                      }}
                    >
                      <Lock size={14} color="oklch(0.42 0.13 152)" />
                      <span
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "oklch(0.35 0.13 152)",
                        }}
                      >
                        Secure Payment · 256-bit SSL
                      </span>
                    </div>

                    {/* Card number */}
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        htmlFor="checkout-card-number"
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "oklch(0.45 0.02 260)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        Card Number
                      </label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          border: "1.5px solid oklch(0.88 0.015 145)",
                          borderRadius: "10px",
                          padding: "0 14px",
                          background: "oklch(0.98 0.003 145)",
                          transition: "border-color 0.2s",
                        }}
                        onFocusCapture={(e) => {
                          (
                            e.currentTarget as HTMLDivElement
                          ).style.borderColor = "oklch(0.42 0.13 152)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow =
                            "0 0 0 3px oklch(0.42 0.13 152 / 0.12)";
                        }}
                        onBlurCapture={(e) => {
                          (
                            e.currentTarget as HTMLDivElement
                          ).style.borderColor = "oklch(0.88 0.015 145)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow =
                            "none";
                        }}
                      >
                        <CreditCard
                          size={16}
                          color="oklch(0.55 0.02 260)"
                          style={{ flexShrink: 0 }}
                        />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(formatCardNumber(e.target.value))
                          }
                          id="checkout-card-number"
                          placeholder="•••• •••• •••• ••••"
                          data-ocid="checkout.card_number_input"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          maxLength={19}
                          style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontFamily:
                              "'Plus Jakarta Sans', monospace, sans-serif",
                            fontSize: "0.95rem",
                            letterSpacing: "0.05em",
                            color: "oklch(0.16 0.07 152)",
                            padding: "12px 0",
                          }}
                        />
                      </div>
                    </div>

                    {/* Expiry + CVV row */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          htmlFor="checkout-expiry"
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "oklch(0.45 0.02 260)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            display: "block",
                            marginBottom: "6px",
                          }}
                        >
                          Expiry
                        </label>
                        <input
                          id="checkout-expiry"
                          type="text"
                          value={expiry}
                          onChange={(e) =>
                            setExpiry(formatExpiry(e.target.value))
                          }
                          placeholder="MM/YY"
                          data-ocid="checkout.expiry_input"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          maxLength={5}
                          style={{
                            width: "100%",
                            border: "1.5px solid oklch(0.88 0.015 145)",
                            borderRadius: "10px",
                            padding: "12px 14px",
                            background: "oklch(0.98 0.003 145)",
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.9rem",
                            color: "oklch(0.16 0.07 152)",
                            outline: "none",
                            transition: "border-color 0.2s",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "oklch(0.42 0.13 152)";
                            e.target.style.boxShadow =
                              "0 0 0 3px oklch(0.42 0.13 152 / 0.12)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor =
                              "oklch(0.88 0.015 145)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="checkout-cvv"
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "oklch(0.45 0.02 260)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            display: "block",
                            marginBottom: "6px",
                          }}
                        >
                          CVV
                        </label>
                        <input
                          id="checkout-cvv"
                          type="password"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(
                              e.target.value.replace(/\D/g, "").slice(0, 4),
                            )
                          }
                          placeholder="•••"
                          data-ocid="checkout.cvv_input"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          maxLength={4}
                          style={{
                            width: "100%",
                            border: "1.5px solid oklch(0.88 0.015 145)",
                            borderRadius: "10px",
                            padding: "12px 14px",
                            background: "oklch(0.98 0.003 145)",
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                            fontSize: "0.9rem",
                            color: "oklch(0.16 0.07 152)",
                            outline: "none",
                            transition: "border-color 0.2s",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "oklch(0.42 0.13 152)";
                            e.target.style.boxShadow =
                              "0 0 0 3px oklch(0.42 0.13 152 / 0.12)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor =
                              "oklch(0.88 0.015 145)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>
                    </div>

                    {/* Name on card */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        htmlFor="checkout-card-name"
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "oklch(0.45 0.02 260)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        Name on Card
                      </label>
                      <input
                        id="checkout-card-name"
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Full name as on card"
                        data-ocid="checkout.card_name_input"
                        autoComplete="cc-name"
                        style={{
                          width: "100%",
                          border: "1.5px solid oklch(0.88 0.015 145)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          background: "oklch(0.98 0.003 145)",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.9rem",
                          color: "oklch(0.16 0.07 152)",
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "oklch(0.42 0.13 152)";
                          e.target.style.boxShadow =
                            "0 0 0 3px oklch(0.42 0.13 152 / 0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "oklch(0.88 0.015 145)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handlePay}
                      data-ocid="checkout.pay_button"
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        padding: "15px",
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(-2px)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "0 10px 28px oklch(0.42 0.13 152 / 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(0)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "none";
                      }}
                    >
                      <Lock size={18} />
                      Pay Now — {formatCurrency(grandTotal)}
                    </button>
                  </div>
                )}

                {/* Cash Panel */}
                {selectedMethod === "cash" && (
                  <div style={{ textAlign: "center" }}>
                    {/* Store icon */}
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "oklch(0.42 0.13 152 / 0.1)",
                        border: "2px solid oklch(0.42 0.13 152 / 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.25rem",
                      }}
                    >
                      <MapPin size={36} color="oklch(0.42 0.13 152)" />
                    </div>

                    <h4
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 800,
                        color: "oklch(0.16 0.07 152)",
                        letterSpacing: "-0.01em",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Pay at Exit Counter
                    </h4>
                    <p
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                        color: "oklch(0.45 0.02 260)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Please proceed to the exit counter to complete your
                      payment.
                    </p>
                    <div
                      style={{
                        background: "oklch(0.97 0.005 145)",
                        border: "1px solid oklch(0.88 0.015 145)",
                        borderRadius: "10px",
                        padding: "10px 16px",
                        marginBottom: "0.75rem",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.82rem",
                          color: "oklch(0.45 0.02 260)",
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        📋 Keep your digital bill ready for scanning at the
                        counter.
                      </p>
                    </div>
                    <div
                      style={{
                        background: "oklch(0.97 0.005 145)",
                        border: "1px solid oklch(0.88 0.015 145)",
                        borderRadius: "10px",
                        padding: "10px 16px",
                        marginBottom: "1.5rem",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontSize: "0.82rem",
                          color: "oklch(0.45 0.02 260)",
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        👮 Our staff will verify your cart and process payment.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handlePay}
                      data-ocid="checkout.cash_confirm_button"
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        padding: "15px",
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(-2px)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "0 10px 28px oklch(0.42 0.13 152 / 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(0)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "none";
                      }}
                    >
                      <MapPin size={18} />
                      Confirm – Pay at Counter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .checkout-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* Payment Success Overlay */}
      {paymentDone && (
        <div
          data-ocid="checkout.success_state"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "oklch(0.98 0.015 145)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            overflow: "hidden",
          }}
        >
          {/* Confetti particles */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static decorative particles
                key={i}
                style={{
                  position: "absolute",
                  width: `${6 + (i % 4) * 4}px`,
                  height: `${6 + (i % 3) * 3}px`,
                  borderRadius: i % 3 === 0 ? "50%" : "2px",
                  background:
                    i % 3 === 0
                      ? "oklch(0.82 0.18 86)"
                      : i % 3 === 1
                        ? "oklch(0.42 0.13 152)"
                        : "oklch(0.65 0.18 152)",
                  left: `${5 + ((i * 17) % 92)}%`,
                  top: `${(i * 13) % 40}%`,
                  opacity: 0.6 + (i % 4) * 0.1,
                  animation: `confettiFall ${2 + (i % 3)}s linear ${(i * 0.15) % 1.5}s infinite`,
                  transform: `rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>

          {/* Content card */}
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "3rem 2.5rem",
              maxWidth: "480px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 40px 80px rgba(0,0,0,0.12)",
              border: "1.5px solid oklch(0.88 0.015 145)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Animated checkmark */}
            <div
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.55 0.15 152))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                animation:
                  "checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                boxShadow: "0 12px 32px oklch(0.42 0.13 152 / 0.35)",
              }}
            >
              <CheckCircle2 size={44} color="white" strokeWidth={2.5} />
            </div>

            <h2
              style={{
                fontFamily: "'Mona Sans', system-ui, sans-serif",
                fontSize: "2rem",
                fontWeight: 900,
                color: "oklch(0.35 0.13 152)",
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
              }}
            >
              Payment Successful!
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "1rem",
                color: "oklch(0.45 0.02 260)",
                lineHeight: 1.6,
                marginBottom: "1.75rem",
              }}
            >
              Thank you for shopping with DMart.
            </p>

            {/* Receipt info */}
            <div
              style={{
                background: "oklch(0.97 0.005 145)",
                border: "1px solid oklch(0.88 0.015 145)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                marginBottom: "1.25rem",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.78rem",
                    color: "oklch(0.55 0.02 260)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Receipt
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', monospace, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "oklch(0.32 0.11 152)",
                  }}
                >
                  {receiptNo}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.78rem",
                    color: "oklch(0.55 0.02 260)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Date & Time
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "oklch(0.32 0.11 152)",
                  }}
                >
                  {paymentTime.toLocaleString("en-IN")}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.78rem",
                    color: "oklch(0.55 0.02 260)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Amount Paid
                </span>
                <span
                  style={{
                    fontFamily: "'Mona Sans', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 900,
                    color: "oklch(0.32 0.11 152)",
                  }}
                >
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

            {/* Queue-free badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "oklch(0.97 0.09 86)",
                border: "1.5px solid oklch(0.82 0.18 86 / 0.5)",
                borderRadius: "100px",
                padding: "6px 18px",
                marginBottom: "2rem",
              }}
            >
              <Zap size={14} color="oklch(0.55 0.18 86)" />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "oklch(0.45 0.15 86)",
                }}
              >
                Queue-Free Checkout Complete
              </span>
            </div>

            <button
              type="button"
              onClick={() => setPaymentDone(false)}
              data-ocid="checkout.success_close_button"
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.32 0.11 152))",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "15px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 10px 28px oklch(0.42 0.13 152 / 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <ShoppingCart size={18} />
              Done — Continue Shopping
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes checkPop {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}

// Benefits Section — Customers Only
function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const el of entry.target.querySelectorAll(".reveal")) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      style={{
        background: "oklch(0.97 0.005 145)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "4rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              background: "oklch(0.42 0.13 152 / 0.1)",
              color: "oklch(0.42 0.13 152)",
              border: "1px solid oklch(0.42 0.13 152 / 0.3)",
              borderRadius: "100px",
              padding: "4px 16px",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Value Proposition
          </span>
          <h2
            style={{
              fontFamily:
                "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "oklch(0.16 0.07 152)",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
          >
            Better Shopping Experience
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "1.05rem",
              color: "oklch(0.45 0.02 260)",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            Smart Cart makes every shopping trip faster, smarter, and
            stress-free
          </p>
        </div>

        {/* Single customer card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          {/* For Customers */}
          <div
            className="reveal"
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "2.5rem",
              border: "1.5px solid oklch(0.88 0.015 145)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "oklch(0.42 0.13 152 / 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={26} color="oklch(0.42 0.13 152)" />
              </div>
              <h3
                style={{
                  fontFamily: "'Mona Sans', system-ui, sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "oklch(0.16 0.07 152)",
                  letterSpacing: "-0.02em",
                }}
              >
                For Customers
              </h3>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
              }}
              className="benefits-inner-grid"
            >
              {CUSTOMER_BENEFITS.map((b) => (
                <div
                  key={b.title}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "oklch(0.42 0.13 152 / 0.1)",
                      border: "1.5px solid oklch(0.42 0.13 152 / 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <CheckCircle2 size={14} color="oklch(0.42 0.13 152)" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Mona Sans', system-ui, sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: 800,
                        color: "oklch(0.16 0.07 152)",
                        marginBottom: "3px",
                      }}
                    >
                      {b.title}
                    </div>
                    <div
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: "0.82rem",
                        color: "oklch(0.45 0.02 260)",
                        lineHeight: 1.6,
                      }}
                    >
                      {b.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .benefits-inner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// Team / Project Section (team members removed, project details only)
function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const el of entry.target.querySelectorAll(".reveal")) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      style={{
        background: "white",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* About Project */}
        <div
          className="reveal"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.09 152), oklch(0.30 0.12 152))",
            borderRadius: "24px",
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
            position: "relative",
            overflow: "hidden",
          }}
          id="contact"
        >
          {/* Pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 20% 80%, oklch(0.55 0.15 152 / 0.15) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              style={{
                fontFamily: "'Mona Sans', system-ui, sans-serif",
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              About This Project
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.7)",
                marginBottom: "1rem",
              }}
            >
              DMart Crystal Mall Smart Cart is a{" "}
              <strong style={{ color: "oklch(0.82 0.18 86)" }}>
                C2P (Concept to Practice)
              </strong>{" "}
              innovation project designed to modernize the retail checkout
              experience at DMart Crystal Mall.
            </p>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              This project bridges the gap between traditional retail and smart
              technology by equipping shopping carts with barcode scanners,
              real-time billing displays, and contactless payment capabilities —
              eliminating checkout queues entirely.
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h4
              style={{
                fontFamily: "'Mona Sans', system-ui, sans-serif",
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "oklch(0.82 0.18 86)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Project Details
            </h4>
            {[
              { label: "Institution", value: "Atmiya University" },
              { label: "Department", value: "Department Of Management" },
              { label: "Academic Year", value: "2025-26" },
              { label: "Project Guide", value: "Ms. Devanshi Dave" },
              { label: "C2P", value: "Concept to Practice" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "oklch(0.82 0.18 86)",
                    flexShrink: 0,
                    marginTop: "7px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "2px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// Footer
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.065 152), oklch(0.18 0.08 152))",
        color: "white",
        padding: "4rem 1.5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "1rem",
              }}
            >
              <img
                src="/assets/uploads/image-1.png"
                alt="DMart"
                style={{ height: "40px", objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
                marginBottom: "1rem",
                maxWidth: "280px",
              }}
            >
              A C2P smart retail checkout innovation for DMart Crystal Mall —
              making shopping smarter, faster, and queue-free.
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid oklch(0.82 0.18 86 / 0.4)",
                borderRadius: "100px",
                padding: "4px 12px",
                color: "oklch(0.82 0.18 86)",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              <Star size={10} fill="oklch(0.82 0.18 86)" />
              College Innovation Project
            </span>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontFamily: "'Mona Sans', system-ui, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "oklch(0.82 0.18 86)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Quick Links
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.55)";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div>
            <h4
              style={{
                fontFamily: "'Mona Sans', system-ui, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "oklch(0.82 0.18 86)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Project Info
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {[
                "DMart Crystal Mall",
                "C2P Innovation System",
                "Academic Year 2025-26",
                "Smart Retail Technology",
                "Atmiya University",
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "oklch(1 0 0 / 0.08)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
          className="footer-bottom"
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            © {year} DMart Crystal Mall Smart Cart. College Innovation Project.
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Developed with ♥ for innovation in retail technology.{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.5)";
              }}
            >
              Built with caffeine.ai
            </a>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}

// ===== APP ROOT =====
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Lifted cart state so checkout can read the actual scanned items
  const [sharedCart, setSharedCart] = useState<CartState>({});
  // Payment must be completed before bill can be generated
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Meta tags */}
      <title>DMart Crystal Mall Smart Cart — C2P Innovation</title>

      <Navbar
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <BarcodeScannerSection cart={sharedCart} setCart={setSharedCart} />
        <DemoSection
          cart={sharedCart}
          setCart={setSharedCart}
          paymentCompleted={paymentCompleted}
        />
        <PaymentCheckoutSection
          cart={sharedCart}
          onPaymentComplete={() => setPaymentCompleted(true)}
        />
        <BenefitsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
