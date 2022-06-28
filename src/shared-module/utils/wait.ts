export const waitMs = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));
export const waitSec = async (s: number) => await waitMs(1000 * s);