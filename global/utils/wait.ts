export async function wait(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve: any, reject: any) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}
