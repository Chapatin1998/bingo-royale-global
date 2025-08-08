import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
      <Routes>
            <Route path="/" element={<Welcome />} />
                  <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                            </Routes>
                              );
                              }

                              export default App;
                              