export default class Card {
    constructor({data, templateSelector, handleCardClick, userId, handleLike, handleDeletion}) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._handleLike = handleLike;
        this._handleDeletion = handleDeletion;
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

        this._likesNumber = this._element.querySelector('.gallery__like-counter');
        this._likeBtn = this._element.querySelector('.gallery__like-button');
        this._deleteBtn = this._element.querySelector('.gallery__delete-button');

        this._setListenersOnPhotoCard();
        this._hasDeleteBtn();
        this.setLikeCounter(this._likes);

        return this._element;
    }

    _hasDeleteBtn() {
        if (this._ownerId !== this._userId) {
            this._deleteBtn.remove();
        }
    }

    handleCardDelete() {
        this._element.remove();
        this._element = null;
    }

    isCardLiked() {
        const likedCard = this._likes.some((user) => {
            return user._id === this._userId
        });
        return likedCard;
    }

    setLikeCounter(newLikes) {
        this._likes = newLikes;
        this._likesNumber.textContent = this._likes.length;

        if(this.isCardLiked()) {
            this._likeBtn.classList.add('gallery__like-button_active');
        } else {
            this._likeBtn.classList.remove('gallery__like-button_active');
        }
    }

    _setPhotoPopupListener() {
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _setListenersOnPhotoCard() {
        this._likeBtn.addEventListener('click', () => {
            this._handleLike(this._cardId);
        });

        this._deleteBtn.addEventListener('click', () => {
            this._handleDeletion(this._cardId);
        });

        this._setPhotoPopupListener();
    }
}