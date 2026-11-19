import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import InPersonTraining from "./components/InPersonTraining";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { useTranslation } from "./i18n/LanguageProvider";
import "./App.css";

function App() {
  const location = useLocation();
  const { lang } = useTranslation();

  useEffect(() => {
    const isInPerson = location.pathname === "/entrenamiento-presencial";
    const metaByRoute = isInPerson
      ? {
          es: {
            title: "Entrenador Personal en Marbella, San Pedro y Estepona | 2BEFIT Presencial",
            description:
              "Entrenamiento personal presencial 1 a 1 y en pareja en Marbella, San Pedro de Alcántara y Estepona (Costa del Sol). Sesiones a domicilio, urbanizaciones privadas y centros concertados en español e inglés.",
            canonical: "https://2befit.online/entrenamiento-presencial",
          },
          en: {
            title: "Personal Trainer in Marbella, San Pedro & Estepona | 2BEFIT In-Person",
            description:
              "Bilingual 1-on-1 and couples personal training in Marbella, San Pedro de Alcántara, and Estepona (Costa del Sol). At-home, private urbanizations, and partnered centers.",
            canonical: "https://2befit.online/entrenamiento-presencial",
          },
        }
      : {
          es: {
            title: "2BEFIT | Entrenador Personal Online y Presencial en Marbella, Estepona y Costa del Sol",
            description:
              "Entrenamiento personal presencial a domicilio, urbanizaciones privadas y centros concertados en Marbella, San Pedro de Alcántara y Estepona (ES/EN), y coaching fitness online con la app 2befithub.",
            canonical: "https://2befit.online/",
          },
          en: {
            title: "2BEFIT | Personal Trainer & Online Fitness Coaching in Marbella, Estepona & Costa del Sol",
            description:
              "Bilingual in-person personal training (at-home, private urbanizations & partnered centers) in Marbella, San Pedro de Alcántara & Estepona, plus global online coaching via 2befithub PWA.",
            canonical: "https://2befit.online/",
          },
        };

    const current = metaByRoute[lang] || metaByRoute.es;
    document.title = current.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", current.description);

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) canonicalTag.setAttribute("href", current.canonical);
  }, [location.pathname, lang]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrenamiento-presencial" element={<InPersonTraining />} />
        </Routes>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}

export default App;
