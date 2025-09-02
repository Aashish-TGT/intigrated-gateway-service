import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/authdb',
  jwt: {
    issuer: process.env.JWT_ISSUER || 'auth-service',
    audience: process.env.JWT_AUDIENCE || 'auth-clients',
    accessTtlSec: Number(process.env.ACCESS_TTL_SEC || 900), // 15m
    refreshTtlSec: Number(process.env.REFRESH_TTL_SEC || 604800), // 7d
    secret: process.env.JWT_SECRET || 'dev-insecure-secret',
    algorithm: process.env.JWT_ALG || 'HS256'
  },
  azureB2C: {
    enabled: process.env.ENABLE_AZURE_B2C === 'true',
    tenant: process.env.AZURE_B2C_TENANT, // e.g., yourtenant.onmicrosoft.com
    policy: process.env.AZURE_B2C_POLICY, // e.g., B2C_1_signupsignin
    clientId: process.env.AZURE_B2C_CLIENT_ID,
    jwksUri: process.env.AZURE_B2C_JWKS_URI // optional override
  },
  corsOrigin: (process.env.CORS_ORIGIN || '*').split(',')
};

export default config;
