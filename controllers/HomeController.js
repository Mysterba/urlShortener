exports.Index = function(request, response){
    response.title = 'Banana';
    response.render('home/Index', response);
};
 
exports.About = function(request, response){
    response.title = 'Apples';
    response.render('home/About', response);
};
