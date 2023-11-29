const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const JsonFile = require('./data.json')

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.deleteOne({"title": "Carrot Cake"} )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
     console.log("Something went wrong", err)                          
    })
    //Iteration #4
    // Recipe.findOneAndUpdate({"title": "Rigatoni alla Genovese"},
    //                         {$inc: {duration: -100}} )
    //                         .then((res) => {
    //                           console.log(res)
    //                         })
    //                         .catch((err) => {
    //                          console.log("Something went wrong", err)                          
    //                         })
    // Iteration #3: 
    // Recipe.insertMany(JsonFile)
    //    .then((res) => {
    //     console.log(res)
    //    })
    //    .catch((err) => {
    //     console.log("Something went wrong", err)
    //    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });