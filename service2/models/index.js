const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// DB connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// Models
const AdminModel = require("./admin.model")(sequelize, DataTypes);
const ClientModel = require("./client.model")(sequelize, DataTypes);
const LogModel = require("./log.model")(sequelize, DataTypes);
const TransactionModel = require("./transaction.model")(sequelize, DataTypes);
const ErrorModel = require("./error.model")(sequelize, DataTypes); // ✅ Error model

// Export DB object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Admin = AdminModel;
db.Client = ClientModel;
db.Log = LogModel;
db.Transaction = TransactionModel;
db.ErrorLog = ErrorModel; // ✅ Register Error model

// Associations
db.Transaction.belongsTo(db.Client, { foreignKey: "clientId" });

module.exports = db;
