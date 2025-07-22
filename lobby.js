// Asegúrate de que Firebase auth, db, onAuthStateChanged, signOut, doc, getDoc
// estén disponibles desde el módulo en lobby.html

document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.getElementById('userName');
    const userBalanceElement = document.getElementById('userBalance');
    const userAvatarElement = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');
    const musicaLobby = document.getElementById('musicaLobby'); // Asumiendo que el audio está en lobby.html

    // Escucha los cambios en el estado de autenticación de Firebase
    if (window.onAuthStateChanged && window.auth && window.db) {
        window.onAuthStateChanged(window.auth, async (user) => {
            if (user) {
                // Usuario logueado
                console.log("Usuario logueado en lobby:", user.uid);
                try {
                    // Obtener datos adicionales del usuario desde Firestore
                    const userDocRef = window.doc(window.db, "users", user.uid);
                    const userDocSnap = await window.getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        userNameElement.textContent = userData.nombreCompleto || user.email;
                        userBalanceElement.innerHTML = `<i class="fas fa-dollar-sign"></i> ${userData.balance ? userData.balance.toFixed(2) : '0.00'}`;
                        // Puedes actualizar el avatar si tienes URLs de imágenes en Firestore
                        // userAvatarElement.src = userData.avatarUrl || 'https://via.placeholder.com/60/FFD700/000000?text=AV';
                    } else {
                        console.log("No se encontraron datos de usuario en Firestore.");
                        userNameElement.textContent = user.email;
                        userBalanceElement.innerHTML = `<i class="fas fa-dollar-sign"></i> 0.00`;
                    }
                } catch (error) {
                    console.error("Error al obtener datos de usuario de Firestore:", error);
                    userNameElement.textContent = user.email;
                    userBalanceElement.innerHTML = `<i class="fas fa-dollar-sign"></i> 0.00`;
                }

                // Intentar reproducir música del lobby (puede ser bloqueado por el navegador)
                if (musicaLobby) {
                    musicaLobby.play().catch(error => {
                        console.log("Autoplay de música en lobby bloqueado:", error);
                        // Si el autoplay es bloqueado, puedes mostrar un icono de volumen muteado
                    });
                }


            } else {
                // No hay usuario logueado, redirigir a la página de inicio de sesión
                console.log("Usuario no logueado, redirigiendo a index.html");
                // alert("No has iniciado sesión o tu sesión ha expirado. Por favor, inicia sesión."); // Opcional
                window.location.href = 'index.html';
            }
        });
    } else {
        console.error("Firebase no está inicializado correctamente o elementos esenciales faltan en lobby.html");
        // alert("Error de inicialización. Por favor, recarga la página."); // Opcional
        // window.location.href = 'index.html'; // Fallback seguro
    }


    // Lógica para el botón de cerrar sesión
    if (logoutBtn && window.signOut && window.auth) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await window.signOut(window.auth);
                alert('Sesión cerrada exitosamente.');
                window.location.href = 'index.html'; // Redirige a la página de inicio
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
                alert('Ocurrió un error al cerrar sesión. Por favor, inténtalo de nuevo.');
            }
        });
    }

    // Lógica para el botón "Jugar" (principal)
    const playButton = document.querySelector('.lobby-btn.primary'); 
    if (playButton) {
        playButton.addEventListener('click', () => {
            window.location.href = 'seleccion-juego.html'; // Redirige a la nueva página de selección de juego
        });
    }

    // Lógica para otros botones del lobby (puedes añadir aquí más adelante)
    // Ejemplo:
    // const tiendaButton = document.querySelector('.lobby-btn:nth-child(2)'); // Selector si es el segundo botón
    // if (tiendaButton) {
    //     tiendaButton.addEventListener('click', () => {
    //         alert('Abriendo la Tienda...');
    //         // window.location.href = 'tienda.html';
    //     });
    // }
    // ... y así para los demás botones
});
