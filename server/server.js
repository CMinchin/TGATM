const express = require('express');
const routes = require('./api');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

// bypass network, react and file structure stuff to actualy get the right files

app.get("/*.*", (req, res) => {
  console.log(req.url);
  console.log(req.body);
  res.sendFile(req.url, {root: path.join(__dirname, '../client/build')});
});

app.get("*", (req, res) => {
  // console.log(req);
  res.sendFile("../client/build/index.html", {root: path.join(__dirname)});
});

app.listen(PORT, () => {
  console.log(`TGATM running on port ${PORT}!`);
});
