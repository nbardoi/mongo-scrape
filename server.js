var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = 8001;

// Initialize Express
var app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Body parser to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
// require("./routes/Routes.js")(app);
const index = require('./routes/index'),
      articles = require('./routes/articles'),
      notes = require('./routes/notes'),
      scrape = require('./routes/scrape');

app.use('/', index);
app.use('/articles', articles);
app.use('/notes', notes);
app.use('/scrape', scrape);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;

