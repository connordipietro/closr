const router = require('express').Router();
const faker = require('faker');
const companyRoutes = require('./companyRoutes');
const dealRoutes = require('./dealRoutes');
const Company = require('../models/company');
const companies = require('../dev-data/companies');
const ChangeEntry = require('../models/changeEntry');
const Deal = require('../models/deal');
const dealStages = require('../dev-data/dealStages');
const generateDeals = require('../dev-data/deals');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/companies', companyRoutes);
router.use('/deals', dealRoutes);
router.use('/dashboard', dashboardRoutes);

router.get('/generate-company-dev-data', (_req, res) => {
  Company.deleteMany({})
    .exec()
    .then(
      companies.forEach((company) => {
        const newCompany = new Company(company);
        newCompany.save((err) => {
          if (err) throw err;
        });
      })
    );
  res.send('saved the fake data');
});

router.get('/generate-deals-dev-data', (_req, res) => {
  Deal.deleteMany({})
    .exec()
    .then(() => ChangeEntry.deleteMany({}).exec())
    .then(() => generateDeals(false))
    .then(() => res.send('saved the fake data'))
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

// TO-DO: Push the deal id into the deals array for its company. In order for that to work need to revise the deals dummy data file to only grab the list of companies after the saveCompaniesPromises have resolved.
router.get('/generate-dev-data', (req, res) => {
  const generateDummyData = async () => {
    const clearCollectionsPromises = [
      Company.deleteMany({}).exec(),
      Deal.deleteMany({}).exec(),
    ];
    await clearCollectionsPromises;
    const saveCompaniesPromises = companies.map((company) => {
      const newCompany = new Company(company);
      return newCompany.save();
    });
    await Promise.all(saveCompaniesPromises);
    /* 
    //ESlint giving error here becuase deals is undefined commented out for now
    const saveDealsPromises = deals.map((deal) => {
      const newDeal = new Deal(deal);
      // Company.findById(newDeal.company).exec((err, companyForDeal) => {
      //   companyForDeal.deals.push(newDeal);
      //   companyForDeal.save();
      // })
      return newDeal.save();
    });
    await Promise.all(saveDealsPromises);
    */
    res.send('saved the fake data');
  };

  generateDummyData();
});

router.get('/generate-archives', (req, res) => {
  generateDeals(true).then((dealsToArchive) => {
    dealsToArchive.forEach((deal) => {
      const dealIndex = dealStages.findIndex((stage) => stage === deal.stage);
      let currentFakeDate = new Date();
      let closedLost = false;
      if (dealIndex < 3) {
        const lostEntry = new ChangeEntry({
          user: '',
          timeStamp: faker.date.past(1, currentFakeDate),
          newValue: 'Closed Lost',
          deal: deal._id,
        });
        currentFakeDate = lostEntry.timeStamp;
        deal.stage = 'Closed Lost';
        deal.stageHistory.unshift(lostEntry);
      }
      for (let i = dealIndex; i >= 0; i -= 1) {
        if (dealIndex === 4) {
          closedLost = true;
        }
        if (closedLost === true && i === 3) {
          // consider rewriting or deleting this if statement
          // eslint-disable-next-line no-continue
          continue;
        }
        const newChangeEntry = new ChangeEntry({
          user: '',
          timeStamp: faker.date.past(1, currentFakeDate),
          newValue: dealStages[i],
          deal: deal._id,
        });
        currentFakeDate = newChangeEntry.timeStamp;
        deal.stageHistory.unshift(newChangeEntry);
      }
      deal.stageLastUpdatedAt =
        deal.stageHistory[deal.stageHistory.length - 1].timeStamp;
      deal.save();
    });
    res.send(dealsToArchive);
  });
});

module.exports = router;
