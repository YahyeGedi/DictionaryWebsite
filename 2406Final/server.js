const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3000;
const MongoDbConfig = require('./config/MongoDbConfig');
const hbs = require('hbs');
const apiKey = 'f19t7bxksz6iy0kfbbkerrmczfnv4r3davqplbn33ysrl7ses';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb+srv://Users:yahye123@cluster0.1umldd0.mongodb.net/Website")
  .then(() => { console.log("Connected to database!"); });

const templatePath = path.join(__dirname, './views');
const publicPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

// Middleware to check if the user has the 'admin' role
// Middleware to check if the user has the 'admin' role
const checkAdminRole = async (req, res, next) => {
  const { name, password } = req.query; // Change here

  try {
    console.log('Checking Admin Role for:', name, password);
    const user = await MongoDbConfig.findOne({ name, password }).exec();
    console.log('User:', user);

    if (user && user.role === 'admin') {
      next(); // Continue to the next middleware or route handler
    } else {
      console.log('Access Denied - Incorrect Role:', user && user.role);
      res.status(403).send("Access Denied");
    }
  } catch (error) {
    console.error('Error checking admin role:', error);
    res.status(500).send("Internal Server Error");
  }
};


app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/', (req, res) => {
  res.render('login');
});

// Apply the middleware to the /users route for both GET and POST requests
app.get('/users', checkAdminRole, async (req, res) => {
  try {
    const allUsers = await MongoDbConfig.find();
    res.render('users', { users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/users', checkAdminRole, async (req, res) => {
  try {
    const allUsers = await MongoDbConfig.find();
    res.render('users', { users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  console.log('Received login request:', name, password);

  try {
    const user = await MongoDbConfig.findOne({ name, password });

    if (user) {
      console.log('User:', user.name, 'Role:', user.role);
    } else {
      console.log('User not found');
    }

    if (!user) {
      return res.status(401).send("Incorrect username or password");
    }

    // Check if the user is the admin
    if (name === 'Yahye Gedi' && password === '12') {
      // Redirect to the '/users' page
      return res.redirect('/users');
    }

    res.status(201).render("home", {
      naming: req.body.name
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



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
});
