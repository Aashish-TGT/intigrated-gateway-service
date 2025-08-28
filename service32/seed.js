const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Receipt = require('./models/Receipt'); // Make sure this file exists

const receipts = [
  { businessId: 'bookstore123', receiptType: 'digital', date: new Date() },
  { businessId: 'bookstore123', receiptType: 'digital', date: new Date() },
  { businessId: 'bookstore123', receiptType: 'paper', date: new Date() }
];

// ✅ Make sure .env has MONGO_URI defined
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  try {
    await Receipt.deleteMany({});
    await Receipt.insertMany(receipts);
    console.log('📦 Database seeded ✔️');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    mongoose.disconnect();
  }
}).catch(err => {
  console.error('❌ Error connecting to DB:', err);
});
