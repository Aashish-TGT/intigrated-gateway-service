# 🧩 Template Management Service

A microservice to manage custom receipt templates with dynamic fields, white-label branding, and secure rendering — built using **Node.js + EJS**.

---

## 🚀 Features

- 📤 Upload custom `.ejs` HTML templates
- 🔍 Render with dynamic data (preview support)
- ⚙️ Secure sandboxed rendering using `sanitize-html`
- 🧾 White-label and POS region-based localization support
- 🌐 REST API with Postman-friendly endpoints

---

## 🛠 Tech Stack

- Node.js
- Express.js
- EJS (HTML Template Engine)
- Multer (for file uploads)
- Morgan (request logger)
- Sanitize-HTML (sandboxing)

---

## 📁 Folder Structure


template-management-service/
├── controllers/
├── routes/
├── templates/
├── uploads/
├── utils/
├── views/
├── server.js
├── package.json
└── .gitignore

# 🧩 API Endpoints

---

### ✅ POST `/templates/upload`

Upload a new EJS/HTML template file to the server.

```form-data
Key:    template
Type:   File
Value:  sampleReceipt.ejs



GET /templates/list
Returns a list of all uploaded template files.

🧾 Example Response:

{
  "templates": [
    "1721058800123-sampleReceipt.ejs",
    "1721060002345-brandReceipt.ejs"
  ]
}
✅ GET /templates/preview/:filename
Render the receipt with sample dynamic data.

🌐 Example:
http://localhost:3000/templates/preview/1721058800123-sampleReceipt.ejs

🖥️ Renders the file using EJS with:

customerName, orderId, amount, region, date

Embedded values and white-label support



📃 License
This project is licensed under the MIT License – free to use, modify, and distribute.



✍️ Author
Minakshi Saini



## 🚀 How to Use

1. Save the above content as `README.md` in your root folder.
2. Then run the following commands:

```bash
git add README.md
git commit -m "Added compact README with template API docs"
git push
