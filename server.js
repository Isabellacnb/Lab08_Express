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
    name: "Isabella",
    phoneNumber: "8180987079",
    email: "canalesisabella4@gmail.com",
    uniqueid: "1",
  },
  {
    name: "Isabella",
    phoneNumber: "8180987079",
    email: "canalesisabella4@gmail.com",
    uniqueid: "2",
  },
  {
    name: "Isabella",
    phoneNumber: "8180987079",
    email: "canalesisabella4@gmail.com",
    uniqueid: "3",
  },
  {
    name: "Isabella",
    phoneNumber: "8180987079",
    email: "canalesisabella4@gmail.com",
    uniqueid: "4",
  },
  {
    name: "Isabella",
    phoneNumber: "8180987079",
    email: "canalesisabella4@gmail.com",
    uniqueid: "5",
  },
];

var waitlist = [
  {
    name: "Emma",
    phoneNumber: "8110133832",
    email: "emma@gmail.com",
    uniqueid: "6",
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

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

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

app.post("/api/clear", function (req, res) {
  waitlist = [];
  reservations = [];
});

app.listen(PORT, function () {
  console.log("App succesfully running on PORT " + PORT);
});
