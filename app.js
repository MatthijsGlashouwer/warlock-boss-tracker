// Simple password-based authentication
const PASSWORD_KEY = 'warlock_password';
const LOGIN_KEY = 'warlock_logged_in';
const NOTES_KEY = 'warlock_boss_notes';
const TODOS_KEY = 'warlock_todos';

// Set default password if not exists (you can change this)
if (!localStorage.getItem(PASSWORD_KEY)) {
    localStorage.setItem(PASSWORD_KEY, 'warlock123'); // Change this to your preferred password
}

function checkLogin() {
    return localStorage.getItem(LOGIN_KEY) === 'true';
}

function setLogin(isLoggedIn) {
    localStorage.setItem(LOGIN_KEY, isLoggedIn.toString());
}

function logout() {
    setLogin(false);
    showLoginScreen();
}

function showLoginScreen() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('app-screen').classList.add('hidden');
    document.getElementById('password').value = '';
}

function showAppScreen() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    loadBossNotes();
    loadTodos();
    setupTodoForm();
    setupTabs();
    setupTotNotes();
}

function loadBossNotes() {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    
    // Set default notes if empty
    if (!notes.jinrokh) {
        notes.jinrokh = "Imp voor zelf dispell, LET OP GEEN ANDEREN DISPELLEN";
    }
    if (!notes.horridon) {
        notes.horridon = "Talent: Kil'jaeden's Cunning dus geen fel flame amigo";
    }
    if (!notes.private) {
        notes.private = `Hit = Exp (15%) > Haste (6637/9778/13737) > Mastery > Haste > Crit

Then put my personal haste rating as 0, only toggle on raid spell haste and copy the percent number for the breakpoint 

I had to use their spell haste breakpoints google sheet on their lock disc
https://docs.google.com/spreadsheets/d/1wumzOUR3Yoij9pjSiP76ZjxXb5xTqihAxuf5uPw4Zzk/edit?gid=497073075#gid=497073075

ahlaundoh: 5100 hit + 6700 haste en 70 er achter?

sac pact + tank pet

https://www.twitch.tv/videos/2556699958?filter=archives&sort=time  HOF+MSV destro
https://www.twitch.tv/videos/2558228514?filter=archives&sort=time ToeS destro
https://www.twitch.tv/ahlaundoh/video/2592048644 @16:06    sb:ss end of berserking in opener

#Focus gateway
/focus [@mouseover,exists][]

#showtooltip Soul Swap
/use [@mouseover,harm,nodead][]soul swap

stayinmytrapm8:i had no clue that you can spam pet follow macro on 2nd boss in hof to drop off from tornado instantly when boss phases

/stopcasting
/stopattack
/petpassive [pet]
/petfollow [pet]

afflicton refresh dots: 
ua and corruption manually, agony met SB+SS
nooit berserking en synapse springs combinen al met DS
eerst wachten tot trinket procs

rotation:
precast soulburn
prepot
haunt
darksoul: misery
soulswap
channel malific grasp
fish for procs
if procs gloves+berserking
SB:SS
channel mf grasp
last second of berserking refresh sb:Ss

niet usen:

#showtooltip Dark Soul
/use 14
/use 10
/cast Blood Fury
/cast Berserking
/cast Dark Soul

#showtooltip
/cast !Fire and Brimstone

Worldboss check macro (copy pastable):
/run for k, v in pairs({ Galleon = 32098, Sha = 32099, Nalak = 32518, Oondasta = 32519, Rukhmar = 37464}) do print(format("%s: %s", k, C_QuestLog.IsQuestFlaggedCompleted(v) and "\\124cff00ff00Yes\\124r" or "\\124cffff0000No\\124r")) end`;
    }
    
    document.getElementById('jinrokh-notes').value = notes.jinrokh || '';
    document.getElementById('horridon-notes').value = notes.horridon || '';
    document.getElementById('private-notes').value = notes.private || '';
    if (document.getElementById('tot-notes')) {
        document.getElementById('tot-notes').value = notes.tot || '';
    }
}

function saveBossNotes() {
    const notes = {
        jinrokh: document.getElementById('jinrokh-notes').value,
        horridon: document.getElementById('horridon-notes').value,
        private: document.getElementById('private-notes').value,
        tot: document.getElementById('tot-notes')?.value || ''
    };
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

// Event listeners
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const storedPassword = localStorage.getItem(PASSWORD_KEY);
    
    if (password === storedPassword) {
        setLogin(true);
        showAppScreen();
    } else {
        alert('Onjuist wachtwoord!');
        document.getElementById('password').value = '';
    }
});

document.getElementById('logout-btn').addEventListener('click', logout);

// Auto-save notes on change
document.getElementById('jinrokh-notes').addEventListener('input', saveBossNotes);
document.getElementById('horridon-notes').addEventListener('input', saveBossNotes);
document.getElementById('private-notes').addEventListener('input', saveBossNotes);

// Tab switching functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

// Setup Tot notes auto-save
function setupTotNotes() {
    const totNotes = document.getElementById('tot-notes');
    if (totNotes) {
        totNotes.addEventListener('input', saveBossNotes);
    }
}

// Todo functionality
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    
    // Add default todo if empty
    if (todos.length === 0) {
        todos.push({
            id: Date.now(),
            text: "Import wa-groep van https://wago.io/qfsQpbCn7 en plaats het Sosam backend stuk in het warlock wa gedeelte",
            completed: false
        });
        saveTodos(todos);
    }
    
    renderTodos(todos);
}

function saveTodos(todos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function renderTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-delete';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function addTodo(text) {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    saveTodos(todos);
    renderTodos(todos);
}

function toggleTodo(id) {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos(todos);
    }
}

function deleteTodo(id) {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    const filtered = todos.filter(t => t.id !== id);
    saveTodos(filtered);
    renderTodos(filtered);
}

// Todo form event listener
function setupTodoForm() {
    const todoForm = document.getElementById('todo-form');
    if (todoForm) {
        // Remove existing listener if any
        const newForm = todoForm.cloneNode(true);
        todoForm.parentNode.replaceChild(newForm, todoForm);
        
        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('todo-input');
            const text = input.value.trim();
            if (text) {
                addTodo(text);
                input.value = '';
            }
        });
    }
}

// Check if already logged in on page load
if (checkLogin()) {
    showAppScreen();
} else {
    showLoginScreen();
}

