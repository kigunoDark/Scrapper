const Client = require("./models/client");
const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Db is connected!"))
  .catch((err) => console.log(err));
  Client.remove(() => {
  console.log('Db removed')
})
