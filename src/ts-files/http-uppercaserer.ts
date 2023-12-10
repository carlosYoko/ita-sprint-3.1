import * as http from 'http';

const PORT = process.argv[2];

export function uppercaserer(port: string) {
  const server = http.createServer((req, res) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk.toString('utf-8');
    });

    req.on('end', () => {
      const dataUpperCasered = data.toUpperCase();
      res.end(dataUpperCasered);
    });
  });

  server.listen(port);
  return server;
}

if (process.env.SHOW_LOG !== 'false') {
  uppercaserer(PORT);
}
