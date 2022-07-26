import axios from "axios";
import {
  PANTRY_CREATE_FAIL,
  PANTRY_CREATE_REQUEST,
  PANTRY_CREATE_SUCCESS,
  PANTRY_DELETE_FAIL,
  PANTRY_DELETE_REQUEST,
  PANTRY_DELETE_SUCCESS,
  PANTRY_LIST_FAIL,
  PANTRY_LIST_SUCCESS,
  PANTRY_LIST_REQUEST,
} from "../constants/PantryConstants";

export const listPantry = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANTRY_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const UserId = userInfo._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/pantry/getPantry`,
      { UserId },
      config
    );

    dispatch({
      type: PANTRY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PANTRY_LIST_FAIL,
      payload: message,
    });
  }
};

export const creatIngredientAction =
  (IngredientId, Name, Image, Amount, Unit) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PANTRY_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const UserId = userInfo._id;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/pantry/addIngredient`,
        { UserId, IngredientId, Name, Image, Amount, Unit },
        config
      );

      dispatch({
        type: PANTRY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        PANTRY_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deletPantryAction = (IngredientId, Amount, Unit ) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANTRY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const UserId = userInfo._id;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/pantry/removeIngredient`, {UserId, IngredientId, Amount, Unit },
      config
    );

    dispatch({
      type: PANTRY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PANTRY_DELETE_FAIL,
      payload: message,
    });
  }
};