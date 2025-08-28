# 📄 File Optimization Service

A lightweight Node.js microservice to **compress and optimize PDF files** using Ghostscript.

## 🚀 Features
- Upload and compress PDFs
- Ghostscript integration
- Returns optimized PDF

## 📦 Tech Stack
- Node.js
- Express
- Multer
- Ghostscript

## 📂 Folder Structure

file-optimization-service/
├── app.js # Main entry point of the Express app
├── README.md # Project documentation (this file)
├── LICENSE # Open-source license (MIT)
├── .gitignore # Files/folders to ignore in Git (e.g. node_modules)
│
├── controllers/ # Route logic handlers
│ └── optimizeController.js # Logic for compressing PDF using Ghostscript
│
├── middleware/ # Custom Express middlewares
│ └── upload.js # Multer config for handling PDF file uploads
│
├── routes/ # Route definitions
│ └── optimizeRoutes.js # Defines /api/optimize endpoint
│
├── utils/ # Helper functions/utilities
│ └── ghostscript.js # Logic to run Ghostscript compression via child_process
│
├── uploads/ # 📥 Uploaded raw PDF files (ignored in Git)
├── optimized/ # 📤 Compressed PDF output files (ignored in Git)
└── node_modules/ # Installed dependencies (ignored in Git)


## ⚙️ How to Run
```bash
npm install
node app.js
📮 API Endpoint
POST /api/optimize

Form-data key: pdf

👤 Developer Name
    Manish Kumari-TGT