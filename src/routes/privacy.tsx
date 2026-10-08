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

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Hyper space" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
                Back to Hyper space
              </Link>

              <div className="mt-6">
                <Badge>Legal</Badge>
              </div>
              <h1 className="mt-5 text-balance text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">
                Privacy Policy
              </h1>
              <p className="mt-3 text-[14px] text-muted-foreground">Last updated: July 21, 2026</p>
              <p className="mt-6 max-w-[640px] text-[15px] leading-relaxed text-muted-foreground">
                Welcome to Hyper space. This Privacy Policy ("Policy") explains how Hyper space ("we",
                "us", or "Hyper space") collects, uses, and protects your personal information when you
                use our services to transform property photos into cinematic videos.
              </p>
            </div>

            <div className="mt-14 space-y-12">
              {PRIVACY_SECTIONS.map((section, i) => (
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
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a
                  href="mailto:striveautomations.ai@gmail.com"
                  className="text-primary hover:underline"
                >
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

const PRIVACY_SECTIONS: { title: string; content: ReactNode }[] = [
  {
    title: "1. Acknowledgement and Acceptance",
    content: (
      <p>
        By accessing or using Hyper space, you agree to the collection and use of information in
        accordance with this Policy. If you do not agree with these terms, please refrain from using
        our Services.
      </p>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p>
          We collect information to provide a better experience and to generate your cinematic
          videos.
        </p>
        <div>
          <h3 className="text-[14.5px] font-semibold text-foreground">
            2.1 Information You Provide
          </h3>
          <div className="mt-2">
            <List
              items={[
                "Account Information: When you join our waitlist or create an account, we collect your name, email address, and agency/business name.",
                "Property Media (Listing Photos): We collect the photos you upload. These photos may contain metadata (such as the location and time the photo was taken).",
                "Customer Support: Any information you provide when contacting us for support or feedback.",
              ]}
            />
          </div>
        </div>
        <div>
          <h3 className="text-[14.5px] font-semibold text-foreground">
            2.2 Information Collected Automatically
          </h3>
          <div className="mt-2">
            <List
              items={[
                "Usage Data: We collect information on how you interact with our site, such as which features you use and how long you spend on the page.",
                "Device Data: Your IP address, browser type, operating system, and unique device identifiers.",
                "Cookies: We use cookies to remember your preferences and keep you logged in.",
              ]}
            />
          </div>
        </div>
        <div>
          <h3 className="text-[14.5px] font-semibold text-foreground">
            2.3 Information from Third Parties
          </h3>
          <div className="mt-2">
            <List
              items={[
                "Payment Processors: If you purchase a subscription, we receive transaction confirmation from our payment processors (e.g., Stripe). We do not store your full credit card details.",
                "Form Tools: We use tools like Tally.so to collect waitlist information, which is then stored securely in our databases or Google Sheets.",
              ]}
            />
          </div>
        </div>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use your data for the following purposes:</p>
        <List
          items={[
            "Generating Videos: To process your photos into cinematic AI-generated videos.",
            "Product Improvement: To train and refine our AI models to better understand real estate architecture and lighting.",
            "Communication: To send you product updates, founder pricing offers, and security alerts.",
            "Safety & Compliance: To prevent fraudulent listings and ensure our service is not used for deceptive advertising.",
          ]}
        />
      </>
    ),
  },
  {
    title: "4. How We Share Your Information",
    content: (
      <>
        <p>We do not sell your personal information. We only share data with:</p>
        <List
          items={[
            "Service Providers: Cloud hosting (e.g., AWS, Vercel), AI processing units, and database providers who help us run Hyper space.",
            "Legal Requirements: If required by law, we may disclose information to comply with a legal obligation or protect our rights.",
            "Business Transfers: In the event of a merger or acquisition, your data may be transferred to the new owner.",
          ]}
        />
      </>
    ),
  },
  {
    title: "5. Data Security and Retention",
    content: (
      <List
        items={[
          "Security: We implement industry-standard encryption to protect your photos and account data. However, no system is 100% secure.",
          "Retention: We retain your listing photos and generated videos as long as your account is active or as needed to provide you with the service. You may request deletion of your data at any time.",
        ]}
      />
    ),
  },
  {
    title: "6. International Data Transfers",
    content: (
      <p>
        Hyper space operates globally. Your information may be transferred to and maintained on
        computers located outside of your state or country. By using our service, you consent to
        these transfers.
      </p>
    ),
  },
  {
    title: "7. Your Rights",
    content: (
      <>
        <p>
          Depending on your location (such as the EEA or California), you may have the following
          rights:
        </p>
        <List
          items={[
            "Access/Update: The right to see what data we have and correct it.",
            'Deletion: The right to request that we "erase" your listing photos and account data.',
            'Opt-Out: The right to unsubscribe from marketing emails at any time via the "unsubscribe" link.',
          ]}
        />
      </>
    ),
  },
  {
    title: "8. Changes to This Policy",
    content: (
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by
        posting the new Policy on this page and updating the "Last Updated" date.
      </p>
    ),
  },
];
