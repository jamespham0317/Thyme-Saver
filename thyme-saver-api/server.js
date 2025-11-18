const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const multer = require("multer");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const uploader = require('./controllers/upload');
const image = require('./controllers/image');

const app = express();

app.use(cors())
app.use(express.json()); 

const db = knex({ 
  client: 'pg',
  connection: {
    host : process.env.PGHOST,
    user : process.env.PGUSER,
    password : process.env.PGPASSWORD,
    database : process.env.PGDATABASE, 
    port: process.env.PGPORT
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'uploaded-file.jpg'); 
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/upload', upload.single("file"), (req, res) => { uploader.handleImageUpload(req, res)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// for debugging backend 
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// for debugging backend connection to database
app.get('/', async (req, res) => {
  try {
    const users = await db.select('*').from('users'); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});