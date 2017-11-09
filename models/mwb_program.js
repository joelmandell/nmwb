/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_program', {
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
    readingId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    firstVisitId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    returnVisitId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    bibleStudyId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    helperFirstId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    helperReturnId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    helperBibleId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    readingLesson: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    firstVisitLesson: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    returnVisitLesson: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    bibleStudyLesson: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    }
  }, {
    tableName: 'mwb_program'
  });
};
