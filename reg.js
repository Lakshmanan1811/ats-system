import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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

const app = initializeApp(firebaseConfig);
//const db = firebase.firestore();
const auth = getAuth();

//getting all the object from the HTML
var email = document.getElementById("email");
var password = document.getElementById("password");
//making function for storing data
window.signup = function (e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      window.location.replace("anlogin.html");
      // console.log(success.user.uid)
      alert("signup successfully");
    })
    .catch(function (err) {
      alert("Error in " + err);
    });
  console.log();
  console.log(obj);
};

// document.addEventListener("DOMContentLoaded", function () {
//   const registerForm = document.getElementById("registerDB");

//   registerForm.addEventListener("submit", function (e) {
//     e.preventDefault(); // Prevent the form from submitting normally

//     // Get input values
//     const name = document.getElementById("name").value;
//     const username = document.getElementById("uname").value;
//     const email = document.getElementById("email").value;
//     const phoneNumber = document.getElementById("phno").value;
//     const password = document.getElementById("password").value;
//     const dob = document.getElementById("dob").value;
//     const age = document.getElementById("age").value;
//     const college = document.getElementById("college").value;
//     const cgpa = document.getElementById("cgpa").value;
//     const graduationYear = document.getElementById("graduation-year").value;
//     const educationGap = document.getElementById("education-gap").value;
//     const degree = document.getElementById("degree").value; // Make sure you add 'id="degree"' to the respective input
//     const branch = document.getElementById("branch").value; // Make sure you add 'id="branch"' to the respective input
//     const education12 = document.getElementById("education-12").value;
//     const education10 = document.getElementById("education-10").value;
//     const gender = document.querySelector('input[name="gender"]:checked')
//       .nextElementSibling.textContent;

// Assuming you have initialized Firebase properly

// //email authentication

// document.getElementById("submit").addEventListener("click", function () {
//   var email = document.getElementById("email").value;
//   console.log(email);
//   var password = document.getElementById("password").value;
//   console.log(password);
//   //For new registration
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log(user);
//       alert("Registration successfully!!");
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//       console.log(errorMessage);
//       alert(error);
//     });
// });

// Insert the data into Firebase
// db.collection("users")
//   .add({
//     name: name,
//     username: username,
//     email: email,
//     phoneNumber: phoneNumber,
//     password: password,
//     dob: dob,
//     age: age,
//     college: college,
//     cgpa: cgpa,
//     graduationYear: graduationYear,
//     educationGap: educationGap,
//     degree: degree,
//     branch: branch,
//     education12: education12,
//     education10: education10,
//     gender: gender,
//   })
//   .then(function (docRef) {
//     console.log("Document written with ID: ", docRef.id);
//     window.location.href = "anlogin.html";

//     // You can redirect or show a success message here
//   })
//   .catch(function (error) {
//     console.error("Error adding document: ", error);
//     // Handle error here
//   });
