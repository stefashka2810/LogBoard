import type { Storage } from 'redux-persist';

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
        console.log(`[PERSIST] getItem("${key}"): ${item ? "✓ Found" : "✗ Not found"}`);
        return Promise.resolve(item);
      },
      setItem: (key: string, value: string) => {
        console.log(`[PERSIST] setItem("${key}"): saving...`);
        localStorage.setItem(key, value);
        console.log(`[PERSIST] setItem("${key}"): saved ✓`);
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
