/**
 * A class for a file.
 *
 * @class
 * @constructor
 * @param {string} path - A path of file
 */
var FileObject = function(path){
  this.path = path;
  this.text = (this.isFile()) ? this.read(path) : null;
};

/**
 * Check whether the path of an instance is for file or not.
 *
 * @public
 * @method
 * @return {Boolean} Return true when the path is for file
 */
FileObject.prototype.isFile = function() {
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  return fso.FileExists(this.path);
};

/**
 * Read text from a file.
 *
 * @public
 * @method
 * @return {string} Text from a path in an instance
 */
FileObject.prototype.read = function() {
  var fso = new ActiveXObject('Scripting.FileSystemObject');
  var tf = fso.OpenTextFile(this.path);
  this.text = tf.readAll();

  return this.text;
};
