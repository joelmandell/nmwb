/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_pupils', {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    ***REMOVED***,
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false
    ***REMOVED***,
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false
    ***REMOVED***,
    conducting: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    ***REMOVED***,
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    ***REMOVED***
  ***REMOVED***, {
    tableName: 'mwb_pupils',
    timestamps:false
  ***REMOVED***);
***REMOVED***;
