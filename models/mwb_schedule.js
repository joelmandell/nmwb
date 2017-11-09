/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_schedule', {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    year: {
      type: "YEAR(4)",
      allowNull: false
    },
    week: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    taxanomyId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    pupilId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    lessonId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    participant: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'mwb_schedule',
    timestamps:false
  });
};
