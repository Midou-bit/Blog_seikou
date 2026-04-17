module.exports = (req, res) => {
  res.render('login', {
    errors: req.flash('loginErrors'),
    username: req.flash('loginUsername')[0] || ''
  })
}
