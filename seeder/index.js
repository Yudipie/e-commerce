// seeders/seedProducts.js

const axios = require('axios');

// Define your array of products
const products = [
    {
        name: 'McLaren P1',
        price: '1150000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/2015-03-03_Geneva_Motor_Show_3448.JPG/1200px-2015-03-03_Geneva_Motor_Show_3448.JPG',
        details: 'The McLaren P1 is a hybrid hypercar with a 3.8-liter twin-turbo V8 engine and electric motor, producing 903 horsepower. It accelerates from 0 to 60 mph in 2.8 seconds, with a top speed of 217 mph.',
        category: 'McLaren'
    },
    {
        name: 'Ferrari LaFerrari',
        price: '1420000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Ferrari_LaFerrari.jpg/1200px-Ferrari_LaFerrari.jpg',
        details: 'The Ferrari LaFerrari is a hybrid supercar with a 6.3-liter V12 engine and electric motor, delivering 950 horsepower. It goes from 0 to 60 mph in under 3 seconds, with a top speed over 217 mph.',
        category: 'Ferrari'
    },
    {
        name: 'Porsche 918 Spyder',
        price: '845000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Porsche_918_Spyder_-_Mondial_de_l%27Automobile_de_Paris_2014_-_001.jpg/1200px-Porsche_918_Spyder_-_Mondial_de_l%27Automobile_de_Paris_2014_-_001.jpg',
        details: 'The Porsche 918 Spyder is a hybrid supercar with a 4.6-liter V8 engine and two electric motors, producing 887 horsepower. It accelerates from 0 to 60 mph in 2.5 seconds, with a top speed of 211 mph.',
        category: 'Porsche'
    },
    {
        name: 'Mercedes SL 63',
        price: '140000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mercedes-Benz_SL_63_AMG_%28R_231%29_%E2%80%93_Frontansicht%2C_15._Juni_2013%2C_Hilden.jpg/1200px-Mercedes-Benz_SL_63_AMG_%28R_231%29_%E2%80%93_Frontansicht%2C_15._Juni_2013%2C_Hilden.jpg',
        details: 'The Mercedes SL 63 is a powerful roadster with a 4.0-liter twin-turbo V8 engine producing 577 horsepower. It goes from 0 to 60 mph in 3.5 seconds, with a top speed of 186 mph.',
        category: 'Mercedes'
    },
    {
        name: 'Aston Martin DB12',
        price: '245000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Aston_Martin_DB11_20180306_Genf_2018.jpg/1200px-Aston_Martin_DB11_20180306_Genf_2018.jpg',
        details: 'The Aston Martin DB12 is a grand tourer with a 4.0-liter twin-turbo V8 engine, producing 528 horsepower. It accelerates from 0 to 60 mph in 3.6 seconds, with a top speed of 202 mph.',
        category: 'Aston Martin'
    },
    {
        name: 'Rolls-Royce Phantom',
        price: '450000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Rolls-Royce_Phantom_VIII_Genf_2019_1Y7A5665.jpg/1200px-Rolls-Royce_Phantom_VIII_Genf_2019_1Y7A5665.jpg',
        details: 'The Rolls-Royce Phantom is a luxury sedan with a 6.75-liter V12 engine producing 563 horsepower. It offers unparalleled comfort and refinement, with a top speed of 155 mph.',
        category: 'Rolls-Royce'
    },
    {
        name: 'Ferrari F40',
        price: '1500000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ferrari_F40_IMG_0509.jpg/1200px-Ferrari_F40_IMG_0509.jpg',
        details: 'The Ferrari F40 is an iconic supercar with a 2.9-liter twin-turbo V8 engine producing 471 horsepower. It accelerates from 0 to 60 mph in 3.8 seconds, with a top speed of 201 mph.',
        category: 'Ferrari'
    },
    {
        name: 'McLaren 720S',
        price: '299000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/McLaren_720S_5.jpg/1200px-McLaren_720S_5.jpg',
        details: 'The McLaren 720S is a supercar with a 4.0-liter twin-turbo V8 engine producing 710 horsepower. It goes from 0 to 60 mph in 2.8 seconds, with a top speed of 212 mph.',
        category: 'McLaren'
    },
    {
        name: 'Mitsubishi Evo',
        price: '38000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/2015_Mitsubishi_Lancer_Evolution_FQ-440_MR.jpg/1200px-2015_Mitsubishi_Lancer_Evolution_FQ-440_MR.jpg',
        details: 'The Mitsubishi Evo is a rally-inspired sedan with a 2.0-liter turbocharged engine producing 291 horsepower. It accelerates from 0 to 60 mph in 4.4 seconds, with a top speed of 155 mph.',
        category: 'Mitsubishi'
    }
];


// Function to seed products
const seedProducts = async () => {
    for (const product of products) {
        try {
            const res = await axios.post('http://localhost:5000/api/products/prod', product);
            console.log(`Inserted: ${product.name}`);
        } catch (error) {
            console.error(`Error inserting ${product.name}:`, error.message);
        }
    }
    console.log('Seeding completed.');
    process.exit(); // Exit the process after seeding
};

// Execute the seeding function
seedProducts();
