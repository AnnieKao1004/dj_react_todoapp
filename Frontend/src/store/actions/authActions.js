import axios from "axios"
const authURL = 'https://djangotodoapi.herokuapp.com/rest-auth/'
import { fetchData, cleanData } from './todoActions'

// sync action creators
const signUpUsernameFail = (message) => {
  return {
    type: 'SIGNUP_USERNAME_FAIL',
    message: message
  }
}

const signUpPasswordFail = (message) => {
  return {
    type: 'SIGNUP_PASSWORD_FAIL',
    message: message
  }
}

const authLogin = (username, message) => {
  return {
    type: 'LOGIN',
    username: username,
  }
}

const authLoginFail = (message) => {
  return {
    type: 'LOGIN_FAIL',
    message: message
  }
}



export const cleanSignupMessage = () => {
  return {
    type: 'CLEAN_SIGNUP_MSG'
  }
}

export const cleanLoginMessage = () => {
  return {
    type: 'CLEAN_LOGIN_MSG'
  }
}

const setAuth = (username, result) => {
  return {
    type: 'SETAUTH',
    username: username,
    authenticated: result
  }
}

const authLogout = () => {
  return {
    type: 'LOGOUT',
    username: ''
  }
}

// async action creators
export const SignupUser = (formvalue) => {
  return dispatch => {
    axios.post(authURL + 'registration/', formvalue)
      .then(() => {dispatch(loginUser({'username': formvalue.username, 'password': formvalue.password1}))})
      .catch((err) => {
        if ('username' in err.response.data) {
          let usernameErr = err.response.data.username;
          dispatch(signUpUsernameFail(usernameErr))
        } else {
          dispatch(signUpUsernameFail([]))
        }
        if ('password1' in err.response.data) {
          let passwordErr = err.response.data.password1;
          dispatch(signUpPasswordFail(passwordErr))
        } else {
          dispatch(signUpPasswordFail([]))
        }
      })
  }
}

export const loginUser = (formvalue) => {
  return dispatch => {
    axios.post(authURL + 'login/', formvalue)
      .then(res => {
        const token = res.data.key
        const username = formvalue.username
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
        dispatch(authLogin(username))
        dispatch(fetchData())  
      })
      .catch(err => {
        if (err.response.status === 400) {
          dispatch(authLoginFail('The username or password is incorrect. Please try again.'))
        }
      })   
  }
}

export const logoutUser = () => {
  return dispatch => {
    localStorage.clear()
    dispatch(authLogout())
    dispatch(cleanData())
  }
}


export const checkAuthStatus = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    if (token) {
      dispatch(setAuth(username, true))
    } 
  }
}

