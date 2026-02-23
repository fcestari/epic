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
        backgroundColor: '#0d1829',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <img src="/logo-dark.png" alt="EPIC" className="h-10 object-contain" />

          <span
            className="text-sm font-medium tracking-wide italic"
            style={{ color: '#b99162' }}
          >
            Go safe. Go EPIC.
          </span>

          <nav className="flex flex-wrap gap-6">
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
          className="py-8 flex flex-wrap gap-6 justify-center lg:justify-start"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
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
          className="mt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs"
          style={{ color: 'rgba(255,255,255,0.30)' }}
        >
          <p>© {year} EPIC. Todos os direitos reservados.</p>
          <div className="text-center md:text-right space-y-0.5">
            <p>EPIC BRASIL CORRETORA DE SEGUROS LTDA.</p>
            <p>CNPJ: 61.657.314/0001-56 · SUSEP: 252170712</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
