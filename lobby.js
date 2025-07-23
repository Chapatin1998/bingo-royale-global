// lobby.js

// Asegúrate de que las librerías de Firebase estén cargadas en tu lobby.html
// y que la aplicación de Firebase esté inicializada.
// Las variables 'firebase.auth()' y 'firebase.firestore()' deberían estar disponibles globalmente
// si las cargaste con <script src="..."> y inicializaste la app en firebase-config.js.

document.addEventListener('DOMContentLoaded', async () => {
    const saldoActualElement = document.getElementById('saldo-actual-lobby');
    const userAvatarElement = document.getElementById('user-avatar');

    // --- Lógica de carga de usuario y saldo con Firebase (DESCOMENTAR Y ADAPTAR PARA PRODUCCIÓN) ---
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // Usuario logueado
                const userRef = firebase.firestore().collection("users").doc(user.uid); 
                try {
                    const userSnap = await userRef.get();
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        saldoActualElement.textContent = `$${userData.balance.toFixed(2)}`;
                        userAvatarElement.src = userData.avatarUrl || 'avatar_default.png'; 
                    } else {
                        console.log("No hay datos de usuario en Firestore para el UID:", user.uid);
                        saldoActualElement.textContent = `$0.00`; 
                        userAvatarElement.src = 'avatar_default.png';
                    }
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error);
                    saldoActualElement.textContent = `$Error`;
                    userAvatarElement.src = 'avatar_default.png';
                }
            } else {
                // No hay usuario logueado, redirigir al login
                console.log("Usuario no logueado. Redirigiendo a index.html...");
                window.location.href = 'index.html'; 
            }
        });
    } else {
        // --- TEMPORAL: Valores de ejemplo para desarrollo sin Firebase activo ---
        console.warn("Firebase no está inicializado o cargado. Usando valores de ejemplo para Saldo y Avatar.");
        saldoActualElement.textContent = `$150.00`; // Saldo de ejemplo
        userAvatarElement.src = 'avatar_default.png'; // Avatar de ejemplo
    }
    // --- FIN Lógica de carga de usuario y saldo con Firebase ---


    // --- Lógica para seleccionar una sala (Descomentar y adaptar para producción) ---
    // Esta función se hace global para que pueda ser llamada desde el onclick en el HTML
    window.seleccionarSala = async (salaId) => {
        const salaCard = document.getElementById(salaId);
        const costoCarton = parseFloat(salaCard.dataset.cost);
        const premioBingo = parseFloat(salaCard.dataset.prize); 
        const salaName = salaCard.dataset.name;
        const minBalanceRequired = parseFloat(salaCard.dataset.minBalance);

        let saldoUsuario = parseFloat(saldoActualElement.textContent.replace('$', ''));

        // Lógica de autenticación y saldo antes de permitir la entrada
        if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
            const user = firebase.auth().currentUser;
            const userRef = firebase.firestore().collection("users").doc(user.uid);

            if (saldoUsuario >= minBalanceRequired) {
                if (saldoUsuario >= costoCarton) {
                    // Actualiza el saldo en Firestore. Esto DEBE ser en una Cloud Function para seguridad.
                    // Esto es solo un ejemplo de frontend que DEBE ser validado por backend.
                    try {
                        // await userRef.update({
                        //     balance: firebase.firestore.FieldValue.increment(-costoCarton)
                        // });
                        // console.log("Saldo actualizado en Firebase (simulado).");

                        // Actualiza el saldo visualmente después de una simulación de éxito
                        // saldoUsuario -= costoCarton; 
                        // saldoActualElement.textContent = `$${saldoUsuario.toFixed(2)}`;

                        alert(`¡Has entrado a la Sala ${salaName}! Costo: $${costoCarton.toFixed(2)}. Tu saldo será actualizado.`);

                        // Redirigir a la página de juego, pasando la sala seleccionada
                        localStorage.setItem('currentSalaId', salaId); // Guarda la sala seleccionada
                        window.location.href = `juego.html`; // Redirige a la página de juego

                    } catch (error) {
                        console.error("Error al actualizar saldo:", error);
                        alert("Hubo un error al intentar entrar a la sala. Intenta de nuevo.");
                    }
                } else {
                    alert(`Saldo insuficiente para comprar un cartón en la Sala ${salaName}. Necesitas $${costoCarton.toFixed(2)}.`);
                }
            } else {
                 alert(`No cumples el balance mínimo para entrar a la Sala ${salaName}. Necesitas al menos $${minBalanceRequired.toFixed(2)}.`);
            }
        } else {
            alert("No estás logueado o Firebase no está configurado. Por favor, inicia sesión.");
            // window.location.href = 'index.html'; // Redirigir al inicio de sesión
        }
    };

    // Lógica para el botón de añadir fondos (si lo implementas)
    const addFundsButton = document.querySelector('.add-funds-button');
    if (addFundsButton) {
        addFundsButton.addEventListener('click', () => {
            alert("Funcionalidad para añadir fondos (monetización) en desarrollo.");
            // Aquí iría la lógica real para procesar pagos o dar bonos
        });
    }
});
