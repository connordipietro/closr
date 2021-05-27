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

//TO-DO: Push the deal id into the deals array for its company. In order for that to work need to revise the deals dummy data file to only grab the list of companies after the saveCompaniesPromises have resolved.
router.get("/generate-dev-data", (req, res) => {
  const generateDummyData = async () => {
    const clearCollectionsPromises = [Company.deleteMany({}).exec(), Deal.deleteMany({}).exec()];
    await clearCollectionsPromises;
    const saveCompaniesPromises = companies.map(company => {
      let newCompany = new Company(company);
      return newCompany.save();
    })
    await Promise.all(saveCompaniesPromises)

    const saveDealsPromises = deals.map(deal => {
      let newDeal = new Deal(deal);
      // Company.findById(newDeal.company).exec((err, companyForDeal) => {
      //   companyForDeal.deals.push(newDeal);
      //   companyForDeal.save();
      // })
      return newDeal.save()
    })
    await Promise.all(saveDealsPromises);

    res.send('saved the fake data')
  }

  generateDummyData();
})

module.exports = router;