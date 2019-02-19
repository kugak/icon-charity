const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


const app = express();

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
    new Guest(newGuest).save().then(idea => {
      // req.flash("success_msg", "Thank you for registering! Enjoy the Dinner!");
      res.redirect("/");
    });
  }
});


// Static folder
app.use(express.static(path.join(__dirname, "public")));

const port = 5050;

//Use routes
app.use("/guests", guests);

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});