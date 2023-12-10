const myPrintDirs = require('./mymodule');

const route = process.argv[2];
const ext = process.argv[3];

myPrintDirs(route, ext, (err: string, data: string[]) => {
  if (err) {
    console.error(err);
    return;
  }
  data.forEach((data) => console.log(data));
});
