// const path = require('path');
const PORT= process.env.PORT || 3000
const express = require('express');
const bodyParser = require('body-parser');
const { insertData } = require('./src/models/index.models');

// import the DB
const db =require ('./src/configs/db.config');
const Dbc = require('./src/models/index.models')

const app = express();


// api routing 
//const userRoute = require('./src/routes/users.routes')
//app.use('/api/products', userRoute)

//model imports
//const User = require('./src/models/users.model');




app.use(bodyParser.urlencoded({ extended: false })); //  do all the parsing of the body for us  
app.use(express.json()) // as we get all the api information on json format 




// set relation associations  


// this part should be moved to src/models/index.models.js 
//conection to Db
db.authenticate()
.then(() => {
    console.log('connected..')
    // Start the Express.js server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
    console.log('Error'+ err)
})
db.sync({ alter: true })
.then(() => {
  insertData()
  console.log("Tables Created!")
})
.catch((err)=>{
  console.log(err)
})