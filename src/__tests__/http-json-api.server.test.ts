import { jsonApiServer } from '../ts-files/http-json-api-server';
import http from 'http';

describe('Preubas función jsonApiServer', () => {
  let server: http.Server;

  beforeAll(() => {
    server = jsonApiServer('3000');
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  it('debería devolver la hora correctamente para /api/parsetime', async () => {
    const response = await new Promise<any>((resolve) => {
      http.get(
        'http://localhost:3000/api/parsetime?iso=2013-08-10T12:10:15.474Z',
        (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            resolve(JSON.parse(data));
          });
        }
      );
    });

    expect(response).toEqual({
      hour: 14,
      minute: 10,
      second: 15,
    });
  });

  it('debería devolver el tiempo UNIX correctamente para /api/unixtime', async () => {
    const response = await new Promise<any>((resolve) => {
      http.get(
        'http://localhost:3000/api/unixtime?iso=2013-08-10T12:10:15.474Z',
        (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            resolve(JSON.parse(data));
          });
        }
      );
    });

    expect(response).toEqual({
      unixtime: 1376136615474,
    });
  });
});
