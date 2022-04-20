const express = require("express"); // Import the package
const http = require("http");
const app = express(); // Execute the package
const morgan = require("morgan"); // Import module morgan
const hostname = "localhost";
const port = 3000;
const bodyParser = require("body-parser");
const dishRouter = require("./routes/dishRouter");
//ROUTES
app.use(morgan("dev")); // Sử dụng morgan
app.use(bodyParser.json());

app.use("/dishes", dishRouter);

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
