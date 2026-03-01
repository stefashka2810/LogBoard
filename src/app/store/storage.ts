const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
});

export const getStorage = async () => {
  if (typeof window !== "undefined") {
    const { default: storage } = await import("redux-persist/lib/storage");
    return storage;
  }

  return createNoopStorage();
};
