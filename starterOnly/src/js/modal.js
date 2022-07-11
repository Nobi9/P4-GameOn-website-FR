function editNav() { 
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ============================== DOM Elements ================================================== //
const form = document.querySelector('form');
const formDatas = document.querySelectorAll(".formData"); 
const inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='date'], input[type='number'], input[type='radio'], input[type='checkbox']");
const myFirst = document.getElementById('first');
const myLast = document.getElementById('last');
const myEmail = document.getElementById('email');
const myBirthdate = document.getElementById('birthdate');
const myQuantity = document.getElementById('quantity');
const radioParent = document.querySelector('.radios')
const radios = document.querySelectorAll('input[type="radio"]')
const myCB1 = document.getElementById('checkbox1');
const submitBtn = document.querySelector(".btn-submit");
const closeBtn = document.querySelector(".close");
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const vSubBtn = document.querySelector(".modal-validation-bground .btn-submit");
const vModalBg = document.getElementById("modal-validation-bg");
const vCloseBtn = document.querySelector(".validation-content .close");
function launchModal() {modalBg.style.display = "block";}
function shutModal() {modalBg.style.display = "none";}
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", shutModal);

// ============================== ValModal Functions ============================================== //
function launchVmodal() {vModalBg.style.display = "block";}
function shutVmodal() {vModalBg.style.display = "None";}
vCloseBtn.addEventListener("click", shutVmodal);
vSubBtn.addEventListener("click", shutVmodal);

// ============================== Form Attributes ================================================= //
formDatas.forEach(formData => {                                     
  formData.querySelector('input').setAttribute('required','');
  formData.querySelector('input').setAttribute('autocomplete','true');
})
radios.forEach(radio => {
  radio.setAttribute('required','');
})
myCB1.setAttribute('checked', '');    // pre-checked box (GUC)

// ============================== Err msg Data + Functions show/hide ============================== // 
const errors = [
  'Veuillez saisir votre prénom (2 caractères min)', 'Veuillez saisir votre nom (2 caractères min)',
  'Veuillez saisir une adresse e-mail valide (exemple@fai.fr).','Veuillez saisir votre date de naissance.',
  'Veuillez saisir un nombre entier.','Veuillez choisir une option.','Vous devez vérifier que vous acceptez les termes et conditions.'
];

function hidErr(x){                                                 // Vérifie la validité de l'input
  if(x.validity.valid){                                             // Et 
    x.closest('div').setAttribute("data-error-visible", "false");   // Pour le mail : la propriété passe bien valide/true, mais le message ne s'enlève pas
  }
}

function showErr(parent,key){                                        // Vérifie la validité de l'input, 
  if (!parent.querySelector('input[required]').validity.valid) {     // et attribue un ErrMsg au parent en parcourant le tableau des errors
    parent.setAttribute('data-error', errors[key]);                   
    parent.setAttribute("data-error-visible", "true"); 
  }
}



// ============================== Generates an array true/false for with every reuired inputs ============================== //
function radiosValidity(radios){                    // Si l'on passe radios (nodList des radios) en paramètre,
  return (Object.keys(radios).map(key => {         // Itération sur un tableau d'objets-clés, 
    return radios[key].checked})).some(x => x === true)  // Pour retourner la valeur true si au moins un radio est checked                                                      // si l'un d'entre eux est check
}

let validityArr = [];
function getValidityArray(inputs){                // Reçoit en paramètre l'ensemble des inputs[required] du form
  let regex = "";                             // Génère un array objet-clé contenant la validité de chaque input  
  validityArr = 
    Object.keys(inputs).map(key => {    // puis en extraie les objets pour retourner un simple tableau avec la valeur true/false
        switch (inputs[key].type) {           // pour chaque input en fonction (switch) du type d'input qui se présente

          case 'text':                                          
            regex = /[a-zA-ZÀ-ÿ\-]{2,60}/;
            return regex.test(inputs[key].value);                             // true/false
            break;

          case 'date':
            regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ ///(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/;
            return regex.test(inputs[key].value);                             // true/false
            break;

          case 'email':
            regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(inputs[key].value);                              // true/false
            break;

          case 'number':
            regex = /[0-9]{1,2}/;
            return regex.test(inputs[key].value);                               // true/false
            break;

          case 'checkbox': 
            return inputs[key].checked;                                         // true/false
            break;

          case 'radio':
            radiosValidity(radios);
            return radiosValidity(radios)
            break;
          }
    })
  return validityArr;
  
}

function formValidation(){                  
  if (validityArr.every((x) => x === true)) {     // Vérifie que tout l'array soit "true"
    submitBtn.style.background = '#fe142f';
    form.removeEventListener('submit', (e) => {e.preventDefault();e.stopPropagation();});     // True : bouton rouge + permet l'envoi
  } else {
    submitBtn.style.background = 'grey';
    form.addEventListener('submit', (e) => {e.preventDefault();e.stopPropagation();});        // False : bouton gris + pas d'envoi
  }
}

