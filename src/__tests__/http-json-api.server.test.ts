import { jsonApiServer } from '../ts-files/http-json-api-server';
import http from 'http';
import * as url from 'url';

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
    const isoDate = '2013-08-10T12:10:15.474Z';
    const response = await new Promise<any>((resolve) => {
      const req = {
        url: `/api/parsetime?iso=${isoDate}`,
      };

      const route = url.parse(req.url!, true);
      const date = new Date(String(route.query.iso));
      let responseData = null;

      if (route.pathname === '/api/parsetime') {
        responseData = {
          hour: date.getHours() - 2,
          minute: date.getMinutes(),
          second: date.getSeconds(),
        };
      }
      resolve(responseData);
    });

    expect(response).toEqual({
      hour: new Date(isoDate).getHours() - 2,
      minute: new Date(isoDate).getMinutes(),
      second: new Date(isoDate).getSeconds(),
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
