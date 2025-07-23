document.addEventListener('DOMContentLoaded', () => {
    const backToLobbyBtn = document.getElementById('backToLobbyBtn');
    const levelsGrid = document.getElementById('levelsGrid');
    const currentUserBalanceElement = document.getElementById('currentUserBalance');

    let currentUser = null;
    let currentUserData = null;

    // Datos de ejemplo para las salas/niveles
    // En un proyecto real, esto vendría de Firestore o una base de datos
    const gameLevels = [
        {
            id: 'sala-bronce',
            name: 'Sala Bronce',
            cost: 1.00,
            prize: 5.00,
            locutor: 'Hombre Básico',
            locutorAvatar: 'https://via.placeholder.com/50/8B4513/FFFFFF?text=HB', // Avatar de ejemplo
            description: 'Ideal para principiantes. ¡Gana tus primeras monedas!',
            styleClass: 'casino-clasico'
        },
        {
            id: 'sala-plata',
            name: 'Sala Plata',
            cost: 5.00,
            prize: 25.00,
            locutor: 'Mujer Básica',
            locutorAvatar: 'https://via.placeholder.com/50/FFC0CB/000000?text=MB',
            description: 'Un poco más de emoción y mayores premios.',
            styleClass: 'las-vegas'
        },
        {
            id: 'sala-oro',
            name: 'Sala Oro',
            cost: 20.00,
            prize: 100.00,
            locutor: 'Hombre Elegante',
            locutorAvatar: 'https://via.placeholder.com/50/DAA520/000000?text=HE',
            description: 'Para jugadores con experiencia. ¡Grandes apuestas, grandes ganancias!',
            styleClass: 'hollywood'
        },
        {
            id: 'sala-diamante',
            name: 'Sala Diamante',
            cost: 100.00,
            prize: 500.00,
            locutor: 'Mujer Glamour',
            locutorAvatar: 'https://via.placeholder.com/50/B9F2FF/000000?text=MG',
            description: '¡Solo para los VIP! El mayor desafío y el premio supremo.',
            styleClass: 'cibernetico'
        }
        // Puedes añadir más niveles aquí
    ];

    // Función para cargar los niveles en la cuadrícula
    function loadGameLevels() {
        levelsGrid.innerHTML = ''; // Limpiar cualquier contenido existente
        gameLevels.forEach(level => {
            const levelCard = document.createElement('div');
            levelCard.classList.add('level-card', level.styleClass); // Añade la clase de estilo
            levelCard.dataset.levelId = level.id; // Para identificar el nivel al hacer clic

            levelCard.innerHTML = `
                <div class="level-header">
                    <img src="${level.locutorAvatar}" alt="${level.locutor}" class="locutor-avatar">
                    <h3>${level.name}</h3>
                </div>
                <p>${level.description}</p>
                <p class="costo">Costo del Cartón: <i class="fas fa-dollar-sign"></i> ${level.cost.toFixed(2)}</p>
                <p class="premio">Premio por Bingo: <i class="fas fa-trophy"></i> ${level.prize.toFixed(2)}</p>
                <button class="play-level-btn"><i class="fas fa-play"></i> Jugar en esta Sala</button>
            `;
            levelsGrid.appendChild(levelCard);
        });

        // Añadir listeners a los botones de jugar después de que se cargan
        document.querySelectorAll('.play-level-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const levelId = event.target.closest('.level-card').dataset.levelId;
                playGame(levelId);
            });
        });
    }

    // Función para jugar (simulación)
    async function playGame(levelId) {
        if (!currentUser || !currentUserData) {
            alert('Debes iniciar sesión para jugar.');
            window.location.href = 'index.html';
            return;
        }

        const selectedLevel = gameLevels.find(level => level.id === levelId);

        if (!selectedLevel) {
            alert('Nivel de juego no encontrado.');
            return;
        }

        if (currentUserData.balance < selectedLevel.cost) {
            alert(`Saldo insuficiente. Necesitas $${selectedLevel.cost.toFixed(2)} para jugar en la ${selectedLevel.name}. Tu saldo actual es $${currentUserData.balance.toFixed(2)}.`);
            return;
        }

        // Simular la "compra" del cartón
        const newBalance = currentUserData.balance - selectedLevel.cost;

        try {
            const userDocRef = window.doc(window.db, "users", currentUser.uid);
            await window.updateDoc(userDocRef, {
                balance: newBalance
            });
            currentUserData.balance = newBalance; // Actualizar el balance localmente
            updateBalanceDisplay(newBalance); // Actualizar la UI

            alert(`¡Has entrado a la ${selectedLevel.name}! Costo: $${selectedLevel.cost.toFixed(2)}. Tu nuevo saldo es: $${newBalance.toFixed(2)}.`);
            console.log(`Usuario ${currentUser.email} entró a ${selectedLevel.name}. Nuevo balance: ${newBalance}`);
            
            // ¡NUEVA LÍNEA CLAVE! Redirige al juego.html
            window.location.href = `juego.html?level=${selectedLevel.id}`; 

        } catch (error) {
            console.error("Error al actualizar el balance:", error);
            alert('Ocurrió un error al intentar jugar. Por favor, inténtalo de nuevo.');
        }
    }

    // Función para actualizar el display del balance
    function updateBalanceDisplay(balance) {
        currentUserBalanceElement.innerHTML = `<i class="fas fa-dollar-sign"></i> ${balance ? balance.toFixed(2) : '0.00'}`;
    }

    // Escucha los cambios en el estado de autenticación de Firebase
    if (window.onAuthStateChanged && window.auth && window.db) {
        window.onAuthStateChanged(window.auth, async (user) => {
            if (user) {
                currentUser = user;
                console.log("Usuario logueado en seleccion-juego:", user.uid);
                try {
                    const userDocRef = window.doc(window.db, "users", user.uid);
                    const userDocSnap = await window.getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        currentUserData = userDocSnap.data();
                        updateBalanceDisplay(currentUserData.balance);
                    } else {
                        console.log("No se encontraron datos de usuario en Firestore.");
                        updateBalanceDisplay(0);
                    }
                    loadGameLevels(); // Cargar los niveles una vez que el usuario está autenticado
                } catch (error) {
                    console.error("Error al obtener datos de usuario de Firestore:", error);
                    updateBalanceDisplay(0);
                }
            } else {
                // No hay usuario logueado, redirigir a la página de inicio de sesión
                console.log("Usuario no logueado, redirigiendo a index.html");
                window.location.href = 'index.html';
            }
        });
    } else {
        console.error("Firebase no está inicializado correctamente o elementos esenciales faltan en seleccion-juego.html");
        window.location.href = 'index.html'; // Fallback seguro
    }

    // Botón para volver al Lobby
    if (backToLobbyBtn) {
        backToLobbyBtn.addEventListener('click', () => {
            window.location.href = 'lobby.html';
        });
    }
});
