const express = require("express");
const bodyParser = require("body-parser");
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .all((req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    next();
  })

  .get((req, res, next) => {
    res.end("Will send all the promotions to you");
  })

  .post((req, res, next) => {
    res.end(
      "Will add the promotion: " +
        req.body.name +
        " with detials: " +
        req.body.description
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT Operation not supported");
  })

  .delete((req, res, next) => {
    res.end("Deleting all promotions");
  });

promoRouter
  .route("/:promoId")
  .all((req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    next();
  })

  .get((req, res, next) => {
    res.end(
      "Will send details of the promotions:" + req.params.promoId + " to you"
    );
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST Operation not supported on /promotions/" + req.body.promoId);
  })

  .put((req, res, next) => {
    res.write("Updating the promotion: " + req.params.promoId + "\n");
    res.end(
      "Will update the promotion: " +
        req.body.name +
        "with details: " +
        req.body.desciption
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting all promotions: " + req.params.promoId);
  });

module.exports = promoRouter;
