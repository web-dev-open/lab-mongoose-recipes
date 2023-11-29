const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const firstRecipe = {
  title: "Orange and Milk-Braised Pork Carnitas first Recipe",
  level: "Amateur Chef",
  ingredients: [
    "3 1/2 pounds boneless pork shoulder, cut into large pieces",
    "1 tablespoon freshly ground black pepper",
    "1 tablespoon kosher salt, or more to taste",
  ],
  cuisine: "American",
  dishType: "main_course",
  duration: 10,
  creator: "Chef John",
};

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    /**
     * async with then() chain was not working correctly,
     * that's why I use a function with await
     */
    manipulateDB();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

async function manipulateDB() {
  // Step 2:
  let recipe = await Recipe.create(firstRecipe);
  console.log(recipe.title);

  // Step 3:
  const recipes = await Recipe.insertMany(data);
  recipes.forEach((recipe) => console.log(recipe.title));

  // Step 4:
  const updatedRecipe = await Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: 100 },
    { new: true }
  );
  console.log("Successfully updated duration to:", updatedRecipe.duration);

  // Step 5:
  const deletedRecipe = await Recipe.findOneAndDelete({
    title: "Carrot Cake",
  });
  console.log("Successfully removed recipe with title:", deletedRecipe.title);

  // Step 6:
  await mongoose.connection.close();
  console.log("Connection closed");
}
