import mongoose from 'mongoose';

const TranscriptLogSchema = new mongoose.Schema({
  userId: String,
  engine: { type: String, enum: ['azure', 'whisper'] },
  queryText: String,
  intent: String,
  entities: Object,
  matchedReceipts: Number,
  durationMs: Number
}, { timestamps: true });

export default mongoose.model('TranscriptLog', TranscriptLogSchema);
