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
});
