const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
  try {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid')
    res.render('post', { blogpost, title: blogpost ? blogpost.title : 'Post' })
  } catch (err) {
    console.error('Error fetching blog post:', err)
    res.render('post', { blogpost: null, title: 'Post introuvable' })
  }
}
