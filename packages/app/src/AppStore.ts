import { create } from 'zustand'

const createStorePickerSlice = (set, get) => ({
  stores: [],
  currentStore: "",
  setCurrentStore: (currentStore: string) => set(() => ({ currentStore })),
  getCurrentStoreData: () => get().stores ? get().stores.find(store => store.id === get().currentStore) : null,
  setStores: (stores) => set(() => ({ stores })),
}) 

export const useAppStore = create((...a) => ({
    ...createStorePickerSlice(...a)
}))