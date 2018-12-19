const express = require("express");
const validUrl = require("valid-url");
const url = require("../models/url.js");

const router = express.Router();

router.post("/shorturl/new", function(req, res) {
  const originalUrl = req.body.url;
  if(validUrl.isUri(originalUrl)) {
    const urlObj = {
      url: originalUrl,
    }
    url.create(urlObj, function(err, success) {
      if(err) {
        res.json({ error: "Database error" });
        return;
      }
      res.json({
        "original_url": originalUrl,
        "short_url": success.short,
      });
    });
  } else {
    res.json({"error":"invalid URL"});
  }
});

router.get("/shorturl/:url(*)", function(req, res) {
  const id = req.params.url;
  url.findOne({short: id}, 'url', function (err, urlData) {
    if(err) {
      console.log(err);
    } else {
        if(urlData) {
          res.redirect(urlData.url);
        } else {
          res.json({error: "This url is not on the database."});
        }
    }
  });
});

module.exports = router;
