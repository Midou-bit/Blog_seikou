module.exports = (req, res) => {
  res.render('create', {
    errors: req.flash('validationErrors'),
    title: req.flash('title')[0] || '',
    body: req.flash('body')[0] || ''
  })
}
