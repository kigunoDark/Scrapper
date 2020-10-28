const Clients = require("./models/client");
const mongoose = require("mongoose");
const ObjectsToCsv = require('objects-to-csv')

require("dotenv").config();
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Db is connected!"))
  .catch((err) => console.log(err));


let agrigateClients = () => {
   Clients.aggregate([ 
    { 
       $group: {
           _id:  "$companyName",
           name: {"$first": "$name"},
            pageUrl: {"$first": "$pageUrl"},
           email: {"$first": "$email"},
           phone: {"$first": "$phone"},
           website: {"$first": "$website"},
           location: {
               "$addToSet": "$location",
           }
       }
   }])
   .then((data) => {
       const csv = new ObjectsToCsv(data);
      csv.toDisk('../excelExport/clientsList.csv').then(() => console.log("Success!"))
      .catch(err => console.log("This is an error message: " + err))
   })
   .catch(err => {
       console.log(err);
   });
};

console.log(agrigateClients())