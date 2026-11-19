import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const baseHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(baseHtmlPath)) {
  throw new Error(`Missing built index.html at ${baseHtmlPath}`);
}

const baseHtml = fs.readFileSync(baseHtmlPath, "utf8");

const inPersonTitle =
  "Entrenador Personal en Marbella, San Pedro y Estepona | 2BEFIT Presencial";
const inPersonDescription =
  "Entrenamiento personal presencial 1 a 1 y en pareja en Marbella, San Pedro de Alcántara y Estepona (Costa del Sol). Sesiones a domicilio, urbanizaciones privadas y centros concertados en español e inglés.";
const inPersonCanonical = "https://2befit.online/entrenamiento-presencial";

const inPersonJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${inPersonCanonical}#webpage`,
      url: inPersonCanonical,
      name: inPersonTitle,
      description: inPersonDescription,
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
      description: inPersonDescription,
    },
  ],
};

const inPersonBodyContent = `
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
          <p>Contacto directo: WhatsApp <a href="https://wa.me/34667895697">+34 667 895 697</a> · Email: <a href="mailto:patricio@2befit.online">patricio@2befit.online</a></p>
          <p><a href="https://2befit.online/">Volver a la página principal de 2BEFIT</a></p>
        </section>
      </main>
`;

let routeHtml = baseHtml
  .replace(/<title>[\s\S]*?<\/title>/i, `<title>${inPersonTitle}</title>`)
  .replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${inPersonDescription}" />`
  )
  .replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${inPersonCanonical}" />`
  )
  .replace(
    /<link\s+rel="alternate"\s+hreflang="es"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="es" href="${inPersonCanonical}" />`
  )
  .replace(
    /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="en" href="${inPersonCanonical}?lang=en" />`
  )
  .replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${inPersonCanonical}" />`
  )
  .replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${inPersonCanonical}" />`
  )
  .replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${inPersonTitle}" />`
  )
  .replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${inPersonDescription}" />`
  )
  .replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${JSON.stringify(inPersonJsonLd, null, 2)}\n    </script>`
  )
  .replace(
    /<div id="root">[\s\S]*?<\/div>\s*<script/i,
    `<div id="root">${inPersonBodyContent}</div>\n    <script`
  );

const targetDir = path.join(distDir, "entrenamiento-presencial");
fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(path.join(targetDir, "index.html"), routeHtml, "utf8");

console.log("Generated static GEO route:", path.join(targetDir, "index.html"));
