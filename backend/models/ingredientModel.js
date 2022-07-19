const mongoose = require('mongoose');

// Schema of what an ingredient has
const ingredientSchema = mongoose.Schema(
    {
        IngredientId: {
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
        Amount: {
            type: Number,
            required: true,
        },
        Unit: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


// Link "Ingredient" to the schema and export
const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
