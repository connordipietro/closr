const mongoose = require("mongoose");
const router = require("express").Router();
const companyRoutes = require("./companyRoutes");
const dealRoutes = require("./dealRoutes");

router.use(companyRoutes);
router.use(dealRoutes);

module.exports = router;