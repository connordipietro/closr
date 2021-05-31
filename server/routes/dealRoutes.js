const mongoose = require("mongoose");
const router = require("express").Router();
const Company = require("../models/company");
const Deal = require("../models/deal");
const dealStages = require("../dev-data/dealStages");
const ChangeEntry = require("../models/changeEntry");

// For all routes that specify a deal Id, finds the deal and provides it to the route
router.param("id", (req, res, next, id) => {
  Deal.findById(id).populate({path: "company"}).populate("stageHistory").exec((err, deal) => {
    if(err) {
      return res.status(404).send("No Deal with that ID found");
    }
    req.deal = deal;
    next();
  })
})

// Returns list of deals 
// TO-DO: Update so request can specify archived deals for the search object.
router.get("/", (req, res) => {
  const searchObject = {};
  searchObject.stage = req.query.stage ? req.query.stage : null;

  Deal.find(searchObject)
    .populate("company")
    .populate("stageHistory")
    .exec((err, dealResults) => {
      if (err) {
        console.error(err);
        res.end();
      }
      res.send(dealResults);
    });
})

// Returns a list of active deals sorted into respective stage arrays.
// TO-DO: Update so only non-archived deals are retreived from database.
router.get("/by-stage", (req, res) => {
  // Creates an object where each property is an object for a particular deal stage (e.g. {name: "Initiated", items: [Deals currently in initiated stage]})
  const resultsObj = dealStages.reduce((acc,stageName) => ({...acc,[stageName]:{name: stageName, items: []}}),{});
  const searchObject = {};
  const propertiesToReturn = 'amount name stage company';
  Deal.find(searchObject, propertiesToReturn).populate("company").exec()
    .then(dealResults => {
      const dealsSortedByStage = dealResults.reduce((acc, deal) => {
        deal.id = deal._id;
        acc[deal.stage].items.push(deal);
        return acc;
      }, resultsObj);
      res.send(dealsSortedByStage);
    })
})

// Adds a new deal to the database
router.post("/", (req, res) => {
  const newDeal = new Deal(req.body);
  newDeal.stage = req.body.stage || 'Initiated';
  newDeal.createdAt = new Date();
  newDeal.stageLastUpdatedAt = new Date();
  newDeal.archived = false;
  newDeal.expectedCloseDate = req.body.expectedCloseDate || null;
  
  newDeal.save()
    .then(dealSaved => {
      return Company.findById(dealSaved.company).exec();
    })
    .then(companyMatch => {
      companyMatch.deals.push(newDeal._id);
      return companyMatch.save();
    })
    .then(company => {
      res.send('Deal successfully saved to database');
    })
    .catch(err => {
      console.error(err);
      if(err.errors.company) {
        return res.status(404).send("Provided company for deal not found");
      }
      res.status(400).send("error, entry not saved");
    }) 
})

// Returns the likliehood for a deal at each staged to be won based on archived deals
router.get("/conversion-rate", (req, res) => {

  // const generateConversionRates = async () => {
  //   const contractSentDeals = await Deal.find({archived: true, stageHistory})
  //   // const populatedDeals = await Deal.find({archived: true}).populate("stageHistory").exec();
  //   const contractSentDealIds = await ChangeEntry.find({newValue: "Contract Sent"}, "deal").exec()

  //   const numberOfDealsWon = await Deal.find({archived: true, stage: "Closed Won"}).count().exec();
  //   const numberOfInitiatedDeals = await Deal.find({archived: true}).count().exec();
  //   const initiatedStageConversionRate = numberOfDealsWon / numberOfInitiatedDeals ;
  //   const numberOfQualifiedDeals = 2 
  //   const qualifiedStageConversionRate = numberOfDealsWon / numberOfQualifiedDeals ;
  //   const numberOfContractSentDeals = 2 
  //   const qualifiedStageConversionRate = numberOfDealsWon / numberOfContractSentDeals ;
  // }

})

// Returns the specific deal matching the id provided
router.get("/:id", (req, res) => {
  res.send(req.deal);
})

// Used to update the stage of the deal with the provided id.
// TO-DO: Maybe update the endpoint to be /:id/stage
router.put("/:id", (req, res) => {
  const { deal } = req;
  if (!req.body.stage){
    return res.send('stage not provided, must provide stage for update');
  }
  if(deal.stage === req.body.stage){
    return res.send('existing stage provided in put request. check actions');
  }
  if (!dealStages.includes(req.body.stage)){
    return res.send('invalid stage provided, check dealstages for details');
  }
  deal.stage = req.body.stage;
  const newChangeEntry = new ChangeEntry({
    timeStamp: new Date(),
    deal: deal._id,
    newValue: deal.stage
  });
  newChangeEntry.save()
    .then(savedEntry=>{
      deal.stageHistory.push(savedEntry._id);
      return deal.save()
    })
    .then(savedDeal=>{
      res.send(savedDeal)
    })
    .catch(err => {
      console.error(err);
      res.end();
    })
})

// The general endpoint to update any of a deals mutable properties except for the stage (stage can only be updated at PUT /:id)
// TO-DO: Put in a check so that the stage can not be updated by this endpoint. Or if it can be updated then make sure a change entry is created here.
router.put("/:id/update", (req, res) => {
  const { deal } = req;
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

// Deletes the deal from the database
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