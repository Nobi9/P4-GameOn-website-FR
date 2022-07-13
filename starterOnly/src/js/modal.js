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
let errors = {
  first : 'Veuillez saisir votre prénom (2 caractères min)',
  last : 'Veuillez saisir votre nom (2 caractères min)',
  birthdate : 'Veuillez saisir votre date de naissance.',
  email : 'Veuillez saisir une adresse e-mail valide (exemple@fai.fr).',
  quantity : 'Veuillez saisir un nombre entier.',
  location : 'Veuillez choisir une option.',
  checkbox1 : 'Vous devez vérifier que vous acceptez les termes et conditions.',
  checkbox2 : '',
};

let regexArr = {
  text : "[a-zA-ZÀ-ÿ\\-]{2,60}",
  date : "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))",
  email : "^[\\w\-\\.]+@([\\w\\-]+\\.)+[\\w\\-]{2,4}$",
  number : "[0-9]{1,2}",
}

function radioIsChecked(radios){                            // nodList de radios en paramètre,
  return (Object.keys(radios).map(key => {                  // Itération sur un tableau d'objets-clés,
    return radios[key].checked})).some(x => x === true)     // Pour retourner une unique valeur true si au moins un radio est checked 
} 

function isValid(input){                                              // Détermine les actions à faire si une input est valide
  input.setCustomValidity('')                                         // passer le test de validité html5
  input.parentNode.setAttribute('data-error-visible', 'false');       // cacher l'erreur éventuelle
}
function isInvalid(input){                                              // Détermine les actions à faire si une input n'est pas valide
  input.setCustomValidity(errors[`${input.name}`]);                     // empêcher de passer le test de validité html5
  input.parentNode.setAttribute('data-error', `${input.validationMessage}`); // donner la data-err au parent
  input.parentNode.setAttribute('data-error-visible', 'true');              // montrer l'erreur
}

function checkInputs(input){  // une input en param
  
  switch (input.type){ 

    case 'text': case 'date': case 'email': case 'number':
      const regexType = regexArr[`${input.type}`];          // Selectionne la regex adaptée à cette input dans le tableau des regex
      let regex = RegExp('');
      
      (input.required) ?                                                  // input required ? 
        (regex = RegExp(regexType)) : (regex = RegExp('^$|'+ regexType)); // True : regex en fonction du type d'input. False : regex idem mais avec la possibilité "empty
        
      (regex.test(input.value)) ?                                         // L'input match la regex ? 
        (isValid(input)) : (isInvalid(input))     
      break;

    case 'radio' : 
      if(input.required){                                                 // Radio required ? 
        if(radioIsChecked(document.querySelectorAll("[type='radio']"))){  // un radio parmis les radio est checké ? 
          isValid(input)
        } else {                                                          // aucun radio checked ? 
          isInvalid(input)
        }
      } else {                                                             // If not required ?
        isValid(input)
      }
      break;

    case 'checkbox' : 
      if (input.required) {             // checkbox required ? 
        if(input.checked){                // checked ?  
          isValid(input)
        } else {                          // If not ?
          isInvalid(input)
        }                                     
      } else {                         // checkbox not required ? 
        isValid(input)
      }
      break;
  }
};

submitBtn.addEventListener('click', () => {  // ajouter keypress ? 
    inputs.forEach((input) => {
      checkInputs(input)
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