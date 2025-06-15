// Registration form validation 
export function validation(form){
  let newErrors = {}
  

  // fullname validatation 
  if(!form.fullName.trim()) {
    newErrors.fullName_err = 'name cannot be empty'
  } else if(form.fullName.length < 6 || form.fullName.length > 16){
    newErrors.fullName_err = 'name must be between 6 and 16 character'
  } 
  else{
    let spaceUsed = 0; 
    let validSpace = true;
    for(let i=0;i<form.fullName.length;i++){
      let char = form.fullName[i]
      if(char ===' '){
        spaceUsed++
        if(spaceUsed>1){
          validSpace=false
          break;
        }
      }
      if(char !==' ' && (!char >= 'A' && !char <= 'Z') && (!char >= 'a' && !char <= 'z')){
        validSpace = false;
        break;
      }
    }
    if(!validSpace){
       newErrors.fullName_err = 'name can contain only one space between name and surname'
    }
    }

    // email validation 
    if((!form.email.includes('@')) || (!form.email.endsWith('.com'))) newErrors.email_err = "invalid email format"

    // age validation 
    if(isNaN(form.age)) newErrors.age_err = "age must be a number"
    else if(form.age < 18 || form.age > 65) newErrors.age_err = "age must be in between 18-65 years old"

    // last doantion validation

    let todayDate = new Date()
    // console.log(todayDate)
    let lastDonationDate = new Date(form.lastDonation)
    if(!form.lastDonation){
      newErrors.lastDonation_err = "please provide last doantion date"
    } else if(isNaN(lastDonationDate.getTime())){
      newErrors.lastDonation_err = "invalid date format"
    } else if (lastDonationDate > todayDate) newErrors.lastDonation_err = "last donation date cannot be a future date"

    let diffInDays = (todayDate - lastDonationDate) / (1000 * 60 * 60 * 24)
    if (diffInDays < 90) {
      newErrors.lastDonation_err = "You must wait 90 days between donations"
    }
  
    return newErrors
}
