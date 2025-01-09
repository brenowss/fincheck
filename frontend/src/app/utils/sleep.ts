// sleep function to simulate delay
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
