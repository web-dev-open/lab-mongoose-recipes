const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-App';

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log('Inserting recipes from data.json...');
    return Recipe.insertMany(data);
  })
  .then(() => {
    console.log('Updating duration for "Rigatoni alla Genovese"...');
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then(updatedRecipe => {
    console.log(`Successfully updated duration for "${updatedRecipe.title}"`);
    // Find all recipes after updating the duration
    //deleting the Carrot Cake recipe
    return Recipe.deleteOne({title:'Carrot Cake'});
  })
  //promise for deleted recipe
  .then(()=>{
    console.log('Successfully removed Carrot Cake recipe')
    return Recipe.find();
  })
  //logs of remaining recipes
  .then(recipes => {
    console.log('Remaining recipes:');
    recipes.forEach(recipe => {
      console.log(recipe.title);
    });
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed.');
  })
  .catch(error => {
    console.error('Error:', error);
    //db connection is closedin case of an error
    mongoose.connection.close();
  });
