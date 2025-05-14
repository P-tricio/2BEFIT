const Testimonials = () => {
  return (
    <section id="testimonios">
      <div className="container">
        <h3>Lo que dicen nuestros clientes</h3>
        <div className="testimonios-grid">
          <div className="testimonio">
            <p>
              "Increíble! El plan es perfecto para mi vida ocupada y el
              seguimiento es constante. Me siento más fuerte!"
            </p>
            <cite>- Laura M.</cite>
          </div>
          <div className="testimonio">
            <p>
              "Por fin estoy viendo los resultados que quería desde hace mucho.
              Patricio es súper motivador."
            </p>
            <cite>- Carlos G.</cite>
          </div>
          <div className="testimonio">
            <p>
              "La flexibilidad de entrenar desde casa y la personalización del
              plan han sido clave para integrar estos nuevos hábitos de salud."
            </p>
            <cite>- Ana R.</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
