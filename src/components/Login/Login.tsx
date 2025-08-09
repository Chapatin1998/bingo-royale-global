import { useState } from 'react'; // Importamos useState
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  // Añadimos los estados para los campos y la visibilidad de la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="auth-container">
      <video autoPlay loop muted className="auth-video-bg">
        <source src="/videos/fondo-casino.mp4" type="video/mp4" />
      </video>

      <div className="auth-form-box">
        <h2 className="auth-title">Iniciar Sesión</h2>
        <p className="auth-subtitle">Bienvenido de vuelta a Bingo Royale</p>
        <form>
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
          {/* Esta es la sección que hemos actualizado */}
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