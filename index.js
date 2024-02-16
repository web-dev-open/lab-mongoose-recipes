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
    // Add new recipes after existing ones are deleted
    return Recipe.insertMany(data);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  .then(() => {
    // Find and display all recipes
    return Recipe.find();
  })
  .then(recipes => {
    recipes.forEach(r => {
      console.log(r.title);
    });

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, 
      { duration: 100 },
      { new: true }
    )

  Recipe.deleteOne({ title: 'Carrot Cake' }, (err) => {
    if (err) {
      console.error('Error deleting the recipe:', err);
    } else {
      console.log('Carrot Cake recipe has been successfully deleted!');
    }
  })});

  // mongoose.connection.close()
  }).catch(error => {
    console.error('Error connecting to the database', error);
  });
