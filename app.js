const express = require("express"); // Import the package
const http = require("http");
const app = express(); // Execute the package
const morgan = require("morgan"); // Import module morgan
const hostname = "localhost";
const port = 3000;
const bodyParser = require("body-parser");
//ROUTES
app.use(morgan("dev")); // Sử dụng morgan
app.use(bodyParser.json());

app.all("/dishes", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
});

app.get("/dishes", (req, res, next) => {
  res.end("Will send all to you");
});

app.post("/dishes", (req, res, next) => {
  res.end(
    "add the dish: " + req.body.name + "with details: " + req.body.description
  );
});

app.put("/dishes", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT Operation not supported");
});

app.delete("/dishes", (req, res, next) => {
  res.end("Deleting all to you");
});

app.get("/dishes/:dishId", (req, res, next) => {
  res.end("Will send details of the dish: " + req.params.dishId + " to you");
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /dishes/" + req.params.dishId);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId + "\n");
  res.end(
    "Updated the dish: " +
      req.body.name +
      "with details: " +
      req.body.description
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end("Deleting dish: " + req.params.dishId);
});

app.use(express.static(__dirname + "/public")); // Sử dụng static với tệp tĩnh

app.use((req, res, next) => {
  res.statusCode = 200; // Respone http status code
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is Express server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

// app.get("/", (req, res) => {
//   res.send("We are here");
// });

// app.listen(3000); //Start connection to the server
