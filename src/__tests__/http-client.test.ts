import { httpClient } from '../ts-files/http-client';
import nock from 'nock';

describe('Pruebas funcion httpClient', () => {
  it('debería recibir chunks e imprimirlos', async () => {
    const mockUrl = 'http://urlinventada.com';
    const chunks = ['Dato1', 'Dato2'];
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    nock(mockUrl).get('/').reply(200, chunks[0]);
    httpClient(mockUrl);

    nock(mockUrl).get('/').reply(200, chunks[1]);
    httpClient(mockUrl);

    await new Promise((res) => setTimeout(res, 100));

    expect(consoleLogSpy).toHaveBeenCalledWith('Dato1');
    expect(consoleLogSpy).toHaveBeenCalledWith('Dato2');

    nock.cleanAll();

    consoleLogSpy.mockRestore();
  });
});
