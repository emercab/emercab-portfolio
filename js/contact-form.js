
/*=============== CAPTCHA ===============*/
const lenghtCaptcha = 5;

const charsCaptcha = [
   'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'L', 'M', 'N', 'P', 'Q', 'R',
   'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
   'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
   '2', '3', '4', '5', '6', '7', '8', '9',
];


/*=============== SEND MESSAGE CONTACT FORM ===============*/
const alertTxtName = document.querySelector('#alertTxtName');
const alertTxtEmail = document.querySelector('#alertTxtEmail');
const alertTxtMessage = document.querySelector('#alertTxtMessage');
const alertTxtCaptcha = document.querySelector('#alertTxtCaptcha');
const alertFailSubmit = document.querySelector('#alertFailSubmit');
const alertSuccessSubmit = document.querySelector('#alertSuccessSubmit');

const txtName = document.querySelector('#txtName');
const txtEmail = document.querySelector('#txtEmail');
const txtMessage = document.querySelector('#txtMessage');
const txtCaptcha = document.querySelector('#txtCaptcha');

const divCaptcha = document.querySelector('.captcha-content');
const captchaReloadIcon = document.querySelector('.captcha-reload-icon');

const loader = document.querySelector('#loader-container');
const contactForm = document.querySelector('#contact-form');

let captcha;

// Genero y muestro nuevo captcha
showCaptcha();

// Envío del formulario
contactForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
   e.preventDefault();

   // Oculto los alert
   hideAlerts();

   // Muestro el loader
   loader.classList.remove('no-display');

   let myFormData = new FormData(contactForm);
   // const name = myFormData.get('txtName');
   myFormData.append('captcha', captcha);
   console.log(myFormData);

   const urlApi = '../api/sendMessage.php';
  
   fetch(urlApi, { method: 'post', mode: 'no-cors', body: myFormData })
   .then(resp => resp.json())
   .then(data => {
      // Oculto el loader
      loader.classList.add('no-display');

      // Proceso la respuesta
      console.log(data);

      if (data.result) {
         printAlert(alertSuccessSubmit, '¡Mensaje enviado correctamente!');
         clearInputs();
      }
      else {
         if (!data.valid_name) {
            printAlert(alertTxtName, 'Escriba un nombre válido.');
         }
         else if (!data.valid_email) {
            printAlert(alertTxtEmail, 'Escriba un email válido.');
         }
         else if (!data.valid_message) {
            printAlert(alertTxtMessage, 'Debe escribir un mensaje.');
         }
         else if (!data.valid_captcha) {
            printAlert(alertTxtCaptcha, 'Captcha incorrecto. Vuelva a ingresarlo');
         }
         else {
           printAlert(alertFailSubmit, 'Error en el servidor, vuelva a intentarlo.');
           loader.classList.add('no-display');
         }
      }
      showCaptcha();
   })
  .catch(() => {
    printAlert(alertFailSubmit, 'Error al enviar, vuelva a intentarlo.');
    loader.classList.add('no-display');
  });
} // Fin del envío del formulario

function printAlert(element, text) {
   element.classList.remove('no-display');
   element.innerText = text;
}

function hideAlerts() {
   alertTxtName.classList.add('no-display');
   alertTxtEmail.classList.add('no-display');
   alertTxtMessage.classList.add('no-display');
   alertTxtCaptcha.classList.add('no-display');
   alertFailSubmit.classList.add('no-display');
   alertSuccessSubmit.classList.add('no-display');
}

function clearInputs() {
   txtName.value = '';
   txtEmail.value = '';
   txtMessage.value = '';
   txtCaptcha.value = '';
}


/*=============== CAPTCHA FUNCTIONS ===============*/
captchaReloadIcon.addEventListener('click', () => {
   showCaptcha();
   hideAlerts();
   txtCaptcha.value = '';
   txtCaptcha.focus();
});

function createCaptcha() {
   captcha = '';
   const min = 0;
   const max = Math.floor(charsCaptcha.length);

   for (let i = 0; i < lenghtCaptcha; i++) {
      let random = Math.floor(Math.random() * (max - min) + min);

      captcha += charsCaptcha[random];
   }
   
   return captcha;
}

function showCaptcha() {
   captcha = createCaptcha();
   divCaptcha.innerText = captcha;
}

txtCaptcha.addEventListener('focus', () => {
   txtCaptcha.select();
});

txtName.addEventListener('focus', () => {
   txtName.select();
});

txtEmail.addEventListener('focus', () => {
   txtEmail.select();
});

txtMessage.addEventListener('focus', () => {
   txtMessage.select();
});
