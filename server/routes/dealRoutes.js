const mongoose = require("mongoose");
const router = require("express").Router();
const Company = require("../models/company");
const companies = require("../dev-data/companies");
const Deal = require("../models/deal");
const deals = require("../dev-data/deals");
const dealStages = require("../dev-data/dealStages");
const ChangeEntry = require("../models/changeEntry");

router.get("/deals", (req, res) => {
  const searchObject = {};
  req.query.stage ? searchObject.stage = dealStages[Number(req.query.stage)] : null;

  Deal.find(searchObject)
    .populate("company")
    .populate("stageHistory")
    .exec((err, dealResults) => {
    if (err) {
      console.error(err)
    }
    res.send(dealResults);
  });
})

router.get("/deals/:id", (req, res) => {

  Deal.findById(req.params.id)
    .populate({path: "company"})
    .populate("stageHistory")
    .exec((err, foundDeal) => {
    if (err) {
      console.error(err)
    }
    if (!foundDeal){
      res.status(404).send("Deal not found")
    }
    res.send(foundDeal);
  });
})

router.post("/deals", (req, res) => {
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
      res.send('successfully saved to database')
    })
    .catch(err => {
      console.error(err);
      res.status(400).send("error, entry not saved")
      res.end();
    }) 
})

router.put("/deals/:id", (req, res) => {
  Deal.findById(req.params.id).exec()
    .then((deal) => {
      if(!deal) {
        res.status(404).send("Deal not found");
      }

      for (prop in req.body) {
        deal[prop] = req.body[prop];
      }
      return deal.save();
    })
    .then(dealWithUpdates => {
      res.send(dealWithUpdates)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("Server error")
    })
})

//update takes in query 'stage' corresponding to dealStages.js array in devData folder
//if no query is provided, it advances the deal one stage

router.put("/deals/:id/update", (req, res) => {
  Deal.findById(req.params.id).exec()
    .then((deal) => {
      if(!deal) {
        res.status(404).send("Deal not found");
      }
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

      deal.save((err, savedDeal)=>{
        newChangeEntry.save();
        res.send(savedDeal)
      })
    })
    .catch((err) => {
      console.error(err)
    })
})

router.put("/deals/:id/cancel", (req, res) => {
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

router.delete("/deals/:id", (req, res) => {
  Deal.findByIdAndDelete(req.params.id).exec((err, deletedDeal) => {
    if(!deletedDeal) {
      return res.status(404).send("No deal with that Id found")
    }
    if(err) {
      console.error(err)
    }
    res.send(`${deletedDeal.name} deal for ${deletedDeal.amount} successfully deleted`)
  })
})

router.get("/generate-deals-dev-data", (req, res) => {
  Deal.deleteMany({}).exec()
    .then(() => {
      deals.forEach(deal => {
        let newDeal = new Deal(deal);
        newDeal.save((err) => {
          if (err) throw err;
        })
      })
    })
  res.send('saved the fake data');
})

module.exports = router;