import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, type DragEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  Video,
  FileImage,
  Trash2,
  Film,
  Compass,
  Zap,
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
} from "../components/site-chrome";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "AI Video Studio — Cinora AI" },
      {
        name: "description",
        content: "Turn your listing photos into cinematic AI-generated videos in real-time.",
      },
    ],
  }),
  component: StudioPage,
});

interface GalleryItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "living-room",
    title: "Luxury Living Room Pan",
    thumbnail: "/images/showcase/s2.png",
    videoUrl: "/videos/generated_sample.mp4",
    duration: "5s",
  },
  {
    id: "kitchen",
    title: "Modern Kitchen Slide",
    thumbnail: "/images/showcase/s3.png",
    videoUrl: "/videos/generated_sample.mp4",
    duration: "5s",
  },
  {
    id: "bar",
    title: "Executive Lounge View",
    thumbnail: "/images/showcase/s5.png",
    videoUrl: "/videos/generated_sample.mp4",
    duration: "5s",
  },
  {
    id: "bedroom",
    title: "Cozy Master Suite Zoom",
    thumbnail: "/images/showcase/s6.png",
    videoUrl: "/videos/generated_sample.mp4",
    duration: "5s",
  },
];

const GENERATION_STEPS = [
  "Uploading image assets...",
  "Analyzing composition & lighting...",
  "Synthesizing camera pan vector...",
  "Rendering high-fidelity frames...",
  "Finalizing video export...",
];

