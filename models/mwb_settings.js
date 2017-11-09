/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_settings', {
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
    dayMidweekMeeting: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    circuitWeek1: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '1'
    },
    circuitWeek2: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '2'
    },
    cAssembly1: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '3'
    },
    cAssembly2: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '4'
    },
    regionalConvention: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '5'
    },
    memorial: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '2016-03-28'
    }
  }, {
    tableName: 'mwb_settings',
    timestamps:false
  });
};
