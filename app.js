const fs = require("fs");
process.stdin.setEncoding("utf8");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "credentialsDontPost/.env"),
});

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// use environment PORT for Render, or command line argument for local
let portNumber = process.env.PORT || process.argv[2];

if (!portNumber) {
  console.log(`Usage: ${process.argv[1]} PORT_NUMBER`);
  console.log(`Or set PORT environment variable`);
  process.exit(1);
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "templates");
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB using Mongoose");
});

// Routers
const applyRouter = require("./routes/route");
app.use("/", applyRouter);

app.listen(portNumber);
console.log(`Web server started and running at http://localhost:${portNumber}`);

//  enable stdin for local development (not on Render)
if (!process.env.PORT) {
  const prompt = "Stop to shutdown the server: ";
  process.stdout.write(prompt); 

  process.stdin.on("readable", function () {
    const dataInput = process.stdin.read();

    if (dataInput !== null) {
      if (dataInput.trim() === "stop") {
        console.log("Shutting down the server");
        process.exit(0);
      }
      process.stdout.write(prompt);
      process.stdin.resume();
    }
  });
}