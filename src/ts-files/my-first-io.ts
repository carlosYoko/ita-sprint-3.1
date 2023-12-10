import * as fs from 'fs';

export function lineBreak(path: string) {
  const contents = fs.readFileSync(path);
  const result = contents.toString().split('\n').length - 1;

  return result;
}

if (process.env.SHOW_LOG !== 'false') {
  console.log(lineBreak(process.argv[2]));
}
