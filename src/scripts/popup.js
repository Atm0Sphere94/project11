'use strict'


export default class Popup {

    constructor(popupElement) {
        this.popupElement = popupElement;
        this.closeButton = popupElement.querySelector('.popup__close');
        this.picturePopup = document.getElementById('picture');
        this.removeImage = () => {
            if (this.popupElement === this.picturePopup) {
                this.popupElement.querySelector('.popup__image').removeAttribute('src');
            }
        }
    }

    open() {
        this.popupElement.classList.add('popup_is-opened');
        this.popupElement.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this.close.bind(this));
    }

    close(event) {
        const self = this;
        const closeHandler = () => {
            this.popupElement.classList.remove('popup_is-opened');
            this.removeImage.bind(this);
            this.popupElement.removeEventListener('click', this.close);
            document.removeEventListener('keydown', this.close);
        }
        if (event.type === 'keydown' && event.key === 'Escape') {
            closeHandler();
        } else if (event.type === 'click') {
            if (event.target.closest('.popup__content') === null || event.target === self.closeButton) { //handles clicks
                closeHandler();
            }
        } else if (event.type === 'submit') {
            closeHandler();
        }
    } 
}   


export class Form extends Popup {

    constructor(popupElement, validator, container, api) {
        super(popupElement);
        this.api = api;
        this.form = this.popupElement.querySelector('.popup__form');
        this.submitButton = this.form.querySelector('.popup__button');
        this.validity = validator;
        this.userInfo = userInfo(this.form, this.api);
        this.checkInput = (event) => this.validity.checkInputValidity(event);
        this.setButton = () => this.validity.setSubmitButtonState();
        this.addCardOrInfo = (event) => {
            event.preventDefault();
            if (!this.submitButton.hasAttribute('disabled')) {
                if (this.form === document.forms.new) {
                    this.container.addCard(event);
                    this.close(event);
                    this.submitButton.setAttribute('disabled', '');
                } else if (this.form === document.forms.editinfo)
                 {
                    this.userInfo.setUserInfo(event);
                }
            }
        }
        this.handlers = {
            checkInput: this.checkInput.bind(this),
            setButton: this.setButton.bind(this),
            addCardOrInfo: this.addCardOrInfo,
        };
        this.container = container;
    }

    open() {
        super.open();
        this.formReset();
        this.formInitialize();
    }

    close(event) {
        super.close(event);
        if (event.target.closest('.popup__content') === null || event.target === this.closeButton) {
            this.formReset();
        }
        this.form.removeEventListener('input', this.checkInput);
        this.form.removeEventListener('keyup', this.setButton);
        this.form.removeEventListener('submit', this.handlers.addCardOrInfo);
        //this.form.querySelector('.popup__button').setAttribute('disabled', '');
    }

    formReset() {
        this.form.reset();
        this.submitButton.setAttribute('disabled', '');
        Array.from(this.form.querySelectorAll('.popup__input-error')).forEach( (element) =>
            element.textContent = '');
    }

    formInitialize() {
        if (this.form === document.forms.editinfo) {
            const userName = document.querySelector('.user-info__name');
            const userJob = document.querySelector('.user-info__job');
            this.form.name.value = userName.textContent; 
            this.form.info.value = userJob.textContent;
            this.setButton();
        }
        this.form.addEventListener('input', this.handlers.checkInput);
        this.form.addEventListener('keyup', this.handlers.setButton);
        this.form.addEventListener('submit', this.handlers.addCardOrInfo.bind(this));
    }
}
