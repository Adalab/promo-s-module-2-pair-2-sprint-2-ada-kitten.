'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race')
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');


//Objetos con cada gatito
const kittenData_1 = {
    image: "https://dev.adalab.es/gato-siames.webp",
    name: "Anastacio",
    desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
    race: "Siamés",
};
const kittenData_2 = {
    image: "https://dev.adalab.es/sphynx-gato.webp",
    name: "Fiona",
    desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
    race: "Sphynx",
};
const kittenData_3 = {
    image: "https://dev.adalab.es/maine-coon-cat.webp",
    name: "Cielo",
    desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
    race: "Maine Coon",
};


// const kittenDataList = [kittenData_1, kittenData_2, kittenData_3,];

//Funciones
function renderKitten(kittenData) {
    
  const liElement = document.createElement('li');
  liElement.classList.add('card');

  const articleElement = document.createElement('article');
  liElement.appendChild(articleElement);

  const imgElement = document.createElement('img');
  imgElement.classList.add('card_img');
  imgElement.src = kittenData.image;
  articleElement.appendChild(imgElement);

  const h3Title = document.createElement('h3');
  h3Title.classList.add('card_title');
  articleElement.appendChild(h3Title);

  const textForTitle = document.createTextNode(kittenData.name);
  h3Title.appendChild(textForTitle);

    const pDesc = document.createElement('desc');
  pDesc.classList.add('card_description');
  articleElement.appendChild(pDesc);

  const textForDesc = document.createTextNode(kittenData.desc);
  pDesc.appendChild(textForDesc);

  return liElement;

}


function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";

    for (const kittenItem of kittenDataList) {

      const liElement = renderKitten(kittenItem);

      //liElement.addEventListener('click', handle)

      listElement.appendChild(liElement);
        
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
   
    
  
    if (valueDesc === '' || valuePhoto === '' || valueName === '') {
        labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
    } else {
        if (valueDesc !== '' || valuePhoto !== '' || valueName !== '') {
            labelMessageError.innerHTML = '';
    const newKittenDataObject = {
        image: valuePhoto,
        name: valueName,
        desc: valueDesc,
        race: valueRace,
        };
    kittenDataList.push(newKittenDataObject);
    inputDesc.value = '';
      inputPhoto.value = '';
      inputName.value = '';
      inputRace.value = '';

      labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';

    renderKittenList(kittenDataList);
    

    }

} 
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}


 function filterKitten(event) {
     event.preventDefault();
    const descrSearchText = input_search_desc.value;
    listElement.innerHTML = "";
    
const dataKittenFiltered = kittenDataList
        .filter((kitten) => kitten.desc.includes(descrSearchText))
        renderKittenList(dataKittenFiltered);
 }        
let kittenDataList = [];

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);

// peticion al servidor 
const GITHUB_USER = '<virlucero>';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

if (kittenListStored) {
  //si existe el listado de gatitos en el local storage
kittenDataList = kittenListStored;
  // vuelve a pintar el listado de gatitos
renderKittenList(kittenDataList);

} else {

  fetch(SERVER_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      kittenDataList = data.results;
      renderKittenList(kittenDataList);
    })
    .catch((error) => {
      console.error(error);
    });
}

function addNewKittenServer(newKittenDataObject) {
  fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newKittenDataObject),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        //Agregar un nuevo gatito al listado
        kittenDataList.push(newKittenDataObject);
        localStorage.setItem('kittensList', JSON.stringify(kittenDataList));

      }
    });
}






