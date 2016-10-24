/**
 * A class for a file.
 *
 * @class
 * @constructor
 * @param {string} path - A path of file
 */
var FileObject = function(path){
  this.path = path;
  this.initializeForFile();
};

/**
 * Initialize file fields.
 *
 * @public
 * @method
 */
FileObject.prototype.initializeForFile = function() {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // main - in FileObject.prototype.initializeForFile

  /**
   * Get the directory path of a file path.
   *
   * @private
   * @method
   * @return {string} A directory path
   */
  function getDirPath(filePath) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    return fso.GetParentFolderName(filePath);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // main - in FileObject.prototype.initializeForFile

  if (this.isFile()) {
    this.dirPath = getDirPath(this.path);
    this.text = this.read(this.path);
  }
  else {
    this.dirPath = this.path;
    this.text = null;
  }
};

/**
 * Check whether the path of an instance is for file or not.
 *
 * @public
 * @static
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
 * @public
 * @static
 * @method
 * @return {ActiveXObject} The object of ADODB.Stream
 */
FileObject.getStream = function() {
  var stream = new ActiveXObject("ADODB.Stream");
  stream.Type = 2; // text
  stream.Charset = 'UTF-8';

  return stream;
};

/**
 * Close a stream object.
 *
 * @public
 * @static
 * @method
 * @param {ActiveXObject} stream - The object of ADODB.Stream
 */
FileObject.closeStream = function(stream) {
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
 * @static
 * @method
 * @return {string} Text from a path in an instance
 */
FileObject.read = function(path) {
  var temp = null;
  var stream;

  try {
    stream = FileObject.getStream();
    stream.Open();
    stream.LoadFromFile(path);

    // Read all
    temp = stream.ReadText(-1);
  }
  finally {
    FileObject.closeStream(stream);
  }

  return temp;
};

/**
 * Read text from a file.
 *
 * @public
 * @method
 * @return {string} Text from a path in an instance
 */
FileObject.prototype.read = function() {
  var temp = FileObject.read(this.path);

  this.text = temp;
  return this.text;
};

/**
 * Write a text file.
 *
 * @public
 * @static
 * @method
 * @param {string} path - A path of file
 * @param {string} text - Text for writing
 */
FileObject.write = function(path, text) {
  var stream;

  try {
    stream = FileObject.getStream();
    stream.Open();

    // Write with break line
    stream.WriteText(text, 1);

    // Overwrite
    stream.SaveToFile(path, 2);
  }
  finally {
    FileObject.closeStream(stream);
  }
};

/**
 * Write a text file.
 *
 * @public
 * @method
 * @param {string} path - A path of file
 * @param {string} text - Text for writing
 */
FileObject.prototype.write = function(path, text) {
  FileObject.write(path, text);
};
