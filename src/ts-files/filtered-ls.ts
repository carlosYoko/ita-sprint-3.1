import * as fs from 'node:fs';
import * as path from 'node:path';

export function filtered(route: string, ext: string) {
  fs.readdir(route, (err, data) => {
    if (!err) {
      const filteredResult = data.filter(
        (item) => path.extname(item) === `.${ext}`
      );

      filteredResult.forEach((item) => console.log(item));
      return;
    }
  });
}

if (process.env.SHOW_LOG !== 'false') {
  filtered(process.argv[2], process.argv[3]);
}
