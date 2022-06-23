function editNav() { 
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector(".form");
const submitBtn = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block"; 
}
// shut modal form
function shutModal() {
  modalbg.style.display = "none";
}
// close modal event
closeBtn.addEventListener("click", shutModal);


// =============== Form Attributes =============== //
document.getElementById('first').setAttribute('autofocus', 'true');

// Basic attributes for almost all inputs
function basicAttributes(inputId){
  const myInput = document.getElementById(inputId);
  myInput.setAttribute('required', '');
  myInput.setAttribute('autocomplete', 'true');
}
basicAttributes('first'); basicAttributes('last'); basicAttributes('email'); basicAttributes('birthdate'); basicAttributes('quantity');basicAttributes('checkbox1');

// Attribute "pattern" for each input in the form
function setPatterns(firstId, lastId, emailId, dateId) {
  document.getElementById(firstId).setAttribute('pattern', "[a-zA-ZÀ-ÿ\-]{2,60}");
  document.getElementById(lastId).setAttribute('pattern', "[a-zA-ZÀ-ÿ\-]{2,60}");
  document.getElementById(emailId).setAttribute('pattern', "([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}");
  document.getElementById(dateId).setAttribute('pattern', "(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"); // N'est pas nécessaire car attribute 'date' en html5
  // 'quantity ?'
};
setPatterns('first', 'last', 'email', 'birthdate');

// Checked box (GUC)
document.querySelector("#checkbox1").setAttribute('checked', '');


// =============== Form Validation ===============

let formValidity = false;
let inputs = document.querySelectorAll(".listen");                      // Pointe toutes les input à vérifier
inputs.forEach(input => {                                             // Effectue une boucle sur les inputs 
  input.addEventListener('input', () => {                             // pour écouter chacune d'entre lles
    if(
      (document.getElementById('first').validity.valid == true)
      &&
      (document.getElementById('last').validity.valid == true)          // Conditions à remplir
      &&                                                                // c.a.d que l'input ait une propriété html5 "valid" = true
      (document.getElementById('email').validity.valid == true)
      &&
      (document.getElementById('birthdate').validity.valid == true)
      &&
      (document.getElementById('quantity').validity.valid == true)
      &&
      (
        (document.getElementById('location1').checked == true) 
        || 
        (document.getElementById('location2').checked == true)
        || 
        (document.getElementById('location3').checked == true)
        || 
        (document.getElementById('location4').checked == true)
        || 
        (document.getElementById('location5').checked == true)
        || 
        (document.getElementById('location6').checked == true)
      )
      &&
      (document.getElementById('checkbox1').checked == true)
    ){                                                                  // Opérations à réaliser si oui
      formValidity = true;                                            
      console.log(formValidity);
    } else {         
      formValidity = false;   
      console.log(formValidity);                                             // Sinon
    } 
  });
});


submitBtn.addEventListener("click", (e) => {
  if(formValidity == true)
  {
    alert("Merci d'avoir bien rempli ce formulaire");                                                        // Opérations à réaliser si oui
  } else {
    e.preventDefault();
    e.stopPropagation();
    if(document.getElementById('first').validity.valid == false){
      alert('Veuillez entrer 2 caractères ou plus pour le champ du prénom.')
    } else if (document.getElementById('last').validity.valid == false){
      alert('Veuillez entrer 2 caractères ou plus pour le champ du nom.')
    } else if (document.getElementById('email').validity.valid == false){
      alert('Veuillez entrer une adresse e-mail valide (exemple@fournisseur.fr).')
    } else if (document.getElementById('birthdate').validity.valid == false) {
      alert('Vous devez entrer votre date de naissance.')
    } else if (document.getElementById('quantity').validity.valid == false) {
      alert('Veuillez entrer un nombre dans le champ des participations')
    } else if (
      (document.getElementById('location1').checked == false) 
      && 
      (document.getElementById('location2').checked == false)
      && 
      (document.getElementById('location3').checked == false)
      &&
      (document.getElementById('location4').checked == false)
      && 
      (document.getElementById('location5').checked == false)
      && 
      (document.getElementById('location6').checked == false)
    ) {
      alert('Vous devez choisir une option.')
    } else if (document.getElementById('checkbox1').checked == false){
      alert('Vous devez vérifier que vous acceptez les termes et conditions.')
    }
  }
});

// document.querySelector('form div:nth-child(1) label').style

// griser le submit tant que pas valide, mais permettre de cliquer dessus. 