import React, { useEffect, useState } from "react";
import Split from "react";
import "./recipes.css";
import Card from "../components/Card/card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listRecipes, listRecipeSpoonacula } from "../actions/recipeActions";
import axios from "axios";
import parse from "html-react-parser";
import ReactHtmlParser from "react-html-parser";
import Loading from "./../components/Loading";
import ErrorMessage from "./../components/ErrorMessage";


const Recipes = ({ history}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeList = useSelector((state) => state.recipeList);
  const { recipeData, loading, error } = recipeList;

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const { createloading, recipeerror } = recipeCreate;
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = recipeCreate;



  const mainrecipe = useSelector((state) => state.mainrecipe);
  const { mainrecipeData, mainloading, mainerror } = mainrecipe;

  const recipeDelete = useSelector((state) => state.recipeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = recipeDelete;

  useEffect(() => {
    dispatch(listRecipes());
    dispatch(listRecipeSpoonacula());

    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, history, successDelete, successCreate, errorDelete]);
  console.log(recipeCreate)

  function getImage(string) {
    let imageUrl = string ? string.toString() : "";
    return imageUrl;
  }

  function SearchRecipe(search) {}
  return (
    <div className="main">
      <div className="flex-container">
        <div className="flex-child">
          <div className="top">
            <div className="wrap">
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="searchButton"
                  onClick={SearchRecipe}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <div>
                
              
              
              </div>
              {mainerror && (
                <ErrorMessage variant="danger">{mainerror}</ErrorMessage>
              )}
              <br />
            </div>
          </div>
          <div className="card-list" id="scroll">
            {mainrecipeData?.recipes?.map((data) => (
              <section key={data._id}>
                <div className="container">
                  <Card
                    id={data.id}
                    title={data.title}
                    description={data.summary}
                    image={data.image}
                    healthScore={data.healthScore}
                    pricePerServing={data.pricePerServing}
                    instructions={data.instructions}
                    sourceUrl={data.sourceUrl}
                    credits={data.creditsText}
                    ingredients={data.extendedIngredients}
                    action="+"
                    className="spoonacula"
                  />
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="flex-child">
        {loadingCreate && <Loading />}
        {errorCreate && <ErrorMessage variant="danger">{errorCreate}</ErrorMessage>}
          <div className="saved-title">
            <p> Saved Recipes </p>
          </div>
          
          <div>
            {loading && <Loading />}
            {loadingDelete && <Loading />}
          </div>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
          )}
          {recipeerror && (
            <ErrorMessage variant="danger">{recipeerror}</ErrorMessage>
          )}

          <div className="card-list" id="scroll">
            {recipeData?.Saved_recipes?.map((data) => (
              <section key={data._id}>
                <div className="container">
                  <Card
                    id={data.RecipeId}
                    title={data.Name}
                    description={data.RecipeDesc}
                    image={data.Image}
                    healthScore={data.healthScore}
                    pricePerServing={data.pricePerServing}
                    instructions={data.instructions}
                    sourceUrl={data.sourceUrl}
                    credits={data.creditsText}
                    ingredients={data.ingredients}
                    action="-"
                  />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
