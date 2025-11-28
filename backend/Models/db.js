const mongoose = require('mongoose');
const mongo_url = process.env.mongo_url || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongo_url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    }); 