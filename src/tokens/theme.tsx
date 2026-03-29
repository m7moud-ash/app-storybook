import React, { createContext, useContext } from 'react';
import { buttonColors, buttonColorsDark, badgeColors, messageColors, surfaceTokens } from './index';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColorScheme = 'light' | 'dark';

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ColorScheme>('light');

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({
  scheme,
  children,
}: {
  scheme: ColorScheme;
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={scheme}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useColorScheme(): ColorScheme {
  return useContext(ThemeContext);
}

/** Returns the resolved button color tokens for the current scheme. */
export function useButtonColors() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? buttonColorsDark : buttonColors;
}

/** Returns surface (background/text/divider) tokens for the current scheme. */
export function useSurface() {
  const scheme = useColorScheme();
  return surfaceTokens[scheme];
}

/** Returns the resolved badge color tokens for the current scheme. */
export function useBadgeColors() {
  const scheme = useColorScheme();
  return badgeColors[scheme];
}

/** Returns the resolved message color tokens for the current scheme. */
export function useMessageColors() {
  const scheme = useColorScheme();
  return messageColors[scheme];
}
