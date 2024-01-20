const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const firstRecipe = {
  title: "Tandoori Cheese Naan & Paneer Angaara with Buttermilk and Pickel",
  level: "Amateur Chef",
  ingredients: [
    "For Tandoori Cheese Naan :: 2 cup maida, 1 tsp baking powder, ½ tsp baking powder, 2 tbsp sugar, ½ tsp salt, ¾ cup curd, 2 tbsp oil, milk as required, butter for stuffing, cheese for stuffing, chilli flakes for stuffing, kalonji, coriander finely chopped",

    "For Paneer Angaara :: For Gravy : 2-3 tbsp Oil, तेल 3-4 no. Cloves, लौंग 6-7 no. Black peppercorns, काली मिर्च के दाने ¼ tsp Asafoetida, हींग Prepared Ginger Green chili paste, तयार किया हुआ अदरक हरी मिर्च का पेस्ट 3-4 no. large Tomato, roughly diced, टमाटर 1 ½ tsp Degi red chili powder, देगी लाल मिर्च पाउडर ¼ tsp Turmeric powder, हल्दी पाउडर 1 heaped tbsp Coriander powder, धनिया पाउडर 10-12 no. Almonds (optional) बादाम 1 cup Curd, beaten, दही 1 ½ cups Water, पानी 1 tbsp Tender Coriander stems, finely chopped, धनिये का डंठल Salt to taste, नमक स्वादअनुसार ¼ tsp Sugar, चीनी ¼ cup Water, पानी Fried paneer, तला हुआ पनीर",
    "For Ginger Green Chili Paste : 1 ½ inch Ginger (peeled & roughly chopped) अदरक 3 no. Green chillies (less spicy & roughly torn) हरी मिर्च Salt to taste, नमक स्वादअनुसार",
    "For Masala : Salt to taste, नमक स्वादअनुसार 1 tbsp Black peppercorns, काली मिर्च के दाने 10-12 no. Green cardamom, हरी इलायची 1 tbsp dry Fenugreek leaves, कसूरी मेथी",
    "For Frying Paneer : 1 tbsp Oil, तेल ½ tbsp Ghee, घी 400 gms Paneer, cut diagonally, पनीर Salt to taste, नमक स्वादअनुसार 1 tsp Degi red chili powder, देगी लाल मिर्च पाउडर",
    "For Smoke : Coal, कोयला 2-3 no. Green cardamom, हरी इलायची 1 tsp Ghee, घी",
    "For Garnish : Coriander sprig, धनिया पत्ता ¼ tsp Prepared Masala, तयार किया हुआ मसाला", "For Masala Chaas :: 1.5 cups Curd (Yogurt) - 375 grams, 1 teaspoon roasted cumin powder (bhuna jeera powder), add as required, 1 cup water (cold) or as needed, 1 tablespoon mint leaves - chopped or coriander leaves (cilantro), optional, 5 to 6 small ice cubes - optional, ½ teaspoon black salt or regular salt, add as required, 3 to 4 mint sprigs or coriander sprigs, for garnish",

    "For Pickel :: 1 kilogram mangoes or 7 to 7.5 cups of chopped mangoes - unripe and green, ¼ cup mustard seeds - 40 grams, black or yellow or 40 grams split yellow mustard seeds, ¼ cup fenugreek seeds - 45 grams or 45 grams split fenugreek seeds, ¼ cup fennel seeds - 30 grams, ¼ cup nigella seeds (kalonji) - 30 grams, 3 tablespoons turmeric powder (ground turmeric) - 15 grams, ¼ cup red chili powder or cayenne pepper - 25 grams, ½ cup rock salt (edible and food grade) - 125 grams or add as required - can also add regular salt or pink salt, 3 cups mustard oil - add more if required",
  ],
  cuisine: "Indian",
  dishType: "main_course",
  duration: 10,
  creator: "Master Chef Tirth",
  image: "https://img.youtube.com/vi/2llKoPqi0Bc/sddefault.jpg"
};

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.set("strictQuery", true);


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    manipulateDB();
  })
  .catch(error => {
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
      { title: "Paneer Khurchan Masala" },
      { duration: 100 },
      { new: true }
    );
    console.log("Successfully updated duration to:", updatedRecipe.duration);
  
    // Step 5:
    const deletedRecipe = await Recipe.findOneAndDelete({
      title: "Orange and Milk-Braised Pork Carnitas",
    });
    console.log("Successfully removed recipe with title:", deletedRecipe.title);
  
    // Step 6:
    await mongoose.connection.close();
    console.log("Connection closed");
  }