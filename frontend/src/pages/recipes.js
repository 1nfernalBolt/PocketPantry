import React, { useEffect, useState } from "react";
import Split from 'react'
import './recipes.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listRecipes, listRecipeSpoonacula } from "../actions/recipeActions"
import axios from "axios";
import parse from 'html-react-parser'
import { creatRecipeAction } from ".././actions/recipeActions"
const Recipes = ({ history }) => {
    const [RecipeId, setRecipeId] = useState("");
    const [Name, setName] = useState("");
    const [RecipeDesc, setRecipeDesc] = useState("");
    const [Image, setImage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const recipeCreate = useSelector((state) => state.recipeCreate);
    const { createloading, createerror, recipecreated } = recipeCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const recipeList = useSelector(state => state.recipeList)
    const { recipeData, loading, error } = recipeList;

    const mainrecipe = useSelector(state => state.mainrecipe)
    const { mainrecipeData, mainloading, mainerror } = mainrecipe;

    const recipeDelete = useSelector((state) => state.recipeDelete);
    const { success: successDelete, } = recipeDelete;

    function sayHello(name) {
        console.log(`hello, ${name}`);
    }
    const submitHandler = (RecipeId, Name, RecipeDesc, Image) => {

        dispatch(creatRecipeAction(RecipeId, Name, RecipeDesc, Image));
    };
    console.log(recipecreated)
    useEffect(() => {
        dispatch(listRecipes());
        dispatch(listRecipeSpoonacula())

        if (!userInfo) {
            navigate("/");
        }

    }, [dispatch,
        history,
        successDelete,
    ]);



    function SearchRecipe(search) {

    }
    return (
        <div className="main">
            <div className="flex-container">

                <div className="flex-child" >
                    <div className="top">
                        <div className="wrap">
                            <div className="search">
                                <input type="text" className="searchTerm" placeholder="Search" />
                                <button type="submit" className="searchButton" onClick={SearchRecipe}>
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className="card-list" id="scroll">
                        {mainrecipeData?.recipes?.map(data => (
                            <section key={data._id}>
                                <div className="container">
                                    <div className="menu">
                                        <div className="itemPhoto">
                                            <img className="recipe-image" src={data?.Image} alt="Food Item" />
                                            {data.image}
                                        </div>
                                        <div className="menu-info">
                                            <div className="progress-container">

                                            </div>

                                            <h2>{data.title}</h2>
                                            <h6>{data.summary.slice(0, 70)}</h6>
                                            <button className="btn1" onClick={() => submitHandler(data.id, data.title, data.summary, data.image)}>+</button>

                                        </div>
                                    </div>
                                </div>
                            </section>

                        ))}
                    </div>

                </div>

                <div className="flex-child">
                    <p> Saved Recipes </p>
                 
                    <div className="card-list" id="scroll">

                        {recipeData?.Saved_recipes?.map(data => (
                            <section key={data._id}>
                                <div className="container">
                                    <div className="menu">
                                        <div className="itemPhoto">
                                            <img className="recipe-image" src={data.Image} alt="Food Item" />
                                        </div>
                                        <div className="menu-info">
                                            <div className="progress-container">

                                            </div>

                                            <h5>{data.Name}</h5>
                                            <h6>{data.RecipeDesc}</h6>
                                           

                                        </div>
                                        <div className = "buttonwrapper">
                                        <button className="btn1">-</button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Recipes

