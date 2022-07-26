import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM,
    REMOVE_STOCK_ITEM,
  } from "../constants/ShoppingcartConstants";
  

export const cartItemReducer = (state, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
            IngredientId: action.IngredientId,
            Name: action.Name,
            Image: action.Name,
            Amount: action.Amount,
            Unit: action.Unit

        };
      case REMOVE_FROM_CART:
        return state.IngredientId !== action.IngredientId;
      case UPDATE_CART_ITEM:
        if (state.IngredientId !== action.IngredientId) {
          return state;
        }
  
        return Object.assign(
          {},
          state
        );
      default:
        return state;
    }
  };

  export const stockReducer = (state = [], action) => {
    switch (action.type) {
      case REMOVE_STOCK_ITEM:
        return state.map(item => stockItemReducer(item, action));
      default:
        return state;
    }
  };

  export const cartReducer = (state = [], action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return [
          ...state,
          cartItemReducer(undefined, action),
        ];
      case REMOVE_FROM_CART:
        return state.filter(item => cartItemReducer(item, action));
      case UPDATE_CART_ITEM:
        return state.map(item => cartItemReducer(item, action));
      default:
        return state;
    }
  };
  
  export const stockItemReducer = (state, action) => {
    switch (action.type) {
      case REMOVE_STOCK_ITEM:
        if (state.IngredientId !== action.IngredientId) {
          return state;
        }
  
        return Object.assign(
          {},
          state,
          {
            count: state.count - action.count,
          }
        );
      default:
        return state;
    }
  };
  
 