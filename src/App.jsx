import emailjs from "@emailjs/browser";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ── Utility ──────────────────────────────────────────────────────────────────
const useScrollSpy = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
};

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV = ["home", "about", "skills", "projects", "journey", "contact"];

const SKILLS = [
  { name: "Kubernetes", icon: "⎈" },
  { name: "Docker", icon: "🐳" },
  { name: "Linux", icon: "🐧" },
  { name: "Vagrant", icon: "📦" },
  { name: "Azure", icon: "☁" },
  { name: "DNS", icon: "🌐" },
  { name: "GitHub", icon: "🐙" },
  { name: "YAML", icon: "📄" },
  { name: "AWS", icon: "☁" },
  { name: "CI/CD Basics", icon: "⚙️" },
  { name: "Terraform", icon: "▲" },
  { name: "Jenkins", icon: "⚒" },  


];

const PROJECTS = [
 /* {
    title: "Kubernetes Web App Deployment",
    subtitle: "using Vagrant",
    description:
      "Provisioned a multi-node Kubernetes cluster with Vagrant VMs, deployed a containerized web application with full service discovery, load balancing, and rolling update strategies.",
    tags: ["Kubernetes", "Vagrant", "Docker", "YAML"],
    icon: "⎈",
    accent: "#326CE5",
    glyph: "K8S",
  },*/
  {
    title: "DNS Troubleshooting &",
    subtitle: "Domain Resolution Lab",
    description:
      "Designed and debugged a full DNS resolution pipeline — from recursive resolvers to authoritative nameservers — documenting common failure modes and their fixes.",
    tags: ["DNS", "Linux", "Networking", "Bash"],
    icon: "🌐",
    accent: "#00D4AA",
    glyph: "DNS",
  },
  {
  title: "Containerized Application Deployment",
  subtitle: "Docker • Docker Compose • GitHub Actions",
  description:
    "Containerized a microservices application using Docker and Docker Compose with automated image build and push workflows using GitHub Actions.",
  tags: [
    "Docker",
    "Docker Compose",
    "GitHub Actions",
    "CI/CD",
    "YAML"
  ],
  icon: "🐳",
  accent: "#2496ED",
  glyph: "DOC",

  github: "https://github.com/shammishu23/devops-aws-microservices-project",
  //demo: "https://your-demo-link.com"
  },
  { 
  title: "End-to-End Kubernetes Deployment on Azure",
  subtitle: "AKS • Docker • Kubernetes • Vagrant",
  description:
    "Deployed a containerized NGINX application on Azure Kubernetes Service (AKS) using Docker, Kubernetes, Vagrant, and Azure CLI with Ingress and namespace configuration.",
  tags: [
    "Azure AKS",
    "Kubernetes",
    "Docker",
    "Vagrant",
    "Azure CLI",
    "Ingress",
    "YAML",
    "Linux"
  ],
  icon: "☸️",
  accent: "#0078D4",
  glyph: "AKS",

  github: "https://github.com/shammishu23/kubernetes-aks-ingress-project",
  //demo: "https://your-demo-link.com"
},
{
  title: "DevOps CI/CD Pipeline Project",
  subtitle: "Jenkins • Docker • AWS EC2",
  description:
    "Built an automated CI/CD pipeline using Jenkins, Docker, and AWS EC2 with deployment automation, health checks, notifications, and rollback support.",
  tags: [
    "Jenkins",
    "Docker",
    "AWS EC2",
    "CI/CD",
    "GitHub",
    "Linux"
  ],
  icon: "⚙️",
  accent: "#b04642",  
  glyph: "CI/CD",

  github: "https://github.com/shammishu23/docker-compose-project",
  //demo: "https://your-demo-link.com"
}
];

