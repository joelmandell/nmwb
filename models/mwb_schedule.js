/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_schedule', {
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
    taxanomyId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    pupilId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    lessonId: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    ***REMOVED***,
    participant: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    ***REMOVED***
  ***REMOVED***, {
    tableName: 'mwb_schedule',
    timestamps:false
  ***REMOVED***);
***REMOVED***;
