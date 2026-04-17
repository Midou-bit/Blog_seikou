const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = async (req, res) => {
  const { title, body } = req.body

  let image = null
  if (req.files && req.files.image) {
    const uploadPath = path.join(__dirname, '../../public/images', req.files.image.name)
    try {
      await req.files.image.mv(uploadPath)
      image = req.files.image.name
      console.log('Image uploaded successfully')
    } catch (err) {
      console.error('Error uploading image:', err)
      req.flash('validationErrors', ["Erreur lors de l'upload de l'image."])
      req.flash('title', title)
      req.flash('body', body)
      return res.redirect('/post/new')
    }
  }

  try {
    const blogPost = await BlogPost.create({ title, body, image, userid: req.session.userId })
    console.log('Blog post created:', blogPost)
    res.redirect('/')
  } catch (err) {
    console.error('Error creating blog post:', err)
    req.flash('validationErrors', ['Erreur lors de la création du post.'])
    req.flash('title', title)
    req.flash('body', body)
    res.redirect('/post/new')
  }
}
