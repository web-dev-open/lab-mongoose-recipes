const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Recipe = require('./models/Recipe.model');
const recipes = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

async function runRecipeApp() {
  try {
    
    const x = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${x.connection.name}"`);
    await Recipe.deleteMany();
    console.log('Database cleared cleanly.');

    // --- Iteration 2: Create a single recipe ---
    const myRecipe = await Recipe.create({
      title: 'Perfect Homemade Pizza',
      level: 'Amateur Chef',
      ingredients: ['Flour', 'Water', 'Yeast', 'Tomato Sauce', 'Mozzarella Cheese'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 45,
      creator: 'Chef YourName'
    });
    console.log(`Successfully created recipe: ${myRecipe.title}`);

    // --- Iteration 3: Insert multiple recipes from data.json ---
    const multiRecipes = await Recipe.insertMany(recipes);
    console.log('\n--- Inserted Multiple Recipes ---');
    multiRecipes.forEach(recipe => {
      console.log(`Inserted: ${recipe.title}`);
    });

    // --- Iteration 4: Update recipe ---
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
    
    if (updatedRecipe) {
      console.log(`\nSUCCESS: Updated duration for ${updatedRecipe.title} to ${updatedRecipe.duration} mins.`);
    } else {
      console.log('\nWARNING: Rigatoni alla Genovese not found to update.');
    }

    // --- Iteration 5: Remove a recipe ---
    const deletedInfo = await Recipe.deleteOne({ title: 'Carrot Cake' });
    if (deletedInfo.deletedCount > 0) {
      console.log('SUCCESS: Carrot Cake was successfully removed from the database.');
    } else {
      console.log('WARNING: Carrot Cake was not found to delete.');
    }

  } catch (error) {
    console.error('Error handling database operations:', error);
  } finally {
    // --- Iteration 6: Close the Database ---
    await mongoose.connection.close();
    console.log('\nDisconnected from the database cleanly.');
  }
}

runRecipeApp();