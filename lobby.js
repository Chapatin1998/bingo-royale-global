// Asegúrate de que Firebase esté inicializado en tu firebase-config.js o directamente aquí
// Si usas módulos, descomenta las importaciones:
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Si no usas módulos, asegúrate de que las librerías de Firebase estén cargadas globalmente
// desde tu lobby.html (ej. <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"></script>)

document.addEventListener('DOMContentLoaded', async () => {
    const saldoActualElement = document.getElementById('saldo-actual-lobby');
    const userAvatarElement = document.getElementById('user-avatar');

    // --- Lógica de carga de usuario y saldo con Firebase ---
    // Asegúrate de que 'app' de Firebase esté inicializada globalmente o importada
    // const auth = getAuth(app); // Si usas módulos y 'app' está enlazada
    // const db = getFirestore(app); // Si usas módulos y 'app' está enlazada

    // onAuthStateChanged(auth, async (user) => {
    //     if (user) {
    //         // Usuario logueado
    //         const userRef = doc(db, "users", user.uid);
    //         try {
    //             const userSnap = await getDoc(userRef);
    //             if (userSnap.exists()) {
    //                 const userData = userSnap.data();
    //                 saldoActualElement.textContent = `$${userData.balance.toFixed(2)}`;
    //                 userAvatarElement.src = userData.avatarUrl || 'avatar_default.png'; // Usar avatar guardado
    //             } else {
    //                 console.log("No hay datos de usuario en Firestore para el UID:", user.uid);
    //                 saldoActualElement.textContent = `$0.00`; // Saldo por defecto
    //                 userAvatarElement.src = 'avatar_default.png';
    //             }
    //         } catch (error) {
    //             console.error("Error al obtener datos del usuario:", error);
    //             saldoActualElement.textContent = `$Error`;
    //             userAvatarElement.src = 'avatar_default.png';
    //         }
    //     } else {
    //         // No hay usuario logueado, redirigir al login o mostrar valores por defecto
    //         console.log("Usuario no logueado. Redirigiendo a index.html...");
    //         window.location.href = 'index.html'; // Redirigir al inicio de sesión
    //         // O mostrar un estado de no logueado:
    //         // saldoActualElement.textContent = `$0.00`;
    //         // userAvatarElement.src = 'avatar_default.png';
    //     }
    // });

    // --- TEMPORAL: Valores de ejemplo para desarrollo sin Firebase activo ---
    saldoActualElement.textContent = `$150.00`; // Saldo de ejemplo
    userAvatarElement.src = 'avatar_default.png'; // Avatar de ejemplo
    console.log("Usando valores de ejemplo para Saldo y Avatar (descomentar Firebase en producción).");
    // --- FIN TEMPORAL ---


    // --- Lógica para seleccionar una sala ---
    // Esta función se llama desde el onclick en el HTML de cada botón
    window.seleccionarSala = (salaId) => {
        const salaCard = document.getElementById(salaId);
        const costoCarton = parseFloat(salaCard.dataset.cost);
        const premioBingo = parseFloat(salaCard.dataset.prize);
        const salaName = salaCard.dataset.name;
        const minBalanceRequired = parseFloat(salaCard.dataset.minBalance); // Obtener balance mínimo

        let saldoUsuario = parseFloat(saldoActualElement.textContent.replace('$', ''));

        if (saldoUsuario >= minBalanceRequired) { // Verificar balance mínimo primero
            if (saldoUsuario >= costoCarton) {
                // Lógica para descontar saldo y entrar a la sala
                saldoUsuario -= costoCarton; // Esto es solo visual, el saldo real debe actualizarse en Firebase
                saldoActualElement.textContent = `$${saldoUsuario.toFixed(2)}`;

                alert(`¡Has entrado a la Sala ${salaName}! Costo: $${costoCarton.toFixed(2)}. Tu nuevo saldo es: $${saldoUsuario.toFixed(2)}. ¡Buena suerte!`);

                // Aquí deberías guardar el nuevo saldo en Firebase
                // Y luego redirigir a la página de juego, pasando la sala seleccionada
                // window.location.href = `juego.html?sala=${salaId}`;
                console.log(`Redirigiendo a juego.html para la ${salaName}...`);
                // En un entorno real, pasarías más datos de la sala o el jugador
                // Por ejemplo, usar localStorage o parámetros de URL para pasar salaId a juego.html
                // localStorage.setItem('currentSalaId', salaId);
                // window.location.href = 'juego.html';

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
            // Aquí iría la lógica para procesar pagos o dar bonos de prueba
        });
    }
});
