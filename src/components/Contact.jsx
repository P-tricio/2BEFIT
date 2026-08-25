import { useTranslation } from "../i18n/LanguageProvider";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  const data = t("contact");
  const phoneNumber = "34667895697";
  const message = data.whatsapp_message || "Hola, me interesa el programa 2BEFIT";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1b4332] to-[#0f2818] rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden border border-emerald-500/20"
        >
          {/* Animated gradient orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

          {/* Decorative rings */}
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full border border-white/10" />
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full border border-white/10" />

          <div className="relative z-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 shadow-lg"
            >
              {data.pre || "Contáctanos"}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight"
              style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
              }}
            >
              {data.title || "¿Listo para transformar tu vida?"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-emerald-100/80 text-base mb-12 max-w-lg mx-auto leading-relaxed"
            >
              {data.paragraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mt-8"
            >
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-base group"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                {data.whatsapp_cta || "Escríbenos por WhatsApp"}
              </motion.button>

              <motion.a
                href="mailto:patricioescabe@gmail.com?subject=Interesado en 2BEFIT"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-5 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-base group"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
                {data.email_cta || "Envíanos un email"}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
