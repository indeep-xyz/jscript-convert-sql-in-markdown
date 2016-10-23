/**
 * Extract SQL from Markdown text.
 *
 * @public
 * @static
 * @method
 * @param  {string} source - Text in Markdown style
 * @return {string} Return SQL text when it exists
 * @return {null} Return null when it does not exist
 */
SqlObject.prototype.extractFromMarkdown = function(source){
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in SqlObject.prototype.extractFromMarkdown

  /**
   * Get SQL text from <code> statement in Markdown text.
   *
   * @private
   * @method
   * @param  {string} source - Text in Markdown style which inclues SQL statement
   * @return {string} Return SQL text when it exists
   * @return {null} Return null when it does not exist
   */
  function fromCodeStatement(source) {
    var sql = null;
    var re = new RegExp('(```|~~~)sql(:[\\S]+)?([\\s\\S]+?)(```|~~~)', 'm');

    if (re.test(source)) {
      sql = self.trim(RegExp.$3);
    }

    return sql;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // main - in SqlObject.prototype.extractFromMarkdown

  var self = this;
  var sql = fromCodeStatement(source) ||
      null;

  return sql;
};
