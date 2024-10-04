const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true, 
    unique: true    //  title is unique within the collection
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'], // Limits values to these only
  },
  ingredients: [String], // Array of strings for ingredients
  cuisine: {
    type: String,
    required: true, 
  },
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'], // Limits to these specific dishtypes
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg" // Default image if nn provided
  },
  duration: {
    type: Number,
    min: 0 // minimum value
  },
  creator: String, 
  created: {
    type: Date,
    default: Date.now // Autosets the current date if not provided
  }});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
