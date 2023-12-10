import { babySteps } from '../ts-files/baby-steps';

describe('Pruebas funcion baby steps', () => {
  const arr = ['1', '4', '5'];

  it('sumar array de strings y comprobar que devuelve tipo Number', () => {
    const result = babySteps(arr);

    expect(result).toBe(10);
  });
});
