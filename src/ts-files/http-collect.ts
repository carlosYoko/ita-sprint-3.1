import * as http from 'http';
import * as validUrl from 'valid-url';

export function httpCollects(url: string) {
  if (!validUrl.isWebUri(url)) {
    return;
  }

  http.get(url, (res) => {
    let string: string = '';
    res.setEncoding('utf-8').on('data', (data) => {
      string += data;
    });

    res.on('error', (error) => {
      console.error(error);
    });

    res.on('end', () => {
      const length = string.length;
      console.log(length);
      console.log(string);
    });
  });
}

const URL = process.argv[2];
httpCollects(URL);
