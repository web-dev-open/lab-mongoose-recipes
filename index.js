const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({
      title:"iMadeOneRecipie",
      level: "Easy Peasy", ingredients:['One','Two','Three'],  cuisine:"All Loved Food", dishType:"breakfast",
      duration:20, creator:"MySelf" 
    }).then(()=>{
      Recipe.find({},{title:1, _id:0}).then((result)=>{console.log(result)})      
    })

    Recipe.insertMany(data)
    .then(()=>{
      Recipe.find({},{title:1, _id:0})
      .then((titles)=>{console.log(titles);})     
    })
    .then(()=>{
      Recipe.find({title:{$eq:"Rigatoni alla Genovese"}}, {_id:1})
      .then((docId)=>{
        Recipe.findByIdAndUpdate(docId,{duration:100})
        .then(()=>console.log("Updated the duration..."))
        .catch(()=>{console.log("Failed to update the duration...")})
      })
    })
    .then(()=>{
      Recipe.deleteOne({title:"Carrot Cake"})
      .then(()=>{
        console.log("Deleted OK...")
        mongoose.connection.close((err)=>{if(!err)
          {console.log('Connection to DB closed...')}
          else{console.log('Failed to close the connection to DB...');}
      })
      })
      .catch(()=>console.log("Failed to delete..."))
    })
    

  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });