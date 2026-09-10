import * as React from 'react';
import data from './data/db.json';
import Recommendation from './components/Recommendation';

type Rgb = [number, number, number];

export interface Reco {
  name: string;
  sku: string;
  image: string;
  url: string;
  rgb: Rgb;
}

const r = data.recommendations as unknown as Record<string, Reco>;

function averageColor(colors: Rgb[]): Rgb {
  const total = colors.reduce(
    (acc, [red, green, blue]) => [acc[0] + red, acc[1] + green, acc[2] + blue],
    [0, 0, 0],
  );
  return total.map((c) => Math.round(c / colors.length)) as Rgb;
}

function skusToColors(skus: string[]): Rgb[] {
  return skus.filter((sku) => r[sku]).map((sku) => r[sku].rgb);
}

function colorDistance(rgb1: Rgb, rgb2: Rgb): number {
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function recosForSkus(skus: string[], length = 4): Reco[] {
  const targetRgb = averageColor(skusToColors(skus));
  const distances: Array<{ sku: string; distance: number }> = [];

  for (const sku in r) {
    if (!skus.includes(sku)) {
      distances.push({ sku, distance: colorDistance(targetRgb, r[sku].rgb) });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, length).map((d) => r[d.sku]);
}

const Recommendations: React.FC<{ skus: string[] }> = ({ skus }) => {
  const recos = recosForSkus(skus);
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
