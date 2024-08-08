import React, { useState, useEffect } from 'react';
import styles from '../../AuthForm.module.css';
import { createUser, loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook 
const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages 
  const history = useNavigate(); // Get the history object for redirection 
  

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
      if (user) {
        history('/HomePage');
      } else {
        setError('Failed to create user');
      } 
    } catch (error) {
      console.error('Error al crear usuario:', error);
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
      console.log('Login exitoso:', user);
      if (user) {
        history('/HomePage');
      } else {
        setError('Invalid username or password');
      }
      // Aquí puedes agregar lógica para redirigir al usuario a una página de inicio o guardar el token de autenticación
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
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
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;