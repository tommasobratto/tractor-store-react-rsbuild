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
        name: 'app',
        exposes: {
          './Loading': './src/Loading.tsx',
        },
        remotes: {
          explore: isProd
            ? `explore@${host}/explore/mf-manifest.json`
            : 'explore@http://localhost:3001/mf-manifest.json',
          checkout: isProd
            ? `checkout@${host}/checkout/mf-manifest.json`
            : 'checkout@http://localhost:3002/mf-manifest.json',
          decide: isProd
            ? `decide@${host}/decide/mf-manifest.json`
            : 'decide@http://localhost:3003/mf-manifest.json',
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
      assetPrefix: '/',
    },
    html: {
      template: './public/index.html',
    },
    server: {
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
    },
  };
});