const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const routes = require("./routes")();
const path = require('path')

const port = process.env.PORT ||4500;

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false,}));
app.use(bodyParser.json());
app.use("/", routes);
app.use('/images' , express.static(path.join(__dirname, '/images')));
app.use(function (err, req, res) {
  if (err) {
    response = { error: err.message };
    err.message = err.status + ":" + err.message;
    err.code && (response.code = err.code);
    res.status(err.status || 500).json(response);
  }
});

app.listen(port, () => {
    console.log(`prism api app listening on port ${port}!`);
  }).on('error', (error) => {
    console.log("error: ", error)
  });