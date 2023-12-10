import * as http from 'http';
import * as url from 'url';

export function jsonApiServer(PORT: string) {
  const server = http.createServer((req, res) => {
    const route = url.parse(req.url!, true);
    const date = new Date(String(route.query.iso));
    let response = null;

    if (route.pathname === '/api/parsetime') {
      response = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      };
    }

    if (route.pathname === '/api/unixtime') {
      response = {
        unixtime: date.getTime(),
      };
    }

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  server.listen(PORT);

  return server;
}

const PORT = process.argv[2];
if (process.env.SHOW_LOG !== 'false') {
  jsonApiServer(PORT);
}
