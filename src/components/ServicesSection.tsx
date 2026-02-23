import { useEffect, useRef, useState } from 'react';
import {
  FileSearch,
  Target,
  BarChart3,
  FileText,
  Layers,
  Handshake,
  Users,
  Presentation,
  FileCheck,
  BookOpen,
  Clock,
  Headphones,
  BarChart2,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';
import { useScrambleText } from '../hooks/useScrambleText';

interface ServiceItem {
  text: string;
  icon: React.ElementType;
}

interface Phase {
  number: string;
  title: string;
  color: string;
  services: ServiceItem[];
}

const phases: Phase[] = [
  {
    number: '01',
    title: 'PRÉ-PLACEMENT',
    color: '#3b82f6',
    services: [
      { text: 'Compreensão da Política de Gestão de Riscos', icon: FileSearch },
      { text: 'Melhores Práticas de Avaliação de Riscos', icon: Target },
      { text: 'Análise de Apólices Vigentes e Documentos', icon: BarChart3 },
      { text: 'Definição do Programa de Seguros', icon: FileText },
    ],
  },
  {
    number: '02',
    title: 'PLACEMENT',
    color: '#06b6d4',
    services: [
      { text: 'Estruturação do Programa de Forma Combinada', icon: Layers },
      { text: 'Negociação com Mercados Brasileiros e Internacionais', icon: Handshake },
      { text: 'Reuniões com Seguradoras e Resseguradores', icon: Users },
      { text: 'Proposta Comercial com Termos Negociados', icon: Presentation },
    ],
  },
  {
    number: '03',
    title: 'PÓS-PLACEMENT',
    color: '#a855f7',
    services: [
      { text: 'Emissão de Apólices e Certificados', icon: FileCheck },
      { text: 'Manual de Sinistros', icon: BookOpen },
      { text: 'SLA 24/7', icon: Clock },
      { text: 'Atendimento Full Time', icon: Headphones },
      { text: 'Relatórios por Categoria', icon: BarChart2 },
      { text: 'Comitês de Regulação de Sinistros', icon: AlertCircle },
      { text: 'Treinamentos Corporativos', icon: GraduationCap },
    ],
  },
];

// ── Service Chip ─────────────────────────────────────────────────
function ServiceChip({
  svc,
  Icon,
  color,
  visible,
  delay,
}: {
  svc: ServiceItem;
  Icon: React.ElementType;
  color: string;
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-2 px-3.5 py-2 rounded-full cursor-default select-none"
      style={{
        background: hovered ? `${color}25` : `${color}12`,
        border: `1px solid ${hovered ? `${color}50` : `${color}25`}`,
        transform: visible ? (hovered ? 'translateY(-2px)' : 'translateY(0)') : 'translateY(14px)',
        opacity: visible ? 1 : 0,
        transition: `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 500ms ease ${delay}ms, background 200ms ease, border-color 200ms ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        size={13}
        style={{
          color: color,
          filter: hovered ? `drop-shadow(0 0 4px ${color}90)` : 'none',
          transition: 'filter 200ms ease',
          flexShrink: 0,
        }}
      />
      <span
        className="text-xs font-medium leading-none whitespace-nowrap"
        style={{ color: hovered ? '#ffffff' : 'rgba(255,255,255,0.72)' }}
      >
        {svc.text}
      </span>
    </div>
  );
}

// ── Phase Row ────────────────────────────────────────────────────
function PhaseRow({
  phase,
  index,
  isActive,
  isLast,
  nextActive,
}: {
  phase: Phase;
  index: number;
  isActive: boolean;
  isLast: boolean;
  nextActive: boolean;
}) {
  const scrambledNumber = useScrambleText(phase.number);
  const [chipsVisible, setChipsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setChipsVisible(true), 200);
      return () => clearTimeout(t);
    }
  }, [isActive]);

  const railFill = nextActive ? 100 : isActive ? 55 : 0;

  return (
    <div className="relative flex gap-0">
      {/* ── Rail Column ──────────────────────────── */}
      <div
        className="relative flex flex-col items-center"
        style={{ width: '56px', flexShrink: 0 }}
      >
        {/* Track line */}
        {!isLast && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-px"
            style={{
              top: '40px',
              bottom: 0,
              background: 'rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${railFill}%`,
                background: `linear-gradient(to bottom, ${phase.color}70, ${phase.color}20)`,
                transition: 'height 900ms cubic-bezier(0.22, 1, 0.36, 1) 400ms',
              }}
            />
          </div>
        )}

        {/* Node circle */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{
            width: '40px',
            height: '40px',
            border: `2px solid ${isActive ? phase.color : 'rgba(255,255,255,0.10)'}`,
            background: isActive ? `${phase.color}12` : 'rgba(255,255,255,0.02)',
            boxShadow: isActive
              ? `0 0 0 6px ${phase.color}15, 0 0 20px ${phase.color}30`
              : 'none',
            transition: 'all 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isActive ? phase.color : 'rgba(255,255,255,0.18)',
              boxShadow: isActive ? `0 0 8px ${phase.color}` : 'none',
              transition: 'all 500ms ease',
            }}
          />
        </div>
      </div>

      {/* ── Content Column ───────────────────────── */}
      <div
        className="flex-1 pb-20"
        style={{
          paddingLeft: '24px',
          paddingTop: '4px',
          opacity: isActive ? 1 : 0.20,
          filter: isActive ? 'none' : 'grayscale(0.7)',
          transition: 'opacity 700ms ease, filter 700ms ease',
        }}
      >
        {/* Badge + counter */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="px-2.5 py-0.5 rounded-md text-xs font-bold tracking-widest uppercase"
            style={{
              background: `${phase.color}15`,
              color: phase.color,
              border: `1px solid ${phase.color}28`,
            }}
          >
            Fase {scrambledNumber}
          </div>
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.22)' }}>
            {index + 1} / {phases.length}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-2xl md:text-3xl font-black tracking-tight mb-6"
          style={{
            color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
            transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
            transition: 'color 600ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {phase.title}
        </h3>

        {/* Chips */}
        <div className="flex flex-wrap gap-2.5">
          {phase.services.map((svc, i) => (
            <ServiceChip
              key={i}
              svc={svc}
              Icon={svc.icon}
              color={phase.color}
              visible={chipsVisible}
              delay={i * 40}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────
export default function ServicesSection() {
  const [activePhases, setActivePhases] = useState<Set<number>>(new Set());
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    phases.forEach((_, i) => {
      const el = phaseRefs.current[i];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActivePhases((prev) => new Set([...prev, i]));
          }
        },
        { threshold: 0.3 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="services" className="py-28 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Metodologia
          </p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Nossa abordagem em três fases garante proteção total ao seu negócio
          </p>
        </div>

        {/* Timeline */}
        <div>
          {phases.map((phase, i) => (
            <div
              key={phase.number}
              ref={(el) => {
                phaseRefs.current[i] = el;
              }}
            >
              <PhaseRow
                phase={phase}
                index={i}
                isActive={activePhases.has(i)}
                isLast={i === phases.length - 1}
                nextActive={activePhases.has(i + 1)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
