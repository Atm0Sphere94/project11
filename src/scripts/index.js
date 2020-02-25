
import '../pages/index.css';
import './script.js';
import formValidator from './formvalidator.js';
import Card from './card.js';


//variables
const authData = {cohortId: 'cohort7',
                  serverUrl: NODE_ENV === 'development' ? 'http://praktikum.tk/' : 'https://praktikum.tk/',
                  authToken: '7758ef97-2052-4276-8215-8b9f07625725',
                };

const cardContainer = document.querySelector('.places-list');
const openEditFormButton = document.querySelector('.profile__edit-button');
const openPlaceFormButton = document.querySelector('.user-info__button');

//event listeners

openEditFormButton.addEventListener('click', () => {
  editPopup.open();
});
openPlaceFormButton.addEventListener('click', () => {
  placePopup.open();
});

//functions
const userInfo = (form, api) => new UserInfo(form, api);
const newCard = (cardData, template, api, container) => new Card(cardData, template, api, container);
const formValidator = (form) => new FormValidator(form);

//initializing class instances

const mestoApi = new Api(authData);
const cardList = new CardList(document.getElementById('card-sample'), cardContainer, mestoApi);
const editPopup = new Form(document.getElementById('edit'), formValidator(document.forms.editinfo), cardList, mestoApi);
const placePopup = new Form(document.getElementById('newplace'), formValidator(document.forms.new), cardList, mestoApi);
const picturePopup = new Popup(document.getElementById('picture'));
const currentUserInfo = userInfo(document.forms.editinfo, mestoApi);

//function calls
currentUserInfo.loadUserInfo();
cardList.render();
