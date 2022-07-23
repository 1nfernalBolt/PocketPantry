import { RECIPE_LIST_FAIL,
         RECIPE_LIST_REQUEST,
         RECIPE_LIST_SUCCESS,
         RECIPE_CREATE_REQUEST,
         RECIPE_CREATE_FAIL,
         RECIPE_CREATE_SUCCESS,  
         RECIPE_DELETE_FAIL,
         RECIPE_DELETE_REQUEST,
         RECIPE_DELETE_SUCCESS,
         MAIN_RECIPE_LIST_REQUEST,
         MAIN_RECIPE_LIST_FAIL,
         MAIN_RECIPE_LIST_SUCCESS,

         } from "../constants/RecipeConstants";

export const recipeReducers = (state = {recipeData: []}, action) => {
    switch(action.type){
        case RECIPE_LIST_REQUEST:
            return {loading: true};
        case RECIPE_LIST_FAIL:
            return {loading: false, error: action.payload};
        case RECIPE_LIST_SUCCESS:
            return {loading: false, recipeData: action.payload};
        default:
            return state;
    }
}; 

export const spoonacularecipeReducer= (state = {mainrecipeData: []}, action) => {
  switch(action.type){
      case MAIN_RECIPE_LIST_REQUEST:
          return {loading: true};
      case MAIN_RECIPE_LIST_FAIL:
          return {loading: false, error: action.payload};
      case MAIN_RECIPE_LIST_SUCCESS:
          return {loading: false, mainrecipeData: action.payload};
      default:
          return state;
  }
}; 

export const recipeCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case RECIPE_CREATE_REQUEST:
        return { loading: true };
      case RECIPE_CREATE_SUCCESS:
        return { loading: false, success: true };
      case RECIPE_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const recipeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case RECIPE_DELETE_REQUEST:
        return { loading: true };
      case RECIPE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case RECIPE_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  