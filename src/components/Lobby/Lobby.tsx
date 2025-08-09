import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import './Lobby.css';

const Lobby = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // La redirección se manejará automáticamente por nuestro sistema de rutas
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
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Lobby;