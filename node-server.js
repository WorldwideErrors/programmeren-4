const http = require('http')

const port = process.env.PORT || 3000;

const result = {
  code: 200,
  message: 'OK!',
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(result));
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
})