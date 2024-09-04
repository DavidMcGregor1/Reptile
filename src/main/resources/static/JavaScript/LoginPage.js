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
