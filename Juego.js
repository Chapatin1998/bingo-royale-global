// juego.js

// Asegúrate de que 'auth' y 'db' estén disponibles globalmente desde firebase-config.js
// como window.auth y window.db

document.addEventListener('DOMContentLoaded', async () => {
    // Elementos del DOM
    const salaActualDisplay = document.getElementById('sala-actual-display');
    const gameTimerDisplay = document.getElementById('game-timer');
    const locutorAvatar = document.getElementById('locutor-avatar');
    const numeroCantadoDisplay = document.getElementById('numero-cantado-display');
    const numerosCantadosGrid = document.getElementById('numeros-cantados-grid');
    const playerBingoCard = document.getElementById('player-bingo-card');
    const buyNewCardButton = document.getElementById('buyNewCardButton');
    const checkBingoButton = document.getElementById('checkBingoButton');

    // Variables del juego (simplificadas por ahora)
    const BINGO_NUMBERS = 75; // Números totales en el bingo (1-75)
    const BINGO_CARD_SIZE = 25; // Tamaño del cartón (5x5)
    let currentBingoCard = []; // El cartón del jugador
    let calledNumbers = []; // Números que ya han sido cantados
    let gameInterval; // Para el temporizador de llamado de números
    let currentBalance = 0; // Balance local del jugador
    let salaCosto = 0; // Costo de la sala
    let currentUserData = null; // Datos del usuario

    // --- Función para inicializar la página de juego ---
    async function initializeGamePage(user) { // Ahora acepta el objeto 'user'
        if (!user) { // Si por alguna razón se llama sin usuario (no debería si está en onAuthStateChanged)
            console.log("No user in initializeGamePage, redirecting.");
            window.location.href = 'index.html';
            return;
        }

        if (!window.auth || !window.db) {
            alert("Error: Firebase Auth o DB no están disponibles en juego.js.");
            window.location.href = 'index.html'; 
            return;
        }
        
        // Obtener la sala seleccionada desde localStorage (guardado en lobby.js)
        const currentSalaId = localStorage.getItem('currentSalaId');
        const currentSalaName = localStorage.getItem('currentSalaName');

        if (salaActualDisplay) {
            salaActualDisplay.textContent = `Sala: ${currentSalaName || 'Desconocida'}`;
        }

        // Cargar datos del usuario para balance y avatar
        try {
            const userRef = window.db.collection('users').doc(user.uid);
            const userSnap = await userRef.get();
            if (userSnap.exists) {
                currentUserData = userSnap.data();
                currentBalance = parseFloat(currentUserData.balance);
                // Si el avatar no es el default, actualizarlo
                if (locutorAvatar && currentUserData.avatar) {
                    locutorAvatar.src = currentUserData.avatar; // Usar el avatar del jugador como locutor temporalmente
                }
            } else {
                alert("Error: No se encontraron tus datos de usuario en Firestore.");
                window.location.href = 'lobby.html';
                return;
            }
        } catch (error) {
            console.error("Error al cargar datos de usuario en juego.js:", error);
            alert("Error al cargar datos de usuario. Volviendo al lobby.");
            window.location.href = 'lobby.html';
            return;
        }

        // Actualizar el costo del botón de compra de cartón
        // Asumimos que el costo ya fue deducido al entrar a la sala.
        // Este botón será para comprar un *nuevo* cartón si es que quieres esa funcionalidad después.
        if (buyNewCardButton) {
            const tempSalaCard = document.createElement('div'); // Crear un elemento temporal para leer dataset
            tempSalaCard.dataset.cost = localStorage.getItem('lastSalaCost') || '0'; // Recuperar el costo de la sala
            
            salaCosto = parseFloat(tempSalaCard.dataset.cost);
            buyNewCardButton.textContent = `COMPRAR CARTÓN ($${salaCosto.toFixed(2)})`;
            buyNewCardButton.disabled = false; // Habilitar compra de cartón
        }

        // Generar un nuevo cartón de bingo al iniciar la página de juego
        generateNewBingoCard();
    }

    // --- CAMBIO CLAVE: Observar el estado de autenticación ---
    // Esta es la forma correcta de esperar a que Firebase confirme si el usuario está logueado en esta página
    if (window.auth) {
        window.auth.onAuthStateChanged(user => {
            if (user) {
                // Usuario logueado: Inicializar la página del juego
                console.log("Usuario logueado en juego.html:", user.uid);
                initializeGamePage(user); // Pasamos el objeto user a la función
            } else {
                // No hay usuario logueado: Redirigir a la página de inicio
                console.log("Ningún usuario logueado en juego.html.");
                alert("Tu sesión ha expirado o no has iniciado sesión. Redirigiendo a inicio.");
                window.location.href = 'index.html';
            }
        });
    } else {
        // Firebase Auth no está disponible (error en firebase-config.js o carga de SDK)
        console.error("Firebase Auth no está disponible en juego.js. Asegúrate de que firebase-config.js y los SDK se carguen correctamente.");
        alert("Error crítico: El sistema de autenticación no está listo. Recarga la página.");
    }


    // --- Funciones del juego de Bingo ---

    // Genera un nuevo cartón de bingo (simplificado)
    function generateNewBingoCard() {
        if (!playerBingoCard) return;

        playerBingoCard.innerHTML = ''; // Limpiar cartón anterior
        currentBingoCard = [];
        calledNumbers = [];
        numerosCantadosGrid.innerHTML = ''; // Limpiar historial

        const allNumbers = Array.from({ length: BINGO_NUMBERS }, (_, i) => i + 1);
        const shuffledNumbers = allNumbers.sort(() => 0.5 - Math.random()).slice(0, BINGO_CARD_SIZE); // Seleccionar 25 números únicos
        
        // Simplemente asignamos los números al cartón
        for (let i = 0; i < BINGO_CARD_SIZE; i++) {
            const cell = document.createElement('div');
            cell.classList.add('bingo-cell');
            cell.textContent = shuffledNumbers[i];
            cell.dataset.number = shuffledNumbers[i]; // Guardar el número en el dataset
            cell.addEventListener('click', () => markNumberOnCard(cell)); // Marcar al hacer clic
            playerBingoCard.appendChild(cell);
            currentBingoCard.push({ number: shuffledNumbers[i], marked: false });
        }
        // Habilitar botón de BINGO si es necesario
        if (checkBingoButton) checkBingoButton.disabled = false;
        // Iniciar el llamado de números (por ahora automático)
        startGameRound(); 
    }

    // Marcar/desmarcar un número en el cartón por el jugador
    function markNumberOnCard(cell) {
        const number = parseInt(cell.dataset.number);
        const cardItem = currentBingoCard.find(item => item.number === number);

        if (cardItem) {
            // Solo permitir marcar si el número ha sido cantado
            if (calledNumbers.includes(number)) {
                cardItem.marked = !cardItem.marked; // Alternar marcado
                cell.classList.toggle('marked', cardItem.marked); // Añadir/quitar clase 'marked'
            } else {
                alert(`El número ${number} aún no ha sido cantado por el locutor.`);
            }
        }
    }

    // Iniciar la ronda de juego (locutor canta números)
    function startGameRound() {
        let numbersToCall = Array.from({ length: BINGO_NUMBERS }, (_, i) => i + 1); // Números del 1 al 75
        numbersToCall.sort(() => 0.5 - Math.random()); // Mezclar números

        let callIndex = 0;
        clearInterval(gameInterval); // Limpiar cualquier intervalo anterior

        gameInterval = setInterval(() => {
            if (callIndex < numbersToCall.length) {
                const number = numbersToCall[callIndex];
                calledNumbers.push(number); // Añadir al historial de cantados
                
                if (numeroCantadoDisplay) numeroCantadoDisplay.textContent = number;
                updateCalledNumbersGrid(number); // Actualizar visualmente el historial
                
                // Marcar automáticamente números en el cartón si coinciden (ejemplo simple)
                document.querySelectorAll('.bingo-cell').forEach(cell => {
                    if (parseInt(cell.dataset.number) === number) {
                        cell.classList.add('called'); // Clase para indicar que ha sido cantado
                    }
                });

                callIndex++;
            } else {
                clearInterval(gameInterval);
                alert("Todos los números han sido cantados. No hubo bingo :(");
            }
        }, 2000); // Canta un número cada 2 segundos
    }

    // Actualiza el historial de números cantados
    function updateCalledNumbersGrid(number) {
        if (!numerosCantadosGrid) return;
        const numDiv = document.createElement('div');
        numDiv.classList.add('called-number-item');
        numDiv.textContent = number;
        numerosCantadosGrid.appendChild(numDiv);
        // Opcional: Desplazarse al final para ver el último número
        numerosCantadosGrid.scrollTop = numerosCantadosGrid.scrollHeight;
    }

    // --- Lógica del botón COMPRAR CARTÓN (solo ejemplo) ---
    if (buyNewCardButton) {
        buyNewCardButton.addEventListener('click', () => {
            alert("Funcionalidad 'Comprar Nuevo Cartón' en desarrollo. Se descontará saldo.");
            generateNewBingoCard(); 
        });
    }

    // --- Lógica del botón ¡BINGO! ---
    if (checkBingoButton) {
        checkBingoButton.addEventListener('click', () => {
            const markedCells = document.querySelectorAll('.bingo-cell.marked').length;
            if (markedCells >= 5) { 
                alert("¡BINGO! 🎉 Verificando tu cartón...");
            } else {
                alert("Aún no tienes BINGO. ¡Sigue marcando!");
            }
        });
    }

    // NOTA: initializeGamePage() no se llama aquí directamente, sino desde onAuthStateChanged
});
