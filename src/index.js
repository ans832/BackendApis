const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const connectDB = require('./db/connection');

app.use(express.json());


const PORT = process.env.PORT;

app.use("/api", router);

 
connectDB().then(() => {
    app.listen(PORT || 5000);
    console.log('Connected to database and listening on port 5000');
})
.catch((err) => console.log(err));
