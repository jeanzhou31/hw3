import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCdvvCOSJ4hnC0XleCvVgpahm3sMUKcmbI',
  authDomain: 'notes-firebase-f5458.firebaseapp.com',
  databaseURL: 'https://notes-firebase-f5458.firebaseio.com',
  storageBucket: 'notes-firebase-f5458.appspot.com',
};
firebase.initializeApp(config);


// Get a reference to the database service
const database = firebase.database();
