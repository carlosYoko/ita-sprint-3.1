const mock = require('mock-fs');
const printDirs = require('../ts-files/mymodule');

describe('Pruebas funcion printDirs', () => {
  const testDir = 'ita-files';

  beforeEach(() => {
    mock({
      [testDir]: {
        'archivo1.ts': 'console.log("Hola Mundo")',
        'archivo2.ts': 'console.log("Hola Mundo")',
        'archivo3.txt': 'Hola Mundo',
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('debería devolver correctamente los archivos con extensión .ts', () => {
    const ext = 'ts';

    printDirs(testDir, ext, (err: unknown, data: string[]) => {
      expect(data).toEqual(['archivo1.ts', 'archivo2.ts']);
    });
  });

  it('no debería devolver los archivos que no sean extension .ts', () => {
    const ext = 'ts';

    printDirs(testDir, ext, (err: unknown, data: string[]) => {
      expect(data).not.toEqual(['archivo1.ts', 'archivo2.ts', 'archivo3.txt']);
    });
  });

  it('error no encontrar la ruta', () => {
    const ext = 'ts';
    printDirs('ruta-falsa', ext, (err: unknown, data: string[]) => {
      expect(() => {
        if (err) {
          throw err;
        }
      }).toThrow("ENOENT, no such file or directory 'ruta-falsa'");
    });
  });
});
