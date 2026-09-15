import Product from './components/Product';
import Filter from './components/Filter';
import Header from './Header';
import Footer from './Footer';
import { useGetCategories, useGetProducts, useGetVariants } from 'core';
import Loading from 'app/Loading';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { category } = useParams();

  const { data: categories, isLoading: isCategoriesLoading } = useGetCategories();
  const { data: productsData, isLoading: isProductsLoading } = useGetProducts();
  const { data: variants, isLoading: isVariantsLoading } = useGetVariants();

  const cat = useMemo(() => categories && categories.length > 0 && category ? categories.find((c) => c.key === category) : null, [category, categories]);
  const products = useMemo(() => productsData.filter(p => cat ? p.category === cat?.key : p), [cat, productsData]);

  const productsDisplay = useMemo(() => products.flatMap(p => { 
    const defaultVariant = variants.filter(v => v.productId === p.id).sort((a, b) => b.price - a.price)[0];
    if (!defaultVariant) return [];

    return [{
      ...p,
      startPrice: defaultVariant.price,
      image: defaultVariant.image,
      url: `/product/${defaultVariant.productId}?sku=${defaultVariant.sku}`
    }];
  }).sort((a, b) => b.startPrice - a.startPrice), [products, variants])
  
  const title = useMemo(() => cat ? cat.name : 'All Machines', [cat]);

  const filters = useMemo(() => [
    { url: '/products', name: 'All', active: !cat },
    ...categories.map((c) => ({
      url: `/products/${c.key}`,
      name: c.name,
      active: c.key === category,
    })),
  ], [categories, cat]);

  if (isCategoriesLoading || isProductsLoading || isVariantsLoading) return <Loading /> 

  return (
    <div data-boundary-page="explore">
      <Header />
      <main className="e_CategoryPage">
        <h2>{title}</h2>
        <div className="e_CategoryPage__subline">
          <p>{productsDisplay.length} products</p>
          <Filter filters={filters} />
        </div>
        <ul className="e_CategoryPage_list">
          {productsDisplay.map((product, i) => (
            <Product key={i} {...product} />
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
