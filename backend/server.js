const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require("path");
const { response } = require('express');
//const userRoutes = require('./routes/userRoutes');
//const pantryRoutes = require('./routes/pantryRoutes');
//const recipeRoutes = require('./routes/recipeRoutes');
//const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// ------------deployment--------------
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        response.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    })
} else {
    app.get('/', (req, res) => {
        res.send("API is running");
    });
}

//app.use('/api/users', userRoutes);
//app.use('/api/pantry', pantryRoutes);
//app.use('/api/recipe', recipeRoutes);
//app.use(notFound);
//app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));