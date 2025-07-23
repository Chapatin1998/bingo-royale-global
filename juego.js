// juego.js

// Asegúrate de que las librerías de Firebase estén cargadas en tu juego.html
// y que la aplicación de Firebase esté inicializada.
// Las variables 'firebase.auth()' y 'firebase.firestore()' deberían estar disponibles globalmente.

// --- Variables Globales del Juego ---
let currentBingoCard = []; 
let markedNumbers = new Set(); 
let calledNumbers = new Set(); 
let gameInterval; 
let currentSalaId = ''; 

const BINGO_ROWS = 5;
const BINGO_COLS = 5;
const MAX_BINGO_NUMBER = 75; 

// --- Elementos del DOM ---
const gameSaldoActualElement = document.getElementById('game-saldo-actual');
const currentSalaNameElement = document.getElementById('current-sala-name');
const bingoGridElement = document.getElementById('bingo-grid');
const numeroCantadoDisplay = document.getElementById('numero-cantado');
const historialGrid = document.getElementById('historial-grid');
const btnComprarCarton = document.getElementById('btn-comprar-carton');
const btnBingo = document.getElementById('btn-bingo');

// --- Datos de las Salas (deben ser los mismos que en lobby.html) ---
const salasConfig = {
    'sala-1': { name: 'El Bajo Mundo', cost: 1, prize: 6.00, minBalance: 5, housePercent: 40, winnerPercent: 60 },
    'sala-2': { name: 'El Pueblo', cost: 5, prize: 23.50, minBalance: 25, housePercent: 47, winnerPercent: 53 },
    'sala-3': { name: 'La Competencia', cost: 25, prize: 112.50, minBalance: 125, housePercent: 55, winnerPercent: 45 },
    'sala-4': { name: 'Grandes Ligas', cost: 100, prize: 380.00, minBalance: 500, housePercent: 62, winnerPercent: 38 },
    'sala-5': { name: 'El Olimpo', cost: 500, prize: 1500.00, minBalance: 2500, housePercent: 70, winnerPercent: 30 }
    // Añade aquí los datos para las Mesas Finales cuando las implementes
};

// --- Función de Inicialización al Cargar la Página ---
document.addEventListener('DOMContentLoaded', async () => {
    // Obtener la sala actual desde localStorage (pasada desde lobby.js)
    currentSalaId = localStorage.getItem('currentSalaId') || 'sala-1'; 
    const salaData = salasConfig[currentSalaId];

    if (!salaData) {
        alert("Sala no válida. Redirigiendo al lobby.");
        window.location.href = 'lobby.html';
        return;
    }

    currentSalaNameElement.textContent = `Sala: ${salaData.name}`;
    btnComprarCarton.textContent = `COMPRAR CARTÓN ($${salaData.cost.toFixed(2)})`;

    // Cargar saldo y avatar del usuario (DESCOMENTAR PARA PRODUCCIÓN)
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userRef = firebase.firestore().collection("users").doc(user.uid); 
                try {
                    const userSnap = await userRef.get();
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        gameSaldoActualElement.textContent = `$${userData.balance.toFixed(2)}`;
                        // Aquí podrías cargar la imagen del locutor según la sala o el nivel
                        // document.getElementById('locutor-avatar').src = `ruta/al/locutor_${currentSalaId}.png`;
                        // O el avatar del jugador
                    }
                } catch (error) {
                    console.error("Error al obtener datos del usuario en juego.html:", error);
                }
            } else {
                window.location.href = 'index.html'; // Redirigir al login si no está logueado
            }
        });
    } else {
        // Valores de ejemplo para desarrollo sin Firebase
        gameSaldoActualElement.textContent = `$150.00`;
        numeroCantadoDisplay.textContent = '--';
    }

    // Event Listeners para botones
    btnComprarCarton.addEventListener('click', () => buyNewCard(salaData.cost));
    btnBingo.addEventListener('click', checkForBingo);

    resetGame(); 
});

// --- Funciones del Juego ---

function resetGame() {
    clearInterval(gameInterval); 
    currentBingoCard = [];
    markedNumbers.clear();
    calledNumbers.clear();
    bingoGridElement.innerHTML = '';
    historialGrid.innerHTML = '';
    numeroCantadoDisplay.textContent = '--';
    btnBingo.disabled = true;
    btnComprarCarton.disabled = false;
}

// Función para Comprar Cartón
async function buyNewCard(cost) {
    let currentBalance = parseFloat(gameSaldoActualElement.textContent.replace('$', ''));
    if (currentBalance < cost) {
        alert("Saldo insuficiente para comprar este cartón.");
        return;
    }

    // Lógica para descontar saldo de forma SEGURA (IDEALMENTE EN CLOUD FUNCTION DE FIREBASE)
    if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
        try {
            const userRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
            await userRef.update({
                balance: firebase.firestore.FieldValue.increment(-cost)
            });
            currentBalance -= cost; // Actualiza visualmente
            gameSaldoActualElement.textContent = `$${currentBalance.toFixed(2)}`;
        } catch (error) {
            console.error("Error al descontar saldo en Firebase:", error);
            alert("No se pudo comprar el cartón. Intenta de nuevo.");
            return;
        }
    } else {
        // Simulación de descuento sin Firebase (solo para desarrollo)
        currentBalance -= cost;
        gameSaldoActualElement.textContent = `$${currentBalance.toFixed(2)}`;
    }
    
    resetGame(); 
    generateNewBingoCard();
    btnComprarCarton.disabled = true; 
    startGameRound(); 
}

