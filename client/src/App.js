
import './components/css/index.css';
import './components/css/style.css'
import Home from './components/landing'
import { useEffect } from 'react';
import { io } from 'socket.io-client'
// import { getToken, onMessageListener } from 'firebase';
import Chat from './components/chat'
import { addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import Bookdetail from './components/bookdetail'
import About from './components/about'
import Err from './components/error'
import AdminDashboard from './components/admin/index'
import Err500 from './components/err500'
import Admincat from './components/admin/tables'
import Notes from './components/admin/content-creators/notes'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Blogs from './components/blogs';
import BlogDetail from './components/blogDetail';
// import RequestFirebaseNotificationPermission from './firebasePemision';
import Contact from './components/contact';

function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))


  // function notifyMe() {
  //   // Let's check if the browser supports notifications
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   }

  //   // Let's check whether notification permissions have already been granted
  //   else if (Notification.permission === "granted") {
  //     // If it's okay let's create a notification
  //     RequestFirebaseNotificationPermission()
  //   }

  //   // Otherwise, we need to ask the user for permission
  //   else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(function (permission) {
  //       // If the user accepts, let's create a notification
  //       if (permission === "granted") {
  //         RequestFirebaseNotificationPermission()
  //         // var notification = new Notification("Hi there!");
  //       }
  //     });
  //   }

  //   // At last, if the user has denied notifications, and you
  //   // want to be respectful there is no need to bother them any more.
  // }


  // const handleUserMessage = (newMessage) => {
  //   socket.emit("sent-message", `${userInfo ? userInfo.email : "Annonymous"} /n ${newMessage}`)
  //   socket.on("recieve-message", Message => {
  //     addResponseMessage(Message)
  //   })

  // }
  useEffect(() => {
    // setShow(true);
  }, [])
  // useEffect(() => {
  //   // requestFirebaseNotificationPermission()
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   } else {
  //     // notifyMe()
  //   }
  // }, [])
  // useEffect(() => {
  //   addResponseMessage('Welcome to Learnnia how can i be of help!');

  // }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact > <Home /></Route>
        <Route path="/notes/:id" exact > <Bookdetail /></Route>
        <Route path="/blogs" exact > <Blogs /></Route>
        <Route path="/about-us" exact > <About /></Route>
        <Route path="/contact-us" exact > <Contact /></Route>
        <Route path="/blogs/:id" exact > <BlogDetail /></Route>
        <Route path="/server-error" exact > <Err500 /></Route>
        <Route path="/forums" exact ><Chat /> </Route>
        <Route path="/admin/dashboard" exact >{userInfo && userInfo.isAdmin ? <AdminDashboard /> : <Redirect to="/" />}</Route>
        <Route path="/admin/:category" exact >{userInfo && userInfo.isAdmin ? <Admincat /> : <Redirect to="/" />}</Route>
        <Route path="/content-creator/my-content" exact >{userInfo && userInfo.cc ? <Notes /> : <Redirect to="/" />}</Route>
        <Route component={Err}></Route>
      </Switch>
      {/* {userInfo && userInfo.cc || userInfo && userInfo.isAdmin ? null : <Widget handleNewUserMessage={handleUserMessage}
        profileAvatar={logo}
        title="Learnnia  assistance"
        // subtitle="Hit my inbox "
        emojis={true}
      />} */}
    </BrowserRouter>
  );
}

export default App;
