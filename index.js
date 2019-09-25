const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect DB
connectDB();

app.use(express.json({extented:false}));

//Route
app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'));


const PORT = 5000;

app.listen(PORT, () => { 
    console.log(`SERVER RUNNING AT PORT ${PORT}`)
});