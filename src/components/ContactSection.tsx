import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contato@epicseg.com',
    href: 'mailto:contato@epicseg.com',
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: '+55 (21) 98878-8668',
    href: 'tel:+5521988788668',
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'Rio de Janeiro, Brasil',
    href: '#',
  },
];

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '0.875rem 1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '0.75rem',
  color: '#ffffff',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, background 0.2s ease',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  color: 'rgba(255,255,255,0.45)',
  marginBottom: '0.5rem',
  fontWeight: 600,
};

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    message: '',
  });

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#b99162';
    e.target.style.background = 'rgba(185,145,98,0.06)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.12)';
    e.target.style.background = 'rgba(255,255,255,0.05)';
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 lg:px-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Fale Conosco
          </p>
          <h2 className="text-5xl font-bold tracking-tight text-white mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg mb-12" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Fale com nossos especialistas e receba uma proposta personalizada para seu negócio.
          </p>

          <div className="space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'rgba(255,255,255,0.06)';
                    el.style.borderColor = 'rgba(185,145,98,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <div
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ background: 'rgba(185,145,98,0.12)' }}
                  >
                    <Icon size={18} style={{ color: '#b99162' }} />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-0.5 font-semibold"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <h3 className="text-2xl font-bold text-white mb-7">Solicitar Cotação</h3>
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Nome</label>
                <input
                  style={inputBase}
                  type="text"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  style={inputBase}
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Empresa</label>
              <input
                style={inputBase}
                type="text"
                placeholder="Nome da empresa"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Indústria</label>
              <select
                style={{ ...inputBase, cursor: 'pointer' }}
                value={form.industry}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                onFocus={focusStyle}
                onBlur={blurStyle}
              >
                <option value="" style={{ background: '#131f2f' }}>Selecione sua indústria</option>
                <option value="energia" style={{ background: '#131f2f' }}>Energia</option>
                <option value="infraestrutura" style={{ background: '#131f2f' }}>Infraestrutura</option>
                <option value="petroleo-gas" style={{ background: '#131f2f' }}>Petróleo & Gás</option>
                <option value="financeiras" style={{ background: '#131f2f' }}>Instituições Financeiras</option>
                <option value="portos" style={{ background: '#131f2f' }}>Portos & Logística</option>
                <option value="construcao" style={{ background: '#131f2f' }}>Engenharia & Construção</option>
                <option value="transporte" style={{ background: '#131f2f' }}>Transporte</option>
                <option value="outros" style={{ background: '#131f2f' }}>Outros</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Mensagem</label>
              <textarea
                style={{ ...inputBase, resize: 'none' }}
                rows={4}
                placeholder="Conte sobre suas necessidades de seguros..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ backgroundColor: '#b99162', color: '#131f2f' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#c9a472';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#b99162';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
