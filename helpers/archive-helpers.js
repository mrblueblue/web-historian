var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require("http-request");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('sites-archive-test.db');
  db.open = true;

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

exports.createTable = function(){
  db.serialize( function() {
    db.run("CREATE TABLE archive (url VARCHAR(1000), html LONGTEXT, timestamp datetime default current_timestamp)");
  });
db.close();
};

exports.insert = function(url, html){
  db.serialize(function() {
    db.run("INSERT INTO archive (url, html) VALUES (" +"'" + url + "'" + ", " + "'" + html +"'"+ ")");
  });
};

exports.retrieve = function(url){
  db.all("SELECT html, MIN(timestamp) FROM archive GROUP BY timestamp HAVING url = " + "'" + url +"' ", function(err, rows){
    return rows[0].html;
  });
};

exports.downloadUrl = function(){
  db.serialize( function(){
    var url;

    db.all("SELECT url, min(timestamp), rowid FROM archive GROUP BY timestamp HAVING html = '' ", function(err, rows) {
      url = rows[0].url.toString()
      exports.id = rows[0].rowid;
      console.log(exports.id)
      // console.log(url)
      httpRequest.get(url, function(err, data) {
        // console.log(data)
        exports.data = data.buffer.toString().length
        // console.log(exports.data)
      });
    });

    setTimeout(bbq, 10000);
  function bbq() {
  db.all("UPDATE archive SET html = '"+ exports.data + "', timestamp = current_timestamp WHERE rowid = " + exports.id + "", function(){
    console.log(exports.data);
  });
}
  });

};

// exports.createTable();

// db.run("INSERT INTO archive (url, html) VALUES ('www.hackreactor.com','')")
    // setTimeout(scrape, 1000);


//   })
// };

 exports.downloadUrl();

  // function scrape() {

// exports.test = function(){
//   db.all("SELECT * FROM archive", function(err, table){
//     console.log(table)
//   })
// }();
