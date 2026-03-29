import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ThemeProvider, type ColorScheme } from '../src/tokens/theme';
import { surfaceTokens } from '../src/tokens';

// ─── Toolbar: light / dark switcher ──────────────────────────────────────────

export const globalTypes = {
  colorScheme: {
    description: 'Color scheme',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'sun',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark',  title: 'Dark',  icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
};

// ─── Dark-mode CSS injected into the preview iframe ───────────────────────────
// The Storybook docs page (title, prop tables, story wrappers) lives in the
// same iframe as our components but is rendered by addon-docs with its own
// white background. We inject/remove a <style> tag to override everything.

const STYLE_ID = 'dsm-dark-override';

function applyDarkCSS(isDark: boolean) {
  if (typeof document === 'undefined') return;

  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;

  if (!isDark) {
    el?.remove();
    return;
  }

  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }

  el.textContent = `
    /* ── Full-page canvas & docs background ─────────────────────── */
    html, body {
      background-color: #141414 !important;
      color: #ffffff !important;
    }

    /* ── Storybook docs page wrapper ─────────────────────────────── */
    .sbdocs-wrapper,
    .sbdocs-content,
    [class*="DocsPage"],
    [class*="docs-story"],
    [class*="Docs"],
    #storybook-root,
    #storybook-docs {
      background-color: #141414 !important;
      color: #ffffff !important;
    }

    /* ── Story preview "frame" inside docs ───────────────────────── */
    [class*="StoryWrapper"],
    [class*="StoryPreview"],
    [class*="preview-"],
    .docs-story > div,
    [class*="story-wrapper"] {
      background-color: #141414 !important;
    }

    /* ── Heading & body text in docs ─────────────────────────────── */
    .sbdocs h1, .sbdocs h2, .sbdocs h3,
    .sbdocs h4, .sbdocs p, .sbdocs li,
    [class*="Title"], [class*="Subtitle"],
    [class*="Description"] {
      color: #ffffff !important;
    }

    /* ── Prop/Controls table ─────────────────────────────────────── */
    .docblock-argstable,
    [class*="ArgRow"],
    [class*="TableWrapper"],
    table, thead, tbody, tr, th, td {
      background-color: #141414 !important;
      color: #ffffff !important;
      border-color: rgba(255,255,255,0.10) !important;
    }
    thead tr, [class*="HeaderRow"] {
      background-color: #292929 !important;
    }
    tbody tr:nth-child(even) {
      background-color: #1e1e1e !important;
    }

    /* ── Inline code / code block ────────────────────────────────── */
    code, pre, [class*="CodeBlock"] {
      background-color: #292929 !important;
      color: #ffffffcc !important;
      border-color: rgba(255,255,255,0.10) !important;
    }

    /* ── Controls panel inputs ───────────────────────────────────── */
    input, select, textarea, button {
      background-color: #292929 !important;
      color: #ffffff !important;
      border-color: rgba(255,255,255,0.20) !important;
    }

    /* ── Dividers & borders ──────────────────────────────────────── */
    hr, [class*="Divider"], [class*="separator"] {
      border-color: rgba(255,255,255,0.10) !important;
      background-color: rgba(255,255,255,0.10) !important;
    }

    /* ── "Show code" / copy buttons ──────────────────────────────── */
    [class*="ActionBar"], [class*="Toolbar"] button {
      background-color: #292929 !important;
      color: #ffffffcc !important;
    }
  `;
}

// ─── Global decorator ─────────────────────────────────────────────────────────

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },

  decorators: [
    (Story, context) => {
      const scheme = (context.globals?.colorScheme ?? 'light') as ColorScheme;
      const isDark  = scheme === 'dark';
      const surface = surfaceTokens[scheme];
      const isFullscreen = context.parameters?.layout === 'fullscreen';

      // Inject/remove the dark-mode CSS override in the preview iframe
      useEffect(() => {
        applyDarkCSS(isDark);
        return () => {}; // leave the style in place during navigation
      }, [isDark]);

      // Also paint the body so the area behind components matches
      useEffect(() => {
        if (typeof document !== 'undefined') {
          document.body.style.backgroundColor = surface.background;
          document.body.style.transition = 'background-color 0.2s ease';
        }
      }, [surface.background]);

      return (
        <ThemeProvider scheme={scheme}>
          <View
            style={{
              flex: 1,
              backgroundColor: surface.background,
              ...(isFullscreen
                ? {}
                : {
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    minHeight: 200,
                  }),
            }}
          >
            <Story />
          </View>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
