/**
 * Design tokens — App DSM
 *
 * Source files:
 *   Primitives/p-Light.json   → color scale, spacing, radius
 *   Colors/Light.json         → semantic light-theme tokens
 *   Colors/Dark.json          → semantic dark-theme tokens
 *   Typography/En.Mobile.json → Inter (LTR)
 *   Typography/Ar.Mobile.json → Noto Sans Arabic (RTL)
 *
 * All `{color.xxx.yyy}` references are resolved to their hex values here.
 * `color.gray.21` is not present in the source file; it is interpolated as
 * a near-white surface tint (#f4f4f6) consistent with its usage as a subtle
 * hover/raised background between white and gray.50.
 */

// ─── Primitive color scale ────────────────────────────────────────────────────

export const color = {
  gray: {
    21:  '#f4f4f6', // interpolated — used for subtle hover/raised surfaces
    50:  '#f7f7f8',
    100: '#ebebef',
    200: '#d1d1db',
    300: '#a9a9bc',
    400: '#8a8aa3',
    500: '#6c6c89',
    600: '#55556d',
    700: '#3f3f50',
    800: '#282833',
    900: '#121217',
  },

  // White-with-opacity scale (used on dark surfaces / dark theme)
  white: {
    50:  '#ffffff0d',
    60:  '#ffffff0f',
    100: '#ffffff1a',
    200: '#ffffff33',
    300: '#ffffff4d',
    400: '#ffffff66',
    500: '#ffffff80',
    600: '#ffffff99',
    700: '#ffffffcc',
    800: '#ffffffe6',
    900: '#ffffff',
  },

  purple: {
    50:       '#f4f1fd',
    100:      '#e2dafb',
    200:      '#c6b6f7',
    300:      '#a991f3',
    400:      '#8d6cef',
    500:      '#7047eb',
    600:      '#5423e7',
    700:      '#4316ca',
    800:      '#3712a5',
    900:      '#2b0e81',
    disabled: '#8d6cef80',
  },

  red: {
    50:       '#fef0f4',
    100:      '#fdd8e1',
    200:      '#fbb1c4',
    300:      '#f98ba6',
    400:      '#f76489',
    500:      '#f53d6b',
    600:      '#f3164e',
    700:      '#d50b3e',
    800:      '#af0932',
    900:      '#880727',
    disabled: '#f53d6b80',
  },

  yellow: {
    50:  '#fff9eb',
    100: '#fff3d6',
    200: '#ffe7ad',
    300: '#ffda85',
    400: '#ffce5c',
    500: '#ffc233',
    600: '#faaf00',
    700: '#c28800',
    800: '#8a6100',
    900: '#523900',
  },

  green: {
    50:  '#eefbf4',
    100: '#dff8ea',
    200: '#b2eecc',
    300: '#84e4ae',
    400: '#56d990',
    500: '#2dca72',
    600: '#26a95f',
    700: '#26a95f',
    800: '#17663a',
    900: '#0f4527',
  },

  orange: {
    50:  '#fff2ee',
    100: '#ffe8e1',
    200: '#ffcdbd',
    300: '#ffb399',
    400: '#ff9876',
    500: '#ff7d52',
    600: '#ff571f',
    700: '#eb3a00',
    800: '#b82e00',
    900: '#852100',
  },

  pink: {
    50:  '#feecfb',
    100: '#fdddf8',
    200: '#fcc5f3',
    300: '#fa99ea',
    400: '#f87ce4',
    500: '#f75fde',
    600: '#f42ad3',
    700: '#db0bb9',
    800: '#a5088c',
    900: '#a5088c',
  },

  blue: {
    50:    '#f0faff',
    100:   '#dbf3ff',
    200:   '#ade4ff',
    300:   '#70d1ff',
    400:   '#38beff',
    500:   '#00acff',  // Information / sky blue
    600:   '#0090d6',
    700:   '#0075ad',
    800:   '#005985',
    900:   '#003e5c',
    950:   '#010a18',
    brand: '#0056d6',  // "600 •" — brand primary blue, closest to Figma #0055D9
  },

  surface: {
    dark0: '#000000',
    dark1: '#141414',
    dark2: '#292929',
    blank: '#00000000',
  },
} as const;

