import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

type GlobeInstance = ReturnType<typeof createGlobe>;

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const phiRef = useRef(-0.5);
  const widthRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) widthRef.current = canvas.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0.5,
      theta: -0.25,
      dark: 1,
      diffuse: 1.4,
      scale: 1.1,
      mapSamples: 20000,
      mapBrightness: 5,
      baseColor: [0.075, 0.122, 0.184],
      markerColor: [0.729, 0.569, 0.384],
      glowColor: [0.15, 0.30, 0.55],
      markers: [
        { location: [-22.9068, -43.1729], size: 0.07 }, // Rio de Janeiro
        { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo
        { location: [51.5074, -0.1278], size: 0.05 },   // London (Lloyd's)
        { location: [47.3769, 8.5417], size: 0.04 },    // Zurich
        { location: [40.7128, -74.006], size: 0.04 },   // New York
        { location: [50.1109, 8.682], size: 0.04 },     // Frankfurt
        { location: [35.6762, 139.6503], size: 0.03 },  // Tokyo
        { location: [1.3521, 103.8198], size: 0.03 },   // Singapore
      ],
      onRender: (state) => {
        state.phi = phiRef.current;
        phiRef.current += 0.003;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    return () => {
      globeRef.current?.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: '1 / 1',
        maxWidth: '580px',
        opacity: 0.92,
        cursor: 'grab',
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 65% 50%, rgba(24,50,100,0.18) 0%, transparent 70%)',
        }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-8 items-center py-24">
        {/* Left: Text */}
        <div className="animate-fade-up">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(185,145,98,0.10)',
              border: '1px solid rgba(185,145,98,0.25)',
              color: '#b99162',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#b99162' }}
            />
            EPIC Brasil Corretora de Seguros
          </div>

          {/* Headline */}
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
            style={{ color: '#ffffff' }}
          >
            Insurtech
            <br />
            <span style={{ color: '#b99162' }}>One-Stop-Shop</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl mb-10 max-w-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Conectando você aos melhores mercados de seguros do mundo
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mb-10">
            {[
              { value: '14+', label: 'Produtos de Seguro' },
              { value: '8+', label: 'Indústrias' },
              { value: '24/7', label: 'Suporte SLA' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-bold"
                  style={{ color: '#b99162' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.40)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 inline-block"
              style={{ backgroundColor: '#b99162', color: '#131f2f' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#c9a472';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  '0 12px 32px rgba(185,145,98,0.35)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#b99162';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              Solicitar Cotação
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 inline-block"
              style={{
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.75)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'rgba(255,255,255,0.40)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'rgba(255,255,255,0.18)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              }}
            >
              Conheça Nossos Serviços
            </a>
          </div>
        </div>

        {/* Right: Globe */}
        <div className="flex justify-center items-center relative">
          {/* Glow behind globe */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <Globe />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.25)' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-8"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.30), transparent)',
          }}
        />
      </div>
    </section>
  );
}
