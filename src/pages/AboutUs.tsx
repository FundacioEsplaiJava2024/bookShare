import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <section className="about-us-header">
        <h2>¿Quiénes Somos?</h2>
      </section>

      <section className="about-us-content">
        <h3>Nuestra <span className="border">Historia</span></h3>
        <p>
          BookShare nació con una simple pero poderosa idea: el acceso a la
          educación y la cultura no debe ser un privilegio. Creemos que los
          libros tienen el poder de transformar vidas, abrir mentes y brindar
          oportunidades. Sin embargo, en muchas comunidades, el acceso a libros
          y recursos educativos sigue siendo limitado. Es por eso que decidimos
          crear una plataforma que facilite la donación y el intercambio de
          libros, con el objetivo de llegar a las manos que más lo necesitan.
        </p>

        <h3>Nuestra <span className="border">Misión</span></h3>
        <p>
          Nuestra misión es clara: <strong>romper las barreras que impiden el acceso a la educación</strong>.
          A través de la donación de libros, buscamos crear una red solidaria donde
          cualquier persona, sin importar su situación económica, pueda disfrutar
          del maravilloso mundo de la lectura y aprender de él.
        </p>
        <img src="/img/AboutUsimg/AboutUs1.jpg" alt="AboutUs1" className="AboutUsImg" />
        <h3>Nuestra <span className="border">Visión</span></h3>
        <p>
          Nos visualizamos en un mundo donde el conocimiento y la educación sean
          accesibles para todos. Un futuro donde las desigualdades se reduzcan
          a través de iniciativas solidarias y donde más personas puedan cumplir
          sus sueños gracias a los libros.
        </p>

        <h3>Nuestros <span className="border">Valores</span></h3>
        <ul>
          <li>
            <strong>Acceso a la Educación:</strong> Creemos que la educación es la clave para mejorar
            la calidad de vida y reducir la pobreza.
          </li>
          <li>
            <strong>Sostenibilidad:</strong> Al compartir libros, contribuimos a una economía
            circular y ayudamos a reducir el desperdicio.
          </li>
          <li>
            <strong>Solidaridad:</strong> Nos mueve la solidaridad y el deseo de ayudar a los
            demás.
          </li>
        </ul>
        <img src="/img/AboutUsimg/AboutUs2.jpg" alt="AboutUs2" className="AboutUsImg" />


        <h3>¿Cómo <span className="border">Funciona?</span></h3>
        <p>
          BookShare es una plataforma diseñada para facilitar el intercambio y
          donación de libros. Cualquier persona puede registrar los libros que
          desee donar o buscar aquellos que necesite. De esta manera, los libros
          encuentran una segunda vida en nuevas manos, creando un ciclo de
          aprendizaje y colaboración.
        </p>

        <h3>Únete a <span className="border">Nuestra Causa</span></h3>
        <p>
          Ya seas un ávido lector que busca donar tus libros, o alguien que
          necesita recursos para continuar aprendiendo, en BookShare te damos la
          bienvenida. Únete a nuestra comunidad y sé parte del cambio. Con cada
          libro que compartimos, damos un paso más hacia un futuro donde la
          educación sea accesible para todos.
        </p>
        <img src="/img/AboutUsimg/AboutUs3.jpg" alt="AboutUs3" className="AboutUsImg" />

      </section>
    </div>
  );
};

export default AboutUs;
