import { lineBreakAsync } from '../ts-files/my-first-io-async';
import * as fs from 'fs';

describe('Pruebas funcion lineBreak', () => {
  it('debe contar correctamente los 3 saltos de línea de un archivo', async () => {
    const fileName = 'testfile.txt';
    const content = 'Hola\nMundo\nComo estas?\n';

    await new Promise((res, rej) => {
      fs.writeFile(fileName, content, 'utf-8', (error) => {
        if (error) {
          console.error(error.message);
          rej(error);
          return;
        }
        res(null);
      });
    });

    try {
      let result = await lineBreakAsync(fileName);
      expect(result).toBe(3);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      fs.unlinkSync(fileName);
    }
  });
});
