export default function authReducer(auth = null, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return action.payload;
    default:
      return auth;
  }
}
