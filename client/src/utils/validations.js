export function addingPost(values) {
  let errors = {};
  let title = values.title.trim();
  let desc = values.description.trim();

  if(title.length < 4) {
    errors.title = "Please enter more than 4 characters";
  } else if(title === '') {
    errors.title = "Title required";
  } else if(title.length > 75) {
    errors.title = 'Title is over maximum accepted length'
  }

  if(desc.length < 4) {
    errors.description = "Please enter more than 4 characters";
  } else if(desc === '') {
    errors.description = "Title required";
  } else if(desc.length > 250) {
    errors.description = 'Description is over maximum accepted length (250)'
  }
  return errors
}

export function registerUser(values) {
  let errors = {};
  let name = values.name.trim();
  let email = values.email.trim();
  let password = values.password.trim();
  let confirmPass = values.confirmPass.trim();
  let letters = /^[\w\-\s]+$/
  let emails = /\S+@\S+\.\S+/
  let REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
  
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
  } else if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password) || !REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(confirmPass)) {
    errors.password = 'Password must contain one upper case, lower case, number and special character';
  }

  if(password !== confirmPass) {
    errors.password = 'Passwords do not match'
  }
  return errors;
}

export function loginUser(values) {
  let errors = {};
  let email = values.email.trim();
  let password = values.password.trim();
  let emails = /\S+@\S+\.\S+/
  let REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

  if(email.length === 0) {
    errors.email = 'Email address is required';
  } else if(!emails.test(email)) {
    errors.email = 'Email address is invalid';
  }

  if(password.length === 0) {
    errors.password = 'Password field cannot be blank'
  } else if(password.length > 14) {
    errors.password = 'Password length cannot exceed 14 characters'
  } else if (password.length < 8) {
    errors.password = 'Password must be more than 8 characters'
  } else if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
    errors.password = 'Password must contain one upper case, lower case, number and special character';
  }
  return errors
}

export function editPostModal(values) {
  let errors = {};
  let title = values.title.trim();
  let description = values.description.trim();

  if(title.length === 0) {
    errors.title = 'Title is required';
  } else if(title.length > 100) {
    errors.title = 'Maximum characters exceeded. (100)'
  }

  if(description.length === 0) {
    errors.description = 'Please type a description'
  } else if(description.length > 250) {
    errors.description = 'Maximum characters exceeded. (250)'
  }
  return errors
}