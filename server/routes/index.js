const mongoose = require("mongoose");
const router = require("express").Router();
const companyRoutes = require("./companyRoutes");
const dealRoutes = require("./dealRoutes");
const Company = require("../models/company");
const companies = require("../dev-data/companies");
const Deal = require("../models/deal");
const deals = require("../dev-data/deals");

router.use(companyRoutes);
router.use(dealRoutes);

//TO-DO: Push the deal id into the deals array for its company
router.get("/generate-dev-data", (req, res) => {
  const generateDummyData = async () => {
    await Company.deleteMany({}).exec();
    const saveCompaniesPromises = companies.map(company => {
      let newCompany = new Company(company);
      return newCompany.save();
    })
    await Promise.all(saveCompaniesPromises)

    await Deal.deleteMany({}).exec()
    const saveDealsPromises = deals.map(deal => {
      let newDeal = new Deal(deal);
      return newDeal.save()
    })
    await Promise.all(saveDealsPromises);

    res.send('saved the fake data')
  }
  
  generateDummyData();
})

module.exports = router;