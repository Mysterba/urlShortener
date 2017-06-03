var mongoUtil = require('../mongoUtil');
var url = require('url');

var redirectUrl;

function search(shortUrlNumber, callback) {
    var db = mongoUtil.getDb();
    
    db.collection('shorturl').find({
		short_url: { $eq: shortUrlNumber }
	}).toArray(function (err, documents) {
		if (err) throw err
		redirectUrl = documents;
		callback();
	})
}

exports.Redirect = function(request, response) {
    
    var shortUrlNumber = "https://boiling-brook-67511.herokuapp.com/"+request.url.substr(1);
    console.log(shortUrlNumber);

    search(shortUrlNumber, function () {
        
        if (typeof redirectUrl[0] !== 'undefined') {
            
            response.redirect(redirectUrl[0].original_url);
        } else {
            var json = JSON.stringify({"error":"This url is not on the database."});
            response.send(json);
            response.end();
        }
        
    });
    
};  