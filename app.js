// Simple password-based authentication
const PASSWORD_KEY = 'warlock_password';
const LOGIN_KEY = 'warlock_logged_in';
const NOTES_KEY = 'warlock_boss_notes';

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
    
    document.getElementById('jinrokh-notes').value = notes.jinrokh || '';
    document.getElementById('horridon-notes').value = notes.horridon || '';
}

function saveBossNotes() {
    const notes = {
        jinrokh: document.getElementById('jinrokh-notes').value,
        horridon: document.getElementById('horridon-notes').value
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

// Check if already logged in on page load
if (checkLogin()) {
    showAppScreen();
} else {
    showLoginScreen();
}

