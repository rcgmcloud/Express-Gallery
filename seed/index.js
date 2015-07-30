var models = require('../models');
var faker = require('faker');

var Photo = models.Photo;

models.sequelize
  .sync({force:true})
  .then(function(){
    console.log("Database has been connected. Thank you for choosing Sequelize.");
    //seed our data babies
    var gallery = [];
    for(var i=0; i < 1; i++){
      gallery.push({
      author: faker.name.firstName() + faker.name.lastName(),
      description: faker.lorem.sentence(),
      url: faker.image.animals()
    });
    }
    return Photo.bulkCreate(gallery);
});