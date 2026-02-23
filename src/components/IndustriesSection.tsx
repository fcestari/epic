import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrambleText } from '../hooks/useScrambleText';

interface Industry {
  name: string;
  color: string;
  image: string | null;
  description: string;
}

const industries: Industry[] = [
  {
    name: 'ENERGIA',
    color: '#E87F35',
    image: 'energia.png',
    description:
      'Soluções especializadas para usinas, transmissão, distribuição e energias renováveis.',
  },
  {
    name: 'INFRAESTRUTURA',
    color: '#6B8BC4',
    image: 'infraestrutura.png',
    description:
      'Proteção para grandes projetos de infraestrutura pública e privada em todo o Brasil.',
  },
  {
    name: 'PETRÓLEO E GÁS',
    color: '#A8A8AE',
    image: 'petroleo_gas.png',
    description:
      'Cobertura upstream, midstream e downstream com gestão de riscos ambientais e operacionais.',
  },
  {
    name: 'INSTITUIÇÕES FINANCEIRAS',
    color: '#5E5CE6',
    image: 'instituicoes_financeiras.png',
    description:
      'Seguros especializados para bancos, fundos, fintechs e demais instituições do mercado financeiro.',
  },
  {
    name: 'PORTOS & LOGÍSTICA',
    color: '#30D158',
    image: 'portos_logistica.png',
    description:
      'Proteção completa para operadores portuários, armazéns e cadeias de suprimentos.',
  },
  {
    name: 'SERVIÇOS',
    color: '#BF5AF2',
    image: null,
    description:
      'Soluções para empresas de serviços, consultoria, tecnologia e terceirização.',
  },
  {
    name: 'CTM',
    color: '#FF9F0A',
    image: null,
    description:
      'Seguros especializados para comércio, transporte e movimentação de mercadorias.',
  },
  {
    name: 'EVENTOS & SHOW',
    color: '#FF375F',
    image: null,
    description:
      'Proteção para festivais, shows, feiras corporativas e grandes eventos ao vivo.',
  },
];

const INTERVAL_MS = 3000;

