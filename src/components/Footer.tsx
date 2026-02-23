import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = ['Sobre Nós', 'Política de Privacidade', 'Termos de Uso', 'LGPD'];

const contactItems = [
  { icon: Mail, text: 'contato@epicseg.com', href: 'mailto:contato@epicseg.com' },
  { icon: Phone, text: '+55 (21) 98878-8668', href: 'tel:+5521988788668' },
  { icon: MapPin, text: 'Rio de Janeiro, Brasil', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#131f2f',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            paddingBottom: '2rem',
            alignItems: 'flex-start',
          }}
        >
          <img src="/logo-dark.png" alt="EPIC" style={{ height: '2.5rem', objectFit: 'contain' }} />

          <span
            style={{
              color: '#b99162',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              fontStyle: 'italic',
            }}
          >
            Go safe. Go EPIC.
          </span>

          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {footerLinks.map((label) => (
              <a
          key={label}
          href="#"
          className="text-sm transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
          {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact row */}
        <div
          style={{
            padding: '2rem 0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.text}
                href={item.href}
                className="flex items-center gap-3 text-sm transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.50)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.50)')}
              >
                <div
                  className="p-1.5 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <Icon size={15} />
                </div>
                {item.text}
              </a>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.30)',
          }}
        >
          <p>© {year} EPIC. Todos os direitos reservados.</p>
          <div style={{ textAlign: 'right' }}>
            <p>EPIC BRASIL CORRETORA DE SEGUROS LTDA.</p>
            <p>CNPJ: 61.657.314/0001-56 · SUSEP: 252170712</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
