

import {
    userRegisterReducer,
    userSigninReducer,
    userDetailsReducer,
    usersReducer,
    // userUpdateProfileReducer
} from './../reducers/userReducers';
import notesReducer from './../reducers/notes'
import conversationReducer from './../reducers/conversation'
import messageReducer from './../reducers/messages'
import typeReducer from './../reducers/types'
import instiReducer from './../reducers/instituition'
import levelReducer from './../reducers/level'
import areaReducer from './../reducers/area'
import blogReducer from './../reducers/blog'
import quizReducer from './../reducers/questions'
import commentReducer from './../reducers/comments'
import subscriptionsReducer from './../reducers/subscription'
const baseReduce = {

    userSignin: userSigninReducer,
    notesData: notesReducer,
    userRegister: userRegisterReducer,
    convoData: conversationReducer,
    messageData: messageReducer,
    userDetails: userDetailsReducer,
    typesData: typeReducer,
    instituitionData: instiReducer,
    levelData: levelReducer,
    areaData: areaReducer,
    usersData: usersReducer,
    blogsData: blogReducer,
    quizData: quizReducer,
    commentsData: commentReducer,
    subscriptionsData: subscriptionsReducer
    // userUpdateProfile: userUpdateProfileReducer,
}

export default baseReduce