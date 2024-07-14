import { hideAll } from "./utils.module.js";

const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/,
  emailRegex = /^[a-zA-Z]+[\w!@#$%^&*-.]+[a-zA-Z0-9]+@[a-z]{2,}\.[a-z]{2,}$/,
  phoneRegex = /^(\+2|002)?(011|012|010|015)[0-9]{8}$/,
  ageRegex = /^(18|19|[2-9][0-9])$/,
  passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

const nameInput = $("input[name='name']"),
  emailInput = $("input[name='email']"),
  phoneInput = $("input[name='phone']"),
  ageInput = $("input[name='age']"),
  passwordInput = $("input[name='password']"),
  confirmPasswordInput = $("input[name='confirm-password']");

const submitBtn = $("#contactUs #submitContactBtn");

export const showContactUs = () => {
  hideAll();
  $("#contactUs").fadeIn(0);
  checkChangeDisable();
};

const checkChangeDisable = () => {
  if (checkValidation()) {
    submitBtn.attr("disabled", false);
  } else {
    submitBtn.attr("disabled", true);
  }
};

const checkValidation = () => {
  return (
    isNameValid() &
    isEmailValid() &
    isAgeValid() &
    isPhoneValid() &
    isPasswordValid() &
    isConfirmPasswordValid()
  );
};

const isValueValid = (val, regex) => {
  return regex.test(val);
};

const isNameValid = () => {
  return isValueValid(nameInput.val(), nameRegex);
};
const isEmailValid = () => {
  return isValueValid(emailInput.val(), emailRegex);
};
const isPhoneValid = () => {
  return isValueValid(phoneInput.val(), phoneRegex);
};
const isAgeValid = () => {
  return isValueValid(ageInput.val(), ageRegex);
};
const isPasswordValid = () => {
  return isValueValid(passwordInput.val(), passwordRegex);
};
const isConfirmPasswordValid = () => {
  const isValid = () => {
    if (isPasswordValid()) {
      if (passwordInput.val() === confirmPasswordInput.val()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return isValid();
};

const showErrorMessage = (input) => {
  input.next(".form-alert").fadeIn(0);
};
const hideErrorMessage = (input) => {
  input.next(".form-alert").fadeOut(0);
};

nameInput.on("blur", function (e) {
  if (isNameValid()) {
    hideErrorMessage($(this));
    checkChangeDisable();
  } else {
    showErrorMessage($(this));
  }
});
emailInput.on("blur", function (e) {
  if (isEmailValid()) {
    hideErrorMessage($(this));
    checkChangeDisable();
  } else {
    showErrorMessage($(this));
  }
});
phoneInput.on("blur", function (e) {
  if (isPhoneValid()) {
    hideErrorMessage($(this));
    checkChangeDisable();
  } else {
    showErrorMessage($(this));
  }
});
ageInput.on("blur", function (e) {
  if (isAgeValid()) {
    hideErrorMessage($(this));
    checkChangeDisable();
  } else {
    showErrorMessage($(this));
  }
});
passwordInput.on("blur", function (e) {
  if (isPasswordValid()) {
    hideErrorMessage($(this));
    checkChangeDisable();
  } else {
    showErrorMessage($(this));
  }
});
confirmPasswordInput.on("blur", function (e) {
  if (isConfirmPasswordValid()) {
    hideErrorMessage($(this));
    checkChangeDisable();
  } else {
    if (isPasswordValid()) {
      showErrorMessage($(this));
    }
  }
});

submitBtn.on("click", () => {
  if (checkValidation()) {
    console.log("Success Send Data!!!!");
    $("input").val("");
    checkChangeDisable();
  } else {
    console.log("Faild Send Data!!!");
  }
});
