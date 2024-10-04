const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipeApp';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    
    // Remove all existing recipes
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log('Connected to MongoDB!');
    
    // Create a new recipe
    return Recipe.create({
      title: "Spaghetti Carbonara",
      level: "Amateur Chef",
      ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese", "Pepper"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://example.com/carbonara.jpg",
      duration: 20,
      creator: "Chef Luigi"
    });
  })

  //log the recipe with its title
  .then((recipe) => {
    console.log(`Recipe created: ${recipe.title}`);
  })
  .then(() => {
    // Insert multiple recipes from data.json
    return Recipe.insertMany(data);
  })
  //loop through the recipes and log them all.
  .then((recipes) => {
    recipes.forEach(recipe => {
      console.log(`Inserted recipe: ${recipe.title}`);
    });
    recipes.forEach(recipe => {
      console.log(`Inserted recipe: ${recipe.title}`);
    });

    // It4: Update duration recipe "Rigatoni alla Genovese"
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, // find it
      { duration: 100 },                  // Update duration
      { new: true }                       // Return updated document
    );
  })
  .then((updatedRecipe) => {
    console.log(`Updated recipe: ${updatedRecipe.title}, new duration: ${updatedRecipe.duration}`);

    // Deleting "Carrot Cake"
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Successfully deleted the Carrot Cake recipe");
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    // Close the connection in the finally block to ensure it runs after all operations
    mongoose.connection.close()
      .then(() => console.log('Connection to MongoDB closed.'))
      .catch(err => console.error('Error closing connection:', err));
  });
