export default class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
        this._submitBtn = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._formList = Array.from(this._formElement.querySelectorAll(this._formSelector));
    }

    _setEventListeners() {
        this._toggleBtnState();

        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function() {
                this._isValid(inputElement);
                this._toggleBtnState();
            });
        });
    }

    _isValid (inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError = (inputElement) => {
        this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);

        this._formError.textContent = errorMessage;
        this._formError.classList.add(this._errorClass);
    }

   _hideInputError (inputElement) {
        this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);

        this._formError.classList.remove(this._errorClass);
        this._formError.textContent = '';
    }






    enableValidation() {
        this._setEventListeners(this._formSelector);
    }
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



const enableValidation = (validationFormList) => {
    const formList = Array.from(document.querySelectorAll(validationFormList.formSelector));

    formList.forEach((form) => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(form, validationFormList);
    });
}

