import fs from "node:fs";
import path from "node:path";
import { LOCAL_PAGES } from "../src/data/localPagesData.js";

const distDir = path.resolve("dist");
const baseHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(baseHtmlPath)) {
  throw new Error(`Missing built index.html at ${baseHtmlPath}`);
}

const baseHtml = fs.readFileSync(baseHtmlPath, "utf8");

function buildCityRouteSpec(cityKey, areaNames) {
  const city = LOCAL_PAGES[cityKey];
  const es = city.es;
  const en = city.en;
  const slugDir = city.slug.replace(/^\//, "");

  return {
    dir: slugDir,
    canonical: city.canonical,
    title: es.metaTitle,
    description: es.metaDescription,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${city.canonical}#webpage`,
          url: city.canonical,
          name: es.metaTitle,
          description: es.metaDescription,
          isPartOf: { "@id": "https://2befit.online/#website" },
          about: { "@id": "https://2befit.online/#business" },
          inLanguage: ["es", "en"],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "2BEFIT", item: "https://2befit.online/" },
            { "@type": "ListItem", position: 2, name: es.h1, item: city.canonical },
          ],
        },
        {
          "@type": "Service",
          "@id": `${city.canonical}#service`,
          name: es.h1,
          serviceType: "Personal Training",
          provider: {
            "@type": ["SportsActivityLocation", "HealthAndBeautyBusiness"],
            "@id": "https://2befit.online/#business",
            name: "2BEFIT",
            url: "https://2befit.online/",
            telephone: "+34667895697",
            email: "patricio@2befit.online",
          },
          areaServed: areaNames.map((name) => ({ "@type": "Place", name })),
          availableLanguage: ["Spanish", "English"],
          description: es.metaDescription,
        },
        {
          "@type": "FAQPage",
          "@id": `${city.canonical}#faq`,
          mainEntity: [...es.faqs, ...en.faqs].map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    },
    bodyHtml: `
      <main>
        <header>
          <h1>${es.h1}</h1>
          <p>${es.intro}</p>
          <p>${en.intro}</p>
        </header>
        <section>
          <h2>${es.highlightsTitle}</h2>
          <ul>
            ${es.highlights.map((h) => `<li><strong>${h.title}:</strong> ${h.desc}</li>`).join("\n            ")}
          </ul>
          <h3>${es.zonesTitle}</h3>
          <p>${es.zones.join(" · ")}</p>
        </section>
        <section>
          <h2>${es.faqsTitle}</h2>
          ${es.faqs.map((f) => `<article><h3>${f.q}</h3><p>${f.a}</p></article>`).join("\n          ")}
        </section>
        <footer>
          <p>WhatsApp: <a href="https://wa.me/34667895697">+34 667 895 697</a> · Email: <a href="mailto:patricio@2befit.online">patricio@2befit.online</a> · <a href="https://2befit.online/">2BEFIT Home</a></p>
        </footer>
      </main>
    `,
  };
}

