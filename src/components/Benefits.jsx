const Benefits = () => {
  return (
    <section id="beneficios">
      <div className="container">
        <div className="beneficios-header">
          <h3>¿Qué obtendrás con 2BEFIT?</h3>
          <p className="beneficios-subtitle">
            Tu transformación completa con seguimiento profesional
          </p>
        </div>
        <div className="beneficios-grid">
          <div className="beneficio-item">
            <div className="beneficio-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863a.96.96 0 01.953.848l.007.112v3.398a.96.96 0 01-1.913.112l-.006-.112V15.28c0-.53.43-.96.96-.96zm9-2.664a.96.96 0 01.953.848l.007.112v6.062a.96.96 0 01-1.913.112l-.006-.112V12.5c0-.53.43-.96.96-.96zm4.5-4.72a.96.96 0 01.953.848l.007.112v10.782a.96.96 0 01-1.913.112l-.006-.112V7.76c0-.53.43-.96.96-.96z" />
              </svg>
            </div>
            <h4>Planes 100% personalizados</h4>
            <p>
              Entrenamiento y nutrición adaptados a tus objetivos, nivel y
              equipamiento disponible.
            </p>
          </div>
          <div className="beneficio-item">
            <div className="beneficio-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <h4>Seguimiento experto</h4>
            <p>
              Revisiones semanales y ajustes continuos para maximizar tus
              resultados.
            </p>
          </div>
          <div className="beneficio-item">
            <div className="beneficio-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.5 6a3 3 0 00-3-3H6a3 3 0 00-3 3v7.5a3 3 0 003 3v-6A4.5 4.5 0 0110.5 6h6z" />
                <path d="M18 7.5a3 3 0 013 3V18a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3H18z" />
              </svg>
            </div>
            <h4>App exclusiva</h4>
            <p>
              Accede a tus programas y registra tu progreso desde cualquier
              dispositivo, 24/7.
            </p>
          </div>
          <div className="beneficio-item">
            <div className="beneficio-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h4>Flexibilidad total</h4>
            <p>
              Entrena donde y cuando quieras, con el equipamiento que tengas
              disponible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
