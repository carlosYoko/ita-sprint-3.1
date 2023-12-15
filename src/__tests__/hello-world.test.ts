import { sayHello } from '../ts-files/hello-world';

describe('Pruebas para hello-world', () => {
  it('debería imprimir HELLO WORLD en la consola', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    sayHello();
    expect(consoleSpy).toHaveBeenCalledWith('HELLO WORLD');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
  });
});
