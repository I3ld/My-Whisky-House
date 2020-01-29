
class Validator {

    static isValid(name){
        //console.log(" isValid: " + !/(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/.test(name))
        return !/(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/.test(name);
    }

    static isValidId(id){
        //console.log(" isValidId: " + /^\d+$/.test(id));
        return /^\d+$/.test(id);
    }

    static isDateValid(date){
        //console.log(" isDateValid: " + /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(date));
        return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(date);
    }
    
    static isEmailValid(email){
        //console.log(" isEmailValid: " + /^[a-zA-Z0-9]+@[a-zA-Z0-9]{1,6}\.(pl|com)$/.test(email));
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]{1,6}\.(pl|com)$/.test(email);
    } 

    static isValueValid(value){
        //console.log(" isValueValid: " + /^([1-9]{1}[0-9]{1})$/.test(value));
        return /^([1-9]{1}[0-9]{1})$/.test(value);
    }  

    static isCapacityValid(capacity){
        //console.log(" isCapacityValid: " + /^[0-9]{1,5}\.[0-9]{1}$/.test(capacity));
        return /^[0-9]{1,5}\.[0-9]{1}$/.test(capacity);
    } 

    static isPriceValid(price){
        //console.log(" isPriceValid: " + /^[0-9]{1,7}\.[0-9]{1,2}$/.test(price));
        return /^[0-9]{1,7}\.[0-9]{1,2}$/.test(price);
    } 

    static isPicturePathValid(path){
        //console.log(" isPicturePathValid: " + /(https?:\/\/.*\.(?:png|jpg))/.test(path));
        return /(https?:\/\/.*\.(?:png|jpg|PNG|JPG))/.test(path);
    } 

    static isPasswordValid(password){
        //console.log(" isPasswordValid: " + /^\$2[ayb]\$.{56}$/.test(password));
        return /^\$2[ayb]\$.{56}$/.test(password);
    }   
}

module.exports = Validator;