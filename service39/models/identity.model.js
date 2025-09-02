export default (sequelize, DataTypes) => {
  return sequelize.define('Identity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    receiptId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Receipt ID cannot be empty' }
      }
    },
    identityType: {
      type: DataTypes.ENUM('email', 'phone', 'aadhaar', 'passport', 'pan', 'other'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['email', 'phone', 'aadhaar', 'passport', 'pan', 'other']],
          msg: 'Invalid identity type'
        }
      }
    },
    identityValue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Identity value cannot be empty' }
      }
    }
  }, {
    tableName: 'identities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};
