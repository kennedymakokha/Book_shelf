import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging";

const config = {
    apiKey: "AIzaSyBzU33MRIvBsZQyU9z69h1J3wowX6g8uik",
    authDomain: "learnnia-3475a.firebaseapp.com",
    projectId: "learnnia-3475a",
    storageBucket: "learnnia-3475a.appspot.com",
    messagingSenderId: "805799477333",
    appId: "1:805799477333:web:a8f6adb0763d8973b994dc",
    measurementId: "G-52X0JP6KQJ"
};

const app = initializeApp(config);
console.log(app)
const messaging = getMessaging();

// next block of code goes here
export const requestFirebaseNotificationPermission = () => {
    
    getToken(messaging, { vapidKey: 'BFYmSXrfpolQhl_RRvK_ghvETE5YiPm347mdNwlZLdSWQ8Q4ad76IL7-iCMYVKfDkKZWS42tWfA79oabKah4ifo' }).then((currentToken) => {
       
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
           alert(currentToken)
            localStorage.setItem('fcm_token', `${currentToken}`);
            // ...
        } else {
            // Show permission request UI
            alert('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        // alert('An error occurred while retrieving token. ', err);
        alert(err)
        // ...
    });

}


export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });