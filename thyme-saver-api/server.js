const express = require('express');
const bodyParser = require('body-parser'); 
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const multer = require("multer");
const path = require("path");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({ 
  client: 'pg',
  connection: {
    host : process.env.PGHOST,
    user : process.env.PGUSER,
    password : process.env.PGPASSWORD,
    database : process.env.PGDATABASE, 
    port: process.env.PGPORT,
    ssl: { rejectUnauthorized: false }
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

const app = express();

app.use(cors())
app.use(express.json()); 

app.get('/', async (req, res) => {

  console.log("🚀 Trying DB connection...");
  try {
    const users = await db.select('*').from('users'); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully", file: req.file.filename });
});

app.use("/uploads", express.static("uploads"));

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

module.exports = app;