module.exports = (req, res, next) => {
  if (!req.files || req.body.title == null || req.body.body == null) {
    req.flash('validationErrors', ['Le titre, le contenu et une image sont requis.'])
    req.flash('title', req.body.title || '')
    req.flash('body', req.body.body || '')
    return res.redirect('/post/new')
  }
  next()
}
