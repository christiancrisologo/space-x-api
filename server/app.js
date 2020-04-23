const dbPool = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for local dev not for production
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function send(res, result, status = 200) {
  res.status(status);
  res.send(result);
}

app.get("/", async (req, res) => {
  const rows = await dbPool.query("SELECT * FROM spaceData");
  send(res, {
    result: JSON.stringify(rows),
  });
});

app.get("/upcoming-capsules", async (req, res) => {
  const response = await fetch(
    "https://api.spacexdata.com/v3/capsules/upcoming"
  );
  const result = await response.json();
  send(res, { result });
});

app.get("/all-landing-pads", async (req, res) => {
  const response = await fetch("https://api.spacexdata.com/v3/landpads");
  const result = await response.json();
  send(res, { result });
});

app.delete("/landing-pad/:id", async (req, res) => {
  const id = req.params.id;
  const deleteRow = await dbPool.query("DELETE  FROM spaceData WHERE id = ?", [
    id,
  ]);
  send(res, { result: deleteRow });
});

app.get("/landing-pad/:id", async (req, res, next) => {
  const id = req.params.id;
  const rows = await dbPool.query("SELECT * FROM spaceData WHERE id = ?", [id]);

  if (rows && rows.length) {
    send(res, { result: rows });
  }

  const apiResponse = await fetch(
    `https://api.spacexdata.com/v3/landpads/${id}`
  );
  const apiResult = await apiResponse.json();

  if (!apiResult.error) {
    const insertRow = await dbPool.query(
      "INSERT INTO spaceData (id, full_name, status, location) VALUES (?)",
      [
        [
          apiResult.id,
          apiResult.full_name,
          apiResult.status,
          JSON.stringify(apiResult.location),
        ],
      ],
      async function (err, result) {
        if (err) {
          send(res, { error: "Error on insert record", details: err });
        }
        const rows = await dbPool.query(
          "SELECT * FROM spaceData WHERE id = ?",
          [id]
        );
        send(res, { result: rows });
      }
    );
  }

  send(res, { result: apiResult });
});

app.listen("4000");
console.log(
  `Listening on port: 4000, wait for the development server to be up...`
);
