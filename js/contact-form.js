
/*=============== SEND MESSAGE CONTACT FORM ===============*/
const alertTxtName = document.querySelector('#alertTxtName');
const alertTxtEmail = document.querySelector('#alertTxtEmail');
const alertTxtMessage = document.querySelector('#alertTxtMessage');
const alertFailSubmit = document.querySelector('#alertFailSubmit');
const alertSuccessSubmit = document.querySelector('#alertSuccessSubmit');
const loader = document.querySelector('#loader-container');
const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
  e.preventDefault();

  // Oculto los alert
  hideAlerts();

  // Muestro el loader
  loader.classList.remove('no-display');

  myFormData = new FormData(contactForm);
  // const name = myFormData.get('txtName');

  const urlApi = '../api/sendMessage.php';
  
  fetch(urlApi, {
    method: 'post',
    mode: 'no-cors',
    body: myFormData,
  })
  .then(resp => resp.json())
  .then(data => {
    // Oculto el loader
    loader.classList.add('no-display');

    // Desestructuro el objeto respuesta
    ({ result, valid_name, valid_email, valid_message } = data);

    if (result) {
      printAlert(alertSuccessSubmit, '¡Mensaje enviado correctamente!');
      clearInputs();
    }
    else {
      if (!valid_name) {
        printAlert(alertTxtName, 'Escriba un nombre válido.');
      }
      if (!valid_email) {
        printAlert(alertTxtEmail, 'Escriba un email válido.');
      }
      if (!valid_message) {
        printAlert(alertTxtMessage, 'Debe escribir un mensaje.');
      }
    }
  })
  .catch(() => {
    printAlert(alertFailSubmit, 'Error al enviar, vuelva a intentarlo.');
    loader.classList.add('no-display');
  })
}

function printAlert(element, text) {
  element.classList.remove('no-display');
  element.innerText = text;
}

function hideAlerts() {
  alertTxtName.classList.add('no-display');
  alertTxtEmail.classList.add('no-display');
  alertTxtMessage.classList.add('no-display');
  alertFailSubmit.classList.add('no-display');
  alertSuccessSubmit.classList.add('no-display');
}

function clearInputs() {
  const txtName = document.querySelector('#txtName');
  const txtEmail = document.querySelector('#txtEmail');
  const txtMessage = document.querySelector('#txtMessage');

  txtName.value = '';
  txtEmail.value = '';
  txtMessage.value = '';
}