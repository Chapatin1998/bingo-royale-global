document.addEventListener('DOMContentLoaded', () => {
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userBalance = document.getElementById('userBalance');
    const logoutBtn = document.getElementById('logoutBtn');
    const musicaLobby = document.getElementById('musicaLobby');

    // Listener para el estado de autenticación de Firebase
    window.onAuthStateChanged(window.auth, async (user) => {
        if (user) {
            // Usuario está logueado
            console.log("Usuario logueado en lobby:", user.uid);
            
            // Cargar datos adicionales del usuario desde Firestore
            const userRef = window.doc(window.db, "users", user.uid);
            const docSnap = await window.getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                userName.textContent = userData.nombreCompleto || user.email; // Muestra nombre completo o email
                // Aquí, el saldo es un placeholder. Necesitarías añadirlo a Firestore si quieres que sea real.
                userBalance.innerHTML = `<i class="fas fa-dollar-sign"></i> 0.00`; // Placeholder, se actualizará con lógica de saldo
                userAvatar.src = userData.avatar || "https://via.placeholder.com/60/FFD700/000000?text=AV"; // URL real de avatar
            } else {
                console.log("No se encontraron datos adicionales del usuario en Firestore.");
                userName.textContent = user.email;
            }

            // Intentar reproducir música
            musicaLobby.play().catch(error => {
                console.log("Autoplay de música en lobby bloqueado:", error);
                // Si el autoplay es bloqueado, puedes mostrar un icono de volumen muteado
            });

        } else {
            // Usuario NO está logueado, redirigir a la página de inicio (login)
            console.log("Usuario no logueado, redirigiendo a index.html");
            window.location.href = 'index.html';
        }
    });

    // Lógica para el botón de cerrar sesión
    logoutBtn.addEventListener('click', async () => {
        try {
            await window.signOut(window.auth);
            alert("Has cerrado sesión.");
            window.location.href = 'index.html'; // Redirigir a la página de inicio/login
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("No se pudo cerrar sesión. Inténtalo de nuevo.");
        }
    });

    // Lógica para los botones del lobby (ejemplos)
    document.querySelectorAll('.lobby-btn').forEach(button => {
        button.addEventListener('click', () => {
            alert(`Hiciste clic en: ${button.textContent.trim()}`);
            // Aquí iría la lógica para cada botón:
            // - Redirigir a la tienda.html, niveles.html, etc.
            // - Abrir un modal para configuración.
            // - Iniciar el juego de Bingo si es el botón "Jugar".
        });
    });
});
