// 访问flickr包
var flickrApi = require('flickrapi');
var flickrOptions = {
    api_key : "43d138480274317b3f268b9ebde6d156"
    // secret : "8e231daa411b895a"
};

var recentPhotos = [];
var photoCount = 50;
var searchTag = 'mountain';

// callback is below code in server.js, to init express service
// var restRouter = require('./routes/rest');

// app.use('/', express.static(_dirname + '/build'));
// app.use('/api/v1', restRouter);

// app.listen(3000);
// console.log('Service initialized');
function getRecentFlickrPhotos(callback){
    // 回调函数， 如果拿到flickr token，执行下一步
    flickrApi.tokenOnly(flickrOptions, function (err, flickr) {
        // flickr.photos.search from flickr API
        // return a list of photos matching some criteria
        // required para : api_key, option param : tags                                                                        //回调，如果拿到search结果，执行下一步
        flickr.photos.search(
            {tags: searchTag, page : 1, per_page : photoCount}, 
            function(err, result){
            if(err){
                console.log(err);
                return;
            }
            // 拿到数据
            var photos = result.photos.photo;
            var i = 0;
            // 对拿到的photos用foreach做处理
            photos.forEach(function(photo){
                var title = photo.title;
                var link = 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id;
                var src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + 
                '/' + photo.id + '_' + photo.secret + '.jsp';
                // 对每一个photos 执行以下回调函数
                populateTags(flickr, photo.id, function(tags){
                    recentPhotos.push({
                        title : title,
                        link : link,
                        src : src,
                        tags : tags,
                        originalIndex : i++
                    });
                    
                    if(recentPhotos.length == 50){
                        callback();
                    }
                });
            });
        });
    });
}

function populateTags(flickr, photoId, callback){
    // flickr.photos.getInfo() from flickr api
    // param, api_key (required)
    // param, photo_id(required)
    flickr.photos.getInfo({photo_id : photoId}, function(err,result){
        var rawTags = [];
        result.photo.tags.tag.forEach(function(tag){
            rawTags.push(tag.raw);
        });

        tags = rawTags.join();
        callback(tags);
        //以下callback调用的函数populateTags里 function(tags){}
        // recentPhotos.push({
        //     title : title,
        //     link : link,
        //     src : src,
        //     tags : tags,
        //     originalIndex : i++
        // });
    });
}
// export导出代码
module.exports = {
    getRecentFlickrPhotos : getRecentFlickrPhotos,
    recentPhotos : recentPhotos
};