function StudioPage() {
  const scrolled = useScrolled();
  useRevealOnScroll();

  // Upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  // Video state
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Drag & drop handlers
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setVideoUrl(null); // Reset video if new image is uploaded
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setVideoUrl(null); // Reset video if new image is uploaded
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setVideoUrl(null);
  };

  // Generation simulation
  const handleGenerate = () => {
    if (!imageFile) return;

    setIsGenerating(true);
    setCountdown(5);
    setProgress(0);
    setVideoUrl(null);

    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      const secondsLeft = Math.max(0, 5 - Math.floor(elapsed / 1000));

      setProgress(pct);
      setCountdown(secondsLeft);

      // Determine active status message based on progress
      const stepIndex = Math.min(
        GENERATION_STEPS.length - 1,
        Math.floor((pct / 100) * GENERATION_STEPS.length),
      );
      setCurrentStep(GENERATION_STEPS[stepIndex]);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsGenerating(false);
        setVideoUrl("/videos/generated_sample.mp4");
        setActiveTitle(`AI Showcase - ${imageFile.name.split(".")[0]}`);
        setIsPlaying(true);
        setIsMuted(true);
      }
    }, 100);
  };

  // Playback control handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch((err) => console.log("Play failed", err));
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => console.log("Play failed", err));
      setIsPlaying(true);
    }
  };

  // Handler for clicking recent creation
  const handleSelectRecent = (item: GalleryItem) => {
    removeImage();
    setVideoUrl(item.videoUrl);
    setActiveTitle(item.title);
    setIsPlaying(true);
    setIsMuted(true);

    // Scroll smoothly to player
    const playerEl = document.getElementById("studio-viewport");
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <HalftoneBackground />
      <AmbientGlows />
      <CursorTrail />

      <Nav scrolled={scrolled} />

      <main className="relative z-10 mx-auto w-full max-w-[1000px] px-6 pt-12 pb-24">
        {/* Breadcrumb Header */}
        <div className="reveal">
          <Link
            to="/"
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <div className="mt-6">
            <Badge>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Creator Studio
            </Badge>
          </div>

          <h1 className="mt-4 text-balance text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">
            AI Photo-to-Video Studio
          </h1>
          <p className="mt-3 max-w-[600px] text-[15px] leading-relaxed text-muted-foreground">
            Upload any static listing image, click generate, and watch the AI synthesize premium
            camera paths and cinematic transitions in real-time.
          </p>
        </div>

        {/* Studio Viewport Card */}
        <div
          id="studio-viewport"
          className="reveal mt-10 overflow-hidden rounded-[24px] border border-border bg-white p-4 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.15)] md:p-6"
        >
          {/* Main workspace area */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black/5">
            {/* Ambient Background Blur inside the player for premium feel */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 blur-xl transition-all duration-700"
              style={{
                backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
              }}
            />

            {/* 1. Drag & Drop Upload Zone (Default state) */}
            {!imagePreview && !videoUrl && !isGenerating && (
              <div
                className={`relative flex h-full w-full flex-col items-center justify-center border-2 border-dashed px-6 transition-all duration-300 ${
                  isDragActive
                    ? "border-primary bg-primary/5 scale-[0.99] rounded-2xl"
                    : "border-border hover:border-primary/40 hover:bg-black/[0.01]"
                } rounded-2xl cursor-pointer`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="animate-bob grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Upload className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-[18px] font-semibold tracking-tight text-foreground">
                  Drag & Drop Property Photo
                </h3>
                <p className="mt-2 text-center text-[13.5px] text-muted-foreground max-w-[380px]">
                  Drop a high-resolution interior, exterior, or aerial shot here, or{" "}
                  <span className="text-primary font-medium underline underline-offset-2">
                    browse files
                  </span>
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-[11px] font-medium text-muted-foreground/80">
                  <span className="flex items-center gap-1 bg-black/5 px-2.5 py-1.5 rounded-md">
                    <Video className="h-3 w-3" /> Auto camera motion
                  </span>
                  <span className="flex items-center gap-1 bg-black/5 px-2.5 py-1.5 rounded-md">
                    <Compass className="h-3 w-3" /> Real estate tuned
                  </span>
                </div>
              </div>
            )}

            {/* 2. Image Loaded state (Before generation) */}
            {imagePreview && !videoUrl && !isGenerating && (
              <div className="relative flex h-full w-full flex-col items-center justify-center p-6">
                <img
                  src={imagePreview}
                  alt="Source Listing"
                  className="h-full w-full rounded-xl object-contain shadow-md"
                />

                {/* Overlay actions */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium tracking-wider text-white/70 uppercase">
                      Ready to synthesize
                    </p>
                    <h4 className="text-[15px] font-semibold text-white truncate max-w-[280px]">
                      {imageFile?.name || "Uploaded Image"}
                    </h4>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={removeImage}
                      data-cursor="hover"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 backdrop-blur transition-all duration-300"
                      title="Remove Image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleGenerate}
                      data-cursor="hover"
                      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-5 text-[13.5px] font-medium text-white hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all duration-300"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> Generate Video
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Generating State (5-second countdown) */}
            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-8 text-white">
                {/* Advanced pulsing/rotating gradient circle */}
                <div className="relative flex h-32 w-32 items-center justify-center">
                  {/* Rotating Conic Gradient Border */}
                  <div
                    className="absolute inset-0 rounded-full animate-spin-slow"
                    style={{
                      background: "conic-gradient(from 0deg, #6D5EF8, #8B7CFF, transparent 60%)",
                      padding: "3px",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMaskComposite: "destination-out",
                    }}
                  />
                  {/* Pulsing Radial Accent Core */}
                  <div className="absolute inset-2 animate-pulse rounded-full bg-[#6D5EF8]/10" />

                  {/* Countdown number */}
                  <div className="relative text-center">
                    <span className="text-3xl font-bold tracking-tight">{countdown}s</span>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">
                      remaining
                    </p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="mt-8 w-full max-w-[320px] text-center">
                  <div className="flex justify-between items-center text-[12.5px] font-medium mb-2 text-white/90">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                      AI Generating
                    </span>
                    <span>{progress}%</span>
                  </div>
                  {/* Progress track */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-primary-soft to-[#8B7CFF] transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {/* Running status log line */}
                  <p className="mt-3 text-[13px] text-white/60 truncate italic">{currentStep}</p>
                </div>
              </div>
            )}

            {/* 4. Active Video Player state (Completed) */}
            {videoUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full bg-black animate-fade-in"
                style={{ zIndex: 10, opacity: 1 }}
              >
                {/* Video elements */}
                <video
                  key="generated-video"
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => {
                    console.error("Browser failed to load video from URL:", videoUrl, e);
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Video Overlays */}
                <div className="absolute right-4 top-4 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur">
                    <span className="cin-rec-dot h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span>REC PLAYBACK</span>
                  </div>
                </div>

                {/* Bottom Custom Controls Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-2 opacity-90 transition-opacity hover:opacity-100">
                  <div className="flex items-center justify-between text-white">
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">
                        AI Video Generated
                      </span>
                      <h4 className="text-[14px] font-medium truncate">{activeTitle}</h4>
                    </div>

                    {/* Controller Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={restartVideo}
                        className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                        title="Restart"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Action buttons under player */}
          {(videoUrl || imagePreview) && !isGenerating && (
            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4 flex-wrap gap-3">
              <p className="text-[12.5px] text-muted-foreground flex items-center gap-1.5">
                <Film className="h-3.5 w-3.5 text-primary" /> Powered by Cinora's local state
                simulation.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={removeImage}
                  data-cursor="hover"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-white px-4 text-[13px] font-medium text-foreground hover:bg-neutral-50 transition"
                >
                  Clear Studio
                </button>
                {imagePreview && !videoUrl && (
                  <button
                    onClick={handleGenerate}
                    data-cursor="hover"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-5 text-[13px] font-medium text-white hover:bg-primary-hover shadow-md shadow-primary/20 transition"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Start Generation
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <section className="mt-16">
          <div className="reveal">
            <h2 className="text-[24px] font-semibold tracking-tight">Recent Creations</h2>
            <p className="mt-1.5 text-[14px] text-muted-foreground">
              Select one of our pre-rendered studio outputs to instantly load and play it in the
              viewer.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleSelectRecent(item)}
                data-cursor="hover"
                className="reveal group cursor-pointer overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_36px_-12px_rgba(109,94,248,0.25)]"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-primary shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <Play className="h-4 w-4 fill-primary text-primary ml-0.5" />
                    </span>
                  </div>
                  {/* Duration Badge */}
                  <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {item.duration}
                  </span>
                </div>

                {/* Text details */}
                <div className="p-3">
                  <h4 className="text-[13.5px] font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <span className="mt-0.5 block text-[11px] font-medium text-muted-foreground">
                    AI Cinematic Video
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
