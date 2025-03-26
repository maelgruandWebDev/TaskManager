// Sélection des éléments du DOM
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const validateBtn = document.getElementById('valider');
const message = document.getElementById('msg');
const profileSect = document.getElementById('profile-sect');

const tasksDiv = document.getElementById('tasks');
const seeKanbanBtn = document.getElementById('seeKanban');
const seeTableBtn = document.getElementById('seeTable');

// Objet pour stocker les informations utilisateur
const user = {
    name: '',
    email: ''
};

// Fonction de validation des informations utilisateur
function validateUser() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === '' || email === '') {
        message.innerText = "Erreur : veuillez remplir tous les champs.";
        message.style.color = "red";
        return;
    }

    user.name = name;
    user.email = email;

    message.innerText = `Connexion réussie. Bienvenue, ${user.name} !`;
    message.style.color = "green";

    displayProfile();
}

// Affichage dynamique du profil utilisateur
function displayProfile() {
    profileSect.innerHTML = `
        <h3>Profil Utilisateur</h3>
        <p>Nom : ${user.name}</p>
        <p>Email : ${user.email}</p>
        <div>
            <input type="text" id="task-input" placeholder="Nouvelle tâche">
            <button id="add-task">Ajouter Tâche</button>
        </div>
    `;

    // Activation de l'ajout de tâches une fois l'utilisateur validé
    const addTaskBtn = document.getElementById('add-task');
    addTaskBtn.addEventListener('click', addTask);
}

// Tableau pour stocker les tâches (vide par défaut)
const tasks = [];

// Fonction pour afficher les tâches en vue Kanban
function displayTasks(view) {
    tasksDiv.innerHTML = ""; // Réinitialisation des tâches

    if (view === "kanban") {
        let kanbanHTML = "<div class='kanban'>";
        tasks.forEach((task, index) => {
            kanbanHTML += `
                <div class='task-card' data-index="${index}">
                    ${task}
                    <button class="delete-task">Supprimer</button>
                    <button class="modify-task">Modifier</button>
                </div>`;
        });
        kanbanHTML += "</div>";
        tasksDiv.innerHTML = kanbanHTML;

        // Ajout des événements de suppression pour chaque tâche
        const deleteBtns = document.querySelectorAll('.delete-task');
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                const index = e.target.closest('.task-card').getAttribute('data-index');
                deleteTask(index);
            });
        });

        // Ajout des événements de modification pour chaque tâche
        const modifyBtns = document.querySelectorAll('.modify-task');
        modifyBtns.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                const index = e.target.closest('.task-card').getAttribute('data-index');
                modifyTask(index);
            });
        });
    }

    if (view === "table") {
        let tableHTML = "<table><tr><th>Tâche</th><th>Action</th><th>Modifier</th></tr>";
        tasks.forEach((task, index) => {
            tableHTML += `
                <tr data-index="${index}">
                    <td>${task}</td>
                    <td><button class="delete-task">Supprimer</button></td>
                    <td><button class="modify">Modifier</button></td>
                </tr>`;
        });
        tableHTML += "</table>";
        tasksDiv.innerHTML = tableHTML;

        // Ajout des événements de suppression pour chaque tâche dans le tableau
        const deleteBtns = document.querySelectorAll('.delete-task');
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                const index = e.target.closest('tr').getAttribute('data-index');
                deleteTask(index);
            });
        });
        
        // Ajout des événements de modification pour chaque tâche dans le tableau
        const modifyBtns = document.querySelectorAll('.modify');
        modifyBtns.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                const index = e.target.closest('tr').getAttribute('data-index');
                modifyTask(index);
            });
        });
    }
}

// Fonction pour ajouter une tâche
function addTask() {
    const taskInput = document.getElementById('task-input');
    const newTask = taskInput.value.trim();

    if (newTask !== '') {
        tasks.push(newTask);
        taskInput.value = '';
        displayTasks("kanban"); // On affiche par défaut en Kanban
    } else {
        alert("Veuillez entrer une tâche valide.");
    }
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks("kanban");
}

// Fonction pour modifier une tâche
function modifyTask(index) {
    const newTask = prompt("Modifiez la tâche :", tasks[index]);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        displayTasks("kanban");  // Mettre à jour la vue Kanban
        displayTasks("table");   // Mettre à jour la vue Table
    }
}

// Écouteurs d'événements pour le changement de vue
seeKanbanBtn.addEventListener("click", () => displayTasks("kanban"));
seeTableBtn.addEventListener("click", () => displayTasks("table"));
validateBtn.addEventListener("click", validateUser);