const JOURNEY = [
  {
    year: "2025 Q2",
    title: "Started the DevOps & Cloud Journey",
    detail:
      "Began learning Linux, cloud fundamentals, and DevOps concepts. Explored terminal commands, Ubuntu environments, and basic shell scripting.",
    icon: "🚀",
  },
  {
    year: "2025 Q3",
    title: "Docker & Containerization",
    detail:
      "Learned Docker fundamentals, built and ran containerized applications, explored Docker Compose, image management, and container networking.",
    icon: "🐳",
  },
  {
    year: "2025 Q4",
    title: "Kubernetes & Azure AKS",
    detail:
      "Worked with Kubernetes deployments, services, ingress, and namespaces using Azure Kubernetes Service (AKS), Vagrant, and Azure CLI.",
    icon: "⎈",
  },
  {
    year: "2026 Q1",
    title: "CI/CD & Automation",
    detail:
      "Built CI/CD pipelines using Jenkins and GitHub Actions with Docker image automation, deployment workflows, rollback handling, and cloud integration.",
    icon: "⚙️",
  },
  {
    year: "2026",
    title: "Building Real DevOps Projects",
    detail:
      "Created end-to-end cloud and DevOps projects involving AKS deployments, DNS configuration, container orchestration, automation scripts, and portfolio development.",
    icon: "🏗",
  },
];
// ── Sub-components ─────────────────────────────────────────────────────────────

function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-60 transition-opacity duration-100"
        style={{ clipPath: "inset(30% 0 50% 0)", transform: "translateX(-2px)" }}
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute inset-0 text-blue-500 opacity-0 group-hover:opacity-40 transition-opacity duration-150"
        style={{ clipPath: "inset(60% 0 10% 0)", transform: "translateX(2px)" }}
        aria-hidden
      >
        {text}
      </span>
    </span>
  );
}

function TerminalBadge({ text }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono border border-cyan-500/30 bg-cyan-500/5 text-cyan-400">
      <span className="text-cyan-500">$</span> {text}
    </span>
  );
}

function SectionHeader({ eyebrow, title, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      <p className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-500 mb-3">{eyebrow}</p>
      <h2
        className="text-4xl md:text-5xl font-black tracking-tight"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span className="text-white">{title.split(" ")[0]} </span>
        <span style={{ color: accent ?? "#00D4AA" }}>{title.split(" ").slice(1).join(" ")}</span>
      </h2>
      <div className="mt-4 mx-auto w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent ?? "#00D4AA"}, transparent)` }} />
    </motion.div>
  );
}

