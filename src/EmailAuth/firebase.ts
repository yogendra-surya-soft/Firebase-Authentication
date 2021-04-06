import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: 'AIzaSyDSJcjPqKuPTQqTGkFUfVyGmWx20Kook1Q',
    authDomain: 'auth-with-typescript.firebaseapp.com',
    projectId: 'auth-with-typescript',
    storageBucket: 'auth-with-typescript.appspot.com',
    messagingSenderId: '312998692331',
    appId: '1:312998692331:web:ceb68a734c3d5c42b345ae',
    measurementId: 'G-P9EJCBSHYD',
    databaseURL: 'https://project.firebaseio.com'
});

export const auth = app.auth();
export default app;
