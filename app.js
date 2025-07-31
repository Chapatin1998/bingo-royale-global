import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
const firebaseConfig = { /* Pega tu configuración de Firebase aquí */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA PARA INDEX.HTML ---
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            document.getElementById('loader-screen').classList.remove('hidden');
            let progress = 0;
            const interval = setInterval(() => {
                progress++;
                if(progress > 100) progress = 100;
                document.getElementById('loader-bar').style.width = progress + '%';
                document.getElementById('loader-percentage').textContent = progress + '%';
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => window.location.href = 'login.html', 500);
                }
            }, 50);
        });
    }

    // --- LÓGICA PARA LOGIN.HTML ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const togglePassword = document.querySelector('.toggle-password');
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const passwordField = document.getElementById('password-field');
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
                .then(() => alert('¡Login Exitoso!'))
                .catch((error) => alert(error.message));
        });
    }
});
