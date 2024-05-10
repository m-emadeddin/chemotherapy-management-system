// const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const dummyData = require('./src/utils/data');


const PatientMedicationInfoRoutes = require("./src/routes/DocumentChemotherapy.routes");
const UserRoute = require('./src/routes/SignPage.routes');
const SelectPatientRoute = require('./src/routes/SelectPatient.routes');



// import the DB
const db = require("./src/configs/db.config");
const Dbc = require("./src/models/index.models");

const app = express();


app.use(bodyParser.urlencoded({ extended: false })); //  do all the parsing of the body for us
app.use(express.json()); // as we get all the api information on json format
// set relation associations

app.use('/document-chemotherapy',PatientMedicationInfoRoutes);
app.use('/users', UserRoute);
app.use('/patients',SelectPatientRoute);



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
  // Insert Dummy data
dummyData.insertDummyData();
dummyData.insertRegimens();
  console.log("Tables Created!")
})
.catch((err)=>{
  console.log(err)
})
