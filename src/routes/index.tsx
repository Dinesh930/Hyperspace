import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Upload, Sparkles, Share2, Film, Layers, Clock, Building2, Rocket, Wand2, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://cinora.ai/og.jpg" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-grain relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[900px] overflow-hidden">
        <div className="ambient-glow left-[10%] top-[-120px] h-[420px] w-[420px]" style={{ background: "radial-gradient(circle, #8B7CFF 0%, transparent 70%)" }} />
        <div className="ambient-glow right-[5%] top-[80px] h-[520px] w-[520px]" style={{ background: "radial-gradient(circle, #6D5EF8 0%, transparent 70%)", opacity: 0.35 }} />
      </div>

      <Nav scrolled={scrolled} />

      <main className="relative z-10">
        <Hero />
        <LaunchStrip />
        <HowItWorks />
        <Why />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */

function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-soft shadow-[0_6px_20px_-6px_rgba(109,94,248,0.6)]">
            <span className="h-2 w-2 rounded-[3px] bg-white/95" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">Cinora <span className="text-muted-foreground">AI</span></span>
        </a>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("waitlist");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
              const input = el.querySelector<HTMLInputElement>('input[type="email"]');
              setTimeout(() => input?.focus({ preventScroll: true }), 500);
            }
          }}
          className="group inline-flex h-9 items-center rounded-full bg-foreground px-4 text-[13.5px] font-medium text-background transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)]"
        >
          Join Waitlist
        </button>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section id="top" className="relative pt-16 md:pt-24 lg:pt-28">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="animate-fade-up">
            <Badge>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Coming Soon · Early Access
            </Badge>
            <h1 className="mt-6 text-balance text-[44px] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-[56px] lg:text-[72px]">
              Turn Listing Photos Into{" "}
              <span className="relative inline-block bg-gradient-to-r from-primary via-primary-soft to-primary bg-clip-text text-transparent">
                Cinematic Videos.
              </span>
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-muted-foreground sm:text-[18px]">
              Cinora AI converts your property photos into stunning, AI-generated
              marketing videos — ready for Reels, TikTok, YouTube, your website,
              and everywhere your listings live.
            </p>

            <div className="mt-9 max-w-[520px]">
              <WaitlistForm id="waitlist" />
              <p className="mt-3 text-[13px] text-muted-foreground">
                Founder pricing · Priority access · No spam.
              </p>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="absolute inset-10 -z-10 rounded-full bg-gradient-to-br from-primary/20 via-primary-soft/10 to-transparent blur-3xl" />

            {/* Triangle: slow spin + gentle bob */}
            <div className="animate-bob absolute left-1/2 top-[8%] h-[62%] w-[72%] -translate-x-1/2">
              <div className="animate-spin-slow h-full w-full">
                <HalftoneTriangle />
              </div>
            </div>

            {/* Sphere: counter-spin + bob */}
            <div className="animate-bob absolute bottom-[4%] left-1/2 h-[26%] w-[26%] -translate-x-1/2" style={{ animationDelay: "-2s" }}>
              <div className="animate-spin-reverse h-full w-full">
                <HalftoneSphere />
              </div>
            </div>

            <FloatingChip className="left-[-14px] top-10 delay-100">
              <Film className="h-3.5 w-3.5 text-primary" /> Cinematic
            </FloatingChip>
            <FloatingChip className="bottom-14 right-[-16px] delay-300">
              <Wand2 className="h-3.5 w-3.5 text-primary" /> AI Generated
            </FloatingChip>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`animate-float absolute inline-flex items-center gap-1.5 rounded-full border border-border bg-white/90 px-3 py-1.5 text-[12.5px] font-medium text-foreground shadow-[0_8px_24px_-10px_rgba(15,23,42,0.15)] backdrop-blur ${className}`}
      style={{ animationDuration: "9s" }}
    >
      {children}
    </div>
  );
}

/* ---------------- LAUNCH STRIP ---------------- */

