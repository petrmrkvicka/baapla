/**
 * This method return a promise with a delay (ms)
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
