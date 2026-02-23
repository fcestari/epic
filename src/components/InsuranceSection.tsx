import { useEffect, useRef, useState } from 'react';
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
  featured?: boolean;
}

const products: Product[] = [
  {
    title: 'Riscos Operacionais & Lucros Cessantes',
    icon: Flame,
    color: '#3b82f6',
    description: 'Proteção contra danos físicos e interrupção de negócios.',
    featured: true,
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
    featured: true,
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

// ── 3D Tilt Card ────────────────────────────────────────────────
function InsuranceCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const Icon = product.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [conicAngle, setConicAngle] = useState(0);
  const animRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = -y * 14;
    const ry = x * 14;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
    // Move radial highlight with cursor
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${product.color}18 0%, transparent 65%)`;
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    // Start conic rotation
    let angle = 0;
    const spin = () => {
      angle = (angle + 2) % 360;
      setConicAngle(angle);
      animRef.current = requestAnimationFrame(spin);
    };
    animRef.current = requestAnimationFrame(spin);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const el = cardRef.current;
    if (el) {
      el.style.transition = 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)';
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      setTimeout(() => {
        if (el) el.style.transition = '';
      }, 650);
    }
  };

  const isFeatured = product.featured;

  return (
    // Conic border wrapper
    <div
      className={`relative rounded-2xl p-px ${isFeatured ? 'sm:col-span-2' : ''}`}
      style={{
        background: hovered
          ? `conic-gradient(from ${conicAngle}deg at 50% 50%, transparent 0%, ${product.color} 15%, transparent 35%)`
          : 'rgba(255,255,255,0.07)',
        transition: hovered ? 'none' : 'background 400ms ease',
        animationDelay: `${index * 40}ms`,
      }}
    >
      <div
        ref={cardRef}
        className="card-reveal relative rounded-2xl p-4 h-full flex flex-col cursor-default"
        style={{
          background: 'rgba(13, 24, 41, 0.92)',
          backdropFilter: 'blur(12px)',
          animationDelay: `${index * 40}ms`,
          willChange: 'transform',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Radial cursor glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        {/* Icon */}
        <div className="relative z-10 mb-3 self-start">
          <div
            className="p-2.5 rounded-xl transition-all duration-300"
            style={{
              background: `${product.color}1a`,
              boxShadow: hovered ? `0 0 16px ${product.color}40` : 'none',
              transform: hovered ? 'scale(1.10) rotate(3deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 300ms ease, box-shadow 300ms ease',
            }}
          >
            <Icon
              size={isFeatured ? 26 : 20}
              style={{
                color: product.color,
                filter: hovered ? `drop-shadow(0 0 5px ${product.color}80)` : 'none',
                transition: 'filter 300ms ease',
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="relative z-10 font-bold text-white leading-tight mb-1.5"
          style={{ fontSize: isFeatured ? '0.875rem' : '0.78rem' }}
        >
          {product.title}
        </h3>

        {/* Description — always visible on featured, reveal on hover for small */}
        <p
          className="relative z-10 text-xs leading-relaxed mt-1 overflow-hidden transition-all duration-400"
          style={{
            color: 'rgba(255,255,255,0.58)',
            maxHeight: isFeatured ? '60px' : hovered ? '60px' : '0px',
            opacity: isFeatured ? 1 : hovered ? 1 : 0,
            transition: 'max-height 400ms ease, opacity 400ms ease',
          }}
        >
          {product.description}
        </p>

        {/* Accent underline */}
        <div
          className="relative z-10 h-px mt-auto pt-3"
          style={{
            width: hovered ? '48px' : '0px',
            background: product.color,
            transition: 'width 400ms cubic-bezier(0.22, 1, 0.36, 1) 60ms',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────
export default function InsuranceSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>('.card-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          cards.forEach((card) => card.classList.add('is-visible'));
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="insurance"
      className="py-16 md:py-28 px-6 lg:px-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Portfólio
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Seguros & Coberturas
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Soluções completas para proteger seu negócio em qualquer cenário
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {products.map((product, i) => (
            <InsuranceCard key={product.title} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
