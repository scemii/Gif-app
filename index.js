const express = require("express");
const cors = require("cors");
const app = express();
const bparser = require("body-parser");
const morgan = require("morgan");

app.use(morgan("tiny"));

app.use(cors());
app.use(bparser.urlencoded({ extended: true }));
app.use(bparser.json());

const messages = require("./db/Messages");

app.get("/test", function(req, res) {
  res.json({
    name: "Raffalli",
    firstName: "Pierre"
  });
});

app.get("/messages", function(req, res) {
  messages.getAll().then(messages => {
    res.json(messages);
  });
});

app.post("/messages", function(req, res) {
  console.log(req.body);
  messages
    .create(req.body)
    .then(message => {
      res.json(message);
    })
    .catch(error => {
      res.status(500);
      res.json(error);
    });
});

//front end build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening port ${port}`));
