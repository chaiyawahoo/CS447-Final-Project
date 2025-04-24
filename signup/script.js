const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

document.getElementById("signup-form").addEventListener("submit", (e) => {
    localStorage.setItem(`user_${username.value}`, password.value);
    window.location.href = "../login/index.html";
});

username.addEventListener("change", (e) => {
    validateUsername();
});

password.addEventListener("change", (e) => {
    validatePassword();
});

confirmPassword.addEventListener("keyup", (e) => {
    validatePassword();
});

function validatePassword() {
    confirmPassword.setCustomValidity(password.value == confirmPassword.value ? "" : "Passwords must match.");
}

function validateUsername() {
    let userInStorage = localStorage.getItem(`user_${username.value}`);
    username.setCustomValidity(userInStorage ? "Username taken." : "");
}