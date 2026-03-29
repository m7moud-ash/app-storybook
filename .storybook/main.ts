import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      resolve: {
        alias: {
          // Point react-native-svg to its web-compatible build for Vite/browser
          'react-native-svg': 'react-native-svg/src/ReactNativeSVG.web',
        },
      },
    });
  },
};

export default config;
