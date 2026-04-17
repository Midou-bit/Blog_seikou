const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')

const homeController = require('./src/controllers/home')
const newPostController = require('./src/controllers/newPost')
const listPostController = require('./src/controllers/listPost')
const getPostController = require('./src/controllers/getPost')
const storePostController = require('./src/controllers/storePost')
const newUserController = require('./src/controllers/newUser')
const storeUserController = require('./src/controllers/storeUser')
const loginController = require('./src/controllers/login')
const loginUserController = require('./src/controllers/loginUser')
const logoutController = require('./src/controllers/logout')

const authMiddleware = require('./src/middleware/authMiddleware')
const validateMiddleware = require('./src/middleware/validationMiddleware')
const redirectIfAuthenticatedMiddleware = require('./src/middleware/redirectIfAuthenticatedMiddleware')

const PORT = 4000

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/my_blog')
  console.log('Connected!')
}
main().catch(err => console.log('Connection failed', err))

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(expressSession({ secret: 'X9rfqEGCA4adTfqCUpbxFZiR3ho8KebZ', resave: false, saveUninitialized: false }))
app.use(flash())

global.loggedIn = null
app.use((req, res, next) => {
  loggedIn = req.session.userId
  next()
})

app.get('/', homeController)
app.get('/home', homeController)
app.get('/list', listPostController)
app.get('/post/new', authMiddleware, newPostController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, validateMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'))

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
