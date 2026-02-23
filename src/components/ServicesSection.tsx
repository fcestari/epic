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
      {
        text: 'Compreensão da Política de Gestão de Riscos da Empresa e seu Modelo de Mitigação',
        icon: FileSearch,
      },
      {
        text: 'Apresentação das Melhores Práticas de Mercado para Avaliação Precisa dos Riscos',
        icon: Target,
      },
      {
        text: 'Análise das Apólices de Seguros Vigentes, Relatórios de Inspeção e Documentos Relevantes',
        icon: BarChart3,
      },
      {
        text: 'Definição do Programa de Seguros e Estrutura das Apólices',
        icon: FileText,
      },
    ],
  },
  {
    number: '02',
    title: 'PLACEMENT',
    color: '#06b6d4',
    services: [
      {
        text: 'Estruturação do Programa de Seguros de Forma Combinada e Eficaz',
        icon: Layers,
      },
      {
        text: 'Negociação com Mercados de Seguros e Resseguros Brasileiros e Internacionais',
        icon: Handshake,
      },
      {
        text: 'Realização de Reuniões com Seguradoras e Resseguradores para Apresentação do Negócio',
        icon: Users,
      },
      {
        text: 'Apresentação da Proposta Comercial com os Termos e Condições Negociados',
        icon: Presentation,
      },
    ],
  },
  {
    number: '03',
    title: 'PÓS-PLACEMENT',
    color: '#a855f7',
    services: [
      {
        text: 'Emissão e Revisão de Certificados, Apólices, Boletos e Demais Documentos',
        icon: FileCheck,
      },
      { text: 'Confecção do Manual de Sinistros', icon: BookOpen },
      { text: 'Service Level Agreement 24/7', icon: Clock },
      { text: 'Atendimento Full Time', icon: Headphones },
      { text: 'Relatórios Específicos por Categoria', icon: BarChart2 },
      { text: 'Comitês de Regulação de Sinistros', icon: AlertCircle },
      { text: 'Treinamentos Corporativos', icon: GraduationCap },
    ],
  },
];

function PhaseCard({ phase }: { phase: Phase }) {
  return (
    <div
      className="relative rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = 'rgba(255,255,255,0.07)';
        el.style.borderColor = 'rgba(255,255,255,0.22)';
        el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.20)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = 'rgba(255,255,255,0.04)';
        el.style.borderColor = 'rgba(255,255,255,0.10)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Ghost number */}
      <div
        className="absolute -top-4 right-3 text-[9rem] font-black opacity-[0.04] pointer-events-none select-none leading-none"
        style={{ color: phase.color }}
      >
        {phase.number}
      </div>

      {/* Phase badge + title */}
      <div className="relative z-10 mb-7">
        <div
          className="inline-block px-3 py-1 rounded-md mb-3 text-xs font-bold tracking-widest uppercase"
          style={{ background: `${phase.color}1a`, color: phase.color }}
        >
          Fase {phase.number}
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white">{phase.title}</h3>
      </div>

      {/* Services list */}
      <div className="relative z-10 space-y-2.5">
        {phase.services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 hover:translate-x-1"
              style={{ background: `${phase.color}0a` }}
            >
              <div
                className="flex-shrink-0 p-1.5 rounded-lg mt-0.5"
                style={{ background: `${phase.color}20` }}
              >
                <Icon size={14} style={{ color: phase.color }} />
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.78)' }}
              >
                {svc.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Metodologia
          </p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Nossa abordagem estruturada em três fases garante proteção total ao seu negócio
          </p>
        </div>

        {/* Phase cards */}
        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Connecting lines (desktop only) */}
          <div
            className="hidden md:block absolute top-16 left-[33%] w-[16%] h-px pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(59,130,246,0.4), rgba(6,182,212,0.4))',
            }}
          />
          <div
            className="hidden md:block absolute top-16 left-[57%] w-[16%] h-px pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(6,182,212,0.4), rgba(168,85,247,0.4))',
            }}
          />

          {phases.map((phase) => (
            <PhaseCard key={phase.number} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
}
