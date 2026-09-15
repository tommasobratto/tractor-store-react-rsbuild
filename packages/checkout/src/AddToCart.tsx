import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './components/Button';
import { useAppStore } from 'app/AppStore';
import { useGetVariants } from 'core';
import Loading from 'app/Loading';
import { useMemo } from 'react';

const AddToCart: React.FC<{ sku: string }> = ({ sku }) => {
  const { data, isLoading } = useGetVariants();

  const variant = useMemo(() => data.find((p: { sku: string; }) => p.sku === sku), [data]);
  const navigate = useNavigate();
  const outOfStock = variant?.inventory === 0;
  const addToCart = useAppStore((state) => state.addToCart);

  function submit(ev: React.SyntheticEvent) {
    addToCart(sku);
    navigate('/checkout/cart');
    ev.preventDefault();
  }

  if (isLoading) return <Loading />

  return (
    <form action="/checkout/cart/add" method="POST" className="c_AddToCart" data-boundary="checkout" onSubmit={submit}>
      <input type="hidden" name="sku" value={sku} />
      <div className="c_AddToCart__information">
        <p>{variant?.price} Ø</p>
        {variant && variant.inventory > 0 ? (
          <p className="c_AddToCart__stock c_AddToCart__stock--ok">{variant.inventory} in stock, free shipping</p>
        ) : (
          <p className="c_AddToCart__stock c_AddToCart__stock--empty">out of stock</p>
        )}
      </div>
      <Button disabled={outOfStock} className="c_AddToCart__button" variant="primary">
        add to basket
      </Button>
      <div className="c_AddToCart__confirmed c_AddToCart__confirmed--hidden">
        <p>Tractor was added.</p>
        <Link to="/checkout/cart" className="c_AddToCart__link">
          View in basket.
        </Link>
      </div>
    </form>
  );
};

export default AddToCart;
