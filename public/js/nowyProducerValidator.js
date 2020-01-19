function validateForm() {
    var name = document.forms["myForm"]["name"];
    var country = document.forms["myForm"]["country"];
    var dateOfStart = document.forms["myForm"]["dateOfStart"];
    var owner = document.forms["myForm"]["owner"];

    var errorsTab = "";

    //name
    if (name.value == "" || (name.value).match(/^\s+$/)) {
        name.setCustomValidity("Name invalid!");
        name.style.borderColor = "red";
        name.style.borderWidth = "thick";
        errorsTab += "Name cannot be empty! <br />";
    } else {
        name.style.borderColor = "green";
        name.setCustomValidity('');
    }

    //country
    if (country.value == "" || (country.value).match(/^\s+$/)) {
        country.setCustomValidity("Name invalid!");
        country.style.borderColor = "red";
        country.style.borderWidth = "thick";
        errorsTab += "Country cannot be empty! <br />";
    } else {
        country.style.borderColor = "green";
        country.setCustomValidity('');
    }

    //dateOfStart
    if (dateOfStart.value == "" || (dateOfStart.value).match(/^\s+$/)) {
        dateOfStart.setCustomValidity("Name invalid!");
        dateOfStart.style.borderColor = "red";
        dateOfStart.style.borderWidth = "thick";
        errorsTab += "Date of start cannot be empty! <br />";
    } else {
        dateOfStart.style.borderColor = "green";
        dateOfStart.setCustomValidity('');
    }

    if (!(dateOfStart.value).match(/^[\-]\d{4}[\-](0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/)) {
        dateOfStart.setCustomValidity("Name invalid!");
        dateOfStart.style.borderColor = "red";
        dateOfStart.style.borderWidth = "thick";
        errorsTab += "Date of start regex invalid! (ex. 2019-01-22) <br />";
    } else {
        dateOfStart.style.borderColor = "green";
        dateOfStart.setCustomValidity('');
    }

    //owner
    if (owner.value == "" || (owner.value).match(/^\s+$/)) {
        owner.setCustomValidity("Name invalid!");
        owner.style.borderColor = "red";
        owner.style.borderWidth = "thick";
        errorsTab += "Owner cannot be empty! <br />";
    } else {
        owner.style.borderColor = "green";
        owner.setCustomValidity('');
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
