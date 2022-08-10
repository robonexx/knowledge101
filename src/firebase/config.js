import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_TIMELINE_KEY,
  authDomain: 'streetknowledge-101.firebaseapp.com',
  projectId: 'streetknowledge-101',
  storageBucket: 'streetknowledge-101.appspot.com',
  messagingSenderId: process.env.REACT_APP_MSG_SENDER,
  appId: process.env.REACT_APP_APP_ID,
};

// initialize app
firebase.initializeApp(firebaseConfig);

// initialize firestore
const projectFirestore = firebase.firestore();

// auth
const projectAuth = firebase.auth();

// storage
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
