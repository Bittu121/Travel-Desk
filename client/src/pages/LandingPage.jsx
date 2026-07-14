import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";

import {
  MdFlightTakeoff,
  MdApproval,
  MdReceiptLong,
  MdTrendingUp,
  MdPayments,
  MdAdminPanelSettings,
  MdManageSearch,
  MdGroups,
} from "react-icons/md";
import {
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineArrowUp,
} from "react-icons/hi";
import { BsBuildings, BsPeopleFill, BsShieldCheck, BsEyeFill } from "react-icons/bs";
import { RiFlightTakeoffLine } from "react-icons/ri";

const FEATURES = [
  {
    icon: <MdFlightTakeoff size={26} />,
    title: "Employee Requests",
    desc: "Any employee can log in, fill out a travel request (even for multiple travelers on one trip), and submit it. A dashboard shows every request and its live status — pending, approved, rejected or booked.",
    color: "from-violet-500 to-violet-700",
  },
  {
    icon: <MdApproval size={26} />,
    title: "Two-Step Approval",
    desc: "Every request goes to the reporting manager first, then to HR. An email goes out automatically at each step, so the next person always knows it's their turn.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <MdReceiptLong size={26} />,
    title: "Vendor Booking",
    desc: "Once HR approves and picks a vendor, that vendor sees the request, uploads the ticket and bill, and marks it as booked once travel is confirmed.",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    icon: <MdPayments size={26} />,
    title: "Finance Tracking",
    desc: "Finance sees every request HR has approved and updates its payment status — pending, paid, or reimbursed.",
    color: "from-sky-500 to-cyan-600",
  },
  {
    icon: <MdAdminPanelSettings size={26} />,
    title: "Admin Overview",
    desc: "Admin can view every travel request across the company, pending and approved. It's a view-only role — nothing can be approved, edited, or uploaded from it.",
    color: "from-slate-600 to-slate-800",
  },
  {
    icon: <MdManageSearch size={26} />,
    title: "Search, Filter & Export",
    desc: "Search and page through long lists of requests, and export the data to Excel with one click.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: <MdGroups size={26} />,
    title: "User Management",
    desc: "HR can create, update, and remove accounts for employees, managers, vendors, and finance staff.",
    color: "from-amber-500 to-orange-600",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Submit the Request",
    desc: "An employee or manager fills out the travel form and submits it. The reporting manager is emailed right away.",
  },
  {
    num: "02",
    title: "Manager Reviews",
    desc: "Accept moves it to HR and emails them. Reject ends the request here — it goes no further.",
  },
  {
    num: "03",
    title: "HR Reviews & Picks a Vendor",
    desc: "Accept assigns a vendor and emails them. Reject ends the request here.",
  },
  {
    num: "04",
    title: "Vendor Books Travel",
    desc: "The vendor uploads tickets, bills and booking details, then marks the request as booked.",
  },
  {
    num: "05",
    title: "Finance Closes It Out",
    desc: "Finance updates the payment status to paid or reimbursed, and the request is complete.",
  },
];

const STATS = [
  { value: "6", label: "Roles, zero overlap" },
  { value: "4", label: "Travel modes supported" },
  { value: "2", label: "Level approval matrix" },
  { value: "0", label: "Spreadsheets needed" },
];

const TRUST_BADGES = [
  "Multi-level approvals",
  "Role-based access",
  "Vendor management",
  "Finance tracking",
];

// The six roles
const ROLES = [
  {
    icon: <BsPeopleFill size={22} />,
    role: "Employee",
    desc: "Submit requests",
  },
  { icon: <BsBuildings size={22} />, role: "Manager", desc: "First approval" },
  {
    icon: <BsShieldCheck size={22} />,
    role: "HR",
    desc: "Approve & assign vendor",
  },
  {
    icon: <RiFlightTakeoffLine size={22} />,
    role: "Vendor",
    desc: "Book & upload tickets",
  },
  {
    icon: <MdReceiptLong size={22} />,
    role: "Finance",
    desc: "Payment & closure",
  },
  {
    icon: <BsEyeFill size={22} />,
    role: "Admin",
    desc: "Full visibility, view-only",
  },
];

//images
const SHOWCASE_SLIDES = [
  {
    role: "Employee",
    title: "Submit a travel request in minutes",
    image: null,
  },
  {
    role: "Manager & HR",
    title: "Approve and assign a vendor in one place",
    image: null,
  },
  {
    role: "Vendor",
    title: "Upload tickets and bills against a request",
    image: null,
  },
  {
    role: "Finance",
    title: "Track payment status through to closure",
    image: null,
  },
];

