'use strict'

export default class CardList {

    constructor(template, container, api, newCard) {
        this.api = api;
        this.getCards = this.api.getCards;
        this.newCard = newCard;
        this.button = document.forms.new.querySelector('.popup__button');
        this.buttonText = this.button.textContent;
        this.template = template;
        this.form = document.forms.new;
        this.container = container;
        this.picture = document.getElementById('picture');
    }

    render() {
        this.api.getCards()
        .then( (res) => res.forEach(function (cardItem) {
            const anotherCard = this.newCard (cardItem, this.template, this.api, this.picture);
            anotherCard.create();
            this.container.appendChild(anotherCard.card);      
        }.bind(this)))
        .catch( (err) => console.log('Failed to render cards. Reason: ' + err) );
    }

    addCard(event, err) {
        
        event.preventDefault();
        const customCard = this.newCard({name: this.form.name.value, link: this.form.link.value, likes: [], 
            owner: {id: ''}}, this.template, this.api, this.container);
        customCard.create();
        this.api.postCardToServer(customCard.name, customCard.link)
        
        .then( () => this.render())
        .catch( () => console.log('Cannot addCard, error: ' + err) )
        .finally( () => this.api.loadingButtonText(false, this.button, this.buttonText));
    }
}
