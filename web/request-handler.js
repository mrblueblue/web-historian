var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');


var header = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-type": "text/html"
};

var sendResponse = function(res,data,statusCode){
  statusCode = statusCode;
  res.writeHead(statusCode, header);
  res.end(data);
};

var actions = {
  'GET': function(req,res){
    var url = archive.paths.archivedSites+req.url;
    if(req.url === '/'){
      url = __dirname + '/public/index.html';
      console.log(archive.paths.archivedSites);
    } else if (req.url === '/loading') {
      url = __dirname + '/public/loading.html';
    }
    fs.readFile(url,'utf-8', function(err, data){
      if(err){
        sendResponse(res,'404',404);
      } else {
        sendResponse(res, data ,200);
      }
    });
  },
  'POST': function(req, res){
    req.on('data', function(data) {
      var url = data.toString().substring(4) + "\n";
      var site = data.toString().substring(4);
      var archived = archive.createURI(site);

      fs.readFile(archived, function(err, data){
          if (!err) {

           fs.readFile(archived, 'utf-8', function(err, data){
            sendResponse(res, data, 200)
           });

          }
        else {

            fs.appendFile(archive.paths.list, url, function(err) {
              if (err) {
                return console.log(err);
              } else {
                res.writeHead(302, {
                  'Location': '/loading'
                });
                res.end();
              }
            });
          }
        });



    });
    // write request to sites.txt
    // read sites from sites.txt
  }
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  console.log(req.method)
  if(action){
    action(req,res);
  } else {
    sendResponse(res, 'not found', 404);
  }
};


