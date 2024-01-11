const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Create a new recipe document
const newRecipe = {
  title: 'Example Recipe',
  level: 'Easy Peasy', // not level: ['Easy Peasy']
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  cuisine: 'Example Cuisine',
  dishType: 'main_course',
  duration: 30,
  creator: 'John Doe'
};



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
   return Recipe.insertMany(data)
   
  })
  .then((createdRecipe) => {
    // Log the title of the created recipe
    createdRecipe.forEach(recipe=>{

      console.log(`Recipe created: ${recipe.title}`);
    })
  })
  .then(()=>{
    return Recipe.findOneAndUpdate(
      {title:"Rigatoni alla Genovese"},
    {$set:{duration:100}},
    {new:true}
      )
  })
  .then((updatedRecipe)=>{
    console.log("Recipe updated :",updatedRecipe.title)
  })
  .then(()=>{
    return Recipe.deleteOne(
      {title: "Carrot Cake"},
      {new:true}
    )
  }).
  then(()=>{
    console.log('Successfully removed Carrot Cake recipe');
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(()=>{
    mongoose.connection.close()
  })
