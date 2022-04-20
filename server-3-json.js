var http = require('http');

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/json'});
    
    var exampleArray = ["cow", "pig"];

    var exampleObject = {
      name: "Jeroen",
      job: "Farmer"  
    };

    var json = JSON.stringify({
        Farmer: exampleObject,
        Animals: exampleArray,
        Greenhouses: 6
    });

    response.end(json);
}).listen(3000);

console.log('Server is listening on port 3000');