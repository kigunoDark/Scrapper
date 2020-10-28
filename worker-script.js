const { parentPort } = require("worker_threads");
const $ = require("cheerio");
const rp = require("request-promise");
const Clients = require("./models/client");
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

parentPort.on("message", (nextId) => {
  console.log("started on ", nextId);
  dbWrite(nextId)
    .then((owner) => {
      parentPort.postMessage({ status: "OK", payload: owner });
    })
    .catch((err) => {
      console.error(err);
    });
});

function dbWrite(url) {
  return rp(`Your link + {{url}}`)
    .then(async function (html) {
      try {
        // console.log('This is length')
        // let len = await Owner.find();
        // console.log(len.length)
        let clientUrl = `Your link + {{url}}`;
        let client = scrappingData(html, clientUrl);
        console.log(client);
        let { name, companyName } = client;
        if (companyName !== "") {
          let ownerIsExist = await Clients.findOne({ name });
          if (ownerIsExist) {
            console.log("This owner is already exist");
          } else {
            let newOwner = new Clients(client);
            newOwner.save();
            return client;
          }
        } else {
          console.log("Page is empty");
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch(function (err) {
      console.log(err.message);
      throw err;
    });
}

function scrappingData(html, clientUrl) {
  let client = {
    name: $(".property-name ", html).text(),
    email: $($(".margin-top5", html)[2], html).text(),
    phone: $($(".margin-top5", html)[1], html).text(),
    website: $(".company-website-url", html).children("a").attr("href"),
    location: $(".button", html).attr("id", "address-btn").html(),
    companyName: $($(".margin-top10", html)[2])
      .text()
      .replace(/(\n|\t|\s)+/g, " ")
      .trim(),
    pageUrl: clientUrl,
  };

  return client;
}
