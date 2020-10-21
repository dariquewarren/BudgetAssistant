import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBcF0jGmaHAC63ibKFzd-7BsLX-qv0dL1k",
    authDomain: "budgetbuddyapp-a2e68.firebaseapp.com",
    databaseURL: "https://budgetbuddyapp-a2e68.firebaseio.com",
    projectId: "budgetbuddyapp-a2e68",
    storageBucket: "budgetbuddyapp-a2e68.appspot.com",
    messagingSenderId: "898490365481",
    appId: "1:898490365481:web:c2865cd53f3bca37540e38",
    measurementId: "G-0J9RCWE6D1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase

