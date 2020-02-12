const authReducer = (state={username: null, authenticated: false, loginMessage: [], signupMessage: {}}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, username: action.username, authenticated: true, loginMessage: [], signupMessage: {}}
    case 'LOGIN_FAIL':
      return {...state, loginMessage: action.message}
    case 'SIGNUP_USERNAME_FAIL':
      return {...state, signupMessage: {...state.signupMessage, username: action.message}}
    case 'SIGNUP_PASSWORD_FAIL':
      return {...state, signupMessage: {...state.signupMessage, password: action.message}}
    case 'CLEAN_SIGNUP_MSG':
      return {...state, signupMessage: {}}
    case 'CLEAN_LOGIN_MSG':
      return {...state, loginMessage: null}
    case 'LOGOUT':
      return {...state, username: action.username, authenticated: false}  
    case 'SETAUTH':
      return {...state, username: action.username, authenticated: true}  
    default:
      return state;
  }
}

export default authReducer