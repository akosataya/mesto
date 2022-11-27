export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
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

    _toggleInputErrorState(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        this._inputError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);

        this._inputError.textContent = inputElement.validationMessage;
        this._inputError.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        this._inputError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);

        this._inputError.classList.remove(this._errorClass);
        this._inputError.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleBtnState() {
        if (this._hasInvalidInput()) {
            this.makeDisabledBtn();
        } else {
            this._removeDisabledBtn();
        }
    }

    makeDisabledBtn() {
        this._submitBtn.classList.add(this._inactiveButtonClass);
        this._submitBtn.disabled = "true";
    }

    _removeDisabledBtn() {
        this._submitBtn.classList.remove(this._inactiveButtonClass);
        this._submitBtn.removeAttribute('disabled');
    }

    resetErrors() {
        this._inputList.forEach((inputElement) => {
            this._inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}