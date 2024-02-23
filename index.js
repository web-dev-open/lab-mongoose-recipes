const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-App';

// Connection to the database "recipe-App"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
    //updating the duration in the document
    return Rexipe.findOneAndUpdate(
      {title:'Rigatoni alla Genovese'},
      {duration:100},
      {new:true}
    );
  })
  .then(updateRecipe = {
    console.log(`Successfully updated duration for ${updatedRecipe.title}`);
    
    
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // return Recipe.create({
    //   title:'Spaghetti Carbonara',
    //   level:'Easy Peasy',
    //   ingredients:['spaghetti','eggs','bacon','black pepper','Permasan cheese'],
    //   cuisine:'Italian',
    //   dishType:'main_course',
    //   duration:30,
    //   creator:'Chef Luigi Van Gal'
    // })
    //inserting the documents from the json file
    return Recipe.insertMany(data);
  })

  .then(recipes=> {
    // console.log(`New recipe created: ${recipe.title}`);
    // return mongoose.connection.close();
    console.log('Recipes inserted:');
    recipes.forEach(recipe => {
      console.log(recipe.title);
  })
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