function LaunchStrip() {
  const items = [
    { icon: <Rocket className="h-4 w-4" />, label: "Launching Soon" },
    { icon: <Film className="h-4 w-4" />, label: "AI Video Generation" },
    { icon: <Star className="h-4 w-4" />, label: "Founder Pricing" },
  ];
  return (
    <section className="mt-28 md:mt-36">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="reveal flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-white/70 px-4 py-3 backdrop-blur-sm sm:gap-8">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-2 text-[14px] text-foreground/80">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">{it.icon}</span>
              <span className="font-medium">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */

function HowItWorks() {
  const steps = [
    { n: "01", icon: <Upload className="h-5 w-5" />, title: "Upload Listing Photos", body: "Drop in your property photos — interiors, exteriors, drone shots. No editing required." },
    { n: "02", icon: <Sparkles className="h-5 w-5" />, title: "AI Creates the Video", body: "Cinora composes cinematic camera moves, transitions, and pacing tuned for real estate." },
    { n: "03", icon: <Share2 className="h-5 w-5" />, title: "Publish Everywhere", body: "Export perfectly formatted videos for Reels, TikTok, YouTube, and your website." },
  ];
  return (
    <section className="mt-28 md:mt-40">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <SectionHeader eyebrow="How it works" title="From photos to cinema in three steps." />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal group relative rounded-2xl border border-border bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-30px_rgba(109,94,248,0.4)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {s.icon}
                </span>
                <span className="text-[13px] font-medium tracking-widest text-muted-foreground/70">{s.n}</span>
              </div>
              <h3 className="mt-8 text-[22px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY ---------------- */

function Why() {
  const features = [
    { icon: <Film className="h-5 w-5" />, title: "Cinematic Results", body: "Studio-grade camera moves, color, and pacing — designed to feel handcrafted, not templated." },
    { icon: <Layers className="h-5 w-5" />, title: "Multi-Platform Ready", body: "One click exports for Reels, TikTok, YouTube Shorts, MLS, and your website — sized perfectly." },
    { icon: <Clock className="h-5 w-5" />, title: "Save Time", body: "Skip editors, shoots, and revisions. Turn a batch of photos into a full campaign in minutes." },
    { icon: <Building2 className="h-5 w-5" />, title: "Built for Real Estate", body: "Trained on listings — from luxury estates to city apartments — so the output feels on-brand." },
  ];
  return (
    <section className="mt-28 md:mt-40">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <SectionHeader eyebrow="Why Cinora AI" title="A video studio for every listing." />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal group flex gap-5 rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-30px_rgba(109,94,248,0.35)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {f.icon}
              </span>
              <div className="min-w-0">
                <h3 className="text-[19px] font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */

function FinalCTA() {
  return (
    <section className="mt-28 md:mt-40">
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <div className="reveal relative overflow-hidden rounded-[28px] border border-border bg-white px-6 py-16 text-center shadow-[0_30px_120px_-40px_rgba(109,94,248,0.35)] sm:px-12 sm:py-20">
          <div aria-hidden className="ambient-glow left-1/2 top-[-160px] h-[400px] w-[600px] -translate-x-1/2" style={{ background: "radial-gradient(circle, #8B7CFF 0%, transparent 70%)", opacity: 0.35 }} />
          <div className="relative">
            <Badge>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Early Access
            </Badge>
            <h2 className="mx-auto mt-6 max-w-[720px] text-balance text-[36px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[48px]">
              Be first to experience{" "}
              <span className="bg-gradient-to-r from-primary to-primary-soft bg-clip-text text-transparent">Cinora AI</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted-foreground">
              Join the waitlist for founder pricing, priority access, and a first
              look when we open the doors.
            </p>
            <div className="mx-auto mt-9 max-w-[520px]">
              <WaitlistForm id="waitlist-bottom" />
              <p className="mt-3 text-[13px] text-muted-foreground">No spam. Only launch updates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="relative z-10 mt-28 border-t border-border py-10 md:mt-40">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-4 px-6 text-[13.5px] text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-primary to-primary-soft">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-white/95" />
          </span>
          <span className="font-medium text-foreground">Cinora AI</span>
          <span className="hidden text-muted-foreground sm:inline">· Turning Listing Photos Into Cinematic Videos</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
          <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          <a href="#" className="transition-colors hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED ---------------- */

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="reveal mx-auto max-w-[720px] text-center">
      <span className="inline-block text-[12px] font-medium uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-[34px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[44px]">
        {title}
      </h2>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-3 py-1.5 text-[12.5px] font-medium text-foreground/80 backdrop-blur">
      {children}
    </span>
  );
}

function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("done"), 700);
  };

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-border sm:bg-white sm:p-1.5 sm:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_30px_-15px_rgba(15,23,42,0.15)] sm:focus-within:border-primary/40 sm:focus-within:ring-4 sm:focus-within:ring-primary/10"
    >
      <input
        ref={inputRef}
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="you@company.com"
        aria-label="Email address"
        className="h-12 min-w-0 flex-1 rounded-full border border-border bg-white px-5 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/10 sm:h-11 sm:border-0 sm:bg-transparent sm:px-4 sm:focus:ring-0"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-[14.5px] font-medium text-primary-foreground shadow-[0_10px_30px_-10px_rgba(109,94,248,0.6)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_14px_40px_-10px_rgba(109,94,248,0.7)] disabled:opacity-70 sm:h-10 sm:px-5"
      >
        {status === "done" ? "You're on the list ✓" : status === "loading" ? "Joining…" : "Join Waitlist"}
      </button>
      {status === "error" && (
        <span className="text-[13px] text-destructive sm:absolute sm:mt-14">Please enter a valid email.</span>
      )}
    </form>
  );
}

/* ---------------- HALFTONE SHAPES ---------------- */

function HalftoneTriangle() {
  // Rounded triangle filled with a radial halftone dot pattern.
  const size = 400;
  const cx = size / 2;
  const apexY = 40;
  const baseY = size - 60;
  const halfBase = (baseY - apexY) / Math.tan((60 * Math.PI) / 180); // equilateral-ish
  const step = 11;
  const dots: { x: number; y: number; r: number }[] = [];
  for (let y = apexY; y <= baseY; y += step) {
    const t = (y - apexY) / (baseY - apexY);
    const halfW = halfBase * t;
    for (let x = cx - halfW; x <= cx + halfW; x += step) {
      const dx = (x - cx) / (halfBase || 1);
      const dy = (y - (apexY + baseY) / 2) / ((baseY - apexY) / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      // Radial halftone: dots grow toward the edge, shrink in center — inverse for "sphere-shaded" look
      const r = Math.max(0.6, 3.2 * (0.35 + 0.8 * d));
      dots.push({ x, y, r });
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="tri-clip">
          <path d={`M ${cx} ${apexY} L ${cx + halfBase} ${baseY} L ${cx - halfBase} ${baseY} Z`} />
        </clipPath>
      </defs>
      <g clipPath="url(#tri-clip)">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="rgb(15 23 42)" />
        ))}
      </g>
    </svg>
  );
}

function HalftoneSphere() {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 8;
  const step = 9;
  const dots: { x: number; y: number; r: number }[] = [];
  for (let y = cy - R; y <= cy + R; y += step) {
    for (let x = cx - R; x <= cx + R; x += step) {
      const dx = x - cx;
      const dy = y - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > R) continue;
      const t = d / R;
      const r = Math.max(0.6, 2.6 * (0.3 + 0.9 * t));
      dots.push({ x, y, r });
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="rgb(15 23 42)" />
      ))}
    </svg>
  );
}

