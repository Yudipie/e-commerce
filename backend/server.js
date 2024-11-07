const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler');

const connectDb = require('./config/dbConnection')
connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.get('/',(req,res) => {
    res.json({
        title:"home page",
        message: "this is the landing call"
    })
})

app.use(express.json());
app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/products',require('./routes/prodRoutes'))
app.use('/api/specs',require('./routes/specRoutes'))
app.use('/api/checkout',require('./routes/checkoutRoutes'))
app.use(errorHandler)

app.listen(port, () => {
    console.log("server running on port");
})