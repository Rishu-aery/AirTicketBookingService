const express = require("express");
const { BookingController } = require("../../controller/index.js");
const router = express.Router();

router.post("/booking", BookingController.create);

module.exports = router;