// server.js
const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { CronJob } = require('cron');

const user = require('./routes/User');
const provider = require('./routes/provider');
const food = require('./routes/foods');
const order = require('./routes/order');
const address = require('./routes/address');
const review = require('./routes/review');
const contact = require('./routes/Contact');
const initialData = require('./routes/initialData');
const foodModel = require('./models/food');

// Initialize environment variables
env.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://the-tiffin-wala.vercel.app', // Update to your frontend URL
    credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected");
}).catch(err => {
    console.error("Database connection error:", err);
});

// Update food quantities
const updateFood = async () => {
    try {
        const foods = await foodModel.find();
        for (let i = 0; i < foods.length; i++) {
            await foodModel.findByIdAndUpdate(foods[i]._id, { $set: { quantity: foods[i].enteredQuantity } });
        }
    } catch (error) {
        console.error("Error updating food quantities:", error);
    }
};

// Set up Cron Job
new CronJob('0 0 * * *', async () => {
    console.log('Cron job started');
    await updateFood();
    console.log('Cron job finished');
}, null, true, 'Asia/Kolkata');

// Routes
app.get('/', (req, res) => {
    console.log("Server Is Running");
    res.send("Server Is Running");
});

app.use('/api/v1/user', user);
app.use('/api/v1/provider', provider);
app.use('/api/v1/food', food);
app.use('/api/v1/order', order);
app.use('/api/v1/address', address);
app.use('/api/v1/review', review);
app.use('/api/v1/reach', contact);
app.use('/api/v1/initialData', initialData);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is Running on port " + PORT);
});

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Optionally, you might want to exit the process or perform cleanup
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, you might want to exit the process or perform cleanup
});
