const Company = require("../models/company");
const mongoose = require("mongoose");
const faker = require("faker");
const Deal = require("../models/deal");
const stageOptions = require('./dealStages')

const generateArchivedDeals = async () => {
  const companyOptions = await Company.find({}).exec();
  for (let i = 0; i < 10; i++) {
    const newDeal = new Deal();
    newDeal.name = faker.fake("{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}");
    newDeal.amount = Number(faker.finance.amount());
    newDeal.archived = true;
    newDeal.company = companyOptions[Math.floor(Math.random()*10)];

  }
  Company.find({}).exec()
    .then((companies) => {
      companyOptions = companies;
      for (let i = 0; i < 10; i++) {
        let deal = {};
        deal.name = faker.fake("{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}");
        deal.amount = Number(faker.finance.amount());
        deal.createdAt = faker.date.recent();
        deal.stageLastUpdatedAt = faker.date.between(deal.createdAt, new Date());
        deal.expectedCloseDate = faker.date.future();
        deal.archived = false;
        deal.stage = stageOptions[Math.floor(Math.random()*5)];
        deal.company = companyOptions[Math.floor(Math.random()*10)];
        deals.push(deal);
      }
    }); 
}

// generateArchivedDeals();

// module.exports = deals;