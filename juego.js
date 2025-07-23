document.addEventListener('DOMContentLoaded', () => {
    const backToSelectionBtn = document.getElementById('backToSelectionBtn');
    const gameUserBalanceElement = document.getElementById('gameUserBalance');
    const currentRoomNameElement = document.getElementById('currentRoomName');
    const gameLocutorAvatar = document.getElementById('gameLocutorAvatar');
    const gameLocutorName = document.getElementById('gameLocutorName');
    const gameTimer = document.getElementById('gameTimer');
    const calledNumbersDisplay = document.getElementById('calledNumbersDisplay');
    const bingoCardElement = document.getElementById('bingoCard');
    const bingoButton = document.getElementById('bingoButton');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const playersList = document.getElementById('playersList');

    let currentUser = null;
    let currentUserData = null;
    let currentBingoCard = []; // Array para el cartón del jugador
    let calledNumbers = []; // Array de números ya cantados
    let gameInterval = null; // Para el temporizador del locutor/llamada de bola
    let bingoInterval = null; // Para el temporizador de "¡Bingo!"
    let roomLevelId = null; // Para guardar el ID de la sala actual

    // --- Funciones de Utilidad ---
    function generateBingoCard() {
        const card = {};
        const columns = { 'B': [], 'I': [], 'N': [], 'G': [], 'O': [] };
        
        // Generar números únicos para cada columna
        function generateUniqueNumbers(min, max, count) {
            const numbers = new Set();
            while (numbers.size < count) {
                numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
            }
            return Array.from(numbers).sort((a, b) => a - b);
        }

        columns['B'] = generateUniqueNumbers(1, 15, 5);
        columns['I'] = generateUniqueNumbers(16, 30, 5);
        columns['N'] = generateUniqueNumbers(31, 45, 5); // FREE space at N3
        columns['G'] = generateUniqueNumbers(46, 60, 5);
        columns['O'] = generateUniqueNumbers(61, 75, 5);

        // Crear la estructura de la tarjeta
        const cardNumbers = [];
        for (let i = 0; i < 5; i++) {
            cardNumbers.push(columns['B'][i]);
            cardNumbers.push(columns['I'][i]);
            cardNumbers.push(i === 2 ? 'FREE' : columns['N'][i]); // FREE space
            cardNumbers.push(columns['G'][i]);
            cardNumbers.push(columns['O'][i]);
        }
        return cardNumbers;
    }

    function renderBingoCard(cardNumbers) {
        bingoCardElement.innerHTML = '<div class="card-header">B I N G O</div>';
        cardNumbers.forEach((num, index) => {
            const cell = document.createElement('div');
            cell.classList.add('card-cell');
            if (num === 'FREE') {
                cell.classList.add('free');
                cell.textContent = 'FREE';
            } else {
                cell.textContent = num;
                cell.dataset.number = num;
                cell.addEventListener('click', () => markNumber(cell));
            }
            bingoCardElement.appendChild(cell);
        });
    }

    function markNumber(cell) {
        if (!cell.classList.contains('marked')) {
            const number = parseInt(cell.dataset.number);
            if (calledNumbers.includes(number)) {
                cell.classList.add('marked');
                console.log(`Número ${number} marcado.`);
                checkBingo(); // Verificar bingo después de marcar
            } else {
                alert(`El número ${number} aún no ha sido cantado.`);
            }
        }
    }

    function callNextNumber() {
        if (calledNumbers.length >= 75) {
            alert("Todas las bolas han sido cantadas. No hay ganadores.");
            clearInterval(gameInterval);
            return;
        }

        let newNumber;
        do {
            const letterIndex = Math.floor(Math.random() * 5);
            const letter = ['B', 'I', 'N', 'G', 'O'][letterIndex];
            let min, max;
            switch (letter) {
                case 'B': min = 1; max = 15; break;
                case 'I': min = 16; max = 30; break;
                case 'N': min = 31; max = 45; break;
                case 'G': min = 46; max = 60; break;
                case 'O': min = 61; max = 75; break;
            }
            newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            newNumber = letter + newNumber; // Ejemplo: B12, I25
        } while (calledNumbers.includes(newNumber));

        calledNumbers.push(newNumber);
        updateCalledNumbersDisplay();
        speakNumber(newNumber); // Locutor canta el número
        
        // Activar botón BINGO si no lo estaba
        bingoButton.disabled = false;
        startBingoTimer(); // Reiniciar/iniciar temporizador de bingo
    }

    function updateCalledNumbersDisplay() {
        calledNumbersDisplay.innerHTML = ''; // Limpiar
        calledNumbers.slice(-10).forEach(num => { // Mostrar las últimas 10 bolas
            const span = document.createElement('span');
            span.classList.add('called-ball');
            span.textContent = num;
            calledNumbersDisplay.appendChild(span);
        });
        calledNumbersDisplay.scrollLeft = calledNumbersDisplay.scrollWidth; // Desplazar al final
    }

    function speakNumber(number) {
        // Implementar voz del locutor aquí (requiere API de Text-to-Speech o archivos de audio)
        console.log(`Locutor canta: ¡${number}!`);
        // Simular sonido
        const utterance = new SpeechSynthesisUtterance(number);
        speechSynthesis.speak(utterance);
    }

    function startBingoTimer() {
        clearInterval(bingoInterval); // Reiniciar si ya estaba corriendo
        let timeLeft = 30;
        gameTimer.textContent = timeLeft;
        bingoInterval = setInterval(() => {
            timeLeft--;
            gameTimer.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(bingoInterval);
                bingoButton.disabled = true; // Deshabilitar el botón si el tiempo se agota
                console.log("Tiempo para BINGO agotado. Se canta la siguiente bola.");
                // callNextNumber(); // Cantar la siguiente bola automáticamente
            }
        }, 1000);
    }

    function checkBingo() {
        // Implementar lógica de verificación de BINGO aquí
        // Por ahora, es una simulación
        const markedCells = document.querySelectorAll('.card-cell.marked').length;
        if (markedCells >= 5) { // Si hay 5 números marcados (simulando una línea)
             bingoButton.disabled = false; // Asegurar que el botón esté activo si hay bingo potencial
        }

        // Más adelante: verificar todas las líneas, diagonales, full card
    }

    // --- Inicialización de la Página de Juego ---
    if (window.onAuthStateChanged && window.auth && window.db) {
        window.onAuthStateChanged(window.auth, async (user) => {
            if (user) {
                currentUser = user;
                try {
                    const userDocRef = window.doc(window.db, "users", user.uid);
                    const userDocSnap = await window.getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        currentUserData = userDocSnap.data();
                        gameUserBalanceElement.innerHTML = `<i class="fas fa-dollar-sign"></i> ${currentUserData.balance ? currentUserData.balance.toFixed(2) : '0.00'}`;
                        gameLocutorName.textContent = currentUserData.locutor || "Locutor VIP"; // Usar el locutor del usuario si existe
                        gameLocutorAvatar.src = currentUserData.locutorAvatarUrl || "https://via.placeholder.com/100/FFD700/000000?text=LOC"; // Avatar del locutor

                        // Generar y renderizar un cartón aleatorio para empezar
                        currentBingoCard = generateBingoCard();
                        renderBingoCard(currentBingoCard);
                        
                        // Simular inicio del juego: llamar primera bola
                        setTimeout(() => {
                            callNextNumber();
                            gameInterval = setInterval(callNextNumber, 15000); // Llamar nueva bola cada 15 segundos
                        }, 2000);

                    } else {
                        console.log("No se encontraron datos de usuario en Firestore.");
                        window.location.href = 'lobby.html'; // Redirigir si no hay datos
                    }
                } catch (error) {
                    console.error("Error al cargar datos de usuario en juego.html:", error);
                    alert("Error al cargar la partida. Redirigiendo al lobby.");
                    window.location.href = 'lobby.html';
                }
            } else {
                console.log("No hay usuario logueado, redirigiendo a index.html");
                window.location.href = 'index.html'; // Si no hay sesión, volver al login
            }
        });
    } else {
        console.error("Firebase no está inicializado correctamente en juego.js");
        alert("Error crítico de inicialización. Por favor, reinicia la aplicación.");
        window.location.href = 'index.html';
    }

    // --- Event Listeners ---
    if (backToSelectionBtn) {
        backToSelectionBtn.addEventListener('click', () => {
            clearInterval(gameInterval); // Detener el juego al salir
            clearInterval(bingoInterval);
            window.location.href = 'seleccion-juego.html';
        });
    }

    if (bingoButton) {
        bingoButton.addEventListener('click', () => {
            // Lógica para gritar BINGO
            alert("¡BINGOOOOOO! Verificando tu cartón...");
            clearInterval(gameInterval); // Detener el juego
            clearInterval(bingoInterval);
            // Aquí iría la lógica de verificación de premio
        });
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', () () => {
            const message = chatInput.value.trim();
            if (message) {
                const p = document.createElement('p');
                p.textContent = `Tú: ${message}`;
                chatMessages.appendChild(p);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al último mensaje
                // Aquí iría la lógica para enviar el mensaje a otros jugadores (Firestore, Realtime DB, Functions)
            }
        });
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                chatSendBtn.click();
            }
        });
    }
});
