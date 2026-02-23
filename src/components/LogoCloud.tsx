const ROW_1 = ['Allianz', 'Zurich', 'AIG', 'Swiss Re', 'Munich Re', 'Chubb', 'Mapfre', 'Berkley'];
const ROW_2 = ["Lloyd's", 'HDI', 'Tokio Marine', 'Generali', 'Sompo', 'IRB Re', 'Hannover Re', 'Scor'];

function LogoPill({ name }: { name: string }) {
  return (
    <div
      className="flex-shrink-0 px-7 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 cursor-default whitespace-nowrap"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        color: 'rgba(255,255,255,0.45)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.color = 'rgba(255,255,255,0.85)';
        el.style.background = 'rgba(255,255,255,0.07)';
        el.style.borderColor = 'rgba(185,145,98,0.4)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.color = 'rgba(255,255,255,0.45)';
        el.style.background = 'rgba(255,255,255,0.04)';
        el.style.borderColor = 'rgba(255,255,255,0.09)';
      }}
    >
      {name}
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
}: {
  logos: string[];
  direction: 'left' | 'right';
}) {
  const doubled = [...logos, ...logos];

  return (
    <div
      className="flex overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div
        className={direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
        style={{ display: 'flex', gap: '1rem' }}
      >
        {doubled.map((name, i) => (
          <LogoPill key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="py-20 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-10">
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.30)' }}
        >
          Mercados & Parceiros
        </p>
      </div>

      {/* Marquee rows */}
      <div className="space-y-4">
        <MarqueeRow logos={ROW_1} direction="left" />
        <MarqueeRow logos={ROW_2} direction="right" />
      </div>
    </section>
  );
}
