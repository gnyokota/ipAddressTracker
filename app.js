const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.set("view engine", "ejs");

var ipData = "---";
var countryData = "---";
var cityData = "---";
var timeData = "---";
var ispData = "---";
var longitudeData = "90";
var latitudeData = "135";
var { apiKeyMaps } = require("./password.js");
var srcData =
  "https://www.google.com/maps/embed/v1/place?key=" +
  apiKeyMaps +
  "&q=" +
  latitudeData +
  "," +
  longitudeData;

app.get("/", function (req, res) {
  res.render("index", {
    ipNumber: ipData,
    country: countryData,
    city: cityData,
    time: timeData,
    isp: ispData,
    logitude: longitudeData,
    latitude: latitudeData,
    srcMaps: srcData,
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/", function (req, res) {
  var ip = req.body.inputIP;
  var { apiKeyIP } = require("./password.js");
  var api_url = "https://geo.ipify.org/api/v1?";
  var url = api_url + "apiKey=" + apiKeyIP + "&ipAddress=" + ip;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const myData = JSON.parse(data);
      ipData = myData.ip;
      countryData = myData.location.country;
      cityData = myData.location.region;
      timeData = myData.location.timezone;
      ispData = myData.isp;
      latitudeData = myData.location.lat.toString();
      longitudeData = myData.location.lng.toString();
      srcData =
        "https://www.google.com/maps/embed/v1/place?key=" +
        apiKeyMaps +
        "&q=" +
        latitudeData +
        "," +
        longitudeData;

      res.render("index", {
        ipNumber: ipData,
        country: countryData,
        city: cityData,
        time: timeData,
        isp: ispData,
        logitude: longitudeData,
        latitude: latitudeData,
        srcMaps: srcData,
      });
    });
  });
});

//port for heroku
app.listen(process.env.PORT || 3000);
