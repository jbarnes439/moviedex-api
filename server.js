require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const MOVIEDEX = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));

function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization');
  const apiToken = process.env.API_TOKEN;

  console.log('validate bearer token middleware');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
}

function handleGetMovies(req, res) {
  let response = MOVIEDEX;

  // filter query by genre if genre query present
  if (req.query.genre) {
    response = response.filter(movie => {
      return movie.genre.toLowerCase().includes(req.query.genre.toLowerCase());
    });    
  }

  if (req.query.country) {
    response = response.filter(movie => {
      return movie.country.toLowerCase().includes(req.query.country.toLowerCase());
    });
  }

  if (req.query.avg_vote) {
    response = response.filter(movie => {
      return movie.avg_vote >= parseInt(req.query.avg_vote);
    });
  }

  res.json(response);
}

app.get('/movies', validateBearerToken, handleGetMovies);

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
