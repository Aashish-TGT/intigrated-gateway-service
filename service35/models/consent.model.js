// models/consent.model.js
export default (sequelize, DataTypes) => {
  const Consent = sequelize.define(
    'Consent',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generates UUID automatically
        primaryKey: true,
      },
      receiptId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Receipt ID cannot be empty' },
          len: { args: [1, 100], msg: 'Receipt ID must be between 1-100 characters' },
        },
      },
      identityValue: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Identity value cannot be empty' },
        },
      },
      purpose: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Purpose cannot be empty' },
        },
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'consents',
      timestamps: true, // Adds createdAt & updatedAt
      indexes: [
        { fields: ['receiptId'] },
        { fields: ['identityValue'] },
      ],
      underscored: true, // DB columns will be snake_case
    }
  );

  return Consent;
};
