const express = require("express");
const path = require("path");
const port = 3000;
const axios = require("axios");

const app = express();

const absoluepath = path.join(__dirname, "../index.html");

app.get("/", (req, res) => {
  res.sendFile(absoluepath);
});
app.get("/search/:id", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.dictionaryapi.dev/api/v2/entries/en/${req.params.id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const api = async () => {
    try {
      const response = await axios.request(options);
      res.json(response.data[0].meanings[0].definitions[0].definition);
    } catch (error) {
      console.error(error);
    }
  };
  api();
});

app.listen(port, () => {
  console.log("app starting watch to feel amased");
});
