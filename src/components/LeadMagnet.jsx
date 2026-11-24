import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../i18n/LanguageProvider";
import {
  FileDown,
  Clock,
  Users,
  Dumbbell,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const GUIDE_META = {
  adapt: {
    pdfUrl: "/guias/protocolo-express-20min-2befit.pdf",
    filename: "2BEFIT-Protocolo-Express-20min.pdf",
    icon: Clock,
  },
  pareja: {
    pdfUrl: "/guias/guia-misma-base-parejas-2befit.pdf",
    filename: "2BEFIT-Guia-Misma-Base-Parejas.pdf",
    icon: Users,
  },
  fuerza: {
    pdfUrl: "/guias/manual-intensidad-rir-2befit.pdf",
    filename: "2BEFIT-Manual-Intensidad-RIR.pdf",
    icon: Dumbbell,
  },
};

const WHATSAPP_NUMBER = "34667895697";

const LeadMagnet = () => {
  const { t, lang } = useTranslation();
  const data = t("lead_magnet");

  const [selectedGuide, setSelectedGuide] = useState("adapt");
  const [targetType, setTargetType] = useState("individual");
  const [mainGoal, setMainGoal] = useState("perdida_grasa");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === "#guia-gratuita") {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const [unlockedGuide, setUnlockedGuide] = useState(() => {
    try {
      const saved = sessionStorage.getItem("2befit_lead_unlocked");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [errorMsg, setErrorMsg] = useState("");

  if (!data || !data.guides) return null;

  const activeMeta = GUIDE_META[selectedGuide] || GUIDE_META.adapt;
  const activeCopy = data.guides[selectedGuide] || data.guides.adapt;

  const triggerDownload = (pdfUrl, filename) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMsg(data.form.error_invalid);
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    const leadPayload = {
      fullName: cleanName,
      email: cleanEmail,
      phone: phone.trim(),
      leadMagnetDownloaded: selectedGuide,
      targetType,
      mainGoal,
      language: lang,
      source: "landing_web",
      createdAt: new Date().toISOString(),
    };

    const submitPromise = fetch("https://formsubmit.co/ajax/patricio@2befit.online", {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `[2BEFIT Lead Magnet] ${activeCopy.title} - ${cleanName}`,
        _template: "table",
        _captcha: "false",
        ...leadPayload,
      }),
    }).catch(() => null);

    // Wait at most 1.5s so FormSubmit keeps sending in background without blocking PDF unlock
    await Promise.race([
      submitPromise,
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);

    const resultState = {
      guideKey: selectedGuide,
      guideTitle: activeCopy.title,
      pdfUrl: activeMeta.pdfUrl,
      filename: activeMeta.filename,
      fullName: cleanName,
      targetType,
      mainGoal,
    };

    try {
      sessionStorage.setItem("2befit_lead_unlocked", JSON.stringify(resultState));
    } catch {
      // Ignore storage restrictions
    }

    setUnlockedGuide(resultState);
    setIsSubmitting(false);
    triggerDownload(activeMeta.pdfUrl, activeMeta.filename);
  };

  const buildWhatsAppHref = (info) => {
    const gTitle = info ? info.guideTitle : activeCopy.title;
    const goalLabel = data.goals?.[info ? info.mainGoal : mainGoal] || mainGoal;
    const targetLabel =
      (info ? info.targetType : targetType) === "pareja"
        ? data.targets.couple
        : data.targets.individual;
    const namePart = info?.fullName ? `Soy ${info.fullName}. ` : "";
    const text =
      lang === "en"
        ? `Hi Patricio & Cristina! ${info?.fullName ? `I'm ${info.fullName}. ` : ""}I just downloaded "${gTitle}" (${targetLabel} · Goal: ${goalLabel}). Can we review how to apply it to my routine?`
        : `¡Hola Patricio y Cristina! ${namePart}Acabo de descargar "${gTitle}" (${targetLabel} · Objetivo: ${goalLabel}). ¿Vemos cómo adaptarlo a mi caso?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      ref={sectionRef}
      id="guia-gratuita"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
            {data.badge}
          </span>
          <h2
            className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight"
            style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
          >
            {data.title}
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Protocol Cards Selector */}
          <div className="lg:col-span-7 flex flex-col gap-4 justify-between">
            {Object.entries(GUIDE_META).map(([key, meta]) => {
              const Icon = meta.icon;
              const item = data.guides[key];
              const isActive = selectedGuide === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setSelectedGuide(key);
                    if (key === "pareja") setTargetType("pareja");
                  }}
                  className={`text-left rounded-2xl p-6 border-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99] flex items-start gap-5 cursor-pointer ${
                    isActive
                      ? "bg-white border-emerald-500 shadow-lg shadow-emerald-500/10"
                      : "bg-white/75 border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        PDF · ES / EN
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive Form / Unlocked PDF Card */}
          <div className="lg:col-span-5">
            <div className="h-full bg-gradient-to-br from-[#1b4332] to-[#0a2118] text-white rounded-3xl p-8 md:p-9 shadow-2xl border border-emerald-500/20 flex flex-col justify-between">
              {unlockedGuide ? (
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5">
                      <CheckCircle2 size={15} />
                      {data.unlocked.badge}
                    </div>
                    <h3
                      className="text-2xl font-black text-white mb-2"
                      style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                    >
                      {unlockedGuide.guideTitle}
                    </h3>
                    <p className="text-emerald-100/80 text-sm leading-relaxed mb-6">
                      {data.unlocked.desc}
                    </p>

                    <div className="flex flex-col gap-3">
                      <a
                        href={unlockedGuide.pdfUrl}
                        download={unlockedGuide.filename}
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#0a2118] font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
                      >
                        <FileDown size={19} />
                        {data.unlocked.download_cta}
                      </a>

                      <a
                        href={unlockedGuide.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
                      >
                        <ExternalLink size={16} />
                        {data.unlocked.open_cta}
                      </a>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/15">
                    <p className="text-xs text-emerald-200/85 mb-3">
                      {data.unlocked.bridge_prompt}
                    </p>
                    <a
                      href={buildWhatsAppHref(unlockedGuide)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-3.5 rounded-xl transition-all text-sm"
                    >
                      <MessageCircle size={18} />
                      {data.unlocked.whatsapp_cta}
                    </a>
                    <button
                      type="button"
                      onClick={() => setUnlockedGuide(null)}
                      className="w-full mt-3 text-xs text-emerald-300/80 hover:text-white underline"
                    >
                      {data.unlocked.change_cta}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                      {activeCopy.tag}
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-black text-white leading-snug"
                      style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                    >
                      {activeCopy.title}
                    </h3>
                  </div>

                  {/* Modality toggle (Individual / Pareja) */}
                  <div>
                    <span className="block text-xs font-semibold text-emerald-100/80 mb-1.5">
                      {data.form.modality_label}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "individual", label: data.targets.individual },
                        { id: "pareja", label: data.targets.couple },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          aria-pressed={targetType === opt.id}
                          onClick={() => setTargetType(opt.id)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                            targetType === opt.id
                              ? "bg-emerald-500 text-[#0a2118] border-emerald-400"
                              : "bg-white/5 text-white/85 border-white/15 hover:bg-white/10"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Goal selector */}
                  <div>
                    <label
                      htmlFor="lead-goal"
                      className="block text-xs font-semibold text-emerald-100/80 mb-1.5"
                    >
                      {data.form.goal_label}
                    </label>
                    <select
                      id="lead-goal"
                      value={mainGoal}
                      onChange={(e) => setMainGoal(e.target.value)}
                      className="w-full rounded-xl bg-[#0e291e] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                    >
                      {Object.entries(data.goals).map(([gKey, gLabel]) => (
                        <option key={gKey} value={gKey} className="bg-[#0e291e] text-white">
                          {gLabel}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-xs font-semibold text-emerald-100/80 mb-1.5"
                    >
                      {data.form.name_label}
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={data.form.name_placeholder}
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/45 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-xs font-semibold text-emerald-100/80 mb-1.5"
                    >
                      {data.form.email_label}
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={data.form.email_placeholder}
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/45 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-xs font-semibold text-emerald-100/80 mb-1.5"
                    >
                      {data.form.phone_label}
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/45 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-1 inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-[#0a2118] font-extrabold px-6 py-4 rounded-xl shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
                  >
                    <FileDown size={19} />
                    {isSubmitting ? data.form.submitting_cta : data.form.submit_cta}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-100/65 mt-1">
                    <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>{data.form.privacy_note}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
