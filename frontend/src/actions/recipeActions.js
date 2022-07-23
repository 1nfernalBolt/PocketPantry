
import axios from "axios";
import {
    RECIPE_CREATE_FAIL,
    RECIPE_CREATE_REQUEST,
    RECIPE_CREATE_SUCCESS,
    RECIPE_DELETE_FAIL,
    RECIPE_DELETE_REQUEST,
    RECIPE_DELETE_SUCCESS,
    RECIPE_LIST_FAIL,
    RECIPE_LIST_REQUEST,
    RECIPE_LIST_SUCCESS,
    MAIN_RECIPE_LIST_FAIL,
    MAIN_RECIPE_LIST_REQUEST,
    MAIN_RECIPE_LIST_SUCCESS,
} from "../constants/RecipeConstants";

export const listRecipes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECIPE_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();
        
        
        const UserId = userInfo._id 
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(`/api/recipe/getRecipes`,  { UserId }, config);

        dispatch({
            type: RECIPE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: RECIPE_LIST_FAIL,
            payload: message,
        });
    }
};

export const listRecipeSpoonacula = () => async (dispatch, getState) => {
   
    try {
        dispatch({
            type: MAIN_RECIPE_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();
        
        
        const UserId = userInfo._id 
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.get(
            `https://api.spoonacular.com/recipes/random?apiKey=9053c755788741b8904e3c665300f65e&number=20`
          );

        dispatch({
            type: MAIN_RECIPE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: MAIN_RECIPE_LIST_FAIL,
            payload: message,
        });
    }
};
export const creatRecipeAction = (RecipeId, Name, RecipeDesc, Image ) => async (
    dispatch,
    getState
    
) => {
    
    try {
        dispatch({
            type: RECIPE_CREATE_REQUEST,
        });
 
        const {
            userLogin: { userInfo },
        } = getState();
        const UserId = userInfo._id 
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        
        const { data } = await axios.post(
            `/api/recipe/addRecipe`,
            { UserId, RecipeId, Name, RecipeDesc, Image  },
            config
        );

        dispatch({
            type: RECIPE_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            RECIPE_CREATE_FAIL,
            payload: message,
        });
    }
};

export const deletRecipeAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECIPE_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/removeRecipeById/${id}`, config);

        dispatch({
            type: RECIPE_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: RECIPE_DELETE_FAIL,
            payload: message,
        });
    }
};

