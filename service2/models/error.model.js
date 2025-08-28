module.exports = (sequelize, DataTypes) => {
  const ErrorLog = sequelize.define("ErrorLog", {
    source: {
      type: DataTypes.STRING, // e.g., "API", "RECEIPT", "DATABASE"
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stack: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return ErrorLog;
};
