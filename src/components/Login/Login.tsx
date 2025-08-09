import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; // Importamos la configuración de Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // <-- IMPORTANTE: Esta es la función para iniciar sesión
import './Login.css';

const Login = () => {
  // Creamos "memorias" para el email, la contraseña y los errores
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Esta es la función que se ejecuta al presionar "Entrar"
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 2. Llamamos a la función mágica de Firebase para INICIAR SESIÓN
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario autenticado:', userCredential.user);
      alert('¡Inicio de sesión exitoso!');

      // En el futuro, aquí lo redirigiremos al lobby del juego.

    } catch (err: any) {
      // 3. Si Firebase devuelve un error (contraseña incorrecta, etc.), lo mostramos
      console.error("Error al iniciar sesión:", err.message);
      setError('Correo o contraseña incorrectos. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="auth-container">
      <video autoPlay loop muted className="auth-video-bg">
        <source src="/videos/fondo-casino.mp4" type="video/mp4" />
      </video>

      <div className="auth-form-box">
        <h2 className="auth-title">Iniciar Sesión</h2>
        <p className="auth-subtitle">Bienvenido de vuelta a Bingo Royale</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input 
                type={isPasswordVisible ? 'text' : 'password'} 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="password-toggle-icon">
                {isPasswordVisible ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Aquí mostramos el mensaje de error si algo falla */}
          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">Entrar</button>
        </form>
        <div className="auth-link">
          <p>¿No tienes una cuenta? <Link to="/register">Crea una aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;