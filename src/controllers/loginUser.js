const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      req.flash('loginErrors', ['Utilisateur introuvable.'])
      req.flash('loginUsername', username)
      return res.redirect('/auth/login')
    }
    const same = await bcrypt.compare(password, user.password)
    if (same) {
      req.session.userId = user._id
      res.redirect('/')
    } else {
      req.flash('loginErrors', ['Mot de passe incorrect.'])
      req.flash('loginUsername', username)
      res.redirect('/auth/login')
    }
  } catch (err) {
    req.flash('loginErrors', ['Erreur lors de la connexion.'])
    res.redirect('/auth/login')
  }
}
