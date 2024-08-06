import React, { useState, useEffect } from 'react';
import styles from '../../AuthForm.module.css';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width > 850) {
      // Mantener la vista del formulario actual
    } else {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.contenedor__todo}>
      <div className={styles.caja__trasera}>
        <div className={`${styles.caja__traseraLogin} ${isLogin ? styles.visible : ''}`}>
          <h3>¿Ya tienes una cuenta?</h3>
          <p>Inicia sesión para entrar en la página</p>
          <button id="btn__iniciar-sesion" onClick={toggleForm}>Iniciar Sesión</button>
        </div>
        <div className={`${styles.caja__traseraRegister} ${!isLogin ? styles.visible : ''}`}>
          <h3>¿Aún no tienes una cuenta?</h3>
          <p>Regístrate para que puedas iniciar sesión</p>
          <button id="btn__registrarse" onClick={toggleForm}>Regístrarse</button>
        </div>
      </div>

      <div className={`${styles.contenedor__loginRegister} ${isLogin ? styles.login : styles.register}`}>
        {isLogin ? (
          <form action="/login" method="POST" className={styles.formulario__login}>
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="Correo Electronico" name="correo" required />
            <input type="password" placeholder="Contraseña" name="contrasena" required />
            <button type="submit">Entrar</button>
          </form>
        ) : (
          <form action="/register" method="POST" className={styles.formulario__register}>
            <h2>Regístrarse</h2>
            <input type="text" placeholder="Nombre completo" name="nombre_completo" required />
            <input type="text" placeholder="Correo Electronico" name="correo" required />
            <input type="text" placeholder="Usuario" name="usuario" required />
            <input type="password" placeholder="Contraseña" name="contrasena" required />
            <button type="submit">Regístrarse</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
