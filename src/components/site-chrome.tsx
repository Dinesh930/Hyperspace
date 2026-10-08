/*
  Shared "chrome" used on every page: the halftone canvas background,
  the cursor trail, the sticky nav, and the footer — plus a couple of
  small shared pieces (Badge, SectionHeader) and two hooks (useScrolled,
  useRevealOnScroll) that every page needs to wire up.

  Both src/routes/index.tsx and src/routes/terms.tsx import from here,
  so there is exactly ONE copy of this code running the site — nothing
  duplicated, nothing that can drift out of sync between pages.
*/
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/* ---------------- HOOKS ---------------- */

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function useRevealOnScroll() {
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
}

/* ---------------- HALFTONE BACKGROUND ---------------- */

export function HalftoneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CELL = 6;
    let raf: number;
    let t = 0;
    const ripples: { x: number; y: number; time: number }[] = [];

    function onClick(e: MouseEvent) {
      ripples.push({ x: e.clientX, y: e.clientY, time: performance.now() });
      if (ripples.length > 4) ripples.shift();
    }
    window.addEventListener("click", onClick);

    function hash(x: number, y: number) {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
      return s - Math.floor(s);
    }
    function smooth(v: number) {
      return v * v * (3 - 2 * v);
    }
    function noise2D(x: number, y: number) {
      const xi = Math.floor(x),
        yi = Math.floor(y);
      const xf = x - xi,
        yf = y - yi;
      const tl = hash(xi, yi),
        tr = hash(xi + 1, yi);
      const bl = hash(xi, yi + 1),
        br = hash(xi + 1, yi + 1);
      const u = smooth(xf),
        v = smooth(yf);
      const top = tl + (tr - tl) * u;
      const bottom = bl + (br - bl) * u;
      return top + (bottom - top) * v;
    }
    function fbm(x: number, y: number) {
      let total = 0,
        amp = 0.5,
        freq = 1;
      for (let i = 0; i < 3; i++) {
        total += noise2D(x * freq, y * freq) * amp;
        freq *= 2;
        amp *= 0.5;
      }
      return total;
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    function render() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const now = performance.now();
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].time > 1000) ripples.splice(i, 1);
      }

      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const x = ix * CELL;
          const y = iy * CELL;

          const n = fbm(x * 0.01 + t * 0.06, y * 0.01 + t * 0.04);
          const shaped = Math.pow(Math.max(0, n), 1.8);
          let r = shaped * CELL * 0.16;

          for (const rp of ripples) {
            const age = now - rp.time;
            const dist = Math.hypot(x - rp.x, y - rp.y);
            const rippleRadius = age * 0.1;
            const band = 43;
            const diff = Math.abs(dist - rippleRadius);
            if (diff < band) {
              const fade = 1 - age / 1000;
              r += (1 - diff / band) * fade * CELL * 0.4;
            }
          }

          if (r <= 0.4) continue;
          ctx!.fillStyle = "rgba(36, 31, 31, 0.2)";
          ctx!.beginPath();
          ctx!.arc(x, y, r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (!reduced) t += 0.01;
      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="cin-halftone-canvas" aria-hidden />;
}

/* ---------------- AMBIENT GLOWS ---------------- */
/* The two blurred purple orbs drifting behind the top of every page. */

export function AmbientGlows() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[900px] overflow-hidden"
    >
      <div
        className="ambient-glow animate-drift-a left-[10%] top-[-120px] h-[420px] w-[420px]"
        style={{ background: "radial-gradient(circle, #8B7CFF 0%, transparent 70%)" }}
      />
      <div
        className="ambient-glow animate-drift-b right-[5%] top-[80px] h-[520px] w-[520px]"
        style={{
          background: "radial-gradient(circle, #6D5EF8 0%, transparent 70%)",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

/* ---------------- CURSOR TRAIL ---------------- */

const CURSOR_TRAIL_COUNT = 14;

export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coords = useRef({ x: 0, y: 0 });
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || reduced || !containerRef.current) return;

    const circles = Array.from(
      containerRef.current.querySelectorAll<HTMLDivElement>(".cin-cursor-circle"),
    );
    const trail = circles.map(() => ({ x: 0, y: 0 }));

    const onMove = (e: MouseEvent) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circles.forEach((circle, index) => {
        circle.style.transform = `translate(${x}px, ${y}px) scale(${
          (circles.length - index) / circles.length
        })`;

        trail[index].x = x;
        trail[index].y = y;

        const next = trail[index + 1] || trail[0];
        x += (next.x - x) * 0.45;
        y += (next.y - y) * 0.45;
      });

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="cin-cursor-trail">
      {Array.from({ length: CURSOR_TRAIL_COUNT }).map((_, i) => (
        <div key={i} className="cin-cursor-circle" />
      ))}
    </div>
  );
}

/* ---------------- NAV ---------------- */
/* Logo now always routes to "/" via TanStack Router's <Link>, instead of
   an in-page "#top" anchor — that way it behaves correctly from ANY
   page (including this new Terms page), not just the homepage. This is
   the one small, necessary behavior change; everything else is
   pixel-identical to before. */

export function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-soft shadow-[0_6px_20px_-6px_rgba(109,94,248,0.6)]">
              <span className="h-2 w-2 rounded-[3px] bg-white/95" />
            </span>
            <span className="text-[17px] font-semibold tracking-tight">
              Cinora <span className="text-muted-foreground">AI</span>
            </span>
          </Link>
          <Link
            to="/studio"
            data-cursor="hover"
            className="text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "!text-primary" }}
          >
            Studio
          </Link>
        </div>
        <button
          type="button"
          onClick={() =>
            (
              window as unknown as {
                Tally?: {
                  openPopup: (id: string, options: Record<string, unknown>) => void;
                };
              }
            ).Tally?.openPopup("7Rgxz6", { layout: "modal", width: 700 })
          }
          data-cursor="hover"
          className="group inline-flex h-9 items-center rounded-full bg-foreground px-4 text-[13.5px] font-medium text-background transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)] btn-split"
        >
          <span>Join Waitlist</span>
        </button>
      </div>
    </header>
  );
}

/* ---------------- FOOTER ---------------- */
/* "Terms" now routes to /terms via <Link>; Privacy/Contact are left as
   "#" placeholders, same as before, since only Terms was requested. */

export function Footer() {
  return (
    <footer className="relative z-10 mt-28 border-t border-border py-10 md:mt-40">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-4 px-6 text-[13.5px] text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-primary to-primary-soft">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-white/95" />
          </span>
          <span className="font-medium text-foreground">Cinora AI</span>
          <span className="hidden text-muted-foreground sm:inline">
            · Turning Listing Photos Into Cinematic Videos
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED SMALL PIECES ---------------- */

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-3 py-1.5 text-[12.5px] font-medium text-foreground/80 backdrop-blur">
      {children}
    </span>
  );
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
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
