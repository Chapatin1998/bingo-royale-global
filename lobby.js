// IMPORTANTE: Asegúrate de que las librerías de Firebase estén cargadas en tu lobby.html
// y que la aplicación de Firebase esté inicializada.
// Por ejemplo, si usas <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
// y <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"></script>
// y <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"></script> en lobby.html,
// y tu firebase-config.js inicializa la app con: const app = firebase.initializeApp(firebaseConfig);

// Descomenta estas líneas si no estás usando un sistema de módulos
// const auth = firebase.auth(); 
// const db = firebase.firestore(); 

document.addEventListener('DOMContentLoaded', async () => {
    const saldoActualElement = document.getElementById('saldo-actual-lobby');
    const userAvatarElement = document.getElementById('user-avatar');

    // --- Lógica de carga de usuario y saldo con Firebase (DESCOMENTAR Y ADAPTAR PARA PRODUCCIÓN) ---
    // if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
    //     firebase.auth().onAuthStateChanged(async (user) => {
    //         if (user) {
    //             // Usuario logueado
    //             const userRef = firebase.firestore().doc("users", user.uid);
    //             try {
    //                 const userSnap = await userRef.get();
    //                 if (userSnap.exists()) {
    //                     const userData = userSnap.data();
    //                     saldoActualElement.textContent = `$${userData.balance.toFixed(2)}`;
    //                     userAvatarElement.src = userData.avatarUrl || 'avatar_default.png'; 
    //                 } else {
    //                     console.log("No hay datos de usuario en Firestore para el UID:", user.uid);
    //                     saldoActualElement.textContent = `$0.00`; 
    //                     userAvatarElement.src = 'avatar_default.png';
    //                 }
    //             } catch (error) {
    //                 console.error("Error al obtener datos del usuario:", error);
    //                 saldoActualElement.textContent = `$Error`;
    //                 userAvatarElement.src = 'avatar_default.png';
    //             }
    //         } else {
    //             // No hay usuario logueado, redirigir al login
    //             console.log("Usuario no logueado. Redirigiendo a index.html...");
    //             window.location.href = 'index.html'; 
    //         }
    //     });
    // } else {
        // --- TEMPORAL: Valores de ejemplo para desarrollo sin Firebase activo ---
        console.warn("Firebase no está inicializado o cargado. Usando valores de ejemplo.");
        saldoActualElement.textContent = `$150.00`; // Saldo de ejemplo
        userAvatarElement.src = 'avatar_default.png'; // Avatar de ejemplo
    // }
    // --- FIN Lógica de carga de usuario y saldo con Firebase ---


    // --- Lógica para seleccionar una sala (Descomentar y adaptar) ---
    // Esta función se hace global para que pueda ser llamada desde el onclick en el HTML
    window.seleccionarSala = async (salaId) => {
        const salaCard = document.getElementById(salaId);
        const costoCarton = parseFloat(salaCard.dataset.cost);
        const premioBingo = parseFloat(salaCard.dataset.prize); 
        const salaName = salaCard.dataset.name;
        const minBalanceRequired = parseFloat(salaCard.dataset.minBalance);

        let saldoUsuario = parseFloat(saldoActualElement.textContent.replace('$', ''));

        if (saldoUsuario >= minBalanceRequired) {
            if (saldoUsuario >= costoCarton) {
                // Lógica para descontar saldo y entrar a la sala. 
                // La actualización real del saldo en Firestore debe hacerse de forma SEGURA,
                // preferiblemente en una Cloud Function de Firebase o después de una validación.

                // Aquí solo se actualiza visualmente y se prepara para la redirección.
                // Si descomentas esto, el saldo se descontará visualmente:
                // saldoUsuario -= costoCarton; 
                // saldoActualElement.textContent = `$${saldoUsuario.toFixed(2)}`;

                alert(`¡Has entrado a la Sala ${salaName}! Costo: $${costoCarton.toFixed(2)}. Tu saldo será actualizado.`);

                // Redirigir a la página de juego, pasando la sala seleccionada
                localStorage.setItem('currentSalaId', salaId); // Guarda la sala seleccionada
                window.location.href = `juego.html`; // Redirige a la página de juego

            } else {
                alert(`Saldo insuficiente para comprar un cartón en la Sala ${salaName}. Necesitas $${costoCarton.toFixed(2)}.`);
            }
        } else {
             alert(`No cumples el balance mínimo para entrar a la Sala ${salaName}. Necesitas al menos $${minBalanceRequired.toFixed(2)}.`);
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
