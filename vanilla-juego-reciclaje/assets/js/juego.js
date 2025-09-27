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

let score = 0;

// --- función auxiliar para crear un elemento con la imagen ---
function createImageElement(element) {
  const divElement = document.createElement('div');
  divElement.classList.add('elemento');

  const imgElement = document.createElement('img');
  imgElement.classList.add('recurso');
  imgElement.id = element;
  imgElement.dataset.tipo = element[1]; // 01E0 -> tipo 1, 02E1 -> tipo 2, etc.

  const tryExtensions = ["jpg", "jpeg", "png", "webp"];
  let found = false;

  for (let ext of tryExtensions) {
    let path = `assets/img-elementos-reciclar/${element}.${ext}`;
    const testImg = new Image();
    testImg.src = path;

    testImg.onload = () => {
      if (!found) {
        imgElement.src = path; 
        divElement.appendChild(imgElement);
        found = true;
        initDragAndDrop(imgElement); // inicializamos drag & drop solo para esta imagen
      }
    };
  }

  return divElement;
}

// --- Drag & Drop (sin cambios) ---
function initDragAndDrop(imgElement) {
    imgElement.setAttribute('draggable', 'true');

    imgElement.addEventListener('dragstart', e => {
        e.dataTransfer.setData('id', imgElement.id);
    });

    const slots = document.querySelectorAll('.slot-contenedores');
    slots.forEach(slot => {
        slot.addEventListener('dragover', e => e.preventDefault());

        slot.addEventListener('drop', e => {
            e.preventDefault();
            const imgId = e.dataTransfer.getData('id');
            const elemento = document.getElementById(imgId);
            if (!elemento) return;

            if (elemento.dataset.tipo === slot.dataset.tipo) {
                score += 10;
                document.getElementById('puntos').innerText = score;

                // Eliminamos la imagen y el slot del contenedor de elementos
                const parentDiv = elemento.parentElement; // el div "elemento"
                if (parentDiv) parentDiv.remove();

                // Marcamos el contenedor de reciclaje
                slot.style.border = '10px solid green';
                slot.style.backgroundColor = "green";

            } else {
                slot.style.border = '10px solid red';
                slot.style.backgroundColor = "red";
            }
        });
    });
}

function createImageElement(element) {
  const divElement = document.createElement('div');
  divElement.classList.add('elemento');

  const imgElement = document.createElement('img');
  imgElement.classList.add('recurso');
  imgElement.id = element;                  // le damos un id único
  imgElement.dataset.tipo = element[1];     // 01E0 -> tipo 1, 02E1 -> tipo 2, etc.

  const tryExtensions = ["jpg", "jpeg", "png", "webp"];
  let found = false;

  for (let ext of tryExtensions) {
    let path = `assets/img-elementos-reciclar/${element}.${ext}`;
    const testImg = new Image();
    testImg.src = path;

    testImg.onload = () => {
      if (!found) {
        imgElement.src = path; 
        divElement.appendChild(imgElement);
        found = true;
        initDragAndDrop(imgElement); // inicializamos drag & drop solo para esta imagen
      }
    };
  }

  return divElement;
}

// --- Listeners y funcionalidad del botón Nuevo juego ---
document.getElementById('boton-nuevo-juego').addEventListener('click', () => {
    // Reiniciar mazo
    elementDeck = getElementsDeck();

    // Reiniciar puntos
    score = 0;
    document.getElementById('puntos').innerText = score;

    // Vaciar los elementos en el área de reciclaje
    const elementosContainer = document.getElementById('elementos-para-reciclar');
    elementosContainer.innerHTML = "";

    // Resetear estilos de los contenedores
    const slots = document.querySelectorAll('.slot-contenedores');
    slots.forEach(slot => {
        slot.style.border = "none";
        slot.style.backgroundColor = "white"; // fondo blanco al reiniciar
    });
});