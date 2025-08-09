import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css';

const Register = () => {
  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  // Nuevo estado para controlar la visibilidad de la contraseña
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario creado:', userCredential.user);
      alert('¡Cuenta creada con éxito!');
    } catch (err: any) {
      console.error("Error al registrar:", err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está en uso.');
      } else {
        setError('Ocurrió un error al crear la cuenta.');
      }
    }
  };

  return (
    <div className="auth-container">
      <video autoPlay loop muted className="auth-video-bg">
        <source src="/videos/fondo-casino.mp4" type="video/mp4" />
      </video>
      
      <div className="auth-form-box">
        <h2 className="auth-title">Crear Cuenta</h2>
        <p className="auth-subtitle">Únete a la experiencia Bingo Royale</p>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="name">Nombre Completo</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
                {/* El ícono cambiará. Por ahora es texto, luego pueden ser imágenes o iconos */}
                {isPasswordVisible ? '🙈' : '👁️'}
              </span>
            </div>
          </div>
          
          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">Registrarse</button>
        </form>
        <div className="auth-disclaimer">
          <p>Debes ser mayor de 18 años para jugar.</p>
          <p>Se permite una sola cuenta por persona.</p>
        </div>
        <div className="auth-link">
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;