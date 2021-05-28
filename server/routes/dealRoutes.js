const mongoose = require("mongoose");
const router = require("express").Router();
const Company = require("../models/company");
const companies = require("../dev-data/companies");
const Deal = require("../models/deal");
const deals = require("../dev-data/deals");
const dealStages = require("../dev-data/dealStages");
const ChangeEntry = require("../models/changeEntry");

router.param("id", (req, res, next, id) => {
  Deal.findById(id).populate({path: "company"}).populate("stageHistory").exec((err, deal) => {
    if(err) {
      return res.status(404).send("No Deal with that ID found");
    }
    req.deal = deal;
    next();
  })
})

router.get("/", (req, res) => {
  const searchObject = {};
  req.query.stage ? searchObject.stage = dealStages[Number(req.query.stage)] : null;

  Deal.find(searchObject)
    .populate("company")
    .populate("stageHistory")
    .exec((err, dealResults) => {
      if (err) {
        console.error(err)
        res.end();
      }
      res.send(dealResults);
    });
})

router.get("/by-stage", (req, res) => {
  const resultsObj = dealStages.reduce((acc,stageName) => ({...acc,[stageName]:{name: stageName, items: []}}),{});
  const searchObject = {};
  const propertiesToReturn = 'amount name stage company';
  Deal.find(searchObject, propertiesToReturn).populate("company").exec()
    .then(dealResults => {
      const dealsSortedByStage = dealResults.reduce((acc, deal) => {
        deal.id = deal._id;
        acc[deal.stage].items.push(deal)
        return acc;
      }, resultsObj)
      res.send(dealsSortedByStage)
    })
})

// TO-DO: Build in some way to make sure the company for new deal is valid. Also, add in an error message if the company is invalid.
router.post("/", (req, res) => {
  let newDeal = new Deal(req.body);
  newDeal.stage = req.body.stage || 'Initiated';
  newDeal.createdAt = new Date();
  newDeal.stageLastUpdatedAt = new Date();
  newDeal.archived = false;
  newDeal.expectedCloseDate = req.body.expectedCloseDate || null;
  
  newDeal.save()
    .then(dealSaved => {
      return Company.findById(dealSaved.company).exec()
    })
    .then(companyMatch => {
      companyMatch.deals.push(newDeal._id);
      return companyMatch.save()
    })
    .then(company => {
      res.send('successfully saved to database');
    })
    .catch(err => {
      console.error(err);
      res.status(400).send("error, entry not saved");
    }) 
})

router.get("/:id", (req, res) => {
  res.send(req.deal);
})

// TO-DO: Make sure request cannot change properties it shouldn't be allowed to like stageHistory and createdAt
// TO-DO: Make sure any changes to the stage is a valid stage
// TO-DO: Add in the stageHistory tracker here, so a changeEntry is created if the stage changes.
router.put("/:id", (req, res) => {
  const deal = req.deal;
  let stageChanged = false;
  for (prop in req.body) {
    deal[prop] = req.body[prop];
  }
  deal.save()
    .then(dealWithUpdates => {
      res.send(dealWithUpdates);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    })
})

// update takes in query 'stage' corresponding to dealStages.js array in devData folder
// if no query is provided, it advances the deal one stage
router.put("/:id/update", (req, res) => {
  const deal = req.deal;
  let oldStageIndex = dealStages.findIndex(stage => stage === deal.stage);
  if (oldStageIndex === 3 || oldStageIndex === 4) {
    return res.send('Deal already closed, unable to advance')
  }
  let newIndex
  req.query.stage ? newIndex = Number(req.query.stage) : newIndex = oldStageIndex + 1;
  deal.stage = dealStages[newIndex];
  const newChangeEntry = new ChangeEntry({
    timeStamp: new Date(),
    deal: deal._id,
    newValue: deal.stage
  });
  deal.stageHistory.push(newChangeEntry._id);

  deal.save()
    .then(savedDeal => {
      newChangeEntry.save();
      res.send(savedDeal);
    })
    .catch(err => {
      console.error(err);
    })

  // Deal.findById(req.params.id).exec()
  //   .then((deal) => {
  //     if(!deal) {
  //       res.status(404).send("Deal not found");
  //     }
  //     let oldStageIndex = dealStages.findIndex(stage => stage === deal.stage);
  //     if (oldStageIndex === 3 || oldStageIndex === 4) {
  //       return res.send('Deal already closed, unable to advance')
  //     }
  //     let newIndex
  //     req.query.stage ? newIndex = Number(req.query.stage) : newIndex = oldStageIndex + 1;
  //     deal.stage = dealStages[newIndex];
  //     const newChangeEntry = new ChangeEntry({
  //       timeStamp: new Date(),
  //       deal: deal._id,
  //       newValue: deal.stage
  //     });
  //     deal.stageHistory.push(newChangeEntry._id);

  //     deal.save((err, savedDeal)=>{
  //       newChangeEntry.save();
  //       res.send(savedDeal)
  //     })
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
})

router.put("/:id/cancel", (req, res) => {
  Deal.findById(req.params.id).exec()
    .then((deal) => {
      if(!deal) {
        res.status(404).send("Deal not found");
      }
      let oldStageIndex = dealStages.findIndex(stage => stage === deal.stage);
      //examine if this is necessary later
      if (oldStageIndex === 3 || oldStageIndex === 4) {
        return res.send('Deal already closed, unable to cancel')
      }
      deal.stage = dealStages[4];
      deal.save((err, savedDeal)=>{
        res.send(savedDeal)
      })
    })
    .catch((err) => {
      console.error(err)
    })
})

// TO-DO: Make sure it removes the deal from the deals array in the corresponding company document as well.
router.delete("/:id", (req, res) => {
  const companyForDeal = req.deal.company;
  //companyForDeal.deals = companyForDeal.deals.filter((deal) => deal !== req.deal._id)
  Deal.deleteOne(req.deal)
    .then(() => {
      res.send("Deal successfully deleted");
    })
    .catch(err => {
      console.error(err);
      res.end();
    }) 
})

module.exports = router;