module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domain if needed
  },
  webpack: (config) => {
    // Custom webpack configurations can be added here
    return config;
  },
};