exports.Index = function(request, response){
    response.title = 'URL Shortener Microservice - By Dennis van Wattingen';
    response.render('home/Index', response);
};
