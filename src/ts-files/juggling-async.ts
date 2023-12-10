import * as http from 'http';

const url1: string = process.argv[2];
const url2: string = process.argv[3];
const url3: string = process.argv[4];

export function fetchData(url: string): Promise<string> {
  return new Promise((res, rej) => {
    http.get(url, (data) => {
      let string: string = '';

      data.setEncoding('utf-8').on('data', (data) => {
        string += data;
      });

      data.on('end', () => {
        res(string);
      });

      data.on('error', (error) => {
        rej(error);
      });
    });
  });
}

export async function allCalls(url1: string, url2: string, url3: string) {
  const result: string[] = [];

  try {
    const result1 = await fetchData(url1);
    result.push(result1);

    const result2 = await fetchData(url2);
    result.push(result2);

    const result3 = await fetchData(url3);
    result.push(result3);

    result.forEach((item) => console.log(item));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error);
    }
  }
}

if (process.env.SHOW_LOG !== 'false') {
  allCalls(url1, url2, url3);
}
