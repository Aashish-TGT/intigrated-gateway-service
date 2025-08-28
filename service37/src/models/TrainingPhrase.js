import mongoose from 'mongoose';

const TrainingPhrase = new mongoose.Schema({
  userId: String,
  phrase: { type: String, required: true },
  intent: { type: String, enum: ['SEARCH_RECEIPT','READ_SUMMARY','HELP'], required: true },
  hints: [String]
}, { timestamps: true });

export default mongoose.model('TrainingPhrase', TrainingPhrase);
