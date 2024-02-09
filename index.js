const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
  })
  // .then(() => {
  //   //  ITERATION 2
  //   Recipe.create(
  //     {
  //       "title": "Asian Glazed Chicken Thighs",
  //       "level": "Amateur Chef",
  //       "ingredients": [
  //         "1/2 cup rice vinegar",
  //         "5 tablespoons honey",
  //         "1/3 cup soy sauce (such as Silver Swan®)",
  //         "1/4 cup Asian (toasted) sesame oil",
  //         "3 tablespoons Asian chili garlic sauce",
  //         "3 tablespoons minced garlic",
  //         "salt to taste",
  //         "8 skinless, boneless chicken thighs"
  //       ],
  //       "cuisine": "Asian",
  //       "dishType": "main_course",
  //       "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  //       "duration": 40,
  //       "creator": "Chef LePapu"
  //     }
  //   ).then((data) => {
  //     console.log(`Recipe name: ${data.title}`)
  //   })
  // })
  // .then(() => {
  //   //ITERATION 3
  //   Recipe.insertMany(data)
  //     .then(() => {
  //       console.log("Data saved.");
  //     })
  // })
  // .then(() => {
  //   //ITERATION 4
  //   const query = { title: "Rigatoni alla Genovese" };
  //   const set = { duration: 100 };
  //   const returned = Recipe
  //     .findOneAndUpdate(query, set, { new: true })
  //     .then((updatedDoc) => console.log("Updated Document: " + updatedDoc))
  //     .catch((err) => console.log("Some error occured while updating the document."));
  // })
  // .then(() => {
  //   //ITERATION 5
  //   Recipe
  //     .deleteOne({ title: "Carrot Cake" }, { new: true })
  //     .then((deletedDoc) => console.log("Deleted Document " + deletedDoc))
  //     .catch((err) => console.log("Error occured while deleting the document."));
  // })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
