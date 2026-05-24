import React, { useEffect, useRef, useState } from "react";
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
  { value: "100%", label: "Audit trail coverage" },
  { value: "5", label: "Roles, zero overlap" },
  { value: "0", label: "Spreadsheets needed" },
];

function useCountUp(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numeric = parseFloat(target);
    if (isNaN(numeric)) {
      setCount(target);
      return;
    }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numeric));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numeric);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, label }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const numericPart = parseFloat(value);
  const suffix = isNaN(numericPart)
    ? ""
    : value.replace(String(numericPart), "");
  const count = useCountUp(numericPart, 1000, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        {isNaN(numericPart) ? value : `${count}${suffix}`}
      </div>
      <p className="mt-2 text-sm text-slate-400 font-medium">{label}</p>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Travel Desk"
              className="w-9 h-9 rounded-lg object-contain bg-white p-1"
            />
            <span className={`text-base font-semibold tracking-tight transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>
              Travel Desk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className={`text-sm font-medium transition px-3 py-1.5 ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-slate-300 hover:text-white"}`}
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all shadow-sm hover:shadow-blue-600/30 hover:shadow-md"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 min-h-[90vh] flex items-center">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center w-full">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-xs font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Corporate travel management — simplified
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight">
            Travel approvals
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-500 bg-clip-text text-transparent">
              without the chaos
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            One platform for employees, managers, HR, finance, and vendors.
            Every travel request — submitted, approved, booked, and closed —
            with a full audit trail.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-700/30 hover:shadow-blue-500/40 text-base"
            >
              Start managing travel
              <HiOutlineArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/25 transition-all text-base backdrop-blur-sm"
            >
              See how it works
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm">
            {[
              "Multi-level approvals",
              "Role-based access",
              "Vendor management",
              "Finance tracking",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <HiOutlineCheckCircle size={15} className="text-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} text-white mb-5 shadow-lg`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section id="how-it-works" className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
              How it works
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Three steps, zero confusion
            </h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-slate-100" />

            <div className="grid md:grid-cols-3 gap-10">
              {STEPS.map((step, i) => (
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

      {/* ── ROLES SECTION ──────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
              Built for every stakeholder
            </p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              One system, five roles
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {
                icon: <BsPeopleFill size={22} />,
                role: "Employee",
                desc: "Submit requests",
              },
              {
                icon: <BsBuildings size={22} />,
                role: "Manager",
                desc: "First approval",
              },
              {
                icon: <BsShieldCheck size={22} />,
                role: "HR",
                desc: "Policy check",
              },
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
            ].map((r) => (
              <div
                key={r.role}
                className="bg-white rounded-xl border border-slate-100 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4">
                  {r.icon}
                </div>
                <div className="font-semibold text-slate-900 text-sm">
                  {r.role}
                </div>
                <div className="text-xs text-slate-400 mt-1">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <section className="py-28 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
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
            Sign in and take control of every travel request — from submission
            to settlement.
          </p>
          <button
            onClick={() => navigate("/login")}
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

      {/*FOOTER */}
      <footer className="bg-slate-950 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="Travel Desk"
              className="w-8 h-8 rounded-md object-contain bg-white p-0.5"
            />
            <span className="text-sm font-semibold text-white">
              Travel Desk
            </span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Travel Desk Management System. All
            rights reserved.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="text-xs text-slate-400 hover:text-white transition font-medium"
          >
            Sign in →
          </button>
        </div>
      </footer>
    </div>
  );
}
