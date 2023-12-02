const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');

// Establish database connection
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

// Check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');

  // Create a new recipe document
  const newRecipeDetails = {
    title: 'Spaghetti Bolognese',
    level: 'UltraPro Chef',
    ingredients: ['500g ground beef', '1 onion', '2 cloves garlic', '400g canned tomatoes', '250g spaghetti'],
    cuisine: 'Italian',
    dishType: 'main_course',
    duration: 45,
    creator: 'Chef Maria',
  };

  Recipe.create(newRecipeDetails)
    .then((createdRecipe) => {
      console.log(`Recipe created successfully! Title: ${createdRecipe.title}`);
    })
    .catch((error) => {
      console.error('Error creating recipe:', error.message);
    })
    .finally(() => {
      // Close the database connection after creating the recipe
      mongoose.connection.close();
    });
});
