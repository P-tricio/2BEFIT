import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+34667895697";
  const message = "Hola, me interesa el programa 2BEFIT";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="button"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 group"
            >
              {/* Pulse animation ring */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-[#25D366]/20"
              />

              {/* Icon */}
              <MessageCircle size={24} className="text-white relative z-10" strokeWidth={2.5} />

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: -60 }}
                transition={{ duration: 0.2 }}
                className="absolute right-20 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap"
              >
                ¿Preguntas? Chatea!
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              {/* Close button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-slate-800 hover:bg-slate-700 rounded-full shadow-lg flex items-center justify-center transition-all"
              >
                <X size={20} className="text-white" />
              </motion.button>

              {/* WhatsApp button */}
              <motion.button
                onClick={() => {
                  handleWhatsAppClick();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
              >
                <MessageCircle size={20} className="text-white" strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWhatsApp;
