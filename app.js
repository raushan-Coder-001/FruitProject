const mongoose = require('mongoose');
// mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
    name: {
      type: String,
      required:[true,"Please check your data entry, no name specified!"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as fruits."
});
// fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema 
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
  name: "Raushan",
  age: 22,
  favouriteFruit: fruit
});

// person.save();

const kiwi = new Fruit ({
  name: "Kiwi",
  rating: 5,
  review: "Good for many diseases."
});

const orange = new Fruit ({
  name: "Orange",
  rating: 9,
  review: "Best for making juices."
});

const banana = new Fruit ({
  name: "Banana",
  rating: 7,
  review: "It has weird texture."
});

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log("Succesfully saved all of the fruits in DB.");
//   }
// });

Fruit.find(function(err, fruits) {
  if(err) {
    console.log(err);
  }
  else {
    // console.log(fruits);
    mongoose.connection.close();
    fruits.forEach(fruit => {
      console.log(fruit.name);
    });
  }
});

