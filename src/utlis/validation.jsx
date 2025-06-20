export const validation = (form, setError) => {
  let newError = {}

  // Base empty fields check
  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.contact.trim() ||
    !form.password.trim() ||
    !form.confirmPassword.trim()
  ) {
    newError.emptyFields = "Please ensure no fields are empty"
    return false
  } else {
    newError.emptyFields = null
  }

  // Name Validation
  let allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
  let isValidName = (name) => {
    
    if (name.length < 6 || name.length > 16) {
      newError.name = "Name should be between 6-16 characters"
      return false
    }
    if (!name.split("").every((char) => allowed.includes(char))) {
      newError.name = "Name should only contain letters and spaces"
      return false
    }
    newError.name = null
    return true
  };

  if (!isValidName(form.name)) {
    return false
  }

  // Email Validation
  if (!form.email.includes("@") || !form.email.includes(".")) {
    newError.email = "Invalid email format"
    return false
  } 
  else if (!isNaN(form.email)) {
    newError.email = "Email should not be numeric"
    return false
  } 
  else {
    newError.email = null
  }

  // Contact Number Validation (assuming 10 digit number)
  if (!isNaN(form.contact) && form.contact.length !== 10) {
    newError.contact = "Contact should be a 10 digit number"
    return false
  } 
  else {
    newError.contact = null
  }

  // Password Match Validation
  if (form.password !== form.confirmPassword) {
    newError.password = "Passwords do not match"
    return false
  } else {
    newError.password = null
  }

  // If everything passes
  return newError
}
