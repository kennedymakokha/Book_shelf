import RequestFirebaseNotificationPermission from './../../firebasePemision'
import { getsubscriptionState } from './../redux/actions/notes'
export const subsribe = async (topic) => {
    const fcm = localStorage.getItem('fcm_token')

    if (!fcm) {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                RequestFirebaseNotificationPermission()
                // var notification = new Notification("Hi there!");
            }
        });
    } else {
        const data = {
            topic: `${topic}`,
            fcm_token: fcm,
        }
        const subsriberState = await getsubscriptionState(data)
        return subsriberState

    }

}