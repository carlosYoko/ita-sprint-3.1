import * as fs from 'fs';
import * as path from 'path';

function printDirs(route: string, ext: string, callback: Function) {
  fs.readdir(route, (err: unknown, data: string[]) => {
    if (err) {
      callback(err);
      return;
    }

    const dataFiltered = data.filter((d) => path.extname(d) === `.${ext}`);
    callback(null, dataFiltered);
  });
}

module.exports = printDirs;
