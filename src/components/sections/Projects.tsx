"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel, SecNum } from "@/components/ui/section-label";
import { useLang } from "@/contexts/LanguageContext";

type ProjectMeta = {
  tags: string[];
  github: string | null;
  demo: string | null;
  video: string | null;
  image: string | null;
  live: boolean;
  fit?: "contain";
};

const projectsMeta: ProjectMeta[] = [
  {
    tags: ["Next.js", "TypeScript", "Tailwind", "Cloudflare Pages", "Workers", "SEO"],
    github: null,
    demo: "https://absolutoreformasyproyectos.com",
    video: null,
    image: "/images/project-absoluto-reformas.png",
    live: true,
    fit: "contain",
  },
  {
    tags: ["n8n", "JavaScript", "BOE API", "RSS", "Telegram", "MIT"],
    github: "https://github.com/nozutech/convenios-al-dia",
    demo: null,
    video: null,
    image: "/images/project-convenios.png",
    live: true,
  },
  {
    tags: ["Node.js", "Express", "SQLite", "Google Wallet", "Docker", "AGPL-3.0"],
    github: "https://github.com/nozutech/theusual",
    demo: null,
    video: null,
    image: "/images/project-theusual.png",
    live: false,
    fit: "contain",
  },
  {
    tags: ["Node.js", "Express", "Apple Wallet", "Google Wallet", "APNs", "PWA", "Railway", "SQLite"],
    github: "https://github.com/nozutech/loyalty-wallet",
    demo: null,
    video: null,
    image: "/images/project-loyalty-wallet.png",
    live: false,
  },
  {
    tags: ["FastAPI", "Groq AI", "n8n", "PostgreSQL", "Docker", "Fly.io"],
    github: "https://github.com/nozutech/threadbot",
    demo: null,
    video: "/videos/threadbot-demo.mp4",
    image: null,
    live: false,
  },
  {
    tags: ["Astro", "TypeScript", "CSS", "Vercel"],
    github: "https://github.com/nozutech/syn924-artist-portfolio",
    demo: null,
    video: null,
    image: "/images/project-artist-portfolio.png",
    live: false,
  },
  {
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind", "Vercel"],
    github: null,
    demo: null,
    video: null,
    image: "/images/project-client-portal.png",
    live: true,
    fit: "contain",
  },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

// Las capturas muy anchas se ven enteras; el resto llena el marco
const imageFit = (meta: ProjectMeta) =>
  meta.fit === "contain" ? "object-contain p-3" : "object-cover object-top";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316] rounded-sm";

function Status({ label, live }: { label: string; live: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs ${live ? "text-[#f3a46b]" : "text-[#a09890]"}`}>
      <span aria-hidden className={`size-[7px] rounded-full ${live ? "bg-[#f97316]" : "bg-[#5a5550]"}`} />
      {label}
    </span>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="px-2 py-0.5 rounded-md text-[11px] font-mono text-[#958e87] bg-white/[0.025] border border-white/[0.07]"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Links({ meta, code, liveDemo }: { meta: ProjectMeta; code: string; liveDemo: string }) {
  if (!meta.github && !meta.demo) return null;
  return (
    <div className="flex items-center gap-6">
      {meta.demo && (
        <a
          href={meta.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-sm font-medium text-[#f97316] hover:text-[#fb923c] border-b border-[#f97316]/40 hover:border-[#fb923c] pb-0.5 transition-colors ${FOCUS_RING}`}
        >
          {liveDemo}
          <ArrowUpRight aria-hidden size={15} strokeWidth={2} />
        </a>
      )}
      {meta.github && (
        <a
          href={meta.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-sm font-medium text-[#e8e3dc] hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors ${FOCUS_RING}`}
        >
          <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          {code}
          <ArrowUpRight aria-hidden size={15} strokeWidth={2} />
        </a>
      )}
    </div>
  );
}

