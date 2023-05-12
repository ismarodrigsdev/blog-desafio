const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const DBURI = process.env.DB_URI;

async function connectDatabase() {
  try {
    await mongoose.connect(DBURI);
    console.log('Database connected!');
  } catch (error) {
    console.log('Error connecting to database:', error);
  }
}

function configureApp() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(authRoutes);
  app.use(postRoutes);
}

async function startServer() {
  await connectDatabase();
  configureApp();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();