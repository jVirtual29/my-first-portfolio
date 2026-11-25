import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvqjY1rbSmVifOVsVc875CI8flQUJ8MdQ",
  authDomain: "portfolio-80863.firebaseapp.com",
  projectId: "portfolio-80863",
  storageBucket: "portfolio-80863.firebasestorage.app",
  messagingSenderId: "744823531660",
  appId: "1:744823531660:web:e85c240b6da8862a55f3a9",
  measurementId: "G-4BGS11D34S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    await addDoc(collection(db, "messages"), {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      createdAt: serverTimestamp()
    });
    alert("Message sent! Thank you.");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Error: " + err.code + " - " + err.message);
  }

  button.disabled = false;
  button.textContent = "Send ↗";
});
