import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useAppStore } from 'app/AppStore';
import { src, srcset } from 'core';

interface LineItemProps {
  sku: string;
  productId: string;
  variantName: string;
  quantity: number;
  total: number;
  image: string;
}

export default ({ sku, productId, variantName, quantity, total, image }: LineItemProps) => {
  const url = `/product/${productId}?sku=${sku}`;

  const removeFromCart = useAppStore((state) => state.removeFromCart);

  function submit(ev: React.SyntheticEvent) {
    removeFromCart(sku);
    ev.preventDefault();
  }

  return (
    <li className="c_LineItem">
      <Link to={url} className="c_LineItem__image">
        <img
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400])}
          sizes="200px"
          alt={variantName}
          width="200"
          height="200"
        />
      </Link>
      <div className="c_LineItem__details">
        <Link to={url} className="c_LineItem__name">
          <strong>{variantName}</strong>
          <br />
          {sku}
        </Link>

        <div className="c_LineItem__quantity">
          <span>{quantity}</span>

          <form action="/checkout/cart/remove" method="post" onSubmit={submit}>
            <input type="hidden" name="sku" value={sku} />
            <Button
              variant="secondary"
              rounded
              type="submit"
              value="remove"
              size="small"
              title={`Remove ${variantName} from cart`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20" width="20" viewBox="0 0 48 48">
                <path
                  fill="#000"
                  d="m40 5.172-16 16-16-16L5.171 8l16.001 16L5.171 40 8 42.828l16-16 16 16L42.828 40l-16-16 16-16L40 5.172Z"
                />
              </svg>
            </Button>
          </form>
        </div>
        <div className="c_LineItem__price">{total} Ø</div>
      </div>
    </li>
  );
};
