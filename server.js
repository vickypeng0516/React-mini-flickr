// require 导入代码
var express = require('express');
var app = express();

var flickrService = require('./services/flickrService');
// 调用getRecentFlickrPhotos from flickrService.js 
flickrService.getRecentFlickrPhotos(function(){
    var restRouter = require('./routes/rest');

    app.use('/', express.static(_dirname + '/build'));
    app.use('/api/v1', restRouter);

    app.listen(3000);
    console.log('Service initialized');
});