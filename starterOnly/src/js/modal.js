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
  formData.querySelector('input').setAttribute('required','');        // Pose l'attribut required sur chaque première input du parent .formData
  formData.querySelector('input').setAttribute('autocomplete','true');
})

document.getElementById('checkbox1').setAttribute('checked', '');    // pre-checked box
document.getElementById('checkbox1').setAttribute('required','');
// ============================== ErrMsg Data + Functions show/hide ============================== // 
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

let userData = [];
let formValidity = [];

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
      let regex = RegExp('');
      (input.required) ?                                                  // input required ? 
        (regex = RegExp(regexArr[`${input.type}`])) : (regex = RegExp('^$|'+ regexArr[`${input.type}`])); // True : regex en fonction du type d'input. False : regex idem mais avec la possibilité "empty
        
      (regex.test(input.value)) ?                                         // L'input match la regex ? 
        (isValid(input)) : (isInvalid(input));                            // show / hide errMsg
        
      userData.push(input.value);                                        // stocke la data
      break;

    case 'radio':
      let siblings = Array.from(input.parentNode.querySelectorAll('input'));  // retourn la nodList du parent de l'input 
      let oneIsChecked = siblings.find(e => e.checked);
      let oneIsRequired = siblings.find(e => e.required);

      ((oneIsChecked && oneIsRequired) || !oneIsRequired) ? 
        (isValid(input)) : (isInvalid(input));                    // Un check + required ou pas required ? TRUE

      (oneIsChecked) ?                                         // Pas check et required : 'null' + false
        (userData.push(input.parentNode.querySelector(':checked').value)) : (userData.push('empty'));
      break;

    case 'checkbox' : 
      ((input.required && input.checked) || !input.required) ?   // (radio required + checked) OU not required ? 
        (isValid(input)) : (isInvalid(input))
      userData.push(input.checked);
      break;
  }
}

submitBtn.addEventListener('click', () => {  // ajouter keypress ?
    userData = [];                           // Vide le tableau avant de le remplir
    inputs.forEach((input) => {
      checkInputs(input)                     // Boucle sur toutes les input, pour valider le form et stocker les datas
    });
    userData.splice(5,5);                    // Supprime les data en trop généré par le forEach() au niveau des radios 
})

form.addEventListener('submit', e => {
      e.preventDefault(); // this will stop the event from further propagation and the submission will not be executed
      e.stopPropagation(); //not always necessary
      console.log(userData)
      shutModal();
      launchVmodal();     
});