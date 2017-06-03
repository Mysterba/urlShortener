var mongoUtil = require('../mongoUtil');
var url = require('url');

var redirectUrl;

function search(shortUrlNumber, callback) {
    var db = mongoUtil.getDb();
    
    db.collection('shorturl').find({
		short_url: { $eq: shortUrlNumber }
	}).toArray(function (err, documents) {
		if (err) return;
		redirectUrl = documents;
		callback();
	});
}

exports.Redirect = function(request, response) {
    
    var shortUrlNumber = "https://boiling-brook-67511.herokuapp.com/"+request.url.substr(1);
    
    search(shortUrlNumber, function () {
        response.redirect(redirectUrl[0].original_url);
        response.end();
    });
    

};