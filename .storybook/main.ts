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
      optimizeDeps: {
        // Skip dep pre-bundling (rolldown) for lucide-react-native — it fails
        // because context.js is missing the LucideProvider export in v1.7.0
        exclude: ['lucide-react-native'],
      },
      plugins: [
        {
          // Patch context.js at serve time (after the optimizer is skipped above)
          // by appending the missing LucideProvider stub export.
          name: 'lucide-context-patch',
          transform(code: string, id: string) {
            if (id.includes('lucide-react-native') && id.endsWith('context.js')) {
              return {
                code: code + '\nexport function LucideProvider({ children }) { return children; }\n',
                map: null,
              };
            }
          },
        },
      ],
    });
  },
};

export default config;
