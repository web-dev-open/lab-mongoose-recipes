const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');

mongoose
  .connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');

    // Add a new recipe
    Recipe.create({
      title: 'Your Recipe Title',
      level: 'Easy Peasy',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      cuisine: 'Cuisine Type',
      dishType: 'main_course',
      duration: 30,
      creator: 'Your Name',
    })
      .then((recipe) => {
        console.log(`Recipe added: ${recipe.title}`);
      })
      .catch((error) => {
        console.error('Error adding recipe:', error.message);
      })
      .finally(() => {
        // Close the database connection
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });
// ... (previous code)

// Import recipes from data.json
const recipesArray = require('./data.json');

// Insert multiple recipes
Recipe.insertMany(recipesArray)
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(`Recipe added: ${recipe.title}`);
    });
  })
  .catch((error) => {
    console.error('Error adding recipes:', error.message);
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close();
  });


// Update recipe duration
Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => {
    console.log('Recipe updated successfully!');
  })
  .catch((error) => {
    console.error('Error updating recipe:', error.message);
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close();
  });


// Remove a recipe
Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
    console.log('Recipe removed successfully!');
  })
  .catch((error) => {
    console.error('Error removing recipe:', error.message);
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close();
  });


// Close the database connection
mongoose.connection.close()
  .then(() => {
    console.log('Database connection closed.');
  })
  .catch((error) => {
    console.error('Error closing database connection:', error.message);
  });