// ============================== eventListeners & functions calls =============================== // 
document.querySelectorAll("[required]").forEach(input => {                                         // onChange : hideErr & check form validity
  input.addEventListener('input', () => {
    hidErr(input);
    getValidityArray(document.querySelectorAll("[required]"));
    console.log(validityArr); 
    formValidation();
  })
})
submitBtn.addEventListener('click', () => {                       // onSubmitClick : showErr                                                     
  formDatas.forEach((formData,key) => { 
    showErr(formData,key)                                                          
  })
})

// trouver un moyen de mettre document.querySelectorAll("[required]") dans une variable
// Recaler hide et show sur les regex




// ======================================================================================================================== //
// ======================================================================================================================== //
// =========================================== !!!!! OPTIONAL !!!!!======================================================== //
// ======================================================================================================================== //
// ======================================================================================================================== //


// ======================================================================================================================== //
// ============================================= handleSubmit & Data Function ============================================= //
// ======================================================================================================================== //

const userDatas = [];
function handleSubmit(){
  shutModal();
  launchVmodal();
  userDatas.push([getFormData(form)]);
  console.log(userDatas);
}

const getFormData = form => {
  if (!form || form.tagName !== "FORM") return;                   // Test : si !form, fin de la fonction. 

  const { elements } = form;                  
  const data = {};                                                // object of the data we are going to retrieve                
  const allowedTags = ["INPUT", "TEXTAREA", "SELECT"];            // the HTML tags we want to retrieve
  const excludedInputTypes = ["button", "reset", "submit"];       // the types of inputs that we dont consider

  [].slice                                  // [].slice.call() will convert elements of type HTMLFormControlsCollection to an array
    .call(elements)                        // we return the tag only if it is contained in `allowedTags` and if its name has a value
    .filter(node =>allowedTags.indexOf(node.tagName) !== -1 && node.name)
    .forEach(node => {                                               
      if (node.tagName === "INPUT" && excludedInputTypes.indexOf(node.type) === -1      // in the case of an input
      ) {
        if ((node.type !== "radio" && node.type !== "checkbox") ||(node.type === "radio" && node.checked)) { // Si ni radio ni checkbox ou radio.checked
          data[node.name] = node.value;                                                                      // data = value
        }
        if (node.type === "checkbox") {                                                                       // si checkbx : data = checked
          data[node.name] = node.checked;
        }
      }
      // in the case of a textarea
      /*if (node.tagName === "TEXTAREA") {data[node.name] = node.value;}    // in the case of a select with options
      if (node.tagName === "SELECT") {
        const hasOption = node.options.length && node.options[node.selectedIndex];
        data[node.name] = hasOption ? node.options[node.selectedIndex].value : "";
      }*/
    });
  return data;
};

// ======================================================================================================================== //
// ========================================= Function all-in-one to add an input  ========================================= //
// ======================================================================================================================== //

function addInput(position, id, type, labelText, requiredTF, errMsg){

  // In Form, create a new parentNode = <div class="formData"> and places it before a chosen one.
  const newNode = document.createElement('div');
  const refNodePosition = position;
  const refNode = document.querySelector(`.formData:nth-child(${refNodePosition}`);
  form.insertBefore(newNode, refNode);
  const parentNode = document.querySelector(`form div:nth-child(${position.toString()}`);
  parentNode.classList.add('formData'); // donner la class radios si on veut des radios
  
  // Create label & input as .formData childNodes
  const newLabel = document.createElement('label');
  const newInput = document.createElement('input');
  parentNode.appendChild(newLabel);
  parentNode.appendChild(newInput);
  //const childNodes = document.querySelectorAll(`${parentNode} label, ${parentNode} input`);

  // Input setup : class, attr, 
  const input = document.querySelector(`form div:nth-child(${position.toString()}) input`);
  input.classList.add('text-control');
  input.setAttribute('id',`${id}`);
  input.setAttribute('type', `${type}`);
  input.setAttribute('name', `${id}`);
  input.setAttribute('autocomplete', 'true');
  if (requiredTF) {input.setAttribute('required','')};

  // label setup
  const label = document.querySelector(`form div:nth-child(${position.toString()}) label`);
  label.setAttribute('for',`${input.id.value}`);
  label.innerHTML=`${labelText}`;

  // err msg
  errors.splice(position, 0, `${errMsg}`);

  // Regex
  if (input.type = 'text') {
    input.setAttribute('pattern', "[a-zA-ZÀ-ÿ\-]{2,60}");
  } 
  if (input.type = 'email') {
    input.setAttribute('pattern', "([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}")
  } 
  if (input.type = 'date') {
    input.setAttribute('pattern', "(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}");
  }
  if (input.type= 'number') {
    input.setAttribute('pattern', '[0-9]{1,2}');
  }
}
//addInput(2, 'age', 'number', 'Age', true, 'Veuillez saisir votre âge');