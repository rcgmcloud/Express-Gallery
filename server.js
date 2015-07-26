var config = require('./config/config.json');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./models');
var morgan = require('morgan');

app.set ('views', './views');
app.set ('view engine', 'jade');

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

//method Override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//get list of pictures on main page
app.get('/', function (req, res) {
  models.Photo
    .findAll()
    .then(function (pictures) {
      // console.log(pictures)
      res.render('index', { "pictures": pictures });
    });
});

//get one picture
app.get('/gallery/:id', function (req, res) {
   models.Photo
    .findById(req.params.id)
    .then(function (picture) {
      // console.log(pictures)
      res.render('gallery', { "picture": picture });
    });
});

//add photo form
app.get('/new_photo', function (req, res) {
  res.render('new_photo');
});

//edit form PUT
app.put('/gallery/:id/edit', function (req, res) {
  console.log(req.body);
  models.Photo
    .findById(req.params.id)
    .then(function (picture) {
      if (req.body.author) {
        picture.author = req.body.author;
      }
      if (req.body.link) {
        picture.url = req.body.link;
      }
      if (req.body.description) {
        picture.description = req.body.description;
      }
      return picture.updateAttributes({author: picture.author, description: picture.description, url: picture.url});
      //.save();
    })
    .then(function(picture){
      res.render('gallery', { "picture": picture });
    });

});

//edit photo form
app.get('/gallery/:id/edit', function (req, res) {
  models.Photo
    .findById(req.params.id)
    .then(function (picture) {
      // console.log(pictures)
      res.render('edit', { "picture": picture });
    })
  ;
});


//form submission
app.post('/gallery', function (req, res, next) {
  models.Photo
    .create ({
      author: req.body.author,
      description: req.body.description,
      url: req.body.link
    })
  ;
  res.redirect('/');
});

//delete
app.delete('/gallery/:id', function (req, res, next) {
  models.Photo
    .findById(req.params.id)
    .then(function(photo){
      return photo.destroy();
    })
    .then(function(){
      res.redirect('/');
    })
  ;


});

//server using sequelize
models.sequelize
  .sync()
  .then(function(){
    var server = app.listen(3000, function() {
      console.log('Big Pickle!');
    });
  });

