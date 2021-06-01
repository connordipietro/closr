const mongoose = require("mongoose");
const router = require("express").Router();
const Company = require("../models/company");
const Deal = require("../models/deal");
const dealStages = require("../dev-data/dealStages");
const ChangeEntry = require("../models/changeEntry");


router.get("/conversion-percentage-overall", (req, res) => {
  const allDealsCountPromise = Deal.countDocuments({archived: true}).exec();
  const dealsWonCountPromise = Deal.countDocuments({archived: true, stage: "Closed Won"}).exec();

  Promise.all([allDealsCountPromise, dealsWonCountPromise])
    .then((results) => {
      const percentDealsWon = {
        conversionPercentageOverall: results[1]/results[0]
      }
      res.send(percentDealsWon);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    })
})

// Provides list of the revenue from the deals for each company (To-Do: Limit it to the last six months)
router.get("/sales-by-company", (req, res) => {
  Deal.find({stage: "Closed Won"}).populate({path: "company"}).exec()
    .then(dealsWon => {
      const salesRevenueByCompany = dealsWon.reduce((acc, deal) => {
        acc[deal.company.name] = acc[deal.company.name] ? acc[deal.company.name] + deal.amount : deal.amount;
        return acc;
      }, {});
      res.send(salesRevenueByCompany);
    })
    .catch(err => {
      console.error(err);
      res.end();
    })
})

module.exports = router;