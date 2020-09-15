const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use((req, res) => {
  res.send('Hello, movie-used-to-be-goer world!');
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