export function Projects() {
  const { t } = useLang();
  const { projects } = t;
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<number | null>(null);
  const total = projects.items.length;

  useEffect(() => {
    return () => {
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    };
  }, []);

  const clearHover = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };

  // Solo con el visor (escritorio y ratón). La espera evita cambiar de proyecto al cruzar filas en diagonal
  const hoverIn = (i: number) => {
    if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return;
    clearHover();
    hoverTimer.current = window.setTimeout(() => setActive(i), 120);
  };

  const select = (i: number) => {
    clearHover();
    setActive(i);
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    // En móvil, al cerrarse la fila de arriba la pulsada sube: la devolvemos a la vista
    requestAnimationFrame(() => {
      const el = rowRefs.current[i];
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 72) window.scrollBy({ top: top - 80, behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  const onListKey = (e: KeyboardEvent<HTMLOListElement>) => {
    const current = rowRefs.current.findIndex((el) => el === document.activeElement);
    if (current === -1) return;
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(current + 1, total - 1);
    if (e.key === "ArrowUp") next = Math.max(current - 1, 0);
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = total - 1;
    if (next === -1) return;
    e.preventDefault();
    rowRefs.current[next]?.focus();
  };

  const current = projects.items[active];
  const currentMeta = projectsMeta[active];

  return (
    <section id="proyectos" className="py-24 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 30%, rgba(249,115,22,0.06) 0%, transparent 60%)" }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        <SecNum num="02" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-12 flex items-end justify-between gap-6"
        >
          <div>
            <SectionLabel>{projects.label}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{projects.title}</h2>
          </div>
          <p className="hidden md:block shrink-0 font-mono text-xs text-[#857e77] pb-1.5 tabular-nums">
            {num(total - 1)} {projects.count}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start"
        >
          <ol className="lg:col-span-5 border-t border-white/[0.07]" onKeyDown={onListKey}>
            {projects.items.map((project, i) => {
              const meta = projectsMeta[i];
              const isActive = i === active;
              return (
                <li key={project.title} className="relative border-b border-white/[0.07]">
                  <span
                    aria-hidden
                    className={`absolute -left-3 lg:-left-4 top-4 h-11 w-0.5 bg-[#f97316] origin-top transition-transform duration-300 ease-out ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <button
                    ref={(el) => {
                      rowRefs.current[i] = el;
                    }}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`proyectos-visor proyecto-${i}`}
                    onClick={() => select(i)}
                    onFocus={(e) => {
                      if (e.currentTarget.matches(":focus-visible")) setActive(i);
                    }}
                    onMouseEnter={() => hoverIn(i)}
                    onMouseLeave={clearHover}
                    className={`group grid w-full grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 py-4 pr-1 text-left cursor-pointer ${FOCUS_RING}`}
                  >
                    <span
                      className={`font-mono text-xs tabular-nums pt-1 transition-colors ${
                        isActive ? "text-[#f97316]" : "text-[#857e77]"
                      }`}
                    >
                      {num(i)}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline justify-between gap-3">
                        <span
                          className={`text-[17px] font-semibold tracking-[-0.01em] transition-colors ${
                            isActive ? "text-white" : "text-[#d8d2ca] group-hover:text-white"
                          }`}
                        >
                          {project.title}
                        </span>
                        <span
                          className={`hidden lg:inline shrink-0 font-mono text-[11px] transition-colors ${
                            isActive ? "text-[#f97316]" : "text-[#857e77]"
                          }`}
                        >
                          {project.kind}
                        </span>
                      </span>
                      <span
                        className={`block text-[13px] mt-1 transition-colors ${
                          isActive ? "text-[#a09890]" : "text-[#857e77]"
                        }`}
                      >
                        {project.subtitle}
                      </span>
                    </span>
                  </button>

                  {/* Móvil y tablet: el proyecto se abre debajo de su fila */}
                  <div id={`proyecto-${i}`} hidden={!isActive} className="lg:hidden pb-7 pl-[3rem]">
                    {isActive && (
                      <>
                        <div className="relative aspect-[16/10] mb-4 rounded-xl overflow-hidden border border-white/[0.07] bg-[#121212]">
                          {meta.video ? (
                            <video
                              src={meta.video}
                              autoPlay
                              muted
                              loop
                              playsInline
                              aria-label={project.title}
                              className="absolute inset-0 h-full w-full object-cover object-top"
                            />
                          ) : (
                            meta.image && (
                              <img
                                src={meta.image}
                                alt={project.title}
                                decoding="async"
                                className={`absolute inset-0 h-full w-full ${imageFit(meta)}`}
                              />
                            )
                          )}
                        </div>
                        <div className="mb-3">
                          <Status label={project.status} live={meta.live} />
                        </div>
                        <p className="text-[15px] leading-relaxed text-[#a09890] mb-4">{project.description}</p>
                        <div className="mb-5">
                          <Tags tags={meta.tags} />
                        </div>
                        <Links meta={meta} code={projects.code} liveDemo={projects.liveDemo} />
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Escritorio: visor fijo junto a la lista */}
          <div id="proyectos-visor" className="hidden lg:block lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.07] bg-[#121212]">
              {projects.items.map((project, i) => {
                const meta = projectsMeta[i];
                const isActive = i === active;
                if (meta.video) {
                  return isActive ? (
                    <video
                      key={project.title}
                      src={meta.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={project.title}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  ) : null;
                }
                if (!meta.image) return null;
                return (
                  <img
                    key={project.title}
                    src={meta.image}
                    alt={isActive ? project.title : ""}
                    aria-hidden={!isActive}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full ${imageFit(meta)} transition-opacity duration-300 ease-out ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                );
              })}
            </div>

            <motion.div
              key={active}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mt-6 mb-3">
                <Status label={current.status} live={currentMeta.live} />
                <span className="font-mono text-xs text-[#857e77] tabular-nums">
                  {num(active)} / {num(total - 1)} · {current.kind}
                </span>
              </div>
              <h3 className="text-[26px] font-bold tracking-[-0.02em] text-white mb-3">{current.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#a09890] mb-3 max-w-[62ch]">{current.description}</p>
              <p className="text-sm leading-relaxed text-[#8f8881] mb-5 max-w-[62ch]">{current.detail}</p>
              <div className="mb-6">
                <Tags tags={currentMeta.tags} />
              </div>
              <Links meta={currentMeta} code={projects.code} liveDemo={projects.liveDemo} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
