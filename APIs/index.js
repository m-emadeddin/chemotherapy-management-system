// const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const { insertData , insertDataCyclesPremedicationChemo} = require("./src/models/index.models");
const PatientMedicationInfoRoutes = require("./src/routes/PatientMedicationinfo.routes");
// import the DB
const db = require("./src/configs/db.config");
const Dbc = require("./src/models/index.models");

const app = express();


app.use(bodyParser.urlencoded({ extended: false })); //  do all the parsing of the body for us
app.use(express.json()); // as we get all the api information on json format
// set relation associations

app.use('/patient-medication-info',PatientMedicationInfoRoutes);


//conection to Db
db.authenticate()
  .then(() => {
    console.log("connected..");
    // Start the Express.js server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error" + err);
  });

db.sync({ force:true })
.then(() => {
  insertDataCyclesPremedicationChemo()
  console.log("Tables Created!")
})
.catch((err)=>{
  console.log(err)
})
