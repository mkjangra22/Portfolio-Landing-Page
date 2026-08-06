import { useEffect, useRef, useState, MouseEvent, FormEvent } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import {
  Mail,
  Check,
  Copy,
  Linkedin,
  Github,
  Instagram,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // 1. Initialize HLS Video (flipped scale-y-[-1])
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log("HLS Play failed:", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.log("Native Play failed:", err));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // 2. Initialize GSAP Infinite Scrolling Marquee
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const animation = gsap.to(marquee, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  // Copy email helper
  const handleCopy = async (e: MouseEvent) => {
    e.preventDefault();
    const email = "mayankjangra2015@gmail.com";

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) {
      console.error("Failed to copy email:", err);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Form submission logic targeting Supabase 'contacts' table
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: "error", message: "Please fill in all required fields (Full Name, Email & Message)." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          subject: formData.subject.trim() || null,
          message: formData.message.trim(),
        },
      ]);

     if (error) {
      throw error;
}

// Call the Edge Function to send email
const { error: emailError } = await supabase.functions.invoke(
  "send-contact-email",
  {
    body: {
      full_name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || "",
      subject: formData.subject.trim() || "No Subject",
      message: formData.message.trim(),
    },
  }
);

if (emailError) {
  console.error("Email Error:", emailError);
}

setStatus({
  type: "success",
  message: "Your message has been sent successfully! I'll get back to you soon.",
});

