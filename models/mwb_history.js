/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mwb_history', {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    ***REMOVED***,
    date: {
      type: DataTypes.DATE,
      allowNull: false
    ***REMOVED***,
    pupilId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    ***REMOVED***,
    lessonId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    ***REMOVED***,
    metaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    ***REMOVED***
  ***REMOVED***, {
    tableName: 'mwb_history'
  ***REMOVED***);
***REMOVED***;
