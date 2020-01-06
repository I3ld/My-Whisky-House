function validateForm() {
    var email = document.forms["myForm"]["email"];
    var password = document.forms["myForm"]["psw"];
    var passwordRepeat = document.forms["myForm"]["psw-repeat"];
    var firstName = document.forms["myForm"]["first_name"];
    var lastName = document.forms["myForm"]["last_name"];
    var picturePath = document.forms["myForm"]["picturePath"];

    var errorsTab = "";

    //email
    if (email.value == "" || (email.value).match(/^\s+$/)) {
        email.setCustomValidity("Email invalid!");
        email.style.borderColor = "red";
        email.style.borderWidth = "thick";
        errorsTab += "Email cannot be empty! <br />";
    } else {
        email.style.borderColor = "green";
        email.setCustomValidity('');
    }

    //password
    if (password.value == "" || (password.value).match(/^\s+$/)) {
        password.setCustomValidity("Password invalid!");
        password.style.borderColor = "red";
        password.style.borderWidth = "thick";
        errorsTab += "Password cannot be empty! <br />";
    } else {
        password.style.borderColor = "green";
        password.style.borderWidth = "thick";
        password.setCustomValidity('');
    }

    if (!(password.value).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")) {
        password.setCustomValidity("Password invalid!");
        password.style.borderColor = "red";
        password.style.borderWidth = "thick";
        errorsTab += "Password regex invalid!(must: 1 lowercase, 1 uppercase, 1 numeric, special character, length > 8) <br />";
    } else {
        password.style.borderColor = "green";
        password.style.borderWidth = "thick";
        password.setCustomValidity('');
    }

    //password-rpeat
    if (passwordRepeat.value == "" || (passwordRepeat.value).match(/^\s+$/)) {
        passwordRepeat.setCustomValidity("Password repeat invalid!");
        passwordRepeat.style.borderColor = "red";
        passwordRepeat.style.borderWidth = "thick";
        errorsTab += "Password repeat cannot be empty! <br />";
    } else {
        passwordRepeat.style.borderColor = "green";
        passwordRepeat.style.borderWidth = "thick";
        passwordRepeat.setCustomValidity('');
    }

    if (!(passwordRepeat.value).match(password.value)) {
        passwordRepeat.setCustomValidity("Password repeat invalid!");
        passwordRepeat.style.borderColor = "red";
        passwordRepeat.style.borderWidth = "thick";
        errorsTab += "Password and password repeat are not the same! <br />";
    } else {
        passwordRepeat.style.borderColor = "green";
        passwordRepeat.style.borderWidth = "thick";
        passwordRepeat.setCustomValidity('');
    }

    //picturePath
    if (picturePath.value == "" || (picturePath.value).match(/^\s+$/)) {
        picturePath.setCustomValidity("Picture path invalid!");
        picturePath.style.borderColor = "red";
        picturePath.style.borderWidth = "thick";
        errorsTab += "Picture path cannot be empty! <br />";
    } else {
        picturePath.style.borderColor = "green";
        picturePath.setCustomValidity('');
    }

    if (!(picturePath.value).match("(https?:\/\/.*\.(?:png|jpg))")) {
        picturePath.setCustomValidity("Price invalid!");
        picturePath.style.borderColor = "red";
        picturePath.style.borderWidth = "thick";
        errorsTab += "Price regex invalid (http path ends with jpg or png)! <br />";
    } else {
        picturePath.style.borderColor = "green";
        picturePath.style.borderWidth = "thick";
        picturePath.setCustomValidity('');
    }

    //firstName
    if (firstName.value == "" || (firstName.value).match(/^\s+$/)) {
        firstName.setCustomValidity("First name invalid!");
        firstName.style.borderColor = "red";
        firstName.style.borderWidth = "thick";
        errorsTab += "First name cannot be empty! <br />";
    } else {
        firstName.style.borderColor = "green";
        firstName.setCustomValidity('');
    }

    //lastName
    if (lastName.value == "" || (lastName.value).match(/^\s+$/)) {
        lastName.setCustomValidity("Last name invalid!");
        lastName.style.borderColor = "red";
        lastName.style.borderWidth = "thick";
        errorsTab += "Last name cannot be empty! <br />";
    } else {
        lastName.style.borderColor = "green";
        lastName.setCustomValidity('');
    }

    //Check
    if (errorsTab == "") {
        return true;
    } else {
        var errors = document.getElementById("errors");
        errors.innerHTML = "<b>Form contains errors: </b><br /> <br />";
        errors.style.color = "red";
        errors.innerHTML += errorsTab;
        return false;
    }
}
