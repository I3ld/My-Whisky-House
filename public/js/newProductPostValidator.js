function validateForm() {
    var text = document.forms["myForm"]["inputPost"];
    var errorsTab = "";

    //txt
    if (text.value == "" || (text.value).match(/^\s+$/)) {
        text.setCustomValidity("Name invalid!");
        text.style.borderColor = "red";
        text.style.borderWidth = "thick";
        errorsTab += "Name cannot be empty! <br />";
    } else {
        text.style.borderColor = "green";
        text.setCustomValidity('');
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
