const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const mongoose = require('mongoose');


const app = express();

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

app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title: title
  });
});

// Static folder
app.use(express.static(path.join(__dirname, "public")));

const port = 5050;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});