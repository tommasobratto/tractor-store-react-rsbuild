import Loading from 'app/Loading';
import Recommendation from './components/Recommendation';
import { ProductVariant, useGetRecommendations } from 'core';

type Rgb = number[];

function averageColor(colors: Rgb[]): Rgb {
  const total = colors.reduce(
    (acc, [red, green, blue]) => [acc[0] + red, acc[1] + green, acc[2] + blue],
    [0, 0, 0],
  );
  return total.map((c) => Math.round(c / colors.length)) as Rgb;
}

function skusToColors(r: Record<string, ProductVariant>, skus: string[]): Rgb[] {
  return skus.filter((sku) => r[sku]).map((sku) => r[sku].colorRgb);
}

function colorDistance(rgb1: Rgb, rgb2: Rgb): number {
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function recosForSkus(r: Record<string, ProductVariant>, skus: string[], length = 4) {
  const targetRgb = averageColor(skusToColors(r, skus));
  const distances: Array<{ sku: string; distance: number }> = [];

  for (const sku in r) {
    if (!skus.includes(sku)) {
      distances.push({ sku, distance: colorDistance(targetRgb, r[sku].colorRgb) });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, length).map((d) => ({ ...r[d.sku], url: `/product/${r[d.sku].productId}?sku=${d.sku}` }));
}

const Recommendations: React.FC<{ skus: string[] }> = ({ skus }) => {
  const { data, isLoading } = useGetRecommendations();

  if (isLoading) return <Loading/>

  const recos = recosForSkus(data, skus);
  return recos.length ? (
    <div className="e_Recommendations" data-boundary="explore">
      <h2>Recommendations</h2>
      <ul className="e_Recommendations_list">
        {recos.map((reco) => (
          <Recommendation key={reco.sku} {...reco} />
        ))}
      </ul>
    </div>
  ) : null;
};

export default Recommendations;
