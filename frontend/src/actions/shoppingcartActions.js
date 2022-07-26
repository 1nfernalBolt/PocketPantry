import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  REMOVE_STOCK_ITEM,
} from "../constants/ShoppingcartConstants";

export const addToCart = (IngredientId, Name, Image, Amount, Unit) => ({
  type: ADD_TO_CART,
  IngredientId,
    Name,
    Image,
    Amount,
    Unit,
});

export const removeFromCart = (IngredientId) => ({
  type: REMOVE_FROM_CART,
  IngredientId,
});

export const updateCartItem = (IngredientId) => ({
  type: UPDATE_CART_ITEM,
  IngredientId,
});

export const removeStockItem = (IngredientId) => ({
  type: REMOVE_STOCK_ITEM,
  IngredientId,
});
