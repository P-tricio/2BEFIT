import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../i18n/LanguageProvider";
import { MapPin, User, Users } from "lucide-react";

const InPersonTraining = () => {
  const { t } = useTranslation();
  const phoneNumber = "+34667895697";
  const message = t("in_person_page.whatsapp_message");

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  
  return (
    <section className="in-person-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="in-person-content"
        >
          <div className="location-badge">
            <MapPin size={16} />
            <span>{t("in_person_page.location_hook")}</span>
          </div>
          
          <h2>{t("in_person_page.title")}</h2>
          
          <p className="in-person-description">
            {t("in_person_page.description")}
          </p>
          
          <div className="in-person-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="in-person-card"
            >
              <div className="card-icon">
                <User size={28} />
              </div>
              
              <h3>{t("in_person_page.one_on_one.title")}</h3>
              
              <p>{t("in_person_page.one_on_one.desc")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="in-person-card"
            >
              <div className="card-icon">
                <Users size={28} />
              </div>
              
              <h3>{t("in_person_page.small_groups.title")}</h3>
              
              <p>{t("in_person_page.small_groups.desc")}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="in-person-cta"
          >
            <button
              onClick={handleWhatsAppClick}
              className="btn btn-primary"
            >
              {t("in_person_page.cta")}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InPersonTraining;
