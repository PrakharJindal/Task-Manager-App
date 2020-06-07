const Initial_State = {
  isSignedIn: false,
  userid: '',
  username: '',
  token: '',
  email: '',
  typename: '',
  todos: '',
};

export default (state = Initial_State, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.token,
        userid: action.userid,
        isSignedIn: true,
      };
    case 'GetTypes':
      return {
        ...state,
        typename: action.typename,
        todos: action.todos,
      };
    case 'LOGIN2':
      return {
        ...state,
        token: action.token,
        userid: action.userid,
        username: action.username,
        email: action.email,
        typename: action.typename,
        todos: action.todos,
        isSignedIn: true,
      };
    case 'UPDATEDATA':
      return {
        ...state,
        typename: action.typename,
        todos: action.todos,
      };
    default:
      return state;
  }
};
