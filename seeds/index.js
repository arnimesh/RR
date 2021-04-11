const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/hackfinal', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i <50; i++) {
        const random1000 = Math.floor(Math.random() * 50);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '60721789b1d0476680610aa1',
            location: `${cities[random1000].city}, ${cities[random1000].admin_name}`,
            title: `${sample(descriptors)} `,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].lng,
                    cities[random1000].lat,
                ]
            },
            images: [
                {
                    //url: 'https://res.cloudinary.com/ducqvbmtm/image/upload/v1618028367/YelpCamp/dfutuspb3sa5tcds1fdt.jpg',
                    url : "https://res.cloudinary.com/ducqvbmtm/image/upload/v1618090373/YelpCamp/e5fxkq0gfvwxnewyzxbl.jpg",
                    filename: "YelpCamp/e5fxkq0gfvwxnewyzxbl"
                }
                
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})