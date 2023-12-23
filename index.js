const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x=> {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe={
      title: "Apple Pie",
      level: "Amateur Chef",
      ingredients: [
        "1 recipe pastry for a 9 inch double crust pie",
        "1/2 cup unsalted butter",
        "3 tablespoons all-purpose flour",
        "1/4 cup water",
        "1/2 cup white sugar",
        "1/2 cup packed brown sugar",
        "8 Granny Smith apples - peeled, cored and sliced"
      ],
      cuisine: "French",
      dishType: "dessert",
      image: "https://i.imgur.com/lGGM68Q.jpg",
      duration: 60,
      creator: "Grenny"
    }
    data.push(newRecipe);
    const manyRecipes= await Recipe.insertMany(data);
    manyRecipes.forEach((recipe)=>{
      console.log(recipe.title)
    });
    await Recipe.findOneAndUpdate(
      {title:'Rigatoni alla Genovese'},
      {$set:{duration: 100}}
    );
    console.log('we successfully updated it.')
    await Recipe.deleteOne({title:'Carrot Cake'})
    console.log('we deleted Carrot Cake successfully.')
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
