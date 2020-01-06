function validateForm() {
    var ptext = document.forms["myForm"]["ptext"];
    var errorsTab = "";

    //ptext
    if (ptext.value == "" || (ptext.value).match(/^\s+$/)) {
        ptext.setCustomValidity("Post text invalid!");
        ptext.style.borderColor = "red";
        ptext.style.borderWidth = "thick";
        errorsTab += "Post text cannot be empty! <br />";
    } else {
        ptext.style.borderColor = "green";
        ptext.setCustomValidity('');
    }

    if (ptext.value.length > 500) {
        ptext.setCustomValidity("Post text invalid!");
        ptext.style.borderColor = "red";
        ptext.style.borderWidth = "thick";
        errorsTab += "Post text cannot be longer than 500 chars! <br />";
    } else {
        ptext.style.borderColor = "green";
        ptext.style.borderWidth = "thick";
        ptext.setCustomValidity('');
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
