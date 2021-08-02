const validations = {
  newPost(values) {
    let errors = {};
    let title = values.title.trim();
    let desc = values.description.trim();

    if(title.length < 5) {
      errors.title = "Please enter more than 5 characters";
    } else if(title === '') {
      errors.title = "Title required";
    } else if(title.length > 75) {
      errors.title = 'Title is over maximum accepted length'
    }

    if(desc.length < 5) {
      errors.description = "Please enter more than 5 characters";
    } else if(desc === '') {
      errors.description = "Title required";
    } else if(desc.length > 250) {
      errors.description = 'Description is over maximum accepted length'
    }
    return errors
  },
  register(values) {
    let errors = {};
    let name = values.name.trim();
    let email = values.email.trim();
    let password = values.password.trim();
    let confirmPass = values.confirmPass.trim();
    let letters = /^[A-Za-z]+$/
    let emails = /\S+@\S+\.\S+/
    //let REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
    
    //First Name validation errors
    if(name.length < 3) {
      errors.name = 'Please enter more than 3 characters';
    } else if (name === '') {
      errors.name = 'First Name required'
    } else if (!letters.test(name)) {
      errors.name = 'Please enter alpha characters only'
    }

    //Email validation errors
    if(email.length === 0) {
      errors.email = 'Email address is required';
    } else if(!emails.test(email)) {
      errors.email = 'Email address is invalid';
    }
    //Password validation errors
    if((password.length || confirmPass.length) === 0) {
      errors.password = 'Password field cannot be blank'
    } else if((password.length || confirmPass.length) > 14) {
      errors.password = 'Password length cannot exceed 14 characters'
    } else if ((password.length || confirmPass.length) < 8) {
      errors.password = 'Password must be more than 8 characters'
    } 

    if(password !== confirmPass) {
      errors.password = 'Passwords do not match'
    }
    return errors;
  }
}

export default validations;