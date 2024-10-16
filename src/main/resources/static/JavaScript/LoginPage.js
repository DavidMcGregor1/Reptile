document.getElementById('toggle-button').addEventListener('click', function() {
    var formTitle = document.getElementById('form-title');
    var confirmPasswordGroup = document.getElementById('confirm-password-group');
    var submitButton = document.getElementById('submit-button');
    var toggleButton = document.getElementById('toggle-button');

    if (formTitle.textContent === 'Login') {
        // Switch to Sign Up
        formTitle.textContent = 'Sign Up';
        confirmPasswordGroup.style.display = 'block';
        submitButton.textContent = 'Sign Up';
        toggleButton.textContent = 'Login';
    } else {
        // Switch to Login
        formTitle.textContent = 'Login';
        confirmPasswordGroup.style.display = 'none';
        submitButton.textContent = 'Login';
        toggleButton.textContent = 'Sign Up';
    }
});

document.getElementById('login-form').addEventListener('click', function(event) {
    console.log('login-form');
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var loginData = {
        username: username,
        password: password
    };

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            window.location.href = '/dashboard';
        } else {
            alert('Invalid username or password');
        }
    };


}
