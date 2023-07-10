const mongoose = require('mongoose');

async function connectdb() {
    try {
        await mongoose.connect('mongodb+srv://minhnb04:byUia9oS3jND8tvX@cluster0.ltuhtop.mongodb.net/minstore',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('Connected to MongoDB successfully');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });
    } catch (error) {
        console.log('Connected to MongoDB failed');
    }

}

module.exports = { connectdb }