// ─── Spacing scale (from global.json) ────────────────────────────────────────

export const spacing = {
  0:   0,
  px:  1,
  0.5: 2,
  1:   4,
  2:   8,
  3:   12,
  4:   16,
  5:   20,
  6:   24,
  7:   28,
  8:   32,
  9:   36,
  10:  40,
  11:  44,
  12:  48,
  14:  56,
  16:  64,
  20:  80,
  24:  96,
  28:  112,
  32:  128,
} as const;

// ─── Border radius scale ──────────────────────────────────────────────────────
// "rounded-2xs" (2px) is referenced by the Figma button but absent from the
// token file; it is added here as the smallest step below rounded-sm.

export const radius = {
  none:  0,
  '2xs': 2,   // Figma button — not in source file, derived from usage
  sm:    4,   // rounded-sm
  md:    8,   // rounded
  lg:    16,  // rounded-lg
  xl:    32,  // rounded-xl
  '2xl': 128, // rounded-2xl
  full:  360, // rounded-full
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    en: 'Inter',
    ar: 'Noto Sans Arabic',
  },
  fontSize: {
    xs:   12, // text-xs
    sm:   14, // text-sm
    base: 16, // text-base / text-lg / text-xl (same value in token file)
    '2xl': 18,
    '3xl': 20,
    '4xl': 24,
    '5xl': 32,
    '6xl': 48,
  },
  fontWeight: {
    regular:  '400' as const,
    medium:   '500' as const,
    semibold: '600' as const,
    bold:     '700' as const,
  },
  // English mobile line-heights
  lineHeight: {
    en: {
      4:  16,
      5:  18,
      md: 20,
      6:  22,
      7:  22,
      8:  26,
      9:  28,
      10: 32,
      11: 38,
      12: 48,
    },
    // Arabic mobile line-heights (larger for correct RTL rendering)
    ar: {
      4:  20,
      5:  28,
      md: 30,
      6:  32,
      7:  30,
      8:  36,
      9:  38,
      10: 48,
      11: 56,
      12: 76,
    },
  },
  letterSpacing: {
    normal:  0,
    tight:   -1,
    tighter: -2,
  },
} as const;

// ─── Semantic tokens — Button (Light theme) ───────────────────────────────────
// Resolved from Colors/Light.json, cross-referenced with the Figma button spec.

