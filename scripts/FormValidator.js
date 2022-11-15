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
    }

    _setEventListeners() {
        this._toggleBtnState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputErrorState(inputElement);
                this._toggleBtnState();
            });
        });
    }

    _toggleInputErrorState (inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError (inputElement) {
        this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);

        this._formError.textContent = inputElement.validationMessage;
        this._formError.classList.add(this._errorClass);
    }

    _hideInputError (inputElement) {
        this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);

        this._formError.classList.remove(this._errorClass);
        this._formError.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleBtnState() {
        if (this._hasInvalidInput(this._inputList)) {
            this.makeDisabledBtn(this._submitBtn);
        } else {
            this._removeDisabledBtn(this._submitBtn);
        }
    }

    makeDisabledBtn() {
        this._submitBtn.classList.add(this._inactiveButtonClass);
        this._submitBtn.setAttribute('disabled', true);
    }

    _removeDisabledBtn() {
        this._submitBtn.classList.remove(this._inactiveButtonClass);
        this._submitBtn.removeAttribute('disabled');
    }

    resetErrors() {
        this._inputList.forEach((inputElement) => {
            this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}