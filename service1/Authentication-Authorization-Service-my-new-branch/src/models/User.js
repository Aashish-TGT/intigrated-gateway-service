import mongoose from 'mongoose';
import { DEFAULT_ROLE, ROLES } from '../config/roles.js';

const RefreshTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    jti: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String }, // not required in Azure B2C mode
    name: { type: String },
    roles: { type: [String], enum: Object.values(ROLES), default: [DEFAULT_ROLE] },
    refreshTokens: { type: [RefreshTokenSchema], default: [] },
    provider: { type: String, enum: ['local', 'azure-b2c'], default: 'local' }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
