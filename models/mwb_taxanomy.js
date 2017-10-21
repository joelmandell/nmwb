/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_taxanomy', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    ***REMOVED***,
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    ***REMOVED***,
    participant: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    ***REMOVED***
  ***REMOVED***, {
    tableName: 'mwb_taxanomy'
  ***REMOVED***);
***REMOVED***;
