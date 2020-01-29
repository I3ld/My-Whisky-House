function validateForm() {
    var name = document.forms["myForm"]["name"];
    var valuePercent = document.forms["myForm"]["moc"];
    var capacity = document.forms["myForm"]["pojemnosc"];
    var price = document.forms["myForm"]["cena"];
    var picture = document.forms["myForm"]["zdjecie"];
    var note = document.forms["myForm"]["notatka"];
    var decription = document.forms["myForm"]["opis"];
    var rateButtons = document.forms["myForm"]["rate"];

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

    //value
    if (valuePercent.value == "" || (valuePercent.value).match(/^\s+$/)) {
        valuePercent.setCustomValidity("Value invalid!");
        valuePercent.style.borderColor = "red";
        valuePercent.style.borderWidth = "thick";
        errorsTab += "Value cannot be empty! <br />";
    } else {
        valuePercent.style.borderColor = "green";
        valuePercent.style.borderWidth = "thick";
        valuePercent.setCustomValidity('');
    }

    if (!(valuePercent.value).match("^([1-9]{1}[0-9]{1})$")) {
        valuePercent.setCustomValidity("Value invalid!");
        valuePercent.style.borderColor = "red";
        valuePercent.style.borderWidth = "thick";
        errorsTab += "Value regex invalid (ex: 40)! <br />";
    } else {
        valuePercent.style.borderColor = "green";
        valuePercent.style.borderWidth = "thick";
        valuePercent.setCustomValidity('');
    }

    //capacity
    if (capacity.value == "" || (capacity.value).match(/^\s+$/)) {
        capacity.setCustomValidity("Capacity invalid!");
        capacity.style.borderColor = "red";
        capacity.style.borderWidth = "thick";
        errorsTab += "Capacity cannot be empty! <br />";
    } else {
        capacity.style.borderColor = "green";
        capacity.style.borderWidth = "thick";
        capacity.setCustomValidity('');
    }

    if (!(capacity.value).match("^[0-9]{1,5}\.[0-9]{1}$")) {
        capacity.setCustomValidity("Capacity invalid!");
        capacity.style.borderColor = "red";
        capacity.style.borderWidth = "thick";
        errorsTab += "Capacity regex invalid (ex: 5.0)! <br />";
    } else {
        capacity.style.borderColor = "green";
        capacity.style.borderWidth = "thick";
        capacity.setCustomValidity('');
    }

    //price
    if (price.value == "" || (price.value).match(/^\s+$/)) {
        price.setCustomValidity("Price invalid!");
        price.style.borderColor = "red";
        price.style.borderWidth = "thick";
        errorsTab += "Price be empty! <br />";
    } else {
        price.style.borderColor = "green";
        price.style.borderWidth = "thick";
        price.setCustomValidity('');
    }


    if (!(price.value).match("^[0-9]{1,7}\.[0-9]{1,2}$")) {
        price.setCustomValidity("Price invalid!");
        price.style.borderColor = "red";
        price.style.borderWidth = "thick";
        errorsTab += "Price regex invalid (ex: 234.33)! <br />";
    } else {
        price.style.borderColor = "green";
        price.style.borderWidth = "thick";
        price.setCustomValidity('');
    }

    //buttoons rate
    var flag = Boolean(false);

    for (i = 0; i < rateButtons.length; ++i) {
        if (rateButtons[i].checked == true) {
            flag = Boolean(true);
        }
    }

    if (flag == false) {
        document.getElementById("rateButtons").style.border = "thick solid red";
        errorsTab += "Rate buttons unchecked! <br />";
    } else if (flag == true) {
        document.getElementById("rateButtons").style.border = "thick solid green";
    }

     //note
    if (note.value == "" || (note.value).match(/^ *$/) !== null) {
        note.setCustomValidity("Note invalid!");
        note.style.borderColor = "red";
        note.style.borderWidth = "thick";
        errorsTab += "Note picture cannot be empty! <br />";
    } else {
        note.style.borderColor = "green";
        note.style.borderWidth = "thick";
        note.setCustomValidity('');
    }

     //decription
    if (decription.value == "" || (decription.value).match(/^ *$/) !== null) {
        decription.setCustomValidity("Note invalid!");
        decription.style.borderColor = "red";
        decription.style.borderWidth = "thick";
        errorsTab += "Decription picture cannot be empty! <br />";
    } else {
        decription.style.borderColor = "green";
        decription.style.borderWidth = "thick";
        decription.setCustomValidity('');
    }

    //picture
    if (picture.value == "" || (picture.value).match(/^\s+$/)) {
        picture.setCustomValidity("Picture invalid!");
        picture.style.borderColor = "red";
        picture.style.borderWidth = "thick";
        errorsTab += "Name picture cannot be empty! <br />";
    } else {
        picture.style.borderColor = "green";
        picture.style.borderWidth = "thick";
        picture.setCustomValidity('');
    }

    if (!(picture.value).match("(https?:\/\/.*\.(?:png|jpg|PNG|JPG))")) {
        picture.setCustomValidity("Price invalid!");
        picture.style.borderColor = "red";
        picture.style.borderWidth = "thick";
        errorsTab += "Price regex invalid (http path ends with jpg or png)! <br />";
    } else {
        picture.style.borderColor = "green";
        picture.style.borderWidth = "thick";
        picture.setCustomValidity('');
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
