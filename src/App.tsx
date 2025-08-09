import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <>
      {/* La música ahora vive aquí, por encima de las rutas. Nunca se detendrá mientras naveguemos. */}
      <audio src="/audio/musica-fondo.mp3" autoPlay loop></audio>
      
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;