import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { listRecipes } from "../../actions/recipeActions";
import { Button } from "../Button";
import { creatIngredientAction } from "../../actions/pantryActions";
import { creatRecipeAction } from "../../actions/recipeActions";
import Loading from "../../components/Loading";
import { deletPantryAction } from "../../actions/pantryActions";
import { deletRecipeAction } from "../../actions/recipeActions";
const Card = ({
  id,
  title,
  description,
  image,
  ingredients,
  healthScore,
  pricePerServing,
  instructions,
  sourceUrl,
  credits,
  action,
  className,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const c = ingredients.map((item) => {
    const { id, name, amount, image, unit } = item;
    return { id, name, amount, image, unit };
  });
  const newIngredients = c.map(({ id, name, amount, image, unit }) => ({
    IngredientId: id,
    Name: name,
    Amount: amount,
    Image: image,
    Unit: unit,
  }));

  const pantryCreate = useSelector((state) => state.pantryCreate);
  const { loading, error, created } = pantryCreate;
  console.log(pantryCreate)
  var class_name2 =
    className === "spoonacula" ? "spoonacula" : "spoonacula hide";
  var class_name1 = class_name2 === "spoonacula" ? "mongo hide" : "mongo";
  const submitHandler = (RecipeId, Name, ingredients, RecipeDesc, Image) => {
    dispatch(creatRecipeAction(RecipeId, Name, ingredients, RecipeDesc, Image));
  };
  const submitToCartHandler = (newIngredients) => {
    dispatch(creatIngredientAction(newIngredients));
  };
  function getImage(string) {
    let imageUrl = string ? string.toString() : "";
    return imageUrl;
  }
  const deleteHandler = (id) => {
    dispatch(deletRecipeAction(id));
  };

  return (
    <div>
      <div
        className={`menu ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      >
        <div className="itemPhoto">
          <img className="recipe-image" src={image} alt="Food Item" />
        </div>
        <div className="menu-info">
          <h5>{title}</h5>
          <h6> {ReactHtmlParser(description)}</h6>
        </div>
        <div className="buttonwrapper">
          <button
            className="btn1"
            onClick={
              action === "+"
                ? () =>
                    submitHandler(id, title, ingredients, description, image)
                : () => deleteHandler(id)
            }
          >
            {action}
          </button>
        </div>
      </div>
      <div className={class_name2}>
        <div className={`menu-content ${!isOpen ? "collapsed" : ""}`}>
          <div className="details">
            <p>
              <b>Intstructions : </b>
              <br />
              {ReactHtmlParser(instructions)}{" "}
            </p>
            <p>
              <b>Price per serving : </b>
              {pricePerServing}
            </p>
            <p>
              <b>Health Score : </b>
              {healthScore}/100
            </p>
          </div>
        </div>
      </div>
      <div className={class_name1}>
        <div className={`menu-content ${!isOpen ? "collapsed" : ""}`}>
          <div className="details">
            <div>
              {ingredients?.map((data) => (
                <div>
                  <ul>
                    <li>
                      <img
                        src={`https://spoonacular.com/cdn/ingredients_100x100${getImage(
                          data.Image
                        )}`}
                      ></img>
                      <p>{data.name}</p>
                      <div className="button-wrapper">
                        <Button
                          onClick={() => submitToCartHandler(newIngredients)}
                          children="Add To Cart Cart"
                        />
                        <Button
                          onClick={() => submitToCartHandler(newIngredients)}
                          children="Add to Pantry"
                        />
                      </div>
                    </li>
                  </ul>
                 
                </div>
              ))}
              <div>
              <div>
                    <Button
                      onClick={() => submitToCartHandler(newIngredients)}
                      children="Add All To Cart"
                    />
                  </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
