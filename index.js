const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Function to connect to the MongoDB database
async function main() {
  try {
    // Connect to the database
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${mongoose.connection.name}"`);

    // Iteration 3 - Insert multiple recipes
    await Recipe.insertMany(data);
    console.log('Added the following recipes to the database:');
    data.forEach(recipe => {
      console.log(recipe.title);
    });

    // Iteration 4 - Update recipe
    await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
    console.log('Updated duration for Rigatoni alla Genovese to 100 minutes.');

    // Iteration 5 - Remove a recipe
    await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('Removed Carrot Cake from the database.');

    // Iteration 6 - Close the database
    await mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the main function to execute the tasks
main();
