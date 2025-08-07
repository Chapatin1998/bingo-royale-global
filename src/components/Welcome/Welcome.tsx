import './Welcome.css';

const Welcome = () => {
  return (
      <div className="welcome-container">
            {/* Este video se reproducirá en bucle, sin sonido y automáticamente */}
                  <video autoPlay loop muted className="welcome-video-bg">
                          {/* Más adelante pondremos un video real en la carpeta 'public/videos' */}
                                  <source src="/videos/fondo-casino.mp4" type="video/mp4" />
                                          Tu navegador no soporta el tag de video.
                                                </video>

                                                      <div className="welcome-content">
                                                              {/* Este será el logo de nuestro juego */}
                                                                      <div className="welcome-logo">
                                                                                BINGO ROYALE
                                                                                        </div>

                                                                                                <p className="welcome-subtitle">La experiencia VIP de Bingo</p>

                                                                                                        <div className="welcome-buttons">
                                                                                                                  <button className="btn btn-primary">Iniciar Sesión</button>
                                                                                                                            <button className="btn btn-secondary">Registrarse</button>
                                                                                                                                    </div>
                                                                                                                                          </div>
                                                                                                                                              </div>
                                                                                                                                                );
                                                                                                                                                };

                                                                                                                                                export default Welcome;
                                                                                                                                                