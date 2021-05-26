const mongoose = require('mongoose');
const router = require('express').Router();
const Company = require('../models/company');
const companies = require('../dev-data/companies');
const Deal = require('../models/deal');
const deals = require('../dev-data/deals');

router.get('/companies', (req, res) => {
  const perPage = 5;
  const page = req.query.page || 1;
  const query = {};

  const countPromise = Company.find(query).countDocuments().exec();

  const resultPromise = Company.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate({ path: 'deals' })
    .exec();

  Promise.all([countPromise, resultPromise])
    .then((resultsWithCount) => {
      const [totalResultsCount, companies] = resultsWithCount;
      const results = { companies, totalResultsCount };
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

router.post('/companies', (req, res) => {
  if (!req.body.name) {
    res.status(400).send('Name field is required');
  }

  const newCompany = new Company(req.body);
  newCompany.deals = [];
  newCompany.createdAt = new Date();
  newCompany
    .save()
    .then((savedCompany) => {
      res.send(savedCompany);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

router.get('/companies/:id', (req, res) => {
  Company.findById(req.params.id)
    .populate({ path: 'deals' })
    .exec((err, company) => {
      if (err) console.log(err);

      if (!company) {
        res.status(404).send('No Company Found with that Id');
      }
      res.send(company);
    });
});

router.put('/companies/:id', (req, res) => {
  Company.findById(req.params.id)
    .exec()
    .then((company) => {
      if (!company) {
        res.status(404).send('No Company Found with that Id');
      }
      for (prop in req.body) {
        company[prop] = req.body[prop];
      }
      return company.save();
    })
    .then((updatedCompany) => {
      res.send(updatedCompany);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.delete('/companies/:id', (req, res) => {
  Company.findByIdAndDelete(req.params.id).exec((err, deletedCompany) => {
    if (!deletedCompany) {
      return res.status(404).send('No company with that Id found');
    }
    if (err) {
      console.error(err);
    }
    res.send(`${deletedCompany.name} successfully deleted`);
  });
});

router.get('/generate-company-dev-data', (req, res) => {
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

module.exports = router;

router.get('/generate-company-dev-data', (req, res) => {
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

module.exports = router;
