const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/user');  
const blogRoute = require("./routes/blog");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');
const  Blog  = require('./models/blog');


mongoose.connect('mongodb://localhost:27017/blog-application').then(() => {console.log('Connected to MongoDB')}).catch((err) => console.log(err));
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve("./public")));

app.get('/', async(req, res) => {
    // console.log(req.user);
    const allBlogs = await Blog.find({}).populate('createdBy').sort({createdAt: -1});
  res.render("home",{
    user: req.user,
    blogs: allBlogs
});
});

app.use('/user', userRouter);
app.use('/blog', blogRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});










