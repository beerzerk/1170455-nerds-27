let emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let usernameRegExp = /^[A-Za-zА-Яа-яЁё]*\s*[A-Za-zА-Яа-яЁё]*\s*$/;
let messageRegExp = /\S/;
let errorValidation = false;
let btnContacts = document.querySelector('.btn-contacts');

function validateValue (itemValidate, regExp, classError) {
  itemValidate.classList.remove(classError);
  if(!regExp.test(itemValidate.value)) {
    itemValidate.classList.add(classError);
    errorValidation = true;
  }
}

if (btnContacts) {
  let formFeedback = document.querySelector('#feedback-form');
  let btnFeedbackClose = formFeedback.querySelector('.feedback-form-close');
  let username = formFeedback.querySelector('[name=username]');
  let email = formFeedback.querySelector('[name=email]');
  let message = formFeedback.querySelector('[name=message]');

  function clearClassForm() {
    username.classList.remove('feedback-form-text-error');
    email.classList.remove('feedback-form-email-error');
    message.classList.remove('feedback-form-textarea-error');
    formFeedback.classList.remove('feedback-form-active');
  }

  formFeedback.addEventListener('submit', function (evt) {
    if (!username.value || !email.value || !message.value) {
      evt.preventDefault();
      toggleElementsState(formFeedback, formFeedback, 'feedback-form-error');
    } else {
      errorValidation = false;
      validateValue(username, usernameRegExp, 'feedback-form-text-error');
      validateValue(email, emailRegExp, 'feedback-form-email-error');
      validateValue(message, messageRegExp, 'feedback-form-textarea-error');
      if (errorValidation) {
        evt.preventDefault();
        toggleElementsState(formFeedback, formFeedback, 'feedback-form-error');
      }
    }
  });

  btnContacts.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (formFeedback.classList.contains('feedback-form-close')) {
      formFeedback.classList.remove('feedback-form-close');
    }
    formFeedback.classList.add('feedback-form-active');
    username.focus();
  });

  btnFeedbackClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    formFeedback.classList.remove('feedback-form-error');
    formFeedback.classList.add('feedback-form-close');
    setTimeout(clearClassForm, 500);
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (formFeedback.classList.contains('feedback-form-active')) {
        formFeedback.classList.remove('feedback-form-error');
        formFeedback.classList.add('feedback-form-close');
        setTimeout(clearClassForm, 500);
      }
    }
    });
}


