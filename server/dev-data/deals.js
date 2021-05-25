const Company = require("../models/company");
const mongoose = require("mongoose");
const faker = require("faker");
const Deal = require("../models/deal");



// const DealSchema = new Schema({
//   name: { type: String, required: true },
//   // Update owner when we get to users extension
//   owner: String,
//   amount: {type: Number, required: true },
//   company: {type: Schema.Types.ObjectId, ref: "Company", required: true},
//   stage: {type: String, required: true},
//   createdAt: { type: Date, required: true },
//   expectedCloseDate: {type: Date, required: true},
//   stageLastUpdatedAt: {type: Date, required: true},
//   isActive: Boolean
// });

{/* <option>Initiated</option>
<option>Qualified</option>
<option>Contract Sent</option>
<option>Closed Won</option>
<option>Closed Lost</option> */}
const deals = [];
const generateDeals = () => {
  const stageOptions = ["Initiated", "Qualified", "Contract Sent", "Closed Won", "Closed Lost"];
  let companyOptions = [];
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
        deal.isActive = true;
        deal.stage = stageOptions[Math.floor(Math.random()*5)];
        deal.company = companyOptions[Math.floor(Math.random()*10)];
        deals.push(deal);
      }
    }); 
}

generateDeals();

module.exports = deals;