const express = require('express');
const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const mongoose = require('mongoose');
const { checkforAuthenticationCookie } = require('./services/authentication');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog');

const app = express();
const PORT = 8000 || env.process.PORT;

mongoose
  .connect('mongodb://localhost:27017/blogify')
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
