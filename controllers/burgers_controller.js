var express = require("express");
var router = express.Router();
var burger = require("../models/berger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
      });
});
router.post("/burger", function(req, res) {
    // console.log(req.body.burger)
    burger.create([ "burger"], [req.body.burger], function(result) {
      res.json({ id: result.insertId });
    });
  });
router.put("/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update(
      {
        devoured: req.body.devoured
      },
      condition,
      function(result) {
        if (result.changedRows === 0) {
          return res.status(404).end();
        }
        res.status(200).end();
  
      }
    );
  });


module.exports = router