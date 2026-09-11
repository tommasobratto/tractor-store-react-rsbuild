import { create, StateCreator } from 'zustand'

interface StoreItem {
  id: string
  name: string
  street: string
  city: string
  image: string
}

interface StorePickerSlice {
  stores?: StoreItem[]
  currentStore: string
  setCurrentStore: (currentStore: string) => void
  getCurrentStoreData: () => StoreItem | null | undefined
  setStores: (stores: StoreItem[]) => void
}

interface CartItem {
  sku: string
  quantity: number
}

interface CartSlice {
  cart: CartItem[]
  addToCart: (sku: string) => void
  removeFromCart: (sku: string) => void
  clearCart: () => void
}

export type AppStore = StorePickerSlice & CartSlice;

const createStorePickerSlice: StateCreator<AppStore, [], [], StorePickerSlice> = (set, get): StorePickerSlice => ({
  stores: [],
  currentStore: "",
  setCurrentStore: (currentStore: string) => set(() => ({ currentStore })),
  getCurrentStoreData: () => get().stores?.find((store: StoreItem) => store.id === get().currentStore) ?? null,
  setStores: (stores: StoreItem[]) => set(() => ({ stores })),
})

const getSkuQuantityFromExistingCart = (cart: CartItem[], sku: string) => {
  const item = cart.find((m) => m.sku === sku);
  if (item) {
    return item.quantity + 1;
  }

  return 1
}

const createCartSlice: StateCreator<AppStore, [], [], CartSlice> = (set): CartSlice => ({
  cart: [],
  addToCart: (sku: string) => set((state: CartSlice) => ({ cart: state.cart.filter((m: CartItem) => m.sku !== sku).concat([{ sku, quantity: getSkuQuantityFromExistingCart(state.cart, sku) }]) })),
  removeFromCart: (sku: string) => set((state: CartSlice) => ({ cart: state.cart.filter((m: CartItem) => m.sku !== sku) })),
  clearCart: () => set(() => ({ cart: [] }))
})


export const useAppStore = create<AppStore>((...storeApi) => ({
  ...createStorePickerSlice(...storeApi),
  ...createCartSlice(...storeApi)
}))
