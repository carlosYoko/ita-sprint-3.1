import * as net from 'net';

const date = new Date();

const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const formatedHour = `${year}-${month}-${day} ${hours}:${minutes}`;

export function timeServer(port: string) {
  const server = net.createServer((socket) => {
    socket.write(`${formatedHour}\n`, () => {
      socket.end();
    });
  });

  server.listen(port);
  return server;
}

const port = process.argv[2];
if (process.env.SHOW_LOG !== 'false') {
  timeServer(port);
}
