# 🧾 Receipt Add-on Offer Engine

A smart microservice that dynamically attaches promotional offers (coupons, banners, CTAs) to receipts based on time, location, and merchant. Perfect for improving customer engagement and marketing personalization.

---

## 🚀 Key Features

- 🕐 **Time-based offers** – Show offers within specific date/time range
- 🌍 **Location-aware** – Deliver offers based on user's location
- 🛍️ **Merchant customization** – Attach per-merchant offers to receipts
- 👀 **Offer display on receipt** – Rendered via EJS templates
- 🖱️ **Click tracking** – Log offer clicks and redirect to CTA URLs


## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **EJS** – Template engine for rendering receipts with offers
- **Postman** – API testing
- **JavaScript (ES6+)**


## 📁 Folder Structure

receipt-offer-engine/
├── controllers/ # Business logic for offers
│ └── offerController.js
├── models/ # Mongoose schema for Offer
│ └── offerModel.js
├── routes/ # Express route handlers
│ └── offerRoutes.js
├── views/ # EJS template for receipt view
│ └── receipt.ejs
├── app.js # Entry point
├── package.json
├── .gitignore
├── .env # MongoDB URI and environment configs
└── README.md # This file



## 🔌 API Endpoints

### ✅ `POST /offer/attach`
Attach a new offer to a receipt.

```json
{
  "receiptId": "RCP1005",
  "merchantId": "MYSHOP",
  "location": "Delhi",
  "showTimeRange": {
    "start": "2025-07-16T09:00:00Z",
    "end": "2025-07-31T23:59:59Z"
  },
  "bannerText": "🔥 Flat ₹200 OFF! Only Today!",
  "ctaLink": "https://www.flipkart.com/offers-store"
}

✅ GET /offer/:receiptId
Render the receipt page and display offer if valid.

Example: http://localhost:3000/offer/RCP1005

Rendered via EJS with offer banner and "Claim Offer" button


✅ POST /offer/click/:receiptId
Tracks click on "Claim Offer" button and redirects user to offer CTA link.


📄 License
This project is licensed under the MIT License – free to use, modify, and distribute.


✨ Author
Manish Kumari
