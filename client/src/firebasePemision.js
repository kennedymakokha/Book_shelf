// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzU33MRIvBsZQyU9z69h1J3wowX6g8uik",
  authDomain: "learnnia-3475a.firebaseapp.com",
  projectId: "learnnia-3475a",
  storageBucket: "learnnia-3475a.appspot.com",
  messagingSenderId: "805799477333",
  appId: "1:805799477333:web:a8f6adb0763d8973b994dc",
  measurementId: "G-52X0JP6KQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
const messaging = getMessaging();

export const RequestFirebaseNotificationPermission = async () => {

    getToken(messaging, { vapidKey: 'BFYmSXrfpolQhl_RRvK_ghvETE5YiPm347mdNwlZLdSWQ8Q4ad76IL7-iCMYVKfDkKZWS42tWfA79oabKah4ifo' }).then((currentToken) => {
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
            console.log(currentToken)
            localStorage.setItem('fcm_token', `${currentToken}`);
            // ...
        } else {
            // Show permission request UI
            alert('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        // alert('An error occurred while retrieving token. ', err);
        // alert(err)
        // ...
    });

}


export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });
export default RequestFirebaseNotificationPermission