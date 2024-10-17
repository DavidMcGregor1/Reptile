
const invalidUsernameError = document.getElementById('invalid-username-error-container');
invalidUsernameError.classList.add('hidden');

const userExistsError = document.getElementById('username-exists-error-container');
userExistsError.classList.add('hidden');

const passwordsDoNotMatchError = document.getElementById('passwords-do-not-match-error-container');
passwordsDoNotMatchError.classList.add('hidden');

const fieldCannotBeEmptyError = document.getElementById('field-cannot-be-empty-error-container');
fieldCannotBeEmptyError.classList.add('hidden');

const passwordNotLongEnoughError = document.getElementById('password-not-long-enough-container');
passwordNotLongEnoughError.classList.add('hidden');


document.getElementById('toggle-button').addEventListener('click', function() {

    removeErrorMessageIfExists();

    var formTitle = document.getElementById('form-title');
    var confirmPasswordGroup = document.getElementById('confirm-password-group');
    var submitButton = document.getElementById('submit-button');
    var toggleButton = document.getElementById('toggle-button');

    if (formTitle.textContent === 'Login') {
        formTitle.textContent = 'Sign Up';
        confirmPasswordGroup.style.display = 'block';
        submitButton.textContent = 'Sign Up';
        toggleButton.textContent = 'Login';
    } else {
        formTitle.textContent = 'Login';
        confirmPasswordGroup.style.display = 'none';
        submitButton.textContent = 'Login';
        toggleButton.textContent = 'Sign Up';
    }
});


document.getElementById('submit-button').addEventListener('click', function(event) {
    const formTitle = document.getElementById('form-title');
    event.preventDefault();

    removeErrorMessageIfExists();

    // --------- SIGN UP ----------
    if (formTitle.textContent === 'Sign Up') {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;

        validateCredentials();

        var signUpData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/signup', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log("200 returned");
                try {
                    var response = JSON.parse(xhr.responseText);

                    if (response.success) {
                        console.log("success, should now redirect to a welcome page");
                        window.location.href = '/accountCreated'; // Redirect to a welcome page after successful sign-up
                    } else {
                        if (response.errorType && response.errorType === "USER_ALREADY_EXISTS") {
                            userExistsError.classList.remove('hidden');
                        } else {
                            alert('Sign up failed. Please try again.');
                        }
                    }
                } catch (e) {
                    console.error('Error parsing JSON response:', e);
                    alert('An error occurred. Please try again.');
                }
            } else {
                alert('An error occurred during sign up. Please try again.');
            }
        };

        xhr.send(signUpData);
    }

    // --------- LOGIN ----------
    if (formTitle.textContent === 'Login') {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (username === "" || password === "") {
            fieldCannotBeEmptyError.classList.remove('hidden');
            return;
        }

        var loginData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (xhr.status === 200) {
                if (xhr.responseText === 'success') {
                    console.log("we are in here");
                    window.location.href = '/dashboard';
                } else {
                    invalidUsernameError.classList.remove('hidden');
                }
            }
        };

        xhr.send(loginData);
    }
});

function removeErrorMessageIfExists() {
    if (!invalidUsernameError.classList.contains('hidden')) {
        invalidUsernameError.classList.add('hidden');
    }

    if (!userExistsError.classList.contains('hidden')) {
        userExistsError.classList.add('hidden');
    }

    if (!passwordsDoNotMatchError.classList.contains('hidden')) {
        passwordsDoNotMatchError.classList.add('hidden');
    }

    if (!fieldCannotBeEmptyError.classList.contains('hidden')) {
        fieldCannotBeEmptyError.classList.add('hidden');
    }

    if (!passwordNotLongEnoughError.classList.contains('hidden')) {
        passwordNotLongEnoughError.classList.add('hidden');
    }
}

function validateCredentials() {
    if (username === "" || password === "") {
        fieldCannotBeEmptyError.classList.remove('hidden');
        return;
    }

    if (password !== confirmPassword) {
        passwordsDoNotMatchError.classList.remove('hidden');
        return;
    }

    if (password.length < 8) {
        passwordNotLongEnoughError.classList.remove('hidden');
        return;
    }
}

