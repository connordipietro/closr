/* 
const faker = require('faker');
const Company = require('../models/company');
const Deal = require('../models/deal');
const stageOptions = require('./dealStages');

const generateArchivedDeals = async () => {
  let companyOptions = await Company.find({}).exec();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i += 1) {
    const newDeal = new Deal();
    newDeal.name = faker.fake(
      '{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}'
    );
    newDeal.amount = Number(faker.finance.amount());
    newDeal.archived = true;
    newDeal.company = companyOptions[Math.floor(Math.random() * 10)];
  }
  Company.find({})
    .exec()
    .then((companies) => {
      companyOptions = companies;
      for (let i = 0; i < 10; i += 1) {
        const deal = {};
        deal.name = faker.fake(
          '{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}'
        );
        deal.amount = Number(faker.finance.amount());
        deal.createdAt = faker.date.recent();
        deal.stageLastUpdatedAt = faker.date.between(
          deal.createdAt,
          new Date()
        );
        deal.expectedCloseDate = faker.date.future();
        deal.archived = false;
        deal.stage = stageOptions[Math.floor(Math.random() * 5)];
        deal.company = companyOptions[Math.floor(Math.random() * 10)];
        deals.push(deal);
      }
    });
};

generateArchivedDeals();

module.exports = deals; 
*/
