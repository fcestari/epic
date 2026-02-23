import {
  Flame,
  HardHat,
  Truck,
  Building2,
  ShieldCheck,
  Users2,
  UserCheck,
  Shield,
  AlertCircle,
  Plane,
  Anchor,
  Wrench,
  Car,
  Sparkles,
} from 'lucide-react';

interface Product {
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const products: Product[] = [
  {
    title: 'Riscos Operacionais & Lucros Cessantes',
    icon: Flame,
    color: '#3b82f6',
    description: 'Proteção contra danos físicos e interrupção de negócios.',
  },
  {
    title: 'Engenharia & Construção',
    icon: HardHat,
    color: '#06b6d4',
    description: 'Cobertura para obras, projetos e equipamentos de engenharia.',
  },
  {
    title: 'Transporte Nacional e Internacional',
    icon: Truck,
    color: '#0891b2',
    description: 'Proteção de cargas em modais rodoviário, aéreo e marítimo.',
  },
  {
    title: 'Empresarial',
    icon: Building2,
    color: '#8b5cf6',
    description: 'Cobertura completa para instalações e operações comerciais.',
  },
  {
    title: 'Garantias',
    icon: ShieldCheck,
    color: '#7c3aed',
    description: 'Bonds e garantias para contratos públicos e privados.',
  },
  {
    title: 'D&O — Diretores & Executivos',
    icon: Users2,
    color: '#6366f1',
    description: 'Proteção de responsabilidade civil para líderes corporativos.',
  },
  {
    title: 'E&O — RC Profissional',
    icon: UserCheck,
    color: '#4f46e5',
    description: 'Cobertura por erros e omissões em serviços profissionais.',
  },
  {
    title: 'Cyber Risks',
    icon: Shield,
    color: '#ef4444',
    description: 'Defesa contra ataques cibernéticos e violação de dados.',
  },
  {
    title: 'Responsabilidade Civil',
    icon: AlertCircle,
    color: '#f97316',
    description: 'Proteção contra reclamações de terceiros por danos e lesões.',
  },
  {
    title: 'Aviação & Aerospacial',
    icon: Plane,
    color: '#10b981',
    description: 'Seguros para aeronaves, operações aéreas e espaço.',
  },
  {
    title: 'Casco Marítimo & Portuário',
    icon: Anchor,
    color: '#14b8a6',
    description: 'Proteção de embarcações, plataformas e operadores portuários.',
  },
  {
    title: 'Equipamentos',
    icon: Wrench,
    color: '#059669',
    description: 'Cobertura para maquinário e equipamentos industriais.',
  },
  {
    title: 'Frota Auto',
    icon: Car,
    color: '#0d9488',
    description: 'Gestão e proteção abrangente de frotas veiculares.',
  },
  {
    title: 'Affinity',
    icon: Sparkles,
    color: '#a855f7',
    description: 'Seguros coletivos e personalizados para grupos e associações.',
  },
];

function InsuranceCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <div
      className="group relative rounded-2xl p-6 flex flex-col items-center text-center cursor-default transition-all duration-500 hover:-translate-y-3"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = 'rgba(255,255,255,0.05)';
        el.style.borderColor = product.color;
        el.style.boxShadow = `0 0 32px ${product.color}28, 0 24px 48px rgba(0,0,0,0.28)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = 'rgba(255,255,255,0.02)';
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${product.color}10 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 mb-4 p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: `${product.color}1a` }}
      >
        <Icon size={32} style={{ color: product.color }} />
      </div>

      {/* Title */}
      <h3
        className="relative z-10 text-sm font-bold text-white leading-tight mb-2"
        style={{ minHeight: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {product.title}
      </h3>

      {/* Description (reveals on hover) */}
      <p
        className="relative z-10 text-xs leading-relaxed overflow-hidden transition-all duration-500"
        style={{
          color: 'rgba(255,255,255,0.58)',
          maxHeight: '0',
          opacity: 0,
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.closest('.group') as HTMLElement | null;
          if (!parent) return;
          const show = () => {
            el.style.maxHeight = '60px';
            el.style.opacity = '1';
          };
          const hide = () => {
            el.style.maxHeight = '0';
            el.style.opacity = '0';
          };
          parent.addEventListener('mouseenter', show);
          parent.addEventListener('mouseleave', hide);
        }}
      >
        {product.description}
      </p>

      {/* Accent underline */}
      <div
        className="relative z-10 h-0.5 mt-3 transition-all duration-500 delay-75 group-hover:w-12"
        style={{
          background: product.color,
          width: '0',
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.closest('.group') as HTMLElement | null;
          if (!parent) return;
          parent.addEventListener('mouseenter', () => {
            el.style.width = '48px';
          });
          parent.addEventListener('mouseleave', () => {
            el.style.width = '0';
          });
        }}
      />
    </div>
  );
}

export default function InsuranceSection() {
  return (
    <section
      id="insurance"
      className="py-28 px-6 lg:px-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Portfólio
          </p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Seguros & Coberturas
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Soluções completas para proteger seu negócio em qualquer cenário
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <InsuranceCard key={product.title} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
