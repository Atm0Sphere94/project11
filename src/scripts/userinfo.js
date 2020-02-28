'use strict'

export default class UserInfo {

    constructor(form, api) {
        this.api = api;
        this.form = form;
        this.nameField = form.name;
        this.infoField = form.info;
        this.button = form.querySelector('.popup__button');
        this.buttonText = this.button.textContent;
        this.name = document.querySelector('.user-info__name');
        this.info = document.querySelector('.user-info__job');
        this.avatar = document.querySelector('.user-info__photo');



    
    }

    setUserInfo(event) {
        event.preventDefault();
        this.api.updateForm(this.nameField.value, this.infoField.value)
        .then(() => {
            this.updateUserInfo();
            editPopup.close(event);
        })    
        .catch( (err) => console.log('Could not update set data. Reason: ' + err) );
        
    }

    updateUserInfo() {
        this.name.textContent = this.nameField.value;
        this.info.textContent = this.infoField.value;

    }
    loadUserInfo() {
        this.api.getUserInfo()
            .then( (res) => {
                this.avatar.style.backgroundImage = `url(${res.avatar})`;
                this.name.textContent = res.name;
                this.info.textContent = res.about;
            })
            .catch( (err) => console.log('Could not update user data. Reason: ' + err) )  
    }
}


