var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
// 'GET': function(req,res){
//   var url = archive.paths.archivedSites+req.url;
//   if(req.url === '/'){
//     url = __dirname + '/public/index.html';
//     console.log(archive.paths.archivedSites);
//   }
//   fs.readFile(url,'utf-8', function(err, data){
//     if(err){
//       sendResponse(res,'404',404);
//     } else {
//       sendResponse(res, data ,200);
//     }
//   });
// },
