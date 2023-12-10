const array = process.argv.slice(2);

export function babySteps(arr: string[]): number {
  return arr.reduce((acc, curr) => acc + Number(curr), 0);
}

if (process.env.SHOW_LOG !== 'false') {
  console.log(babySteps(array));
}
