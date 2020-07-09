const User = require('../models/user');
const viewPath = 'users';

exports.new = async (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New User'
  });
};

exports.create = async (req, res) => {
  const userDetails = req.body;
  
  try {
    // Step 1: Create the new user and register them with Passport
    const user = new User(userDetails);
    await User.register(user, userDetails.password);
    req.flash('success', `Welcome, ${user.fullname}. Thank you for registering.`);
    res.redirect(`/`);
  } catch (error) {
    console.log('Errors');
    req.flash('danger', error.message);
    req.session.formData = req.body;
    res.redirect(`/register`);
  }
};