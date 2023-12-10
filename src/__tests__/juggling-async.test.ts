import nock from 'nock';
import { allCalls } from '../ts-files/juggling-async';

const url1 = 'http://url1.com';
const url2 = 'http://url2.com';
const url3 = 'http://url3.com';

const data1 = 'Hola desde la URL 1';
const data2 = 'Saludos desde la URL 2';
const data3 = 'Mensaje desde la URL 3';

nock(url1).get('/').reply(200, data1);
nock(url2).get('/').reply(200, data2);
nock(url3).get('/').reply(200, data3);

describe('Pruebas de la función allCalls', () => {
  it('debería imprimir los resultados esperados', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await allCalls(url1, url2, url3);

    expect(consoleSpy).toHaveBeenCalledWith('Hola desde la URL 1');
    expect(consoleSpy).toHaveBeenCalledWith('Saludos desde la URL 2');
    expect(consoleSpy).toHaveBeenCalledWith('Mensaje desde la URL 3');

    consoleSpy.mockRestore();
  });
});
