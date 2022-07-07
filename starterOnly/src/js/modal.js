// ========== DOM Elements ========== //
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const required = document.querySelector('.required');
const allRequired = document.querySelectorAll(".required");
const oneRequired = document.querySelectorAll('.one-required')  
const closeBtn = document.querySelector(".close");
const form = document.querySelector(".form");
const valModalBg = document.getElementById("modal-validation-bg");
const valCloseBtn = document.querySelector(".validation-content .close");

// ==========  FORM Elements ========== //
let formSections = document.querySelectorAll(".formData");    
const myFirst = document.getElementById('first');
const myLast = document.getElementById('last');
const myEmail = document.getElementById('email');
const myBirthdate = document.getElementById('birthdate');
const radiosLabel = document.querySelector('form p');
const radiosInput = document.querySelectorAll('formData:nth-child(6)');
const myLoc1 = document.getElementById('location1');
const myCB1 = document.getElementById('checkbox1');
const myCBs = document.querySelectorAll('#checkbox1, #checkbox2')
const submitBtn = document.querySelector(".btn-submit");

// =============== Error Messages =============== //
document.querySelector('form div:nth-child(1)').setAttribute('data-error', 'Veuillez saisir votre prénom (2 caractères min)');
document.querySelector('form div:nth-child(2)').setAttribute('data-error', 'Veuillez saisir votre nom (2 caractères min)');
document.querySelector('form div:nth-child(3)').setAttribute('data-error', 'Veuillez saisir une adresse e-mail valide (exemple@fai.fr).');
document.querySelector('form div:nth-child(4)').setAttribute('data-error', 'Veuillez saisir votre date de naissance.');
document.querySelector('form div:nth-child(5)').setAttribute('data-error', 'Veuillez saisir un nombre entier.');
document.querySelector('form p').setAttribute('data-error', 'Veuillez choisir une option.');
document.querySelector('.form div:nth-child(7)').setAttribute('data-error', 'Vous devez vérifier que vous acceptez les termes et conditions.');

// ==================== Functions ==================== //
function editNav() { 
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ==================== Form Validation Functions ==================== //
function getValidityArr(e){                  // Tableau d'objets clé-valeur regroupant le true/false   
  return Object.keys(e).map(key => {            // pour chaque input, synthétisé en un simple tableau sans clés
    return e[key].validity.valid
  });
}

function getCheckedArr(e){                      
  return Object.keys(e).map(key => {            // Pareil pour la propriété checked
    return e[key].checked
  });
}

function isTrue(e){return e === true;}          // Truthy function pour la méthode every()

function formValidation(){
  return formIsValid = isTrue(((getValidityArr(allRequired).every(isTrue))&&(getCheckedArr(oneRequired).some(isTrue))));
}

// ==================== Modal Functions ==================== //
function launchModal() {modalBg.style.display = "block";}
function shutModal() {modalBg.style.display = "none";}
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", shutModal);

// ==================== ValModal Functions ==================== //
function launchValModal() {valModalBg.style.display = "block";}
function shutValModal() {valModalBg.style.display = "None";}
valCloseBtn.addEventListener("click", shutValModal);
document.querySelector(".modal-validation-bground .btn-submit").addEventListener("click", shutValModal);

const userDatas = [];
function handleSubmit(){
  shutModal();
  launchValModal();
  userDatas.push([getFormData(form)]);
  console.log(userDatas);
}


// =============== Form Attributes =============== //
// Basic attributes for almost all inputs
formSections.forEach(formSection => {
  formSection.querySelector('input').setAttribute('required','');
  formSection.querySelector('input').setAttribute('autocomplete','true');
})

// Attribute "pattern"
myFirst.setAttribute('pattern', "[a-zA-ZÀ-ÿ\-]{2,60}");
myLast.setAttribute('pattern', "[a-zA-ZÀ-ÿ\-]{2,60}");
myEmail.setAttribute('pattern', "([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}");
myBirthdate.setAttribute('pattern', "(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}");

// Checked box (GUC)
myCB1.setAttribute('checked', '');


// =============== onsubmit-click show Err msg =============== // 
submitBtn.addEventListener('click', () => {
  console.log(getFormData(form));
                                                                           // Au click boucle sur formSections
  formSections.forEach(formSection => {                                   // pour tester unitairement la validité de chaque input.                           
    if (!(formSection.querySelector('[required]').validity.valid)) {     // Si pas valide,
        formSection.setAttribute("data-error-visible", "true");         // Show err-msg,  sinon le hide err-msg se fait onChange                                         
    } 
    if (!(myLoc1.validity.valid)) {                               // Les radios sont connectés entre eux, il suffit d'un.
      radiosLabel.setAttribute("data-error-visible", "true");
    }
  })});

// ========= OnChange : hide err-Msg + Enable Submit if form is valid ========== //
formSections.forEach(formSection => {   // Boucle sur les formSections et écoute la première input de chaque zone
  formSection.querySelector('[required], .one-required').addEventListener('input', () => {
    getFormData(form);                                                                 // A voir si on a le droit de collecter les données avant qu'elles soient submit ? 
  formValidation();

  if (formIsValid) {
    console.log(formIsValid);  
    submitBtn.style.background = '#fe142f';              // Valide, bouton rouge
    form.removeEventListener('submit', (e) => {e.preventDefault();e.stopPropagation();});
    //off('submit','form', (evt) => {evt.preventDefault()});
  } else {
    submitBtn.style.background = 'grey';                // Pas valide, bouton gris
    form.addEventListener('submit', (e) => {e.preventDefault();e.stopPropagation();})
    //on('submit', 'form', (evt) => {evt.preventDefault();evt.stopPropagation()});
  }               
    
  // HIDE ERR-MSG onChange
    if (getCheckedArr(oneRequired).some(isTrue)) {                                          // Err-msg pour les radios
      document.querySelector('form p').setAttribute("data-error-visible", "false");
    }  
    if (formSection.querySelector('.required').validity.valid) {    // "if true" sur chaque input.validity.valid
      formSection.setAttribute("data-error-visible", "false")      // Valide ? hide err-msg
    }
    if (getCheckedArr(oneRequired).some(isTrue)) {
      document.querySelector('form p').setAttribute("data-error-visible", "false");
    }                                                             // Pas valide ? show err-msg est géré au submitClick                                                    
  })
});

// ============================= Handling data ============================== //
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
      if (node.tagName === "INPUT" && excludedInputTypes.indexOf(node.type) === -1      // in the case of an inpu
      ) {
        if ((node.type !== "radio" && node.type !== "checkbox") ||(node.type === "radio" && node.checked)) {
          data[node.name] = node.value;
        }
        if (node.type === "checkbox") {
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

