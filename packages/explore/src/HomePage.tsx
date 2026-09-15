import * as React from 'react';
import { Link } from 'react-router-dom';
import { src, srcset } from 'core';
import Header from './Header';
import Footer from './Footer';
import Recommendations from './Recommendations';
import { useGetTeasers } from 'core';
import Loading from 'app/Loading';

const HomePage: React.FC = () => {
  const { data: teaser, isLoading } = useGetTeasers();

  if (isLoading) return <Loading />;

  return (
    <div data-boundary-page="explore">
      <Header />
      <main className="e_HomePage">
        {teaser.map(({ title, image, url }, i) => (
          <Link key={i} className="e_HomePage__categoryLink" to={url}>
            <img
              src={src(image, 500)}
              srcSet={srcset(image, [500, 1000])}
              sizes="100vw, (min-width: 500px) 50vw"
              alt=""
            />
            {title}
          </Link>
        ))}
        <div className="e_HomePage__recommendations">
          <Recommendations skus={['CL-01-GY', 'AU-07-MT']} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
