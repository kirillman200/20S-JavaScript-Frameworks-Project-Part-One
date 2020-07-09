const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/MemeController');

// Step 1: Write an authentication function to identify if a request is authenticated
function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

// Step 2: Add the authentication function to all the routes below

module.exports = router => {
  router.get('/memes', auth, index);
  router.get('/memes/new', auth, _new);
  router.post('/memes', auth, create); 
  router.post('/memes/update', auth, update); 
  router.post('/memes/delete', auth, _delete); 
  router.get('/memes/:id/edit', auth, edit); 
  router.get('/memes/:id', show);
};