export const buttonColors = {
  /** Filled (Primary) button — per appearance */
  primary: {
    Normal: {
      background: color.blue.brand,   // #0056d6 ≈ Figma #0055D9
      text:       color.white[900],
      backgroundDisabled: color.blue[200],
      textDisabled:       color.white[900],
    },
    Danger: {
      background: color.red[500],     // background.button.primary-desctructive
      text:       color.white[900],
      backgroundDisabled: color.red.disabled,
      textDisabled:       color.white[900],
    },
    Success: {
      background: color.green[500],
      text:       color.white[900],
      backgroundDisabled: color.green[200],
      textDisabled:       color.white[900],
    },
    Information: {
      background: color.blue[500],    // #00acff
      text:       color.white[900],
      backgroundDisabled: color.blue[200],
      textDisabled:       color.white[900],
    },
    Warning: {
      background: color.orange[600],  // #ff571f — closest to Figma #ec7303
      text:       color.white[900],
      backgroundDisabled: color.orange[200],
      textDisabled:       color.white[900],
    },
  },

  /** Outlined (Secondary) button — per appearance */
  secondary: {
    Normal: {
      border:           color.gray[200],  // border.button.outline-normal
      text:             color.blue.brand,
      background:       color.white[900], // background.button.outline-normal
      borderDisabled:   color.gray[100],  // border.button.outline-disabled
      textDisabled:     color.gray[300],  // text.button.disabled
    },
    Danger: {
      border:           color.red[200],   // border.button.outline-destructive
      text:             color.red[700],   // text.button.destructive
      background:       color.white[900],
      borderDisabled:   color.red[100],
      textDisabled:     color.red[300],
    },
    Success: {
      border:           color.green[200],
      text:             color.green[700],
      background:       color.white[900],
      borderDisabled:   color.green[100],
      textDisabled:     color.green[300],
    },
    Information: {
      border:           color.blue[200],
      text:             color.blue[700],
      background:       color.white[900],
      borderDisabled:   color.blue[100],
      textDisabled:     color.blue[300],
    },
    Warning: {
      border:           color.yellow[200],
      text:             color.yellow[700],
      background:       color.white[900],
      borderDisabled:   color.yellow[100],
      textDisabled:     color.yellow[300],
    },
  },

  /** Tertiary button — neutral border */
  tertiary: {
    Normal: {
      border:           color.gray[200],  // border.button.outline-normal
      text:             color.gray[900],  // text.button.normal
      background:       color.white[900], // background.button.tertiary-normal
      borderDisabled:   color.gray[100],
      textDisabled:     color.gray[300],
    },
    Danger: {
      border:           color.red[200],
      text:             color.red[700],
      background:       color.white[900],
      borderDisabled:   color.red[100],
      textDisabled:     color.red[300],
    },
    Success: {
      border:           color.green[200],
      text:             color.green[700],
      background:       color.white[900],
      borderDisabled:   color.green[100],
      textDisabled:     color.green[300],
    },
    Information: {
      border:           color.blue[200],
      text:             color.blue[700],
      background:       color.white[900],
      borderDisabled:   color.blue[100],
      textDisabled:     color.blue[300],
    },
    Warning: {
      border:           color.yellow[200],
      text:             color.yellow[700],
      background:       color.white[900],
      borderDisabled:   color.yellow[100],
      textDisabled:     color.yellow[300],
    },
  },

  /** Borderless (ghost/text) button */
  borderless: {
    Normal: {
      text:         color.gray[900],   // text.button.normal
      textDisabled: color.gray[300],   // text.button.disabled
    },
    Danger: {
      text:         color.red[700],    // text.button.destructive
      textDisabled: color.red[300],
    },
    Success: {
      text:         color.green[700],
      textDisabled: color.green[300],
    },
    Information: {
      text:         color.blue[700],
      textDisabled: color.blue[300],
    },
    Warning: {
      text:         color.yellow[700],
      textDisabled: color.yellow[300],
    },
  },
} as const;

// ─── Button size tokens (from Figma + global spacing/typography) ──────────────

export const buttonSize = {
  Large: {
    height:     spacing[12],   // 48
    paddingH:   spacing[6],    // 24
    paddingV:   spacing[3],    // 12
    fontSize:   typography.fontSize.base,  // 16
    lineHeight: typography.lineHeight.en[6], // 22  (BodyL/SemiBold)
    iconSize:   spacing[6],    // 24
    gap:        spacing[2],    // 8
  },
  Default: {
    height:     spacing[10],   // 40
    paddingH:   spacing[5],    // 20
    paddingV:   spacing[2],    // 8
    fontSize:   typography.fontSize.sm,    // 14
    lineHeight: typography.lineHeight.en.md, // 20 (BodyM/SemiBold)
    iconSize:   spacing[6],    // 24
    gap:        spacing[2],    // 8
  },
  Small: {
    height:     spacing[8],    // 32
    paddingH:   spacing[4],    // 16
    paddingV:   spacing[2],    // 8
    fontSize:   typography.fontSize.xs,    // 12
    lineHeight: typography.lineHeight.en[4], // 16 (BodyS/SemiBold)
    iconSize:   spacing[4],    // 16
    gap:        spacing[1],    // 4
  },
} as const;

// ─── Button shape token ───────────────────────────────────────────────────────

export const buttonRadius = radius['2xs']; // 2px — from Figma rounded-2xs

// ─── Semantic tokens — Button (Dark theme) ────────────────────────────────────
// Resolved from Colors/Dark.json.
// Key differences vs light:
//   • Surface colors use color.white.* (opacity-based) instead of color.gray.*
//   • Outline/tertiary backgrounds are transparent (color.surface.blank)
//   • Destructive text uses red.500 instead of red.700

