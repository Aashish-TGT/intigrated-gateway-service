const Template = require('../models/Template');

exports.getRandomTemplates = async () => {
  const activeTemplates = await Template.find({ active: true });
  if (activeTemplates.length < 2) throw new Error("Not enough templates");
  const shuffled = activeTemplates.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};
