import { PANTRY_LIST_FAIL,
    PANTRY_LIST_REQUEST,
    PANTRY_LIST_SUCCESS,
    PANTRY_CREATE_REQUEST,
    PANTRY_CREATE_FAIL,
    PANTRY_CREATE_SUCCESS,
    PANTRY_DELETE_FAIL,
    PANTRY_DELETE_REQUEST,
    PANTRY_DELETE_SUCCESS,
    } from "../constants/PantryConstants";

export const pantryReducers = (state = {PANTRYData: []}, action) => {
switch(action.type){
   case PANTRY_LIST_REQUEST:
       return {loading: true};
   case PANTRY_LIST_FAIL:
       return {loading: false, error: action.payload};
   case PANTRY_LIST_SUCCESS:
       return {loading: false, PantryData: action.payload};
   default:
       return state;
}
}; 

export const pantryCreateReducer = (state = {}, action) => {
switch (action.type) {
 case PANTRY_CREATE_REQUEST:
   return { loading: true };
 case PANTRY_CREATE_SUCCESS:
   return { loading: false, success: true };
 case PANTRY_CREATE_FAIL:
   return { loading: false, error: action.payload };

 default:
   return state;
}
};

export const pantryDeleteReducer = (state = {}, action) => {
switch (action.type) {
 case PANTRY_DELETE_REQUEST:
   return { loading: true };
 case PANTRY_DELETE_SUCCESS:
   return { loading: false, success: true };
 case PANTRY_DELETE_FAIL:
   return { loading: false, error: action.payload, success: false };

 default:
   return state;
}
};
