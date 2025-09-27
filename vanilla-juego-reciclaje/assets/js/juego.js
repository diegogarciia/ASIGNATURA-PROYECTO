const NCONTENEDORES = 3;
const NELEMENTSPCONTENEDOR = 3;

// --- Función para crear la baraja de elementos ---
const getElementsDeck = () => {
    let elementDeck = [];
    for (let i = 1; i <= NCONTENEDORES; i++) {
        for (let j = 0; j < NELEMENTSPCONTENEDOR; j++) {
            elementDeck.push(`0${i}E${j}`);
        }
    }
    elementDeck = _.shuffle(elementDeck);
    return elementDeck;
};

let elementDeck = getElementsDeck();

// --- función auxiliar para crear un elemento con la imagen ---
function createImageElement(element) {
  const divElement = document.createElement('div');
  divElement.classList.add('elemento');

  const imgElement = document.createElement('img');
  imgElement.classList.add('recurso');

  const tryExtensions = ["jpg", "jpeg", "png", "webp"];
  let found = false;

  for (let ext of tryExtensions) {
    let path = `assets/img-elementos-reciclar/${element}.${ext}`;
    const testImg = new Image();
    testImg.src = path;

    testImg.onload = () => {
      if (!found) {            // primera que cargue
        imgElement.src = path; // se asigna la ruta correcta
        divElement.appendChild(imgElement);
        found = true;
      }
    };
  }

  return divElement;
}

// --- Listeners y funcionalidad del botón Nuevo elemento para reciclar ---
document.getElementById('boton-nuevo-elemento-reciclar').addEventListener('click', () => {
  if (elementDeck.length === 0) return;
  const element = elementDeck.pop();

  const divElement = createImageElement(element);

  document.getElementById('elementos-para-reciclar').appendChild(divElement);
});