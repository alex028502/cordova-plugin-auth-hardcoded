var auth = require('http-auth');
var http = require('http');
var util = require('util');

var port = (process.argv.length > 2)?process.argv[2]:1337; //kept the same port as in the example in https://www.npmjs.com/package/http-auth

var sampleCredentials = {
  username: "sample",
  password: "sample"
}

var basic = auth.basic({
    realm: util.format("test login: username %s password %s", sampleCredentials.username, sampleCredentials.password),
  }, function (username, password, callback) { // Custom authentication method.
    callback(username === sampleCredentials.username && password === sampleCredentials.password);
  }
);

console.log(util.format("starting test server on port %s", port));
console.log("go to http://localhost:%s and log in as %s pwd %s", port, sampleCredentials.username, sampleCredentials.password);
console.log("then try it with the sample cordova app");
console.log("to try with an android device, either put in your lan address");
console.log("or set up localhost forwarding with chrome://inspect");
console.log("on mac, either put in your ip address");
console.log("or test on the simulator with localhost");

http.createServer(basic, function(req, res) {
  res.end("Welcome to private area - " + req.user + "!");
}).listen(port);
