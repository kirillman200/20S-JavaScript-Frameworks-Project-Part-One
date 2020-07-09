// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const viewPath = 'memes';
const Meme = require('../models/meme');
const User = require('../models/user');

exports.index = async (req, res) => {
  try {
    const memes = await Meme
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Memes',
      memes: memes
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the memes: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id)
    .populate('user');
      console.log(meme);
    res.render(`${viewPath}/show`, {
      pageTitle: meme.title,
      meme: meme
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this meme: ${error}`);
    res.redirect('/');
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Meme'
  });
};

exports.create = async (req, res) => {
  try {
    console.log(req.session.passport);
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    console.log('User', user);
    const meme = await Meme.create({user: user._id, ...req.body});

    req.flash('success', 'Meme created successfully');
    res.redirect(`/memes/${meme.id}`);
  } catch (error) {
    req.flash('danger', `There was an error creating this meme: ${error}`);
    req.session.formData = req.body;
    res.redirect('/memes/new');
  }
};

exports.edit = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: meme.title,
      formData: meme
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this meme: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let meme = await Meme.findById(req.body.id);
    if (!meme) throw new Error('Meme could not be found');

    const attributes = {user: user._id, ...req.body};
    await Meme.validate(attributes);
    await Meme.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The meme was updated successfully');
    res.redirect(`/memes/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this meme: ${error}`);
    res.redirect(`/memes/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Meme.deleteOne({_id: req.body.id});
    req.flash('success', 'The meme was deleted successfully');
    res.redirect(`/memes`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this meme: ${error}`);
    res.redirect(`/memes`);
  }
};