
// const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const dummyData = require('./src/utils/data');


//=============================== Routes ===============================================
const PatientMedicationInfoRoutes = require("./src/routes/DocumentChemotherapy.routes");
const UserRoute = require('./src/routes/SignPage.routes');
const OrderChemoRoute = require('./src/routes/OrderChemotherapy.routes');
const reviewChemotherabyRouter = require("./src/routes/ReviewChemotherapy.routes");
const PatientPageRoute = require("./src/routes/patientPage.routes");

//=============================== Database ===============================================

// import the DB
const db = require("./src/configs/db.config");
const Dbc = require("./src/models/index.models");

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //  do all the parsing of the body for us
app.use(express.json()); // as we get all the api information on json format

//=============================== Middleware ===============================================

app.use('/document-chemotherapy', PatientMedicationInfoRoutes);
app.use('/users', UserRoute);
app.use('/patient',PatientPageRoute);
app.use('/order',OrderChemoRoute);
app.use("/review-chemotherapy", reviewChemotherabyRouter);


//conection to Db
db.authenticate()
  .then(() => {
    console.log('connected..');
    // Start the Express.js server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error' + err);
  });


db.sync({ force: true })
  .then(() => {
    // Insert Dummy data
    dummyData.insertDummyData();
    dummyData.insertRegimens();
  })
  .catch((err) => {
    console.log(err);
  });
