import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);

        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._formInputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        this._inputValues = {};
        this._formInputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();

        this._form.reset();
    }
}