import { useState, useEffect, useRef } from 'react';

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
    image: '/energia.png',
    description:
      'Soluções especializadas para usinas, transmissão, distribuição e energias renováveis.',
  },
  {
    name: 'INFRAESTRUTURA',
    color: '#6B8BC4',
    image: '/infraestrutura.png',
    description:
      'Proteção para grandes projetos de infraestrutura pública e privada em todo o Brasil.',
  },
  {
    name: 'PETRÓLEO E GÁS',
    color: '#A8A8AE',
    image: '/petroleo_gas.png',
    description:
      'Cobertura upstream, midstream e downstream com gestão de riscos ambientais e operacionais.',
  },
  {
    name: 'INSTITUIÇÕES FINANCEIRAS',
    color: '#5E5CE6',
    image: '/instituicoes_financeiras.png',
    description:
      'Seguros especializados para bancos, fundos, fintechs e demais instituições do mercado financeiro.',
  },
  {
    name: 'PORTOS & LOGÍSTICA',
    color: '#30D158',
    image: '/portos_logistica.png',
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

type Phase = 'enter' | 'exit';

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('enter');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    setPhase('exit');
    timerRef.current = setTimeout(() => {
      setActiveIndex(index);
      setPhase('enter');
    }, 350);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPhase('exit');
      timerRef.current = setTimeout(() => {
        setActiveIndex((i) => (i + 1) % industries.length);
        setPhase('enter');
      }, 350);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const current = industries[activeIndex];

  return (
    <section
      id="industries"
      className="py-28 px-6 lg:px-8"
      style={{ backgroundColor: '#0d1829' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Animated text block */}
          <div>
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

            {/* Animated name */}
            <div className="overflow-hidden" style={{ minHeight: '112px' }}>
              <h2
                key={activeIndex}
                className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none ${
                  phase === 'enter' ? 'industry-text-enter' : 'industry-text-exit'
                }`}
                style={{ color: current.color }}
              >
                {current.name}
              </h2>
            </div>

            {/* Description */}
            <div className="overflow-hidden mt-6" style={{ minHeight: '72px' }}>
              <p
                key={`desc-${activeIndex}`}
                className={`text-base leading-relaxed ${
                  phase === 'enter' ? 'industry-text-enter' : 'industry-text-exit'
                }`}
                style={{ color: 'rgba(255,255,255,0.55)', animationDelay: '60ms' }}
              >
                {current.description}
              </p>
            </div>

            {/* Nav dots */}
            <div className="flex gap-2 mt-10 flex-wrap">
              {industries.map((ind, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === activeIndex ? ind.color : 'rgba(255,255,255,0.20)',
                    borderRadius: '4px',
                  }}
                  aria-label={ind.name}
                />
              ))}
            </div>

            {/* Industry name list */}
            <div className="mt-8 space-y-1">
              {industries.map((ind, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg transition-all duration-200 group"
                  style={{
                    background: i === activeIndex ? `${ind.color}12` : 'transparent',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: i === activeIndex ? ind.color : 'rgba(255,255,255,0.25)',
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

          {/* Right: Image panel */}
          <div className="relative h-[480px] lg:h-[560px] rounded-2xl overflow-hidden">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              >
                {ind.image ? (
                  <>
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${ind.color}40 0%, transparent 50%)`,
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
