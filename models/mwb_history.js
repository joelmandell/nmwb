/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_history', {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pupilId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lessonId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    metaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'mwb_history'
  });
};
