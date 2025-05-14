const Contact = () => {
  const phoneNumber = "+34667895697";
  const message = "¡Hola! Me gustaría empezar mi transformación con 2BEFIT";

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <div className="contact-content">
          <span className="pre-contact">¿Listo para el cambio?</span>
          <h3>Comienza tu transformación ahora</h3>
          <p>
            Da el primer paso hacia una vida más saludable y activa.
            <br />
            Estamos listos para guiarte en tu transformación.
          </p>
          <div className="contact-buttons">
            <button
              onClick={handleWhatsAppClick}
              className="btn contact-whatsapp"
            >
              <svg
                className="whatsapp-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 13.9 2.5 15.7 3.4 17.2L2 22L6.9 20.6C8.4 21.5 10.1 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.6 15.5C16.3 16.3 15.2 17 14.4 17.1C13.6 17.2 12.9 17 12 16.6C8.8 15.1 7 12 6.9 11.8C6.8 11.6 5.8 10.2 5.8 8.7C5.8 7.2 6.5 6.5 6.8 6.2C7.1 5.9 7.5 5.8 7.7 5.8C7.9 5.8 8.1 5.8 8.3 5.8C8.5 5.8 8.8 5.7 9.1 6.4C9.4 7.1 10.1 8.6 10.2 8.7C10.3 8.8 10.3 9 10.2 9.2C9.7 10.2 9.2 10.1 9.6 10.8C10.6 12.6 11.8 13.3 13.5 14.1C13.8 14.2 14 14.2 14.1 14C14.2 13.8 14.9 13 15.2 12.7C15.5 12.4 15.8 12.4 16.1 12.5C16.4 12.6 17.9 13.3 18.2 13.5C18.5 13.7 18.7 13.7 18.8 13.9C18.9 14.1 18.9 14.8 18.6 15.6L16.6 15.5Z" />
              </svg>
              ¡Quiero empezar ahora!
            </button>
            <a
              href="mailto:patricioescabe@gmail.com?subject=Interesado en 2BEFIT"
              className="btn contact-email"
            >
              <svg
                className="email-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
              Contactar por email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
