const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const CronJob = require('cron').CronJob;

const user = require('./routes/User');
const provider = require('./routes/provider');
const food = require('./routes/foods');
const order = require('./routes/order');
const address = require('./routes/address');
const review = require('./routes/review');
const contact = require('./routes/Contact');
const initialData = require('./routes/initialData');
const foodModel = require('./models/food');

const app = express();

env.config();

const originsWhitelist = [
    'https://tiffin-managment-client.vercel.app',
    'http://localhost:3000'
];
const corsOptions = {
    origin: function (origin, callback) {
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected");
});

const updateFood = async () => {
    const foods = await foodModel.find();
    for (let i = 0; i < foods.length; i++) {
        await foodModel.findByIdAndUpdate(foods[i]._id, { $set: { quantity: foods[i].enteredQuantity } });
    }
};

new CronJob('0 0 * * *', async () => {
    await updateFood();
}, null, true, 'Asia/Kolkata');

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

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is Running on port " + PORT);
});