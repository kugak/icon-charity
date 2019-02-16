const express = require('express');


const app = express();

// Index Route
app.get('/', (req, res) => {
  res.send('INDEX');
});

const port = 5050;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});