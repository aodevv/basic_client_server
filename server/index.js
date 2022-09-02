const express = require("express");
const http = require("http");
const colors = require("colors");
const bodyParser = require("body-parser");
const cors = require('cors')
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");

// DB setup
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://auth_user:6NetiZWO344EfXr0@cluster0.irfawj3.mongodb.net/auth_lesson?retryWrites=true&w=majority"
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

connectDB();

const app = express();

//APP SETUP
app.use(cors())
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//SERVER SETUP
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
