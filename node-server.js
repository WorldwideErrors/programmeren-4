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

app.post('/api/user/:userId', (req, res) => {
  let email = req.body.emailAdress;
    //Filter Database om te kijken of Email Address al bestaat (== ipv === om cijfer (int, string) problemen te voorkomen)
    let item = database.filter((item) => item.emailAdress == email);
    console.log(item);
    if (item.length > 0) {
      if (req.params.userId != item[0].ID) {
            res.status(400).json({
                Status: 400,
                Message: `Someone else is already using this Email adress!`
            })
        } else {
            console.log("Email is from same user, request accepted!")
          
            database.push(item);
            console.log(database);
            res.status(201).json({
              status: 201,
              result: item,
            })
        }
    }else{
    
      database.push(item);
      console.log(database);
      res.status(201).json({
        status: 201,
        result: item,
      })
    }
});

app.get('api/user', (req, res) => {
  console.log(database);
  res.status(200).json({
    status: 200,
    result: database,
  });
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