var express = require("express");
var url = require("url");
var dns = require("dns");
var router = express.Router();
var store = [];

// Check if the URL exists
const isValid = x => {
  let hostname = url.parse(x).hostname;
  dns.lookup(hostname, (err, address) => {
    if (address) {
      return x;
    } else {
      return null;
    }
  });
};
// function isValidUrl(req, res, next) {
//   let { url } = req.body;
//   if (!isValid(url)) {
//     let error = "Url does not exist";
//     res.json({ error });
//   } else {
//     next();
//   }
// }

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express", store });
});

router.post("/api/shorturl/new", function(req, res, next) {
  var url = isValid(req.body.url);
  // if (!isValid(url)) {
  //   let error = "Url does not exist!";
  //   res.json({ error });
  // } else {
  if (url == null) {
    let error = "Url does not exist!";
    res.json({ error });
  } else {
    store.push(url);
    let toStore = { "original url": url, "short url": store.length };
    res.json(toStore);
  }
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
