'use strict';

const validationFormList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__text-error'
};



const enableValidation = (validationFormList) => {
    const formList = Array.from(document.querySelectorAll(validationFormList.formSelector));

    formList.forEach((form) => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(form, validationFormList);
    });
}

const setEventListeners = (form, validationFormList) => {
    const inputList = Array.from(form.querySelectorAll(validationFormList.inputSelector));
    const submitBtn = form.querySelector(validationFormList.submitButtonSelector);

    toggleBtnState(inputList, submitBtn, validationFormList);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            isValid(form, inputElement, enableValidation);
            toggleBtnState(inputList, submitBtn, validationFormList);
        });
    });
}

const isValid = (form, inputElement, validationFormList) => {
    if(!inputElement.validity.valid) {
        showInputError(form, inputElement, inputElement.validationMessage, validationFormList);
    } else {
        hideInputError(form, inputElement, validationFormList);
    };
}

const showInputError = (form, inputElement, errorMessage, validationFormList) => {
    const formError = form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationFormList.inputErrorClass);

    formError.textContent = errorMessage;
    formError.classList.add(validationFormList.errorClass);
}

const hideInputError = (form, inputElement, validationFormList) => {
    const formError = form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationFormList.inputErrorClass);
    formError.classList.remove(validationFormList.errorClass);
    formError.textContent = '';
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleBtnState = (inputList, submitBtn, validationFormList) => {
    if (hasInvalidInput(inputList)) {
        makeDisabledBtn(submitBtn, validationFormList);
    } else {
        removeDisabledBtn(submitBtn, validationFormList);
    }
}

const makeDisabledBtn = (btn) => {
    btn.classList.add(validationFormList.inactiveButtonClass);
    btn.setAttribute('disabled', true);
}

const removeDisabledBtn = (btn) => {
    btn.classList.remove(validationFormList.inactiveButtonClass);
    btn.removeAttribute('disabled');
}

enableValidation(validationFormList);