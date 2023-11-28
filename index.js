const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Recipe.create(data[0]);
    //Recipe.insertMany(data);
    //Recipe.findOneAndUpdate({ duration: "220" }, { duration: 100 })
    // Recipe.deleteOne({ title: "Carrot Cake" })
    //   .then(() => {
    //     console.log("Reciepe deleted");
    //   })
    //   .catch((err) => {
    //     console.error("delete failed", err);
    //   });
    // mongoose.connection.close();
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
