// IMPORTANTE: Asegúrate de que las librerías de Firebase estén cargadas en tu lobby.html
// y que la aplicación de Firebase esté inicializada.
// Por ejemplo, si usas <script src="firebase-app.js"></script> y <script src="firebase-auth.js"></script>
// y <script src="firebase-firestore.js"></script> en lobby.html, y tu firebase-config.js inicializa la app:

// const auth = firebase.auth(); // Asumiendo que 'firebase' está globalmente disponible
// const db = firebase.firestore(); // Asumiendo que 'firebase' está globalmente disponible

document.addEventListener('DOMContentLoaded', async () => {
    const saldoActualElement = document.getElementById('saldo-actual-lobby');
    const userAvatarElement = document.getElementById('user-avatar');

    // --- Lógica de carga de usuario y saldo con Firebase (Descomentar y adaptar) ---
    // if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
    //     firebase.auth().onAuthStateChanged(async (user) => {
    //         if (user) {
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
    //             console.log("Usuario no logueado. Redirigiendo a index.html...");
    //             window.location.href = 'index.html'; // Redirigir si no hay sesión
    //         }
    //     });
    // } else {
        console.warn("Firebase no está inicializado o cargado. Usando valores de ejemplo.");
        saldoActualElement.textContent = `$150.00`; // Saldo de ejemplo
        userAvatarElement.src = 'avatar_default.png'; // Avatar de ejemplo
    // }
    // --- FIN Lógica de carga de usuario y saldo con Firebase ---


    // --- Lógica para seleccionar una sala ---
    // Esta función se hace global para que pueda ser llamada desde el onclick en el HTML
    window.seleccionarSala = async (salaId) => {
        const salaCard = document.getElementById(salaId);
        const costoCarton = parseFloat(salaCard.dataset.cost);
        const premioBingo = parseFloat(salaCard.dataset.prize); // Este es el premio base, no el 30% del bote final
        const salaName = salaCard.dataset.name;
        const minBalanceRequired = parseFloat(salaCard.dataset.minBalance);

        let saldoUsuario = parseFloat(saldoActualElement.textContent.replace('$', ''));

        if (saldoUsuario >= minBalanceRequired) {
            // Verificar si el usuario tiene suficiente saldo para el cartón (además del balance mínimo)
            if (saldoUsuario >= costoCarton) {
                // Simulación del descuento de saldo (esto debe ser seguro en Firebase/Backend)
                // Aquí solo se actualiza visualmente y se prepara para la redirección.
                // La actualización real del saldo en Firestore debe hacerse de forma segura
                // preferiblemente en una Cloud Function de Firebase.

                // await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
                //     balance: firebase.firestore.FieldValue.increment(-costoCarton)
                // });
                // saldoUsuario -= costoCarton; // Actualizar solo después de confirmación de Firebase
                // saldoActualElement.textContent = `$${saldoUsuario.toFixed(2)}`;

                alert(`¡Has entrado a la Sala ${salaName}! Costo: $${costoCarton.toFixed(2)}. Tu saldo será actualizado.`);

                // Redirigir a la página de juego, pasando la sala seleccionada
                // Usar localStorage para pasar la salaId es una opción simple para frontend
                localStorage.setItem('currentSalaId', salaId);
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
