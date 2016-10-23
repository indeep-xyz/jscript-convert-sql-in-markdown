// - - - - - - - - - - - - - - - - - - - - - -
// options

var options = {
};

// - - - - - - - - - - - - - - - - - - - - - -
// main

var fileList = FileObject.createObjects();
var sqlCount = 0;

for (var i = 0; i < fileList.length; i++) {
  var file = fileList[i];
  var sqlObject = new SqlObject(file.text);

  if (sqlObject.hasSql) {
    sqlCount++;
    file.write(file.path + '.sql', sqlObject.sql);
  }
}

if (sqlCount < 1) {
  WScript.Echo(
      'Did not find SQL statement');
  WScript.Quit(1);
}
