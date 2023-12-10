import { lineBreak } from '../ts-files/my-first-io';
import * as fs from 'fs';

describe('Pruebas funcion lineBreak', () => {
  it('debe contar correctamente los saltos de línea en un archivo', () => {
    const pathName = 'testfile.txt';
    const content = 'Hola\nMundo\nComo estas?\n';

    fs.writeFileSync(pathName, content);

    const result = lineBreak(pathName);
    expect(result).toBe(3);

    // elimina el archivo de prueba después de la prueba (buenas practicas)
    fs.unlinkSync(pathName);
  });
});
