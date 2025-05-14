const HowItWorks = () => {
  return (
    <section id="como-funciona" className="bg-light">
      <div className="container">
        <h3>Así de fácil es empezar</h3>
        <div className="proceso-grid">
          <div className="proceso-item">
            <div className="proceso-icon">📞</div>
            <h4>Consulta inicial gratuita</h4>
            <p>
              Hablamos de tus objetivos, experiencia y situación actual para
              entender tus necesidades específicas.
            </p>
          </div>
          <div className="proceso-item">
            <div className="proceso-icon">📋</div>
            <h4>Diseño de tu plan</h4>
            <p>
              Creamos tu programa personalizado de entrenamiento y nutrición
              adaptado a tus metas y estilo de vida.
            </p>
          </div>
          <div className="proceso-item">
            <div className="proceso-icon">💪</div>
            <h4>¡A entrenar!</h4>
            <p>
              Accede a tus rutinas y pautas a través de nuestra app. Entrena
              cuando y donde quieras con todo el material necesario.
            </p>
          </div>
          <div className="proceso-item">
            <div className="proceso-icon">📈</div>
            <h4>Seguimiento y ajustes</h4>
            <p>
              Revisamos tu progreso semanalmente y ajustamos el plan según tus
              resultados y feedback para maximizar tu éxito.
            </p>
          </div>
        </div>
        <div className="proceso-cta">
          <a href="#contacto" className="btn btn-primary">
            Quiero empezar mi transformación
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