export const buttonColorsDark = {
  primary: {
    Normal: {
      background:         color.blue.brand,
      text:               color.white[900],
      backgroundDisabled: color.blue[200],
      textDisabled:       color.white[500],
    },
    Danger: {
      background:         color.red[500],
      text:               color.white[900],
      backgroundDisabled: color.red.disabled,
      textDisabled:       color.white[500],
    },
    Success: {
      background:         color.green[500],
      text:               color.white[900],
      backgroundDisabled: color.green[200],
      textDisabled:       color.white[500],
    },
    Information: {
      background:         color.blue[500],
      text:               color.white[900],
      backgroundDisabled: color.blue[200],
      textDisabled:       color.white[500],
    },
    Warning: {
      background:         color.orange[600],
      text:               color.white[900],
      backgroundDisabled: color.orange[200],
      textDisabled:       color.white[500],
    },
  },

  secondary: {
    Normal: {
      border:           color.white[200],   // border.button.outline-normal (dark)
      text:             color.white[900],   // text.button.normal (dark)
      background:       color.surface.blank,
      borderDisabled:   color.white[100],
      textDisabled:     color.white[400],
    },
    Danger: {
      border:           color.red[500],
      text:             color.red[500],     // text.button.destructive (dark)
      background:       color.surface.blank,
      borderDisabled:   color.red.disabled,
      textDisabled:     color.red[400],
    },
    Success: {
      border:           color.green[500],
      text:             color.green[500],
      background:       color.surface.blank,
      borderDisabled:   color.green[200],
      textDisabled:     color.green[400],
    },
    Information: {
      border:           color.blue[500],
      text:             color.blue[500],
      background:       color.surface.blank,
      borderDisabled:   color.blue[200],
      textDisabled:     color.blue[400],
    },
    Warning: {
      border:           color.yellow[500],
      text:             color.yellow[500],
      background:       color.surface.blank,
      borderDisabled:   color.yellow[200],
      textDisabled:     color.yellow[400],
    },
  },

  tertiary: {
    Normal: {
      border:           color.white[200],
      text:             color.white[900],
      background:       'transparent' as const,
      borderDisabled:   color.white[100],
      textDisabled:     color.white[400],
    },
    Danger: {
      border:           color.red[500],
      text:             color.red[500],
      background:       'transparent' as const,
      borderDisabled:   color.red.disabled,
      textDisabled:     color.red[400],
    },
    Success: {
      border:           color.green[500],
      text:             color.green[500],
      background:       'transparent' as const,
      borderDisabled:   color.green[200],
      textDisabled:     color.green[400],
    },
    Information: {
      border:           color.blue[500],
      text:             color.blue[500],
      background:       'transparent' as const,
      borderDisabled:   color.blue[200],
      textDisabled:     color.blue[400],
    },
    Warning: {
      border:           color.yellow[500],
      text:             color.yellow[500],
      background:       'transparent' as const,
      borderDisabled:   color.yellow[200],
      textDisabled:     color.yellow[400],
    },
  },

  borderless: {
    Normal: {
      text:         color.white[900],
      textDisabled: color.white[400],
    },
    Danger: {
      text:         color.red[500],
      textDisabled: color.red[400],
    },
    Success: {
      text:         color.green[500],
      textDisabled: color.green[400],
    },
    Information: {
      text:         color.blue[500],
      textDisabled: color.blue[400],
    },
    Warning: {
      text:         color.yellow[500],
      textDisabled: color.yellow[400],
    },
  },
} as const;

// ─── Semantic tokens — Badge (Light theme) ───────────────────────────────────
// Extracted from Figma node 3501:42498 (App-DSM / Badge).
// Colors reference the design's semantic tokens; fallback hex values are used
// where the primitive scale in p-Light.json has a close but not exact match.

