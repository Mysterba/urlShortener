var url = require('url');
var mongoUtil = require( '../mongoUtil' );
var validUrl = require('valid-url');
var hostURL = process.env.HOST_URL; //Config VAR in Heroku
var number;

function getNextSequenceValue(sequenceName, callback){
    var db = mongoUtil.getDb();    
    
    
    db.collection('counters').findAndModify(
        {_id: sequenceName }, 
        [],
        {$inc:{sequence_value:1} },
        {upsert:true, new: true }, function (err, doc) { 
           if(err) throw err;
           number = doc.value.sequence_value;
           callback();
       }
    );
    
}

function insert(json, callback) {
    var db = mongoUtil.getDb();
    
    db.collection('shorturl').insert(json, function (err, data) { 
		if (err) throw err;
		callback()
})
}

exports.Shorten_url = function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    var json;
    
    getNextSequenceValue('urlid', function () {
        
        //Request the url and do a validity check on it. Return url if it is valid and false if it isn't.
        var url = request.url.substr(9);
        
        if (!validUrl.isWebUri(url)) {
            json = JSON.stringify({"error":"Wrong url format, make sure you have a valid protocol and real site."});
            response.send(json);
        }
        else {
            //Generate the short url
            //Insert into DB
            json = { original_url:url,short_url:hostURL+number };
            
            insert(json, function () {
                response.send(json);
            })
            
        }
    })
  
    

    
    //Insert into db
        //*find a way to create autoincrementing unique value
    
};
