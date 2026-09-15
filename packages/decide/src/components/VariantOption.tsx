import * as React from 'react';
import { Link } from 'react-router-dom';

declare module 'react' {
  interface CSSProperties {
    '--variant-color': string;
  }
}

interface VariantOptionProps {
  sku: string;
  variantName: string;
  selected?: boolean;
  colorHex: string;
}

export default ({ sku, variantName, selected, colorHex }: VariantOptionProps) => {
  return (
    <li className="d_VariantOption" style={{ '--variant-color': colorHex }}>
      <i className="d_VariantOption__color"></i>
      {selected ? <strong>{variantName}</strong> : <Link to={`?sku=${sku}`}>{variantName}</Link>}
    </li>
  );
};
