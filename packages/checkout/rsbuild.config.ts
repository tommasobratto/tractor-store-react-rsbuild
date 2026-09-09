// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig(({ envMode }) => {
  const isProd = envMode === 'production';
  const host = process.env.HOST || '';

  return {
    plugins: [
      pluginReact(),
      pluginModuleFederation({
        name: 'checkout',
        exposes: {
          './AddToCart': './src/AddToCart.tsx',
          './MiniCart': './src/MiniCart.tsx',
          './App': './src/App.tsx',
        },
        remotes: {
          explore: isProd
            ? `explore@${host}/explore/mf-manifest.json`
            : 'explore@http://localhost:3001/mf-manifest.json',
          app: isProd
            ? `app@${host}/mf-manifest.json`
            : 'app@http://localhost:3000/mf-manifest.json',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          'react-router-dom': { singleton: true },
        },
      }),
    ],
    source: {
      entry: {
        index: './src/index',
      },
    },
    output: {
      assetPrefix: 'auto',
    },
    html: {
      template: './public/index.html',
    },
    server: {
      port: 3002,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
});