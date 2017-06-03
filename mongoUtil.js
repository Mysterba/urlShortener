var MongoClient = require( 'mongodb' ).MongoClient;
var connString = process.env.MONGOLAB_URI;
var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( connString, function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};