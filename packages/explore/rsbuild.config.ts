import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig(({ envMode }) => {
  const isProd = envMode === 'production';
  const host = process.env.HOST || '';

  return {
    dev: {
      assetPrefix: true
    },
    plugins: [
      pluginReact(),
      pluginModuleFederation({
        name: 'explore',
        exposes: {
          './Header': './src/Header.tsx',
          './Footer': './src/Footer.tsx',
          './Recommendations': './src/Recommendations.tsx',
          './StorePicker': './src/StorePicker.tsx',
          './App': './src/App.tsx',
        },
        remotes: {
          checkout: isProd
            ? `checkout@${host}/checkout/mf-manifest.json`
            : 'checkout@http://localhost:3002/mf-manifest.json',
          app: isProd
            ? `shell@${host}/mf-manifest.json`
            : 'shell@http://localhost:3000/mf-manifest.json',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          'react-router-dom': { singleton: true },
          zustand: { singleton: true }
        },
      }),
    ],
    filename: 'remoteEntry.js',
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
      port: 3001,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
});