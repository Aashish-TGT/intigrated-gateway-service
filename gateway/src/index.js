import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

for (let i = 1; i <= 43; i++) {
  app.use(`/service${i}`, createProxyMiddleware({
    target: `http://service${i}:5000`,
    changeOrigin: true,
    pathRewrite: { [`^/service${i}`]: "" }
  }));
}

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
