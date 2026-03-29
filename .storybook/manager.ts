import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

// ─── Design-system–branded themes ────────────────────────────────────────────
// Colors sourced from src/tokens/index.ts primitives.

function buildTheme(isDark: boolean) {
  return create({
    base: isDark ? 'dark' : 'light',

    // Brand
    brandTitle: 'App DSM',
    brandUrl:   '#',
    brandTarget: '_self',

    // Accent — purple.500 / blue.brand
    colorPrimary:   '#7047eb',
    colorSecondary: '#0056d6',

    // App chrome
    appBg:            isDark ? '#141414' : '#ffffff',
    appContentBg:     isDark ? '#141414' : '#ffffff',
    appPreviewBg:     isDark ? '#141414' : '#ffffff',
    appBorderColor:   isDark ? 'rgba(255,255,255,0.10)' : '#ebebef',
    appBorderRadius:  8,

    // Text
    textColor:        isDark ? '#ffffff'       : '#121217',
    textInverseColor: isDark ? '#121217'       : '#ffffff',
    textMutedColor:   isDark ? 'rgba(255,255,255,0.50)' : '#6c6c89',

    // Toolbar / sidebar tabs
    barBg:            isDark ? '#141414' : '#ffffff',
    barTextColor:     isDark ? 'rgba(255,255,255,0.50)' : '#6c6c89',
    barHoverColor:    isDark ? '#ffffff'       : '#121217',
    barSelectedColor: isDark ? '#ffffff'       : '#121217',

    // Form controls (Controls panel)
    inputBg:          isDark ? '#292929' : '#f7f7f8',
    inputBorder:      isDark ? 'rgba(255,255,255,0.20)' : '#d1d1db',
    inputTextColor:   isDark ? '#ffffff' : '#121217',
    inputBorderRadius: 4,

    // Typography — Inter loaded via preview-head.html
    fontBase: '"Inter", system-ui, -apple-system, sans-serif',
    fontCode: '"JetBrains Mono", "Fira Code", monospace',
  });
}

const lightTheme = buildTheme(false);
const darkTheme  = buildTheme(true);

// ─── Apply initial theme ──────────────────────────────────────────────────────

addons.setConfig({ theme: lightTheme });

// ─── Sync manager theme with canvas colorScheme global ───────────────────────
// `globalsUpdated` fires on the shared channel whenever the toolbar toggle
// changes. We update the manager Storybook theme in response.

addons.register('app-dsm/theme-sync', () => {
  const channel = addons.getChannel();

  channel.on('globalsUpdated', ({ globals }: { globals: Record<string, unknown> }) => {
    const isDark = globals?.colorScheme === 'dark';
    addons.setConfig({ theme: isDark ? darkTheme : lightTheme });
  });
});
