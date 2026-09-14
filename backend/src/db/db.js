const mongoose = require('mongoose');

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connect database successfully ${conn.connection.host}`)
    } catch (err) {
         console.error(`Error connecting to MongoDB: ${err.message}`);
         process.exit(1);
    }
}

module.exports = connectDB;