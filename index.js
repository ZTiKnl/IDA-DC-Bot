const name = 'IDA-DC-Bot';

const DCkeys = require('../private/DCkeys.inc.js');

let disctoken = DCkeys.token();
let discchannelid = DCkeys.channelid();
let apikeys = DCkeys.apikeys();

var http = require('http');

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log(name + ' connected!');
});
client.login(disctoken);

http.createServer(function (request, res) {
  if (request.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }

  if (request.url === '/api') {

    if(request.method === 'POST') {
      var body = '';
//      var post = '';
      request.on('data', function (data) {
        body += data;
        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });
      request.on('end', function () {
//        post = qs.parse(body);
        var obj = JSON.parse(body);

        var event = obj['Event'];
        var cmdr = obj['CMDR'];
        var combatrank = obj['CombatRank'];
        var isplayer = obj['IsPlayer'];
        var timestamp = obj['timestamp'];
        var interdictor = obj['Interdictor'];
        var submitted = obj['Submitted'];
        var submittedtext = '';
        if (submitted == true) {
          var submittedtext = 'true';
        } else {
          var submittedtext = 'false';
        }

        console.log('-----------');
        console.log(obj['key']);
        console.log('-----------');

        if (apikeys.includes(obj['key'])) {
          console.log('sending discord message');
          var generalChannel = client.channels.get(discchannelid);

          generalChannel.send("Distress Call: " + cmdr + " has been interdicted by " + interdictor + " (rank: " + combatrank + ", submitted: " + submittedtext + ")");

          res.writeHead(200, 'success' );
          res.write('200: Distress Call received and sent on discord channel'); //write a response to the client
          res.end(); //end the response
        } else {
          res.writeHead(402, 'Incorrect API key' );
          res.write('402: Incorrect API key');
          res.end();
        }
      });
    } else {
      res.writeHead(401, 'No POST data received' );
      res.write('401: No POST data received');
      res.end();
    }
  } else {
    res.writeHead(404, 'Page not found' );
    res.write('Nothing to see here, move along...'); //write a response to the client
    res.end(); //end the response
  }
}).listen(3001);
