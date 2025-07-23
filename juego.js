// --- Variables Globales (o gestionadas en un objeto de estado) ---
let currentBingoCard = []; // Almacenará los números del cartón del jugador
let markedNumbers = new Set(); // Almacenará los números que el jugador ha marcado
let calledNumbers = new Set(); // Almacenará los números que el locutor ha cantado

const BINGO_ROWS = 5;
const BINGO_COLS = 5;

// --- Función para Generar un Nuevo Cartón (ejemplo simplificado) ---
function generateNewBingoCard() {
    // Esto es un ejemplo. La lógica real de bingo generaría cartones válidos.
    // Usaremos números aleatorios por ahora.
    currentBingoCard = [];
    const bingoGridElement = document.getElementById('bingo-grid');
    bingoGridElement.innerHTML = ''; // Limpiar cartón anterior

    for (let i = 0; i < BINGO_ROWS * BINGO_COLS; i++) {
        const number = Math.floor(Math.random() * 75) + 1; // Números del 1 al 75
        currentBingoCard.push(number);

        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.dataset.number = number; // Almacenar el número en el data-attribute
        cell.textContent = number;

        // Añadir evento de clic para marcar el número
        cell.addEventListener('click', () => markNumberOnCard(cell, number));
        bingoGridElement.appendChild(cell);
    }
    markedNumbers.clear(); // Reiniciar números marcados al obtener nuevo cartón
    console.log("Nuevo cartón generado:", currentBingoCard);
}

// --- Función para Marcar un Número en el Cartón ---
function markNumberOnCard(cellElement, number) {
    if (calledNumbers.has(number)) { // Solo se puede marcar si el número ya fue cantado
        cellElement.classList.toggle('marked'); // Alternar clase para visual de marcado
        if (markedNumbers.has(number)) {
            markedNumbers.delete(number);
        } else {
            markedNumbers.add(number);
        }
        console.log("Número marcado/desmarcado:", number);
        // Aquí podríamos llamar a una función para verificar si hay bingo
        // checkForBingo();
    } else {
        console.log("El número " + number + " aún no ha sido cantado.");
        // Opcional: mostrar un mensaje al usuario
    }
}

// --- Lógica del Locutor (simulada por ahora) ---
function callNextNumber() {
    // Esto se conectaría con la máquina de bingo y la lógica de juego real
    const nextNumber = Math.floor(Math.random() * 75) + 1; // Número aleatorio para simular
    calledNumbers.add(nextNumber);
    console.log("Número cantado por el locutor:", nextNumber);

    // Actualizar visualmente los números cantados en la interfaz (historial)
    // También resaltar los números en el cartón si el jugador los tiene
    highlightCalledNumberOnCard(nextNumber);

    // Habilitar botón de BINGO si es necesario
    document.getElementById('btn-bingo').disabled = false;
}

// --- Función para resaltar números cantados en el cartón del jugador ---
function highlightCalledNumberOnCard(number) {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach(cell => {
        if (parseInt(cell.dataset.number) === number) {
            cell.classList.add('called'); // Clase para indicar que fue cantado
        }
    });
}


// --- Lógica del Botón COMPRAR CARTÓN ---
document.getElementById('btn-comprar-carton').addEventListener('click', () => {
    // Aquí iría la lógica para descontar saldo, validar entrada a sala, etc.
    console.log("Comprando nuevo cartón...");
    generateNewBingoCard();
    // Iniciar la ronda de juego
    // setInterval(callNextNumber, 3000); // Ejemplo: cantar número cada 3 segundos
});

// --- Lógica del Botón BINGO ---
document.getElementById('btn-bingo').addEventListener('click', () => {
    console.log("¡Botón BINGO presionado!");
    checkForBingo(); // Llama a la función de verificación de bingo real
});

// --- Función de Verificación de Bingo (¡MUY simplificada!) ---
function checkForBingo() {
    // Lógica real de bingo:
    // 1. Verificar si el jugador tiene 5 números marcados en una línea (horizontal, vertical, diagonal).
    // 2. Verificar que TODOS esos números hayan sido cantados por el locutor (usando calledNumbers).
    // 3. Comunicarse con el backend (Firebase Functions o similar) para validar el bingo de forma segura.

    // Por ahora, solo una simulación:
    if (markedNumbers.size >= 5 && calledNumbers.size >= 5) { // Si hay al menos 5 marcados y 5 cantados
        alert("¡BINGO! (Verificación en progreso...)");
        console.log("Posible BINGO detectado. Números marcados:", Array.from(markedNumbers), "Números cantados:", Array.from(calledNumbers));
        // Aquí se detendría el juego, se validaría el bingo, se repartirían premios, etc.
    } else {
        alert("Aún no tienes BINGO. ¡Sigue jugando!");
    }
}

// --- Inicialización al cargar la página ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página de juego cargada. Lista para comprar cartón.");
    // Aquí podrías cargar el saldo del usuario desde Firebase
    // displayUserBalance();
});

// Nota: La lógica real de un juego de bingo es mucho más compleja,
// especialmente la generación de cartones únicos, la verificación de bingo segura
// y la gestión de múltiples jugadores y rondas. Esto es solo una base.
