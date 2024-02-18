import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig: Object = {
  apiKey: "AIzaSyBt-fCIdfJToklc6Te3zzpBU13AJsm7_zc",
  authDomain: "socialize-dedf3.firebaseapp.com",
  projectId: "socialize-dedf3",
  storageBucket: "socialize-dedf3.appspot.com",
  messagingSenderId: "199428271704",
  appId: "1:199428271704:web:660cfb9d95dcfbad3ae42d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
