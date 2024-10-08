import React, { useState, useEffect } from 'react';
import styles from '../../AuthForm.module.css';
import { createUser, loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

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
      if (user) {
        window.alert('Usuario registrado correctamente'); // Show success prompt
        history('/');
      } else {
        setError('Failed to create user');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setError('Error al crear usuario');
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const credentials = {
        email: email,
        password: password,
      };
      const user = await loginUser(credentials);
      if (user) {
        sessionStorage.setItem("userId", "" + user.user_id);
        sessionStorage.setItem("userName", user.name);
        history('/HomePage');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión');
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
          <form onSubmit={handleLogin} className={styles.formulario__login}>
            <h2>Iniciar Sesión</h2>
            <input
              type="email"
              placeholder="Correo electronico"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             {error && <div style={{ color: 'red' }}>{error}</div>}
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
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo Electronico"
              name="correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Regístrarse</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
