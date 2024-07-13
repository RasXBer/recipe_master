const express = require('express');
const db = require('./config/connection');
// const routes = require('./server/routes');

const cwd = process.cwd();

const PORT = 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('01-Activities')
  ? cwd.split('01-Activities')[1]
  : cwd;
  
//test the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
  });
});
