# Plan de Implementación: Modernización Visual 2BEFIT

**Fecha:** 2026-03-28
**Basado en:** docs/superpowers/specs/2026-03-28-2befit-modernization-design.md
**Duración estimada:** 5-7 sesiones de trabajo
**Prioridad:** Alta

---

## Desglose por Fases

### **FASE 1: Sistema Base (2-3 horas)**

Establecer las bases visuales que sostienen todo lo demás.

#### 1.1 — CSS Variables y Sombras

**Archivo:** `src/App.css`

**Cambios:**
- Extender `:root` con variables de sombras:
  ```css
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.12);
  ```
- Agregar variable para transitions timing
- Agregar gradientes sutiles como variables

**Verificación:**
- ✅ Variables accesibles globalmente
- ✅ Sombras aplicables a todos los componentes

#### 1.2 — Global Transitions

**Archivo:** `src/App.css`

**Cambios:**
- Crear clase `.transition-smooth` con `transition: all 300ms ease-out`
- Crear clases por tipo:
  - `.transition-color` (150ms ease-out)
  - `.transition-transform` (300ms ease-out)
  - `.transition-shadow` (200ms ease-out)
- Actualizar elementos clave (buttons, links, cards)

**Verificación:**
- ✅ Transiciones suaves en hover
- ✅ Timing consistente

#### 1.3 — Scroll Progress Bar (Header)

**Archivo:** `src/components/Header.jsx` + `src/App.css`

**Cambios en Header.jsx:**
- Agregar useState para track scroll percentage
- useEffect para actualizar en scroll
- Renderizar barra en header (height: 3px, position: fixed bottom del header)

**CSS:**
- `.scroll-progress-bar { background: var(--pale-green); height: 3px; width: 0%; }`

**Verificación:**
- ✅ Barra visible en header
- ✅ Ancho actualiza suavemente con scroll

---

### **FASE 2: Componentes de Cards (3-4 horas)**

Modernizar las cards principales con bordes, gradientes y hover effects.

#### 2.1 — Plan Cards

**Archivo:** `src/components/Plans.jsx` + `src/App.css`

**CSS Changes:**
- `.plan-card` base:
  - Border: `1px solid rgba(143,188,143,0.15)`
  - Border-top: `3px solid transparent`
  - Box-shadow: `var(--shadow-md)` → `var(--shadow-lg)` en hover
  - Background: `linear-gradient(135deg, #fff 0%, rgba(143,188,143,0.02) 100%)`
  - Padding: mantener pero mejorar consistencia
  - Transición: `all 300ms ease-out`

- `.plan-card:hover`:
  - Transform: `translateY(-4px)`
  - Border-top: `3px solid var(--pale-green)`
  - Box-shadow: `var(--shadow-lg)`

- `.plan-card.popular .popular-badge`:
  - Background: `linear-gradient(135deg, var(--pale-green), #9ed5a1)`
  - Padding: `0.5rem 1rem`
  - Border-radius: `20px`
  - Color: white
  - Font-size: text-xs, font-weight 600

- `.precio` styling:
  - `.precio span:first-child` (número): `font-size: clamp(2rem, 5vw, 2.5rem); font-weight: 700`
  - `.precio-anterior`: `text-decoration: line-through; opacity: 0.6`

**Verificación:**
- ✅ Cards tienen elevación en hover
- ✅ Popular badge con gradient
- ✅ Precios bien jerarquizados

#### 2.2 — Testimonial Cards

**Archivo:** `src/components/Testimonials.jsx` + `src/App.css`

**CSS Changes:**
- `.testimonio` base:
  - Border: `1px solid rgba(143,188,143,0.15)`
  - Box-shadow: `var(--shadow-md)`
  - Background: `linear-gradient(135deg, #fff 0%, rgba(143,188,143,0.02) 100%)`
  - Padding: `2rem`
  - Transición: `all 300ms ease-out`

- `.testimonio:hover`:
  - Transform: `translateY(-4px)`
  - Box-shadow: `var(--shadow-lg)`
  - Border-color: `rgba(143,188,143,0.3)`

- Agregar comilla decorativa:
  - `::before { content: '"'; font-size: 3rem; color: rgba(143,188,143,0.3); position: absolute; top: 0.5rem; left: 1rem; }`

- Estrellas (rating):
  - Color: `#fbbf24` (dorado)
  - Margin-bottom: `1rem`

- Nombre: `font-weight: 700; color: var(--dark); margin-top: 1rem`
- Especialidad: `color: var(--text-gray); font-size: 0.85rem`

**Verificación:**
- ✅ Comilla visible
- ✅ Cards con elevación y border color en hover
- ✅ Estrellas doradas

#### 2.3 — Benefit Cards

**Archivo:** `src/components/Benefits.jsx` + `src/App.css`

**CSS Changes:**
- `.beneficio-item` base:
  - Box-shadow: `var(--shadow-md)`
  - Border: `1px solid rgba(143,188,143,0.15)`
  - Transición: `all 300ms ease-out`

- `.beneficio-item:hover`:
  - Transform: `translateY(-4px)`
  - Box-shadow: `var(--shadow-lg)`
  - Border-color: `rgba(143,188,143,0.3)`

