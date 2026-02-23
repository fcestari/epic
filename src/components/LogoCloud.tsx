const logos = [
  { name: 'Eneva', url: '/eneva.png' },
  { name: 'Tidewater', url: '/tidewater.png' },
  { name: 'Vinci Partners', url: '/vinci.png' },
  { name: 'BHub', url: '/bhub.png' },
  { name: 'Karpowership', url: '/karpowership.png' },
  { name: 'Eterc', url: '/eterc.png' },
  { name: 'Jet Sharing', url: '/jetsharing.png' },
];

export default function LogoCloud() {
  return (
    <section className="py-20 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 px-6">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: '#b99162' }}
        >
          Nossos Clientes
        </p>
        <h2
          className="text-5xl md:text-5xl font-black tracking-tight"
          style={{ color: '#ffffff' }}
        >
          Quem Confia na EPIC
        </h2>
        <p
          className="mt-4 text-lg max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Empresas líderes que confiam na nossa expertise para proteger seus negócios
        </p>
      </div>

      {/* Marquee */}
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="relative flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
            WebkitMaskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex items-center justify-center px-8 py-4 rounded-xl"
                    style={{
                      background: '#131f2f',
                      minWidth: '160px',
                    }}
                  >
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
