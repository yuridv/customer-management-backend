const express = require('express');
const cors = require('cors');

const sessions = require('express-session');
const connectMongo = require('connect-mongo');

const errorMiddleware = require('./src/middleware/error');
const Routes = require('./src/routes');

const app = express();

app
  .set('trust proxy', '::ffff:127.0.0.1')
  
  .use(cors())
  .use(express.json({ limit: '2mb' }))

  .use(sessions({
    secret: process.env.CRYPTOGRAPHY_KEY,
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60
    })
  }))

  .use(errorMiddleware)

  .use('/', Routes)

  .all(/.*/, (req, res) => res.status(404).json({ error: 'O endpoint inserido é inválido...' }));

module.exports = app;