const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

// Replace with your MongoDB Atlas connection string
const MONGODB_URI = 'mongodb_uri';

// Connection to the MongoDB Atlas database
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: 'Chocolate Chip Cookies',
      level: 'Amateur Chef',
      ingredients: ['flour', 'sugar', 'chocolate chips', 'butter', 'eggs', 'baking powder'],
      cuisine: 'American',
      dishType: 'dessert',
      duration: 30,
      creator: 'Navin Raj Govindan'
    });
  })
  .then(newRecipe => {
    console.log(`Recipe created: ${newRecipe.title}`);
    return Recipe.insertMany(data);
  })
  .then(insertedRecipes => {
    insertedRecipes.forEach(recipe => console.log(`Inserted recipe: ${recipe.title}`));
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then(updatedRecipe => {
    console.log(`Successfully updated the recipe: ${updatedRecipe.title}`);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Successfully removed the recipe: Carrot Cake');
    mongoose.connection.close(() => {
      console.log('Database connection closed.');
    });
  })
  .catch(error => {
    console.error('Error performing operations', error);
  });

