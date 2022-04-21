const express = require("express");
const bodyParser = require("body-parser");
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// Router không yêu cầu dish Id
dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    res.end("Will send all to you");
  })

  .post((req, res, next) => {
    res.end(
      "add the dish: " + req.body.name + "with details: " + req.body.desciption
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT Operation not supported");
  })

  .delete((req, res, next) => {
    res.end("Deleting all to you");
  });

// Router với dish Id
dishRouter
  .route("/:dishId")
  .all((req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    next();
  })

  .get((req, res, next) => {
    res.end("Will send details of the dish: " + req.params.dishId + " to you");
  })

  .put((req, res, next) => {
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end(
      "Will update the dish: " +
        req.body.name +
        "with details: " +
        req.body.desciption
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting dish: " + req.body.dishId);
  });

module.exports = dishRouter;
