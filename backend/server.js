require('dotenv').config();
const connectDB = require('./src/db/db');

const app = require('./src/app');
const dns = require('dns');
dns.setServers(["1.1.1.1","8.8.8.8"])

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`);
});



