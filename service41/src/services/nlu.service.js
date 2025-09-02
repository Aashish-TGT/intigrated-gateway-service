function parseQuery(queryText) {
  const conditions = {};

  // Example: detect store name
  if (queryText.toLowerCase().includes("coffee")) {
    conditions.store = "Coffee Shop";
  }

  // Example: detect month
  if (queryText.toLowerCase().includes("may")) {
    conditions.month = 5;
  }

  return conditions;
}

module.exports = { parseQuery };
