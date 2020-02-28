'use strict'

export default class CardList {

    constructor(template, container, api, newCard) {
        this.api = api;
        this.getCards = this.api.getCards;
        this.button = document.forms.new.querySelector('.popup__button');
        this.buttonText = this.button.textContent;
        this.template = template;
        this.form = document.forms.new;
        this.newCard = newCard;
        this.container = container;
    }

    render() {
        this.api.getCards()
        .then( (res) => res.forEach(function (cardItem) {
           
            const anotherCard = newCard(cardItem, this.template, this.api, document.getElementById('picture'));
            anotherCard.create();
            
            this.container.appendChild(anotherCard.card);      
        }.bind(this)))
        .catch( (err) => console.log('Failed to render cards. Reason: ' + err) );
    }

    addCard(event) {
        
        event.preventDefault();
        const customCard = this.newCard({name: this.form.name.value, link: this.form.link.value, likes: [], 
            owner: {id: ''}}, this.template, this.api, this.container);
        customCard.create();
        this.api.postCardToServer(customCard.name, customCard.link)
        /*
            Можно лучше: не нужно при добавлении одной карточки полностью перезапрашивать 
            и перерерисовывать все карточки, в ответ на добавление карточки  сервер
            возвращает данные добавленной карточки нужно просто добавить эту карточку в контейнер
        
        */
        .then( () => this.render())
        .catch( () => console.log('Cannot addCard, error: ' + err) )
        .finally( () => this.api.loadingButtonText(false, this.button, this.buttonText));
    }
}
