document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
});

document.getElementById('loginButton').addEventListener('click', function () {
    window.location.href = "../login.html";
});
