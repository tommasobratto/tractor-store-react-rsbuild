import * as React from 'react';
import data from './data/db.json';
import Button from './components/Button';
import { useAppStore } from 'app/AppStore';
import StoreDisplay from 'app/StoreDisplay';
import { useEffect } from 'react';

const StorePicker: React.FC = () => {
  // const [currentStore, setCurrentStore] = React.useState('');
  const ref = React.useRef<HTMLDialogElement>();

  const stores = useAppStore((state) => state.stores);
  const setStores = useAppStore((state) => state.setStores);
  const currentStore = useAppStore((state) => state.currentStore);
  const setCurrentStore = useAppStore((state) => state.setCurrentStore);

  useEffect(() => {
    console.log(data)

    setStores(data.stores)
  }, [data])

  const currentStoreDisplay = React.useMemo(() => stores ? stores.find(store => store.id === currentStore) : null, [data, currentStore]);

  const openDialog = () => {
    ref.current.showModal();
  };

  const selectShop = (e: React.MouseEvent, shopId: string) => {
    setCurrentStore(shopId);
    ref.current.close();
  };

  return (
    <div className="e_StorePicker">
      <div className="e_StorePicker_control" data-boundary="explore">
        <div className="e_StorePicker_selected">{<StoreDisplay store={currentStoreDisplay} />}</div>
        <Button className="e_StorePicker_choose" type="button" onClick={openDialog}>
          choose a store
        </Button>
      </div>
      <dialog className="e_StorePicker_dialog" data-boundary="explore" ref={ref}>
        <div className="e_StorePicker_wrapper">
          <h2>Stores</h2>
          <ul className="e_StorePicker_list">
            {stores ? stores.map((s, i) => (
              <li className="e_StorePicker_entry" key={i}>
                <StoreDisplay store={s} />
                <Button className="e_StorePicker_select" type="button" dataId={s.id} onClick={(e) => selectShop(e, s.id)}>
                  select
                </Button>
              </li>
            )) : <></>}
          </ul>
        </div>
      </dialog >
    </div >
  );
};

export default StorePicker;
