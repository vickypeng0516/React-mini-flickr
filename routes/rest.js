var express = require('express');
var router = express.Router();

var flickrService = require('../services/flickrService');

// 如果user hit photos url， 用以下function回应
router.get('photos', function (req , res) {
    // 调用flickrservice下的recentphotos
    var photos = flickrService.recentPhotos;
    // 以json的形式回应
    res.json(photos);
});

module.exports = router;