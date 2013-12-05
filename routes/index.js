
/*
 * GET home page.
 */




module.exports = function(app, mongoose) {




  // HOME SCREEN --- Show list of characters
  
  app.get('/', function(req, res) {
    res.render('index', { name: "Corey" });
  });


  // APPLICATION PAGE
  app.get('/apply', function(req, res) {
    res.render('apply', { name: "Corey" });
  });




}

