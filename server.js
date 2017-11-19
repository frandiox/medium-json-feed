const http = require('http');
const mediumJSONFeed = require('./index.js');

const port = process.env.PORT || 3000;
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': process.env.ORIGIN || '*'
};

http.createServer((req, res) => {
  if (req.method !== 'GET' || ['/robots.txt', '/favicon.ico'].indexOf(req.url) !== -1) {
    res.writeHead(204);
    return res.end();
  }

  console.log(`> GET: '${req.url}' --- ${new Date()}`);

  mediumJSONFeed(req.url, data => {
    res.writeHead(data.status || 500, headers);
    res.end(JSON.stringify(data, null, 2), 'utf-8');
  });

}).listen(port);

console.info('>>> Server listening on port', port, '\n');
