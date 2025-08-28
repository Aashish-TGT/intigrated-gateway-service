// Creates a tenantId using business name + random number
const generateTenantId = (name) => {
  return `tenant_${name.toLowerCase().replace(/\s+/g, '_')}_${Math.floor(1000 + Math.random() * 9000)}`;
};

module.exports = generateTenantId;