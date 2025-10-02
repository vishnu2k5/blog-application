const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/user');    
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');


mongoose.connect('mongodb://localhost:27017/blog-application').then(() => {console.log('Connected to MongoDB')}).catch((err) => console.log(err));
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.get('/', (req, res) => {
    // console.log(req.user);
  res.render("home",{user: req.user});
});

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});










