const express = require('express');
const exphbs = require('express-handlebars');
const moment = require('moment');
const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


const app = express();

// Favicon
app.use('/favicon.ico', express.static('public/img/favicon.ico'));


// Load routes
const guests = require("./routes/guests");

//DB Config
const db = require('./config/database')

// Map global promise
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Load Guest Model
require('./models/Guest');
const Guest = mongoose.model('guests');

// Handle bar middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title: title
  });
});

// Moment format
MomentHandler.registerHelpers(Handlebars);


// Process Form
app.post("/",  (req, res) => {
  let errors = [];
  
  if (errors.length > 0) {
    res.render("/", {
      errors: errors,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      company_name: req.body.company_name,
      receive_email: req.body.receive_email
    });
  } else {
    const newGuest = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      company_name: req.body.company_name,
      receive_email: req.body.receive_email,
    };
    new Guest(newGuest).save().then(guest => {
      // req.flash("success_msg", "Thank you for registering! Enjoy the Dinner!");
      res.redirect("/");
    });
  }
});

// Guests Index Page
app.get('/guests', (req, res) => {
  Guest.find({})
  .sort({date: 'desc'})
  .then(guests => {
    res.render('guests/index', {
      guests:guests
    });

  });
});


// Static folder
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 5000;

//Use routes
app.use("/guests", guests);

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});