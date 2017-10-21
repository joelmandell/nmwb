/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_program', {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    ***REMOVED***,
    year: {
      type: "YEAR(4)",
      allowNull: false
    ***REMOVED***,
    week: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    ***REMOVED***,
    readingId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    firstVisitId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    returnVisitId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    bibleStudyId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    helperFirstId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    helperReturnId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    helperBibleId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    readingLesson: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    firstVisitLesson: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    returnVisitLesson: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    bibleStudyLesson: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***
  ***REMOVED***, {
    tableName: 'mwb_program'
  ***REMOVED***);
***REMOVED***;
