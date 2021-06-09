
const validate = (userCredentials) => {
  let errors = {};
  if(!userCredentials.username) {
    errors.username = "Username Required"
  }
  if(!userCredentials.email) {
    errors.email = "Email Required"
  } else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(userCredentials.email)) {
    errors.email = "Email Invalid"
  }
  if(!userCredentials.password) {
    errors.password = "Password Required"
  } else if (userCredentials.password.length < 6) {
    errors.password = "Password too short"
  }
  if(!userCredentials.password1) {
    errors.password1 = "Password Required"
  } else if (userCredentials.password1 !== userCredentials.password) {
    errors.password1 = "Passwords do not match"
  }
  return errors
}
export default validate;