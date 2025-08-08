import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
      <div className="auth-container">
            <video autoPlay loop muted className="auth-video-bg">
                    <source src="/videos/fondo-casino.mp4" type="video/mp4" />
                          </video>

                                <div className="auth-form-box">
                                        <h2 className="auth-title">Crear Cuenta</h2>
                                                <p className="auth-subtitle">Únete a la experiencia Bingo Royale</p>
                                                        <form>
                                                                  <div className="input-group">
                                                                              <label htmlFor="name">Nombre Completo</label>
                                                                                          <input type="text" id="name" name="name" required />
                                                                                                    </div>
                                                                                                              <div className="input-group">
                                                                                                                          <label htmlFor="email">Correo Electrónico</label>
                                                                                                                                      <input type="email" id="email" name="email" required />
                                                                                                                                                </div>
                                                                                                                                                          <div className="input-group">
                                                                                                                                                                      <label htmlFor="password">Contraseña</label>
                                                                                                                                                                                  <input type="password" id="password" name="password" required />
                                                                                                                                                                                            </div>
                                                                                                                                                                                                      <button type="submit" className="auth-button">Registrarse</button>
                                                                                                                                                                                                              </form>
                                                                                                                                                                                                                      {/* NUEVA SECCIÓN DE ADVERTENCIAS */}
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
                                                                                                                                                                                                                                                                                                