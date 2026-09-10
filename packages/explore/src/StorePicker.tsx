import * as React from 'react';
import data from './data/db.json';
import Button from './components/Button';
import { useAppStore, type Store } from 'app/AppStore';
import { useEffect } from 'react';
import { src, srcset } from './js/utils';

function StoreDisplay({ store }: { store: Store | null | undefined }) {
  if (!store) return <></>;

  return (
    <div className="e_StorePicker_content">
      <img
        className="e_StorePicker_image"
        src={src(store.image, 200)}
        srcSet={srcset(store.image, [200, 400])}
        width="200"
        height="200"
        alt={store.name}
      />
      <p className="e_StorePicker_address">
        {store.name}
        <br />
        {store.street}
        <br />
        {store.city}
      </p>
    </div>
  );
}

const StorePicker: React.FC = () => {
  const ref = React.useRef<HTMLDialogElement>(null);

  const stores = useAppStore((state) => state.stores);
  const setStores = useAppStore((state) => state.setStores);
  const currentStore = useAppStore((state) => state.currentStore);
  const setCurrentStore = useAppStore((state) => state.setCurrentStore);

  useEffect(() => {
    setStores(data.stores);
  }, [setStores]);

  const currentStoreDisplay = React.useMemo(
    () => stores.find((store) => store.id === currentStore) ?? null,
    [stores, currentStore],
  );

  const openDialog = () => {
    ref.current?.showModal();
  };

  const selectShop = (shopId: string) => {
    setCurrentStore(shopId);
    ref.current?.close();
  };

  return (
    <div className="e_StorePicker">
      <div className="e_StorePicker_control" data-boundary="explore">
        <div className="e_StorePicker_selected">
          <StoreDisplay store={currentStoreDisplay} />
        </div>
        <Button className="e_StorePicker_choose" type="button" onClick={openDialog}>
          choose a store
        </Button>
      </div>
      <dialog className="e_StorePicker_dialog" data-boundary="explore" ref={ref}>
        <div className="e_StorePicker_wrapper">
          <h2>Stores</h2>
          <ul className="e_StorePicker_list">
            {stores.map((s) => (
              <li className="e_StorePicker_entry" key={s.id}>
                <StoreDisplay store={s} />
                <Button
                  className="e_StorePicker_select"
                  type="button"
                  dataId={s.id}
                  onClick={() => selectShop(s.id)}
                >
                  select
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
};

export default StorePicker;
