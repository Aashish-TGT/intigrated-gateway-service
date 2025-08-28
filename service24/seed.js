const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Template = require('../models/Template');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const templates = [
  { name: "Template A", templateData: { color: "blue", layout: "standard" } },
  { name: "Template B", templateData: { color: "green", layout: "modern" } },
  { name: "Template C", templateData: { color: "red", layout: "classic" } }
];

async function seed() {
  try {
    await Template.deleteMany({});
    await Template.insertMany(templates);
    console.log("Seeded templates successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seed error:", err);
    mongoose.disconnect();
  }
}

seed();
