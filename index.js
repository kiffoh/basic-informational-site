var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var pathname = q.pathname;

  // If the request is to the root, serve the index.html file
  if (pathname === '/') {
    pathname = '/index.html';
  }
  // Append .html to the pathname if it doesn't have an extension
  else if (path.extname(pathname) === '') {
    pathname += '.html';
  }

  var filename = "." + pathname;

  // Normalize the path to prevent directory traversal attacks
  filename = path.normalize(filename);
  try {
    var data = fs.readFileSync(filename);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();;
  } catch (err) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    var errorPage = fs.readFileSync('./404.html');
    res.write(errorPage);
  }
   return res.end()
}).listen(8080);