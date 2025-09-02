module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define("Log", {
    type: {
      type: DataTypes.STRING, // info, warning, error
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING, // API, receipt-service, etc
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Log;
};
