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
const modalValidation = document.getElementById("modal-validation");


const myFirst = document.getElementById('first');
const myLast = document.getElementById('last');
const myEmail = document.getElementById('email');
const myBirthdate = document.getElementById('birthdate');
const myQuantity = document.getElementById('quantity');
const myLoc1 = document.getElementById('location1');
const myLoc2 = document.getElementById('location2');
const myLoc3 = document.getElementById('location3');
const myLoc4 = document.getElementById('location4');
const myLoc5 = document.getElementById('location5');
const myLoc6 = document.getElementById('location6');
const myCB1 = document.getElementById('checkbox1');

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
myFirst.setAttribute('autofocus', 'true');

// Basic attributes for almost all inputs
function basicAttributes(inputId){
  const myInput = document.getElementById(inputId);
  myInput.setAttribute('required', '');
  myInput.setAttribute('autocomplete', 'true');
}
basicAttributes('first'); basicAttributes('last'); basicAttributes('email'); basicAttributes('birthdate'); basicAttributes('quantity');basicAttributes('checkbox1');

// Attribute "pattern"
myFirst.setAttribute('pattern', "[a-zA-ZÀ-ÿ\-]{2,60}");
myLast.setAttribute('pattern', "[a-zA-ZÀ-ÿ\-]{2,60}");
myEmail.setAttribute('pattern', "([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}");
myBirthdate.setAttribute('pattern', "(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}");

// Checked box (GUC)
myCB1.setAttribute('checked', '');

// =============== Form Validation ===============

let formValidity = false;
let inputs = document.querySelectorAll(".listen");                      // Pointe toutes les input à vérifier
inputs.forEach(input => {                                             // Effectue une boucle sur les inputs 
  input.addEventListener('input', () => {                             // pour écouter chacune d'entre lles
    if(
      (myFirst.validity.valid == true)
      &&
      (myLast.validity.valid == true)          // Conditions à remplir
      &&                                                                // c.a.d que l'input ait une propriété html5 "valid" = true
      (myEmail.validity.valid == true)
      &&
      (myBirthdate.validity.valid == true)
      &&
      (myQuantity.validity.valid == true)
      &&
      (
        (myLoc1.checked == true) 
        || 
        (myLoc2.checked == true)
        || 
        (myLoc3.checked == true)
        || 
        (myLoc4.checked == true)
        || 
        (myLoc5.checked == true)
        || 
        (myLoc6.checked == true)
      )
      &&
      (myCB1.checked == true)
    ){                                                                  // Opérations à réaliser si oui
      formValidity = true;                                            
      console.log(formValidity);
      submitBtn.style.background = '#fe142f';  
      
    } else {         
      formValidity = false;   
      console.log(formValidity);  
      submitBtn.style.background = 'grey';                                           // Sinon
    } 
  });
});

document.querySelector('form div:nth-child(1)').setAttribute('data-error', 'Veuillez saisir votre prénom (2 caractères min)');
document.querySelector('form div:nth-child(2)').setAttribute('data-error', 'Veuillez saisir votre nom (2 caractères min)');
document.querySelector('form div:nth-child(3)').setAttribute('data-error', 'Veuillez saisir une adresse e-mail valide (exemple@fai.fr).');
document.querySelector('form div:nth-child(4)').setAttribute('data-error', 'Veuillez saisir votre date de naissance.');
document.querySelector('form div:nth-child(5)').setAttribute('data-error', 'Veuillez saisir un nombre entier.');
document.querySelector('form p').setAttribute('data-error', 'Veuillez choisir une option.');
document.querySelector('.checkbox2-label').setAttribute('data-error', 'Vous devez vérifier que vous acceptez les termes et conditions.');

// Tentative de faire un dry-code avec une itération sur toutes les input.... echec.
/*submitBtn.addEventListener("click", (e) => {
  if(formValidity == true)
  {
    alert("Merci d'avoir bien rempli ce formulaire");                                                        // Opérations à réaliser si oui
  } else {
    e.preventDefault();
    e.stopPropagation();

    let divs = document.querySelectorAll(".listen");              // 
    divs.forEach(div => {                                          // Effectue une boucle sur les inputs 
      if(document.querySelector(`${div} input`).validity.valid == false) {
        document.querySelector(`form ${div}`).setAttribute("data-error-visible", "true");
      } else {
        document.querySelector(`form ${div}`).setAttribute("data-error-visible", "false");
      }
    })
  }
});*/

