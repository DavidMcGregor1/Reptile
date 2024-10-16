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

const errorElement = document.getElementById('loginError');
errorElement.classList.add('hidden');

document.getElementById('submit-button').addEventListener('click', function(event) {
    const formTitle = document.getElementById('form-title');
    event.preventDefault();

    // --------- SIGN UP ----------

    if (formTitle.textContent === 'Sign Up') {
        console.log("here")
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        console.log(username, password, confirmPassword)

        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }

        var signUpData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/signup', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        console.log("200 returned")
                        if (xhr.responseText === 'success') {
                        console.log("success, should now redirect to a welcome page")
                            window.location.href = '/accountCreated'; // Redirect to a welcome page after successful sign-up
                        } else {
                            alert('Sign up failed. Please try again.');
                        }
                    }
                };
                console.log("about to send: ", signUpData)
                xhr.send(signUpData); // Send signup data
    }

    if (formTitle.textContent === 'Login') {


    // --------- LOGIN ----------

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        var loginData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (xhr.status === 200) {
                if (xhr.responseText === 'success') {
                    console.log("we are in here")
                    window.location.href = '/dashboard';
                } else {
                    errorElement.classList.remove('hidden');
                }
            }
        };
     xhr.send(loginData);

   }
});

