// Asegúrate de que Firebase auth, db, onAuthStateChanged, signOut, doc, getDoc
// estén disponibles desde el módulo en lobby.html

document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.getElementById('userName');
    const userBalanceElement = document.getElementById('userBalance');
    const userAvatarElement = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');

    // Escucha los cambios en el estado de autenticación
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
            } else {
                // No hay usuario logueado, redirigir a la página de inicio de sesión
                console.log("No hay usuario logueado, redirigiendo a index.html");
                window.location.href = 'index.html';
            }
        });
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

    // Lógica para los botones del lobby (ejemplo)
    const lobbyButtons = document.querySelectorAll('.lobby-btn');
    lobbyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Puedes añadir lógica específica para cada botón aquí
            // Por ejemplo: alert(`Hiciste clic en ${button.textContent.trim()}`);
        });
    });
});
