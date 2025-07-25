// lobby.js

// Asegúrate de que 'auth' y 'db' estén disponibles globalmente desde firebase-config.js
// como window.auth y window.db
// Si no, necesitarías importarlos:
// import { auth, db } from './firebase-config.js';
// import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Referencias a elementos del DOM en el lobby.html
    const userBalanceSpan = document.getElementById('user-balance');
    const userAvatarImg = document.getElementById('user-avatar');
    const addFundsButton = document.getElementById('add-funds-button'); // Botón de añadir fondos
    const settingsButton = document.getElementById('settings-button'); // Botón de configuración

    // Función para actualizar la interfaz del balance y avatar
    async function updateLobbyUI() {
        if (!window.auth || !window.db) {
            console.error("Firebase Auth o DB no están disponibles en lobby.js.");
            alert("Error: No se pudieron cargar los datos del usuario. Recarga la página.");
            window.location.href = 'index.html'; // Redirigir a inicio si Firebase no está listo
            return;
        }

        const user = window.auth.currentUser;
        if (!user) {
            // No hay usuario logueado, redirigir a la página de inicio de sesión
            alert("No has iniciado sesión. Redirigiendo a la página de inicio.");
            window.location.href = 'index.html';
            return;
        }

        // Obtener datos del usuario desde Firestore
        try {
            const userRef = window.db.collection('users').doc(user.uid);
            const userSnap = await userRef.get();

            if (userSnap.exists) {
                const userData = userSnap.data();
                userBalanceSpan.textContent = `$${parseFloat(userData.balance).toFixed(2)}`; // Mostrar balance con 2 decimales
                if (userAvatarImg && userData.avatar) {
                    userAvatarImg.src = userData.avatar; // Actualizar imagen del avatar
                } else if (userAvatarImg) {
                    userAvatarImg.src = 'avatar_default.png'; // Asegurar un avatar por defecto
                }
            } else {
                console.warn("No se encontraron datos de usuario en Firestore.");
                alert("Error: No se encontraron tus datos. Recarga o contacta soporte.");
                window.location.href = 'index.html'; // O redirigir a un error page
            }
        } catch (error) {
            console.error("Error al obtener datos de usuario:", error);
            alert("Error al cargar tus datos. Por favor, recarga o contacta soporte.");
            window.location.href = 'index.html'; // En caso de error, volver al inicio
        }
    }

    // Llamar a la función para actualizar la UI del lobby al cargar la página
    updateLobbyUI();

    // Listener para cambios en el estado de autenticación (por si el usuario se desloguea, etc.)
    window.auth.onAuthStateChanged(user => {
        if (!user) {
            console.log("Usuario deslogueado o sesión expirada en lobby.");
            alert("Tu sesión ha expirado o has cerrado sesión. Vuelve a iniciar.");
            window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
        } else {
            // Si el usuario sigue logueado, actualiza la UI por si acaso
            updateLobbyUI(); 
        }
    });

    // Lógica para el botón de Añadir Fondos (ejemplo, solo una alerta)
    if (addFundsButton) {
        addFundsButton.addEventListener('click', () => {
            alert("Funcionalidad 'Añadir Fondos' en desarrollo. ¡Pronto podrás recargar tu balance!");
            // Aquí iría la lógica para procesar pagos o dar bonos
        });
    }

    // Lógica para el botón de Configuración (ejemplo, solo una alerta)
    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            alert("Funcionalidad 'Configuración' en desarrollo.");
            // Aquí iría la lógica para abrir la página de configuración
        });
    }
});

// --- Lógica de la Sala de Juego (Función global) ---
// Esta función será llamada desde los botones onclick del lobby.html
window.seleccionarSala = async (salaId) => {
    // console.log(`Seleccionada la sala: ${salaId}`);

    if (!window.auth || !window.db) {
        alert("Error de Firebase: No se puede seleccionar la sala. Recarga la página.");
        return;
    }

    const user = window.auth.currentUser;
    if (!user) {
        alert("Debes iniciar sesión para jugar. Redirigiendo a inicio.");
        window.location.href = 'index.html';
        return;
    }

    // Obtener la tarjeta de sala clickeada para extraer sus datos
    const salaCard = document.getElementById(salaId);
    if (!salaCard) {
        alert("Error: Sala no encontrada.");
        return;
    }

    const costoCarton = parseFloat(salaCard.dataset.cost);
    const minBalance = parseFloat(salaCard.dataset.minBalance);
    const salaName = salaCard.dataset.name;

    // Obtener el balance actual del usuario desde Firestore
    const userRef = window.db.collection('users').doc(user.uid);
    const userSnap = await userRef.get();
    let currentBalance = 0;

    if (userSnap.exists) {
        currentBalance = parseFloat(userSnap.data().balance);
    } else {
        alert("Error: No se pudo obtener tu balance actual.");
        return;
    }

    // Verificar si el usuario tiene balance suficiente
    if (currentBalance < minBalance) {
        alert(`Balance insuficiente. Necesitas $${minBalance.toFixed(2)} para jugar en la ${salaName}. Tu balance actual es $${currentBalance.toFixed(2)}`);
        return;
    }

    // Deducir el costo del cartón del balance (transacción segura en Firestore)
    try {
        await window.db.runTransaction(async (transaction) => {
            const sfDoc = await transaction.get(userRef);
            if (!sfDoc.exists) {
                throw "Documento de usuario no existe!";
            }

            const newBalance = parseFloat(sfDoc.data().balance) - costoCarton;
            if (newBalance < 0) {
                throw "Balance negativo inesperado. Operación cancelada.";
            }

            transaction.update(userRef, { balance: newBalance });
        });

        alert(`Has entrado a la Sala ${salaName}. Costo deducido: $${costoCarton.toFixed(2)}.`);
        // Guardar la sala seleccionada en localStorage para usarla en juego.html
        localStorage.setItem('currentSalaId', salaId);
        localStorage.setItem('currentSalaName', salaName);

        // Redirigir a la página de juego
        window.location.href = 'juego.html'; 

    } catch (error) {
        console.error("Error al actualizar balance o entrar a sala:", error);
        alert("Error al intentar entrar a la sala. Por favor, intenta de nuevo.");
    }
};
