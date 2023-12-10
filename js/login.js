function submitForm() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    console.log(username, password);
    const your_username = "mohamedgamal";
    const your_password = "123456789";
    console.log(your_username, your_password);

    // Add your login logic here
    if (username === your_username && password === your_password) {
        loginMessage.textContent = 'Login successful!';
        window.location.href = '../index.html';
        loginMessage.style.color = '#4dbf00';
    } else {
        loginMessage.textContent = 'Invalid username or password. Please try again.';
        loginMessage.style.color = '#ff0000'; // 
    }
}
function signUp() {
    window.location.href = '../sign-up.html';
}
