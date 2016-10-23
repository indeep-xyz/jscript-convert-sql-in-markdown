/**
 * Create an array including instances of FileObject.
 *
 * @public
 * @static
 * @method
 * @param  {Array<string>} pathList - Array including paths of files
 * @return {Array<FileObject>} Return instances of FileObject
 */
FileObject.createObjects = function(pathList){

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // private functions - in FileObject.createObjects

  /**
   * Get path list from the command arguments.
   *
   * @private
   * @method
   * @return {Array<string>} Array including path for files
   */
  function getDefaultPathList() {
    var list = [];
    var args = WScript.Arguments;

    for (var i = 0; i < args.length; i++) {
      list.push(args(i));
    }

    return list;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // main - in FileObject.createObjects

  var files = [];
  pathList = pathList || getDefaultPathList();

  for (var i = 0; i < pathList.length; i++) {
    var fileObject = new FileObject(pathList[i]);

    if (fileObject.isFile()) {
      files.push(fileObject);
    }
  }

  return files;
};
