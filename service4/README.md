# 📊 Analytics & Logging Service

This is a Node.js-based microservice used in a Point of Sale (POS) system to capture logs and performance metrics. It stores structured logs in **Azure Cosmos DB** and sends event tracking data to **Azure Application Insights**. This helps monitor activities like receipt generation, scan events, and performance audits across other microservices.


## 🚀 Tech Stack

- **Backend**: Node.js + Express.js
- **Logging**: Azure Application Insights
- **Database**: Azure Cosmos DB
- **Environment Config**: dotenv for environment variables
- **Dev Tools**: nodemon for development reload



## 📁 Project Structure

analytics-service/
│
├── routes/
│ └── logRoutes.js # API route for logging events
│
├── logController.js # Controller to process and store logs
├── cosmosClient.js # Cosmos DB client config
├── insights.js # Application Insights setup
│
├── .env # Environment variables (App Insights & Cosmos)
├── app.js # Entry point of the application
├── package.json # Project metadata and dependencies
└── README.md # Project documentation (this file)

## 🔐 Environment Variables (.env)

```env
INSTRUMENTATION_KEY=your_app_insights_key
COSMOS_ENDPOINT=https://your-cosmos.documents.azure.com:443/
COSMOS_KEY=your_cosmos_key
COSMOS_DATABASE=analyticsdb
COSMOS_CONTAINER=logs
PORT=3000


# Step 1: Clone the project
```
git clone <your-repo-url>
cd analytics-service

# Step 2: Install dependencies
npm install

# Step 3: Add your .env file with required values

# Step 4: Start the service
npm run dev     # Development mode
npm start       # Production


Configure environment variables:
Create a .env file using the variables above with values from your Azure Portal.

Ensure your Cosmos DB and App Insights are already set up in Azure:

Go to Azure → Create Cosmos DB & Application Insights → Copy keys to .env

Run the app:

npm run dev     # for development (with nodemon)
npm start       # for production

📡 API Endpoint

POST /api/log
Stores an event in Cosmos DB and logs it to Application Insights.

Example Request:
```json
{
  "event": "user_signup",
  "timestamp": "2025-07-29T10:30:00Z",
  "userId": "user_abc",
  "platform": "web"
}

Success Response:
```json
{
  "message": "Log stored successfully",
  "id": "auto-generated-id"
}

🧪 Testing with Postman
✅ Endpoint Details
| Method | URL                             | Description                     |
| ------ | ------------------------------- | ------------------------------- |
| POST   | `http://localhost:3000/api/log` | Submit a log event for tracking |



✨ Features
✅ Central logging from microservices

🚀 Cosmos DB for persistent JSON-based logs

📈 Real-time telemetry to Azure App Insights

🔧 Ready for scaling/log filtering



Future Enhancements (Suggestions)
Add log filters by date/client/event type

Create log retrieval endpoints (GET)

Add email alerts for critical exceptions

Connect to Power BI dashboards for real-time insights

Store logs in cold/archival tier after 30 days

👨‍💻 Author
    Sumit Kumar
Intern @ TGT (TeraGrid Tech)



## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more info.
