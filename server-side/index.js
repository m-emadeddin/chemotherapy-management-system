// const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const dummyData = require('./src/utils/data');


const PatientMedicationInfoRoutes = require("./src/routes/DocumentChemotherapy.routes");
const UserRoute = require('./src/routes/SignPage.routes');
const reviewChemotherabyRouter = require("./src/routes/ReviewChemotherapy.routes");

// import the DB
const db = require("./src/configs/db.config");
const Dbc = require("./src/models/index.models");

const app = express();


app.use(bodyParser.urlencoded({ extended: false })); //  do all the parsing of the body for us
app.use(express.json()); // as we get all the api information on json format
// set relation associations

app.use('/document-chemotherapy',PatientMedicationInfoRoutes);
app.use('/users', UserRoute)
app.use("/review-chemotherapy", reviewChemotherabyRouter);



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
//http://localhost:3000/review-chemotherapy/1
/*{
    "Plan_Name": "Lymphoma",
    "number_of_Weeks": 3,
    "number_of_Cycles": 5,
    "PreMedications": [
        {
            "Medication_Name": "Predn",
            "Dose": 100,
            "Route": "Oral",
            "Instructions": "Daily x 5 days. 1st dose 60 minutes prior to chemotherapy"
        },
        {
            "Medication_Name": "Dox",
            "Dose": 50,
            "Route": "IV Push",
            "Instructions": "IV Push over 15 minutes"
        }
    ],
    "ChemotherapyMedications": [
        {
            "Medication_Name": "Pr",
            "Dose": 100,
            "Route": "Oral",
            "Instructions": "Daily x 5 days. 1st dose 60 minutes prior to chemotherapy",
            "Dosage_Reduction": null
        },
        {
            "Medication_Name": "Dox",
            "Dose": 50,
            "Route": "Oral",
            "Instructions": "IV Push over 15 minutes",
            "Dosage_Reduction": "-10"
        }
    ],
    "cycle_note": "Patient is allergic to penicillin."
} */