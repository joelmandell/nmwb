/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_meta', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    ***REMOVED***,
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    ***REMOVED***
  ***REMOVED***, {
    tableName: 'mwb_meta'
  ***REMOVED***);
***REMOVED***;
