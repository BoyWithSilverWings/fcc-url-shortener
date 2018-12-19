/*
 * Copyright (c) 2016 ObjectLabs Corporation
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Written with: mongodb@2.1.3
 * Documentation: http://mongodb.github.io/node-mongodb-native/
 * A Node script connecting to a MongoDB database given a MongoDB Connection URI.
*/

var express = require('express');
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

var shortUrl = require("./routes/shorturl.js");

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());



// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
mongoose.connect(uri);

app.use("/api", shortUrl);

// listen for requests :)
var listener = app.listen("3000", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});