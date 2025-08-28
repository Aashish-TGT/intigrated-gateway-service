const express = require('express');
const router = express.Router();

const {
  signupPartner,
  getDashboard,
  getCommissionReport,
  clientSignup
} = require('../controllers/partnerController');
router.post('/signup', signupPartner);
router.get('/dashboard', getDashboard);
router.get('/commission-report', getCommissionReport);
router.post('/client/signup', clientSignup);

module.exports = router;

