const config = require("./config");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const dbInitializer = require("./db");

const forms = multer();

const startServer = async () => {
  const app = express();
  const db = dbInitializer(config);

  app.use(bodyParser.json());
  app.use(forms.array());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.get("/read/:npm", db.getMahasiswa);

  app
    .listen(config.port, () => {
      console.log(`Listening on ${config.port}`);
    })
    .on("error", (err) => {
      console.log(`Unexpected error has occured`);
      console.log(err);
    });
};

startServer();
