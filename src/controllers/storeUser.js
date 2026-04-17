const User = require('../models/User')

module.exports = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.redirect('/')
  } catch (error) {
    if (error && error.errors) {
      const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
      req.flash('validationErrors', validationErrors)
      req.flash('data', req.body)
      return res.redirect('/auth/register')
    }
    req.flash('validationErrors', ["Une erreur inattendue s'est produite."])
    req.flash('data', req.body)
    return res.redirect('/auth/register')
  }
}