// ── Progress Arc ────────────────────────────────────────────────
function ProgressArc({ color, arcKey }: { color: string; arcKey: number }) {
  const r = 10;
  const circumference = 2 * Math.PI * r;

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
    >
      {/* Track */}
      <circle cx="14" cy="14" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      {/* Animated arc */}
      <circle
        key={arcKey}
        cx="14"
        cy="14"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          animation: `arc-drain ${INTERVAL_MS}ms linear forwards`,
          strokeDashoffset: 0,
        }}
      />
    </svg>
  );
}

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [arcKey, setArcKey] = useState(0);
  const [visibleList, setVisibleList] = useState<boolean[]>(
    new Array(industries.length).fill(true)
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const current = industries[activeIndex];
  const displayName = useScrambleText(current.name);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      setPrevIndex(activeIndex);
      setActiveIndex(index);
      setArcKey((k) => k + 1);

      // Staggered list scan
      setVisibleList(new Array(industries.length).fill(false));
      industries.forEach((_, i) => {
        timerRef.current = setTimeout(() => {
          setVisibleList((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * 35);
      });

      // Restart auto-advance
      intervalRef.current = setInterval(() => {
        setActiveIndex((i) => {
          const next = (i + 1) % industries.length;
          setPrevIndex(i);
          setArcKey((k) => k + 1);
          return next;
        });
      }, INTERVAL_MS);
    },
    [activeIndex]
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => {
        const next = (i + 1) % industries.length;
        setPrevIndex(i);
        setArcKey((k) => k + 1);
        return next;
      });
    }, INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Mouse parallax on image panel
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const img = imageRef.current.querySelector('.parallax-img') as HTMLElement | null;
    if (img) img.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    const img = imageRef.current?.querySelector('.parallax-img') as HTMLElement | null;
    if (img) img.style.transform = 'scale(1.08) translate(0, 0)';
  };

  const padIndex = (i: number) => String(i + 1).padStart(2, '0');

  return (
    <section
      id="industries"
      className="relative py-16 md:py-28 px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#0d1829' }}
    >
      {/* Reactive background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: `${current.color}0A`,
          transition: 'background-color 900ms ease',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: Animated text block ─────────────────────── */}
          <div>
            {/* Counter */}
            <div
              className="flex items-baseline gap-2 mb-6"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              <span
                className="text-3xl font-black tracking-tight transition-colors duration-500"
                style={{ color: current.color }}
              >
                {padIndex(activeIndex)}
              </span>
              <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.20)' }}>
                / {padIndex(industries.length - 1)}
              </span>
            </div>

            <p
              className="text-xs font-semibold tracking-widest uppercase mb-8"
              style={{ color: 'rgba(255,255,255,0.30)' }}
            >
              Indústrias
            </p>

            <p
              className="text-sm font-medium mb-3"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Especialistas em
            </p>

            {/* Scramble name */}
            <div className="overflow-hidden" style={{ minHeight: '72px' }}>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none transition-colors duration-500"
                style={{ color: current.color, fontFamily: "'SF Mono', 'Fira Code', monospace" }}
              >
                {displayName}
              </h2>
            </div>

            {/* Description */}
            <div className="overflow-hidden mt-6" style={{ minHeight: '72px' }}>
              <p
                key={`desc-${activeIndex}`}
                className="text-base leading-relaxed industry-text-enter"
                style={{ color: 'rgba(255,255,255,0.55)', animationDelay: '80ms' }}
              >
                {current.description}
              </p>
            </div>

            {/* Progress arc nav dots */}
            <div className="flex gap-2 mt-10 flex-wrap items-center">
              {industries.map((ind, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={ind.name}
                  className="relative flex items-center justify-center"
                  style={{ width: '28px', height: '28px' }}
                >
                  {i === activeIndex ? (
                    <ProgressArc color={ind.color} arcKey={arcKey} />
                  ) : (
                    <div
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'rgba(255,255,255,0.20)',
                      }}
                    />
                  )}
                  {i === activeIndex && (
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: ind.color,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Industry name list with staggered scan */}
            <div className="mt-8 space-y-1">
              {industries.map((ind, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg transition-all duration-200"
                  style={{
                    background: i === activeIndex ? `${ind.color}12` : 'transparent',
                    opacity: visibleList[i] ? 1 : 0.2,
                    transition: 'opacity 200ms ease, background 200ms ease',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor:
                        i === activeIndex ? ind.color : 'rgba(255,255,255,0.25)',
                      transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                  <span
                    className="text-xs font-semibold tracking-wider uppercase transition-colors duration-200"
                    style={{
                      color: i === activeIndex ? ind.color : 'rgba(255,255,255,0.40)',
                    }}
                  >
                    {ind.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Image panel ────────────────────────────── */}
          <div
            ref={imageRef}
            className="relative h-[260px] md:h-[400px] lg:h-[560px] overflow-hidden"
            style={{
              clipPath: 'polygon(4% 0, 100% 0, 100% 100%, 0% 100%)',
              borderRadius: '1rem',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {industries.map((ind, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              >
                {ind.image ? (
                  <>
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="parallax-img w-full h-full object-cover"
                      style={{
                        transform: 'scale(1.08) translate(0, 0)',
                        transition: 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
                        animation:
                          i === activeIndex && i !== prevIndex
                            ? 'ken-burns 3.5s ease-in-out forwards'
                            : 'none',
                      }}
                    />
                    {/* Color gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${ind.color}55 0%, transparent 55%)`,
                        transition: 'background 600ms ease',
                      }}
                    />
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p
                        className="text-3xl font-black tracking-widest"
                        style={{ color: ind.color }}
                      >
                        {ind.name}
                      </p>
                    </div>
                  </>
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${ind.color}10 0%, rgba(5,8,16,0.8) 100%)`,
                      border: `1px dashed ${ind.color}35`,
                      borderRadius: '1rem',
                    }}
                  >
                    <p
                      className="text-4xl font-black tracking-widest text-center px-8"
                      style={{ color: `${ind.color}70` }}
                    >
                      {ind.name}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
