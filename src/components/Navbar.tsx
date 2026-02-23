import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

const navLinks = [
  { label: 'A Empresa', href: '#company' },
  { label: 'Seguros', href: '#insurance' },
  { label: 'Serviços', href: '#services' },
  { label: 'Indústrias', href: '#industries' },
];

export default function Navbar({ scrolled }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        background: scrolled ? 'rgba(19, 31, 47, 0.90)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img src="/logo-dark.png" alt="EPIC" className="h-9 object-contain" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.65)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
            style={{
              border: '1px solid #b99162',
              color: '#b99162',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#b99162';
              e.currentTarget.style.color = '#131f2f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#b99162';
            }}
          >
            Cotação
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-5 pt-2 space-y-1"
          style={{
            background: 'rgba(15, 24, 38, 0.97)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-medium transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.70)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#contact"
              className="block w-full text-center py-3 text-sm font-semibold rounded-lg"
              style={{ backgroundColor: '#b99162', color: '#131f2f' }}
              onClick={() => setMobileOpen(false)}
            >
              Cotação
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
