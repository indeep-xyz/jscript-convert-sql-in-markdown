/**
 * A class to manage sql scripts.
 *
 * @class
 * @constructor
 * @param  {string} source - Text in Markdown style which inclues SQL statement
 */
var SqlObject = function(source){
  this.source = source;
  this.initSql();
};

/**
 * Initialize fields for SQL.
 *
 * @public
 * @method
 */
SqlObject.prototype.initSql = function() {
  this.sql = this.extractFromMarkdown(this.source);
  this.hasSql = (this.sql) ? true : false;
};

/**
 * Trim white spaces from text.
 *
 * @public
 * @method
 * @param  {string} text - Text
 * @return {string} Return the argument which be trimmed white spaces
 */
SqlObject.prototype.trim = function(text) {
  return text.replace(/^([\n\r\s　]+)?([\s\S]+)([\n\r\s　]+)?$/m, '$2');
};
