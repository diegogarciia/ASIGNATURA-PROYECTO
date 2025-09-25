const NMOVIES = 5;
const NELEMENTSPMOVIE = 3;

const getElementsDeck = () => {
    let elementDeck = [];
    for(let i = 1; i <= NMOVIES; i++) {
        for(let j = 0; j < NELEMENTSPMOVIE; j++) {
            elementDeck.push(`0${i}C${j}`);
        }
    }
    elementDeck = _.shuffle(elementDeck);
    return elementDeck;
};

let elementDeck = getElementsDeck();
let currentMovie = "01M"; 

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

function initDragAndDrop() {
    // Selecciona todos los personajes actuales
    const draggables = document.querySelectorAll('#elementos-pelicula img');
    const slots = document.querySelectorAll('.slot-personaje');

    draggables.forEach(img => {
        img.setAttribute('draggable', 'true');
        img.setAttribute('id', img.src.split('/').pop().replace('.jpg', '')); // id = "01C0" etc.

        img.addEventListener('dragstart', (e) => {
            img.classList.add('dragging');
            e.dataTransfer.setData('text/plain', img.id);
        });

        img.addEventListener('dragend', () => {
            img.classList.remove('dragging');
        });
    });

    slots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            const personajeId = e.dataTransfer.getData('text/plain');
            const personaje = document.getElementById(personajeId);
            if (slot.children.length === 0 && personaje) {
                slot.appendChild(personaje);
                // Validación sencilla
                if (personajeId.substring(0, 2) === currentMovie.substring(0, 2)) {
                    slot.style.border = '10px solid green';
                    slot.style.backgroundColor = "green"
                } else {
                    slot.style.border = '10px solid red';
                    slot.style.backgroundColor = "red"
                }
            }
        });
    });
}