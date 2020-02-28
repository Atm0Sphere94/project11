'use strict'

export default class Api {

    constructor(config) {
        this.cohortId = config.cohortId;
        this.serverUrl = config.serverUrl;
        this.authToken = config.authToken;
    }

    getUserInfo() {
        return fetch((this.serverUrl + this.cohortId + '/users/me'), {
            method: 'GET',
            headers: {
                'authorization': this.authToken,
            },
        })
        .then((res) => {    
            if (!res.ok) {  
              return Promise.reject(`Ошибка: ${res.status}`); 
            }
            return res.json(); 
          })
        
    }

    getCards() {
        return fetch((this.serverUrl + this.cohortId + '/cards'), {
            method: 'GET',
            headers: {
                'authorization': this.authToken,
            }
        })
        .then((res) => {    
            if (!res.ok) {  
              return Promise.reject(`Ошибка: ${res.status}`); 
            }
            return res.json(); 
          });
            
    }

    postCardToServer(name, link) {
        return fetch((this.serverUrl + this.cohortId + '/cards'), {
            method: 'POST',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
        .then((res) => {    
            if (!res.ok) {  
              return Promise.reject(`Ошибка: ${res.status}`); 
            }
            return res.json(); 
          });
           
            

    }

    loadingButtonText(loadingData, submitButton, originalButtonText) {   // accepts boolean, DOM element, string
        if (loadingData) {
            submitButton.textContent = 'Загрузка...';
            submitButton.style.color = 'greenyellow';
        } else {
            submitButton.textContent = originalButtonText;
            submitButton.style.color = 'white';
        }
    }

    updateForm(nameField, infoField) {
        return fetch((this.serverUrl + this.cohortId + '/users/me'), {
            method: 'PATCH',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameField,
                about: infoField,
            }),
        })
        .then((res) => {    
            if (!res.ok) {  
              return Promise.reject(`Ошибка: ${res.status}`); 
            }
            return res.json(); 
          })
       
    }


}

