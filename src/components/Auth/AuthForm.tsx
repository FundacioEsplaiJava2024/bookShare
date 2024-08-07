import React, { useState, useEffect } from 'react';
import styles from '../../AuthForm.module.css';
import {createUser} from '../../services/api';
const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name,setname]= useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

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
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = {
        name: name,
        email: email,
        password: password,
      };
      const user = await createUser(newUser);
      console.log('Usuario creado:', user);
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

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
          <form onSubmit={handleRegister} className={styles.formulario__register}>
            <h2>Regístrarse</h2>
            <input
              type="text"
              placeholder="Nombre completo"
              name="nombre_completo"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo Electronico"
              name="correo"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="contrasena"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <button type="submit">Regístrarse</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
