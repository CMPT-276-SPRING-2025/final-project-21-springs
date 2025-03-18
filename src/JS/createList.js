const firebaseConfig = {
    apiKey: "AIzaSyDRM4ILMiIRMFtbEEK38YmZmcRccooIgNk",
    authDomain: "to-duel.firebaseapp.com",
    projectId: "to-duel",
    storageBucket: "to-duel.firebasestorage.app",
    messagingSenderId: "555377689103",
    appId: "1:555377689103:web:5d4b5e8bdd6f6cd8cc597a",
    measurementId: "G-TF1LFSBK0S"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        console.log("User signed in:", user.uid);
    } else {
        // No user is signed in
        console.log("No user signed in.");
        // Redirect to sign-in page or show an error
    }
});

let createListBtn = document.querySelector(".createListBtn");
let joinListBtn = document.querySelector(".joinListBtn");

function generateRandomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

let theName = window.localStorage.getItem("userName");

createListBtn.addEventListener("click", () => {
    let listTitle = document.getElementById("list-name").value.trim();
    let listDescription = document.getElementById("list-description").value.trim();
    let deadline = document.getElementById("list-deadline").value;

    if (!listTitle || !listDescription || !deadline) {
        alert("Please fill in all fields.");
        return;
    }

    const uid = auth.currentUser.uid;
    const joinCode = generateRandomCode();
    db.collection("lists").add({
        owner: uid,
        name: listTitle,
        description: listDescription,
        deadline: deadline,
        joinCode: joinCode,
        members: [theName], // Creator is added as a member
        taskList:[]
    })
    .then(() => {
        // console.log("List created with ID:", docRef.id, "and join code:", joinCode);
        // Optionally, notify the user or redirect them
        window.localStorage.setItem("joinCode", joinCode.trim().toUpperCase());
        setTimeout(() => {
            window.location.href = "list.html";
        }, 500);
        
    })
    .catch(error => {
        console.error("Error creating list:", error);
        alert("Error creating list: " + error.message);
    });
});

