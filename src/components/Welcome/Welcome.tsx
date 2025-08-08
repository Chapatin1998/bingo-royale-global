import { Link } from 'react-router-dom'; // <-- IMPORTANTE
import './Welcome.css';

const Welcome = () => {
  return (
      <div className="welcome-container">
            <video autoPlay loop muted className="welcome-video-bg">
                    <source src="/videos/fondo-casino.mp4" type="video/mp4" />
                            Tu navegador no soporta el tag de video.
                                  </video>

                                        <audio src="/audio/musica-fondo.mp3" autoPlay loop></audio>

                                              <div className="welcome-content">
                                                      <div className="welcome-logo">
                                                                BINGO ROYALE
                                                                        </div>

                                                                                <p className="welcome-subtitle">La experiencia VIP de Bingo</p>

                                                                                        <div className="welcome-buttons">
                                                                                                  {/* Envolvemos el botón en un Link que lleva a /login */}
                                                                                                            <Link to="/login">
                                                                                                                        <button className="btn btn-primary">Iniciar Sesión</button>
                                                                                                                                  </Link>
                                                                                                                                            {/* Envolvemos el botón en un Link que lleva a /register */}
                                                                                                                                                      <Link to="/register">
                                                                                                                                                                  <button className="btn btn-secondary">Registrarse</button>
                                                                                                                                                                            </Link>
                                                                                                                                                                                    </div>
                                                                                                                                                                                          </div>
                                                                                                                                                                                              </div>
                                                                                                                                                                                                );
                                                                                                                                                                                                };

                                                                                                                                                                                                export default Welcome;                      