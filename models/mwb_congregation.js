/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_congregation', {
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
    dayMidweekMeeting: {
      type: DataTypes.TEXT,
      allowNull: false
    ***REMOVED***,
    circuitWeek1: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '1'
    ***REMOVED***,
    circuitWeek2: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '2'
    ***REMOVED***,
    cAssembly1: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '3'
    ***REMOVED***,
    cAssembly2: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '4'
    ***REMOVED***,
    regionalConvention: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '5'
    ***REMOVED***,
    memorial: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '2016-03-28'
    ***REMOVED***
  ***REMOVED***, {
    tableName: 'mwb_congregation'
  ***REMOVED***);
***REMOVED***;
