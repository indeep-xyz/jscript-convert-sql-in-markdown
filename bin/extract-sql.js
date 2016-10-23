// - - - - - - - - - - - - - - - - - - - - - -
// options

var options = {
};

// - - - - - - - - - - - - - - - - - - - - - -
// main

var fileList = FileObject.createObjects();

for (var i = 0; i < fileList.length; i++) {
  var file = fileList[i];
  var sqlObject = new SqlObject(file.text);

  if (sqlObject.hasSql) {
    file.write(file.path + '.sql', sqlObject.sql);
  }
}
