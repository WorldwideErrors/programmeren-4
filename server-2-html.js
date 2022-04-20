var http = require('http');

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h1>Hello</h1><h2> World!</h2>');
    response.end();
}).listen(3000);

console.log('Server is listening on port 3000');