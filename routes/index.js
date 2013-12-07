
/*
 * GET home page.
 */




module.exports = function(app, mongoose, submissionmodel) {




  // HOME SCREEN --- Show list of characters
  
  app.get('/', function(req, res) {
    res.render('index', { });
  });


  // APPLICATION PAGE
  app.get('/apply', function(req, res) {
    res.render('apply', { });

    
  });
  app.post('/apply', function(req,res) {

    // GET ID
    // if no applications already, make id 1
    // otherwise highest existing id + 1
    submissionmodel.findOne().sort('id').select('submission_id').exec(function(err, results){
      console.log("QUERY RESULTS:");
      console.log(results);

      if(err){
        console.log('ERROR:')
        console.log(err);
      }else{

        if(results==null){
          id = 1;
        } else {
          id = results.submission_id+1;
        };
      };
      console.log('NEW ID:');
      console.log(id);

      // Create submissionmodel in database
      var submission = new submissionmodel({
        name: req.body.name,
        submission_id: id,
        email: req.body.email,
        title: req.body.title,
        status: req.body.status,
        video_link: req.body.video_link,
        description: req.body.description,
        finalist: 0,
        selected: 0
      });

      submission.save(function(err){
        if(err){
          console.log('Application not submitted \n');
          console.log('Applicant: ' + req.body.name);
          console.log('Video link: ' + req.body.video_link);
          res.redirect('/apply/failure');
        }else{
          console.log('Application submitted successfully \n')
          console.log('Applicant: ' + req.body.name);
          console.log('Video link: ' + req.body.video_link);
          res.redirect('apply/success');
        }
      });
    });
  });

  // APPLY SUCCESS AND FAILURE PAGES
  app.get('/apply/success', function(req, res) {
    res.render('applysuccess', { });
  });
  app.get('/apply/failure', function(req, res) {
    res.render('applyfailure', { });
  });

  // VIEW SUBMISSIONS PAGE

  app.get('/viewapps', function(req, res) {
    res.render('login', { });
  });
  app.post('/viewapps', function(req, res) {
    if(req.body.password=="1deasworthsharing"){
      // var classification = req.params.classification;
      // if(classification=="finalists"){

      // }

      var query_one = submissionmodel.find({}, "name email submission_id status title video_link finalist selected description", function(err, results_one){
        var all_submissions = results_one;
        var query_two = submissionmodel.find({finalist: 1}, "name email submission_id status title video_link finalist selected description", function(err, results_two){
          var submission_finalists = results_two;
          var query_three = submissionmodel.find({selected: 1}, "name email submission_id title status video_link finalist selected description", function(err, results_three){
            var selected_submissions = results_three;
            
            res.render('viewapps', { submissions : all_submissions, finalists : submission_finalists, selected : selected_submissions});
          });
        });
      });
    } else {
      res.redirect('/loginfailure');
    }
  });

  // LOGIN FAILURE
  app.get('/loginfailure', function(req, res){
    res.render('loginfailure', { });
  });




}