// ── Grid background ───────────────────────────────────────────────────────────
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#00D4AA 1px, transparent 1px), linear-gradient(90deg, #00D4AA 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(50,108,229,0.15) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const active = useScrollSpy(NAV);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#080C14]/90 backdrop-blur-xl border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="font-mono text-sm tracking-widest group">
          <span className="text-cyan-400 group-hover:text-white transition-colors">./</span>
          <span className="text-white font-bold">SujithaChadalavada</span>
          <span className="text-cyan-500 animate-pulse">_</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-200 rounded-sm ${
                active === id
                  ? "text-cyan-400 bg-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {active === id && <span className="text-cyan-500 mr-1">›</span>}
              {id}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-slate-300 hover:text-white transition-colors p-2"
          aria-label="Menu"
        >
          <div className={`w-5 h-0.5 bg-current mb-1 transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-current mb-1 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#080C14]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => { scrollTo(id); setMenuOpen(false); }}
                className="block w-full text-left px-6 py-3 font-mono text-sm text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all border-b border-white/5 last:border-0"
              >
                <span className="text-cyan-600 mr-2">›</span>{id}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const words = ["DevOps","Cloud","Linux",];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(50,108,229,0.2) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)", filter: "blur(50px)" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Available for Internships & Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <GlitchText text="Sujitha Chadalavada" className="text-white" />
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-12 flex items-center justify-center mb-6 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-bold"
              style={{
                color: wordIdx % 2 === 0 ? "#326CE5" : "#00D4AA",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {words[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Aspiring DevOps & Cloud Engineer passionate about automating infrastructure,
          containerizing applications, and building resilient systems at scale.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group relative px-8 py-3 rounded-sm font-mono text-sm font-semibold overflow-hidden transition-all"
            style={{ background: "linear-gradient(135deg, #326CE5, #00D4AA)", color: "#080C14" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          <a
            href="https://drive.google.com/uc?export=download&id=1WYaZFEBGSFjiW55dV8KZvZPBBso4z5mp"
            download
            className="group px-8 py-3 rounded-sm font-mono text-sm font-semibold border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center gap-2"
          >
            <span>↓</span> Download Resume
          </a>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {["Kubernetes", "Docker", "Azure", "Linux", "Vagrant", "GitHub", "AWS"].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              className="px-3 py-1 text-xs font-mono border border-white/10 bg-white/5 text-slate-400 rounded-sm hover:border-cyan-500/40 hover:text-cyan-400 transition-all cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs font-mono"
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { label: "Projects Built", value: "3+" },
    { label: "Technologies", value: "8+" },
    { label: "Labs Completed", value: "20+" },
    { label: "Commits", value: "100+" },
  ];

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="// who am i" title="About Me" accent="#326CE5" />

        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left – text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-lg">👩‍💻</div>
              <TerminalBadge text="sujitha@devops:~$" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Building infrastructure, <span className="text-cyan-400">one container at a time.</span>
            </h3>

            <p className="text-slate-400 leading-relaxed mb-4">
              I'm an aspiring DevOps and Cloud Engineer with a deep fascination for how modern software systems
              are built, deployed, and scaled. My journey started with Linux and grew into a passion for
              containers, orchestration, and cloud infrastructure.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              I believe great DevOps is invisible — it's what makes apps fast, resilient, and always-on.
              I'm actively building hands-on projects, solving real infrastructure problems, and preparing
              for a career at the intersection of development and operations.
            </p>

            <div className="flex flex-wrap gap-2">
              {["Problem Solver", "Fast Learner", "Open Source Enthusiast", "Documentation Nerd"].map((t) => (
                <span key={t} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-slate-400">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right – stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="group p-6 rounded-sm border border-white/10 bg-white/[0.03] hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-300"
              >
                <p className="text-4xl font-black text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-xs font-mono text-slate-500 group-hover:text-cyan-500 transition-colors">{s.label}</p>
              </motion.div>
            ))}

            {/* Terminal widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="col-span-2 p-4 rounded-sm border border-white/10 bg-[#0A0F1A] font-mono text-xs"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-slate-600 text-[10px]">terminal</span>
              </div>
              <p className="text-cyan-400">$ whoami</p>
              <p className="text-slate-300 mb-2">sujithachadalavada — devops-engineer-in-training</p>
              <p className="text-cyan-400">$ cat interests.txt</p>
              <p className="text-slate-300">kubernetes, cloud-infra, automation, iac</p>
              <p className="text-cyan-400 mt-2">$ echo $STATUS</p>
              <p className="text-green-400">actively_seeking_opportunities ✓</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function SkillBar({ skill, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="group p-5 rounded-sm border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img">{skill.icon}</span>
          <span className="text-sm font-semibold text-white font-mono">{skill.name}</span>
        </div>
        {/*if want the percentage bar set the level: 80 in const skills{} and then enable these also enable down div also*/}
        {/*<span className="text-xs font-mono" style={{ color: skill.color }}>{skill.level}%</span>*/}
      </div>
      {/*if want the percentage bar set the level: 80 in const skills{} and then enable these also enable down div also*/}
      {/*<div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})` }}
        />
      </div>*/}
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="// tech stack" title="Skills & Tools" accent="#00D4AA" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} skill={s} delay={i * 0.08} />
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-sm border border-white/10 bg-white/[0.02]"
        >
          <p className="text-xs font-mono text-slate-500 mb-4 tracking-widest uppercase">// Pursuing Certifications</p>
          <div className="flex flex-wrap gap-3">
            {["AZ-900: Azure Fundamentals", "CKA: Certified Kubernetes Admin", "Linux Foundation Essentials"].map((c) => (
              <span key={c} className="flex items-center gap-2 px-4 py-2 rounded-sm border border-blue-500/30 bg-blue-500/5 text-sm text-blue-300 font-mono">
                <span className="text-blue-400">🎯</span> {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative p-8 rounded-sm border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${project.accent}, transparent 70%)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }}
      />

      {/* Glyph */}
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-14 h-14 rounded-sm flex items-center justify-center text-xs font-black font-mono border transition-all duration-300"
          style={{
            borderColor: `${project.accent}40`,
            background: `${project.accent}10`,
            color: project.accent,
          }}
        >
          {project.glyph}
        </div>
        <span className="text-2xl opacity-30 group-hover:opacity-60 transition-opacity">{project.icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-1 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {project.title}
      </h3>
      <p className="text-sm mb-4" style={{ color: project.accent }}>{project.subtitle}</p>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-xs font-mono rounded-sm border"
            style={{ borderColor: `${project.accent}30`, color: `${project.accent}cc`, background: `${project.accent}08` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-white transition-colors"
        >
          <span>⌥</span> GitHub
        </a>

        {/* <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-white transition-colors"
          >
            <span>↗</span> Demo
        </a> */}
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="// portfolio" title="Featured Projects" accent="#326CE5" />
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Journey ───────────────────────────────────────────────────────────────────
function Journey() {
  return (
    <section id="journey" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="// timeline" title="Learning Journey" accent="#00D4AA" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent" />

          <div className="space-y-8">
            {JOURNEY.map((item, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative pl-16 group"
                >
                  {/* Dot */}
                  <div className="absolute left-3.5 top-6 w-5 h-5 -translate-x-1/2 rounded-full border-2 border-cyan-500/50 bg-[#080C14] group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300 flex items-center justify-center text-xs">
                    <span className="text-[10px]">{item.icon}</span>
                  </div>

                  <div className="p-5 rounded-sm border border-white/10 bg-white/[0.03] hover:border-cyan-500/30 hover:bg-cyan-500/[0.03] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-sm border border-cyan-500/30 bg-cyan-500/5 text-cyan-400">
                        {item.year}
                      </span>
                      <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Future node */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative pl-16"
            >
              <div className="absolute left-3.5 top-5 w-5 h-5 -translate-x-1/2 rounded-full border-2 border-dashed border-cyan-500/30 bg-[#080C14] flex items-center justify-center">
                <span className="text-[10px] text-cyan-500">✦</span>
              </div>
              <div className="p-5 rounded-sm border border-dashed border-white/10 bg-white/[0.01]">
                <p className="text-xs font-mono text-slate-600">next chapter loading...</p>
                <p className="text-sm text-slate-500 mt-1">First DevOps role & cloud certifications 🚀</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  // dummy mail handle no functioning 
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSent(true);
  //   setTimeout(() => setSent(false), 4000);
  //   setForm({ name: "", email: "", message: "" });
  // };

  //functioning mail realtime usign emailjs
  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs
    .send(
      "service_87mr38g",
      "template_ajo0mv9",
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "Gx_lc3QXkD55aVE27"
    )
    .then(() => {
      setSent(true);

      setTimeout(() => setSent(false), 4000);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
    });
};

  const socials = [
    { label: "GitHub", href: "https://github.com/shammishu23", icon: "🐙" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sujitha-chadalavada-1b7620239/", icon: "💼" },
    { label: "Email", href: "mailto:ch.sujitha2801@gmail.com", icon: "✉️" },
  ];
  
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="// get in touch" title="Contact Me" accent="#326CE5" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Let's build something <span className="text-cyan-400">together.</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8">
            I'm actively seeking internship and entry-level opportunities in DevOps and Cloud Engineering.
            Open to collaborations, projects, and technical discussions — feel free to get in touch.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { label: "Location", value: "India", icon: "📍" },
                { label: "Email", value: "ch.sujitha2801@gmail.com", icon: "✉️" },
                { label: "Availability", value: "Open to opportunities", icon: "🟢" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 text-sm">
                  <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-base">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-mono">{item.label}</p>
                    <p className="text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="w-10 h-10 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center text-base hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:scale-110 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 rounded-sm border border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-1.5 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs font-mono text-slate-600">new_message.sh</span>
              </div>

              <div className="space-y-4">
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "Sujitha" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5"># {f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm bg-white/5 border border-white/10 text-white text-sm font-mono placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5"># Message</label>
                  <textarea
                    rows={4}
                    placeholder="Let's talk DevOps..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm bg-white/5 border border-white/10 text-white text-sm font-mono placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-sm font-mono text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: sent
                      ? "linear-gradient(135deg, #22c55e, #16a34a)"
                      : "linear-gradient(135deg, #326CE5, #00D4AA)",
                    color: "#080C14",
                  }}
                >
                  {sent ? (
                    <>✓ Message Sent!</>
                  ) : (
                    <>
                      <span>⌥</span> Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative py-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-600">
          <span className="text-cyan-500">©</span> 2025 Sujitha — Built with React & ❤️
        </p>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          All systems operational
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200"
      style={{ background: "#080C14", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <GridBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
