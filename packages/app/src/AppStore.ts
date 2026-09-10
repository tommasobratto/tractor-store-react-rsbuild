import { create } from 'zustand'

interface StoreData { id: string; name: string }
interface AppState {
  stores: StoreData[];
  currentStore: string;
  setCurrentStore: (s: string) => void;
  getCurrentStoreData: () => StoreData | null;
  setStores: (s: StoreData[]) => void;
}

const createStorePickerSlice = (set: any, get: (() => { (): any; new(): any; stores: any[]; currentStore: any; })) => ({
  stores: [],
  currentStore: "",
  setCurrentStore: (currentStore: string) => set(() => ({ currentStore })),
  getCurrentStoreData: () => get().stores ? get().stores.find((store: { id: any; }) => store.id === get().currentStore) : null,
  setStores: (stores: any) => set(() => ({ stores })),
}) 

export const useAppStore = create<AppState>((...a) => ({
    ...createStorePickerSlice(...a)
}))