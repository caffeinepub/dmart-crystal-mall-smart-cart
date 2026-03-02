import {
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  FileText,
  Menu,
  Minus,
  Monitor,
  Palette,
  Plus,
  QrCode,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Star,
  Store,
  Trash2,
  User,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ===== TYPES =====
interface Product {
  id: number;
  name: string;
  barcode: string;
  price: number;
  icon: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

type CartState = Record<number, CartItem>;

// ===== DATA =====
const PRODUCTS: Product[] = [
  { id: 1, name: "Atta 5kg", barcode: "8901030814052", price: 249, icon: "🌾" },
  {
    id: 2,
    name: "Toor Dal 1kg",
    barcode: "8906063010012",
    price: 159,
    icon: "🫘",
  },
  { id: 3, name: "Rice 5kg", barcode: "8902102300016", price: 299, icon: "🍚" },
  {
    id: 4,
    name: "Sunflower Oil 1L",
    barcode: "8901725124038",
    price: 189,
    icon: "🌻",
  },
  {
    id: 5,
    name: "Biscuits Pack",
    barcode: "8901719112027",
    price: 35,
    icon: "🍪",
  },
  { id: 6, name: "Milk 1L", barcode: "8902884000012", price: 68, icon: "🥛" },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Benefits", href: "#benefits" },
  { label: "Team", href: "#team" },
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

const RETAILER_BENEFITS = [
  {
    title: "Reduce Cashier Load",
    desc: "Fewer billing counters needed, freeing staff for better service.",
  },
  {
    title: "Faster Throughput",
    desc: "Process more customers per hour with streamlined checkout.",
  },
  {
    title: "Digital Records",
    desc: "Automatic transaction logs for auditing and inventory management.",
  },
  {
    title: "Better Customer UX",
    desc: "Modern tech attracts and retains tech-savvy shoppers.",
  },
];

const TEAM_MEMBERS = [
  {
    icon: User,
    name: "Team Member 1",
    role: "Project Lead",
    dept: "Dept. of Computer Science",
    color: "from-green-700 to-green-900",
  },
  {
    icon: Cpu,
    name: "Team Member 2",
    role: "Hardware Developer",
    dept: "Dept. of Electronics & Communication",
    color: "from-emerald-700 to-emerald-900",
  },
  {
    icon: Code2,
    name: "Team Member 3",
    role: "Software Developer",
    dept: "Dept. of Computer Science",
    color: "from-teal-700 to-teal-900",
  },
  {
    icon: Palette,
    name: "Team Member 4",
    role: "UI/UX Designer",
    dept: "Dept. of Information Technology",
    color: "from-green-600 to-green-800",
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
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "oklch(0.42 0.13 152)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ShoppingCart size={22} color="white" />
            </div>
            <span
              style={{
                fontFamily:
                  "'Mona Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                fontSize: "1.35rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "white" }}>Smart</span>
              <span style={{ color: "oklch(0.82 0.18 86)" }}>Cart</span>
            </span>
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
            <ShoppingCart size={28} color="oklch(0.82 0.18 86)" />
            <span
              style={{
                fontFamily: "'Mona Sans', system-ui, sans-serif",
                fontSize: "1.5rem",
                fontWeight: 800,
              }}
            >
              <span style={{ color: "white" }}>Smart</span>
              <span style={{ color: "oklch(0.82 0.18 86)" }}>Cart</span>
            </span>
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
            — a C2P (Customer-to-Process) innovation that transforms how you
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

// Interactive Demo Section
function DemoSection() {
  const [cart, setCart] = useState<CartState>({});
  const [scanningId, setScanningId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [receiptNo] = useState(() => generateReceiptNo());
  const [newlyAddedId, setNewlyAddedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
    [scanningId],
  );

  const updateQty = useCallback((id: number, delta: number) => {
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
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
    setShowModal(false);
  }, []);

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
                    marginLeft: "auto",
                    background: "oklch(0.42 0.13 152 / 0.3)",
                    color: "oklch(0.7 0.2 152)",
                    borderRadius: "100px",
                    padding: "2px 10px",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                  }}
                >
                  ACTIVE
                </span>
              </div>

              {/* Scan window */}
              <div
                style={{
                  border: "2px solid oklch(0.42 0.13 152 / 0.4)",
                  borderRadius: "12px",
                  height: "90px",
                  position: "relative",
                  overflow: "hidden",
                  background: "oklch(0.08 0.04 152 / 0.5)",
                  marginBottom: "1.5rem",
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
                  }}
                />
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
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
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
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
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
                <button
                  type="button"
                  onClick={() => cartItems.length > 0 && setShowModal(true)}
                  disabled={cartItems.length === 0}
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
                  <Receipt size={18} />
                  Generate Bill
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
                onClick={clearCart}
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

// Benefits Section
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
            Win-Win for Everyone
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
            Smart Cart transforms the retail experience for both shoppers and
            store owners
          </p>
        </div>

        {/* Two cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
          className="benefits-grid"
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
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
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

          {/* For Retailers */}
          <div
            className="reveal reveal-delay-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.32 0.11 152), oklch(0.22 0.09 152))",
              borderRadius: "20px",
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Pattern overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, oklch(0.55 0.15 152 / 0.15) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
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
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Store size={26} color="oklch(0.82 0.18 86)" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Mona Sans', system-ui, sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  For Retailers
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {RETAILER_BENEFITS.map((b) => (
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
                        background: "oklch(0.82 0.18 86 / 0.2)",
                        border: "1.5px solid oklch(0.82 0.18 86 / 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <CheckCircle2 size={14} color="oklch(0.82 0.18 86)" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Mona Sans', system-ui, sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 800,
                          color: "white",
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
                          color: "rgba(255,255,255,0.6)",
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
      </div>

      <style>{`
        @media (max-width: 768px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// Team Section
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
            The Innovators
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
            Meet the Team
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
            Students driving innovation in retail technology
          </p>
        </div>

        {/* Team cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
          className="team-grid"
        >
          {TEAM_MEMBERS.map((member, i) => {
            const Icon = member.icon;
            return (
              <div
                key={member.name}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "2rem 1.5rem",
                  border: "1.5px solid oklch(0.88 0.015 145)",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-8px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 20px 40px oklch(0.42 0.13 152 / 0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, oklch(0.42 0.13 152), oklch(0.22 0.09 152))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    border: "3px solid transparent",
                    outline: "2px solid oklch(0.88 0.015 145)",
                    outlineOffset: "2px",
                    transition: "outline-color 0.3s",
                  }}
                  className="team-avatar"
                >
                  <Icon size={32} color="white" />
                </div>
                <h4
                  style={{
                    fontFamily: "'Mona Sans', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "oklch(0.16 0.07 152)",
                    marginBottom: "4px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {member.name}
                </h4>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "oklch(0.42 0.13 152)",
                    marginBottom: "6px",
                  }}
                >
                  {member.role}
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    color: "oklch(0.55 0.02 260)",
                    lineHeight: 1.5,
                  }}
                >
                  {member.dept}
                </div>
              </div>
            );
          })}
        </div>

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
                C2P (Customer-to-Process)
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
              { label: "Institution", value: "[College Name]" },
              { label: "Department", value: "[Department Name]" },
              { label: "Academic Year", value: "2024–25" },
              { label: "Project Guide", value: "[Guide / Mentor Name]" },
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
        @media (max-width: 900px) {
          .team-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .team-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          #contact > div:nth-child(3), #contact > div:nth-child(4) {
            grid-column: span 2;
          }
        }
        .team-avatar:hover {
          outline-color: oklch(0.82 0.18 86) !important;
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
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "oklch(0.42 0.13 152)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingCart size={22} color="white" />
              </div>
              <span
                style={{
                  fontFamily: "'Mona Sans', system-ui, sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                <span style={{ color: "white" }}>Smart</span>
                <span style={{ color: "oklch(0.82 0.18 86)" }}>Cart</span>
              </span>
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
                "Academic Year 2024–25",
                "Smart Retail Technology",
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
        <DemoSection />
        <BenefitsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
