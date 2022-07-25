import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { recipeCreateReducer, recipeDeleteReducer, recipeReducers, spoonacularecipeReducer } from './reducers/recipeReducer';
import { pantryCreateReducer, pantryDeleteReducer, pantryReducers } from './reducers/pantryReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
const reducer = combineReducers ({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    recipeList: recipeReducers, 
    mainrecipe: spoonacularecipeReducer,
    recipeCreate: recipeCreateReducer,
    recipeDelete: recipeDeleteReducer,
    pantryList: pantryReducers, 
    pantryCreate: pantryCreateReducer,
    pantryDelete: pantryDeleteReducer,

});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
 
export default store;