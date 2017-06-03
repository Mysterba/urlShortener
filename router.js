var HomeController = require('./controllers/HomeController');
var UrlController = require('./controllers/UrlController');
var RedirectController = require('./controllers/RedirectController');

// Routes
module.exports = function(app){
     
    // Main Routes
             
    app.get('/', HomeController.Index);
    
    app.get('/:number', RedirectController.Redirect);
    
    app.get('/shorten/:url*', UrlController.Shorten_url);

 
};
