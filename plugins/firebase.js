import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDN5908J0FOM-CwnqX0l931HjWQOqkwh6A',
    authDomain: 'conta-1-9e105.firebaseapp.com',
    databaseURL: 'https://conta-1-9e105.firebaseio.com',
    projectId: 'conta-1-9e105',
    storageBucket: 'conta-1-9e105.appspot.com',
    messagingSenderId: '755187900920'
  })
}

const fireDb = firebase.firestore()

export { fireDb }
