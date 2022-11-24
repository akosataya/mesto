export default class Card {
    constructor({ data, templateSelector, handleCardClick }) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const photoCardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.gallery__item')
            .cloneNode(true);

        return photoCardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._photo = this._element.querySelector('.gallery__photo');
        this._photo.alt = this._name;
        this._photo.src = this._link;
        this._element.querySelector('.gallery__title').textContent = this._name;

        this._likeBtn = this._element.querySelector('.gallery__like-button');
        this._deleteBtn = this._element.querySelector('.gallery__delete-button');

        this._setListenersOnPhotoCard();

        return this._element;
    }

    _handleCardLike() {
        this._likeBtn.classList.toggle('gallery__like-button_active');
    }

    _handleCardDelete() {
        this._element.remove();
    }

    _setPhotoPopupListener() {
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _setListenersOnPhotoCard() {
        this._likeBtn.addEventListener('click', () => {
            this._handleCardLike();
        });

        this._deleteBtn.addEventListener('click', () => {
            this._handleCardDelete();
        });

        this._setPhotoPopupListener();
    }
}



