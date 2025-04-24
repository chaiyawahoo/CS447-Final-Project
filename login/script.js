const username = document.getElementById("username");
const password = document.getElementById("password");

document.getElementById("login-form").addEventListener("submit", (e) => {
    localStorage.setItem("current_user", username.value);
    window.location.href = "../home/index.html";
});

username.addEventListener("change", (e) => {
    validateUsername();
});

password.addEventListener("change", (e) => {
    validatePassword();
});

function validateUsername() {
    let userInStorage = localStorage.getItem(`user_${username.value}`);
    username.setCustomValidity(userInStorage ? "" : "User not found.");
}

function validatePassword() {
    let passwordInStorage = localStorage.getItem(`user_${username.value}`);
    password.setCustomValidity(passwordInStorage === password.value ? "" : "Incorrect password.");
}