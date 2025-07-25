// juego.js

// Asegúrate de que 'auth' y 'db' estén disponibles globalmente desde firebase-config.js
// Accederemos a ellos a través de window.auth y window.db

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

    // --- Inicialización al cargar la página ---
    async function initializeGamePage() {
        if (!window.auth || !window.db) {
            alert("Error: Firebase no está inicializado. Recarga la página.");
            window.location.href = 'index.html'; // Redirigir a inicio si Firebase no está listo
            return;
        }

        const user = window.auth.currentUser;
        if (!user) {
            alert("No has iniciado sesión. Redirigiendo a la página de inicio.");
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
                alert("Error: No se encontraron tus datos de usuario.");
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
            const salaCard = document.getElementById(currentSalaId);
            if (salaCard) {
                 salaCosto = parseFloat(salaCard.dataset.cost);
                 buyNewCardButton.textContent = `COMPRAR CARTÓN ($${salaCosto.toFixed(2)})`;
            } else {
                 buyNewCardButton.textContent = `COMPRAR CARTÓN (N/A)`;
            }
            buyNewCardButton.disabled = false; // Habilitar compra de cartón
        }

        // Generar un nuevo cartón de bingo al iniciar la página de juego
        generateNewBingoCard();
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
                // console.log(`Número ${number} marcado/desmarcado: ${cardItem.marked}`);
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
                // Aquí podrías reiniciar el juego o mostrar resultados
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
            // Aquí iría la lógica para descontar saldo y generar un nuevo cartón
            alert("Funcionalidad 'Comprar Nuevo Cartón' en desarrollo. Se descontará saldo.");
            generateNewBingoCard(); // Genera uno nuevo (sin descuento real por ahora)
        });
    }

    // --- Lógica del botón ¡BINGO! ---
    if (checkBingoButton) {
        checkBingoButton.addEventListener('click', () => {
            // Verificar si el usuario tiene un bingo (simplificado)
            // Esto es solo un ejemplo, la lógica de verificación real es compleja (filas, columnas, diagonales)
            const markedCells = document.querySelectorAll('.bingo-cell.marked').length;
            if (markedCells >= 5) { // Si hay al menos 5 marcados (ejemplo simple de bingo)
                alert("¡BINGO! 🎉 Verificando tu cartón...");
                // Aquí iría la lógica para verificar el bingo en el servidor
            } else {
                alert("Aún no tienes BINGO. ¡Sigue marcando!");
            }
        });
    }

    // Inicializar la página de juego al cargar
    initializeGamePage(); 
});
