exports.signupPartner = (req, res) => {
  res.json({ message: 'Partner signed up successfully' });
};

exports.getDashboard = (req, res) => {
  res.json({ dashboard: 'This is partner dashboard' });
};

exports.getCommissionReport = (req, res) => {
  res.json([
    { partner: 'Rajdeep', commission: 1000 },
    { partner: 'Alpha Reseller', commission: 1500 }
  ]);
};

exports.clientSignup = (req, res) => {
  res.json({ message: 'Client signed up via partner link' });
};
// GET /partner/all
router.get('/all', async (req, res) => {
  const partners = await Partner.find({}, 'partnerId name email');
  res.json(partners);
});
