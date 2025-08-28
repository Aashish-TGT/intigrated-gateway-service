// utils/mapper.js

/**
 * Maps generic receipt data to platform-specific formats.
 */

module.exports = {
  toQuickBooksFormat: (receipt) => ({
    customer: receipt.customer,
    txnDate: receipt.date,
    lineItems: receipt.items.map(item => ({
      description: item.name,
      quantity: item.qty,
      unitPrice: item.price
    })),
    totalAmount: receipt.amount
  }),

  toZohoFormat: (receipt) => ({
    customer_name: receipt.customer,
    date: receipt.date,
    items: receipt.items.map(item => ({
      name: item.name,
      quantity: item.qty,
      rate: item.price
    })),
    amount: receipt.amount
  }),

  toTallyFormat: (receipt) => ({
    ledgerName: receipt.customer,
    voucherDate: receipt.date,
    entries: receipt.items.map(item => ({
      itemName: item.name,
      quantity: item.qty,
      rate: item.price
    })),
    total: receipt.amount
  })
};
