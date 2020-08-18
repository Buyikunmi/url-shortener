var express = require("express");
var validUrl = require("valid-url");
var router = express.Router();
var store = [];

// // Check if the URL exists
// // step I : extract the hostname from the long url
// function extractHostname(url) {
//   var hostname;
//   //find & remove protocol (http, ftp, etc.) and get hostname

//   if (url.indexOf("//") > -1) {
//     hostname = url.split("/")[2];
//   } else {
//     hostname = url.split("/")[0];
//   }

//   //find & remove port number
//   hostname = hostname.split(":")[0];
//   //find & remove "?"
//   hostname = hostname.split("?")[0];
//   console.log(`\n\n\nThe hostname for DNS lookup is : ${hostname}\n`);
//   return hostname;
// }
// // step II : DNS lookup

// function validateURL(url) {
//   const hostName = extractHostname(url);
//   dns.lookup(hostName, (err, address) => {
//     if (err) {
//       console.log(`\n\nan error occurred. \n Error Details : \n ${err}`);
//       console.log(err == true);
//       return false;
//     }

//     console.log(`\nThe hostname is valid, the IP address is : ${address}`);
//     return true;
//   });\
// }

router.get("/store", function (req, res, next) {
  res.json({ store });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "URL shortener API", store });
});

router.post("/api/shorturl/new", function (req, res, next) {
  let { url } = req.body;
  // console.log(`URL validation details : ${url}`);
  if (validUrl.isUri(url)) {
    console.log("valid url");
    if (store.indexOf(url) > -1) {
      var toStore = {
        "original url": url,
        "short url": store.indexOf(url) + 1,
      };
    } else {
      store.push(url);
      var toStore = { "original url": url, "short url": store.length };
    }
    res.json(toStore);
  } else {
    console.log("invalid url");
    let error = "The url is invalid";
    res.json({ error });
  }
});

router.get("/api/shorturl/:id", function (req, res, next) {
  let { id } = req.params;
  let url = store[id - 1] || "/api/error";
  res.redirect(301, url);
});

router.get("/api/error", function (req, res, next) {
  let error = "Invalid url";
  res.json({ error });
});

module.exports = router;
