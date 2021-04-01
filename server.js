const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const db = mongoose.connection;
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Define any API routes here
app.use(routes);

// Connect to the MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true });
db.on("Error on Mongo connection", error => console.error(error));
db.once("connected", () => console.log("Success! You are connected to Mongoose"));


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