- `.beneficio-icon`:
  - Width: `60px; height: 60px`
  - Background: `rgba(143,188,143,0.1)`
  - Border-radius: `50%`
  - Display: flex, center items
  - Transición: `all 300ms ease-out`

- `.beneficio-item:hover .beneficio-icon`:
  - Background: `rgba(143,188,143,0.2)`
  - Transform: `rotate(5deg) scale(1.1)`

- SVG inside icon:
  - Color: `var(--pale-green)`
  - Size: `26px`

**Verificación:**
- ✅ Iconos en círculos verdes
- ✅ Círculos se oscurecen en hover
- ✅ Cards se elevan

---

### **FASE 3: Formularios y Inputs (2-3 horas)**

Mejorar inputs, select, textarea con feedback visual.

#### 3.1 — Input Base Styles

**Archivo:** `src/App.css`

**CSS Changes:**
```css
input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
select {
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  color: var(--dark);
  transition: all 200ms ease-out;
  outline: none;
}

input::placeholder,
textarea::placeholder {
  color: rgba(74, 74, 74, 0.4);
}

/* Focus state */
input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
textarea:focus,
select:focus {
  border: 2px solid var(--pale-green);
  box-shadow: 0 0 0 3px rgba(143, 188, 143, 0.1);
  background: #fafbff;
}
```

**Verificación:**
- ✅ Inputs have focus rings
- ✅ Focus shadow visible
- ✅ Transiciones suaves

#### 3.2 — Validación States

**Archivo:** `src/App.css`

**CSS Changes:**
```css
.input-error {
  border: 2px solid #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.input-success {
  border: 2px solid #22c55e !important;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
}

.input-error-message,
.input-success-message {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.input-error-message { color: #ef4444; }
.input-success-message { color: #22c55e; }
```

**En componentes (Contact.jsx):**
- Agregar clases `.input-error` cuando hay validación error
- Agregar clases `.input-success` cuando input es válido
- Renderizar mensajes de error/success debajo del input

**Verificación:**
- ✅ Errores muestran borde rojo + shadow
- ✅ Success muestra borde verde
- ✅ Mensajes visibles

#### 3.3 — Button Refinement

**Archivo:** `src/App.css`

**CSS Changes:**
```css
.btn {
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-md);
  transition: all 300ms ease-out;
  cursor: pointer;
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn:focus {
  outline: 2px solid var(--pale-green);
  outline-offset: 2px;
}

.btn:active {
  transform: translateY(0px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--pale-green);
  color: white;
}

.btn-primary:hover {
  background: #7aad7a; /* darker shade */
}

.btn-secondary {
  background: var(--success);
  color: white;
}

.btn-secondary:hover {
  background: #8ec98e; /* darker shade */
}

.btn-outline {
  background: transparent;
  border: 2px solid currentColor;
  color: var(--white);
}

.btn-outline:hover {
  background: var(--white);
  color: var(--dark);
}
```

**Verificación:**
- ✅ Buttons tienen elevación en hover
- ✅ Focus rings visibles
- ✅ Transiciones suaves

---

### **FASE 4: Animaciones Scroll (2-3 horas)**

Implementar scroll-triggered animations con Intersection Observer.

#### 4.1 — Hook useScrollAnimation

**Crear archivo:** `src/hooks/useScrollAnimation.js`

**Contenido:**
```javascript
import { useEffect, useRef } from 'react';

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    ...options,
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('animate-in');
        // Optional: observer.unobserve(element); para una sola vez
      } else {
        element.classList.remove('animate-in');
      }
    }, defaultOptions);

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return ref;
};
```

**Uso en componentes:**
```javascript
const cardRef = useScrollAnimation();
return <div ref={cardRef} className="card animate-scroll-up">...</div>;
```

**Verificación:**
- ✅ Hook funciona correctamente
- ✅ Elementos animados al entrar en viewport

#### 4.2 — CSS Animations

**Archivo:** `src/App.css`

**Agregar keyframes:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Clase que se agrega vía JS */
.animate-in.animate-scroll-up {
  animation: fadeInUp 400ms ease-out forwards;
}

.animate-in.animate-scroll-scale {
  animation: scaleIn 400ms ease-out forwards;
}

