import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCdvvCOSJ4hnC0XleCvVgpahm3sMUKcmbI',
  authDomain: 'notes-Firebase-f5458.Firebaseapp.com',
  databaseURL: 'https://notes-Firebase-f5458.Firebaseio.com',
  storageBucket: 'notes-Firebase-f5458.appspot.com',
};
Firebase.initializeApp(config);

// Get a reference to the database service
const database = Firebase.database();

module.exports = {

  // get all notes
  fetchNotes: (callback) => {
    database.ref('notes').on('value', (snapshot) => {
      callback(snapshot);
    });
  },

  // get maximum zindex
  fetchZIndex: (callback) => {
    database.ref('zIndex').on('value', (snapshot) => {
      callback(snapshot);
    });
  },

  // update maximum zindex
  updateZIndex: (num) => {
    database.ref('zIndex').child('id').set(num);
  },

  // add new note
  addNote: (note) => {
    const id = database.ref('notes').push().key;
    database.ref('notes').child(id).set(note);
  },

  // remove a note
  removeNote: (id) => {
    database.ref('notes').child(id).remove();
  },

  // update position
  changePosition: (id, x, y) => {
    database.ref('notes').child(id).update({ x, y });
  },

  // update edit status
  changeEdit: (id, isEdit) => {
    database.ref('notes').child(id).update({ isEdit });
  },

  // update text
  changeText: (id, text) => {
    database.ref('notes').child(id).update({ text });
  },

  // update zindex
  changeZ: (id, zIndex) => {
    database.ref('notes').child(id).update({ zIndex });
  },

  // update previous note
  changePrev: (id, prevNote) => {
    database.ref('notes').child(id).update({ prevNote });
  },

};
