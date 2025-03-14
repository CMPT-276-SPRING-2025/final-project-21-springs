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


let signInBtn = document.querySelector(".signIn");
let signUpBtn = document.querySelector(".signUp");

signInBtn.addEventListener("click", () => {
    const email = document.querySelector(".userEmail").value;
    const password = document.querySelector(".userPassword").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(()=>{
            window.location.href = "create-List.html"; // The page is not yet implemented
        })
        .catch(error => alert(error.message));
    
    console.log("Everything went fine")
});

signUpBtn.addEventListener("click", () => {
    const userName = document.querySelector(".userName").value;
    const userEmail = document.querySelector(".userEmail").value;
    const userPassword = document.querySelector(".userPassword").value;

    auth.createUserWithEmailAndPassword(userEmail, userPassword)
        .then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                name: userName,
                points: 0
            });
        })
        .then(() => {
            window.location.href = "create-List.html";
        })
        .catch(error => alert(error.message));
});

