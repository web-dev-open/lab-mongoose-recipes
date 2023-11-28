const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Spagetti",
      level: "Easy Peasy",
      ingredients: ["1/2 cup rice vinegar", "5 tablespoons honey"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 1
    })
    .then(()=>{
      Recipe.find({},{title:1, _id:0}).then((res)=>{console.log(res)})      
    })

    Recipe.insertMany(data)
    .then(()=>{
      Recipe.find({},{title:1, _id:0}).then((res)=>{console.log(res)})
    })
    .then(()=>{
      Recipe.findOneAndUpdate({ duration: "220" }, { duration: 100 })
      .then((res)=>{
        console.log('Duration updated successfully')
        console.log(res)
      })
      .catch((err)=>{
        console.log('Failed to update', err)
      })

    })
    .then(()=>{
      Recipe.deleteOne({title: "Carrot Cake"})
      .then((res)=>{
          console.log('Successfully Deleted Reciepe', res);
          mongoose.connection.close()
          .then(()=>{
            console.log('DB Connection closed ✅')
          })
          .catch((err)=>{
            console.log('Failed to close the DB connection !',err)
          })      

      })
      .catch((err)=>{
        console.log('Failed to delete', err);
      })
    })
   
    
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
