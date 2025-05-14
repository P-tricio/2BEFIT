const Problem = () => {
  return (
    <section id="problema" className="bg-light">
      <div className="container">
        <h3>¿Por qué entrenar con nosotros?</h3>
        <div className="problema-wrapper">
          <div className="problema-intro">
            <p>
              Sabemos que empezar y mantener un estilo de vida saludable puede
              ser difícil. Por eso te acompañamos en cada paso del camino.
            </p>
          </div>
          <div className="problemas-grid">
            <div className="problema-item">
              <span className="problema-tag">Tiempo</span>
              <p>
                Te ayudamos a optimizar tus entrenamientos para que encajen en
                tu agenda ocupada.
              </p>
            </div>
            <div className="problema-item">
              <span className="problema-tag">Dudas</span>
              <p>
                Guía experta para asegurar que cada minuto de entrenamiento
                cuenta.
              </p>
            </div>
            <div className="problema-item">
              <span className="problema-tag">Motivación</span>
              <p>
                Apoyo constante para mantener el impulso y alcanzar tus
                objetivos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
