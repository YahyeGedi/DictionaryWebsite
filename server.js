// Creating a server using express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3000;
const MongoDbConfig = require('./config/MongoDbConfig');
const hbs = require('express-handlebars');
const apiKey = 'f19t7bxksz6iy0kfbbkerrmczfnv4r3davqplbn33ysrl7ses';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the MongoDB database
mongoose
  .connect("mongodb+srv://Users:yahye123@cluster0.1umldd0.mongodb.net/Website")
  .then(() => { console.log("Database Connnected! "); });

const templatePath = path.join(__dirname, './views');
const publicPath = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));


app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/home', (req, res) => {
  const naming = req.query.naming;
  const isAdmin = req.query.isAdmin === 'true'; 

  res.render('home', { naming, isAdmin });
});

// If the user is an admin, show the admin page
app.get('/users', async (req, res) => {
  try {
    const allUsers = await MongoDbConfig.find();
    res.render('users', { users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Redirect to the login page
app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  console.log('Received login request:', name, password);

  try {
    const user = await MongoDbConfig.findOne({ name, password });

    if (user) {
      console.log('User:', user.name, 'isAdmin:', user.isAdmin);
    } else {
      console.log('User not found');
    }

    if (!user) {
      return res.status(401).send("Incorrect username or password");
    }

    // Check if the user is an admin
    const isAdmin = user.isAdmin || false;

    // Redirect to the home page with the user's name and isAdmin status
    res.redirect('/home?naming=' + encodeURIComponent(req.body.name) + '&isAdmin=' + isAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new user
app.post('/signup', async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password
  };

  try {
    const user = await MongoDbConfig.create(data);
    console.log(user);

    res.status(201).render("home", {
      naming: req.body.name
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
