import { useNavigate, useParams } from 'react-router-dom';
import VariantOption from './components/VariantOption';

import Header from 'explore/Header';
import Footer from 'explore/Footer';
import Recommendations from 'explore/Recommendations';
import AddToCart from 'checkout/AddToCart';
import { src, srcset, useGetProducts, useGetVariants } from 'core';
import { useMemo, useState } from 'react';
import Loading from 'app/Loading';

function useSku() {
  const [sku, setSku] = useState(() => new URL(location.href).searchParams.get('sku'));
  const navigate = useNavigate();

  return [
    sku,
    (val: string) => {
      navigate(`?sku=${val}`, { replace: true });
      setSku(val);
    },
  ] as const;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { data: products, isLoading: isProductsLoading } = useGetProducts();
  const { data: allVariants, isLoading: isVariantsLoading } = useGetVariants();

  const [sku, setSku] = useSku();

  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);
  const name = useMemo(() => product ? product.name : "" ,[product])
  const highlights = useMemo(() => product ? product.highlights : [] ,[product])

  const variants = useMemo(() => product ? allVariants.filter(v => v.productId === product.id) ?? [] : [], [product, allVariants]);
  const variant = useMemo(() => variants.find((v) => v.sku === sku) ?? variants[0], [variants, sku]);

  const handleSkuSelect = (ev: React.MouseEvent) => {
    const attr = (ev.target as HTMLElement).getAttribute('href');

    if (attr) {
      const val = attr.substring(attr.indexOf('?sku=') + 5);
      setSku(val);
    }
  };
  
  if (isProductsLoading || isVariantsLoading) return <Loading />

  if (!variant) return <></>

  return (
    <div data-boundary-page="decide">
      <Header />
      <main className="d_ProductPage">
        <div className="d_ProductPage__details">
          <img
            className="d_ProductPage__productImage"
            src={src(variant.image, 400)}
            srcSet={srcset(variant.image, [400, 800])}
            sizes="400px"
            width="400"
            height="400"
            alt={`${name} - ${variant.variantName}`}
          />
          <div className="d_ProductPage__productInformation">
            <h2 className="d_ProductPage__title">{name}</h2>
            <ul className="d_ProductPage__highlights">
              {highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
            <ul className="d_ProductPage__variants" onClick={handleSkuSelect}>
              {variants.map((v, i) => (
                <VariantOption key={i} {...{ ...v, selected: v.sku === variant.sku }} />
              ))}
            </ul>
            <AddToCart sku={variant.sku} />
          </div>
        </div>
        <Recommendations skus={[variant.sku]} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
