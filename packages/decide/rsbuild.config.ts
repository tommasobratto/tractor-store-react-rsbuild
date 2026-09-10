import path from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig(({ envMode }) => {
  const isProd = envMode === 'production';
  const host = process.env.HOST || '';

  return {
    dev: { assetPrefix: true },
    plugins: [
      pluginReact(),
      pluginModuleFederation({
        name: 'decide',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App.tsx',
        },
        remotes: {
          explore: isProd
            ? `explore@${host}/explore/mf-manifest.json`
            : 'explore@http://localhost:3001/mf-manifest.json',
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
          zustand: { singleton: true },
        },
        dts: false,
      }),
    ],
    source: { entry: { index: './src/index' } },
    output: { assetPrefix: 'auto' },
    html: { template: './public/index.html' },
    server: {
      port: 3003,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    tools: {
      rspack: (config) => {
        config.watchOptions = {
          ignored: ['**/node_modules/**', '**/@mf-types/**', '**/dist/**'],
        };
        return config;
      },
    },
  };
});