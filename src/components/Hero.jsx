const Hero = () => {
  return (
    <section id="hero">
      <div className="container">
        <span className="pre-title">Entrenamiento personalizado online</span>
        <h2>Transforma tu cuerpo y mente donde quieras, cuando quieras</h2>
        <p>
          Planes personalizados, seguimiento experto y la motivación que
          necesitas, todo online.
        </p>
        <div className="cta-buttons">
          <a href="#planes" className="btn btn-primary">
            ¡Quiero empezar!
          </a>
          <a href="#como-funciona" className="btn btn-outline">
            Cómo funciona
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Clientes satisfechos</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Tasa de Éxito</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Soporte Online</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
