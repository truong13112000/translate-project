var functions = require('firebase-functions');

const firebaseConfig = {
    apiKey: "AIzaSyB6dW_5_unt4sQcCXpFaJJaVfWcXJAAfRA",
    authDomain: "mesage-translate.firebaseapp.com",
    databaseURL: "https://mesage-translate-default-rtdb.firebaseio.com",
    projectId: "mesage-translate",
    storageBucket: "mesage-translate.appspot.com",
    messagingSenderId: "950920880499",
    appId: "1:950920880499:web:e68cfc8ab9b8fcedebe506",
    measurementId: "G-YF81BY3S2Y"
  };
  const admin = require('firebase-admin');
 var test =  admin.initializeApp(firebaseConfig);


const request = require('request-promise');
const _ = require('lodash');

var check = test.database();
const LANGUAGES = ['es', 'fr', 'ar'];
check.ref('/translations/{translationId}').set(event => {
  const snapshot = event.data;
  const promises = [];


  _.each(LANGUAGES, (lang) => {
      console.log(lang)
      promises.push(createTranslationPromise(lang, snapshot));
   })

  return Promise.all(promises)

});
// List of output languages.

exports.translate = functions.database.ref('/translations/{translationId}').onWrite(event => {
  const snapshot = event.data;
  const promises = [];


  _.each(LANGUAGES, (lang) => {
      console.log(lang)
      promises.push(createTranslationPromise(lang, snapshot));
   })

  return Promise.all(promises)

});


// URL to the Google Translate API.
function createTranslateUrl(lang, text) {
  return `https://www.googleapis.com/language/translate/v2?key=AIzaSyB6dW_5_unt4sQcCXpFaJJaVfWcXJAAfRA&source=en&target=fr&q=test`;
}

function createTranslationPromise(lang, snapshot) {
  const key = snapshot.key;
  const text = snapshot.val().english;
  let translation = {}

  return request(createTranslateUrl(lang, text), {resolveWithFullResponse: true}).then(
      response => {
        if (response.statusCode === 200) {
          const resData = JSON.parse(response.body).data;


          translation[lang] = resData.translations[0].translatedText

          return admin.database().ref(`/translations/${key}`)
              .update(translation);
        }
        else throw response.body;
      });
}