// Dashboard preview slider
function DashboardShowcase() {
  const [index, setIndex] = useState(0);
  const slide = SHOWCASE_SLIDES[index];

  const goPrev = () =>
    setIndex((i) => (i === 0 ? SHOWCASE_SLIDES.length - 1 : i - 1));
  const goNext = () =>
    setIndex((i) => (i === SHOWCASE_SLIDES.length - 1 ? 0 : i + 1));

  return (
    <section className="py-24 px-6 bg-[#1D2046]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Preview frame */}
        <div className="relative rounded-lg border border-slate-200 bg-slate-50 aspect-video overflow-hidden shadow-xl shadow-slate-200/60 flex items-center justify-center">
          {slide.image ? (
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <MdTrendingUp size={36} />
              <span className="text-sm font-semibold">Coming soon</span>
            </div>
          )}
        </div>

        {/* Caption */}
        <p className="mt-8 text-lg font-semibold text-slate-800">
          {slide.title}
        </p>
        <p className="text-sm text-slate-400 mt-1">{slide.role} dashboard</p>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
          >
            <HiOutlineArrowLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {SHOWCASE_SLIDES.map((s, i) => (
              <button
                key={s.role}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-slate-900" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
          >
            <HiOutlineArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

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
            className={`text-lg font-semibold tracking-tight transition-colors ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Travel Desk Management System
          </span>
        </div>

        {/* Button on the right */}
        <button
          onClick={onGetStarted}
          className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md transition-all shadow-sm hover:shadow-blue-600/30 hover:shadow-md"
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
          One platform for employees, managers, HR, vendors, finance, and
          admins. Every travel request — submitted, approved, booked, and
          paid.
        </p>

        {/* The two main buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-md transition-all shadow-lg shadow-blue-700/30 hover:shadow-blue-500/40 text-base"
          >
            Dashboard
            <HiOutlineArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={onSeeHowItWorks}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-3 rounded-md border border-white/10 hover:border-white/25 transition-all text-base backdrop-blur-sm"
          >
            See how it works
          </button>
        </div>

        {/* Little check-mark badges, set apart from the CTAs by a divider */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-500 text-sm">
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

function Stats() {
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {stat.value}
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
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
            How it works
          </p>
        </div>

        <div className="relative">
          {/* Thin line connecting the steps (only on bigger screens) */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-slate-100" />

          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-10">
            {STEPS.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white text-lg font-bold mb-6 shadow-lg shadow-slate-900/20 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">
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
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
        <p className="mt-6 text-lg text-slate-400 font-light max-w-lg mx-auto">
          Sign in and take control of every travel request — from submission to
          settlement.
        </p>
        <button
          onClick={onGetStarted}
          className="group mt-10 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-md transition-all shadow-lg shadow-blue-700/30 hover:shadow-blue-500/40 text-base"
        >
          Sign in to continue
          <HiOutlineArrowRight
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
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Travel Desk"
            className="w-8 h-8 rounded-md object-contain bg-white p-0.5"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white leading-tight">
              Travel Desk Management System
            </span>
          </div>
        </div>
        <button
          onClick={onSignIn}
          className="group flex items-center gap-1.5 text-xs font-semibold text-slate-200 border border-slate-700 rounded-md px-4 py-2.5 bg-white/[0.03] hover:text-white hover:border-blue-400/60 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(96,165,250,0.3),0_4px_20px_-4px_rgba(59,130,246,0.4)] transition-all duration-200"
        >
          Sign in
          <HiOutlineArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-8 pt-5 text-center">
        <p className="text-xs text-slate-500">
          © {currentYear} Travel Desk Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Scroll-to-top button
function ScrollToTopButton() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`group fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-slate-950/90 backdrop-blur-sm hover:bg-slate-900 hover:shadow-[0_4px_24px_-4px_rgba(59,130,246,0.5)] transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="url(#scrollProgressGradient)"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        <defs>
          <linearGradient
            id="scrollProgressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>
      <HiOutlineArrowUp
        size={18}
        className="text-white group-hover:-translate-y-0.5 transition-transform"
      />
    </button>
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
      <DashboardShowcase />
      <Stats />
      <Features />
      <HowItWorks />
      <Roles />
      <CallToAction onGetStarted={goToLogin} />
      <Footer onSignIn={goToLogin} />
      <ScrollToTopButton />
    </div>
  );
}
