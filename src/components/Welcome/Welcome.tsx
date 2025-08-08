import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
      <div className="welcome-container">
            <video autoPlay loop muted className="welcome-video-bg">
                    <source src="/videos/fondo-casino.mp4" type="video/mp4" />
                            Tu navegador no soporta el tag de video.
                                  </video>

                                        <audio src="/audio/musica-fondo.mp3" autoPlay loop></audio>

                                              {/* --- NUEVO: SELECTOR DE IDIOMA (VISUAL) --- */}
                                                    <div className="welcome-lang">
                                                            <span>🇧🇴 ES</span>
                                                                    <span>🇧🇷 PT</span>
                                                                            <span>🇺🇸 EN</span>
                                                                                  </div>

                                                                                        <div className="welcome-content">
                                                                                                <div className="welcome-logo">
                                                                                                          BINGO ROYALE
                                                                                                                  </div>

                                                                                                                          <p className="welcome-subtitle">La experiencia VIP de Bingo</p>

                                                                                                                                  <div className="welcome-buttons">
                                                                                                                                            <Link to="/login">
                                                                                                                                                        <button className="btn btn-primary">Iniciar Sesión</button>
                                                                                                                                                                  </Link>
                                                                                                                                                                            <Link to="/register">
                                                                                                                                                                                        <button className="btn btn-secondary">Registrarse</button>
                                                                                                                                                                                                  </Link>
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                      {/* --- NUEVO: ADVERTENCIA 18+ --- */}
                                                                                                                                                                                                                            <div className="welcome-disclaimer">
                                                                                                                                                                                                                                    <p>Juego exclusivo para mayores de 18 años. Juega con responsabilidad.</p>
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                export default Welcome;
                                                                                                                                                                                                                                                