export const badgeColors = {
  light: {
    Default: {
      background: color.gray[100],      // surface-2/subtle ≈ #ebebef
      dot:        color.gray[900],      // color.text        = #121217
      text:       color.gray[900],
    },
    Processing: {
      background: color.blue[50],       // surface/accent/sky = #f0faff  ✓
      dot:        color.blue[500],      // color.text.information = #00acff ✓
      text:       color.blue[600],      // #0090d6 ✓
    },
    Announcement: {
      background: color.purple[50],     // surface/accent/purple = #f4f1fd ✓
      dot:        color.purple[500],    // color.text.discovery = #7047eb ✓
      text:       color.purple[600],    // #5423e7 ✓
    },
    Success: {
      background: color.green[50],      // surface/accent/green = #eefbf4 ✓
      dot:        color.green[500],     // color.text.success = #2dca72 ✓
      text:       color.green[600],     // #26a95f (Figma: #219b56)
    },
    Warning: {
      background: color.yellow[50],     // background/accent/orange = #fff9eb ✓
      dot:        '#ec7303',            // color.text.warning — not in p-Light scale
      text:       '#b95902',            // dark amber — not in p-Light scale
    },
    Error: {
      background: color.red[50],        // surface/accent/red ≈ #fef0f4 (Figma: #ffe1dc)
      dot:        '#f02d2d',            // color.text.danger — not in p-Light scale
      text:       '#bc2121',            // dark red — not in p-Light scale
    },
    Extra: {
      background: color.pink[50],       // surface/accent/pink ≈ #feecfb (Figma: #ffe1dc)
      dot:        color.pink[700],      // color.icon.accent.magenta = #db0bb9 ✓
      text:       color.pink[700],      // #db0bb9 ✓
    },
  },
  dark: {
    Default: {
      background: color.white[100],
      dot:        color.white[700],
      text:       color.white[700],
    },
    Processing: {
      background: color.white[50],
      dot:        color.blue[400],
      text:       color.blue[400],
    },
    Announcement: {
      background: color.white[50],
      dot:        color.purple[400],
      text:       color.purple[400],
    },
    Success: {
      background: color.white[50],
      dot:        color.green[500],
      text:       color.green[400],
    },
    Warning: {
      background: color.white[50],
      dot:        color.yellow[500],
      text:       color.yellow[400],
    },
    Error: {
      background: color.white[50],
      dot:        color.red[500],
      text:       color.red[400],
    },
    Extra: {
      background: color.white[50],
      dot:        color.pink[500],
      text:       color.pink[400],
    },
  },
} as const;

// ─── Semantic tokens — Message / Toast ───────────────────────────────────────
// Source: Figma node 170:4001 (App-DSM / Message)
// Background values from `color/surface/accent/*` tokens which don't map
// exactly to the primitive scale; exact Figma hex values used where noted.

export const messageColors = {
  light: {
    Error: {
      background: '#ffe1dc',            // color/surface/accent/red  (Figma exact)
      icon:       '#f02d2d',            // color/text/danger
      text:       color.gray[900],
    },
    Normal: {
      background: '#dce8fc',            // color/surface/accent/blue (Figma exact)
      icon:       color.blue.brand,     // #0056d6
      text:       color.gray[900],
    },
    Success: {
      background: color.green[50],      // #eefbf4
      icon:       color.green[500],     // #2dca72
      text:       color.gray[900],
    },
    Warning: {
      background: color.yellow[50],     // #fff9eb
      icon:       '#ec7303',            // color/text/warning (not in primitive scale)
      text:       color.gray[900],
    },
    Loading: {
      background: color.blue[50],       // #f0faff
      icon:       color.blue[300],      // #70d1ff — ring accent arc
      iconTrack:  color.gray[200],      // #d1d1db — ring background arc
      text:       color.gray[900],
    },
  },
  dark: {
    Error: {
      background: color.white[50],
      icon:       color.red[400],
      text:       color.white[800],
    },
    Normal: {
      background: color.white[50],
      icon:       color.blue[400],
      text:       color.white[800],
    },
    Success: {
      background: color.white[50],
      icon:       color.green[400],
      text:       color.white[800],
    },
    Warning: {
      background: color.white[50],
      icon:       color.yellow[400],
      text:       color.white[800],
    },
    Loading: {
      background: color.white[50],
      icon:       color.blue[400],
      iconTrack:  color.white[200],
      text:       color.white[800],
    },
  },
} as const;

// ─── Surface tokens — for decorator background ────────────────────────────────

export const surfaceTokens = {
  light: {
    background: color.white[900],      // #ffffff
    backgroundSubtle: color.gray[21],  // #f4f4f6
    text: color.gray[900],
    textMuted: color.gray[500],
    textSubtle: color.gray[400],
    divider: color.gray[100],
  },
  dark: {
    background: color.surface.dark1,   // #141414
    backgroundSubtle: color.surface.dark2, // #292929
    text: color.white[900],
    textMuted: color.white[500],
    textSubtle: color.white[300],
    divider: color.white[100],
  },
} as const;
