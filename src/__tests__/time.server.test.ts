import * as net from 'net';
import { timeServer } from '../ts-files/time-server';

const date = new Date();

const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const formattedHour = `${year}-${month}-${day} ${hours}:${minutes}`;

describe('Pruebas de la función timeServer', () => {
  it('debería enviar la hora en el formato correcto a través del método write()', async () => {
    const port = '3000';
    const server = timeServer(port);

    const client = new net.Socket();
    let receivedData = '';

    await new Promise<void>((res) => {
      client.connect(parseInt(port, 10), '127.0.0.1', () => {
        client.on('data', (data) => {
          receivedData += data.toString();
        });

        client.on('end', () => {
          expect(receivedData.trim()).toMatch(formattedHour);
          server.close();
          res();
        });
      });
    });
  });
});
