import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "../i18n/LanguageProvider";

const FloatingWhatsApp = () => {
  const { t } = useTranslation();
  const phoneNumber = "34667895697";
  const message = t("contact.whatsapp_message") || "Hola, me interesa el programa 2BEFIT";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.button
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t("whatsapp.aria_label") || "Contactar por WhatsApp"}
        className="relative w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 group cursor-pointer"
      >
        {/* Pulse animation ring */}
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#25D366]/25 pointer-events-none"
        />

        {/* Icon */}
        <MessageCircle size={28} className="text-white relative z-10" strokeWidth={2.5} />

        {/* Tooltip */}
        <div className="hidden md:block absolute right-20 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          {t("whatsapp.aria_label") || "WhatsApp"}
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
        </div>
      </motion.button>
    </motion.div>
  );
};

export default FloatingWhatsApp;