// Genera un cartón de bingo (simplificado, no asegura cartones únicos y válidos para bingo)
function generateNewBingoCard() {
    currentBingoCard = [];
    bingoGridElement.innerHTML = ''; 
    
    const allNumbers = Array.from({length: MAX_BINGO_NUMBER}, (_, i) => i + 1);
    const shuffledNumbers = allNumbers.sort(() => 0.5 - Math.random());
    const cardNumbers = shuffledNumbers.slice(0, BINGO_ROWS * BINGO_COLS); 

    // Nota: Un bingo real tiene reglas específicas para generar números por columna (B 1-15, I 16-30, etc.)
    // Y un espacio libre en el centro. Esto es una simplificación.

    cardNumbers.forEach(number => {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.dataset.number = number;
        cell.textContent = number;

        cell.addEventListener('click', () => markNumberOnCard(cell, number));
        bingoGridElement.appendChild(cell);
    });
}

// Inicia la ronda de juego (locutor canta números)
function startGameRound() {
    const numbersToCall = Array.from({length: MAX_BINGO_NUMBER}, (_, i) => i + 1);
    numbersToCall.sort(() => 0.5 - Math.random()); 

    let callIndex = 0;
    gameInterval = setInterval(() => {
        if (callIndex < numbersToCall.length) {
            const number = numbersToCall[callIndex++];
            callNumber(number);
        } else {
            clearInterval(gameInterval);
            alert("¡Todos los números han sido cantados! No hubo bingo en esta ronda.");
            btnComprarCarton.disabled = false; // Habilitar para nueva ronda
        }
    }, 2000); // Canta un número cada 2 segundos
}

// El locutor canta un número
function callNumber(number) {
    calledNumbers.add(number);
    numeroCantadoDisplay.textContent = number; 
    updateHistorial(number); 
    highlightCalledNumberOnCard(number); 
    btnBingo.disabled = false; // Habilita botón de BINGO
}

// Actualiza el historial de números cantados
function updateHistorial(number) {
    const numElement = document.createElement('div');
    numElement.classList.add('historial-num');
    numElement.textContent = number;
    historialGrid.prepend(numElement); 
    if (historialGrid.children.length > 20) { 
        historialGrid.removeChild(historialGrid.lastChild);
    }
}

// Resalta números cantados en el cartón del jugador
function highlightCalledNumberOnCard(number) {
    const cells = bingoGridElement.querySelectorAll('.bingo-cell');
    cells.forEach(cell => {
        if (parseInt(cell.dataset.number) === number) {
            cell.classList.add('called');
        }
    });
}

// Marcar/Desmarcar número en el cartón por el jugador
function markNumberOnCard(cellElement, number) {
    if (calledNumbers.has(number)) { 
        cellElement.classList.toggle('marked'); 
        if (markedNumbers.has(number)) {
            markedNumbers.delete(number);
        } else {
            markedNumbers.add(number);
        }
    } else {
        alert("¡Ese número aún no ha sido cantado por el locutor!");
    }
}

// Función de Verificación de Bingo (simplificada y de frontend - REQUIERE BACKEND SEGURO)
function checkForBingo() {
    // ESTA LÓGICA DE VERIFICACIÓN DE BINGO DEBE SER COMPLETA Y SEGURO EN EL BACKEND (Firebase Functions).
    // Aquí es solo una simulación.
    const cells = Array.from(bingoGridElement.querySelectorAll('.bingo-cell'));
    
    // Simplificación extrema: Si el jugador ha marcado 5 números y todos han sido cantados.
    // Esto NO verifica líneas, columnas o diagonales. Es solo un placeholder.
    let markedAndCalledCount = 0;
    markedNumbers.forEach(num => {
        if (calledNumbers.has(num)) {
            markedAndCalledCount++;
        }
    });

    if (markedAndCalledCount >= 5) { // Esto es solo un umbral básico
        // Aquí iría la lógica REAL de verificación de líneas (horizontal, vertical, diagonal)
        // y se confirmaría que los números pertenecen al cartón del jugador y fueron cantados.
        
        clearInterval(gameInterval); // Detener el canto de números
        alert("¡BINGO! Esperando verificación...");
        btnBingo.disabled = true;
        btnComprarCarton.disabled = false; // Habilitar para nueva ronda

        // Lógica para el premio (IDEALMENTE EN BACKEND DESPUÉS DE VALIDACIÓN SEGURA)
        // const salaData = salasConfig[currentSalaId];
        // const prizeAmount = (salaData.winnerPercent / 100) * (salaData.cost * 10); // Ejemplo si el bote es 10 cartones
        // alert(`¡Felicidades! Has ganado $${prizeAmount.toFixed(2)}!`);

        // Aquí se enviaría el bingo al backend (Cloud Function) para validación y reparto de premios
        // sendBingoToBackend(currentBingoCard, markedNumbers, calledNumbers, currentSalaId);
    } else {
        alert("Aún no tienes BINGO. ¡Sigue marcando!");
    }
}
