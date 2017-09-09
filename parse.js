function parse(string) {
  var str_arr = string.split("\n");
  var out = "";
  for (var str in str_arr) {
    if (str_arr[str].indexOf("<") == -1) {
      out += str_arr[str];
    } else if (str_arr[str].indexOf("<") > 1) {
      var tokens = str_arr[str].split(new RegExp("<|>", "g"));
      for (var j in tokens) {
        if (tokens[j].indexOf("br") > -1) {
          out += "\n";
        } else if (j % 2 == 0 && j != 0) {
          out += tokens[j];
        }
      }
    }
  }
  return out;
}
