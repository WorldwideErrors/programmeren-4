const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

let database = [];
let id = 0;

app.use(bodyParser.json());

app.get('*', (req, res, next) => {
  const method = req.method
  console.log(`Method ${method} called`);
  next();
});

app.get('api/movie', (req, res) => {
  res.status(200).json({
    status: 200,
    result: database,
  });
});

app.post('/api/movie', (req, res) => {
  let movie = req.body;
  console.log(movie);
  id++;

  movie = {
    id,
    ...movie,
  };
  database.push(movie);
  console.log(database);
  res.status(201).json({
    status: 201,
    result: movie,
  })
});

app.get('/api/movie/:movieId', (req, res) => {
  const movieId = req.params.movieId
  let movie = database.filter((item) => item.id == movieId);
  if(movie.length > 0){
    res.status(200).json({
      status: 200,
      result: movie,
    });
    console.log(movie);
  }else{
    res.status(404).json({
      status: 404,
      result: `Movie with ID ${movieId} was not found.`,
    });
  }
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'End-point not found!',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
})