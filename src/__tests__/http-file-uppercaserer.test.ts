import { uppercaserer } from '../ts-files/http-uppercaserer';
import * as http from 'http';
import nock from 'nock';

describe('Pruebas de la función uppercaserer', () => {
  it('debería convertir a mayúsculas las cadenas recibidas', async () => {
    const PORT = '3000';
    const content = 'texto que se tiene que mostrar en mayuscula';

    nock(`http://localhost:${PORT}`)
      .get('/')
      .reply(200, content, { 'Content-Type': 'text/plain' });

    const server = uppercaserer(PORT);
    const response = await new Promise<http.IncomingMessage>((res) => {
      http.get(`http://localhost:${PORT}`, res);
    });

    let data = '';

    // Escucha el evento 'data' y convierte cada fragmento a mayúsculas
    response.on('data', (chunk) => {
      data += chunk.toString('utf-8').toUpperCase();
    });

    await new Promise((res) => {
      response.on('end', res);
    });

    expect(data).toEqual(content.toUpperCase());

    server.close();
  });
});