/* Staggered effect para múltiples cards */
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 60ms; }
.card:nth-child(3) { animation-delay: 120ms; }
.card:nth-child(4) { animation-delay: 180ms; }
```

**Verificación:**
- ✅ Animaciones suaves
- ✅ Stagger visible entre cards
- ✅ Performance bueno (sin lag)

#### 4.3 — Aplicar a Componentes

**En cada componente (Plans, Testimonials, Benefits):**

1. Importar hook: `import { useScrollAnimation } from '../hooks/useScrollAnimation'`
2. En grid/contenedor, aplicar ref:
   ```javascript
   const cardsRef = useScrollAnimation();
   return (
     <div ref={cardsRef} className="planes-grid">
       {/* cards aquí, cada una con clase "card" */}
     </div>
   );
   ```
3. Cada card hija hereda la animación con delay

**En Hero (mantener animaciones existentes pero mejorar):**
- Mantener delays actuales
- Mejorar easing a `ease-out`

**Verificación:**
- ✅ Cards aparecen con fade-in + slide-up
- ✅ Stagger entre cards (60-80ms)
- ✅ Duration 400-500ms

---

### **FASE 5: Polish Final (1-2 horas)**

Detalles visuales, footer, y ajustes finales.

#### 5.1 — Footer Refinado

**Archivo:** `src/components/Footer.jsx` + `src/App.css`

**CSS Changes:**
```css
.footer {
  background: var(--light-gray);
  border-top: 1px solid rgba(143, 188, 143, 0.15);
  padding: clamp(3rem, 8vw, 5rem) 0;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.footer-brand img {
  height: 50px;
  width: auto;
}

.footer-tagline {
  color: var(--text-gray);
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.footer-links a {
  color: var(--text-gray);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 200ms ease-out;
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--pale-green);
  transition: width 300ms ease-out;
}

.footer-links a:hover {
  color: var(--pale-green);
}

.footer-links a:hover::after {
  width: 100%;
}

.footer-legal {
  color: var(--text-gray);
  font-size: 0.85rem;
  opacity: 0.7;
}
```

**En Footer.jsx:**
- Componente ya existe, solo mejorar CSS

**Verificación:**
- ✅ Footer tiene border y mejor espaciado
- ✅ Links tienen hover effect con underline
- ✅ Layout responsive

#### 5.2 — Header Scroll Effects

**Archivo:** `src/components/Header.jsx` + `src/App.css`

**Cambios en Header.jsx:**
- Ya existe lógica de scroll (isScrolled state)
- Mantener pero mejorar transiciones CSS

**CSS improvements:**
```css
.header {
  transition: padding 300ms ease-out, box-shadow 300ms ease-out;
}

.header.scrolled {
  padding: 0.5rem 0;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.logo {
  transition: height 300ms ease-out, width 300ms ease-out;
}

.header.scrolled .logo {
  height: 55px;
  width: 55px;
}

.nav-list a {
  transition: color 200ms ease-out;
}

/* Underline animation on nav links */
.nav-list a::after {
  transition: transform 300ms ease-out;
}
```

**Verificación:**
- ✅ Logo se achica suavemente
- ✅ Padding transiciona
- ✅ Underline animation en nav

#### 5.3 — Responsive Refinement

**Archivo:** `src/App.css`

**Media queries updates:**
- Asegurar cards tengan stack en mobile
- Buttons full-width en mobile
- Adjust font sizes si es necesario

**Verificación:**
- ✅ Mobile (375px): todo funciona
- ✅ Tablet (768px): layout responsive
- ✅ Desktop (1024px+): óptimo

#### 5.4 — Testing y Optimización

**Checklist:**
- ✅ Probar en Chrome, Firefox, Safari, Edge
- ✅ Probar móvil (iOS, Android)
- ✅ Verificar performance (no lag en animaciones)
- ✅ Verificar accesibilidad (focus rings, contrast)
- ✅ Validar prefers-reduced-motion

**Performance targets:**
- Lighthouse: 90+ en Performance
- LCP: < 2.5s
- CLS: < 0.1
- No jank en scroll/hover

---

## Resumen de Archivos a Modificar

| Archivo | Cambios | Fase |
|---------|---------|------|
| `src/App.css` | Variables, transiciones, sombras, cards, inputs, buttons, animations, footer | 1, 2, 3, 4, 5 |
| `src/components/Header.jsx` | Scroll progress bar | 1 |
| `src/components/Plans.jsx` | Card styling improvements | 2 |
| `src/components/Testimonials.jsx` | Card styling, comillas | 2 |
| `src/components/Benefits.jsx` | Card styling, icons | 2 |
| `src/components/Contact.jsx` | Input validation, error states | 3 |
| `src/components/Footer.jsx` | Styling improvements | 5 |
| `src/hooks/useScrollAnimation.js` | Nuevo: Intersection Observer hook | 4 |
| `src/index.css` | Optional: actualizar si es necesario | 1 |

---

## Orden de Implementación Recomendado

1. **Fase 1** → **Fase 2** → **Fase 3** → **Fase 4** → **Fase 5**

Cada fase se construye sobre la anterior. Las fases 2 y 3 pueden paralelizarse si hay dos personas.

---

## Riesgos y Mitigaciones

| Riesgo | Mitigation |
|--------|-----------|
| Animaciones lentas en mobile | Usar CSS puro, test en dispositivo real |
| Incompatibilidad Safari | Usar prefijos -webkit-, test en Safari |
| Accesibilidad: usuarios con motion disability | Respetar prefers-reduced-motion |
| Breaking existing styles | Usar clases nuevas, no overwrite core styles |

---

## Definition of Done

Fase completa cuando:
- ✅ Código escrito y limpio
- ✅ Testing visual en desktop + mobile
- ✅ Cross-browser compatible
- ✅ Accesibilidad OK (WCAG AA)
- ✅ Performance OK (no lag)
- ✅ Commit realizado con mensaje claro

