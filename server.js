// Dependencies
var express = require("express");
var path = require("path");

// Set up Express App
var app = express();
var PORT = 3000;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DATA
// =============================================================

var reservations = [
  {
    name: "Harry James Potter",
    phoneNumber: "8180987079",
    email: "harrypotter@hogwarts.com",
    uniqueid: "1",
  },
];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page - home
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Send to tables.html
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Send to reserve.html
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Return data from the reservations
app.get("/api/tables", function (req, res) {
  return res.json(reservations);
});

// Create New Reservations - takes in JSON input
app.post("/api/tables", function (req, res) {
  var newreservation = req.body;
  console.log(newreservation);
  if (reservations.length === 5) {
    waitlist.push(newreservation);
    res.json(false);
  } else {
    reservations.push(newreservation);
    res.json(newreservation);
  }
});

// Return data from the waitlist
app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

// Clear both reservations and waitlist JSON data
app.post("/api/clear", function (req, res) {
  waitlist = [];
  reservations = [];
});

// LISTEN AT PORT
// =============================================================

app.listen(PORT, function () {
  console.log("App succesfully running on PORT " + PORT);
});
