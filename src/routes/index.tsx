import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Upload,
  Sparkles,
  Share2,
  Film,
  Layers,
  Clock,
  Building2,
  Rocket,
  Wand2,
  Star,
} from "lucide-react";
import {
  useScrolled,
  useRevealOnScroll,
  HalftoneBackground,
  AmbientGlows,
  CursorTrail,
  Nav,
  Footer,
  Badge,
  SectionHeader,
} from "../components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ property: "og:image", content: "https://cinora.ai/og.jpg" }],
  }),
  component: Landing,
});

function Landing() {
  const scrolled = useScrolled();
  useRevealOnScroll();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <HalftoneBackground />
      <AmbientGlows />
      <CursorTrail />

      <Nav scrolled={scrolled} />

      <main className="relative z-10">
        <Hero />
        <PhotoVideoShowcase />
        <LaunchStrip />
        <HowItWorks />
        <Why />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative pt-16 md:pt-24 lg:pt-28">
      <div className="mx-auto w-full max-w-[880px] px-6 text-center">
        <div className="animate-fade-up flex flex-col items-center">
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
          <p className="mt-6 max-w-[640px] text-[17px] leading-[1.6] text-muted-foreground sm:text-[18px]">
            Cinora AI converts your property photos into stunning, AI-generated marketing videos —
            ready for Reels, TikTok, YouTube, your website, and everywhere your listings live.
          </p>

          <div className="mt-9 w-full max-w-[520px]">
            <WaitlistForm id="waitlist" className="justify-center" />
            <p className="mt-3 text-[13px] text-muted-foreground">
              Founder pricing · Priority access · No spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PHOTOS → VIDEO SHOWCASE (dedicated section) ---------------- */
const SHOWCASE_PHOTOS = [
  { id: "bedroom", alt: "Bedroom listing photo", src: "/images/showcase/s6.png" },
  { id: "bar", alt: "Bar area listing photo", src: "/images/showcase/s5.png" },
  { id: "kitchen", alt: "Kitchen listing photo", src: "/images/showcase/s3.png" },
  { id: "living", alt: "Living room listing photo", src: "/images/showcase/s2.png" },
];
const SHOWCASE_VIDEO_SRC = "/videos/showcase/kling_20260721_VIDEO_Transform__745_0.mp4";

function PhotoVideoShowcase() {
  return (
    <section className="relative mt-20 md:mt-28">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <SectionHeader eyebrow="See it in action" title="Your photos, turned into one cinematic video." />

        <div className="relative mx-auto mt-14 grid max-w-[1000px] grid-cols-1 items-center gap-8 md:grid-cols-[1fr_90px_1fr] md:gap-6">
          <div
            aria-hidden
            className="ambient-glow left-1/2 top-1/2 -z-10 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, #6D5EF8 0%, transparent 70%)", opacity: 0.22 }}
          />

          <div className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-4">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
              Site Photos
            </span>
            <div className="grid w-full grid-cols-2 gap-3">
              {SHOWCASE_PHOTOS.map((p, i) => (
                <div
                  key={p.id}
                  className="reveal aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-white shadow-[0_10px_30px_-14px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-16px_rgba(15,23,42,0.3)]"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mx-auto flex items-center justify-center" style={{ transitionDelay: "280ms" }}>
            <div className="ptv-arrow-track ptv-arrow-track-v md:hidden" aria-hidden>
              <span className="ptv-slide-arrow ptv-slide-arrow-v" />
              <span className="ptv-slide-arrow ptv-slide-arrow-v" style={{ animationDelay: "1.1s" }} />
            </div>
            <div className="ptv-arrow-track ptv-arrow-track-h hidden md:flex" aria-hidden>
              <span className="ptv-slide-arrow ptv-slide-arrow-h" />
              <span className="ptv-slide-arrow ptv-slide-arrow-h" style={{ animationDelay: "1.1s" }} />
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[260px] flex-col items-center gap-4">
            <div className="reveal animate-float relative w-full" style={{ transitionDelay: "360ms", animationDuration: "8s" }}>
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[24px] border border-border bg-black shadow-[0_30px_90px_-30px_rgba(15,23,42,0.35)]">
                <video
                  className="h-full w-full object-cover"
                  src={SHOWCASE_VIDEO_SRC}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />

                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 backdrop-blur">
                  <span className="cin-rec-dot h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span className="text-[10px] font-medium tracking-wider text-white">REC</span>
                </div>

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur">
                  AI Generated
                </span>
              </div>

              <FloatingChip className="left-[-14px] top-[-14px] delay-100">
                <Film className="h-3.5 w-3.5 text-primary" /> Cinematic
              </FloatingChip>
              <FloatingChip className="bottom-[-14px] right-[-14px] delay-300">
                <Wand2 className="h-3.5 w-3.5 text-primary" /> AI Generated
              </FloatingChip>
            </div>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
              Your Video
            </span>
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
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
                {it.icon}
              </span>
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
    {
      n: "01",
      icon: <Upload className="h-5 w-5" />,
      title: "Upload Listing Photos",
      body: "Drop in your property photos — interiors, exteriors, drone shots. No editing required.",
    },
    {
      n: "02",
      icon: <Sparkles className="h-5 w-5" />,
      title: "AI Creates the Video",
      body: "Cinora composes cinematic camera moves, transitions, and pacing tuned for real estate.",
    },
    {
      n: "03",
      icon: <Share2 className="h-5 w-5" />,
      title: "Publish Everywhere",
      body: "Export perfectly formatted videos for Reels, TikTok, YouTube, and your website.",
    },
  ];
  return (
    <section className="mt-28 md:mt-40">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <SectionHeader eyebrow="How it works" title="From photos to cinema in three steps." />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-cursor="hover"
              className="reveal group relative rounded-2xl border border-border bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-30px_rgba(109,94,248,0.4)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {s.icon}
                </span>
                <span className="text-[13px] font-medium tracking-widest text-muted-foreground/70">
                  {s.n}
                </span>
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
    {
      icon: <Film className="h-5 w-5" />,
      title: "Cinematic Results",
      body: "Studio-grade camera moves, color, and pacing — designed to feel handcrafted, not templated.",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Multi-Platform Ready",
      body: "One click exports for Reels, TikTok, YouTube Shorts, MLS, and your website — sized perfectly.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Save Time",
      body: "Skip editors, shoots, and revisions. Turn a batch of photos into a full campaign in minutes.",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Built for Real Estate",
      body: "Trained on listings — from luxury estates to city apartments — so the output feels on-brand.",
    },
  ];
  return (
    <section className="mt-28 md:mt-40">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <SectionHeader eyebrow="Why Cinora AI" title="A video studio for every listing." />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              data-cursor="hover"
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
          <div
            aria-hidden
            className="ambient-glow left-1/2 top-[-160px] h-[400px] w-[600px] -translate-x-1/2"
            style={{
              background: "radial-gradient(circle, #8B7CFF 0%, transparent 70%)",
              opacity: 0.35,
            }}
          />
          <div className="relative">
            <Badge>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Early Access
            </Badge>
            <h2 className="mx-auto mt-6 max-w-[720px] text-balance text-[36px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[48px]">
              Be first to experience{" "}
              <span className="bg-gradient-to-r from-primary to-primary-soft bg-clip-text text-transparent">
                Cinora AI
              </span>
              .
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted-foreground">
              Join the waitlist for founder pricing, priority access, and a first look when we open
              the doors.
            </p>
            <div className="mx-auto mt-9 max-w-[520px]">
              <WaitlistForm id="waitlist-bottom" className="justify-center" />
              <p className="mt-3 text-[13px] text-muted-foreground">
                No spam. Only launch updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function WaitlistForm({ id, className = "" }: { id?: string; className?: string }) {
  const handleOpenForm = () => {
    if ((window as any).Tally) {
      (window as any).Tally.openPopup('7Rgxz6', {
        layout: 'modal',
        width: 700
      });
    } else {
      window.open('https://tally.so/r/7Rgxz6', '_blank');
    }
  };

  return (
    <div id={id} className={`flex ${className}`}>
      <button
        type="button"
        onClick={handleOpenForm}
        data-cursor="hover"
        className="btn-glow-effect group inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full px-8 text-[14.5px] font-medium transition-all duration-300 hover:scale-105"
      >
        Join Waitlist
      </button>
    </div>
  );
}