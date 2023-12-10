import * as http from 'http';
import * as validUrl from 'valid-url';

export function httpClient(url: string) {
  if (!validUrl.isWebUri(url)) {
    return;
  }

  http.get(url, (res: http.IncomingMessage) => {
    res.setEncoding('utf-8').on('data', (data: string) => {
      console.log(data);
    });

    res.on('error', (err) => {
      console.error(err);
    });

    res.on('end', () => {});
  });
}

const URL = process.argv[2];
httpClient(URL);
