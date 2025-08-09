import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Lobby.css';

const Lobby = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="lobby-container">
      <div className="lobby-box">
        <h2>Bienvenido al Lobby</h2>
        <p>Sesión iniciada como:</p>
        <p className="lobby-email">{currentUser?.email}</p>
        
        <div className="lobby-actions">
          <Link to="/game">
            <button className="action-button play-button">¡JUGAR BINGO!</button>
          </Link>
          <Link to="/wallet">
            <button className="action-button wallet-button">Ver Mi Billetera</button>
          </Link>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;