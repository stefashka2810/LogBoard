import type { Storage } from "redux-persist";

const createNoopStorage = (): Storage => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
});

const createLocalStorage = (): Storage => {
  if (typeof window !== "undefined") {
    return {
      getItem: (key: string) => {
        const item = localStorage.getItem(key);
        console.log(`[PERSIST] getItem("${key}"):`, item ? "✓ Found" : "✗ Missing");
        return Promise.resolve(item);
      },
      setItem: (key: string, value: string) => {
        console.log(`[PERSIST] setItem("${key}") length: ${value.length}`);
        localStorage.setItem(key, value);
        return Promise.resolve();
      },
      removeItem: (key: string) => {
        console.log(`[PERSIST] removeItem("${key}")`);
        localStorage.removeItem(key);
        return Promise.resolve();
      },
    };
  }
  return createNoopStorage();
};

export const storage = createLocalStorage();
