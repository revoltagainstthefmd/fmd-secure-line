import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Firebase */
const app = initializeApp({
  apiKey: "AIzaSyAAYzCsDHJvYIN_kblYv7vgCJHB8CkrJl8",
  authDomain: "fmd--chat.firebaseapp.com",
  projectId: "fmd--chat"
});

const db = getFirestore(app);

/* Fake Login */
const USERS = {
  A: "passA",
  B: "passB"
};

let currentUser = null;

/* DOM */
const loginDiv  = document.getElementById("login");
const chatDiv   = document.getElementById("chat");
const userInput = document.getElementById("user");
const pwInput   = document.getElementById("pw");
const errDiv    = document.getElementById("err");
const msgInput  = document.getElementById("msg");
const logDiv    = document.getElementById("log");

/* Login */
window.login = () => {
  const u = userInput.value.trim();
  const p = pwInput.value;

  if (USERS[u] === p) {
    currentUser = u;
    loginDiv.style.display = "none";
    chatDiv.style.display = "flex";
  } else {
    errDiv.textContent = "Wrong login";
  }
};

/* Send message */
window.send = () => {
  if (!msgInput.value.trim() || !currentUser) return;

  addDoc(collection(db, "messages"), {
    user: currentUser,
    text: msgInput.value.trim(),
    time: Date.now()
  });

  msgInput.value = "";
};

/* Receive messages */
onSnapshot(
  query(collection(db, "messages"), orderBy("time")),
  snap => {
    logDiv.innerHTML = "";

    snap.forEach(doc => {
      const m = doc.data();

      const msg = document.createElement("div