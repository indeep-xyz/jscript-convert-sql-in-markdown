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
 * Get a stream object to read files.
 *
 * @return {ActiveXObject} The object of ADODB.Stream
 */
FileObject.prototype.getStream = function() {
  var stream = new ActiveXObject("ADODB.Stream");
  stream.Type = 2; // text
  stream.Charset = 'UTF-8';

  return stream;
};

/**
 * Close a stream object.
 *
 * @param {ActiveXObject} stream - The object of ADODB.Stream
 */
FileObject.prototype.closeStream = function(stream) {
  try {
    stream.Close();
  }
  catch(e) {
  }
};

/**
 * Read text from a file.
 *
 * @public
 * @method
 * @return {string} Text from a path in an instance
 */
FileObject.prototype.read = function() {
  var temp = null;
  var stream;

  try {
    stream = this.getStream();
    stream.Open();
    stream.LoadFromFile(this.path);

    // Read all
    temp = stream.ReadText(-1);
  }
  finally {
    this.closeStream(stream);
  }

  this.text = temp;
  return this.text;
};
