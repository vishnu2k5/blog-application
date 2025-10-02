const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/user');    


mongoose.connect('mongodb://localhost:27017/blog-application').then(() => {console.log('Connected to MongoDB')}).catch((err) => console.log(err));
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.render('home');
});

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});










