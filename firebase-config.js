const firebaseConfig = {

apiKey: "AIzaSyDREqTx0PpnRDmE4J-wQlYR1JkqaJvHI4Y",

authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",

projectId: "bingo-vip-bolivia-df2db",

storageBucket: "bingo-vip-bolivia-df2db.appspot.com",

messagingSenderId: "310290230955",

appId: "1:310290230955:web:3526c26c2800b43ffcd1ee",

measurementId: "G-VRR7JSHY5G"

};

// --- INICIALIZAR FIREBASE ---

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// --- Iconos (simulados para la demo) ---

const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg"

className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path

fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.002L2.084

5.051a.5.5 0 00-.424.582l.097.343A.5.5 0 002.343 6l.112-.032a.5.5 0

01.488.403l.058.291a.5.5 0 00.582.424l.343-.097a.5.5 0

00.424-.582L4.134 6.03a.5.5 0 01.403-.488l.291-.058a.5.5 0

00.424-.582l-.097-.343a.5.5 0 00-.582-.424L4.502 4.166A11.954 11.954 0

0110 1.944zM10 18.056a11.954 11.954 0 01-7.834-3.054l.082-.048a.5.5 0

00.424-.582l-.097-.343a.5.5 0 00-.582-.424l-.343.097a.5.5 0

00-.424.582l.097.343a.5.5 0 01-.403.488l-.291.058a.5.5 0

00-.424.582l.097.343a.5.5 0 00.582.424l.112-.032a.5.5 0

01.488.403l.058.291a.5.5 0 00.582.424l.343-.097a.5.5 0

00.424-.582L4.134 13.97a.5.5 0 01.403-.488l.291-.058a.5.5 0

00.424-.582l-.097-.343a.5.5 0 00-.582-.424L4.502 15.834A11.954 11.954

0 0110 18.056zM18.056 10a11.954 11.954 0 01-3.054

7.834l-.048-.082a.5.5 0 00-.582-.424l-.343.097a.5.5 0

00-.424.582l.343.097a.5.5 0 01.488.403l.058.291a.5.5 0
00.582.424l.097-.343a.5.5 0 00-.424-.582l-.032-.112a.5.5 0

01.403-.488l.291-.058a.5.5 0 00.582-.424l-.097-.343a.5.5 0

00-.424-.582l-.082.048A11.954 11.954 0 0118.056 10z"

clipRule="evenodd" /><path d="M10 4.5a5.5 5.5 0 100 11 5.5 5.5 0

000-11zM8 10a2 2 0 114 0 2 2 0 01-4 0z" /></svg>;

const PaperAirplaneIcon = () => <svg

xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20

20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7

14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1

1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>;

// --- Lógica y Utilidades del Juego ---

const BINGO_LETTERS = ['B', 'I', 'N', 'G', 'O'];

const generateCard = () => {

const card = { B: [], I: [], N: [], G: [], O: [] };

for (let i = 0; i < 5; i++) {

const letter = BINGO_LETTERS[i];

const min = i * 15 + 1;

const max = min + 14;

const column = new Set();

while (column.size < 5) {

column.add(Math.floor(Math.random() * (max - min + 1)) +

min);

}

card[letter] = Array.from(column);

}

card.N[2] = 'FREE';

return card;

};

// --- Componentes de la UI ---

const LoadingScreen = () => {

const [progress, setProgress] = useState(0);

useEffect(() => {

const timer = setInterval(() => setProgress(p => Math.min(p +

Math.random() * 10, 100)), 200);

return () => clearInterval(timer);

}, []);

return (

<div className="flex flex-col justify-center items-center

h-screen bg-gray-900 text-white" style={{ backgroundImage:

"url('https://www.transparenttextures.com/patterns/dark-denim-3.png')"

}}>

<h1 className="text-8xl font-bold text-yellow-400

tracking-widest" style={{ fontFamily: "'Teko', sans-serif",

textShadow: "0 0 15px #facc15" }}>BINGO VIP</h1>

