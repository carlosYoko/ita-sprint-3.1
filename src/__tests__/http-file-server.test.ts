import { fileServer } from '../ts-files/http-file-server';
import * as http from 'http';
import nock from 'nock';

describe('Pruebas de la funcion fileServer', () => {
  it('debería enviar el contenido del archivo al cliente', async () => {
    const PORT = '3000';
    const path = 'ruta-ficticia/archivo.txt';
    const content = 'Aprender Jest, Mock y Nock';

    nock(`http://localhost:${PORT}`)
      .get('/')
      .reply(200, content, { 'Content-Type': 'text/plain' });

    const server = fileServer(PORT, path);
    const response = await new Promise<http.IncomingMessage>((res) => {
      http.get(`http://localhost:${PORT}`, res);
    });

    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    await new Promise((res) => {
      response.on('end', res);
    });

    expect(data).toEqual(content);

    server.close();
  });
});
