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
        console.log("User signed in:", user.uid);
    } else {
        console.log("No user signed in.");
        // Optionally, redirect to sign-in page here.
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let joinCode = window.localStorage.getItem("joinCode");
    console.log("joinCode:", joinCode);

    let listTitle = document.querySelector(".title");
    let listDescription = document.querySelector(".list-description");
    let deadline = document.querySelector(".deadline");
    let members = document.querySelector(".members");
    let joinCodePara = document.querySelector(".joinCodePara");
    joinCodePara.innerText += ` ${joinCode}`;

    if (!joinCode) {
        alert("No join code found. Please try creating or joining a list again.");
        return;
    }

    let listDocId = null;

    db.collection("lists").where("joinCode", "==", joinCode).get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                alert("No list found with that code.");
                return;
            }
            querySnapshot.forEach(doc => {
                const data = doc.data();
                listTitle.innerText = data.name;
                listDescription.innerText += ` ${data.description}`;
                deadline.innerText += ` ${data.deadline}`;
                members.textContent += ` ${data.members.join(', ')}`;
                listDocId = doc.id;
            });
            loadTasks(listDocId);
        })
        .catch(error => {
            console.error("Error querying the list:", error);
            alert("Error querying the list: " + error.message);
        });

    let taskTable = document.querySelector(".taskTable");

    function loadTasks(docId){
        db.collection("lists").doc(docId).get()
        .then(doc => {
            if (doc.exists) {
                let tasks = doc.data().taskList;
                if(tasks && Array.isArray(tasks)) {
                    taskTable.innerHTML = "";
                    tasks.forEach(task => {
                        addTaskRowToUI(task.title, task.description, task.dueDate);
                    });

                }
            }
        })
    }
    
    function addTaskRowToUI(title, description, dueDate) {
        let tRow = document.createElement("tr");
        let tColTitleAndOtherInfo = document.createElement("td");
        let otherInfoWrapper = document.createElement("div");
        let paraTitle = document.createElement("p");
        let markCompleteBtn = document.createElement("button");
        let dropDown = document.createElement("button");

        tColTitleAndOtherInfo.style.display = "flex";
        tColTitleAndOtherInfo.style.justifyContent = "space-between"
        tColTitleAndOtherInfo.style.alignItems = "center"
        paraTitle.textContent = title;
        markCompleteBtn.textContent = "Mark Complete";
        dropDown.textContent = "Details";

        otherInfoWrapper.append(markCompleteBtn,dropDown);
        tColTitleAndOtherInfo.append(paraTitle, otherInfoWrapper);
        tRow.append(tColTitleAndOtherInfo);
        taskTable.append(tRow);

        //calling function for markComplete
        markCompleteBtn.addEventListener("click", () => removeTask(title));
    }

    function removeTask(title) {
        if (!listDocId) {
            console.error("List document ID is missing.");
            return;
        }
    
        db.collection("lists").doc(listDocId).get()
            .then(doc => {
                if (doc.exists) { // <-- Fixed here (removed parentheses)
                    let tasks = doc.data().taskList;
                    let updatedTasks = tasks.filter(task => task.title !== title);
    
                    return db.collection("lists").doc(listDocId).update({
                        taskList: updatedTasks
                    });
                } else {
                    throw new Error("Document does not exist!");
                }
            })
            .then(() => {
                console.log(`Task "${title}" removed successfully.`);
                loadTasks(listDocId);
            })
            .catch(error => {
                console.error("Error removing task:", error);
                alert("Failed to remove task: " + error.message);
            });
    }

    let addTaskBtn = document.querySelector(".addTaskBtn");

    addTaskBtn.addEventListener("click", () => {
        console.log("addTaskBtn clicked");

        let subTaskTitle = document.querySelector(".task-title");
        let subTaskDescription = document.querySelector(".task-desc");
        let subTaskDueDate = document.querySelector(".task-deadline");

        console.log("Task Title:", subTaskTitle.value);
        console.log("Task Description:", subTaskDescription.value);
        console.log("Task Due Date:", subTaskDueDate.value);
        
        if (!subTaskTitle.value || !subTaskDescription.value || !subTaskDueDate.value) {
            alert("Please fill in all task fields.");
            return;
        }

        if (!listDocId) {
            alert("List document not loaded yet. Please try again later.");
            return;
        }

        const newTask = {
            title: subTaskTitle.value,
            description: subTaskDescription.value,
            dueDate: subTaskDueDate.value
        };

        db.collection("lists").doc(listDocId).update({
            taskList: firebase.firestore.FieldValue.arrayUnion(newTask)
        })
        .then(() => {
            console.log("Task added successfully to Firestore.");
            addTaskRowToUI(newTask.title, newTask.description, newTask.dueDate);
            subTaskTitle.value = "";
            subTaskDescription.value = "";
            subTaskDueDate.value = "";
        })
        .catch(error => {
            console.error("Error adding the task details: ", error);
        });
    });
});


//mark complete task function

