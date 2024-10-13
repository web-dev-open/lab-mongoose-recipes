const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://localhost:27017/Recipie",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
    
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Spaghetti Carbonara',
      level: 'Easy Peasy',
      ingredients: ['spaghetti', 'egg', 'cheese', 'bacon', 'pepper'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 30,
      creator: 'Chef Luigi',
  });
})
.then((recipe) => {
  console.log(`Recipe created: ${recipe.title}`);
})
.catch((error) => {
  console.error('Error creating recipe:', error);
})
.finally(() => {
  mongoose.connection.close();
});