<p className="text-slate-300 mb-6 -mt-2
00.582.424l.097-.343a.5.5 0 00-.424-.582l-.032-.112a.5.5 0

01.403-.488l.291-.058a.5.5 0 00.582-.424l-.097-.343a.5.5 0

00-.424-.582l-.082.048A11.954 11.954 0 0118.056 10z"

clipRule="evenodd" /><path d="M10 4.5a5.5 5.5 0 100 11 5.5 5.5 0

000-11zM8 10a2 2 0 114 0 2 2 0 01-4 0z" /></svg>;

const PaperAirplaneIcon = () => <svg

xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20

20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7

14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1

1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>;

// --- Lógica y Utilidades del Juego ---

const BINGO_LETTERS = ['B', 'I', 'N', 'G', 'O'];

const generateCard = () => {

const card = { B: [], I: [], N: [], G: [], O: [] };

for (let i = 0; i < 5; i++) {

const letter = BINGO_LETTERS[i];

const min = i * 15 + 1;

const max = min + 14;

const column = new Set();

while (column.size < 5) {

column.add(Math.floor(Math.random() * (max - min + 1)) +

min);

}

card[letter] = Array.from(column);

}

card.N[2] = 'FREE';

return card;

};

// --- Componentes de la UI ---

const LoadingScreen = () => {

const [progress, setProgress] = useState(0);

useEffect(() => {

const timer = setInterval(() => setProgress(p => Math.min(p +

Math.random() * 10, 100)), 200);

return () => clearInterval(timer);

}, []);

return (

<div className="flex flex-col justify-center items-center

h-screen bg-gray-900 text-white" style={{ backgroundImage:

"url('https://www.transparenttextures.com/patterns/dark-denim-3.png')"

}}>

<h1 className="text-8xl font-bold text-yellow-400

tracking-widest" style={{ fontFamily: "'Teko', sans-serif",

textShadow: "0 0 15px #facc15" }}>BINGO VIP</h1>

<p className="text-slate-300 mb-6 -mt-2
text-lg">BOLIVIA</p>

<div className="w-3/4 max-w-md bg-gray-700 rounded-full

h-4 border-2 border-yellow-600 overflow-hidden">

<div className="h-full rounded-full bg-gradient-to-r

from-yellow-500 to-yellow-300 transition-all duration-500 ease-linear"

style={{ width: `${progress}%` }}></div>

</div>

<p className="mt-4 text-yellow-500

font-semibold">{progress < 100 ? 'Cargando recursos...' : '¡La suerte

está servida!'}</p>

</div>

);

};

const LoginScreen = ({ onLogin }) => {

return (

<div className="flex flex-col justify-center items-center

h-screen p-4 bg-black">

<div className="absolute top-0 left-0 w-full h-full

overflow-hidden z-0">

<img

src="https://images.unsplash.com/photo-1523978504296-4c45a8821bab?q=80

&w=2070&auto=format&fit=crop" className="w-full h-full object-cover

filter brightness-50" alt="Fondo de casino" />

</div>

<div className="text-center z-10 animate-fade-in-up">

<h1 className="text-8xl md:text-9xl font-bold

text-yellow-400 tracking-widest" style={{ fontFamily: "'Teko',

sans-serif", textShadow: "0 0 20px rgba(250, 204, 21, 0.7)" }}>BINGO

VIP</h1>

<p className="text-slate-200 mb-10 -mt-4

text-xl">BOLIVIA</p>

<div className="space-y-4 w-64 mx-auto">

<button onClick={onLogin} className="w-full

bg-gradient-to-b from-yellow-400 to-yellow-600 text-gray-900 font-bold

py-3 rounded-lg text-xl border-b-4 border-yellow-800

hover:from-yellow-300 hover:to-yellow-500 transition-all transform

hover:scale-105">Iniciar Sesión</button>

<button className="w-full bg-transparent border-2

border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg text-xl

hover:bg-yellow-500 hover:text-gray-900 transition-colors">Crear

Cuenta</button>

</div>

<p className="mt-8 text-slate-400">Jugar como <a

href="#" onClick={onLogin} className="underline

hover:text-white">Invitado</a></p>

<p className="mt-12 text-xs text-green-400 font-bold

flex items-center justify-center gap-2"><ShieldCheckIcon /> Plataforma
protegida con Autenticación 2FA</p>

</div>

</div>

);

};

