const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");


const app = express();

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