submitBtn.addEventListener("click", (e) => {
  if(formValidity == true)
  {
    modalValidation.style.display = "block";      
                                                      // Opérations à réaliser si oui
  } else {

    e.preventDefault();
    e.stopPropagation();

    if (myFirst.validity.valid == false){
      document.querySelector('form div:nth-child(1)').setAttribute("data-error-visible", "true");
      myFirst.addEventListener('input', () => {
        if (myFirst.validity.valid == true){
          document.querySelector('form div:nth-child(1)').setAttribute("data-error-visible", "false");
        }
      }) 
    } 

    else if (myLast.validity.valid == false){
      document.querySelector('form div:nth-child(2)').setAttribute("data-error-visible", "true");
      myLast.addEventListener('input', () => {
        if (myLast.validity.valid == true) {
          document.querySelector('form div:nth-child(2)').setAttribute("data-error-visible", "false");
        }
      })
    }
    
    else if (myEmail.validity.valid == false){
      document.querySelector('form div:nth-child(3)').setAttribute("data-error-visible", "true");
      myEmail.addEventListener('input', () => {
        if (myEmail.validity.valid == true)
        document.querySelector('form div:nth-child(3)').setAttribute("data-error-visible", "false");
      })
    }
    
    else if (myBirthdate.validity.valid == false){
      document.querySelector('form div:nth-child(4)').setAttribute("data-error-visible", "true");
      myBirthdate.addEventListener('input', () => {
        if (myBirthdate.validity.valid == true)
      document.querySelector('form div:nth-child(4)').setAttribute("data-error-visible", "false");
      })
    } 
    
    else if (myQuantity.validity.valid == false){
      document.querySelector('form div:nth-child(5)').setAttribute("data-error-visible", "true");
      myQuantity.addEventListener('input', () => {
        if (myQuantity.validity.valid == true)
      document.querySelector('form div:nth-child(5)').setAttribute("data-error-visible", "false");
      })
    }

    else if (myCB1.validity.valid == false){
      document.querySelector('.checkbox2-label').setAttribute("data-error-visible", "true");
      myCB1.addEventListener('input', () => {
        if (myCB1.validity.valid == true)
      document.querySelector('.checkbox2-label').setAttribute("data-error-visible", "false");
      })
    }

    else if (
      (myLoc1.checked == false) 
      && 
      (myLoc2.checked == false)
      && 
      (myLoc3.checked == false)
      &&
      (myLoc4.checked == false)
      && 
      (myLoc5.checked == false)
      && 
      (myLoc6.checked == false)
    ) { 
      document.querySelector('form p').setAttribute("data-error-visible", "true");
      let radios = document.querySelectorAll("form div:nth-child(6) input");                      // Pointe toutes les input à vérifier
      radios.forEach(radio => {                                             // Effectue une boucle sur les inputs 
        radio.addEventListener('input', () => {                             // pour écouter chacune d'entre lles
          if(
            (myLoc1.checked == true) 
            || 
            (myLoc2.checked == true)
            || 
            (myLoc3.checked == true)
            || 
            (myLoc4.checked == true)
            || 
            (myLoc5.checked == true)
            || 
            (myLoc6.checked == true)
          ) {
            document.querySelector('form p').setAttribute("data-error-visible", "false");
          }
        })
      })
    } /*else {
      document.querySelector('form p').setAttribute("data-error-visible", "false");
    }*/
  }
})


  
//document.querySelector('form div:nth-child(6)').setAttribute('data-error', 'Vous devez choisir une option.');
// griser le submit tant que pas valide, mais permettre de cliquer dessus. 


/* const validationRules = [
	{
  	"#test":{
    	minLength:2,
      type:String,
      match:'[aA-zZ]{0,12}'
    },
    '.textZone':{
    	minLength:4,
      required:true
    }
  }
]

const validationRules = [
	{
  	"#test":[new minLength(3), new checkType(String), new matchRegex('[aA-zZ]')],
    '.textZone':{
    	minLength:4,
      required:true
    }
  }
]

for(const [key, rules] of Object.entries(validationRules)) {
	for(const [attr, value] of Object.entries(rules)) {
 	const inputTag = document.querySelector(key)
  	switch (attr) {
    	case 'minLength':
      	if(document.querySelector(key).value.length > value) {
        	// Pas d'erreur
        } else {
         // Erreur
        }
        break;
      case 'type':
      	if(typeof inputTag.value === 'String') {
        	...
        } else {
        ...;
        }
    }
  }
}

for(const [key, rules] of Object.entries(validationRules)) {
let tag = document....
	rules.forEach(rule => {
  	if(rule.check(tag)) {
    	....
    } els*/

    
/*
const start = new Date(Date.now());

console.log(start.getFullYear())*/