const LobbyScreen = ({ setScreen }) => {

const salas = [

{ nivel: 1, nombre: "Callejón Oscuro", entrada: 10, premio:

140, jugadores: "15/20", color: "text-red-500", bg: "bg-red-500/20",

borderColor: "hover:border-red-500", locked: false },

{ nivel: 2, nombre: "Bingo de Barrio", entrada: 20, premio:

260, jugadores: "10/20", color: "text-blue-400", bg: "bg-blue-400/20",

borderColor: "hover:border-blue-400", locked: true },

{ nivel: 3, nombre: "Neón Urbano", entrada: 34, premio: 408,

jugadores: "5/20", color: "text-pink-400", bg: "bg-pink-400/20",

borderColor: "hover:border-pink-400", locked: true },

];

return (

<div className="flex flex-col h-screen bg-gray-900 text-white"

style={{ backgroundImage:

"url('https://www.transparenttextures.com/patterns/asfalt-light.png')"

}}>

<header className="w-full bg-black/30 p-4 flex

justify-between items-center border-b-2 border-yellow-600">

<div className="flex items-center gap-3"><img

src="https://i.pravatar.cc/60?u=dardo" alt="Avatar de Dardo"

className="rounded-full border-2 border-yellow-400" /><div><h2

className="font-bold text-lg">Dardo</h2><p className="text-xs

text-slate-400">Nivel 1</p></div></div>

<div className="text-right"><p

className="text-green-400 font-bold text-xl">Bs 500.00</p><p

className="text-blue-400 text-sm">$ 71.84</p></div>

</header>

<main className="flex-1 overflow-y-auto p-4 md:p-6">

<h2 className="text-4xl text-yellow-400 mb-4" style={{

fontFamily: "'Teko', sans-serif" }}>SALAS DE JUEGO</h2>

<div className="grid grid-cols-1 md:grid-cols-2

lg:grid-cols-3 gap-4">

{salas.map(sala => (

<div key={sala.nivel} className={`bg-gray-800

rounded-lg p-4 border border-gray-700 transition-all duration-300

${sala.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer

transform hover:-translate-y-1 ' + sala.borderColor}`} onClick={() =>

!sala.locked && setScreen('game')}>

<div className="flex justify-between

items-center mb-2"><h3 className={`text-3xl ${sala.color}`} style={{

fontFamily: "'Teko', sans-serif" }}>{sala.nombre}</h3><span
className={`${sala.bg} ${sala.color.replace('text-', 'text-')} text-xs

font-bold px-2 py-1 rounded`}>NIVEL {sala.nivel}</span></div>

<p className="text-sm text-slate-400 mb-4

h-10">{sala.locked ? `Bloqueado hasta Nivel ${sala.nivel}` : 'Elige tu

mesa: 2, 5, 10 o 20 jugadores.'}</p>

<div className="flex justify-between

text-center"><div><p className="text-xs text-slate-500">ENTRADA

DESDE</p><p className="font-bold text-lg">Bs

{sala.entrada}</p></div><div><p className="text-xs

text-slate-500">PREMIO HASTA</p><p className="font-bold text-lg

text-yellow-400">Bs {sala.premio}</p></div><div><p className="text-xs

text-slate-500">JUGADORES</p><p className="font-bold

text-lg">{sala.jugadores}</p></div></div>

</div>

))}

</div>

</main>

<footer className="bg-black/30 p-2 flex justify-around"

style={{ fontFamily: "'Teko', sans-serif" }}>

<button className="text-2xl text-yellow-500 border-b-2

border-yellow-500 px-3">LOBBY</button>

<button className="text-2xl text-slate-500

