var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require("http-request");

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.queueContents = function(){
  return fs.readFileSync(exports.paths.list).toString().split('\n');
};

exports.popQueueContent = function(){

  var data = exports.queueContents();
  var url = data[0];
  var newFile = data.slice(1);

  fs.writeFile(exports.paths.list, newFile.join('\n'));
  return url;
};

exports.downloadUrls = function(){
  var url = exports.popQueueContent();
  httpRequest.get(url, function(err, data) {
    var data = data.buffer.toString();
    var uri = createURI(url);
    fs.writeFile(uri, data);
  });
}

exports.createURI = function(url) {
  return exports.paths.archivedSites + '/' + url + '.html';
};
