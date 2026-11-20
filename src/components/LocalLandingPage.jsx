import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Home, Building2, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "../i18n/LanguageProvider";
import { LOCAL_PAGES } from "../data/localPagesData";

const ICONS = [Home, Building2, Users];

const LocalLandingPage = ({ cityKey }) => {
  const { lang } = useTranslation();
  const cityConfig = LOCAL_PAGES[cityKey] || LOCAL_PAGES.marbella;
  const copy = cityConfig[lang] || cityConfig.es;
  const phoneNumber = "34667895697";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(copy.whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white">
      {/* Hero local */}
      <section
        className="pt-28 pb-16 md:pt-36 md:pb-24 text-white relative overflow-hidden"
        style={{ background: "radial-gradient(circle at 20% 30%, #1b4332 0%, #0a2118 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6">
            <MapPin size={14} />
            {copy.badge}
          </span>

          <h1
            className="font-black tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontSize: "clamp(2rem, 5vw, 3.3rem)" }}
          >
            {copy.h1}
          </h1>

          <p className="text-slate-200 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            {copy.intro}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold shadow-xl transition-all cursor-pointer"
            >
              <MessageCircle size={20} />
              {copy.ctaPrimary}
            </button>
            <Link
              to="/#planes"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-all"
            >
              {copy.ctaSecondary}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Modalidades y diferenciales */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-12"
            style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
          >
            {copy.highlightsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {copy.highlights.map((item, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <div
                  key={item.title}
                  className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#2d6a4f] flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Cobertura por zonas */}
          <div className="p-8 rounded-3xl bg-white border border-emerald-100 text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-5">{copy.zonesTitle}</h3>
            <div className="flex flex-wrap justify-center gap-2.5">
              {copy.zones.map((zone) => (
                <span
                  key={zone}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#1b4332] text-sm font-semibold"
                >
                  <CheckCircle2 size={14} />
                  {zone}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs locales citables */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-10"
            style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
          >
            {copy.faqsTitle}
          </h2>

          <div className="space-y-4">
            {copy.faqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h3 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center pt-8 border-t border-slate-100">
            <p className="text-slate-500 text-sm mb-3">{copy.crossLinkLabel}</p>
            <Link
              to={copy.crossLinkTo}
              className="inline-flex items-center gap-2 text-[#2d6a4f] font-bold hover:underline"
            >
              {copy.crossLinkText}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalLandingPage;
