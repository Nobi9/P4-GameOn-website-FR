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
let inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='date'], input[type='number'], input[type='radio'], input[type='checkbox']");
const radiosInputs = document.querySelectorAll('input[type="radio"]')
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
radiosInputs.forEach(radio => {
  radio.setAttribute('required','');
})
document.getElementById('checkbox1').setAttribute('checked', '');    // pre-checked box

// ============================== Err msg Data + Functions show/hide ============================== // 
const errors = [
  'Veuillez saisir votre prénom (2 caractères min)', 'Veuillez saisir votre nom (2 caractères min)',
  'Veuillez saisir une adresse e-mail valide (exemple@fai.fr).','Veuillez saisir votre date de naissance.',
  'Veuillez saisir un nombre entier.','Veuillez choisir une option.','Veuillez choisir une option.','Veuillez choisir une option.',
  'Veuillez choisir une option.','Veuillez choisir une option.','Veuillez choisir une option.',
  'Vous devez vérifier que vous acceptez les termes et conditions.','Vous devez vérifier que vous acceptez les termes et conditions.'
];

function hideErr(input){                                                  // Une input en paramètre
    input.closest('div').setAttribute("data-error-visible", "false");     // Modifie son err-visible à false
}

function showErr(input,key){                                              // Une input et sa clé en paramètre
  input.closest('div').setAttribute('data-error', errors[key]);           // attribue ErrMsg correspondant à sa clé au parent en parcourant le tableau des errors                   
  input.closest('div').setAttribute("data-error-visible", "true");        // Modifie son err-visible à true
}

// ============================== radioIsChecked : génère un array de booléens pour chaque input ================= //
function radioIsChecked(radios){                            // nodList de radios en paramètre,
  return (Object.keys(radios).map(key => {                  // Itération sur un tableau d'objets-clés,
    return radios[key].checked})).some(x => x === true)     // Pour retourner une unique valeur true si au moins un radio est checked 
} 

// ============== getValidity : génère un array de booléens contenant la validité de l'ensemble des inputs =========//
// ===========Le booléen dépend du [type] et de la regex correspondante. getValidity call hideErr() si "true" ======//
let validity = [];
function getValidity(inputs){                               // Reçoit en paramètre l'ensemble des inputs du form
  let regex = "";                                           // Génère un array objet-clé contenant la validité de chaque input  
  validity = 
    Object.keys(inputs).map(key => {                        // puis en extraie les objets pour retourner un simple tableau avec la valeur true/false
        switch (inputs[key].type) {                         // pour chaque input en fonction (switch) du type d'input qui se présente

          case 'text':
            (inputs[key].required) ?
              (regex = /[a-zA-ZÀ-ÿ\-]{2,60}/)                                   // regex si required
              :
              (regex = /^$|([a-zA-ZÀ-ÿ\-]{0,60})/);                             // sinon "empty okay"

            if(regex.test(inputs[key].value)){
              hideErr(inputs[key])                                              //true? : hideErr() onChange
              inputs[key].setCustomValidity('');                                        
            } else {
              inputs[key].setCustomValidity(`${errors[key]}`)                   // Override la propriété HTML5 validity.valid,
            }                                                                   // qui force le submit avec des erreurs

            return regex.test(inputs[key].value);                               // return true/false in array
            break;

          case 'date':
            (inputs[key].required) ?
              (regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)      // same
              :
              (regex = /^$|([12]\d{0,3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);

            if(regex.test(inputs[key].value)){
              hideErr(inputs[key])
            };

            return regex.test(inputs[key].value);                             
            break;

          case 'email':                                                          // same
            (inputs[key].required) ?                                      
                (regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
                :
                (regex = /^$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            
            if(regex.test(inputs[key].value)){
              hideErr(inputs[key])
              inputs[key].setCustomValidity('');                                        
                 
            } else {
              inputs[key].setCustomValidity(`${errors[key]}`)                     // Pareil pour htlm5 validity.valid 
            }

            return regex.test(inputs[key].value);                              
            break;

          case 'number':                                                           // same
            (inputs[key].required) ?
              (regex = /[0-9]{1,2}/) 
              :
              (regex = /^$|[0-9]{1,2}/);

            if(regex.test(inputs[key].value)){
              hideErr(inputs[key])
            }

            return regex.test(inputs[key].value);                             
            break;

          case 'radio':                                                                                 // cf. radioIsChecked() comments
            if(inputs[key].required && radioIsChecked(document.querySelectorAll("[type='radio']"))) {   // (required && "au moins un parmis nodList is checked")
              hideErr(inputs[key])                                                                      // true : hideErr
            }

            return radioIsChecked(document.querySelectorAll("[type='radio']"))                          // return true/false in array
            break;

          case 'checkbox':                                                      
            if (inputs[key].required) {             // if required, false if not checked
              if(inputs[key].checked){              // && if checked, hideErr()
                hideErr(inputs[key])
              }                                     // Anyway return bool in array
              return inputs[key].checked            
            } else {                                // if not required,
              hideErr(inputs[key])                  // always hideErr and return "true" in array to pass form-validity-test
              return true
            }
            break;
        /* case 'textarea': etc. */                 // add your own rules if more inputs
        }
    })

  return validity;                                          // return array
}
const isValid = validity.every((x) => x === true);          // return one boolean depending on validity-values

// =============================================================================================== //
// ============================== eventListeners & functions calls =============================== //
// =============================================================================================== //

inputs.forEach((input, key) => {                            // onChange sur toutes les inputs
  input.addEventListener('input', () => {
    inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='date'], input[type='number'], input[type='radio'], input[type='checkbox']");
    getValidity(inputs) 
    console.log(validity);                                  // Complète l'array validity + hideErr(intégré) si valide & console.log 
    if (!(validity[key])){input.validity.valid = false};                        
    (isValid) ?                                             // Everything "true" ? 
      (submitBtn.style.background = '#fe142f')              // True : bouton rouge + permet l'envoi;
      : 
      (submitBtn.style.background = 'grey')                 // False : bouton gris + pas d'envoi; 
  })
})

submitBtn.addEventListener('click', () => {                 // onSubmitClick : showErr                                                     
  inputs.forEach((input, key) => {
    if (!(validity[key])) {
      showErr(input, key)
    }
  })                                                        
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();
  getFormData(form);
  userDatas.push([getFormData(form)]);
  console.log(userDatas)
  shutModal();                                                                          // ..
  launchVmodal(); 
})


// ======================================================================================================================== //
// ======================================================================================================================== //
// =========================================== !!!!! OPTIONAL !!!!!======================================================== //
// ======================================================================================================================== //
// ======================================================================================================================== //


// ======================================================================================================================== //
// ============================================= Data Function ============================================================ //
// ======================================================================================================================== //

const userDatas = [];

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
//test : addInput(2, 'age', 'number', 'Age', true, 'Veuillez saisir votre âge');
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
  let errPos = position -1;
  errors.splice(errPos, 0, `${errMsg}`);
}
