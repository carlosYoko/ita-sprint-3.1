import * as http from 'http';
import * as fs from 'fs';

const filtePath = process.argv[3];
const PORT = process.argv[2];

export function fileServer(port: string, path: string) {
  const server = http.createServer((req, res) => {
    const fileStream = fs.createReadStream(path);

    fileStream.pipe(res);
  });

  server.listen(port);
  return server;
}

if (process.env.SHOW_LOG !== 'false') {
  fileServer(PORT, filtePath);
}
