// const path = require('path');
const PORT = 3000
const express = require('express');
const bodyParser = require('body-parser');

// import the DB
const sequelize =require ('./src/configs/db.config');
const app = express();


// api routing 
const userRoute = require('./src/routes/users.routes')
app.use('/api/products', userRoute)

//model imports
const User = require('./src/models/users.model');




app.use(bodyParser.urlencoded({ extended: false })); //  do all the parsing of the body for us  
app.use(express.json()) // as we get all the api information on json format 




// set relation associations  



// this part should be moved to src/models/index.models.js 
//conection to Db
sequelize.authenticate()
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

// create tables for the defined models  //and define the relations defined above 
// sequelize
// .sync()//.sync({force :true})// this ensures that updating the table we created before with the new relations 
// .then(result=>{
//      console.log(result)
// })
// .catch((err)=>{
//   console.log(err)
// })