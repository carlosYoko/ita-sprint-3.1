import mock from 'mock-fs';
import { filtered } from '../ts-files/filtered-ls';

describe('Pruebas para filtered function', () => {
  const testDir = 'ita-files';
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

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

  it('debería imprimir correctamente los archivos con extensión .ts', async () => {
    filtered(testDir, 'ts');

    await new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, 500);
    });

    expect(consoleSpy).toHaveBeenCalledWith('archivo1.ts');
    expect(consoleSpy).toHaveBeenCalledWith('archivo2.ts');
  });

  it('no debería imprimir un archivo con una extensión diferente', async () => {
    filtered(testDir, 'ts');

    await new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, 500);
    });

    expect(consoleSpy).not.toHaveBeenCalledWith('archivo3.txt');
    consoleSpy.mockRestore();
  });
});
