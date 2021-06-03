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

      let percentage = results[1] / results [0]

      if (!percentage) {
        percentage = 0
      }

      const percentDealsWon = {
        conversionPercentageOverall: percentage
      }
   
      res.send(percentDealsWon);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    })
})

router.get("/conversion-percentage-by-stage", (req, res) => {
  const initiatedDealsPromise = Deal.countDocuments({archived: true}).exec();
  const qualifiedDealsPromise = Deal.find({archived: true, "stageHistory": {$elemMatch: {newValue: "Qualified"}}}).countDocuments().exec();
  const contractSentDealsPromise = Deal.find({archived: true, "stageHistory": {$elemMatch: {newValue: "Contract Sent"}}}).countDocuments().exec();
  const closedWonDealsPromise = Deal.countDocuments({archived: true, stage: "Closed Won"}).exec();

  Promise.all([initiatedDealsPromise, qualifiedDealsPromise, contractSentDealsPromise, closedWonDealsPromise])
    .then(results => {
      let conversionPercentageByStage = [];
      for (let i = 0; i < 3; i++) {

        let percentage = results[3]/results[i];

        if (!percentage) {
          percentage = 0
        }

        const stageObject = {
          stage: dealStages[i],
          conversionPercentage: percentage
        }

        conversionPercentageByStage.push(stageObject);
      
      }
      res.send(conversionPercentageByStage);
    })
    .catch(err => {
      console.error(err);
      res.end();
    })
})

// Provides list of the revenue from the deals for each company (To-Do: Limit it to the last six months)
router.get("/sales-by-company", (req, res) => {
  Deal.aggregate([
    { $match: {archived: true, stage: "Closed Won"}},
    { $group: { _id: "$company", total: {$sum: "$amount"}}},
    { $sort: {total: -1 }},
    { $limit: 5},
    { $lookup: {from: 'companies', localField: '_id', foreignField: '_id', as: 'company'}},
    { $unwind: "$company"},
    { $project: {total: 1, name: "$company.name"}},
  ])
    .then(deals => {
      res.send(deals)
    })
    .catch(err => {
      console.error(err)
      res.end();
    })
})

router.get("/sales-by-month", (req, res) => {
  Deal.aggregate([
    { $match: {archived: true, stage: "Closed Won"}},
    { $project: {amount: 1, month: { $dateToString: { format: "%Y-%m", date: "$stageLastUpdatedAt" } }} },
    { $group: {_id: "$month", total: {$sum: "$amount"} }},
    { $sort: {_id: -1}},
    { $limit: 6},
    { $project: {_id: 0, total: 1, month: "$_id"}}
  ])
    .then(salesByMonth => {
      res.send(salesByMonth);
    })
    .catch(err => {
      console.error(err);
      res.end();
    })
})


module.exports = router;