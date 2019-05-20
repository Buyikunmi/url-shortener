var express = require("express");
var router = express.Router();
var store = [];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express", store });
});

router.post("/api/shorturl/new", function(req, res, next) {
  let url = req.body.url;
  store.push(url);
  let toStore = { "original url": url, "short url": store.length };
  res.json(toStore);
});

router.get("/api/shorturl/:id", function(req, res, next) {
  let { id } = req.params;
  let url = store[id - 1] || "/api/error";
  res.redirect(301, url);
});

router.get("/api/error", function(req, res, next) {
  let error = "Invalid url";
  res.json({ error });
});
module.exports = router;
