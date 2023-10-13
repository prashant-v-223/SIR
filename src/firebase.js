import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAbsj_VYpn0MHcUW0DCT0LDAL43FukO70Y",
  authDomain: "svdxv-xcv.firebaseapp.com",
  projectId: "svdxv-xcv",
  storageBucket: "svdxv-xcv.appspot.com",
  messagingSenderId: "30142885691",
  appId: "1:30142885691:web:2ed07926dc08b16e1d111e",
  measurementId: "G-M79VXDMLV2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
