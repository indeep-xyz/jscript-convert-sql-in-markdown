/**
 * A class to read text files.
 *
 * @class
 * @constructor
 * @param {Array<string>} [pathList] Array including paths of files
 */
var FileReader = function(pathList){

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in the constructor of FileReader

  /**
   * Extract existent file paths from Array.
   *
   * @private
   * @method
   * @param  {Array<string>} listSource - Array incluidng string for file paths
   * @return {Array<string>} Return files paths
   */
  function extractFilePath(listSource) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var list = [];

    for (var i = 0; i < listSource.length; i++) {
      var path = listSource[i];

      if (fso.FileExists(path)) {
        list.push(path);
      }
    }

    return list;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // main - in the constructor of FileReader

  pathList = pathList || FileReader.defaultPathList;
  this.pathList = extractFilePath(pathList);
};

/**
 * @public
 * @static
 * @var {Array<string>} Array including path for files
 */
FileReader.defaultPathList = (function(){
  var list = [];
  var args = WScript.Arguments;

  for (var i = 0; i < args.length; i++) {
    list.push(args(i));
  }

  return list;
})();

/**
 * Get a directory path of file list in an instance.
 *
 * @public
 * @method
 * @param  {number} index - The index of file list in an instance
 * @return {string} Return a directory path
 */
FileReader.prototype.getDirPath = function(index) {
  index = (typeof index === 'number') ? index : 0;
  path = this.pathList[index];

  return path.replace(/[\\\/][^\\\/]+$/, '');
};

/**
 * Read text from a file.
 *
 * @public
 * @method
 * @param  {number} index - The index of file list in an instance
 * @return {string} Text from a path in an instance
 */
FileReader.prototype.readFile = function(index) {
  index = index || 0;

  var fso = new ActiveXObject('Scripting.FileSystemObject');
  var tf = fso.OpenTextFile(this.pathList[index]);

  return tf.readAll();
};

/**
 * Read text from files.
 *
 * @public
 * @method
 * @return {Array<string>} Text from files at this.pathList all
 */
FileReader.prototype.readFiles = function() {
  var dataList = [];

  for (var i = 0; i < this.pathList.length; i++) {
    dataList.push(this.readFile(i));
  }

  return dataList;
};
