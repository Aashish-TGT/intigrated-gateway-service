# 🧾 MS30 – Migration & Import Service

This microservice helps clients import their old receipt data (CSV, XML, etc.) into the POS system. It parses uploaded files, maps them to the internal receipt format, and performs bulk uploads.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **Multer** (File upload)
- **Fast-XML-Parser** (XML parsing)
- **CSV-Parser** (CSV parsing)
- **MySQL / Sequelize** (Optional for DB storage)

---

## 🚀 Features

- Upload old receipt files (CSV, XML)
- Parse and validate data
- Convert data to internal format
- Bulk insert into system
- Report of successes & failures

---

## 📁 File Structure

MS30-MIGRATION-SERVICES/
├── controllers/
│ ├── import.controller.js
│ └── upload.controller.js
├── routes/
│ ├── import.routes.js
│ └── upload.route.js
├── utils/
│ └── parser.js
├── uploads/
│ └── [Uploaded files temporarily saved here]
├── sample-receipt.xml
├── app.js
├── package.json
├── package-lock.json
└── README.md

---

## 🔗 API Endpoints

### 1. `POST /upload`

**Description:** Upload a CSV or XML file for import.

- **Form Field Name:** `file`
- **File Types Supported:** `.csv`, `.xml`

**Response:**
```json
{
  "successCount": 10,
  "failedCount": 2,
  "errors": [
    { "row": 5, "reason": "Missing receipt ID" }
  ]
}

2. GET /import/status
Description: Get import history or status (optional).

🧪 Postman Testing Steps
Open Postman

Select POST /upload endpoint

Under Body > form-data, set:

key = file, type = File, and choose a .csv or .xml file

Send request

Check parsed response and import result

⚠️ Known Errors & Fixes
parser.validate is not a function: Ensure correct usage of fast-xml-parser. Use:

const parser = new XMLParser();
const result = parser.parse(xmlData);


📄 Sample XML Format
<receipts>
  <receipt>
    <id>123</id>
    <date>2024-10-01</date>
    <amount>999.99</amount>
    <clientId>abc123</clientId>
  </receipt>
</receipts>


📄 Sample CSV Format
id,date,amount,clientId
123,2024-10-01,999.99,abc123
124,2024-10-02,499.50,xyz456


📜 License
MIT License
© 2025 Aashish Dev

Developer – Aashish
MS30 Microservice
intern in Tgt's
