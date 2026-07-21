import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
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

export const Route = createFileRoute("/terms")({
    head: () => ({
        meta: [{ title: "Terms of Service — Cinora AI" }],
    }),
    component: TermsPage,
});

/*
  Uses the exact same background, cursor trail, nav, and footer as the
  homepage (imported from ../components/site-chrome, not redefined here),
  so it looks and behaves identically. Only the content in the middle is
  page-specific.
*/
function TermsPage() {
    const scrolled = useScrolled();
    useRevealOnScroll();

    return (
        <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
            <HalftoneBackground />
            <AmbientGlows />
            <CursorTrail />

            <Nav scrolled={scrolled} />

            <main className="relative z-10">
                <section className="pt-16 pb-28 md:pt-24 lg:pt-28">
                    <div className="mx-auto w-full max-w-[820px] px-6">
                        <div className="reveal">
                            <Link
                                to="/"
                                data-cursor="hover"
                                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Back to Cinora AI
                            </Link>

                            <div className="mt-6">
                                <Badge>Legal</Badge>
                            </div>
                            <h1 className="mt-5 text-balance text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">
                                Terms of Service
                            </h1>
                            <p className="mt-3 text-[14px] text-muted-foreground">Last updated: July 21, 2026</p>
                            <p className="mt-6 max-w-[640px] text-[15px] leading-relaxed text-muted-foreground">
                                Welcome to Cinora AI. These Terms of Service ("Terms") govern your access to and
                                use of Cinora AI's website, software applications, and video generation platform
                                (collectively, the "Services"). Cinora AI is an artificial intelligence-powered
                                tool designed to transform static real estate listing photos into cinematic
                                marketing videos.
                            </p>
                        </div>

                        <div className="mt-14 space-y-12">
                            {TERMS_SECTIONS.map((section, i) => (
                                <div
                                    key={section.title}
                                    className="reveal"
                                    style={{ transitionDelay: `${Math.min(i * 40, 320)}ms` }}
                                >
                                    <h2 className="text-[20px] font-semibold tracking-tight">{section.title}</h2>
                                    <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                                        {section.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="reveal mt-16 rounded-2xl border border-border bg-white p-6">
                            <h2 className="text-[16px] font-semibold tracking-tight">Contact Us</h2>
                            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                                For questions regarding these Terms or for support, please contact{" "}
                                <a href="mailto:striveautomations.ai@gmail.com" className="text-primary hover:underline">
                                    striveautomations.ai@gmail.com
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

/* ---------------- CONTENT ---------------- */

function List({ items }: { items: string[] }) {
    return (
        <ul className="list-disc space-y-2 pl-5">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

const TERMS_SECTIONS: { title: string; content: ReactNode }[] = [
    {
        title: "1. Acceptance of Terms",
        content: (
            <p>
                By creating an account or using our Services, you agree to be bound by these Terms. If
                you are using the Services on behalf of a real estate agency or company, you represent
                that you have the authority to bind that entity to these Terms.
            </p>
        ),
    },
    {
        title: "2. Eligibility and Accounts",
        content: (
            <List
                items={[
                    "Age: You must be at least 18 years old to use Cinora AI.",
                    "Account Accuracy: You must provide accurate and complete information when registering. You are responsible for all activity that occurs under your account.",
                    "Security: You are responsible for safeguarding your login credentials. Notify us immediately of any unauthorized access.",
                ]}
            />
        ),
    },
    {
        title: "3. Content and Intellectual Property",
        content: (
            <>
                <div>
                    <h3 className="text-[14.5px] font-semibold text-foreground">A. User Content (Listing Photos)</h3>
                    <div className="mt-2">
                        <List
                            items={[
                                "Ownership: You retain all ownership rights to the property photos you upload to Cinora AI.",
                                "License to Cinora: By uploading photos, you grant Cinora AI a worldwide, royalty-free, and non-exclusive license to use, host, and process your photos solely to generate videos for you and to improve our AI models' understanding of real estate environments.",
                                "Rights Warranty: You represent and warrant that you have all necessary rights, permissions, and licenses (from homeowners or photographers) to upload the photos and transform them into video format.",
                            ]}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-[14.5px] font-semibold text-foreground">B. Output Content (Generated Videos)</h3>
                    <div className="mt-2">
                        <List
                            items={[
                                "Commercial Rights: Subject to your payment of applicable fees, Cinora AI grants you a full license to use the generated cinematic videos for commercial real estate marketing (e.g., MLS listings, social media, websites, and advertisements).",
                                "AI Nature: You acknowledge that because the videos are AI-generated, other users may occasionally generate similar cinematic camera moves or styles.",
                            ]}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-[14.5px] font-semibold text-foreground">C. Cinora AI Property</h3>
                    <p className="mt-2">
                        The Cinora AI name, logo, software, unique video styles, and website interface are
                        the exclusive property of Cinora AI and are protected by intellectual property laws.
                    </p>
                </div>
            </>
        ),
    },
    {
        title: "4. Prohibited Conduct",
        content: (
            <>
                <p>You agree NOT to use Cinora AI to:</p>
                <List
                    items={[
                        "Deceptive Listings: Generate videos that intentionally misrepresent a property's condition or add features that do not exist (e.g., adding a pool or removing a nearby power line) in a way that violates local real estate advertising laws.",
                        "Infringement: Upload photos for which you do not have the legal right to create derivative works.",
                        "Reverse Engineering: Attempt to extract the source code or proprietary AI weights of Cinora AI.",
                        "Automated Scraping: Use bots to scrape our platform or generate videos at an industrial scale without an Enterprise API agreement.",
                    ]}
                />
            </>
        ),
    },
    {
        title: "5. AI Accuracy and Disclaimer",
        content: (
            <List
                items={[
                    'Visual Enhancements: Cinora AI uses generative technology to create camera motion, lighting effects, and transitions. While we strive for realism, the output is an artistic "cinematic" representation.',
                    "No Professional Advice: The generated videos are marketing materials only. They are not intended to be used for legal property surveys, structural inspections, or appraisals.",
                    "User Review: It is the user's responsibility to review generated videos to ensure they comply with local Fair Housing and Truth-in-Advertising regulations before publishing them to a listing.",
                ]}
            />
        ),
    },
    {
        title: "6. Subscriptions and Payments",
        content: (
            <List
                items={[
                    "Plans: Certain features (high-resolution exports, removal of watermarks) are only available via paid subscriptions or credits.",
                    "Auto-Renewal: Subscriptions renew automatically unless canceled before the next billing cycle.",
                    "Refunds: Due to the high computing costs of AI video generation, all sales are final. Refunds may be granted at our sole discretion in cases of technical failure.",
                ]}
            />
        ),
    },
    {
        title: "7. Limitation of Liability",
        content: (
            <p>
                To the maximum extent permitted by law, Cinora AI shall not be liable for any indirect,
                incidental, or consequential damages resulting from your use of the videos or any errors
                in the AI-generated output. Our total liability shall not exceed the amount paid by you
                to Cinora AI in the past 12 months.
            </p>
        ),
    },
    {
        title: "8. Termination",
        content: (
            <p>
                We reserve the right to suspend or terminate your account if you violate these Terms or
                if your use of the service poses a risk to our platform. You may stop using the service
                and cancel your account at any time.
            </p>
        ),
    },
    {
        title: "9. Governing Law",
        content: (
            <p>
                These Terms shall be governed by the laws of <strong>India</strong> and the
                State of <strong>Tamil Nadu</strong>. Any disputes shall be resolved
                through the exclusive jurisdiction of the courts located in
                <strong> Coimbatore, Tamil Nadu</strong>.
            </p>
        ),
    },
];