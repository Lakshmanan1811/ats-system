// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEVXNX8AVWSUNBubFItcXK1ZxAixx3aEE",
  authDomain: "axis-bankproject.firebaseapp.com",
  databaseURL: "https://axis-bankproject-default-rtdb.firebaseio.com",
  projectId: "axis-bankproject",
  storageBucket: "axis-bankproject.appspot.com",
  messagingSenderId: "837146426300",
  appId: "1:837146426300:web:bf154f6447885a822ec9b9",
  measurementId: "G-GMPG65FHR6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");
window.login = function (e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      alert("logined Successfully");
      var aaaa = success.user.uid;
      localStorage.setItem("uid", aaaa);
      console.log(aaaa);

      window.location.replace("landing-page.html");
      // localStorage.setItem(success,user,uid)
    })
    .catch(function (err) {
      alert("login error" + err);
    });

  console.log(obj);
};
