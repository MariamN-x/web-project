const passport = require('passport');

// exports.signup = (req, res) => {
//     // Implementation for user signup logic
//     res.send('Signup controller function');
// };

// Controller function for user login
exports.login = passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
});

// Controller function for user logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
