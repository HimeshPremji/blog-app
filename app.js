require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const { checkforAuthenticationCookie } = require('./services/authentication');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  // .connect('mongodb://localhost:27017/blogify')
  .connect(process.env.MONGO_URL)
  .then((e) => console.log('MongoDB is conneected'));

app.set('view engine', 'ejs');
app.set('/views', path.resolve('./views'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(checkforAuthenticationCookie);
app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate('createdBy');
  console.log(allBlogs);

  res.render('home', {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
