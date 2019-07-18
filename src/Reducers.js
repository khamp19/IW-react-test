import { combineReducers } from 'redux';
//import actions
import { 
  GETTING_USERS, 
  GET_USERS_ERROR, 
  USERS_SUCCESS, 
  MAKING_USER, 
  MAKE_USER_ERROR,
  MAKE_USER_SUCCESS 
} from './Actions';

const listDefaultState = {
  users: [],
  getting_users: false,
  get_users_error: false,
}

const UsersReducer = (state = listDefaultState, action) => {
  switch(action.type){
    case GETTING_USERS:
      return Object.assign({}, state, { getting_users: true });
    case GET_USERS_ERROR:
      return Object.assign({}, state, { 
        getting_users: false,
        get_users_error: true
      });
    case USERS_SUCCESS:
      return Object.assign({}, state, {
        getting_users: false,
        get_users_error: false,
        users: state.users.concat(action.users),
      })
    default:
      return state;
  }
}

const newUserDefaultState = {
  making_user: false,
  new_user: {},
  make_user_error: false
}

const NewUserReducer = (state = newUserDefaultState, action) => {
  switch (action.type){
    case MAKING_USER:
      return Object.assign({}, state, { making_user: true });
    case MAKE_USER_ERROR:
      return Object.assign({}, state, { 
        making_user: false,
        make_user_error: true,
      });
    case MAKE_USER_SUCCESS:
      return Object.assign({}, state, {
        making_user: false,
        make_user_error: false,
        new_user: Object.assign({}, {
          name: action.new_user.name,
          email: action.new_user.email
        })
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  UsersReducer,
  NewUserReducer
})

export default rootReducer;