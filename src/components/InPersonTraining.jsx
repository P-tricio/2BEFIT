import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/LanguageProvider";
import { MapPin, User, Users, MessageCircle, Home, Building2, Award, ArrowRight } from "lucide-react";

const InPersonTraining = () => {
  const { t } = useTranslation();
  const phoneNumber = "34667895697";
  const message = t("in_person_page.whatsapp_message");
  const zones = t("in_person_page.zones") || [
    "Marbella",
    "San Pedro de Alcántara",
    "Estepona",
    "Puerto Banús",
    "Nueva Andalucía",
    "Benahavís",
  ];

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="presencial" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            <MapPin size={16} />
            {t("in_person_page.location_hook")}
          </motion.div>

          <h2
            className="font-black text-slate-900 mb-4"
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            }}
          >
            {t("in_person_page.title")}
          </h2>

          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            {t("in_person_page.description")}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 1-on-1 Training */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group flex flex-col p-8 rounded-3xl border-2 border-slate-100 bg-white hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Glow background on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/0 to-emerald-50/0 group-hover:from-emerald-50/40 group-hover:to-emerald-50/10 transition-all duration-300 pointer-events-none" />

            {/* Icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 relative z-10 group-hover:bg-emerald-100 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <User size={28} className="text-[#2d6a4f]" strokeWidth={1.5} />
            </motion.div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900 mb-3 relative z-10">
              {t("in_person_page.one_on_one.title")}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed relative z-10">
              {t("in_person_page.one_on_one.desc")}
            </p>
          </motion.div>

          {/* Small Groups */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="group flex flex-col p-8 rounded-3xl border-2 border-slate-100 bg-white hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Glow background on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/0 to-emerald-50/0 group-hover:from-emerald-50/40 group-hover:to-emerald-50/10 transition-all duration-300 pointer-events-none" />

            {/* Icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 relative z-10 group-hover:bg-emerald-100 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Users size={28} className="text-[#2d6a4f]" strokeWidth={1.5} />
            </motion.div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900 mb-3 relative z-10">
              {t("in_person_page.small_groups.title")}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed relative z-10">
              {t("in_person_page.small_groups.desc")}
            </p>
          </motion.div>
        </div>

        {/* Local Modality & Costa del Sol Coverage (GEO Citable Facts) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-[#2d6a4f] font-bold text-sm">
              <Home size={18} />
              <span>{t("in_person_page.venues.home_title") || "A domicilio y urbanizaciones"}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t("in_person_page.venues.home_desc") ||
                "Entrenamos directamente en tu villa, domicilio o gimnasio comunitario privado con todo el seguimiento técnico."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-[#2d6a4f] font-bold text-sm">
              <Building2 size={18} />
              <span>{t("in_person_page.venues.centers_title") || "Centros concertados"}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t("in_person_page.venues.centers_desc") ||
                "Sesiones privadas en instalaciones concertadas de Marbella, San Pedro de Alcántara y Estepona."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-[#2d6a4f] font-bold text-sm">
              <Award size={18} />
              <span>{t("in_person_page.venues.coaches_title") || "Patricio y Cristina · ES/EN"}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t("in_person_page.venues.coaches_desc") ||
                "Coaches bilingües (+9 años de experiencia). Método 2BEFIT SYSTEM v1.0 y acceso diario incluido a la PWA 2befithub."}
            </p>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Array.isArray(zones) &&
            zones.map((zone) => (
              <span
                key={zone}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#1b4332] text-xs font-semibold"
              >
                <MapPin size={12} />
                {zone}
              </span>
            ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm">
          <Link
            to="/entrenador-personal-marbella"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-[#1b4332] font-semibold shadow-sm transition-colors"
          >
            Entrenador Personal Marbella
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/entrenador-personal-estepona"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-[#1b4332] font-semibold shadow-sm transition-colors"
          >
            Entrenador Personal Estepona
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            onClick={handleWhatsAppClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2d6a4f] to-emerald-500 hover:from-[#1b4332] hover:to-[#2d6a4f] text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageCircle size={20} />
            {t("in_person_page.cta")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default InPersonTraining;
