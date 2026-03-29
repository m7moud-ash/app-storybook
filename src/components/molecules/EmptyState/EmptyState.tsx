import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { radius, spacing, typography } from '../../../tokens';
import { useSurface } from '../../../tokens/theme';
import { Button } from '../../atoms/Button/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EmptyStateAction {
  label:   string;
  onPress: () => void;
}

export interface EmptyStateProps {
  /** Large illustration shown above the text block. Pass `null` to hide. */
  icon?:             React.ReactNode;
  /** Bold heading — e.g. "You're Offline" */
  title:             string;
  /** Optional supporting copy beneath the title. */
  description?:      string;
  /** Primary CTA — rendered as an outlined (Secondary) button. */
  primaryAction?:    EmptyStateAction;
  /** Secondary CTA — rendered as a borderless button. */
  secondaryAction?:  EmptyStateAction;
}

// ─── Wifi-off icon ────────────────────────────────────────────────────────────
// 64 × 64, theme-aware, drawn with raw SVG elements (React Native Web / Vite).

const Svg    = (p: React.SVGProps<SVGSVGElement>)    => React.createElement('svg',    p);
const Circle = (p: React.SVGProps<SVGCircleElement>) => React.createElement('circle', p);
const Path   = (p: React.SVGProps<SVGPathElement>)   => React.createElement('path',   p);

function WifiOffIcon({ color }: { color: string }) {
  const sw = 3.5; // stroke-width

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      style={{ display: 'block' }}
    >
      {/* Center dot */}
      <Circle cx={32} cy={53} r={4} fill={color} />

      {/* Inner arc — visible left half only (right half clipped by the slash) */}
      <Path
        d="M21 43.5a15.5 15.5 0 0 1 11-4.5"
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />
      {/* Inner arc — right half */}
      <Path
        d="M32 39a15.5 15.5 0 0 1 11 4.5"
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />

      {/* Middle arc — left half */}
      <Path
        d="M12 34a28 28 0 0 1 20-8"
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />
      {/* Middle arc — right half */}
      <Path
        d="M32 26a28 28 0 0 1 20 8"
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />

      {/* Outer arc — left half only (slash interrupts right) */}
      <Path
        d="M4 24.5a40 40 0 0 1 28-11.5"
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />

      {/* Diagonal "no connection" slash — lower-left to upper-right */}
      <Path
        d="M42 12L22 52"
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  const surface = useSurface();

  const iconNode = icon !== undefined
    ? icon
    : <WifiOffIcon color={surface.text} />;

  return (
    <View style={styles.container}>
      {/* Icon */}
      {iconNode !== null && (
        <View style={styles.iconWrapper}>{iconNode}</View>
      )}

      {/* Text block */}
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: surface.text }]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, { color: surface.textSubtle }]}>
            {description}
          </Text>
        ) : null}
      </View>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <View style={styles.actions}>
          {primaryAction && (
            <Button
              label={primaryAction.label}
              onPress={primaryAction.onPress}
              type="Secondary"
              appearance="Normal"
              size="Default"
              fullWidth
            />
          )}
          {secondaryAction && (
            <Button
              label={secondaryAction.label}
              onPress={secondaryAction.onPress}
              type="Borderless"
              appearance="Normal"
              size="Default"
              fullWidth
            />
          )}
        </View>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// Exact values from Figma node 53528:2367:
//   container:   width 390px, px-16, gap-12 (space-3), items-center
//   text block:  gap-8, text-center
//   title:       18px SemiBold / 28px (BodyXl/font-semibold)
//   description: 14px Regular / 20px (BodyM/font-normal), color text.subtle
//   actions:     gap-8, full width (358px → fill container minus 16px padding each side)

const styles = StyleSheet.create({
  container: {
    width:          390,
    alignItems:     'center',
    paddingHorizontal: spacing[4],   // 16px
    gap:            spacing[3],      // 12px
  },
  iconWrapper: {
    width:  64,
    height: 64,
  },
  textBlock: {
    alignSelf:  'stretch',
    alignItems: 'center',
    gap:        spacing[2],          // 8px
  },
  title: {
    fontFamily:    typography.fontFamily.en,
    fontWeight:    typography.fontWeight.semibold,
    fontSize:      typography.fontSize['2xl'],    // 18px
    lineHeight:    typography.lineHeight.en[9],   // 28px — font/line-height/leading-7
    letterSpacing: typography.letterSpacing.normal,
    textAlign:     'center',
  },
  description: {
    fontFamily:    typography.fontFamily.en,
    fontWeight:    typography.fontWeight.regular,
    fontSize:      typography.fontSize.sm,        // 14px
    lineHeight:    typography.lineHeight.en.md,   // 20px — font/line-height/leading-5
    letterSpacing: typography.letterSpacing.normal,
    textAlign:     'center',
  },
  actions: {
    alignSelf:  'stretch',
    gap:        spacing[2],          // 8px
  },
});
