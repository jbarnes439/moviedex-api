const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const validMovies = ['Rambo', 'Die Hard', 'Die Hard 2', 'Puss-n-Boots'];

function handleGetMovies(req, res) {
  res.json(validMovies);
}

app.get('/movies', handleGetMovies);

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
