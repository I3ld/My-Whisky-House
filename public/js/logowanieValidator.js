function validateForm() {
    var login = document.forms["myForm"]["email"];
    var password = document.forms["myForm"]["password"];

    var errorsTab = "";

    //login
    if (login.value == "" || (login.value).match(/^\s+$/)) {
        login.setCustomValidity("Login invalid!");
        login.style.borderColor = "red";
        login.style.borderWidth = "thick";
        errorsTab += "Login cannot be empty! <br />";
    } else {
        login.style.borderColor = "green";
        login.setCustomValidity('');
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
