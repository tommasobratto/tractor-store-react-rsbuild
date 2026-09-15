import * as React from 'react';
import LineItem from './components/LineItem';
import Button from './components/Button';
import Header from 'explore/Header';
import Footer from 'explore/Footer';
import Recommendations from 'explore/Recommendations';
import { useAppStore } from 'app/AppStore';
import { useGetVariants, ProductVariant } from 'core';
import Loading from 'app/Loading';

function convertToLineItems(items: Array<{ sku: string; quantity: number }>, variants: ProductVariant[]) {
  if (!variants) return [];
  
  return items.reduce<(ProductVariant & { quantity: number, total: number})[]>((res, { sku, quantity }) => {
    const variant = variants.find((p) => p.sku === sku);
    if (variant) {
      res.push({ ...variant, quantity, total: variant.price * quantity });
    }
    return res;
  }, []);
}

const CartPage: React.FC = () => {
  const { data, isLoading } = useGetVariants();
  const rawLineItems = useAppStore((state) => state.cart);
  const lineItems = convertToLineItems(rawLineItems, data);
  const total = lineItems.reduce((res, { total }) => res + total, 0);
  const skus = lineItems.map(({ sku }) => sku);

  if (isLoading) return <Loading />;

  return (
    <div data-boundary-page="checkout">
      <Header />
      <main className="c_CartPage">
        <h2>Basket</h2>
        <ul className="c_CartPage__lineItems">
          {lineItems.map((li, i) => (
            <LineItem key={i} {...li} />
          ))}
        </ul>
        <hr />
        <p className="c_CartPage__total">Total: {total} Ø</p>
        <div className="c_CartPage__buttons">
          <Button href="/checkout/checkout" variant="primary">
            Checkout
          </Button>
          <Button href="/" variant="secondary">
            Continue Shopping
          </Button>
        </div>
        <Recommendations skus={skus} />
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
