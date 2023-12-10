import { httpCollects } from '../ts-files/http-collect';
import nock from 'nock';

describe('Pruebas funcion httpCollect', () => {
  it('deberia recibir chunks e imprimir su longitud y la cadena completa', async () => {
    const mockUrl = 'http://urlinventada.com';
    const chunk = ['Dato1', ' Dato2'];
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    nock(mockUrl).get('/').reply(200, chunk.join(''));

    httpCollects(mockUrl);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(consoleLogSpy).toHaveBeenCalledWith(11);
    expect(consoleLogSpy).toHaveBeenCalledWith('Dato1 Dato2');

    nock.cleanAll();
    consoleLogSpy.mockRestore();
  });
});