hover:text-yellow-500 transition-colors">TIENDA</button>

<button className="text-2xl text-slate-500

hover:text-yellow-500 transition-colors">BILLETERA</button>

<button className="text-2xl text-slate-500

hover:text-yellow-500 transition-colors">SOPORTE</button>

</footer>

</div>

);

};

// --- Componente: Sala de Juego (La Experiencia Definitiva) ---

const GameScreen = ({ setScreen }) => {

const [card] = useState(generateCard());

const [markedNumbers, setMarkedNumbers] = useState(new

Set(['FREE']));

const [isBingo, setIsBingo] = useState(false);

const [isDrawing, setIsDrawing] = useState(false);

const [gameState, setGameState] = useState({

calledNumbers: [],

currentNumber: null,

players: [{name: 'Rival01'}, {name: 'JugadorX'}, {name:

'La_Suerte'}],

chat: [{ user: 'System', text: '¡Bienvenidos al Callejón

Oscuro!' }],

status: 'playing',

winner: null
});

const synth = useRef(window.speechSynthesis);

const gameId = "callejon_oscuro_1"; // ID de la sala de juego

useEffect(() => {

const gameDocRef = doc(db, "games", gameId);

const unsubscribe = onSnapshot(gameDocRef, (doc) => {

if (doc.exists()) {

const data = doc.data();

if (data.currentNumber && data.currentNumber.number

!== gameState.currentNumber?.number) {

setIsDrawing(true);

speak(`${data.currentNumber.letter}.

${data.currentNumber.number}`);

setTimeout(() => setIsDrawing(false), 1500);

}

setGameState(data);

} else {

console.log("Creando sala de juego por primera

vez...");

setDoc(gameDocRef, {

calledNumbers: [], currentNumber: null, players:

[{name: 'Rival01'}, {name: 'JugadorX'}, {name: 'La_Suerte'}],

chat: [{ user: 'System', text: '¡Bienvenidos al

Callejón Oscuro!' }], status: 'playing', winner: null

});

}

});

return () => unsubscribe();

}, [gameId, gameState.currentNumber]);

const speak = (text, pitch = 0.8, rate = 0.9) => {

if (synth.current && 'speechSynthesis' in window) {

const utterance = new SpeechSynthesisUtterance(text);

const voices = synth.current.getVoices();

const spanishVoice = voices.find(v =>

v.lang.startsWith('es-')) || voices[0];

utterance.voice = spanishVoice;

utterance.lang = 'es-ES';

utterance.pitch = pitch;

utterance.rate = rate;

synth.current.speak(utterance);

}

};

const flatCard = useMemo(() => BINGO_LETTERS.flatMap(letter =>

card[letter]), [card]);
const checkBingo = useCallback(() => {

const markedIndices = flatCard.map(num =>

markedNumbers.has(num));

const lines = [

[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14],

[15, 16, 17, 18, 19], [20, 21, 22, 23, 24],

[0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17,

22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],

[0, 6, 12, 18, 24], [4, 8, 12, 16, 20]

];

for (const line of lines) {

if (line.every(index => markedIndices[index])) {

setIsBingo(true);

return;

}

}

setIsBingo(false);

}, [flatCard, markedNumbers]);

const handleCellClick = (num) => {

if (gameState.status !== 'playing' || num === 'FREE' ||

!gameState.calledNumbers.includes(num)) return;

const newMarkedNumbers = new Set(markedNumbers);

if (newMarkedNumbers.has(num)) {

newMarkedNumbers.delete(num);

} else {

newMarkedNumbers.add(num);

}

setMarkedNumbers(newMarkedNumbers);

checkBingo();

};

const handleBingoClick = async () => {

if (isBingo) {

const gameDocRef = doc(db, "games", gameId);

await updateDoc(gameDocRef, {

status: 'finished',

winner: 'Dardo'

});

speak("¡Bingo! ¡Tenemos un ganador! Revisando el

cartón...");

}

};

const handleSendMessage = async (e) => {

e.preventDefault();

const message = e.target.elements.message.value;
if (message.trim() === '') return;

const gameDocRef = doc(db, "games", gameId);

await updateDoc(gameDocRef, {

chat: arrayUnion({ user: 'Dardo', text: message,

timestamp: new Date() })

});

e.target.reset();

};

return (

<div className="relative flex flex-col h-screen bg-black

text-white overflow-hidden">

<div className="absolute inset-0 z-0">

<img

src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80

&w=1974&auto=format&fit=crop" alt="Fondo de un bar de mala muerte"

className="w-full h-full object-cover filter brightness-50" />

</div>

<div className="absolute inset-0 z-10 flex items-center

justify-center pointer-events-none">

<div className="absolute bottom-0 w-full max-w-2xl

h-full">

<img

src="https://placehold.co/800x1200/000000/333333?text=AVATAR+REALISTA%

0AEL+OSCURO" alt="Locutor El Oscuro realista" className="w-full h-full

object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.9)]"/>

</div>

<div className="absolute bottom-1/4 left-1/4 w-48

h-48">

<img

src="https://placehold.co/400x400/000000/333333?text=BOMBO" alt="Bombo

de Bingo" className={`w-full h-full object-contain filter

drop-shadow-lg ${isDrawing ? 'animate-shake' : ''}`}/>

</div>

<div className={`absolute bottom-1/3 left-1/2

-translate-x-1/2 transition-all duration-500 ${isDrawing ?

'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>

<div className="w-32 h-32 rounded-full

bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center

justify-center shadow-2xl shadow-yellow-500/50 animate-reveal">

<div className="text-6xl font-bold

text-gray-900" style={{ fontFamily: "'Teko', sans-serif" }}>

{gameState.currentNumber ?

`${gameState.currentNumber.letter}${gameState.currentNumber.number}` :

''}

</div>
</div>

</div>

</div>

<div className="relative z-20 flex flex-col h-full p-4">

<header className="flex justify-between items-start

opacity-90">

<div className="w-1/4 max-w-xs bg-black/50

backdrop-blur-sm p-3 rounded-lg border border-gray-700">

<h3 className="text-center font-bold

text-yellow-400 mb-2">JUGADORES</h3>

<div className="space-y-2">

{gameState.players.map(p => (

<div key={p.name} className="flex

items-center gap-2 bg-gray-900/50 p-1 rounded">

<img

src={`https://i.pravatar.cc/40?u=${p.name}`} alt={p.name}

className="w-8 h-8 rounded-full" />

<span className="text-sm

font-semibold">{p.name}</span>

</div>

))}

</div>

</div>

<div className="w-1/4 max-w-xs bg-black/50

backdrop-blur-sm p-3 rounded-lg border border-gray-700 flex flex-col

h-64">

<h3 className="text-center font-bold

text-yellow-400 mb-2">CHAT DE SALA</h3>

<div className="flex-grow bg-gray-900/50 p-2

rounded space-y-2 overflow-y-auto mb-2">

{gameState.chat.map((msg, i) => (

<div key={i} className="text-sm">

<span className={`font-bold

${msg.user === 'System' ? 'text-yellow-400' :

'text-blue-400'}`}>{msg.user}: </span>

<span

className="text-gray-300">{msg.text}</span>

</div>

))}

</div>

<form onSubmit={handleSendMessage}

className="flex gap-2">

<input name="message" type="text"

placeholder="Escribe..." className="flex-grow bg-gray-900 border

border-gray-600 rounded px-2 py-1 text-sm focus:outline-none

focus:border-yellow-500"/>

<button type="submit"
className="bg-yellow-600 hover:bg-yellow-500 p-2

rounded"><PaperAirplaneIcon /></button>

</form>

</div>

</header>

<main className="flex-grow flex items-end

justify-center pb-8">

<div className="flex flex-col items-center">

<div className="bg-black/40 backdrop-blur-sm

p-2 md:p-4 rounded-xl border-2 border-slate-700/50 shadow-2xl"

style={{backgroundImage:

"url('https://www.transparenttextures.com/patterns/dollar.png')"}}>

<div className="grid grid-cols-5 gap-1

md:gap-2">

{BINGO_LETTERS.map(letter => <div

key={letter} className="w-14 h-14 md:w-16 md:h-16 flex items-center

justify-center text-3xl font-bold text-yellow-400" style={{

fontFamily: "'Teko', sans-serif", textShadow: "1px 1px 2px #000"

}}>{letter}</div>)}

{flatCard.map((num, index) => (

<div key={index}

onClick={() =>

handleCellClick(num)}

className={`w-14 h-14 md:w-16

md:h-16 flex items-center justify-center text-2xl font-bold rounded-md

transition-all duration-200 relative overflow-hidden border

border-gray-700

${num !== 'FREE' &&

'cursor-pointer'}

${markedNumbers.has(num) ?

'text-gray-900' : 'text-white bg-gray-800/60'}

${gameState.calledNumbers.includes(num) && !markedNumbers.has(num) ?

'animate-pulse border-2 border-yellow-400' : ''}

`}>

{markedNumbers.has(num) && (

<div className="absolute

inset-0 flex items-center justify-center animate-stamp-in">

<img

src="https://placehold.co/100x100/ffcc00/000000?text=SELLO" alt="Sello

dorado" className="w-full h-full object-cover opacity-90"/>

<span

className="absolute transform text-shadow-lg text-gray-900">{num ===

'FREE' ? '★' : num}</span>

</div>

)}

<span

className="relative">{num === 'FREE' ? '★' : num}</span>
</div>

))}

</div>

</div>

<div className="w-full max-w-md text-center

pt-4">

{gameState.status === 'finished' ? (

<p className="text-5xl font-bold

text-green-400 animate-bounce" style={{ fontFamily: "'Teko',

sans-serif" }}>¡GANADOR: {gameState.winner}!</p>

) : (

<button onClick={handleBingoClick}

disabled={!isBingo} className={`w-full py-4 text-4xl font-bold

rounded-lg transition-all ${isBingo ? 'bg-green-500 text-white

animate-pulse shadow-lg shadow-green-500/50' : 'bg-gray-700

text-gray-500 cursor-not-allowed'}`} style={{ fontFamily: "'Teko',

sans-serif" }}>

¡BINGO!

</button>

)}

<button onClick={() => setScreen('lobby')}

className="mt-4 text-sm text-red-500 hover:text-red-400">Salir de la

Partida</button>

</div>

</div>

</main>

</div>

<style>{`

@keyframes stamp-in { 0% { transform: scale(1.5);

opacity: 0; } 100% { transform: scale(1); opacity: 0.9; } }

.animate-stamp-in { animation: stamp-in 0.3s ease-out

forwards; }

@keyframes shake { 0%, 100% { transform: rotate(0deg);

} 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }

.animate-shake { animation: shake 0.5s ease-in-out

infinite; }

@keyframes reveal { 0% { transform: translateY(50px)

scale(0.5); opacity: 0; } 80% { transform: translateY(-10px)

scale(1.1); opacity: 1; } 100% { transform: translateY(0) scale(1);

opacity: 1; } }

.animate-reveal { animation: reveal 0.8s

cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

`}</style>

</div>

);

};

// --- Componente Principal de la Aplicación
export default function App() {

const [screen, setScreen] = useState('loading'); // 'loading',

'login', 'lobby', 'game'

useEffect(() => {

const loadingTimer = setTimeout(() => setScreen('login'),

4000);

return () => clearTimeout(loadingTimer);

}, []);

const renderScreen = () => {

switch (screen) {

case 'loading': return <LoadingScreen />;

case 'login': return <LoginScreen onLogin={() =>

setScreen('lobby')} />;

case 'lobby': return <LobbyScreen setScreen={setScreen}

/>;

case 'game': return <GameScreen setScreen={setScreen} />;

default: return <LoadingScreen />;

}

};

return <div className="h-screen w-screen

bg-black">{renderScreen()}</div>;
