/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_taxanomy', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    participant: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'mwb_taxanomy',
    timestamps:false
  });
};
