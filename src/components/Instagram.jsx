const Instagram = () => {
  return (
    <section id="instagram" className="bg-light">
      <div className="container">
        <div className="instagram-wrapper">
          <div className="instagram-content">
            <div className="instagram-header">
              <div className="instagram-title">
                <h3>Síguenos en Instagram</h3>
                <p className="instagram-subtitle">
                  Contenido exclusivo y motivación diaria
                </p>
              </div>
              <a
                href="https://instagram.com/2befit.online"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-profile"
              >
                <div className="instagram-avatar">
                  <img src="/assets/logo.png" alt="2BEFIT" />
                </div>
                <div className="instagram-info">
                  <span className="instagram-handle">@2befit.online</span>
                  <span className="instagram-meta">
                    Entrenamiento personalizado
                  </span>
                </div>
              </a>
            </div>
            <div className="instagram-features">
              <div className="instagram-feature">
                <span className="feature-icon">💪</span>
                <h4>Rutinas efectivas</h4>
                <p>Ejercicios y técnicas para maximizar tus resultados</p>
              </div>
              <div className="instagram-feature">
                <span className="feature-icon">🥗</span>
                <h4>Tips de nutrición</h4>
                <p>Consejos prácticos para una alimentación saludable</p>
              </div>
              <div className="instagram-feature">
                <span className="feature-icon">🎯</span>
                <h4>Motivación diaria</h4>
                <p>Inspiración para mantener tu compromiso fitness</p>
              </div>
            </div>
            <div className="instagram-cta">
              <a
                href="https://instagram.com/2befit.online"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span className="instagram-btn-icon">📸</span>
                Seguir en Instagram
              </a>
              <p className="instagram-followers">
                Únete a nuestra comunidad de +1500 seguidores
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
