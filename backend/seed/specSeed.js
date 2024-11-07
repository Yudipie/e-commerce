const  dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../model/prodModel');
const Specifications = require('../model/specModel');

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedSpecs = async() => {
    try{
        const products = await Product.find({
            name: { $in: ['911 GT3RS', 'Daytona SP3', 'AMG GT 63', 'Z4'] }
        });

        if (products.length < 4) {
            console.log('Not all products found. Please ensure that the products are seeded correctly.');
            mongoose.connection.close();
            return;
        }

        // Create a map for quick product lookup
        const productMap = products.reduce((map, product) => {
            map[product.name] = product._id;
            return map;
        }, {});

        // Seed specifications data using existing product IDs
        const specsData = [
            {
                product: productMap['911 GT3RS'],
                engine: '4.0L Flat-Six',
                horsepower: 518,
                rating: 4.9,
                transmission: '7-Speed PDK',
                topSpeed: 319,
                zeroToSixty: 3.0
            },
            {
                product: productMap['Daytona SP3'],
                engine: '6.5L V12',
                horsepower: 828,
                rating: 5.0,
                transmission: '7-Speed Dual-Clutch',
                topSpeed: 340,
                zeroToSixty: 2.9
            },
            {
                product: productMap['AMG GT 63'],
                engine: '4.0L V8 Bi-Turbo',
                horsepower: 630,
                rating: 4.8,
                transmission: '9-Speed Automatic',
                topSpeed: 315,
                zeroToSixty: 3.1
            },
            {
                product: productMap['BMW Z4'],
                engine: '3.0L Inline-6 Turbo',
                horsepower: 382,
                rating: 4.7,
                transmission: '8-Speed Automatic',
                topSpeed: 250,
                zeroToSixty: 4.4
            }
        ];

        await Specifications.insertMany(specsData);

        console.log('Specifications seeded successfully');
        mongoose.connection.close();
    }
    catch(err){
        console.error('Error seeding specifications:', err);
        mongoose.connection.close();
    }
}