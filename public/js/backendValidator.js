
class Validator {

    static isValid(name){
        return !name.match(/(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/);
    }

    static isNotEmptyOrWhiteSpaces(name){
        return name.match(/^\s+$/);
    }

    static isDateValid(date){
        return date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
    }   

    static isValueValid(value){
        return value.match(/^([1-9]{1}[0-9]{1})$/);
    }  

    static isCapacityValid(capacity){
        return capacity.match(/^[0-9]{1,5}\.[0-9]{1}$/);
    } 

    static isPriceValid(price){
        return price.match(/^[0-9]{1,7}\.[0-9]{1,2}$/);
    } 

    static isPicturePatValid(path){
        return path.match(/(https?:\/\/.*\.(?:png|jpg))/);
    } 

    static isPasswordValid(password){
        return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})(https?:\/\/.*\.(?:png|jpg))/);
    }   

    
}

module.exports = Validator;