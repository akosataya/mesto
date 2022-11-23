import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._name = this._popup.querySelector('.popup__photo-caption');
        this._link = this._popup.querySelector('.popup__photo');
    }

    open(name, link) {
        super.open();
        this._name.alt = name;
        this._name.textContent = name;
        this._link.src = link;
    }
}