setFormData({
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});
    } catch (err: any) {
      console.error("Contact Form Error:", err);
      setStatus({
        type: "error",
        message: err?.message || "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { label: "Instagram", url: "https://www.instagram.com/mkjangra22/", icon: <Instagram className="w-4 h-4" /> },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mkjangra22/", icon: <Linkedin className="w-4 h-4" /> },
    { label: "GitHub", url: "https://github.com/mkjangra22", icon: <Github className="w-4 h-4" /> },
  ];

  return (
    <footer
      id="contact"
      className="relative pt-24 pb-8 md:pb-12 bg-bg border-t border-stroke overflow-hidden"
    >
      {/* Background flipped HLS video with heavier overlays */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-25 scale-y-[-1]"
        />
        {/* Dark overlay (heavier bg-black/60) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        {/* Top fade transition */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* GSAP Infinite Marquee Ribbon */}
        <div className="w-full overflow-hidden border-t border-b border-stroke/40 py-5 bg-surface/5 backdrop-blur-sm mb-16 sm:mb-20 lg:mb-24">
          <div className="flex whitespace-nowrap w-[200%] md:w-[200%]" ref={marqueeRef}>
            {/* Set 1 */}
            <div className="flex justify-around min-w-full font-display italic text-2xl sm:text-4xl md:text-5xl uppercase tracking-wider text-text-primary/70">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={`dup1-${i}`} className="inline-flex items-center gap-6">
                  <span>BUILDING THE FUTURE</span>
                  <span className="text-[#89AACC]">•</span>
                </span>
              ))}
            </div>
            {/* Set 2 (duplicates first set exactly for continuous loop) */}
            <div className="flex justify-around min-w-full font-display italic text-2xl sm:text-4xl md:text-5xl uppercase tracking-wider text-text-primary/70">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={`dup2-${i}`} className="inline-flex items-center gap-6">
                  <span>BUILDING THE FUTURE</span>
                  <span className="text-[#89AACC]">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Contact Section */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

            {/* Left Column: Contact Me Info */}
            <div className="lg:col-span-1 flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-mono mb-4 block">
                  CONTACT ME
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-text-primary mb-6 font-sans leading-tight">
                  {/* Have a project or opportunity?*/ <span className="font-display italic block sm:inline">Let's connect!</span>}
                </h2>
                {/* <p className="text-xs sm:text-sm text-muted font-light leading-relaxed mb-8 max-w-md">
                  Feel free to reach out for projects, internship, freelance opportunity, or collaboration in mind?
                </p> */}
              </div>

              {/* Social & Contact details */}
              <div className="flex flex-col gap-4 font-mono text-xs sm:text-sm">
                {/* Email Pill & Circular Copy Button Row */}
                <div className="flex items-center gap-3 w-full max-w-full">
                  <a
                    id="cta-email-mailto"
                    href="mailto:mayankjangra2015@gmail.com"
                    className="group relative inline-flex items-center gap-3 bg-surface border border-stroke text-text-primary text-xs sm:text-sm font-semibold rounded-full px-5 sm:px-6 py-3.5 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl overflow-hidden truncate flex-1"
                  >
                    <span className="absolute -inset-[1.5px] bg-transparent rounded-full group-hover:accent-gradient -z-10 transition-all duration-300" />
                    <Mail className="w-4 h-4 text-[#89AACC] shrink-0" />
                    <span className="truncate">mayankjangra2015@gmail.com</span>
                  </a>

                  <button
                    id="cta-email-copy"
                    onClick={handleCopy}
                    className="group flex p-3.5 rounded-full border border-stroke bg-surface/50 hover:bg-surface text-muted hover:text-text-primary transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-lg shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400 animate-pulse" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Circular Social Profiles Row (matching footer bottom-right icons) */}
                <div className="pt-2 pb-1 flex flex-col gap-3">
                  {/* <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono">
                    {CONNECT ON SOCIALS }
                  </span> */}
                  <div className="flex items-center gap-3.5" id="contact-social-icons">
                    {socials.map((soc) => (
                      <a
                        key={`contact-soc-${soc.label}`}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-stroke/70 bg-surface/30 flex items-center justify-center text-muted hover:text-text-primary hover:border-[#89AACC]/60 hover:bg-surface hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6"
                        title={soc.label}
                      >
                        {soc.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Embedded Google Map Location Card (compact size) */}
                <div className="flex flex-col gap-2 my-1">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[10px] text-muted uppercase tracking-[0.2em]">
                      LOCATION
                    </span>
                    <span className="text-text-primary flex items-center gap-1.5 font-light">
                      <span></span> Sonipat, Haryana, India
                    </span>
                  </div>

                  <div className="relative w-full h-32 sm:h-36 rounded-2xl border border-stroke/70 overflow-hidden group shadow-xl bg-surface/40">
                    {/* Top-Left Floating 'Open in Maps' Badge */}
                    <a
                      href="https://www.google.com/maps?ll=28.969646,77.056485&z=11&t=m&hl=en-US&gl=US&mapclient=embed&q=Sonipat+Haryana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-bg/90 backdrop-blur-md border border-stroke text-[10px] sm:text-[11px] font-mono font-semibold text-[#89AACC] hover:text-text-primary hover:bg-surface hover:scale-105 active:scale-95 transition-all shadow-lg"
                      title="Open Sonipat, India in Google Maps"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3 h-3 text-[#89AACC]" />
                    </a>

                    {/* Interactive Embedded Google Map iframe */}
                    <iframe
                      title="Sonipat Google Map Location"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(0.4) contrast(1.1) opacity(0.9)" }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://maps.google.com/maps?q=Sonipat,+Haryana,+India&t=&z=12&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full group-hover:filter-none transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (compact box) */}
            <div className="lg:col-span-1 h-full flex flex-col">
              <div className="bg-surface/50 border border-stroke rounded-3xl p-5 sm:p-6 md:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                {/* Gradient Top Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#89AACC]/50 to-transparent" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-xs font-mono uppercase tracking-wider text-muted">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-bg/80 border border-stroke rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-all shadow-inner"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-bg/80 border border-stroke rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-all shadow-inner"
                      />
                    </div>

                    {/* Phone Number (Optional) */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-mono uppercase tracking-wider text-muted flex items-center justify-between">
                        <span>Phone Number</span>
                        <span className="text-[10px] text-muted/60 lowercase font-normal">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-bg/80 border border-stroke rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-muted">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Project Opportunity / Hello"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-bg/80 border border-stroke rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-all shadow-inner"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={2}
                      placeholder="Tell me about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-bg/80 border border-stroke rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-all resize-none shadow-inner"
                    />
                  </div>

                  {/* Status Banner */}
                  {status && (
                    <div
                      className={`p-3 rounded-xl flex items-start gap-2.5 text-xs font-sans ${status.type === "success"
                          ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                          : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                        }`}
                    >
                      {status.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <span>{status.message}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full inline-flex items-center justify-center gap-2.5 bg-surface border border-stroke text-text-primary text-xs sm:text-sm font-semibold rounded-xl px-6 py-3 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  >
                    {/* Outer gradient hover border ring */}
                    <span className="absolute -inset-[1.5px] bg-transparent rounded-xl group-hover:accent-gradient -z-10 transition-all duration-300" />

                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#89AACC]" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 text-[#89AACC] group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bar */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Leftside: Pulser availability */}
          <div className="flex items-center gap-2.5" id="footer-availability">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-muted tracking-tight">
              Available and Open to work
            </span>
          </div>

          {/* Rightside: Copyright details */}
          <div className="text-muted/100 font-mono text-[11px] text-center sm:text-right">
            © mkjangra22. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
}

