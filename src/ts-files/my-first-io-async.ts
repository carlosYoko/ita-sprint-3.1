import * as fs from 'fs';

export function lineBreakAsync(path: string): Promise<number> {
  return new Promise((res, rej) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        rej(new Error(err.message));
      } else {
        const result = data.toString().split('\n').length - 1;
        res(result);
      }
    });
  });
}

const filePath = process.argv[2];

const handleLineBreakAsync = async () => {
  try {
    const result = await lineBreakAsync(filePath);
    console.log(result);
    return;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
  }
};

if (process.env.SHOW_LOG !== 'false') {
  handleLineBreakAsync();
}