const STATIC_ROUTES = [
  {
    dir: "entrenamiento-presencial",
    canonical: "https://2befit.online/entrenamiento-presencial",
    title: "Entrenador Personal en Marbella, San Pedro y Estepona | 2BEFIT Presencial",
    description:
      "Entrenamiento personal presencial 1 a 1 y en pareja en Marbella, San Pedro de Alcántara y Estepona (Costa del Sol). Sesiones a domicilio, urbanizaciones privadas y centros concertados en español e inglés.",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://2befit.online/entrenamiento-presencial#webpage",
          url: "https://2befit.online/entrenamiento-presencial",
          name: "Entrenador Personal en Marbella, San Pedro y Estepona | 2BEFIT Presencial",
          description:
            "Entrenamiento personal presencial 1 a 1 y en pareja en Marbella, San Pedro de Alcántara y Estepona (Costa del Sol). Sesiones a domicilio, urbanizaciones privadas y centros concertados en español e inglés.",
          isPartOf: { "@id": "https://2befit.online/#website" },
          about: { "@id": "https://2befit.online/#service-presencial" },
          inLanguage: ["es", "en"],
        },
        {
          "@type": "Service",
          "@id": "https://2befit.online/#service-presencial",
          name: "Entrenamiento Personal Presencial en Marbella, San Pedro de Alcántara y Estepona",
          serviceType: "Personal Training",
          provider: {
            "@type": ["SportsActivityLocation", "HealthAndBeautyBusiness"],
            "@id": "https://2befit.online/#business",
            name: "2BEFIT",
            url: "https://2befit.online/",
            telephone: "+34667895697",
            email: "patricio@2befit.online",
          },
          areaServed: [
            { "@type": "City", name: "Marbella" },
            { "@type": "Place", name: "San Pedro de Alcántara" },
            { "@type": "City", name: "Estepona" },
            { "@type": "Place", name: "Puerto Banús" },
            { "@type": "Place", name: "Nueva Andalucía" },
            { "@type": "City", name: "Benahavís" },
            { "@type": "AdministrativeArea", name: "Costa del Sol" },
          ],
          availableLanguage: ["Spanish", "English"],
          description:
            "Sesiones privadas 1 a 1 y en pareja a domicilio, en urbanizaciones privadas y centros concertados en Marbella, San Pedro de Alcántara y Estepona (ES/EN).",
        },
      ],
    },
    bodyHtml: `
      <main>
        <header>
          <h1>Entrenador Personal Presencial en Marbella, San Pedro de Alcántara y Estepona — 2BEFIT</h1>
          <p>
            Sesiones privadas 1 a 1, en pareja y grupos reducidos en Marbella, San Pedro de Alcántara, Estepona y toda la Costa del Sol.
            Entrenamos a domicilio, en villas y urbanizaciones privadas o en centros concertados, en español e inglés, con Patricio y Cristina.
          </p>
        </header>
        <section>
          <h2>Modalidades Presenciales en la Costa del Sol</h2>
          <ul>
            <li><strong>Entrenamiento Personal 1 a 1:</strong> Corrección técnica en tiempo real, optimización biomecánica y progresión adaptada.</li>
            <li><strong>Parejas y Grupos Reducidos:</strong> Entrena acompañado en Marbella o Estepona con objetivos coordinados.</li>
            <li><strong>Soporte Digital Incluido:</strong> Acceso a la PWA propia 2befithub para registrar progresos, pautas nutricionales y entrenamientos extra.</li>
          </ul>
          <p>Páginas locales: <a href="https://2befit.online/entrenador-personal-marbella">Entrenador Personal Marbella</a> · <a href="https://2befit.online/entrenador-personal-estepona">Entrenador Personal Estepona</a></p>
          <p>Contacto directo: WhatsApp <a href="https://wa.me/34667895697">+34 667 895 697</a> · Email: <a href="mailto:patricio@2befit.online">patricio@2befit.online</a></p>
        </section>
      </main>
    `,
  },
  buildCityRouteSpec("marbella", [
    "Marbella",
    "Puerto Banús",
    "Nueva Andalucía",
    "San Pedro de Alcántara",
    "Sierra Blanca",
    "Elviria",
    "Costa del Sol",
  ]),
  buildCityRouteSpec("estepona", [
    "Estepona",
    "Cancelada",
    "Nueva Milla de Oro",
    "El Paraíso",
    "Selwo",
    "Valle Romano",
    "Benahavís",
    "Costa del Sol",
  ]),
];

for (const route of STATIC_ROUTES) {
  let routeHtml = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="es"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="es" href="${route.canonical}" />`
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="en" href="${route.canonical}?lang=en" />`
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="x-default" href="${route.canonical}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${JSON.stringify(route.jsonLd, null, 2)}\n    </script>`
    )
    .replace(
      /<div id="root">[\s\S]*?<\/div>\s*<script/i,
      `<div id="root">${route.bodyHtml}</div>\n    <script`
    );

  const targetDir = path.join(distDir, route.dir);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), routeHtml, "utf8");
  console.log("Generated static GEO route:", path.join(targetDir, "index.html"));
}
