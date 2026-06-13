import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";

import {
  MdFlightTakeoff,
  MdApproval,
  MdReceiptLong,
  MdAdminPanelSettings,
  MdTrendingUp,
  MdSecurity,
} from "react-icons/md";
import {
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { BsBuildings, BsPeopleFill, BsShieldCheck } from "react-icons/bs";
import { RiFlightTakeoffLine } from "react-icons/ri";

const FEATURES = [
  {
    icon: <MdApproval size={26} />,
    title: "Multi-Level Approval Matrix",
    desc: "Transparent, role-based validation across manager, HR, and finance — every request tracked end-to-end.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <MdFlightTakeoff size={26} />,
    title: "Smart Travel Requests",
    desc: "Submit domestic or international trips in minutes. Attach itineraries, auto-notify approvers instantly.",
    color: "from-violet-500 to-violet-700",
  },
  {
    icon: <MdReceiptLong size={26} />,
    title: "Vendor Ticket & Bills",
    desc: "Vendors upload tickets and bills directly. Finance teams verify and close the loop — zero email chaos.",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    icon: <MdAdminPanelSettings size={26} />,
    title: "Role-Based Access Control",
    desc: "Employee, Manager, HR, Finance, Vendor — each sees exactly what they need. Nothing more.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: <MdTrendingUp size={26} />,
    title: "Real-Time Status Tracking",
    desc: "Live dashboards for pending, approved, and rejected requests. No more chasing status over Slack.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: <MdSecurity size={26} />,
    title: "Secure & Auditable",
    desc: "JWT-secured sessions, encrypted data, and a full audit trail. Enterprise-grade without the complexity.",
    color: "from-slate-600 to-slate-800",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Submit a Request",
    desc: "Employee fills a travel form — destination, dates, travelers, and purpose. Submitted in under 2 minutes.",
  },
  {
    num: "02",
    title: "Approvals Flow Automatically",
    desc: "Manager, HR, and Finance are notified in sequence. Each approves or rejects with a single click.",
  },
  {
    num: "03",
    title: "Vendor & Finance Close the Loop",
    desc: "Vendors upload tickets. Finance marks payment. Everyone sees the final status on their dashboard.",
  },
];

const STATS = [
  { value: "3×", label: "Faster approvals vs email" },
  { value: "100%", label: "Approvals" },
  { value: "5", label: "Roles, zero overlap" },
  { value: "0", label: "Spreadsheets needed" },
];

// Short list shown as little check-mark badges under the hero text.
const TRUST_BADGES = [
  "Multi-level approvals",
  "Role-based access",
  "Vendor management",
  "Finance tracking",
];

// The five role cards in the "one system, five roles" section.
const ROLES = [
  {
    icon: <BsPeopleFill size={22} />,
    role: "Employee",
    desc: "Submit requests",
  },
  { icon: <BsBuildings size={22} />, role: "Manager", desc: "First approval" },
  { icon: <BsShieldCheck size={22} />, role: "HR", desc: "Policy check" },
  {
    icon: <MdReceiptLong size={22} />,
    role: "Finance",
    desc: "Payment sign-off",
  },
  {
    icon: <RiFlightTakeoffLine size={22} />,
    role: "Vendor",
    desc: "Upload tickets",
  },
];

// Navbar
function Navbar({ scrolled, onGetStarted }) {
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo + name on the left */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Travel Desk"
            className="w-9 h-9 rounded-lg object-contain bg-white p-1"
          />
          <span
            className={`text-base font-semibold tracking-tight transition-colors ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Travel Desk
          </span>
        </div>

        {/* Button on the right */}
        <button
          onClick={onGetStarted}
          className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-all shadow-sm hover:shadow-blue-600/30 hover:shadow-md"
        >
          Get started
        </button>
      </div>
    </nav>
  );
}

// Hero
function Hero({ onGetStarted, onSeeHowItWorks }) {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 min-h-[90vh] flex items-center">
      {/* Faint background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Soft glowing circles */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center w-full">
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight">
          Travel approvals
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-500 bg-clip-text text-transparent">
            without the Disorder
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          One platform for employees, managers, HR, finance, and vendors. Every
          travel request — submitted, approved, booked, and closed.
        </p>

        {/* The two main buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-700/30 hover:shadow-blue-500/40 text-base"
          >
            Start managing travel
            <HiOutlineArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={onSeeHowItWorks}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/25 transition-all text-base backdrop-blur-sm"
          >
            See how it works
          </button>
        </div>

        {/* Little check-mark badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm">
          {TRUST_BADGES.map((text) => (
            <span key={text} className="flex items-center gap-1.5">
              <HiOutlineCheckCircle size={15} className="text-emerald-500" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

//StatNumber
function StatNumber({ value }) {
  const [current, setCurrent] = useState(0);

  const target = parseInt(value, 10);

  // Keep the part of the text that is NOT a number, like "%" or "×".
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isNaN(target)) {
      return;
    }

    // We want the count to finish in about 1 second.
    // Update roughly 60 times a second (every ~16 milliseconds).
    const totalSteps = 60;
    const stepAmount = target / totalSteps;

    let count = 0;

    // setInterval runs the function again and again until we stop it.
    const timer = setInterval(() => {
      count = count + stepAmount;

      if (count >= target) {
        // Reached the goal: show the exact target and stop the timer.
        setCurrent(target);
        clearInterval(timer);
      } else {
        // Still counting: show the rounded number so far.
        setCurrent(Math.floor(count));
      }
    }, 16);

    // Clean up: stop the timer if the page is closed mid-animation.
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {isNaN(target) ? value : current}
      {suffix}
    </span>
  );
}

function Stats() {
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                <StatNumber value={stat.value} />
              </div>
              <p className="mt-2 text-sm text-slate-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features
function Features() {
  return (
    <section className="py-28 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
            Platform features
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Everything your travel desk needs
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto font-light">
            Built for modern corporate travel — from first request to final
            payment.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-5 shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Three steps, zero confusion
          </h2>
        </div>

        <div className="relative">
          {/* Thin line connecting the steps (only on bigger screens) */}
          <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-slate-100" />

          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 text-white text-2xl font-bold mb-6 shadow-lg shadow-slate-900/20 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Roles
function Roles() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
            Built for every stakeholder
          </p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            One system, five roles
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {ROLES.map((item) => (
            <div
              key={item.role}
              className="bg-white rounded-xl border border-slate-100 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4">
                {item.icon}
              </div>
              <div className="font-semibold text-slate-900 text-sm">
                {item.role}
              </div>
              <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Call To Action
function CallToAction({ onGetStarted }) {
  return (
    <section className="py-28 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Faint dotted background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-blue-600/20 blur-[80px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Ready to modernize your travel desk?
        </h2>
        <p className="mt-6 text-lg text-slate-400 font-light max-w-lg mx-auto">
          Sign in and take control of every travel request — from submission to
          settlement.
        </p>
        <button
          onClick={onGetStarted}
          className="group mt-10 inline-flex items-center gap-2.5 bg-white text-slate-900 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-xl text-base"
        >
          Go to your dashboard
          <HiOutlineChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}

// Footer
function Footer({ onSignIn }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Travel Desk"
            className="w-8 h-8 rounded-md object-contain bg-white p-0.5"
          />
          <span className="text-sm font-semibold text-white">Travel Desk</span>
        </div>
        <p className="text-xs text-slate-500">
          © {currentYear} Travel Desk Management System. All rights reserved.
        </p>
        <button
          onClick={onSignIn}
          className="text-xs text-slate-400 hover:text-white transition font-medium"
        >
          Sign in →
        </button>
      </div>
    </footer>
  );
}

// Main Page
export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const goToLogin = () => navigate("/login");
  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up: remove the listener when the page is closed.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden">
      <Navbar scrolled={scrolled} onGetStarted={goToLogin} />
      <Hero onGetStarted={goToLogin} onSeeHowItWorks={scrollToHowItWorks} />
      <Stats />
      <Features />
      <HowItWorks />
      <Roles />
      <CallToAction onGetStarted={goToLogin} />
      <Footer onSignIn={goToLogin} />
    </div>
  );
}
