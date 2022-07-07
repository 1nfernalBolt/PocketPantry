const mongoose = require('mongoose');

// Schema of what a recipe has
const recipeSchema = mongoose.Schema(
    {
        RecipeId: {
            type: Number,
            required: true,
        },
        Name: {
            type: String,
            required: true,
        },
        Image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


// Link "Recipe" to the schema and export
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
