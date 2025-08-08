import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
      <div className="auth-container">
            {/* Reutilizamos la misma estructura de video de fondo */}
                  <video autoPlay loop muted className="auth-video-bg">
                          <source src="/videos/fondo-casino.mp4" type="video/mp4" />
                                </video>

                                      <div className="auth-form-box">
                                              <h2 className="auth-title">Iniciar Sesión</h2>
                                                      <p className="auth-subtitle">Bienvenido de vuelta a Bingo Royale</p>
                                                              <form>
                                                                        <div className="input-group">
                                                                                    <label htmlFor="email">Correo Electrónico</label>
                                                                                                <input type="email" id="email" name="email" required />
                                                                                                          </div>
                                                                                                                    <div className="input-group">
                                                                                                                                <label htmlFor="password">Contraseña</label>
                                                                                                                                            <input type="password" id="password" name="password" required />
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
                                                                                                                                                                                                              