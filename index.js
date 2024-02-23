const express = require('express')
require('dotenv').config();
const path = require('path');
const app = express()

// MONGODB CONNECTION----------------------------------
const mongoString = process.env.DATABASE_URL

const mongoose = require('mongoose');

mongoose.connect(mongoString);
const database = mongoose.connection

//if error when connecting to db throw error
database.on('error', (error) => {
    console.log(error)
})
//connect to db only once
database.once('connected', () => {
    console.log('Database Connected');
})
// END MONGO CONNECTION ---------------------------------

// MIDDLEWARE-------------------------------------------

app.set('view engine', 'pug')
app.use(express.json());
app.set('views', path.join(__dirname, './views'));
// ROUTES-----------------------------------------------
// positioning is important - why???
app.get('/', (req, res) => {
    res.render('index')
    //res.send('Hello world')
})


const routes = require('./routes/routes');
app.use('/api', routes)

//SERVER SET UP------------------------
const PORT = 3000
app.listen(PORT,() => {
    console.log(`server running on ${PORT}`)
})
