var WebSocketServer = require("websocket").server;
var http = require("http");

var server = http.createServer(function(request, response) {
});
server.listen(1234, function() { });
console.log("Listening on port 1234 ...");

wsServer = new WebSocketServer({ httpServer: server });

wsServer.on("request", function(request) {
  var connection = request.accept(null, request.origin);

  console.log("Hello");
  
  let nbImpacts = 0;

  let repeater = setInterval(function(){
    let x = Math.random()*20-10;
    x = x.toFixed(1);
    let y = Math.random()*20-10;
    y = y.toFixed(1);

    connection.sendUTF(x + ";" + y);
    console.log(x + ";" + y);

    nbImpacts++;

    // on limite à 10 impacts sinon on ne visualise plus rien en cible
    if (nbImpacts >= 10){
      clearTimeout(repeater);
    }

  }, 1000);

  connection.on("close", function(connection) {
    clearTimeout(repeater);
    console.log("Bye\n\n");
  });
});