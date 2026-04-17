const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
  try {
    const blogposts = await BlogPost.find().populate('userid')
    res.render('list', { blogposts, title: 'Liste des Posts' })
  } catch (err) {
    console.error('Error fetching blog posts:', err)
    res.render('list', { blogposts: [], title: 'Liste des Posts' })
  }
}
