import { create } from 'zustand'

interface StoreData { id: string; name: string }
// interface AppState {
//   stores: StoreData[];
//   currentStore: string;
//   setCurrentStore: (s: string) => void;
//   getCurrentStoreData: () => StoreData | null;
//   setStores: (s: StoreData[]) => void;
// }

const createStorePickerSlice = (set: any, get: (() => { (): any; new(): any; stores: any[]; currentStore: any; })) => ({
  stores: [],
  currentStore: "",
  setCurrentStore: (currentStore: string) => set(() => ({ currentStore })),
  getCurrentStoreData: () => get().stores ? get().stores.find((store: { id: any; }) => store.id === get().currentStore) : null,
  setStores: (stores: any) => set(() => ({ stores })),
})

const getSkuQuantityFromExistingCart = (cart, sku) => {
  const item = cart.find((m) => m.sku === sku);
  if (item) {
    return item.quantity + 1;
  }

  return 1
}

interface CartItem {
  sku: string
  quantity: number
}

const createCartSlice = (set: any, get: any) => ({
  cart: [] as CartItem[],
  addToCart: (sku: string) => set((state) => ({ cart: [...state.cart.filter(m => m.sku !== sku)].concat([{ sku, quantity: getSkuQuantityFromExistingCart(state.cart, sku) }]) })),
  removeFromCart: (sku: string) => set((state) => ({ cart: [...state.cart].filter(m => m.sku !== sku) })),
  clearCart: () => set(() => ({ cart: [] as CartItem[] }))
});

export const useAppStore = create((...a) => ({
  ...createStorePickerSlice(...a),
  ...createCartSlice(...a)
}))