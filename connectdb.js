const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:admin@cluster0.xsxq1ju.mongodb.net/';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});