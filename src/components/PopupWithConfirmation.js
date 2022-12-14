import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popup) {
        super(popup);

        this._form = this._popup.querySelector('.popup__form');
    }

    setDeletionSubmit(handleForm) {
        this._handleForm = handleForm;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleForm();
        });
    }
}