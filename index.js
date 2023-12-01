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

// Iteration 2: Create a recipe
  .then(() => {
    // Add a new recipe to the database
    return Recipe.create({
      title: 'Your Recipe Title',
      level: 'Easy Peasy',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      cuisine: 'Your Cuisine',
      dishType: 'main_course',
      image: 'https://example.com/image.jpg',
      duration: 30,
      creator: 'Your Name',
    });
  })
  .then((createdRecipe) => {
    console.log(`Recipe created: ${createdRecipe.title}`);
  })
 
 // Iteration 3: Insert multiple recipes
  .then(() => {
    // Insert multiple recipes from data.json
    return Recipe.insertMany(data);
  })
  .then((insertedRecipes) => {
    // Print the title of each inserted recipe
    insertedRecipes.forEach((recipe) => {
      console.log(`Recipe inserted: ${recipe.title}`);
    });
  })

// Iteration 4: Update recipe
  // .then(() => {
  //   return Recipe.insertMany(data);
  // })  
  .then(() => {
    // Update the duration of 'Rigatoni alla Genovese' to 100
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    // Print a success message
    console.log(`Recipe updated successfully: ${updatedRecipe.title}`);
  })

// Iteration 5: Remove a recipe
  // .then(() => {
  //   return Recipe.insertMany(data);
  // }) 
  .then(() => {
    // Remove the 'Carrot Cake' recipe
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    // Print a success message
    console.log('Recipe removed successfully: Carrot Cake');
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

// Iteration 6: Close the database
  .finally(() => {
    // Close the database connection after creating the recipe
    mongoose.connection.close();
  });
