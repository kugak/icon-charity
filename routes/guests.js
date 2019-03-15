const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Loead Guest Model
require("../models/Guest");
const Guest = mongoose.model("guests");

// Process Form
router.post("/",  (req, res) => {
  let errors = [];
  
  if (errors.length > 0) {
    res.render("/", {
      errors: errors,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      company_name: req.body.company_name,
      receive_email: req.body.receive_email
    });
  } else {
    const newGuest = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      company_name: req.body.company_name,
      receive_email: req.body.receive_email,
    };
    new Guest(newGuest).save().then(guest => {
      req.flash("success_msg", "Thank you for registering! Enjoy the Dinner!");
      res.redirect("../index");
    });
  }
});

module.exports = router;
