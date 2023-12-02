const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: {
    type: [String],
  },
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'],
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const recipesData = require('./data.json');

// Establish database connection
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

// Check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');

  // Insert the entire array of recipes into the database
  Recipe.insertMany(recipesData)
    .then((createdRecipes) => {
      // Print the title of each inserted recipe
      createdRecipes.forEach((recipe) => {
        console.log(`Recipe inserted successfully! Title: ${recipe.title}`);
      });
    })
    .catch((error) => {
      console.error('Error inserting recipes:', error.message);
    })
    .finally(() => {
      // Close the database connection after inserting the recipes
      mongoose.connection.close();
    });
    const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to the database');

  try {
    // Update the duration for "Rigatoni alla Genovese" recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } },
      { new: true }
    );

    if (updatedRecipe) {
      console.log('Recipe updated successfully! Title:', updatedRecipe.title);
    } else {
      console.log('Recipe not found for update.');
    }
  } catch (error) {
    console.error('Error updating recipe:', error.message);
  } finally {
    // Close the database connection after updating the recipe
    mongoose.connection.close();
  }
}
);
