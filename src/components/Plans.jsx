const Plans = () => {
  return (
    <section id="planes" className="bg-light">
      <div className="container">
        <h3>Nuestros planes</h3>
        <div className="planes-tabs">
          <h4>Planes mensuales</h4>
          <div className="planes-grid">
            <div className="plan-card">
              <div className="plan-header">
                <h4>Plan basic</h4>
                <p className="precio">
                  <span className="precio-anterior">159€</span>
                  <span>129€</span>/mes
                </p>
              </div>
              <ul>
                <li>Entrenamiento mensual personalizado</li>
                <li>Guía nutricional por porciones o macros</li>
                <li>Check-in semanal vía app</li>
                <li>Revisión de progresos y ajustes</li>
                <li>Acceso a la app Harbiz</li>
              </ul>
              <a href="#contacto" className="btn btn-secondary">
                Quiero empezar con BASIC
              </a>
            </div>
            <div className="plan-card popular">
              <div className="plan-header">
                <h4>Plan top</h4>
                <p className="precio">
                  <span>199€</span>/mes
                </p>
              </div>
              <ul>
                <li>
                  <strong>Incluye todo lo del BASIC, más:</strong>
                </li>
                <li>Menús semanales personalizados</li>
                <li>Videollamada quincenal de 30'</li>
                <li>Corrección técnica por vídeo</li>
                <li>Análisis básico de biomecánica</li>
              </ul>
              <a href="#contacto" className="btn btn-primary">
                Quiero transformar mi físico
              </a>
            </div>
          </div>
        </div>

        <div className="planes-tabs pack-transformacion">
          <div className="pack-header">
            <h4>Pack Transformación</h4>
            <p className="pack-descripcion">
              6 meses para alcanzar tu mejor versión con seguimiento completo y
              precio especial
            </p>
          </div>
          <div className="planes-grid">
            <div className="plan-card pack">
              <div className="plan-header">
                <div className="pack-badge">Ahorra 175€</div>
                <h4>Pack Basic</h4>
                <p className="precio">
                  <span>599€</span>
                  <span className="periodo">6 meses</span>
                </p>
                <p className="precio-mes">Equivalente a 99,83€/mes</p>
                <p className="precio-anterior-total">Precio regular: 774€</p>
              </div>
              <ul>
                <li>Entrenamiento personalizado 6 meses</li>
                <li>Guía nutricional completa</li>
                <li>Check-ins semanales</li>
                <li>Acceso ilimitado a la app</li>
                <li>Soporte continuo</li>
              </ul>
              <a href="#contacto" className="btn btn-secondary">
                Empezar Pack Basic
              </a>
            </div>
            <div className="plan-card pack popular">
              <div className="plan-header">
                <div className="pack-badge">Ahorra 295€</div>
                <h4>Pack Top</h4>
                <p className="precio">
                  <span>899€</span>
                  <span className="periodo">6 meses</span>
                </p>
                <p className="precio-mes">Equivalente a 149,83€/mes</p>
                <p className="precio-anterior-total">Precio regular: 1.194€</p>
              </div>
              <ul>
                <li>
                  <strong>Todo lo del Pack Basic más:</strong>
                </li>
                <li>Menús semanales detallados</li>
                <li>12 videollamadas de seguimiento</li>
                <li>Correcciones técnicas ilimitadas</li>
                <li>Análisis biomecánico completo</li>
              </ul>
              <a href="#contacto" className="btn btn-primary">
                Empezar Pack Top
              </a>
            </div>
          </div>
        </div>

        <p className="consulta-gratuita">
          ¿Tienes dudas? <a href="#contacto">Agenda una consulta gratuita</a> y
          te ayudamos a elegir tu plan ideal.
        </p>
      </div>
    </section>
  );
};

export default Plans;
