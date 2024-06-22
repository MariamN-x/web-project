const Employees = require('../models/employees');
const path = require('path');

//We placed the functions related to user
const userSignup=(req, res) => {
    let imgFile;
    let uploadPath;
    console.log(req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    imgFile = req.files.img;
    uploadPath = path.join(__dirname, '../public/images/' + req.body.un + '.png');
    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
      if (err)
        return res.status(500).send(err);
  
      const emp = new Employees({
        UserName: req.body.un,
        Password: req.body.pw,
        Image: req.body.un + '.png',
        Type: req.body.type
      })
      emp.save()
        .then(result => {
          res.redirect('/');
        })
        .catch(err => {
          console.log(err);
        });
    });
}
module.exports = {userSignup};