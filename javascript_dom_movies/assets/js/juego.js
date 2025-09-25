const NMOVIES = 5;
const NELEMENTSPMOVIE = 3;

// --- Función para crear la baraja de elementos ---
const getElementsDeck = () => {
    let elementDeck = [];
    for (let i = 1; i <= NMOVIES; i++) {
        for (let j = 0; j < NELEMENTSPMOVIE; j++) {
            elementDeck.push(`0${i}C${j}`);
        }
    }
    elementDeck = _.shuffle(elementDeck);
    return elementDeck;
};

let elementDeck = getElementsDeck();
let currentMovie = "01M"; 

// --- Listeners y funcionalidad del botón Adivina (sin cambios) ---
document.getElementById('boton-adivina').addEventListener('click', () => {
    if (elementDeck.length === 0) return;
    const element = elementDeck.pop();
    const divElement = document.createElement('div');
    divElement.classList.add('elemento');
    const imgElement = document.createElement('img');
    imgElement.src = `assets/characters/${element}.jpg`;
    imgElement.classList.add('recurso');
    divElement.appendChild(imgElement);
    document.getElementById('elementos-pelicula').appendChild(divElement);
    initDragAndDrop();
});

// --- Drag & Drop (sin cambios) ---
function initDragAndDrop() {
    const draggables = document.querySelectorAll('#elementos-pelicula img');
    const slots = document.querySelectorAll('.slot-personaje');

    draggables.forEach(img => {
        img.setAttribute('draggable', 'true');
        img.setAttribute('id', img.src.split('/').pop().replace('.jpg', '')); 

        img.addEventListener('dragstart', (e) => {
            img.classList.add('dragging');
            e.dataTransfer.setData('text/plain', img.id);
        });

        img.addEventListener('dragend', () => {
            img.classList.remove('dragging');
        });
    });

    slots.forEach(slot => {
        slot.addEventListener('dragover', (e) => e.preventDefault());

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            const personajeId = e.dataTransfer.getData('text/plain');
            const personaje = document.getElementById(personajeId);
            if (slot.children.length === 0 && personaje) {
                slot.appendChild(personaje);
                // Validación sencilla
                if (personajeId.substring(0, 2) === currentMovie.substring(0, 2)) {
                    slot.style.border = '10px solid green';
                    slot.style.backgroundColor = "green";
                } else {
                    slot.style.border = '10px solid red';
                    slot.style.backgroundColor = "red";
                }
            }
        });
    });
}

// --- Nueva funcionalidad: Películas y reinicio de juego ---

let movieDeck = [];

function getMoviesDeck() {
    let deck = [];
    for (let i = 1; i <= NMOVIES; i++) {
        deck.push(`0${i}M`);
    }
    return _.shuffle(deck);
}

let currentMovieIndex = 0;
movieDeck = getMoviesDeck();
currentMovie = movieDeck[currentMovieIndex];

// Inicializar carátula al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const caratulaImg = document.querySelector('#pelicula-caratula img');
    caratulaImg.src = `assets/movies/${movieDeck[currentMovieIndex]}.jpg`;
    currentMovie = movieDeck[currentMovieIndex];
});

// Función para mostrar la siguiente película
function mostrarSiguientePelicula() {
    currentMovieIndex = (currentMovieIndex + 1) % movieDeck.length;
    currentMovie = movieDeck[currentMovieIndex]; 
    const caratulaImg = document.querySelector('#pelicula-caratula img');
    caratulaImg.src = `assets/movies/${currentMovie}.jpg`;
}

// Función para reiniciar juego
function reiniciarJuego() {
    movieDeck = getMoviesDeck();
    elementDeck = getElementsDeck();
    currentMovieIndex = 0;
    currentMovie = movieDeck[0];

    // Reset carátula
    const peliculaCaratula = document.querySelector('#pelicula-caratula img');
    peliculaCaratula.src = `assets/movies/${currentMovie}.jpg`;

    // Vaciar los elementos que están en "Adivina"
    const elementosDiv = document.getElementById('elementos-pelicula');
    elementosDiv.innerHTML = '';

    // Vaciar los slots de personajes (Drag & Drop)
    const slots = document.querySelectorAll('.slot-personaje');
    slots.forEach(slot => {
        slot.innerHTML = '';
        slot.style.border = '2px dashed #aaa'; // Restaurar estilo original
        slot.style.backgroundColor = '#f8f9fa';
    });
}


// Event listeners de los botones (funcionan desde el inicio)
document.getElementById("boton-mostrar-pelicula").addEventListener("click", () => {
    mostrarSiguientePelicula();
});

document.getElementById("boton-nuevo-juego").addEventListener("click", () => {
    reiniciarJuego();
});
