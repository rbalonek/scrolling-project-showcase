import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    title: "Jewelry Lighting & Reflections",
    description: "Shooting high-end jewelry in a controlled studio setting required a meticulous approach to lighting. Every gemstone had to reflect light in a way that enhanced its brilliance while avoiding unwanted glare.",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6e3?w=800&q=80",
    date: "1/5/25",
    client: "TECH STARTUP",
    category: "PRODUCT",
    camera: "CANON EOS R5",
    lens: "70-200MM F/2.8 VR II",
    link: "#project-1",
  },
  {
    title: "Kyoto Cherry Blossoms (2024)",
    description: "Amid the cherry blossom season in Kyoto, this project focused on capturing the fleeting beauty of spring. The soft pink petals contrasted beautifully with the ancient temples, creating a dreamlike atmosphere.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    date: "12/19/24",
    client: "TECH STARTUP",
    category: "LANDSCAPE",
    camera: "CANON EOS R5",
    lens: "50MM F/1.2 SUMMILUX",
    link: "#project-2",
  },
  {
    title: "Urban Architecture Series",
    description: "A deep dive into the geometric patterns and raw textures of modern urban architecture. Each frame highlights the interplay between light, shadow, and structural form.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    date: "11/3/24",
    client: "DESIGN AGENCY",
    category: "ARCHITECTURE",
    camera: "SONY A7R V",
    lens: "24-70MM F/2.8 GM",
    link: "#project-3",
  },
  {
    title: "Portrait in Natural Light",
    description: "This portrait series explored the beauty of natural, unmanipulated light during golden hour. Minimal equipment, maximum emotional impact through genuine connection with each subject.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    date: "10/15/24",
    client: "FASHION LABEL",
    category: "PORTRAIT",
    camera: "LEICA M11",
    lens: "35MM F/1.4 SUMMILUX",
    link: "#project-4",
  },
];

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-10 py-1 text-[11px] uppercase tracking-[0.1em] font-mono">
    <span className="w-24 text-foreground/50 font-medium">{label}</span>
    <span className="text-foreground font-medium">{value}</span>
  </div>
);

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: "#faf0e4",
        backgroundImage: "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Sections */}
      {PROJECTS.map((p, i) => (
        <section
          key={i}
          data-index={i}
          ref={(el) => { sectionRefs.current[i] = el; }}
          className="min-h-screen flex items-center px-8 md:px-20 py-16"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-[1400px]">
            {/* Image */}
            <div className="flex-shrink-0 md:w-[55%] overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Details */}
            <div className="flex-1 pr-0 md:pr-24 flex flex-col justify-center">
              <h2
                className="text-3xl md:text-5xl mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: "#1a1a1a" }}
              >
                {p.title}
              </h2>
              <p className="text-[13px] leading-relaxed mb-8 max-w-[400px] tracking-wide font-mono" style={{ color: "rgba(0,0,0,0.5)" }}>
                {p.description}
              </p>
              <div className="border-t border-b py-5 mb-8" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                {p.date && <MetaRow label="DATE" value={p.date} />}
                {p.client && <MetaRow label="CLIENT" value={p.client} />}
                {p.category && <MetaRow label="CATEGORY" value={p.category} />}
                {p.camera && <MetaRow label="CAMERA" value={p.camera} />}
                {p.lens && <MetaRow label="LENS" value={p.lens} />}
              </div>
              <a
                href={p.link}
                className="inline-block px-7 py-3 rounded text-xs tracking-wide font-mono transition-opacity hover:opacity-80 self-start"
                style={{ backgroundColor: "#e8a854", color: "#1a1a1a" }}
              >
                View Project
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* Thumbnail strip */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            onClick={() => scrollTo(i)}
            className="overflow-hidden rounded-sm cursor-pointer transition-all duration-500"
            style={{
              width: activeIndex === i ? 80 : 60,
              height: activeIndex === i ? 100 : 60,
              opacity: activeIndex === i ? 1 : 0.4,
              filter: activeIndex === i ? "grayscale(0)" : "grayscale(0.6)",
              boxShadow: activeIndex === i ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
            }}
          >
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-5 left-8 flex items-center gap-4 z-50 font-mono text-xs" style={{ color: "rgba(0,0,0,0.5)" }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-7 h-7 border rounded-sm flex items-center justify-center transition-colors hover:bg-black/5"
          style={{ borderColor: "rgba(0,0,0,0.2)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
        <span>{String(activeIndex + 1).padStart(2, "0")}/{String(PROJECTS.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export default Index;
