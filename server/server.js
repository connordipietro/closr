const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require('./config/keys');

mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const companyRoutes = require("./routes/companyRoutes");
const dealRoutes = require("./routes/dealRoutes")

app.use(companyRoutes, dealRoutes);
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("Node.js listening on port " + PORT)
});

// app.listen(PORT, () => {
//   console.log("Node.js listening on port " + PORT);
// });