[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17799777&assignment_repo_type=AssignmentRepo)

Project Title:<br>
To-Duel

Group Members:<br>

Description:<br>
This website is intended for classmates and will be a to-do list where you can add friends and compete to see who is the most productive. Completeting tasks on time will earn you points and failing to complete a task by the deadline will result in points being deducted. It is important that users competing against each other are working on the same tasks (for example assignments from the same class).

Link to Website: <br>
https://curious-twilight-704a09.netlify.app/

### **Instructions on how to use our website**

### **Homepage: Create or Load a List**

When you first visit the website, you'll be presented with two options:

- **Create a List (1)**
- **Load a List (2)**

You can choose either option depending on whether you want to start a new list or access an existing one.

---

### **1. Creating a New List**

If you choose **Create a List**:

- You will be redirected to a new page where you can set up your to-do list.

**On this page, you’ll need to enter the following details**:

1. **List Name** – Give your to-do list a name.
2. **Start Date** – Set the date when your list or project begins.
3. **Deadline** – Set the date when your tasks or project must be completed.
4. **Dummy Members** – Specify how many dummy members you would like to add to your list.

Once you’ve filled in the necessary details, the website will automatically create your list and generate a dedicated page for it.

---

### **1.1 Your Newly Created List Page**

On your list's page, you will find:

- **Dummy Tasks** – A set of pre-created tasks that you can manage.
- **Dummy Members** – A list of members associated with the project (these are placeholder names for now).

On the right-hand side of the screen, you’ll see key project information that updates automatically, including:

- **Due Date** – The target date for your project.
- **Progress Bar** – Displays the progress of your project as it evolves.
- **Project Age** – Shows how long your project has been running, updated dynamically via the Digi Dates API.

---

### **Leaderboard**

On the yellow board to the right, you'll find a **Leaderboard**. This leaderboard displays the names of the members assigned to your list, showing how each member is performing.

---

### **Managing Tasks**

Below the leaderboard, you'll see a list of dummy tasks. For each task:

1. **Complete a Task** – To mark a task as completed, click the circle next to it.
2. **Assign a Member** – After clicking the circle, type the name of the member who completed the task.

Once you assign a valid member and mark the task as complete, the following will happen:

- **Leaderboard Update**: The member you assigned the task to will receive 10 points added to their total.
- **Task Removal**: The task will disappear from the list once completed.

---

### **2 Loading an Existing List**

If you prefer to **Load a List**, you will be shown three sample lists, each containing dummy data for the project.

- The data for these sample lists is retrieved from the Dummy JSON API

Other than that, everything else is the same as before.
