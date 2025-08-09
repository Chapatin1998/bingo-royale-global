import { auth, db } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import './Lobby.css';

interface UserProfile {
  name: string;
  balance: number;
  points: number;
}

const Lobby = () => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data() as UserProfile);
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    // Corregimos el nombre de la clase aquí para consistencia
    <div className="lobby-container-pro"> 
      {/* AÑADIMOS EL VIDEO DE FONDO AQUÍ */}
      <video autoPlay loop muted className="lobby-video-bg">
        <source src="/videos/fondo-casino.mp4" type="video/mp4" />
      </video>

      <header className="lobby-header-pro">
        <div className="lobby-logo-pro">BINGO ROYALE</div>
        <div className="player-info-pro">
          <span>Bienvenido, **{userProfile?.name || 'Jugador'}**</span>
          <Link to="/wallet" className="player-balance">
            <span className="balance-amount">${(userProfile?.balance || 0).toFixed(2)}</span>
            <span className="points-amount">{userProfile?.points || 0} Pts</span>
          </Link>
          <button onClick={handleLogout} className="logout-button-pro">Salir</button>
        </div>
      </header>

      <main className="lobby-main">
        <h1 className="lobby-main-title">Salas Disponibles</h1>
        <div className="game-rooms">
          <Link to="/game" className="room-card">
            <h3>Sala Clásica</h3>
            <p>Entrada: $5.00</p>
            <div className="room-players">● 15/20 Jugadores</div>
            <span className="play-now-btn">Jugar Ahora</span>
          </Link>
          <div className="room-card disabled">
            <h3>Torneo Rápido</h3>
            <p>Entrada: 100 Pts</p>
            <div className="room-players">● 8/10 Jugadores</div>
            <span className="play-now-btn">Próximamente</span>
          </div>
          <div className="room-card disabled">
            <h3>Sala VIP</h3>
            <p>Entrada: $50.00</p>
            <div className="room-players">● 2/5 Jugadores</div>
            <span className="play-now-btn">Próximamente</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lobby;