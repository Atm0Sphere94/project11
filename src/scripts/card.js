
'use strict'

export default class Card {

    constructor(cardData, template, api, container) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.likes = cardData.likes; //array
        this.id = cardData._id;
        this.ownerId = cardData.owner._id;
        this.template = template;
        this.container = container;
        this.image = this.container.querySelector('.popup__image');
        this.card = this.template.content.cloneNode(true);
        this.cardImage = this.card.querySelector('.place-card__image');
        this.cardName = this.card.querySelector('.place-card__name');
        this.deleteIcon = this.card.querySelector('.place-card__delete-icon');
        this.likedCounter = this.card.querySelector('.place-card__likes');
        this.api = api;
    }

    create() {
        if (this.ownerId === "9b0b2df41acea5a47a376ee6") {     
            this.card.querySelector('.place-card').classList.add('place-card__my-card');     //show trashbin icons on cards I created
        }
        this.likes.forEach( (like) => {
            if (Object.values(like).includes("9b0b2df41acea5a47a376ee6")) {
                this.card.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked'); //show active like icons on cards I liked
            }
        })

        this.cardName.textContent = this.name;
        this.cardImage.style.backgroundImage = `url(${this.link})`;
        this.likedCounter.textContent = this.likes.length;
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
        this.card.querySelector('.place-card__image').addEventListener('click', (event) => {
            if (event.target !== this.deleteIcon) {
                this.openPic();
            }
        });
    }

    like(event) {
        event.target.style.outline = 'none';
        if (!event.target.classList.contains('place-card__like-icon_liked')) {
            event.target.classList.add('place-card__like-icon_liked');
            event.target.firstChild.textContent++;
            this.likes.push(1);
        } else {
            event.target.classList.remove('place-card__like-icon_liked');
            event.target.firstChild.textContent--;
            this.likes.pop();
        }

       
    }

    remove(event) {
        if (window.confirm('Вы уверены, что хотите удалить свою замечательную карточку?')) {
            event.target.closest('.place-card').remove();
        }
    }

    openPic() {
        
        picturePopup.open();
        const cardImageUrl = this.cardImage.style.backgroundImage.slice(4, -1).replace(/"/g, "");
        this.image.setAttribute('src', `${cardImageUrl}`);                      //pass the imape url to popup
    }
}
